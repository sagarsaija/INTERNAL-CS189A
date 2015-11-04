class LocationsController < ApplicationController
  before_action :set_location, only: [:show]

  def show
    @locations = locations.all
    @hash = Gmaps4rails.build_markers(@locations) do |location, marker|
      marker.lat locations.latitude
      marker.lng locations.longitude
      marker.infowindow "location: "
    end
  end

end
