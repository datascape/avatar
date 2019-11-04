$(document).ready( function() {

	var mbAttr = '',
      mbUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiZWUyZGV2IiwiYSI6ImNqaWdsMXJvdTE4azIzcXFscTB1Nmcwcm4ifQ.hECfwyQtM7RtkBtydKpc5g';

	var grayscale = L.tileLayer(mbUrl, {id: 'mapbox.light', attribution: mbAttr}),
	satellite = L.tileLayer(mbUrl, {id: 'mapbox.satellite',   attribution: mbAttr}),
	streets = L.tileLayer(mbUrl, {id: 'mapbox.streets',   attribution: mbAttr});

	//var layerGroups = {};
	var dataParameters = []; 
	var dp = {};
	var layerControl = false;


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
		//var center = [37.7394, -25.6687]; var zoom = 3; // Americas to India
		var center = [33.7773, -84.3890]; var zoom = 19; // Centergy Tech Square
		//var center = [33.7726, -84.3655]; var zoom = 19; // Ponce City Market

	    map = new L.Map( 'map', { zoomControl: false } ).setView( center, zoom );
		//disabled zoomControl when initializing map (which is topleft by default)
		//the add zoom control topright
		L.control.zoom({
		     position:'bottomright'
		}).addTo(map);

		var baseLayers = {
		    "Grayscale": grayscale,
		    "Streets": streets,
		    "Satellite": satellite,
		    "Light Green": basemaps['litegreen']
		  };

		  var overlays = {};
		  //dataParameters.forEach(function(ele) {
		  //  overlays[ele.name] = ele.group; // Add to layer menu
		  //})
		  if(layerControl === false) {
		    layerControl = L.control.layers(baseLayers, overlays).addTo(map);
		  }


	    // add a tile layer
	    
	    L.tileLayer( 'http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
	    	maxZoom: 25,
	        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
	    }).addTo(map);
		
	    /* Dark, but we'll use layers instead
		L.tileLayer('http://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}.png', {
            attribution: 'Mapbox <a href="http://mapbox.com/about/maps" target="_blank">Terms &amp; Feedback</a>'
        }).addTo(map);
		*/

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

		
		map.on('click', function(ev){
		  var latlng = map.mouseEventToLatLng(ev.originalEvent);
		  console.log(latlng.lat + ', ' + latlng.lng);
		});
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
				start: function(event, ui) { 
					//alert('test');
					// Works well for marker, but img has issue due to size change
			        $(this).draggable("option", "cursorAt", { // Centers icon on pickup, so it doesn't jump on dropoff.
			            left: Math.floor(this.clientWidth / 2),
			            top: Math.floor(this.clientHeight / 2)
			        });
			    },
				stop: function ( e, ui ) {
					// returning the icon to the menu - not needed when cloning, which is need to take outside of surrounding parent for movement to map.
					//$( '.draggable-marker' ).css( 'top', posTop );
					//$( '.draggable-marker' ).css( 'left', posLeft );

					var offsetLeft = $("#map").offset().left;
					var offsetTop = $("#map").offset().top;
					var iconUrl = 'img/marker-icon.png';
					var iconSize = [20, 40];
					var iconAnchor = [10, 40];

					if ($(this).css('background-image') != "none") {
						iconUrl = $(this).css('background-image').replace(/^url\(['"]?/,'').replace(/['"]?\)$/,'');
						iconSize = [40, 40];
						iconAnchor = [20, 40]; // tip of icon.  icon width/2, icon height
					}
					var coordsX = event.clientX - offsetLeft, // Where you grab marker needs to be factored in.
						coordsY = event.clientY + 20 - offsetTop, // 20 is half of markers height
						point = L.point( coordsX, coordsY ), // createing a Point object with the given x and y coordinates
						markerCoords = map.containerPointToLatLng( point ), // getting the geographical coordinates of the point

						// Create custom icon
						myIcon = L.icon({
							iconUrl: iconUrl, // the url of the marker or dragged img
							iconSize: iconSize,
							iconAnchor: iconAnchor , // the coordinates of the "tip" of the icon.  icon width/2, icon height
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

	var location = {
		Tech_Square: [33.7773, -84.3890],
		Ponce: [33.7727, -84.3653],
		Virginia: [38.9544, -77.4283],
		Kansas: [37.719129880501434, -97.26137264626136],
	}
	$('#topselectors div').click(function(event) {
		$(this).css("border","1px solid #999");
		var loctext = $(this).text().replace(' ','_');
		var center = location[loctext]; // Ponce City Market
		if (loctext == 'Ponce') {
			map.flyTo(center, 19);
		} else {
	    	map.flyTo(center, 18);
		}

	    // Works, but no rotation since only two points
		//var upperleft = [33.7726, -84.3655];
		//var lowerright = [33.7716, -84.3635];
		//var imageUrl = 'img/PCM-floorplan.png', imageBounds = [upperleft, lowerright];
		//L.imageOverlay(imageUrl, imageBounds).addTo(map);
		//L.imageOverlay(imageUrl, imageBounds).bringToFront();
		
		var topleft = L.latLng(33.773225795244585, -84.36676025390626),
		topright   = L.latLng(33.77312598704505, -84.36489004176111),
		bottomleft = L.latLng(33.77234117352756, -84.3668319610879);

		var overlay = L.imageOverlay.rotated("img/PCM-floorplan.png", topleft, topright, bottomleft, {
			opacity: 1.0,
			interactive: true
		}).addTo(map);
		

	});
});
