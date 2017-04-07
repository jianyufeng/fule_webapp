/**
 * Created by charles_xsx on 2017/3/30.
 */
define(['app','css!../../../css/cart/cart_addAddress',"addressSelect"],function(app,cart_fun){



    function ctrl($scope,cartAddAddressService,POP,$state,$ionicHistory){


        $scope.$on('$ionicView.loaded',function () {

            //初始化
            $scope.righttitleValue = "保存";

        });

        //初始化默认按钮
        var isChecked = false;
        $scope.setDefault = function(v){
            // if (v == true){
            //     isChecked = 1;
            // }
            isChecked = v;
        }

        var locationAddress; //详细地址
        var province ; //省
        var city     ; //市
        var area     ; //地区
        var PID      ; //省id
        var CID      ; //市id
        var AID      ; //地区id

        $(".selectAction").click(function(){
            new AddressSelect({
                resultBtnClick : function(result){
                    console.log(result);

                    province = result.provinceName;
                    PID      = result.pid;
                    city     = result.cityName;
                    CID      = result.cid;
                    area     = result.areaName;
                    AID      = result.aid;
                    locationAddress  = province+"省" + city + "市" + area;
                    $(".select-location").find("span").css("color","#000000");
                    $(".select-location").find("span").text(locationAddress);


                }
            });
        });




        //保存
        $scope.saveAddress = function () {


            //保存成功后后退到地址管理页面
            var recieverName  = $('.recieverName').val();
            var mobileNumeber = $('.recieverNumber').val();
            var location      = $(".select-location").find("span").text();
            var detailAddress = $(".inputArea").val();
            var email         = $('.email').val();
            var categray      = $('.categray').val();
            var zipCode       = $('.zipcode').val();
            var building      = $('.building').val();
            var best_time     = $('.time').val();
            var defaultAddress= isChecked;

            console.log(isChecked + "|" + defaultAddress);



            if (recieverName ==null || recieverName.length <= 0){
                POP.Hint("姓名不能为空");
                return;
            }
            if (mobileNumeber ==null || mobileNumeber.length <= 0){
                POP.Hint("联系电话不能为空");
                return;
            }
            if (location ==null || location.length <= 0){
                POP.Hint("收货地址不能为空");
                return;
            }
            if (categray ==null || categray.length <= 0){
                POP.Hint("地址别名不能为空");
                return;
            }
            if (email ==null || email.length <= 0){
                POP.Hint("邮箱地址不能为空");
                return;
            }
            if (zipCode ==null || zipCode.length <= 0){
                POP.Hint("邮编不能为空");
                return;
            }
            if (detailAddress ==null || detailAddress.length <= 0){
                POP.Hint("详细地址不能为空");
                return;
            }
            var info = User.getInfo();


            var newParams = {

                address_name : categray,
                user_id      : info.user_id,
                consignee    : recieverName,
                email        : email,
                country      : 1,
                province     : PID,
                city         : CID,
                district     : AID,
                address      : detailAddress,
                zipcode      : zipCode,
                sign_building: building,
                best_time    : best_time,
                mobile       : mobileNumeber,
                is_default   : defaultAddress?1:0

            }


            console.log(newParams);
            //上传数据
            cartAddAddressService.saveAddress($scope,newParams,POP,function () {

                //成功直接返回上一层
                $ionicHistory.goBack();


            });



        }



    }

    ctrl.$inject = ['$scope','cartAddAddressService', 'POP','$state','$ionicHistory'];
    app.registerController('cartAddAddressController',ctrl);
});
