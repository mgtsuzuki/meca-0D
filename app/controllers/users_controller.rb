class UsersController < ApplicationController
    PAGE_SIZE = 10
    def index
        @page = (params[:page] || 0).to_i

        if params[:keywords].present?
            @keywords = params[:keywords]
            user_search_term = UserSearchTerm.new(@keywords)
            @users = User.where(
                user_search_term.where_clause,
                user_search_term.where_args).
                order(user_search_term.order).
                offset(PAGE_SIZE * @page).limit(PAGE_SIZE)
        else
            @users = User.all.offset(PAGE_SIZE * @page).limit(PAGE_SIZE)
        end
        render json: @users
    end

    def page
    end
end
