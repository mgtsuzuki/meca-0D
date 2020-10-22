class AddLowerIndexesToUsers < ActiveRecord::Migration[6.0]
  def change
    add_index :users, "lower(last_name) varchar_pattern_ops"
    add_index :users, "lower(first_name) varchar_pattern_ops"
    add_index :users, "lower(email)"
  end
end
