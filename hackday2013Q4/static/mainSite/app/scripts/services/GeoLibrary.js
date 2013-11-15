/**
 * Created by fangyuew on 11/13/13.
 */

'use strict';

angular.module('hackday')
  .factory('GeoLibrary', [ '$http', '$q','$log', function ($http, $q,$log)
  {
    var origin = "Toronto";
    var destination = "Montreal";
    var functions = {};

//    functions.queryTestData = function()
//    {
//      var data=
//      {
//            start   : { geo : '' },
//            end     : {         },
//            route   : []
//      };
//
//      return data;
//    };
//
//    functions.getGeoByAddress = function(address)
//    {
//        test();
//
//
//    };

    functions.getRoute = function(origin,destination){
        var deferred = $q.defer();
//            $http.defaults.useXDomain = true;
//            $http({
//                method : 'GET',
//                url : 'https://maps.googleapis.com/maps/api/directions/json',
//                params: {
//                    origin:origin,destination:destination,sensor:'false'
//                   // key:'AIzaSyDlmzIwnsi5U6effDsCZmolOHJntNonFbE'
//                }
//            }).success(function (data,status,headers,config){
//                     $log.info(data);
//                $log.info(status);
//                $log.info(headers);
//                $log.info(config);
//                    deferred.resolve(data,status,headers,config);
//            }).error(function (data, status, headers, config) {
//            //TODO: Show error message
//                     $log.info(data);
//                $log.info(status);
//                $log.info(headers);
//                $log.info(config);
//                    deferred.reject(data,status,headers,config);
//
//
//            });

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


            });

            return deferred.promise;
    };
        var fixedEncodeURIComponent = function(str) {
        return encodeURIComponent(str).replace(/[!'()]/g, escape).replace(/\*/g, "%2A").replace(/\"/g, "%22");
    };
    var format = '&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=JSON_CALLBACK';
     functions.getFlickrAPI = function(lon, lat, radius, gallery) {
            var deferred = $q.defer();
            var query = 'select farm, server,id,secret from flickr.photos.search where lat="' + lat + '" and lon="'+ lon + '" and radius="' +radius+'" and sort="interestingness-desc" and api_key="92bd0de55a63046155c09f1a06876875"';
            var url = 'http://query.yahooapis.com/v1/public/yql?q=' + fixedEncodeURIComponent(query) + format;

            console.log(url);

            $http.jsonp(url).success(function(json) {
                console.log(JSON.stringify(json));
           //     var quotes = json.query.results.quote;
                // filter + format quotes here if you want
                deferred.resolve(json);
            }).error(function(error) {
                console.log(JSON.stringify(error));
            });
            return deferred.promise;
        };
    return functions;
  }]);

