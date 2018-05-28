"use strict";
var EmployeeCtrl = function(Employee){

	var EmployeeObj = {};

	EmployeeObj.PostEmployee = function(req, res, next)
	{
		var employeeapi = new Employee(req.body);
		//console.log(employeeapi);
		//return true;
		employeeapi.save(function(err, emp)
		{
			console.log(err);
			if(err){
				res.json({status: false, error: err.message});
				return;
			}
			res.json({status: true, employee: emp});
		});
	}

	EmployeeObj.GetEmployee = function(req, res, next)
	{
		Employee.find(function(err, emps)
		{
			if(err) {
				res.json({status: false, error: "Something went wrong"});
				return
			}
			res.json({status: true, employee: emps});
		});
	}

	EmployeeObj.UpdateEmployee = function(req, res, next){
		var name = req.body.name;
		var salary = req.body.salary;
		var employee_id= req.body.employee_id;
		Employee.findById(employee_id, function(err, employee)
		{
			employee.name = name;
			employee.salary = salary;
			employee.save(function(err, employee){
				if(err) {
					res.json({status: false, error: "Employee not updated"});
				}
				res.json({status: true, message: "Employee updated successfully"});
			});
		});
	}

	EmployeeObj.DeleteEmployee = function(req, res, next)
	{
		var employee_id= req.body.employee_id;
		Employee.remove({_id :employee_id }, function(err, emp){
			if(err) {
				res.json({status: false, error: "Deleting employee is not successfull"});
			}
			res.json({status: true, message: "Employee deleted successfully"});
		});
	}

	return EmployeeObj;
}

module.exports = EmployeeCtrl;
