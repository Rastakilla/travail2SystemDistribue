var amqp = require('amqplib/callback_api');
var message1;
var message2;
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
console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);
ch.consume(q, function(msg) {


//ICI ON RECOIT LE MESSAGE DE P3
message2 = msg.content.toString();
message2 = message2.split('/');
  console.log(message2);
fs.open(message2[0], 'r', function (status, fd) {
    if (status) {
        console.log(status.message);
        return;
    }
    var fileSize = getFilesizeInBytes(message2[0]);
    var buffer = new Buffer(fileSize);
    fs.read(fd, buffer, 0, fileSize, 0, function (err, num) {

        var query = "INSERT INTO image SET ?",
            values = {
                file_type: 'img',
                file_size: buffer.length,
                file: buffer
            };

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

    });
});
}, {noAck: true});
  });

});







