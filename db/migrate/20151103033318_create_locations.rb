class CreateLocations < ActiveRecord::Migration
  def change
    create_table :locations do |t|
      t.float :latitude
      t.float :lonitude
      t.string :address
      t.string :IPaddy

      t.timestamps null: false
    end
  end
end
