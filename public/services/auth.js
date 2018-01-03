angular.module('main-app')

  .factory('authorizationService', function($resource, $q, $rootScope, $location) {
    return {
      permissionModel: {
        permission: {},
        isPermissionLoaded: false
      },

      permissionCheck: function (roleCollection) {
        var deferred = $q.defer();

        var parentPointer = this;

        if(this.permissionModel.isPermissionLoaded) {
          this.getPermission(this.permissionModel, roleCollection, deferred);
        } else {

          $resource('https://bandcamp.cc/api/getUser').get().$promise.then(function successCallback(response) {

            $rootScope.user = response;
            parentPointer.permissionModel.permission = response;

            parentPointer.permissionModel.isPermissionLoaded = true;

            parentPointer.getPermission(parentPointer.permissionModel, roleCollection, deferred);

            // console.log(parentPointer.permissionModel, 'parentPointer.permissionModel')

          });

        }
        return deferred.promise;
      },

      getPermission: function (permissionModel, roleCollection, deferred) {

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
          $location.path('/signin');
          $rootScope.$on('$locationChangeSuccess', function(next, current){
            deferred.resolve();
          });
        } else {
          deferred.resolve();
        }
      }
    }
  })
