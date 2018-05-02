require 'bunny'
require 'mini_magick'
require 'securerandom'
require 'base64'
require 'open-uri'
connection = Bunny.new
connection.start

channel = connection.create_channel
channel.topic("echangeur_topic_01")
queue = channel.queue('path')
begin
  puts ' [*] Ca marche. To exit press CTRL+C'
  queue.subscribe(block: true) do |_delivery_info, _properties, body|
    #puts " [x] Received #{body}"
    pathe = "#{body}"
	plain = Base64.decode64(pathe)
	newfile=File.new("somefilename.png",'wb')
	newfile.write(plain)
	image = MiniMagick::Image.open(newfile)
	randomStringOriginal = SecureRandom.hex
	image.write randomStringOriginal+".png"
	file_contents = open(randomStringOriginal+'.png') { |f| f.read }
	enc = Base64.strict_encode64(file_contents)
	image.resize "100x100"
	image.format "png"
	random_string = SecureRandom.hex
	image.write random_string+".png"
	file_contents = open(random_string+'.png') { |f| f.read }
	enc2 = Base64.strict_encode64(file_contents)
	image.resize "200x200"
	image.format "png"
	random_string = SecureRandom.hex
	image.write random_string+".png"
	file_contents = open(random_string+'.png') { |f| f.read }
	enc3 = Base64.strict_encode64(file_contents)
	nomImage = Array.new
	nomImage = [enc,enc2,enc3]
	nomImage = JSON.generate(nomImage)
	channel = connection.create_channel
	channel.topic("echangeur_topic_01")
	queue = channel.queue('imageResize')
	channel.default_exchange.publish(nomImage, routing_key: queue.name)
  end
rescue Interrupt => ¯_
  connection.close

  exit(0)
end
