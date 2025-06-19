const path = require('path');
const Employee = require('../model/Employee');

//** this verwijst naar data */

const getAllEmployees = async (req, res) => {
        const employees = await Employee.find();
        if (!employees) return res.status(204).json({"message": "No employees found"})
        res.status(200).json(employees);
    };

const getEmployee = async (req, res) => {
        if (!req?.params?.id) return res.status(400).json({'message' : 'id needed'});
        const employee = await Employee.findOne({ _id : req.params.id }).exec();

        if (!employee) return res.status(204).json({ 'message' : `no emp found with given id ${req.params.id}`})
        res.status(200).json(employee);

    }

const createNewEmployee = async (req, res) => {
        const newEmployee = {
            firstname: req.body.firstname,
            lastname: req.body.lastname
        }

        if (!newEmployee.firstname || !newEmployee.lastname){
            return res.status(400).json({'message' : 'provide a name'})
        }

        try {
            const result = await Employee.create({
                firstname: newEmployee.firstname,
                lastname: newEmployee.lastname
            });
            res.status(201).json(result);

        } catch (err) {
            console.error(err);
        }
    
    }

const updateEmployee = async (req, res) => {
        if (!req?.body?.id) return res.status(400).json({'message' : 'id needed'});
        
        const employee = await Employee.findOne({ _id : req.body.id }).exec();

        if (!employee) return res.status(204).json({ 'message' : 'no emp found with given id'})   
        

        if (req.body.firstname) employee.firstname = req.body.firstname
        if (req.body.lastname) employee.lastname = req.body.lastname
        
        const result = await Employee.save();

        res.status(200).json(result);

    } 

const deleteEmployee = async (req, res) => {
    if (!req?.body?.id) return res.status(400).json({'message' : 'id needed'});
      const employee = Employee.findOne({ _id : req.body.id}).exec();
        if (!employee) return res.status(400).json({ 'message' : `no emp found with given id: ${req.body.id}`})   
        
        const result = await Employee.deleteOne({ _id : req.body.id });
         res.status(200).json(result);

    
    }


module.exports = { 
    getAllEmployees,
    getEmployee,
    createNewEmployee, 
    updateEmployee, 
    deleteEmployee
}