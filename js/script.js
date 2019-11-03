$(document).ready( function() {

	// dark with labels
    // https://dnv9my2eseobd.cloudfront.net/v3/cartodb.map-4xtxp73f 

    // Note: light_nolabels does not work on https
    var basemaps = {
        'positron_light_nolabels' : L.tileLayer('http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png', {
          attributionX: 'positron_lite_rainbow'
        }),
        'litegreen' : L.tileLayer('//{s}.tile.openstreetmap.se/hydda/full/{z}/{x}/{y}.png', {
            attribution: 'Tiles courtesy of <a href="http://openstreetmap.se/" target="_blank">OpenStreetMap Sweden</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }),
        'esri' : L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
            attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
        }),
        'dark' : L.tileLayer('http://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}.png', {
            attribution: 'Mapbox <a href="http://mapbox.com/about/maps" target="_blank">Terms &amp; Feedback</a>'
        }),
        'osm' : L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
        }),
        'green' : L.tileLayer('http://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
            attribution: 'Map data: &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
        }),
        'firemap' : L.tileLayer('http://{s}.tile.thunderforest.com/spinal-map/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        })
    }

    var cityNamesLight = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png');
    var cityNamesDark = L.tileLayer('http://{s}.basemaps.cartocdn.com/dark_only_labels/{z}/{x}/{y}.png');


	var markers = [], // an array containing all the markers added to the map
		markersCount = 0; // the number of the added markers

	var initMap = function () {
		// create a map in the "map" div, set the view to a given place and zoom
		var center = [37.7394, -25.6687];
		// var center = [33.7773, -84.3890]; 19
	    map = new L.Map( 'map', { zoomControl: true } ).setView( center, 3 );

	    // add a tile layer
	    /*
	    L.tileLayer( 'http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
	    	maxZoom: 25,
	        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
	    }).addTo(map);
		*/

		L.tileLayer('http://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}.png', {
            attribution: 'Mapbox <a href="http://mapbox.com/about/maps" target="_blank">Terms &amp; Feedback</a>'
        }).addTo(map);

		// Neither worked:
	    //var anything = basemaps['dark'];
		//L.tileLayer(basemaps['dark']).addTo(map);

	    /* MASK */
	    /*
	    L.TileLayer.boundaryCanvas(basemap._url, {
            boundary: statesData
        }).addTo(map);
		*/

	    /*
	    var circle = L.circle([33.7775, -84.3890], {
		    color: 'red',
		    fillColor: '#f03',
		    fillOpacity: 0.5,
		    radius: 6 
		}).addTo(map);
		*/

		// add a marker in the given location - not appearing, needs to include local marker-icon-2x.png and marker-shadow.png
		//var latlon = [33.7775, -84.3890];
		//L.marker(latlon).addTo(map);
		//L.marker([32.7775, -83.3890]).addTo(map);

		

	}

	// Dragging and dropping the markers to the map
	//var addMarkers;
	//function initDraggable() {
		var addMarkers = function () {
			// The position of the marker icon
			var posTop = $( '.draggable-marker' ).css( 'top' ),
			posLeft = $( '.draggable-marker' ).css( 'left' );

			$( '.draggable-marker' ).draggable({
				appendTo: 'body',
				containment: 'window',
				scroll: false,
				helper: 'clone',
				stop: function ( e, ui ) {
					// returning the icon to the menu
					$( '.draggable-marker' ).css( 'top', posTop );
					$( '.draggable-marker' ).css( 'left', posLeft );

					var offsetLeft = $("#map").position().left;
					var offsetTop = $("#map").offset().top;
					//alert(offsetTop);
					var coordsX = event.clientX - offsetLeft, // Where you grab marker needs to be factored in.
						coordsY = event.clientY + 20 - offsetTop, // 20 is half of markers height
						point = L.point( coordsX, coordsY ), // createing a Point object with the given x and y coordinates
						markerCoords = map.containerPointToLatLng( point ), // getting the geographical coordinates of the point

						// Creating a custom icon
						myIcon = L.icon({
							iconUrl: 'img/marker-icon.png', // the url of the img
							iconSize: [20, 40],
							iconAnchor: [10, 40] // the coordinates of the "tip" of the icon ( in this case must be ( icon width/ 2, icon height )
						});

					// Creating a new marker and adding it to the map
					markers[ markersCount ] = L.marker( [ markerCoords.lat, markerCoords.lng ], {
						draggable: true,
						icon: myIcon
					}).addTo( map );

					//alert('dropped'); // But not triggered if point repositioned.
					markersCount++;
				}
			});
			
		}
	//}
	//initDraggable(); // Also called when more people icons added to DOM.
	initMap();
	addMarkers();

	var people_shown = false;
	$('.showpeople').click(function(event) {
        if ($("#sidelist").is(':visible')) {
            $('#sidelist').hide();
        } else {
        	if (!people_shown) {
	            $('#grouplist').html($('#teamtext').val()); // Copy from textarea to sidelist
	            //initDraggable();
	            addMarkers();
	            people_shown = true;
	        }
            $('#sidelist').show();
        }
    });
	$('.hideAppMenu').click(function(event) {
		$('#appmenu').hide();
	});
	$('#topselectors divX').click(function(event) {
		$(this).css("border","1px solid #999");
		var center = [33.7773, -84.3890]; // Tech Square
	    map.flyTo(center, 19);

	   	//map.flyTo(latLon).fitBounds(bounds);
		//map.flyTo([13.87992, 45.9791], 12);

		//var imageUrl = 'img/PCM-floorplan.png',
		//imageBounds = [center, [32.77729, -83.3889]];
		//L.imageOverlay(imageUrl, imageBounds).addTo(map);

		var imageUrl = 'img/PCM-floorplan.png',
    // This is the trickiest part - you'll need accurate coordinates for the
    // corners of the image. You can find and create appropriate values at
    // http://maps.nypl.org/warper/ or
    // http://www.georeferencer.org/
    imageBounds = L.latLngBounds([
        [33.7773, -84.3890],
        [32.77729, -83.3889]]);

    //map.addLayer(L.mapbox.styleLayer('mapbox://styles/mapbox/streets-v11'))
    //.fitBounds(imageBounds);

    var overlay = L.imageOverlay(imageUrl, imageBounds)
    .addTo(map);

	});

	$('#topselectors div').click(function(event) {
		$(this).css("border","1px solid #999");
		var center = [33.7726, -84.3655];
	    map.flyTo(center, 18);

		var upperleft = [33.7726, -84.3655];
		var lowerright = [33.7716, -84.3635];

		var imageUrl = 'img/PCM-floorplan.png',
		  imageBounds = [upperleft, lowerright];

		L.imageOverlay(imageUrl, imageBounds).addTo(map);
		L.imageOverlay(imageUrl, imageBounds).bringToFront();

		
		var topleft    = L.latLng(40.52256691873593, -3.7743186950683594),
		topright   = L.latLng(40.5210255066156, -3.7734764814376835),
		bottomleft = L.latLng(40.52180437272552, -3.7768453359603886);

		var overlay = L.imageOverlay.rotated("img/PCM-floorplan.png", topleft, topright, bottomleft, {
			opacity: 0.4,
			interactive: true
		}).addTo(map);
		

	});
});
