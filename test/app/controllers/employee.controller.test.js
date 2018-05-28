"use strict";

var should = require('should'),
	sinon = require('sinon'),
	mongoose = require('mongoose');

require('sinon-mongoose');

var EmployeeModel = require('../../../app/models/employee.model');

describe('EmployeeController testing', function () {

	describe('Employee Post test', function () {
		
		it('Should call save only once', function () {
			var saveStub = sinon.stub();
			function Employee(){
				this.save = saveStub
			}
			var req = {
				body: {
					employee: "Test employee from mock"
				}
			}
			var res = {}, next = {};
			var EmployeeController = require('../../../app/controllers/employee.controller')(Employee);
			EmployeeController.PostEmployee(req, res, next);
			sinon.assert.calledOnce(saveStub);
		});

		it('Should save employee', function (done) {
			var employeeMock = sinon.mock(new EmployeeModel({ employee: 'Save new employee from mock'}));
			var employee = employeeMock.object;

			employeeMock
			.expects('save')
			.yields(null, 'SAVED');

			employee.save(function(err, result) {
				employeeMock.verify();
				employeeMock.restore();
				should.equal('SAVED', result, "Test fails due to unexpected result")
				done();
			});
		});

	});

	describe('Get all Employee test', function () {
		it('Should call find once', function (done) {
			var employeeMock = sinon.mock(EmployeeModel);
			employeeMock
			.expects('find')
			.yields(null, 'EMPLOYEES');

			EmployeeModel.find(function (err, result) {
				employeeMock.verify();
				employeeMock.restore();
				should.equal('EMPLOYEES', result, "Test fails due to unexpected result")
				done();
			});
		});
	});

	describe('Delete employee test', function () {
		it('Should delete employee of gived id', function (done) {
			var employeeMock = sinon.mock(EmployeeModel);

			employeeMock
			.expects('remove')
			.withArgs({_id: 12345})
			.yields(null, 'DELETED');

			EmployeeModel.remove({_id: 12345}, function(err, result){
				employeeMock.verify();
				employeeMock.restore();
				done();
			})


		});
	});

	describe('Update a employee', function () {
		it('Should update the employee with new value', function (done) {
			var employeeMock = sinon.mock(new EmployeeModel({ employee: 'Save new employee from mock'}));
			var employee = employeeMock.object;

			employeeMock
			.expects('save')
			.withArgs({_id: 12345})
			.yields(null, 'UPDATED');

			employee.save({_id: 12345}, function(err, result){
				employeeMock.verify();
				employeeMock.restore();
				done();
			})

		});
	});

});