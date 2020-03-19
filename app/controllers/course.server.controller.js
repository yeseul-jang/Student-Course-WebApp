const mongoose = require('mongoose');
const Course = mongoose.model('Course');
const Student = require('mongoose').model('Student');

function getErrorMessage(err) {
    if (err.errors) {
        for (let errName in err.errors) {
            if (err.errors[errName].message) return err.errors[errName].
                message;
        }
    } else {
        return 'Unknown server error';
    }
};

exports.create = function (req, res) {
    const course = new Course();
    course.courseCode = req.body.courseCode;
    course.courseName = req.body.courseName;
    course.section = req.body.section;
    course.semester = req.body.semester;

    console.log(req.body)
    //
    //
    Student.findOne({ studentNumber: req.body.studentNumber }, (err, student) => {

        if (err) { return getErrorMessage(err); }
        //
        req.id = student._id;
        console.log('student._id', req.id);


    }).then(function () {
        course.student = req.id
        console.log('req.student._id', req.id);

        course.save((err) => {
            if (err) {
                console.log('error', getErrorMessage(err))

                return res.status(400).send({
                    message: getErrorMessage(err)
                });
            } else {
                res.status(200).json(course);
            }
        });

    });
};
exports.update = function (req, res) {
    console.log('in update:', req.course)

    const course = req.course;
    course.courseCode = req.body.courseCode;
    course.courseName = req.body.courseName;
    course.section = req.body.section;
    course.semester = req.body.semester;

    course.save((err) => {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.status(200).json(course);
        }
    });
};
exports.list = function (req, res) {
    Course.find().sort('-created').populate('student', 'firstName lastName fullName').exec((err, courses) => {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.status(200).json(courses);
        }
    });
};
//
exports.courseByID = function (req, res, next, id) {
    // Course.findById(id).populate('student', 'firstName lastName fullName').exec((err, course) => {
    //     if (err) return next(err);
    //     if (!course) return next(new Error('Failed to load course '
    //         + id));
    //     req.course = course;
    //     console.log('in courseById:', req.course)
    //     next();
    // });
    Course.findOne({
        _id: id
	}, (err, course) => {
		if (err) {
			// Call the next middleware with an error message
			return next(err);
		} else {
			// Set the 'req.student' property
            req.course = course;
            console.log("course >>>", course);
			// Call the next middleware
			next();
		}
	});
};
//
exports.read = function (req, res) {
    res.status(200).json(req.course);
};


//The hasAuthorization() middleware uses the req.course and req.student objects
//to verify that the current user is the student of the current course
exports.hasAuthorization = function (req, res, next) {
    console.log('in hasAuthorization - student: ', req.course.student);
    console.log('in hasAuthorization- : ', req.id);

    if (req.course.student != req.id) {
        return res.status(403).send({
            message: 'student is not authorized'
        });
    }else {
        next();
    }
};

exports.delete = function(req, res, next) {
    Course.findByIdAndRemove(req.course.id, req.body, function (err, course) {
      if (err) return next(err);
      console.log("Success!");
      res.json(course);
    });
};