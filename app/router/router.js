const Employee = require('../models/employee.model');
const EmployeeController = require('../controllers/employee.controller')(Employee);
module.exports = function(app)
{
	app.get('/api/employees', EmployeeController.GetEmployee);
	app.post('/api/employees', EmployeeController.PostEmployee);
	app.put('/api/employees', EmployeeController.UpdateEmployee);
	app.delete('/api/employees', EmployeeController.DeleteEmployee);
}