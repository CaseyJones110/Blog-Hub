class SessionController < ApplicationController

  def create
    user = User.find_by(email: user_params[:email])

    if user && user.authenticate(user_params[:password])
      session[:current_user_id] = user.id
      flash[:message] = "Logged in"
      redirect_to root_path
    else
      flash[:message] = "login info is incorrect"
      redirect_to users_path
    end
  end

  def destroy
    session[:current_user_id] = nil
    flash[:message] = "Logged out"
    redirect_to root_path
  end

  private

  def user_params
    params.require(:user).permit(:email, :password)
  end
end
