var express = require('express');
var app = express();


var flickrService = require('./services/flickrService') ; 

flickrService.getRecentFlickrPhotos(function() {
    var restRouter = require('./routes/rest');      //  ?
    app.use('/', express.static(__dirname + '/'));  //  ?
    app.use('/api/v1', restRouter);                 //  ?
    app.listen(3000);
    console.log('Server initialized!');        
});



/**
express()
app.use()  
    route name and its handler? 
    what about the 1st '/' , 
        express_static()?

app.listen(port);
    start the server and  listen to the port



    express_static()
        Static files are files that clients download as they are from the server. Create a new directory, public. Express, by default does not allow you to serve static files. You need to enable it using the following built-in middleware.

        primitevie idea
        It means that it enable the server to use the files in the '\' dir.

 
 
 
 How to start index.html?


 rest.js
 x  res.send('../index.html');
 may be index.html is a default main page.


        * 
 */