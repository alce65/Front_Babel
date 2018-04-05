function mapaFijo() {

    // mapa sin geolocalización:
    // ejemplo básico del uso del API de google.maps

    var domMapa = document.getElementById("otroMapa");
    var latitude = 40;
    var longitude = -6;
    var options = {
        position: new google.maps.LatLng(latitude, longitude),
        title: "Tu localización",
        zoom: 5,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(domMapa, options);
    map.setCenter(new google.maps.LatLng(latitude, longitude));

}


function mapaLoc() {

    // mapa con geolocalización
    // ejemplo básico del uso del nuevo API de HTML5

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (pos) {
            var domMapa = document.getElementById("miMapa");
            var latitude = pos.coords.latitude;
            var longitude = pos.coords.longitude;
            var options = {
                position: new google.maps.LatLng(latitude, longitude),
                title: "Tu localización",
                zoom: 19,
                mapTypeId:google.maps.MapTypeId.ROADMAP
            }; // fin de options
            var map = new google.maps.Map(domMapa, options);
            var marker = new google.maps.Marker(options);
            var circle = new google.maps.Circle({
                map: map, radius: pos.coords.accuracy
            }); // fin de circle
            circle.bindTo('center', marker, 'position');
            marker.setMap(map);
            map.setCenter(new google.maps.LatLng(latitude, longitude));
        },
        function (error) {
            console.log(error.message);
        },
        {enableHighAccuracy : true}); // fin de getCurrentPosition
    }
}

(function() {
    window.addEventListener("load", () => { mapaFijo(); mapaLoc();})
})()
