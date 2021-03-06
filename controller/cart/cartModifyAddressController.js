
/**
 * Created by charles_xsx on 2017/3/30.
 */
define(['app','css!../../../css/cart/cart_modifyAddress',"addressSelect"],function(app,cart_fun){



    function ctrl($scope, $rootScope,cartModifyAddressService,POP,$state,$ionicHistory,$stateParams){

        $scope.p = {};
        $(".mytab").find(".tab-title").css("color", "#000000");
        $(".myCartIcon").find(".tab-title").css("color", "#D9A8CD");

        //$stateParams 框架传过来的参数综合对象
        $scope.$on('$ionicView.beforeEnter',function () {


            //初始化
            $scope.righttitleValue = "保存";
            $scope.p.recieverName = $stateParams.consignee;
            $scope.p.mobile = $stateParams.mobile;
            $scope.p.location = $stateParams.province_name + $stateParams.city_name + $stateParams.district_name;
            $scope.p.inputArea = $stateParams.address;
            $scope.p.email = $stateParams.email;
            $scope.p.address_name = $stateParams.address_name;
            $scope.p.zipcode = $stateParams.zipcode;
            $scope.p.sign_building = $stateParams.sign_building;
            $scope.p.best_time = $stateParams.best_time;
            $scope.p.tel = $stateParams.tel;


        });




        var locationAddress; //详细地址
        var province ; //省
        var city ; //市
        var area ; //地区
        var PID = $stateParams.province; //省id
        var CID = $stateParams.city;     //市id
        var AID = $stateParams.district; //地区id


        $(".selectAction").click(function(){

            new AddressSelect({
                provinceid    : PID,
                cityid        : CID,
                areaid        : AID,
                resultBtnClick : function(result){

                    province = result.provinceName;
                    PID      = result.pid;
                    city     = result.cityName;
                    CID      = result.cid;
                    area     = result.areaName == null?"":result.areaName;
                    AID      = result.aid == null?"":result.aid;
                    locationAddress  = province + city + "市" + area;
                    $scope.p.location = locationAddress;
                    $(".select-location").find("span").text(locationAddress);

                    $("input").blur();

                }
            });
        });




        //保存
        $scope.saveAddress = function () {

            //保存成功后后退到地址管理页面
            var recieverName    = $scope.p.recieverName;
            var mobileNumeber   = $scope.p.mobile;
            var familyPhone     = $scope.p.tel;
            var location        = $scope.p.location;
            var categray        = $scope.p.address_name;
            var zipCode         = $scope.p.zipcode;
            var email           = $scope.p.email;
            var building        = $scope.p.sign_building;
            var best_time       = $scope.p.best_time;
            var detailAddress   = $scope.p.inputArea;


            //收货人姓名
            if (recieverName ==null || recieverName.length <= 0){
                POP.Hint("姓名不能为空");
                return;
            }else {
                //正则验证用户名中文
                var re = /^[\u4e00-\u9fa5]/;

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

            //收货地址
            if (location ==null || location.length <= 0){
                POP.Hint("收货地址不能为空");
                return;
            }else {

                //正则验证用户名为数字、字母或者中文
                var re = /^[\w\u4e00-\u9fa5]+$/;

                if (!re.test(location)){

                    POP.Hint("收货地址出现非法字符");
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


            //邮箱地址
            if (email ==null || email.length <= 0){
                POP.Hint("邮箱地址不能为空");
                return;
            }else {
                //正则匹配邮箱地址
                // var  re= /\w@\w*\.\w/;
                var re = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
                if (!re.test(email)){

                    POP.Hint("请填写正确的电子邮箱地址");
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

             //详细地址
            if (detailAddress ==null || detailAddress.length <= 0){
                POP.Hint("详细地址不能为空");
                return;
            }else {

                if (detailAddress.length>30){
                    POP.Hint("详细地址不能超过30字!");
                    return;
                }

            }
            // //地址别名
            // if (categray ==null || categray.length <= 0){
            //     POP.Hint("地址别名不能为空");
            //     return;
            // }else {
            //     //正则验证用户名为数字、字母或者中文
            //     var re = /^[\w\u4e00-\u9fa5]+$/;
            //
            //     if (!re.test(categray)){
            //
            //         POP.Hint("地址别名出现非法字符");
            //         return;
            //     }
            // }

            var info = User.getInfo();

            var newParams = {
                address_id   : $stateParams.address_id, //地址的id
                address_name : categray,                //地址别名
                user_id      : info.user_id,            //用户id
                consignee    : recieverName,            //收货人姓名
                email        : email,                   //收货人邮箱
                country      : 1,                       //国家,默认为1(中国)
                province     : PID,                     //省id
                city         : CID,                     //市id
                district     : AID,                     //区id
                address      : detailAddress,           //详细地址
                zipcode      : zipCode,                 //邮编
                tel          : familyPhone,             //家庭电话
                mobile       : mobileNumeber,           //移动电话
                sign_building: building,                //标志建筑
                best_time    : best_time                //最佳送货时间
            };


            //上传数据
            cartModifyAddressService.setModifyAddress($scope,newParams,POP,function () {

                //成功直接返回上一层
                // setTimeout(function(){

                // 保存成功后发送通知
                $rootScope.$broadcast('modifyAddressUptate', {"addressId":$stateParams.address_id});

                 $ionicHistory.goBack();
                // },1000);
                


            });



        }



    }

    ctrl.$inject = ['$scope', '$rootScope','cartModifyAddressService', 'POP','$state','$ionicHistory','$stateParams'];
    app.registerController('cartModifyAddressController',ctrl);
});
