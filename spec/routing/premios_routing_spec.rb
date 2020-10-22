require "rails_helper"

RSpec.describe PremiosController, type: :routing do
  describe "routing" do
    it "routes to #index" do
      expect(:get => "/premios").to route_to("premios#index")
    end

    it "routes to #new" do
      expect(:get => "/premios/new").to route_to("premios#new")
    end

    it "routes to #show" do
      expect(:get => "/premios/1").to route_to("premios#show", :id => "1")
    end

    it "routes to #edit" do
      expect(:get => "/premios/1/edit").to route_to("premios#edit", :id => "1")
    end


    it "routes to #create" do
      expect(:post => "/premios").to route_to("premios#create")
    end

    it "routes to #update via PUT" do
      expect(:put => "/premios/1").to route_to("premios#update", :id => "1")
    end

    it "routes to #update via PATCH" do
      expect(:patch => "/premios/1").to route_to("premios#update", :id => "1")
    end

    it "routes to #destroy" do
      expect(:delete => "/premios/1").to route_to("premios#destroy", :id => "1")
    end
  end
end
