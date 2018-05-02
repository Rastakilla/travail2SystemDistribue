require 'rubygems'
require 'json'
require 'bunny'
require 'base64'
require 'open-uri'
	connection = Bunny.new
	connection.start
file = File.read('/home/coolbreeze/Bureau/travail2/JSON/file.json')
data_hash = JSON.parse(file)
data_hash.each do |i|
	channel = connection.create_channel
	channel.topic("echangeur_topic_01")
	queue = channel.queue('text')
	channel.default_exchange.publish(i["title"], routing_key: queue.name)
#rabbitMQ TEXT
end
data_hash.each do |i|
	channel = connection.create_channel
	channel.topic("echangeur_topic_01")
	queue = channel.queue('path')
	file_contents = open('../Image/'+i["path"]) { |f| f.read }
	enc = Base64.strict_encode64(file_contents)
	channel.default_exchange.publish(enc, routing_key: queue.name)
#rabbitMQ IMG
end
	connection.close
