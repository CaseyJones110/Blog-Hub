class UsersController < ApplicationController

  def index
    render '/users/signup'
  end

  def create
    redirect_to root_path
  end

end
