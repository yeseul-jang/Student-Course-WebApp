var students = require('../../app/controllers/student.server.controller');
var express = require('express');
var router = express.Router();

module.exports = function(app)
{
    app.get('/students',students.list);
    app.route('/students/:studentId')
    .get(students.read)
    
    app.param('studentId', students.studentByID);

    app.post('/', students.createStudent);
}