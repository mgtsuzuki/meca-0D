require 'rails_helper'

RSpec.describe "premios/new", type: :view do
  before(:each) do
    assign(:premio, Premio.new(
      :nome => "MyString",
      :ano => 1,
      :user_id => 1
    ))
  end

  it "renders new premio form" do
    render

    assert_select "form[action=?][method=?]", premios_path, "post" do

      assert_select "input[name=?]", "premio[nome]"

      assert_select "input[name=?]", "premio[ano]"

      assert_select "input[name=?]", "premio[user_id]"
    end
  end
end
