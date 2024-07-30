//Express
var express = require('express');
var cookieParser = require('cookie-parser');
var bluebird = require('bluebird');

//incorporo cors
var cors = require('cors');

//importo router
var indexRouter = require('./src/routes/index');
var apiRouter = require('./src/routes/api'); //Custom

//instancio el servidor
var app = express();
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));

//aplico cors
app.use(cors());
app.use(cookieParser());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:4000");
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});


//Indico las rutas de los endpoint
app.use('/api', apiRouter);
app.use('/', indexRouter);


// if (process.env.NODE_ENV === 'Development') {
  require('./config').config();
// }


//Database connection --
var mongoose = require('mongoose')
mongoose.Promise = bluebird;
let url = `${process.env.DATABASE1}${process.env.DATABASE2}=${process.env.DATABASE3}=${process.env.DATABASE4}`
let opts = {
  //useNewUrlParser : true, 
  connectTimeoutMS:20000, 
  //useUnifiedTopology: true
  };

mongoose.connect(url,opts)
  .then(() => {
    console.log(`La conexión a la base de mongoDB fue exitosa..`)
  })
  .catch((e) => {
    console.log(`Error en la conexión a la base de mongoDB...`),
    console.log(e)
  })


// Setup server port
var port = process.env.PORT || 4001;
// Escuchar en el puerto
app.listen(port,()=>{
    console.log('API iniciada en el puerto ',port);
});


module.exports = app;