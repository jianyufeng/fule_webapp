/**
 * Created by ShareLock on 2017/4/8.
 * 用户激活或者是升级是填写的用户资料Controller
 */

define(['app','./Fun/identityCardTest', "css! ../../../css/my/my-updateUserData", 'addressSelect'], function (app,identityCardTest) {
    function ctrl($scope, myUpdateUserDataService, POP,$stateParams) {

        $scope.upGrade = {};
        $scope.$on('$ionicView.loaded', function () {
           // 页面传值过来的要升级的级别
            var myGrade=$stateParams.grade;
            $('#abc1').click(function () {
                $(this).css('color', '#D39AC5');
                $('#abc2').css('color', 'black');
                $('#selectResult').val("左区");
            });
            $("#abc2").click(function () {
                $(this).css('color', '#D39AC5');
                $('#abc1').css('color', 'black');
                $('#selectResult').val("右区");
            });
            // 推荐人失去焦点事件
            $("#recommend").blur(function () {
                var name = $(this).val();
                if (name != "") {
                    name = name.trim();
                    if (name == "") {
                        $("#recommendWaring").css('display', 'block');
                        $(this).css({
                            'height': '34px',
                            'line-height': '34px',
                        })
                    } else {
                        // 验证推荐人
                        myUpdateUserDataService.getUserInfo($(this), $("#recommendWaring"), $(this).val());
                    }
                } else {
                    $("#recommendWaring").css('display', 'block');
                    $(this).css({
                        'height': '34px',
                        'line-height': '34px',
                    })

                }


            });
            // 节点人失去焦点事件
            $("#node").blur(function () {
                var name = $(this).val();
                if (name != "") {
                    name = name.trim();
                    if (name == "") {
                        $("#nodeWaring").css('display', 'block');
                        $(this).css({
                            'height': '34px',
                            'line-height': '34px',
                        })
                    } else {
                        // 验证推荐人
                        myUpdateUserDataService.getUserInfo($(this), $("#nodeWaring"), $(this).val());
                    }

                }
                else {
                    $("#nodeWaring").css('display', 'block');
                    $(this).css({
                        'height': '34px',
                        'line-height': '34px',
                    })

                }


            });
            // 节点失去焦点事件
            $("#selectResult").blur(function () {
                var text = $(this).val();
                if (text != null) {
                    // 查找节点人
                    myUpdateUserDataService.searchUserDetail($(this).val(), $scope);
                }
            });

            // 银行账号失去焦点事件
            $("#bankCardN").blur(function () {
                var num=$(this).val();
                if(num==""){
                    //显示错误提示
                    $("#bankCardNWaring").css('display', 'block');
                    $(this).css({
                        'height': '34px',
                        'line-height': '34px',
                    })
                }
                else {
                    num=num.trim();
                    if(num==""){
                        //显示错误提示
                        $("#bankCardNWaring").css('display', 'block');
                        $(this).css({
                            'height': '34px',
                            'line-height': '34px',
                        })
                    }else{
                        // 验证银行卡号
                        if(/^\d{19}$/.test($(this).val())){
                        // 格式正确
                        }else {
                        // 格式不正确
                            $("#bankCardNWaring").css('display', 'block');
                            $(this).css({
                                'height': '34px',
                                'line-height': '34px',
                            })
                        }
                    }
                }

            })
            // 身份证号失去焦点验证
            $("#identityCardN").blur(function(){
              var num=$(this).val();
                if(num==""){
                    //显示错误提示
                    $("#identityCardNWaring").css('display', 'block');
                    $(this).css({
                        'height': '34px',
                        'line-height': '34px',
                    })
                }
                else {
                    num=num.trim();
                    if(num==""){
                        //显示错误提示
                        $("#identityCardNWaring").css('display', 'block');
                        $(this).css({
                            'height': '34px',
                            'line-height': '34px',
                        })
                    }else{
                        // 验证身份证号
                        if(!identityCardTest.test(num)) {
                            $("#identityCardNWaring").css('display', 'block');
                            $(this).css({
                                'height': '34px',
                                'line-height': '34px',
                            })
                        }
                    }
                }
            });

            //推荐人获取焦点事件
            $("#recommend").focus(function () {
                $("#recommendWaring").css('display', 'none');
                $(this).css({
                    'height': '44px',
                    'line-height': '44px',
                })
            });
            //节点人获取焦点事件
            $("#node").focus(function () {
                $("#nodeWaring").css('display', 'none');
                $(this).css({
                    'height': '44px',
                    'line-height': '44px',
                })
            });
            // 银行卡号获取焦点事件
            $("#bankCardN").focus(function () {
                $("#bankCardNWaring").css('display', 'none');
                $(this).css({
                    'height': '44px',
                    'line-height': '44px',
                })
            });
            // 省份证号获取焦点事件
            $("#identityCardN").focus(function () {
                $("#identityCardNWaring").css('display', 'none');
                $(this).css({
                    'height': '44px',
                    'line-height': '44px',
                })
            });

            // 点击提交按钮
            $scope.submitUpGradeAction = function () {
                myUpdateUserDataService.upGradeAction($scope, POP,myGrade);
            }
        });

        // 点击重置按钮
        $scope.reset = function () {


        }
        // 选择区域
        $scope.selectRegion = function () {
            $(".popRegionBox").css("display", "block");
        }

        // 关闭选择区域的弹框
        $scope.closepop = function () {
            $(".popRegionBox").css("display", "none");
        }

        // 选择地址
        $scope.chooseAddress = function () {
            new AddressSelect({
                resultBtnClick: function (result) {
                    var address = result.provinceName + "-" + result.cityName + "-" + result.areaName;
                    $("#address").text(address);
                }
            })
        }

    }

    /*给构造函数添加$inject属性,添加注入的服务*/
    ctrl.$inject = ['$scope', 'myUpdateUserDataService', 'POP','$stateParams'];

    /*动态注册控制器*/
    app.registerController("myUpdateUserDataController", ctrl);
});
