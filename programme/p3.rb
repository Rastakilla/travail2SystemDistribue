require 'bunny'
require 'mini_magick'
require 'securerandom'
connection = Bunny.new
connection.start

channel = connection.create_channel
channel.topic("echangeur_topic_01")
queue = channel.queue('path')
begin
  puts ' [*] Waiting for messages. To exit press CTRL+C'
  queue.subscribe(block: true) do |_delivery_info, _properties, body|
    puts " [x] Received #{body}"
    pathe = "#{body}"
	image = MiniMagick::Image.open(pathe)
	image.resize "100x100"
	image.format "png"
	random_string = SecureRandom.hex
	image.write random_string+".png"
	nomImage = random_string
	image.resize "200x200"
	image.format "png"
	random_string = SecureRandom.hex
	image.write random_string+".png"
	nomImage = nomImage+".png"+"/"+random_string+".png"
	puts nomImage
	channel = connection.create_channel
	channel.topic("echangeur_topic_01")
	queue = channel.queue('imageResize')
	channel.default_exchange.publish(nomImage, routing_key: queue.name)
  end
puts pathe
rescue Interrupt => ¯_
  connection.close

  exit(0)
end
