module.exports = {
    getHomePage: (req, res) => {
        let query = "SELECT * FROM `product` ORDER BY product_id ASC"; // query database to get all the players

        // execute query
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
        });
    },
};