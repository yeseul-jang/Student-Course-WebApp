exports.render = function (req, res) {    
    //display index.ejs
    res.render('index', {
        title: 'Express REST API'
    });   

};