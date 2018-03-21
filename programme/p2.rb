require 'bunny'
require 'y/translate'
connection = Bunny.new
connection.start

channel = connection.create_channel
channel.topic("echangeur_topic_01")
queue = channel.queue('text')
Y::Translate.configure do |config|
  config.api_key ='trnsl.1.1.20180320T021335Z.a16b8466ed40e52f.ba6289f78b22b222c08ba950b580eeaf82967ac3'
  config.lang_to = 'fr'
end
begin
  queue.subscribe(block: true) do |_delivery_info, _properties, body|
    textEn = "#{body}"
    textFr = Y::Translate.translate("#{body}")
		text = textEn + '/' + textFr
		puts text 
		channel = connection.create_channel
		channel.topic("echangeur_topic_01")
		queue = channel.queue('textTraduit')
		channel.default_exchange.publish(text, routing_key: queue.name)
  end
rescue Interrupt => _
  connection.close

  exit(0)
end
