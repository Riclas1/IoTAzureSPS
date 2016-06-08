var express = require('express');
var path = require('path');
var conf = require('./config.json');
var Snap7 = require('./Snap7.js');
var a = "";

var app = express();
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, './public')));
app.set('views', path.join(__dirname, 'views/'));

app.get('/', function (req, res) {
	// so wird die Datei index.html ausgegeben
	res.sendfile(__dirname + '/public/index.html');
});

app.get('/client', function (req, res) {
	// so wird die Datei index.html ausgegeben
	res.sendfile(__dirname + '/public/client.html');
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

var io = require('socket.io').listen(app.listen(conf.port));

io.sockets.on('connection', function (socket) {
    //socket.emit('message', { message: 'Hallo Felix Welcome to the Jungel' });
    socket.on('send', function (data) {
    Snap7.Call();
    if (Snap7.Values == 1) {
      a = "true";
    } else {
      a = "false";
    }
    io.sockets.emit('message', {message: a});
    });
});
module.exports = app;
