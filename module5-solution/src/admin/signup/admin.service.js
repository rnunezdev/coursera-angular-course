(function () {
'use strict';

angular.module('admin')
.service('SignupService', SignupService);

function SignupService () {
    var service = this;
    service.useravailable = false;

    service.save = function (currentuser) {
      service.user = currentuser;
      service.useravailable = true;
    }
}
})();
