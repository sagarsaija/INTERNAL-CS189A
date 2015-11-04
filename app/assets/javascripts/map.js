function findUser(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var mapOptions = {
                center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
                zoom: 16};
            console.log("got location");
            $.ajax({
                url: "location/save_user_location",
                type: "POST",
                data: {lat: position.coords.latitude, lng: position.coords.longitude}
            });
            console.log("sent location");
            initMap(mapOptions)
        });
    }
    else {
        alert("Please use a browser that supports HTML5")}
}
function getViewerLocation(lat, lng){
    var mapOptions = {
        center: new google.maps.LatLng(lat,lng),
        zoom: 16};
    initMap(mapOptions);
}
function getMarkers(lat, lng){
    return $.ajax({
        url: "locations/load_local_mezzians",
        type: "GET",
        data: {lat: lat, lng: lng},
        dataType: 'json'
    });
}
function updateCount(instrument_id, count_type){
    $.ajax({
        url: "instruments/update_" + count_type + "_count",
        type: "PATCH",
        data: {instrument_id: instrument_id},
        dataType: 'json'
    });
}
function initMap(mapOptions) {
    console.log("building map");
    handler = Gmaps.build('Google');
    handler.buildMap({ provider: mapOptions, internal: {id: 'map_canvas'}}, function(){
        getMarkers(handler.getMap().getCenter().A, handler.getMap().getCenter().F).done(function(result) {
            result.map(function(m){
                marker = handler.addMarker(m);
                google.maps.event.addListener(marker.getServiceObject(), 'click', function(){
                    var instrument_id = m.infowindow.split("instrument_id: ").pop().split('<')[0];
                    updateCount(instrument_id, 'view');
                });
            });
        });
        google.maps.event.addListener(handler.getMap(), 'idle', function() {
            getMarkers(handler.getMap().getCenter().A, handler.getMap().getCenter().F).done(function (result) {
                result.map(function(m){
                    marker = handler.addMarker(m);
                    google.maps.event.addListener(marker.getServiceObject(), 'click', function(){
                        var instrument_id = m.infowindow.split("instrument_id: ").pop().split('<')[0];
                        updateCount(instrument_id, 'view');
                    });
                });
            });
        });
    });
}