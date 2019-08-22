class MessagesController < ApplicationController
  before_action :set_room_rooms_messages


  def index
    set_message
    
  end

  def create
    set_message
    @message = @room.messages.new(message_params)
    @message.save
    respond_to do |format|
     format.html
     format.json
    end
  end

  
  
  
  
  private
  
  def set_room_rooms_messages
    @room = Room.find(params[:room_id])
    @rooms = current_user.rooms
    @messages = @room.messages.includes(:user)
  end 

  def set_message
    @message = Message.new
  end

  def message_params
    params.require(:message).permit(:body,:image).merge(user_id: current_user.id)
  end
end
