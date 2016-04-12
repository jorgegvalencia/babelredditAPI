angular.module("babelreddit").controller("RegisterCtrl", function($scope, APIclient) {
    "ngInject";

    $scope.model = {
        username: null,
        password: null,
        email: null,
    }

    $scope.successMessage = null;
    $scope.errorMessage = null;

    $scope.createUser = function() {
        $scope.errorMessage = null;
        APIclient.register($scope.model)
            .then(function(response) {
                $scope.successMessage = "Usuario creado correctamente! <a href=\"#/\">Ir a la página principal</a>";
                console.log($scope.registerForm);
                $scope.registerForm.$setPristine();
                $scope.model.username = "";
                $scope.model.password = "";
                $scope.model.email = "";
            })
            .catch(function(response) {
                if(response.error.code == 11000){
                    $scope.errorMessage = "Error al crear el usuario, revisa tu nombre de usuario y contraseña.";
                }
                console.log(response);
            })
    }

    // $scope.setError = function() {
    //     $scope.errorMessage = "Error al crear el post, por favor revisa el formulario. Recuerda que el título es obligatorio.";
    //     $timeout(function() {
    //         console.log("Borrando error");
    //         console.log($scope.errorMessage);
    //         $scope.errorMessage = null;
    //         console.log($scope.errorMessage);
    //     }, 2000);
    // }
})
