const config = {
	port: process.env.PORT || 2000,
	db: process.env.MONGOLAB_URI || "mongodb://localhost/employeeapi",
	test_port: 2001,
	test_db: "mongodb://localhost/employeeapi_test"
}
module.exports = config;