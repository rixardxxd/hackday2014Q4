(function () {
        var module = angular.module("hackday", ["google-maps"]);
}());

function mapController ($scope, $timeout, $log)
{
  
    // Enable the new Google Maps visuals until it gets enabled by default.
    // See http://googlegeodevelopers.blogspot.ca/2013/05/a-fresh-new-look-for-maps-api-for-all.html
    google.maps.visualRefresh = true;

    $scope.NaviEntity=
    {
        from:{ address:'', latlng:''},
        to:{ address:'', latlng:''}
    }

    $scope.centerProperty =
            {
                latitude: 37.4168811,
                longitude: -122.02561550000001
            };

    angular.extend( $scope,
        {
            position:
            {
              coords:
              {
                latitude: 45,
                longitude: -73
              }
            },

            /** the initial center of the map */


            /** the initial zoom level of the map */
            zoomProperty: 14,

            /** list of markers to put in the map */
            markersProperty:
            [
            ],

            // These 2 properties will be set when clicking on the map
            clickedLatitudeProperty: null,
            clickedLongitudeProperty: null,

            eventsProperty:
            {
                  click: function (mapModel, eventName, originalEventArgs)
                  {
                    // 'this' is the directive's scope
                    $log.log("user defined event on map directive with scope", this);
                    $log.log("user defined event: " + eventName, mapModel, originalEventArgs);
                  }
            }
        }
    );


    $scope.search=function(ori, dest)
    {
        console.log("From : "+ori);
        console.log("To : "+dest);

        var geocoder = new google.maps.Geocoder();

                console.log("search, do geocoding!");
                address = '701 first ave, sunnyvale';
                geocoder.geocode( { 'address': address}, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK)
                {
                    //map.setCenter(results[0].geometry.location);
                    //var marker = new google.maps.Marker({
                    //    map: map,
                    //    position: results[0].geometry.location
                    //});

                    console.log("GeoCoding Result : "+results[0].geometry.location);
                }
                else
                    {
                        alert("Geocode was not successful for the following reason: " + status);
                    }
                });
    }

}