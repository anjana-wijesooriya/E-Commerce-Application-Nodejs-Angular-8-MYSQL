const  firebase = require("firebase/app");
const auth = require("firebase/auth");

var firebaseConfig = {
    apiKey: "AIzaSyBZTAjwO9-76Y-0sgJYxlrKF3J3k3qiuos",
    authDomain: "tshirt-shop-900ac.firebaseapp.com",
    databaseURL: "https://tshirt-shop-900ac.firebaseio.com",
    projectId: "tshirt-shop-900ac",
    storageBucket: "",
    messagingSenderId: "931749864223",
    appId: "1:931749864223:web:4b70ad4687b1063e"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const RegisterCustomer = (request, response) => {
    try {

        let params = request.body;

        firebase.auth()
                .createUserWithEmailAndPassword(params.Email, params.Password)
                .then(function(res){
                    let query = `INSERT INTO customer
                    (address_1, address_2, city, country, credit_card, day_phone, email, eve_phone, mob_phone, name, password, postal_code, region, shipping_region_id)
                    values
                    (
                        '${params.AddressOne}', 
                        '${params.AddressTwo}', 
                        '${params.Town}', 
                        '${params.Country}', 
                        '${params.CreditCard}', 
                        '', 
                        '${params.Email}', 
                        '', 
                        '${params.Mobile}', 
                        '${params.FirstName}', 
                        '', 
                        '${params.ZipCode}', 
                        '',
                        ${params.RegionId});`; // query database to get all the  Shipping Regions
            
                    // execute query
                    db.query(query, (err, result) => {
                       if (err != null) response.status(500).send({ error: err.message });
            
                       return response.json(true);
                   });
                })
                .catch(function(error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    return response.status(500).send({ error: error.message });
                    // ...
                });
    } catch (error) {
        if (error != null) response.status(500).send({ error: error.message });
    }
};

// validate login details and sign in
const AuthenticateLogin = (request, response) => {
    try {
        let params = request.body;
        SignInRegular(params.Username, params.Password)
            .then((res) => {
                let query = `SELECT 
                    A.email AS 'Email',
                    A.password AS 'Password',
                    A.address_1 AS 'AddressOne',
                    A.address_2 AS 'AddressTwo',
                    A.city AS 'Town',
                    A.country AS 'Country',
                    A.credit_card AS 'CreditCard',
                    A.customer_id AS 'CustomerId',
                    A.mob_phone AS 'Mobile',
                    A.name AS 'FullName',
                    A.postal_code AS 'ZipCode',
                    A.shipping_region_id AS 'RegionId'
                    FROM  customer A
                    WHERE A.email = '${params.Username}';`; // query database to get all the  Shipping Regions

                // execute query
                db.query(query, (err, result) => {
                    if (err != null) response.status(500).send({ error: err.message });
                    return response.json(result);
                });
            })
            .catch((error) => {
                return response.status(500).send({ error: error.message });
            });
    } catch (error) {
        if (error != null) response.status(500).send({ error: error.message });
    }
};

const Logout = (request, response) => {
    try {
        firebase.auth().signOut().then(res => {
            return response.json(res);
        })
    } catch (error) {
        if (error != null) response.status(500).send({ error: error.message });
    }
};

// sign in using firebase authentication
const SignInRegular = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password);
}

const customer = {
    RegisterCustomer,
    AuthenticateLogin,
    Logout
};

module.exports = customer;