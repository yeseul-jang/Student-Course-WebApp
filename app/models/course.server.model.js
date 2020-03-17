// Load the Mongoose module and Schema object
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//define a new CommentSchema
const CourseSchema = new Schema({
 //
 courseCode: String,
 courseName: String,
 section: String,
 semester: String,

 student: {
 type: Schema.Types.ObjectId,
 ref: 'Student'
 }
});
//
mongoose.model('Course', CourseSchema);