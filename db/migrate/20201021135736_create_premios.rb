class CreatePremios < ActiveRecord::Migration[6.0]
  def change
    create_table :premios do |t|
      t.string :nome
      t.integer :ano
      t.integer :user_id

      t.timestamps
    end
  end
end
