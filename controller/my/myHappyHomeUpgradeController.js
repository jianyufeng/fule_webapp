/**
 * Created by ShareLock on 2017/4/14.
 * 喜乐之家升级的Controller
 */


define(['app', 'css! ../../../css/my/my-happyHomeUpgrade'], function (app) {
    function ctrl($scope, myHappyHomeUpgradeService, POP) {

        $scope.userArray = [];
        $scope.upGrade = {};
        $scope.$on('$ionicView.loaded', function () {
            var configId = 7;
            //获取数据
            myHappyHomeUpgradeService.getMyHappyHomeUpgradeInfo($scope, configId, POP);
        });
        $scope.showUser = function (index) {
            myHappyHomeUpgradeService.showUserGrade($scope, index);
        }

        // 商城密码失去焦点
        $("#mallPassWord").blur(function () {
            var str = $(this).val();
            var pattern = /^[A-Z a-z \d ]{6,16}$/;
            if (!pattern.test(str)) {
                $("#mallPassWordWaring").css('display', 'block');
                $scope.$apply(function () {
                    $scope.upGrade.mallPassWordError = "输入的格式有误请重新输入";
                });
            } else {
                $("#mallPassWordWaring").css('display', 'none');

                // 输入完成赋值给其他的输入项
                for (var i = 0; i < $scope.userArray.length; i++) {
                    var info = $scope.userArray[i];
                    if (info.flag == 0) {
                        info.mallPassWord = str;
                        $scope.upGrade.mallPassWord = info.mallPassWord;
                    }
                }

            }
        })
        // 二级密码失去焦点
        $("#secondPassWord").blur(function () {
            var str = $(this).val();
            var pattern = /^[A-Z a-z \d ]{6,16}$/;
            if (!pattern.test(str)) {
                $("#secondPassWordWaring").css('display', 'block');
                $scope.$apply(function () {
                    $scope.upGrade.secondPassWordError = "输入的格式有误请重新输入";
                });
            } else {
                $("#secondPassWordWaring").css('display', 'none');
                // 输入完成赋值给其他的输入项
                for (var i = 0; i < $scope.userArray.length; i++) {
                    var info = $scope.userArray[i];
                    if (info.flag == 0) {
                        info.secondPassWord = str;
                        $scope.upGrade.secondPassWord = info.secondPassWord;
                    }
                }

            }
        })
        // 支付密码失去焦点
        $("#payPassWord").blur(function () {
            var str = $(this).val();
            var pattern = /^\d{6}$/;
            if (!pattern.test(str)) {
                $("#payPassWordWaring").css('display', 'block');
                $scope.$apply(function () {
                    $scope.upGrade.payPassWordError = "输入的格式有误请重新输入";
                });
            } else {
                $("#payPassWordWaring").css('display', 'none');
                // 输入完成赋值给其他的输入项
                for (var i = 0; i < $scope.userArray.length; i++) {
                    var info = $scope.userArray[i];
                    if (info.flag == 0) {
                        info.payPassword = str;
                        $scope.upGrade.payPassword = info.payPassword;
                    }
                }

            }
        })
        // 邮箱失去焦点
        $("#Email").blur(function () {
            var str = $(this).val();
            //var pattern = /^[A-Z a-z \d ]{6,16}$/;
            var pattern = /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g;
            if (!pattern.test(str)) {
                $("#EmailWaring").css('display', 'block');
                $scope.$apply(function () {
                    $scope.upGrade.EmailError = "输入的格式有误请重新输入";
                });
            } else {
                $("#EmailWaring").css('display', 'none');
                // 输入完成赋值给其他的输入项
                for (var i = 0; i < $scope.userArray.length; i++) {
                    var info = $scope.userArray[i];
                    if (info.flag == 0) {
                        info.Email = str;
                        $scope.upGrade.Email = info.Email;
                    }
                }

            }
        })
        // 手机失去焦点
        $("#phone").blur(function () {
            var str = $(this).val();
            var pattern = /^\d{11}$/;
            if (!pattern.test(str)) {
                $("#phoneWaring").css('display', 'block');
                $scope.$apply(function () {
                    $scope.upGrade.phoneError = "输入的格式有误请重新输入";
                });
            } else {
                $("#phoneWaring").css('display', 'none');
                // 输入完成赋值给其他的输入项
                for (var i = 0; i < $scope.userArray.length; i++) {
                    var info = $scope.userArray[i];
                    if (info.flag == 0) {
                        info.phone = str;
                        $scope.upGrade.phone = info.phone;
                    }
                }

            }
        })
        // 姓名失去焦点
        $("#name").blur(function () {
            var str = $(this).val();

                // 输入完成赋值给其他的输入项
                for (var i = 0; i < $scope.userArray.length; i++) {
                    var info = $scope.userArray[i];
                    if (info.flag == 0) {
                        info.name = str;
                        $scope.upGrade.name = info.name;
                    }
                }

            //}
        })


    }

    /*给构造函数添加$inject属性,添加注入的服务*/
    ctrl.$inject = ['$scope', 'myHappyHomeUpgradeService', 'POP'];

    /*动态注册控制器*/
    app.registerController('myHappyHomeUpgradeController', ctrl);
});