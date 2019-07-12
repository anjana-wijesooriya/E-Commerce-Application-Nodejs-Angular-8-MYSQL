
const GetDepartments = (request, response) => {
    try {
        console.log(1)
        let query = `SELECT 
                        A.department_id AS 'DepartmentId',
                        A.name AS 'Name',
                        A.description AS 'Description' 
                    FROM department A 
                    ORDER BY department_id ASC`; // query database to get all the departments

        // execute query
        db.query(query, (err, result) => {
            console.log(2)
            if (err != null) response.status(500).send({ error: error.message });

            return response.json(result);
       });
    } catch (error) {
        console.log(2)
        if (error != null) response.status(500).send({ error: error.message });
    }
}

const departments = {
    GetDepartments
}

module.exports = departments;