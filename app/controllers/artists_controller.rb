class ArtistsController < ApplicationController
  before_action :require_current_user

  def new
    @artist = Artist.new
  end

  def create
    @artist = Artist.new(artist_params)
    @artist.user = current_user

    @current_user.artists << @artist
    @current_user.save

    if @artist.save
      redirect_to artists_path
    else
      flash[:message] = @artist.errors.full_message.to_sentence
      render :new
    end
  end

  def show

  end

  def index
    @artists = current_user.artists
  end

  def destroy
    Artist.find(params[:id]).destroy
    redirect_to artists_path
  end

  private

  def artist_params
    params.require(:artist).permit(:name)
  end
end
