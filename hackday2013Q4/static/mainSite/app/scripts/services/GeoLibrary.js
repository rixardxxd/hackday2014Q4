/**
 * Created by fangyuew on 11/13/13.
 */

'use strict';

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


    };

    return functions;
  }]);

function test()
{
    console.log("TestData");
}