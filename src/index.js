const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();

const mongoose = require('mongoose');

app.set('port', process.env.PORT || 3000);

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://chikired-db:Lh4phrF0sbhfDoC8fWkf8KumLjENb9Q6J0b8dP5verRJ5NyLWE2jyk5M8E956o7gjzCjWQ49cnmKkEBfOb4MEg%3D%3D@chikired-db.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&maxIdleTimeMS=120000&appName=@chikired-db@")
    .then(() => {
        console.log('Connection to CosmosDB successful');
    })
    .catch((err) => console.error(err));


// settings

// middlewares
app.use(morgan('dev'));
app.use(express.json());

// routes
app.use('/api', require('./routes/usuarios'));

// static
app.use(express.static(path.join(__dirname, 'public')));;

// listenning on port
app.listen(app.get('port'), () => {
    console.log(`server on port http://localhost:${app.get('port')}`);
});