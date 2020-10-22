require 'rails_helper'

RSpec.describe "premios/index", type: :view do
  before(:each) do
    assign(:premios, [
      Premio.create!(
        :nome => "Nome",
        :ano => 2,
        :user_id => 3
      ),
      Premio.create!(
        :nome => "Nome",
        :ano => 2,
        :user_id => 3
      )
    ])
  end

  it "renders a list of premios" do
    render
    assert_select "tr>td", :text => "Nome".to_s, :count => 2
    assert_select "tr>td", :text => 2.to_s, :count => 2
    assert_select "tr>td", :text => 3.to_s, :count => 2
  end
end
