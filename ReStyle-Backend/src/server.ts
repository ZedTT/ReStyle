import express from 'express';

const app = express();

// this is an example used to test sending simple data to the front end
app.get('/ajax', function (req: any, res: any) {
    res.send({'text': 'hello angular'});
});

/** 
 * Fallback on routes other than '/' because otherwise we get "Cannot get /..." issues.
 * We need to let angular handle the routing
 * ? See https://asknodejs.blogspot.com/2017/06/express-fallback-route-also-used-for.html
 * ? See https://angular.io/guide/deployment#routed-apps-must-fallback-to-indexhtml
 * ? See https://stackoverflow.com/a/46565926
 * ! This must be after every other more specific routing (get and post requests)
 * ! '*' refers to any url that was not already specified above.
 */
app.use('/', express.static('../ReStyle-Frontend/dist/ReStyle'));
app.use('*', express.static('../ReStyle-Frontend/dist/ReStyle')); // fallback

let port = 8000;
app.listen(port, function () {
    console.log("Application is listening on port" + port + "!");
});
