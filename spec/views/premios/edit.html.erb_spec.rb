require 'rails_helper'

RSpec.describe "premios/edit", type: :view do
  before(:each) do
    @premio = assign(:premio, Premio.create!(
      :nome => "MyString",
      :ano => 1,
      :user_id => 1
    ))
  end

  it "renders the edit premio form" do
    render

    assert_select "form[action=?][method=?]", premio_path(@premio), "post" do

      assert_select "input[name=?]", "premio[nome]"

      assert_select "input[name=?]", "premio[ano]"

      assert_select "input[name=?]", "premio[user_id]"
    end
  end
end
