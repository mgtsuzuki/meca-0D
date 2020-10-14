Rails.application.routes.draw do
  #devise_for :users
  devise_for :users, :controllers => { registrations: 'registrations' }
  resources :users, only: [ :index ]
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root to: "dashboard#index"
end
