class CreateUserRooms < ActiveRecord::Migration[5.0]
  def change
    create_table :user_rooms do |t|
      t.integer :user_id, null: false, foreign_key: true
      t.integer :room_id, null: false, foreign_key: true
      t.timestamps
    end
  end
end
