class Api::MessagesController < ApplicationController
  def index
    
    room = Room.find(params[:room_id])
    
    last_message_id = params[:id].to_i

    @messages = room.messages.includes(:user).where("id > #{last_message_id}")
    respond_to do |format|
     format.html
     format.json
    end
  end
end