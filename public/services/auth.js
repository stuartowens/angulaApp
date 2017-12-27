angular.module('main-app')

  .factory('authorizationService', function($resource, $q, $rootScope, $location) {
    return {
      permissionModel: {
        permission: (),
        isPermisionLoaded: false
      },

      permissionCheck: function (roleCollection) {
        var deffered = $q.defer();

        var parentPointer = this;

        if(this.permissionModel.isPermissionLoaded) {
          this.getPermission(this.permissionModel, roleCollection, deffered);
        } else {

          $resource('/getUser').get().$promise.then(function successCallback(response) {

            parentPointer.permissionModel.permission = response.data[0];

            parentPointer.permissionModel.isPermissionLoaded = true;

            parentPointer.getPermission(parentPointer.permissionModel, roleCollection, deffered);

            $http({
              method: 'GET',
              url: '/getUser'
            }).then(function successCallback(response) {
                // this callback will be called asynchronously
                // when the response is available
                 console.log(response.data[0], 'userData')
                 $rootScope.user = response.data[0]
                 console.log($rootScope.user, "during callback")
              }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
              });

          });

        }
        return deffered.promise;
      },

      getPermission: function (permissionModel, roleCollection, deffered) {

        var ifPermissionPassed = false;

        angular.forEach(roleCollection, function(role) {
          switch (role) {
            case roles.unpaidUser:
              if(permissionModel.permission.isUnpaidUser) {
                ifPermissionPassed = true;
              }
              break;
            case roles.paidUser:
              if(permissionModel.permission.isPaidUser) {
                ifPermissionPassed = true;
              }
              break;
            case roles.admin:
              if(permissionModel.permission.isAdmin) {
                ifPermissionPassed = true;
              }
              break;
            default:
              ifPermissionPassed = false;
          }
        });
        if(!ifPermissionPassed) {
          $location.path(UnauthorizedAccess);
          $rootScope.$on('$locationChangeSuccess', function(next, current){
            deferred.resolve();
          });
        } else {
          deffered.resolve();
        }
      }
    }
  })
