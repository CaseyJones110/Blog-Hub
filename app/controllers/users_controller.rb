class UsersController < ApplicationController

  def index
    render '/users/signup'
  end

  def create
    @user= User.new(user_params)
    if @user.save
      flash[:message] = "Success"
      redirect_to root_path
    else
      flash[:message] = @user.errors.full_messages.to_sentence
      redirect_to '/users'
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :password)
  end
end
