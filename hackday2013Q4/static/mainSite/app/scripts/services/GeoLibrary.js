/**
 * Created by fangyuew on 11/13/13.
 */

'use strict';

var geocoder = new google.maps.Geocoder();

angular.module('hackday')
  .factory('GeoLibrary', [ '$http', '$q', function ($http, $q)
  {
    var functions = {};

    functions.queryTestData = function()
    {
      var data=
      {
            start   : { geo : '' },
            end     : {         },
            route   : []
      };

      return data;
    };

    functions.getGeoByAddress = function(address)
    {
        test();
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
        } else
        {
            alert("Geocode was not successful for the following reason: " + status);
        }
    });

    };

    return functions;
  }]);


function test()
{
    console.log("TestData");
}