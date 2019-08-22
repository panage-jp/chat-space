json.body @message.body
json.image @message.image.url
json.room_id @message.room_id
json.user @message.user.name
json.created_at @message.created_at.strftime("%Y/%m/%d %H:%M")
json.id @message.id