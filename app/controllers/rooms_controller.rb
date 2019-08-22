class RoomsController < ApplicationController
  before_action :set_room, only: [:edit, :update]

  def index
    @rooms = current_user.rooms
  end


  def new
    @room = Room.new
    @room.users << current_user
  end

  def create
    @room = Room.new(room_params)
    if @room.save
      redirect_to root_path, notice: "グループを作成しました"
    else
      render :new
    end
  end

  def edit
    room = Room.find(params[:id])
    @users = room.users
  end

  def update
    if @room.update(room_params)
      redirect_to root_path, notice: "グループを編集しまいした"
    else
      render :edit
    end
  end

  private
  
  def room_params
    parametorRoom = params.require(:room).permit(:name)
    parametorGroup = params.require(:group).permit({:user_ids => []})
    parametorRoom.merge(parametorGroup)
    
  end

  def set_room
    @room = Room.find(params[:id])
  end
 
end
