
define(['app','css!../../../css/cart/cart_addAddress',"addressSelect"],function(app,cart_fun){



    function ctrl($scope,$rootScope,cartAddAddressService,POP,$state,$ionicHistory,$stateParams){

        //初始化 p 绑定
        $scope.p = {};
        //初始化默认按钮
        var isChecked = false;
        $scope.$on('$ionicView.beforeEnter',function () {

            //初始化
            $scope.righttitleValue = "保存";


            //初始化

            $scope.p.recieverName = null;
            $scope.p.mobile = null;
            $scope.p.tel = null;
            $scope.p.address_name = null;
            $scope.p.zipcode = null;
            $scope.p.email = null;
            $scope.p.sign_building = null;
            $scope.p.best_time = null;
            $scope.p.inputArea = null;
            isChecked = false;





        });


        $scope.setDefault = function(v){

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
                    locationAddress  = province +"省"+ city + "市" + area;
                    $(".select-location").find("span").css("color","#000000");
                    $(".select-location").find("span").text(locationAddress);


                }
            });
        });



        //保存
        $scope.saveAddress = function () {

            //保存成功后后退到地址管理页面
            var recieverName   = $scope.p.recieverName;
            var mobileNumeber  = $scope.p.mobile;
            var familyPhone    = $scope.p.tel;
            var categray       = $scope.p.address_name;
            var zipCode        = $scope.p.zipcode;
            var email          = $scope.p.email;
            var building       = $scope.p.sign_building;
            var best_time      = $scope.p.best_time;
            var detailAddress  = $scope.p.inputArea;
            var defaultAddress = isChecked;




            //收货人姓名
            if (recieverName ==null || recieverName.length <= 0){
                POP.Hint("姓名不能为空");
                return;
            }else {
                //正则验证用户名为数字、字母或者中文
                var re = /^[\w\u4e00-\u9fa5]+$/;

                if (!re.test(recieverName)){

                    POP.Hint("收货人姓名出现非法字符");
                    return;
                }
            }
            //收货人手机号码
            if (mobileNumeber ==null || mobileNumeber.length <= 0){
                POP.Hint("联系电话不能为空");
                return;
            }else {
                //正则匹配手机号码
                var re = /^1(3|4|5|7|8)\d{9}$/;

                if (!re.test(mobileNumeber)){

                    POP.Hint("请填写正确的手机号码");
                    return;
                }
            }

            //固定电话
            if (familyPhone && familyPhone.length>0){

                var re = /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/;

                if (!re.test(familyPhone)){

                    POP.Hint("请填写正确的家庭电话");
                    return;
                }

            }
            //收货地址
            if (locationAddress ==null || locationAddress.length <= 0){
                POP.Hint("收货地址不能为空");
                return;
            }else {
                //正则验证用户名为数字、字母或者中文
                var re = /^[\w\u4e00-\u9fa5]+$/;

                if (!re.test(locationAddress)){

                    POP.Hint("收货地址出现非法字符");
                    return;
                }
            }
            //地址别名
            if (categray ==null || categray.length <= 0){
                POP.Hint("地址别名不能为空");
                return;
            }else {
                //正则验证用户名为数字、字母或者中文
                var re = /^[\w\u4e00-\u9fa5]+$/;

                if (!re.test(categray)){

                    POP.Hint("地址别名出现非法字符");
                    return;
                }
            }
            //邮箱地址
            if (email ==null || email.length <= 0){
                POP.Hint("邮箱地址不能为空");
                return;
            }else {
                //正则匹配邮箱地址
                var  re= /\w@\w*\.\w/;
                if (!re.test(email)){

                    POP.Hint("请填写正确的电子邮箱地址");
                    return;

                }

            }
            //收货地址邮编
            if (zipCode ==null || zipCode.length <= 0){
                POP.Hint("邮编不能为空");
                return;
            }else {
                //正则匹配邮编
                var  re= /^[1-9][0-9]{5}$/;
                if (!re.test(zipCode)){

                    POP.Hint("邮政编码格式不正确！");
                    return;

                }

            }
            if (detailAddress == null || detailAddress.length <= 0){
                POP.Hint("详细地址不能为空");
                return;
            }else {
                if (detailAddress.length>30){
                    POP.Hint("详细地址不能超过30字!");
                    return;
                }

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
                tel          : familyPhone,
                is_default   : defaultAddress?1:0

            }


            //上传数据
            cartAddAddressService.saveAddress($scope,newParams,POP,function () {

                //成功直接返回上一层
                $rootScope.selectOnlyAddress = 0;
                $ionicHistory.goBack();


            });



        }



    }

    ctrl.$inject = ['$scope','$rootScope','cartAddAddressService', 'POP','$state','$ionicHistory','$stateParams'];
    app.registerController('cartAddAddressController',ctrl);
});
