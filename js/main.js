var app = angular.module("ASM", ["ngRoute"]);

app.controller("index", function($scope) {

    $scope.User = JSON.parse(localStorage.getItem('user'));
    $scope.name = $scope.User.fullname;

});




app.config(function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "home.html",
            controller: 'home'
        })
        .when("/dangki", {
            templateUrl: "dangki.html",
            controller: 'dangki'
        })
        .when("/dangnhap", {
            templateUrl: "dangnhap.html",
            controller: 'dangnhap'
        })
        .when("/Quenmatkhau", {
            templateUrl: "Quenmatkhau.html",
            controller: 'quenmatkhau'
        })
        .when("/doimatkhau", {
            templateUrl: "doimatkhau.html",
            controller: 'doimatkhau'
        })
        .when("/doithongtin", {
            templateUrl: "doithongtin.html",
            controller: 'doithongtin'
        })
        .when("/gopy", {
            templateUrl: "Gopy.html",
            controller: 'gopy'
        })
        .when("/gioithieu", {
            templateUrl: "Gioithieu.html"
        })
        .when("/lienhe", {
            templateUrl: "Lienhe.html"
        })
        .when("/dmmh", {
            templateUrl: "dmmh.html",
            controller: 'dmmh'
        })
        .when("/lambai/:id", {
            templateUrl: "tranglambai.html",
            controller: 'lambai'
        })



});





app.controller("dangnhap", function($scope, $http, $rootScope) {

    $scope.user = {
        userName: "",
        passWord: ""
    };
    $scope.error = null;
    $scope.dn = function() {
        $http.get("db/Students.js").then(d => {
            for (let i = 0; i < d.data.length; i++) {
                if (d.data[i].username === $scope.user.userName && d.data[i].password === $scope.user.passWord) {
                    localStorage.setItem("user", JSON.stringify(d.data[i]));

                    Swal.fire({
                        icon: 'success',
                        title: 'Đăng nhập thành công!',
                        text: 'Quay lại trang chủ!',
                        showConfirmButton: false,
                        closeOnClickOutside: false,
                        allowOutsideClick: false,
                        timer: 1600
                    })
                    window.location = "#!dmmh";

                }
            }
            $scope.error = "Tài khoản hoặc mật khẩu không đúng ";
        })
    }



});





app.controller("dangki", function($scope, $http, $rootScope) {


    $http.get("db/Students.js").then(d => {
        $rootScope.students = d.data;
    })

    $scope.dangki = function() {
        $rootScope.students.push(angular.copy($scope.studentR));
        $scope.studentR = {};
        $scope.repassword = '';

        Swal.fire({
            icon: 'success',
            title: 'Đăng kí thành công!',
            text: 'Quay lại trang chủ!',
            showConfirmButton: false,
            closeOnClickOutside: false,
            allowOutsideClick: false,
            timer: 1600
        })
        window.location = "#!/";
    }
});




app.controller("doithongtin", function($scope, $http, ) {






    $scope.User = JSON.parse(localStorage.getItem('user'));

    $scope.ten = $scope.User.fullname;
    $scope.email = $scope.User.email;
    $scope.namsinh = $scope.User.birthday;





});





app.controller("dmmh", function($scope, $http) {

    if (localStorage.getItem("user") == null) {
        window.location = '#!dangnhap'
    }

    $scope.monhocs = [];
    $http.get("db/Subjects.js").then(d => {
        $scope.monhocs = d.data;
    })


});


app.controller("lambai", function($scope, $http, $routeParams) {




    $scope.quizs = [];
    $scope.id = "";
    $scope.qCurrent = {};
    $scope.index = 0;
    $scope.traLoi = { "idCauHoi": "", "idTraLoi": "" }
    $scope.traLois = [];




    $scope.id = $routeParams.id;
    $http.get("db/Quizs/" + $scope.id + ".js").then(function(d) {

        $scope.quizs = d.data;
        $scope.qCurrent = $scope.quizs[$scope.index];
        console.log($scope.qCurrent.Answers[0].Text);


    })

    $scope.next = function() {
        $scope.index++;
        $scope.qCurrent = $scope.quizs[$scope.index];
        console.log($scope.qCurrent.Answers[0].Text);
    }
    $scope.pre = function() {
        $scope.index--;
        $scope.qCurrent = $scope.quizs[$scope.index];
        console.log($scope.quizs.Answers[0].Text);
    }
});