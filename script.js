$( document ).ready( function() {
	var markers = [], // an array containing all the markers added to the map
		markersCount = 0; // the number of the added markers

	var initMap = function () {
		// create a map in the "map" div, set the view to a given place and zoom
	    map = new L.Map( 'map', { zoomControl: true } ).setView( [ 33.7773, -84.3890 ], 19 );

	    // add a tile layer
	    L.tileLayer( 'http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
	    	maxZoom: 25,
	        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
	    }).addTo(map);

	    /*
	    var circle = L.circle([33.7775, -84.3890], {
		    color: 'red',
		    fillColor: '#f03',
		    fillOpacity: 0.5,
		    radius: 6 
		}).addTo(map);
		*/

		// add a marker in the given location - not appearing
		var center = [33.7775, -84.3890];
		L.marker(center).addTo(map);
		L.marker([32.7775, -83.3890]).addTo(map);

		//var imageUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Sydney_Opera_House_-_Dec_2008.jpg/1024px-Sydney_Opera_House_-_Dec_2008.jpg',
		//imageBounds = [center, [32.7775, -83.3890]];
		//L.imageOverlay(imageUrl, imageBounds).addTo(map);

	}

	// Dragging and dropping the markers to the map
	var addMarkers = function () {
		// The position of the marker icon
		var posTop = $( '.draggable-marker' ).css( 'top' ),
		posLeft = $( '.draggable-marker' ).css( 'left' );

		$( '.draggable-marker' ).draggable({
			stop: function ( e, ui ) {
				// returning the icon to the menu
				$( '.draggable-marker' ).css( 'top', posTop );
				$( '.draggable-marker' ).css( 'left', posLeft );

				var coordsX = event.clientX - 50, // 50 is the width of the menu
					coordsY = event.clientY + 20, // 20 is the half of markers height
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

	initMap();
	addMarkers();
});