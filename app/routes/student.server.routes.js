var students = require('../../app/controllers/student.server.controller');
var express = require('express');
var router = express.Router();

module.exports = function (app) {
    //signIn / signOut
    app.post('/signin', students.authenticate);
    app.get('/read_cookie', students.isSignedIn);
    app.get('/signout', students.signout);
    app.get('/welcome', students.welcome);

    // Related to Student
    app.get('/students', students.requiresLogin, students.list);
    app.route('/students/:studentId')
        .get(students.read)
        .put(students.update)
        .delete(students.delete)

    app.param('studentId', students.studentByID);

    app.post('/', students.createStudent);
}