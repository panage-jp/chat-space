json.array! @messages do |message|
  json.body message.body
  json.image message.image.url if message.image
  json.created_at message.created_at.strftime("%Y/%m/%d %H:%M")
  json.user message.user.name
  json.id message.id
end