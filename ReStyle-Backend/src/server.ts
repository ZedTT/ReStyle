import express from 'express';

const app = express();

app.use('/', express.static('../ReStyle-Frontend/dist/ReStyle'));

let port = 8000;
app.listen(port, function () {
    console.log("Application is listening on port" + port + "!");
});
