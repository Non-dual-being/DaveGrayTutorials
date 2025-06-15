const path = require('path');
const data = {
    employees : require(path.join(__dirname, "..", "model", "employees")),
    setEmployees: function (data) { this.employees = data }
};

//** this verwijst naar data */

const getAllEmployees = (req, res) => {
        res.json(data.employees)
    };

const getEmployee = (req, res) => {
        const employee = data.employees.find(emp => emp.id === parseInt(req.body.id));
        if (!employee) { 
            return res.status(400).json({ 'message' : `no emp found with given id: ${req.body.id}`})   
        }
        res.json(employee);

    }

const createNewEmployee = (req, res) => {
        const id = data.employees.length 
            ?  Math.max(...data.employees.map(emp => emp.id)) + 1
            :  1          

        const newEmployee = {
            id,
            firstname: req.body.firstname,
            lastname: req.body.lastname
        }

        if (!newEmpolyee.firstname || !newEmployee.lastname){
            return res.status(400).json({'message' : 'provide a name'})
        }

        data.setEmployees([...data.employees, newEmployee]);
        res.status(201).json(data.employees);
    }

const updateEmployee = (req, res) => {
        const employee = data.employees.find(emp => emp.id === parseInt(req.body.id));
        if (!employee) { 
            return res.status(400).json({ 'message' : 'no emp found with given id'})   
        }

        if (req.body.firstname) employee.firstname = req.body.firstname
        if (req.body.lastname) employee.lastname = req.body.lastname

        const filteredArray = data.employees.filter(emp => emp.id !== parseInt(req.body.id));
        const unSortedArray = [...filteredArray, employee];
        data.setEmployees(unSortedArray.sort((a, b) => (a.id > b.id) ? 1 : (a.id < b.id) ? -1 : 0));
        res.json(data.employees);

    } 

const deleteEmployee = (req, res) => {
      const employee = data.employees.find(emp => emp.id === parseInt(req.body.id));
        if (!employee) { 
            return res.status(400).json({ 'message' : `no emp found with given id: ${req.body.id}`})   
        }
        const filteredArray = data.employees.filter(emp => emp.id !== parseInt(req.body.id));
        data.setEmployees([...filteredArray])
        res.json(data.employees);
    
    }


module.exports = { 
    getAllEmployees,
    getEmployee,
    createNewEmployee, 
    updateEmployee, 
    deleteEmployee
}