var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(err, conn) {
  conn.createChannel(function(err, ch) {
    var q = 'textTraduit';
    ch.assertExchange('echangeur_topic_01','topic',{durable:false});
    ch.assertQueue(q, {durable: false});
console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);
ch.consume(q, function(msg) {


//ICI ON RECOIT LE MESSAGE DE P2
var message = msg.content.toString();
message = message.split('/');
  console.log(message);
}, {noAck: true});
  });
});


amqp.connect('amqp://localhost', function(err, conn) {
  conn.createChannel(function(err, ch) {
    var q = 'imageResize';
    ch.assertExchange('echangeur_topic_01','topic',{durable:false});
    ch.assertQueue(q, {durable: false});
console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);
ch.consume(q, function(msg) {


//ICI ON RECOIT LE MESSAGE DE P3
var message = msg.content.toString();
message = message.split('/');
  console.log(message);
}, {noAck: true});
  });
});

