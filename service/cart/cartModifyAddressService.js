/**
 * Created by charles_xsx on 2017/4/8.
 */
/**
 * Created by charles_xsx on 2017/3/30.
 */
define(['app'],function(app){

    app.factory("cartModifyAddressService",function(){

        var service = {};

        /*设置默认收货地址*/
        service.setModifyAddress = function($scope,updateParams,POP,fn){

            console.log(111111111111);
            console.log(updateParams);
            //var p = updateParams;
      
            // POP.StartLoading();

            //更新操作
            HTTP.post(API.Cart.updateUserAddress,updateParams,function(e,data){

                POP.EndLoading();
                console.log("编辑地址错误" + e);
                console.log("编辑地址" + data);
                if(e){
                    POP.Hint("设置失败");
                    return;
                }else {
                   
                    fn();
                }

            });

        }


        return service;

    });


});

