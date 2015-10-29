class AudioController < ApplicationController
  def show
  end
  
  def showsongs
  end
  
  def showsinglevid
  end
  
  def newurl
  @video = Video.new
  end
  
  def create
    @video = Video.create(user_params)
    if @video.save
       redirect_to :action => 'newurl'
    else
      redirect_to :action => 'newurl'
    end
  end
  
  
  private
    def user_params
      params.require(:video).permit(:title, :url)
    end
end
