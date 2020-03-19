var students = require('../../app/controllers/student.server.controller');
var courses = require('../../app/controllers/course.server.controller');


module.exports = function (app) {
    app.route('/api/courses')
        .get(courses.list)
        .post(students.requiresLogin, courses.create);
    //
    app.route('/api/courses/:courseId')
        .get(courses.read)
        .put(students.requiresLogin, courses.hasAuthorization, courses.update)
        .delete(students.requiresLogin, courses.hasAuthorization, courses.delete);
    //
    app.param('courseId', courses.courseByID);

    app.route('/api/studentCourses/:studentId2')
        .get(courses.readStudentCourseList);

    app.param('studentId2', courses.courseByStudentID);

    app.route('/api/addCourse/:courseId')
        .post(students.requiresLogin, courses.addCourse);




    app.route('/api/studentListByCourse/:couresId2')
        .get(courses.readStudentList);

    app.param('couresId2', courses.studentByCourseId);
};
