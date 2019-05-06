import express from 'express';

const app = express();

app.use('/', express.static('../ReStyle-Frontend/dist/ReStyle'));

// this is an example used to test sending simple data to the front end
app.get('/ajax', function (req: any, res: any) {
    res.send({'text': 'hello angular'});
});

let port = 8000;
app.listen(port, function () {
    console.log("Application is listening on port" + port + "!");
});
