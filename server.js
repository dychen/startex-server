var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.send('<h1>Hello world</h1>');
});

io.on('connection', function(socket){
  console.log('[DEBUG] user connected');

  socket.on('sfx-bid-buy-req', function(data){
    console.log('[DEBUG] Received buy request', data.bid.id, data.user);
    io.emit('sfx-bid-buy-res', {
      id: data.bid.id,
      company: data.bid.company,
      shares: data.bid.shares,
      price: data.bid.price,
      issuer: data.user
    });
  });

  socket.on('sfx-bid-sell-req', function(data){
    console.log('[DEBUG] Received sell request', data.user);
    io.emit('sfx-bid-sell-res', {
      id: Math.floor(Math.random() * 1000000000),
      company: data.bid.company,
      shares: data.bid.shares,
      price: data.bid.price,
      issuer: data.user
    });
  });

  socket.on('disconnect', function(){
    console.log('[DBUG] user disconnected');
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
