/**
 * Created by fangyuew on 11/13/13.
 */

'use strict';

var geocoder = new google.maps.Geocoder();

angular.module('hackday')
  .factory('GeoLibrary', [ '$http', '$q','$log', function ($http, $q,$log)
  {
    var origin = "Toronto";
    var destination = "Montreal";
    var functions = {};

    functions.getRoute = function(origin,destination)
    {
        var deferred = $q.defer();

        $http.jsonp('http://maps.googleapis.com/maps/api/directions/json?destination=Montreal&origin=Toronto&sensor=false&callback=JSON_CALLBACK')
        .success(function (data,status,headers,config){
                $log.info('aaa');
                     $log.info(data);
                $log.info(status);
                $log.info(headers);
                $log.info(config);
                    deferred.resolve(data,status,headers,config);
            }).error(function (data, status, headers, config) {
            //TODO: Show error message
                $log.info('bbbbb');
                     $log.info(data);
                $log.info(status);
                $log.info(headers);
                $log.info(config);
                    deferred.reject(data,status,headers,config);
            }

        );
        return deferred.promise;
    };

    // This function is from Google's polyline utility.
    functions.decodePoints = function(encoded)
    {
        var len = encoded.length;
        var index = 0;
        var array = [];
        var lat = 0;
        var lng = 0;

        while (index < len) {
            var b;
            var shift = 0;
            var result = 0;
            do {
                b = encoded.charCodeAt(index++) - 63;
                result |= (b & 0x1f) << shift;
                shift += 5;
            } while (b >= 0x20);
            var dlat = ((result & 1) ? ~(result >> 1) : (result >> 1));
            lat += dlat;
            shift = 0;
            result = 0;
            do {
                b = encoded.charCodeAt(index++) - 63;
                result |= (b & 0x1f) << shift;
                shift += 5;
            } while (b >= 0x20);
            var dlng = ((result & 1) ? ~(result >> 1) : (result >> 1));
            lng += dlng;

            array.push([lat * 1e-5, lng * 1e-5]);
        }
        return array;
    };
/*
    functions.getGeoByAddress = function(address)
    {
        //address = '701 first ave, sunnyvale';
        geocoder.geocode( { 'address': address}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK)
        {
            //map.setCenter(results[0].geometry.location);
            //var marker = new google.maps.Marker({
            //    map: map,
            //    position: results[0].geometry.location
            //});
            console.log("Geocoding : found "+results.length+" results for address "+address);
            //console.log("GeoCoding Result : "+results[0].geometry.location);

            //temporarily, directly use first one as result
            console.log(results[0].geometry.location)
            return results[0].geometry.location;
        } else
        {
            console.log("Error fetching Locations : " + status);
            showError("Failed to find location : "+address);
            return null;
        }
        });
    };
*/

    var fixedEncodeURIComponent = function(str)
    {
        return encodeURIComponent(str).replace(/[!'()]/g, escape).replace(/\*/g, "%2A").replace(/\"/g, "%22");
    };
    var format = '&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=JSON_CALLBACK';

    functions.getFlickrAPI = function(lon, lat, radius, gallery)
    {
            var deferred = $q.defer();
            var query = 'select farm, server,id,secret from flickr.photos.search where lat="' + lat + '" and lon="'+ lon + '" and radius="' +radius+'" and sort="interestingness-desc" and api_key="92bd0de55a63046155c09f1a06876875"';
            var url = 'http://query.yahooapis.com/v1/public/yql?q=' + fixedEncodeURIComponent(query) + format;

            //console.log(url);

            $http.jsonp(url).success(function(json) {
                //console.log(JSON.stringify(json));
           //     var quotes = json.query.results.quote;
                // filter + format quotes here if you want
                deferred.resolve(json);
            }).error(function(error) {
                console.error(JSON.stringify(error));
                    deferred.reject(json);
            });
            return deferred.promise;
     };

    functions.getLocation = function(photoID)
    {
            var deferred = $q.defer();
            var query = 'select location,views,title from flickr.photos.info where photo_id="' + photoID + '" and api_key="92bd0de55a63046155c09f1a06876875"';
            var url = 'http://query.yahooapis.com/v1/public/yql?q=' + fixedEncodeURIComponent(query) + format;

            //console.log(url);

            $http.jsonp(url).success(function(json) {
                //console.log(JSON.stringify(json));
           //     var quotes = json.query.results.quote;
                // filter + format quotes here if you want
                deferred.resolve(json);
            }).error(function(error) {
                console.error(JSON.stringify(error));
                    deferred.reject(json);
            });
            return deferred.promise;
     };

    return functions;
  }]);
