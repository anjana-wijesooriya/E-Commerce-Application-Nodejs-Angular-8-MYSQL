
    
const express = require('express');
const router = express.Router();

//get all Product
router.get('/getProducts', function (request, response, next) {
    try {
        let query = `SELECT TOP 10
                            P.product_id AS 'ProductId',
                            P.name AS 'Name',
                            P.description AS 'Description',
                            P.price AS 'Price',
                            P.discounted_price AS 'DescountedPrice',
                            P.image AS 'PrimaryImage',
                            P.image_2 AS 'SecondaryImage',
                            P.thumbnail AS 'Thumbnail',
                            P.display AS 'Display',
                            P.category_id AS 'CategoryId',
                            P.department_id AS 'DepartmentId'
                    FROM tshirtshop.product P, tshirtshop.category C, tshirtshop.product_category PC
                    WHERE P.product_id = PC.product_id 
                        AND C.category_id = PC.category_id;`; // query database to get all the departments'

        let productCountQuery = `SELECT COUNT(P.product_id) AS 'ProductCount'
                    FROM 
                        tshirtshop.product P, 
                        tshirtshop.category C, 
                        tshirtshop.department D, 
                        tshirtshop.product_category PC
                    WHERE P.product_id = PC.product_id 
                        AND C.category_id = PC.category_id
                        AND C.department_id = D.department_id
                    ${filterDepartment} ${filterCategory};`;

        // execute query
        db.query(query + productCountQuery, [1, 2], (err, result) => {
            if (err != null){
                response.status(500).send({ error: err.message });
            }

            let resultSet = {
                Products: result[0], 
                ProductCount: result[1]
            }
            // get product attributes
            let productIdList = [];
            resultSet.Products.forEach((element, index) => {
                 productIdList.push(element.ProductId);
            });

            let productlistString = productIdList.toString();

            let query = `SELECT 
                A.name AS 'AttributeName',
                A.attribute_id AS 'AttributeId',
                AV.attribute_value_id AS 'AttributeValueId',
                AV.value AS 'AttributeValue',
                PA.product_id AS 'ProductId'
            FROM tshirtshop.attribute_value AV
            INNER JOIN tshirtshop.attribute A
                    ON AV.attribute_id = A.attribute_id
            INNER JOIN tshirtshop.product_attribute PA
                    ON PA.attribute_value_id = AV.attribute_value_id
            WHERE AV.attribute_value_id IN
                    (SELECT attribute_value_id
                    FROM   product_attribute
                    WHERE  product_id in (${productlistString}))
            ORDER BY A.name`;

            // execute query
            db.query(query, (err, result) => {
                if (err != null){
                    response.status(500).send({ error: err.message });
                }

                resultSet.Products.forEach((element,index) => {
                    var aaa = result.filter(a => a.ProductId == element.ProductId);
                    resultSet.Products[index]['Size'] = aaa.filter(a => a.AttributeId == 1);
                    resultSet.Products[index]['Color'] = aaa.filter(a => a.AttributeId == 2);
                });
                return response.json(resultSet);
            });

           return response.json(result);
       });
    } catch (error) {
        if (error != null) response.status(500).send({ error: error.message });
    }
});

router.get('/getProductAttributes', function(request, response, next){
    try {
        let query = 'CALL catalog_get_attribute_values(1);CALL catalog_get_attribute_values(2)'
        // execute query
        db.query(query, [1, 2], (err, result) => {
            if (err != null){
                response.status(500).send({ error: err.message });
               }
            return response.json({Size: result[0], Color: result[1]});
        });
    } catch (error) {
        
    }
})

//get all Filtered Products
router.post('/getFilteredProducts', function (request, response, next) {
    try {
        let filterDepartment = (request.body.paging.DepartmentId == 0) ? 'AND C.department_id = C.department_id' : `AND C.department_id = ${request.body.paging.DepartmentId}`;
        let filterCategory = (request.body.paging.CategoryId == 0) ? 'AND C.category_id = C.category_id' : `AND C.category_id = ${request.body.paging.CategoryId}`;
        let filterSearchString = ''; 
        request.body.paging.SearchString = (request.body.paging.SearchString == undefined) ? '': request.body.paging.SearchString;
        
        if(request.body.paging.SearchString == ''){
            filterSearchString = `P.name like '%%' OR P.description like '%%'`;
        } else if(request.body.paging.IsAllWords) {
            let words = request.body.paging.SearchString.split(' ');
            let likeQuery = [];
            words.forEach(element => {
                likeQuery.push(`P.name like '%${element}%' OR P.description like '%${element}%'`);
            });
            filterSearchString = likeQuery.join(' OR ');
        } else{
            filterSearchString = `P.name like '%${request.body.paging.SearchString}%' 
                                 OR P.description like '%${request.body.paging.SearchString}%'`;
        }
        let query = `SELECT 
                        P.product_id AS 'ProductId',
                        P.name AS 'Name',
                        P.description AS 'Description',
                        P.price AS 'Price',
                        P.discounted_price AS 'DescountedPrice',
                        P.image AS 'PrimaryImage',
                        P.image_2 AS 'SecondaryImage',
                        P.thumbnail AS 'Thumbnail',
                        P.display AS 'Display',
                        C.category_id AS 'CategoryId',
                        C.department_id AS 'DepartmentId',
                        D.name AS 'DepartmentName',
                        C.name AS 'CategoryName'
                    FROM tshirtshop.product P, tshirtshop.category C, tshirtshop.department D, tshirtshop.product_category PC
                    WHERE P.product_id = PC.product_id 
                        AND C.category_id = PC.category_id
                        AND C.department_id = D.department_id
                        ${filterDepartment} ${filterCategory}
                        AND (${filterSearchString})
                    LIMIT ${request.body.paging.PageNumber}, ${request.body.paging.PageSize};`; // query database to get all the departments

        let productCountQuery = `SELECT COUNT(P.product_id) AS 'ProductCount'
                                FROM tshirtshop.product P, tshirtshop.category C, tshirtshop.department D, tshirtshop.product_category PC
                                WHERE P.product_id = PC.product_id 
                                    AND C.category_id = PC.category_id
                                    AND C.department_id = D.department_id
                                    ${filterDepartment} ${filterCategory}
                                    AND (${filterSearchString});`; // query database to get related product count
        // execute query
        db.query(query + productCountQuery, [1, 2], (err, result) => {
           if (err != null){
            response.status(500).send({ error: err.message });
           }
            let resultSet = {
               Products: result[0], 
               ProductCount: result[1]
            }
            if(resultSet.Products.length == 0){
                return response.json(resultSet);
            }
           // get product attributes
            let productIdList = [];
            resultSet.Products.forEach((element, index) => {
                productIdList.push(element.ProductId);
            });
            let productlistString = productIdList.toString();

            let query = `SELECT 
                A.name AS 'AttributeName',
                A.attribute_id AS 'AttributeId',
                AV.attribute_value_id AS 'AttributeValueId',
                AV.value AS 'AttributeValue',
                PA.product_id AS 'ProductId'
            FROM tshirtshop.attribute_value AV
            INNER JOIN tshirtshop.attribute A
                    ON AV.attribute_id = A.attribute_id
            INNER JOIN tshirtshop.product_attribute PA
                    ON PA.attribute_value_id = AV.attribute_value_id
            WHERE AV.attribute_value_id IN
                    (SELECT attribute_value_id
                    FROM   product_attribute
                    WHERE  product_id in (${productlistString}))
            ORDER BY A.name`;

            // execute query
            db.query(query, (err, result) => {
                if (err != null){
                    response.status(500).send({ error: err.message });
                }

                resultSet.Products.forEach((element,index) => {
                    var aaa = result.filter(a => a.ProductId == element.ProductId);
                    resultSet.Products[index]['Size'] = aaa.filter(a => a.AttributeId == 1).sort(function(a, b){return a.AttributeValueId - b.AttributeValueId});
                    resultSet.Products[index]['Color'] = aaa.filter(a => a.AttributeId == 2).sort(function(a, b){return a.AttributeValueId - b.AttributeValueId});
                });
                return response.json(resultSet);
            });

       });
    } catch (err) {
        if (err != null) {
            response.status(500).send({ error: err });
        }
    }
});

// get product details by product id
router.get('/getProductDetails', (request, response, next) => {
    try {
        let query = `SELECT 
                        P.product_id AS 'ProductId',
                        P.name AS 'Name',
                        P.description AS 'Description',
                        P.price AS 'Price',
                        P.discounted_price AS 'DescountedPrice',
                        P.image AS 'PrimaryImage',
                        P.image_2 AS 'SecondaryImage',
                        P.thumbnail AS 'Thumbnail',
                        P.display AS 'Display',
                        C.category_id AS 'CategoryId',
                        C.department_id AS 'DepartmentId',
                        D.name AS 'DepartmentName',
                        C.name AS 'CategoryName'
                    FROM 
                        tshirtshop.product P, 
                        tshirtshop.category C, 
                        tshirtshop.department D, 
                        tshirtshop.product_category PC
                    WHERE P.product_id = PC.product_id 
                    AND C.category_id = PC.category_id
                    AND C.department_id = D.department_id
                    AND P.product_id = ${request.query.productId}`; // query database to get all the departments

        // execute query
        db.query(query ,(err, result) => {
            if (err != null){
                response.status(500).send({ error: err.message });
            }
            let productDetails = result[0];
            let subquery = `SELECT 
                            A.name AS 'AttributeName',
                            A.attribute_id AS 'AttributeId',
                            AV.attribute_value_id AS 'AttributeValueId',
                            AV.value AS 'AttributeValue',
                            PA.product_id AS 'ProductId'
                        FROM tshirtshop.attribute_value AV
                        INNER JOIN tshirtshop.attribute A
                                ON AV.attribute_id = A.attribute_id
                        INNER JOIN tshirtshop.product_attribute PA
                                ON PA.attribute_value_id = AV.attribute_value_id
                        WHERE PA.product_id = ${request.query.productId}
                        ORDER BY A.name`;

            // execute query
            db.query(subquery, (err, results) => {
                if (err != null){
                    response.status(500).send({ error: err.message });
                }

                productDetails['Size'] = results.filter(a => a.AttributeId == 1).sort(function(a, b){return a.AttributeValueId - b.AttributeValueId});
                productDetails['Color'] = results.filter(a => a.AttributeId == 2).sort(function(a, b){return a.AttributeValueId - b.AttributeValueId});

                return response.json(productDetails);
            });

       });
    } catch (err) {
        if (err != null) {
            response.status(500).send({ error: err });
        }
    }
})


module.exports = router;