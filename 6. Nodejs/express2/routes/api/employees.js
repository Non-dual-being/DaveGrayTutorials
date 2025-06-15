const express = require('express');
const emprouter = express.Router();
const path = require('path');
const ROLES_LIST = require(path.join(__dirname, '..', '..', 'config', 'roles_list'));
const verifyRoles =  require(path.join(__dirname, '..', '..', 'middleware', 'verifyRoles'));

const { 
    getAllEmployees, 
    getEmployee,
    createNewEmployee, 
    updateEmployee, 
    deleteEmployee
} = require(path.join(__dirname, "..", "..", "controllers", "employeesController"));



emprouter.route('/')
    .get(getAllEmployees)
    .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), createNewEmployee)
    .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),updateEmployee)
    .delete(verifyRoles(ROLES_LIST.Admin), deleteEmployee);

emprouter.route('/:id')
    .get(getEmployee)


module.exports = emprouter;