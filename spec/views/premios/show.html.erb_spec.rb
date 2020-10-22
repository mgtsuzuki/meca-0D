require 'rails_helper'

RSpec.describe "premios/show", type: :view do
  before(:each) do
    @premio = assign(:premio, Premio.create!(
      :nome => "Nome",
      :ano => 2,
      :user_id => 3
    ))
  end

  it "renders attributes in <p>" do
    render
    expect(rendered).to match(/Nome/)
    expect(rendered).to match(/2/)
    expect(rendered).to match(/3/)
  end
end
