
module.exports = {
    getDepartments: (req, res) => {
        let query = "SELECT * FROM `department` ORDER BY department_id ASC"; // query database to get all the departments

        // execute query
        db.query(query, (err, result) => {
           if (err != null) res.status(500).send({ error: error.message });

           return res.json(result);
       });
    },
};