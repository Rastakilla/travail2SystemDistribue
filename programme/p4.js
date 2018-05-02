var amqp = require('amqplib/callback_api');
var fs = require("fs");
var message1;
var message2;
	var encodedImg1;
	var encodedImg2;
	var encodedImg3;
var Client = require('mariasql');
amqp.connect('amqp://localhost', function(err, conn) {
  conn.createChannel(function(err, ch) {
    var q = 'textTraduit';
    ch.assertExchange('echangeur_topic_01','topic',{durable:false});
    ch.assertQueue(q, {durable: false});
console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);
ch.consume(q, function(msg) {


//ICI ON RECOIT LE MESSAGE DE P2
message1 = msg.content.toString();
message1 = message1.split('/');
  console.log(message1);
var c = new Client({
  		host: 'localhost',
  		user: 'root',
  		password: 'test',
		db: 'testMariadbGalera'
	});
	c.query("INSERT INTO texte (En, Fr) VALUES ('"+message1[0]+"','"+message1[1]+"')", function (err, result) {
if(err)
console.log(err);
	});

}, {noAck: true});
  });
});


amqp.connect('amqp://localhost', function(err, conn) {
  conn.createChannel(function(err, ch) {
    var q = 'imageResize';
    ch.assertExchange('echangeur_topic_01','topic',{durable:false});
    ch.assertQueue(q, {durable: false});
console.log(" [*] Ca marche. To exit press CTRL+C", q);
ch.consume(q, function(msg) {


//ICI ON RECOIT LE MESSAGE DE P3
message2 = msg.content.toString();
message2 = JSON.parse(message2);
			var c = new Client({
				host: 'localhost',
				user: 'root',
				password: 'test',
				db: 'testMariadbGalera'
			});
			c.query("INSERT INTO image (petite, normal,grosse) VALUES ('"+message2[0] +"','"+message2[1] +"','"+message2[2] +"')", function (err, result) {
			if(err)
				console.log(err);
});

}, {noAck: true});
  });
});







