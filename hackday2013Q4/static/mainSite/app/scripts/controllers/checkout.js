'use strict';

angular.module('food2cubeApp')
  .controller('CheckoutCtrl', ['$log','$scope', 'Checkout', '$http','Menu','$location',
        function ($log,$scope, Checkout, $http,Menu,$location)
        {
            //In practise, $scope.items should be added in former page, not generated in service.
            var menuList = [];
            var Menu1 = Menu.getMenu1();
            Menu1.amount = Menu.getOrder1();
            menuList.push(Menu1);
            var Menu2 = Menu.getMenu2();
            Menu2.amount = Menu.getOrder2();
            menuList.push(Menu2);
            $scope.items = menuList;

            $scope.tips = 0 ;

            var calculate = function()
            {
                 var amount = 0;
                for(var i = 0;i < menuList.length; i ++){
                   amount = amount + menuList[i].amount * menuList[i].price;
                }
                amount = (1 + $scope.tips) * amount;
                $log.info($scope.tips);
                $scope.totalAmount = amount;

                return amount;

            }

            $scope.totalAmount = calculate();
            $scope.doUpdateAmount = calculate;

             $scope.goBack = function ( path ) {
                    $location.path( path );
                };
        }
    ]);