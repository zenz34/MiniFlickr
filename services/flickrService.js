var flickrApi = require('flickrapi');
var flickrOptions = {
    //put your flickr api key here
    api_key: "f0202ed07c3b34c80bd753f97884f25b",
    secret: "bf59c7c79803c416"
};

var recentPhotos = [];
var photoCount = 10;
var searchTag = 'mountain';

/*


https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg
	or
https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}_[mstzb].jpg
	or
https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{o-secret}_o.(jpg|gif|png)



*/



function getRecentFlickrPhotos(callback) {
    flickrApi.tokenOnly(flickrOptions, function(err, flickr){
        //console.log(flickr);
        flickr.photos.search({api_key: flickrOptions.api_key, tags: searchTag, per_page: 10, page: 1}, function(err, result) {
            if (err) {
                console.log(err);
                return;
            }
        
            var photos = result.photos.photo;
            var i = 0;
            photos.forEach(function (photo) {
                var title = photo.title;
                var link = composePhotoUrl(photo.owner, photo.id);
                var src = composePhotoSrc(photo.farm, photo.server, photo.id, photo.secret);

                console.log(title + '\n' + link + '\n' + src);
                populateTags(flickr, photo.id, function (tags) {
                    recentPhotos.push({
                        title: title,
                        link: link,
                        src: src,
                        tags: tags,
                        originalIndex: i++
                    });

                    
                    if (recentPhotos.length == 10) {
                        callback();
                    }
                });
            });
        });
    });
}

//  
function composePhotoUrl(userId, photoId) {
    //https://www.flickr.com/photos/12037949754@N01/155761353/
    return 'https://www.flickr.com/photos/' + userId + '/' + photoId;
}

function composePhotoSrc(farm, server, id, secret) {
    //https://c1.staticflickr.com/5/4551/37951269985_b6cb8650fb_m.jpg%22
    //https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg
    return 'https://farm' + farm + '.staticflickr.com/' + server + '/' + id + '_' + secret + '.jpg';
}

//  get flickr info
function populateTags(flickr, photoId, callback) {
    flickr.photos.getInfo({photo_id: photoId}, function (err, result) {
        var rawTags = [];
        result.photo.tags.tag.forEach(function (tag) {
            rawTags.push(tag.raw);
        });
        tags = rawTags.join();
        callback(tags);
    });
}

module.exports = {
    getRecentFlickrPhotos: getRecentFlickrPhotos,
    recentPhotos: recentPhotos
};

// /**
//  * 
//  * @param {} callback 
//  */
// function getRecentFlickrPhotos(callback) {
//     flickrApi.tokenOnly(flickrOptions, function (err, flickr) {
//         flickr.photos.search({tags: searchTag, page: 1, per_page: photoCount}, function (err, result) {
//             if (err) {
//                 console.log(err);
//                 return;
//             }
//             var photos = result.photos.photo;
//             var i = 0;
//             photos.forEach(function (photo) {
//                 var title = photo.title;
//                 var link = composePhotoUrl(photo.owner, photo.id);
//                 var src = composePhotoSrc(photo);

//                 populateTags(flickr, photo.id, function (tags) {
//                     recentPhotos.push({
//                         title: title,
//                         link: link,
//                         src: src,
//                         tags: tags,
//                         originalIndex: i++
//                     });
//                     if (recentPhotos.length == 100) {
//                         callback();
//                     }
//                 });
//             });
//         });
//     });
// }

// function composePhotoUrl(userId, photoId) {
//     //https://www.flickr.com/photos/12037949754@N01/155761353/
//     return 'https://www.flickr.com/photos/' + userId + '/' + photoId;
// }

// function composePhotoSrc(photo) {
//     //https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg
//     return 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '.jpg';
// }

// function populateTags(flickr, photoId, callback) {
//     flickr.photos.getInfo({photo_id: photoId}, function (err, result) {
//         var rawTags = [];
//         result.photo.tags.tag.forEach(function (tag) {
//             rawTags.push(tag.raw);
//         });
//         tags = rawTags.join();
//         callback(tags);
//     });
// }


