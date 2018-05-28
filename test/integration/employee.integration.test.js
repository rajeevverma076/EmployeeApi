"use strict";
var should = require('should'),
	request = require('supertest'),
	app = require('../../server.js'),
	mongoose = require('mongoose'),
	Employee = mongoose.model('Employee'),
	agent = request.agent(app);

describe('Employee CRUD integration testing', function () {

	describe('Get all Employee', function () {

		before(function (done) {
			var newEmployee = { employee: "Employee from hooks" };
			agent
			.post('/api/employees')
			.end(function(){
				done();
			})
		});

		it('Should get status equal success and array of employee', function (done) {
			agent
			.get('/api/employees')
			.expect(200)
			.end(function(err, results){
				results.body.status.should.equal(true);
				done();
			});
		});
		
	});
	
	describe('Post a employees', function () {
		it('Should allow post to post a employees and return _id', function (done) {
			var params = { employee: "Employees from testing" };
			agent
			.post('/api/employees')
			.send(params)
			.expect(200)
			.end(function(err, results){
				results.body.employee.completed.should.equal(false);
				results.body.employee.should.have.property('_id');
				done();
			});
		});
	});
	
	describe('Delete a employee', function () {
		var id;
		before(function (done) {
			var params = { employee: "Employee from hooks to delete" };
			agent
			.post('/api/employees')
			.send(params)
			.end(function(err, result){
				id = result.body.employee._id;
				done();
			})
		});

		it('Should delete the employee by _id', function (done) {
			agent
			.delete('/api/employees/'+id)
			.end(function(err, result){
				result.body.status.should.equal(true);
				done();
			})
			
		});

	});

	describe('Update a employee', function () {
		var id;
		before(function (done) {
			var newEmployee = { employee: "Employee from hooks to update" };
			agent
			.post('/api/employees')
			.send(newEmployee)
			.end(function(err, result){
				id = result.body.employee._id;
				done();
			})
		});

		it('Should update the update of employee by _id to true', function (done) {
			var params = { completed: true };
			agent
			.put('/api/employees/'+id)
			.send(params)
			.end(function(err, result){
				result.body.status.should.equal(true);
				done();
			})
			
		});
	});

});

