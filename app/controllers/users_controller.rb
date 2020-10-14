class UsersController < ApplicationController
    def index
        @users = User.all.limit(10)
    end
end
