const Student = require('mongoose').model('Student');

exports.createStudent = function (req, res, next) {
  
    var student = new Student(req.body); //get data from ejs page and attaches them to the model

    // Use the 'User' instance's 'save' method to save a new user document
    student.save(function (err) {
        if (err) {
            // Call the next middleware with an error message
            return next(err);
        } else {
            // Use the 'response' object to send a JSON response
            res.json(student);
            
        }
    });
};

exports.list = function (req, res, next) {
    // Use the 'Student' instance's 'find' method to retrieve a new student document
    Student.find({}, function (err, students) {
        if (err) {
            return next(err);
        } else {
            res.json(students);
        }
    });
};

exports.read = function(req, res) {
	// Use the 'response' object to send a JSON response
	res.json(req.student);
};

exports.studentByID = function (req, res, next, id) {
	// Use the 'student' static 'findOne' method to retrieve a specific student
	Student.findOne({
        _id: id
	}, (err, student) => {
		if (err) {
			// Call the next middleware with an error message
			return next(err);
		} else {
			// Set the 'req.student' property
            req.student = student;
            console.log(student);
			// Call the next middleware
			next();
		}
	});
};
