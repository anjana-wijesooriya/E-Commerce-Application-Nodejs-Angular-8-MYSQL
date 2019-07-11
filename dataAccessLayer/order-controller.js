const nodemailer = require('../node_modules/nodemailer');

const CreateOrder = (request, response) => {
    try {

        const user = request.body.User;
        const cart = request.body.Cart;
        const remark = request.body.Remarks;
        const totalAmount = request.body.TotalAmount;

        const transporter = nodemailer.createTransport({
            // service: 'gmail',
            // auth: {
            //     user: 'ajdarkslayer@gmail.com',
            //     pass: 'Anjana@123'
            // }
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: 'rebeka.dietrich54@ethereal.email',
                pass: 'eUN3GvKdfRgFseD4X8'
            }
        });

        let mailOptions = {
            from: 'ajdarkslayer@gmail.com',
            to: 'ajgihan@gmail.com',
            subject: "Order Details", // Subject line
            text: "Hello world?", // plain text body
            html: `<b>Hello world? ${remark} </b>`
        }
        // send mail with defined transport object
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                return response.json(error);
            } else {
                console.log('Email sent: ' + info.response);

                let query = `INSERT INTO tshirtshop.orders
                                (total_amount, created_on, shipped_on, status, comments, customer_id, auth_code, reference, shipping_id, tax_id)
                            VALUES
                            (
                                ${totalAmount}, 
                                CURDATE(), 
                                CURDATE(), 
                                1, 
                                '${remark}', 
                                ${user.CustomerId}, 
                                '', 
                                '', 
                                1, 
                                1
                            );`; //query database to get all the departments

                // execute query
                db.query(query, (err, result) => {
                    if (err != null) response.status(500).send({ error: error.message });
                    let values = [];
                    cart.forEach(element => {
                        let row = '';
                        row = `(
                            ${result.insertId},
                            ${element.ProductId},
                            '',
                            ${element.Quantity},
                            ${element.Price}
                        )`;
                        values.push(row);
                    });
                    let rows = values.toString();

                    let subQuery = `INSERT INTO tshirtshop.order_detail
                                        (order_id, product_id, attributes, product_name, quantity, unit_cost)
                                    values ${rows};`; //query database to get all the departments

                    db.query(subQuery, (err, result) => {
                        if (err != null) response.status(500).send({ error: err.message });
                        return response.json(result);
                    });

                    return response.json(result);
                });
            }
        });


    } catch (error) {
        if (error != null) response.status(500).send({ error: error.message });
    }
};

const SendTestMail = async ()=> {
    let remark = 'test mail';

    let testAccount = await nodemailer.createTestAccount();

     // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: testAccount.user, // generated ethereal user
            pass: testAccount.pass // generated ethereal password
        }
    });

    // const transporter = nodemailer.createTransport({
    //     // service: 'gmail',
    //     // auth: {
    //     //     user: 'ajdarkslayer@gmail.com',
    //     //     pass: '*****'
    //     // }
    // });

    let mailOptions = {
        from: '"Dark Slayer 👻" <no-reply@dark.com>',
        to: 'ajgihan@gmail.com',
        subject: "Order Details", // Subject line
        text: "test purpose", // plain text body
        html: `<b>test account ${remark} </b>`
    }

    await transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            return response.json(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};

const order = {
    CreateOrder,
    SendTestMail
};

module.exports = order;