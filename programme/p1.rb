require 'rubygems'
require 'json'
require 'bunny'
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
	channel.default_exchange.publish(i["path"], routing_key: queue.name)
#rabbitMQ IMG
end
	connection.close
