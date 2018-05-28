const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Employee schema
const EmployeeSchema = new Schema({
	name: {type: String,required: true},
	salary: { type:Number,required: true},
	},{
    timestamps: true
  });
var EmployeeModel = mongoose.model('Employee', EmployeeSchema);
module.exports = EmployeeModel;