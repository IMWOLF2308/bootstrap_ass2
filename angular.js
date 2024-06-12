var app = angular.module("myapp", ["ngRoute"]);
app.config(function($routeProvider) {
    $routeProvider
        .when("/", { templateUrl: "trangchu.html", controller: "myCtrl" })
        .when("/gioithieu", { templateUrl: "gioithieu.html", controller: "myCtrl" })
        .when("/lienhe", { templateUrl: "lienhe.html", controller: "myCtrl" })
        .when("/sanpham", { templateUrl: "sanpham.html", controller: "myCtrl" })
        .when("/dangnhapdangky", { templateUrl: "dangnhapdangky.html", controller: "myCtrl" })
        .when("/test", { templateUrl: "test.html", controller: "myCtrl" })
        .when("/sanphamtheodanhmuc", { templateUrl: "sanphamtheodanhmuc.html", controller: "myCtrl" })
        .when("/detail/:id", { templateUrl: "chitiet.html", controller: "myCtrl" })
        .otherwise({ templateUrl: "trangchu.html", controller: "myCtrl" });
});
app.controller("myCtrl", function($scope, $rootScope, $routeParams, $http) {
    $scope.products = [];
    $http.get("http://localhost:3000/products").then(function(response) {
        $scope.products = response.data;
        console.log($scope.products);
        $scope.detailPro = $scope.products.find(item => item.id == $routeParams.id);
    });
    $scope.sort = 'price';
    $scope.tang = function() {
        $scope.sort = 'price';
    };
    $scope.giam = function() {
        $scope.sort = '-price';
    };
    $scope.show = false;
    $scope.searchSP = function() {
        if (typeof $scope.search != 'undefined') {
            $scope.show = true;
        }
    };

    // Load products from JSON file
    $http.get('products.json').then(function(response) {
        $scope.products = response.data.products;
    });

    $scope.addCart = function(product) {
        console.log('addCart function called'); // Debug log
        console.log('Product:', product); // Debug log
        if (typeof $rootScope.cartItems == "undefined") {
            $rootScope.cartItems = [];
        }
        var index = $scope.cartItems.findIndex(item => item.id === product.id);
        if (index !== -1) {
            $scope.cartItems[index].quantity += 1;
        } else {
            let productCopy = angular.copy(product);
            productCopy.quantity = 1;
            $scope.cartItems.push(productCopy);
        }
        console.log('Cart Items:', $scope.cartItems); // Debug log
    };

    $scope.removeItem = function(item) {
        const index = $scope.cartItems.indexOf(item);
        if (index > -1) {
            $scope.cartItems.splice(index, 1);
        }
        console.log('Cart Items after removal:', $scope.cartItems); // Debug log
    };

    $scope.getTotal = function() {
        return $scope.cartItems.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0);
    };

    $scope.increaseQuantity = function(item) {
        const index = $scope.cartItems.indexOf(item);
        if (index !== -1) {
            $scope.cartItems[index].quantity += 1;
        }
    };

    $scope.decreaseQuantity = function(item) {
        const index = $scope.cartItems.indexOf(item);
        if (index !== -1 && $scope.cartItems[index].quantity > 1) {
            $scope.cartItems[index].quantity -= 1;
        }
    };
    $scope.name ="hiang";
});
