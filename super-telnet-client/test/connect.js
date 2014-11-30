var telnet = require('../lib/super-telnet-client');
var nodeunit = require('nodeunit');
var socket;
var routerTest = '192.168.1.10';
var routerTestPort = 23;


// exports.ConnectionTest = function(test){
//   socket = new telnet();
//   socket.connect({
//     host: '192.168.1.10',
//     port: 23
//   });
//   socket.on('error', function() {
//     console.log('Connection Failed');
//     socket.end();
//     test.done();
//   });
//   socket.on('connect', function() {
//     console.log('Connection Successfull');
//     socket.end();
//     socket.destroy();
//     test.done();
//   });
//   socket.on('close', function() {
//     console.log('Connection Closing');
//     socket.destroy();
//   });
//   socket.on('end', function() {
//     console.log('Connection Ended');
//     socket.destroy();
//     test.done();
//   });
// };

exports.CommandTest = function (test) {
  socket = new telnet();
  socket.connect({
    host: '192.168.1.10',
    port: 23,
    username: 'admin',
    password: 'admin'
  });
  socket.on('error', function() {
    console.log('Connection Failed');
    socket.end();
    test.ok(false,'Could not connect to test arguments');
    test.done();
  });
  socket.on('connect', function(prompt) {
    console.log('prompt'+prompt);

    socket.on('writedone',function() {
      console.log('writedone');
    });

    socket.exec('show version', function(response) {
      console.log('Command answer');
      console.log(response);
      socket.end();
      test.done();
    });
  });
  socket.on('close', function() {
    socket.destroy();
  });
  socket.on('end', function() {
    socket.destroy();
  });
};