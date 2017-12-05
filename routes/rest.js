var express = require('express');
var router = express.Router();

var flickrService = require('../services/flickrService');

router.get('/photos', function(req, res) {
    // ??  ip? diff betw 2 addr
    var ip = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress || 
        req.socket.remoteAddress;

    //sleep(1000);
    //console.log("Got a client request from " + ip);
    var photos = flickrService.recentPhotos;
    //console.log("End client request!");
    res.json(photos);
});

module.exports = router;