class Room < ApplicationRecord
  has_many :users_rooms
  has_many :messages
  has_many :users, through: :users_rooms
  validate :users_number
  validates :name, presence: true

  def last_message
    if not self.messages.present?
      "メッセージはありません"
    elsif self.messages.last.body.present?
      self.messages.last.body
    else
      "画像が送信されました"
    end
    
  end

  private
  def users_number
    errors.add(:users, "を1つ以上指定してください") if users.size < 1
  end



end

  
  


