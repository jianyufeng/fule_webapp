/**
 * Created by ShareLock on 2017/4/10.
 * 身份证验证
 */

define([], function () {
    var identityCardTest = {}
    identityCardTest.test = function (num) {
        // var num= "C668668(9)";
        var num = num.toUpperCase();
        //身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X。
        // 香港省份证验证   ^[A-Z]{1}\d{6}\([A,0-9]{1}\)$
        // 台湾省份证验证   ^[A-Z]{1}[1,2]\d{8}$
        // if (!/^(\d{15})$|^(\d{17}([0-9]|X))$|^[A-Z]{1}[0-9]{6}\([A,0-9]{1}\)$ |^[A-Z]{1}[1,2]\d{8}$/.test(num)) {
        //     POP.warning('输入的身份证号长度不对，或者号码不符合规定！\\n15位号码应全为数字，18位号码末位可以为数字或X。');
        //     return false;
        // }

        if(!/^\d{15}$/){

            POP.warning('输入的身份证号长度不对，或者号码不符合规定！\\n15位号码应全为数字，18位号码末位可以为数字或X。');
            return false;

        }else if(!/^\d{17}([0-9]|X)$/){

            POP.warning('输入的身份证号长度不对，或者号码不符合规定！\\n15位号码应全为数字，18位号码末位可以为数字或X。');
            return false;

        }else if(!/^[A-Z]{1}[0-9]{6}\([A,0-9]{1}\)$/){

            POP.warning('输入的身份证号长度不对，或者号码不符合规定！\\n15位号码应全为数字，18位号码末位可以为数字或X。');
            return false;

        }else if(!/^[A-Z]{1}[1,2]\d{8}$/){

            POP.warning('输入的身份证号长度不对，或者号码不符合规定！\\n15位号码应全为数字，18位号码末位可以为数字或X。');
            return false;

        }
        //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
        //下面分别分析出生日期和校验位
        var len, re;
        len = num.length;
        if (len == 15) {
            re = new RegExp(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/);
            var arrSplit = num.match(re);

            //检查生日日期是否正确
            var dtmBirth = new Date('19' + arrSplit[2] + '/' + arrSplit[3] + '/' + arrSplit[4]);
            var bGoodDay;
            bGoodDay = (dtmBirth.getYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) && (dtmBirth.getDate() == Number(arrSplit[4]));
            if (!bGoodDay) {
                //alert('输入的身份证号里出生日期不对！');
                return false;
            }
            else {
                //将15位身份证转成18位
                //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
                var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
                var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
                var nTemp = 0, i;
                num = num.substr(0, 6) + '19' + num.substr(6, num.length - 6);
                for (i = 0; i < 17; i++) {
                    nTemp += num.substr(i, 1) * arrInt[i];
                }
                num += arrCh[nTemp % 11];
                return true;
            }
        }
        if (len == 18) {
            re = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/);
            var arrSplit = num.match(re);

            //检查生日日期是否正确
            var dtmBirth = new Date(arrSplit[2] + "/" + arrSplit[3] + "/" + arrSplit[4]);
            var bGoodDay;
            bGoodDay = (dtmBirth.getFullYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) && (dtmBirth.getDate() == Number(arrSplit[4]));
            if (!bGoodDay) {
                //alert('输入的身份证号里出生日期不对！');
                return false;
            }
            else {
                //检验18位身份证的校验码是否正确。
                //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
                var valnum;
                var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
                var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
                var nTemp = 0, i;
                for (i = 0; i < 17; i++) {
                    nTemp += num.substr(i, 1) * arrInt[i];
                }
                valnum = arrCh[nTemp % 11];
                if (valnum != num.substr(17, 1)) {
                    //alert('18位身份证的校验码不正确！应该为：' + valnum);
                    return false;
                }
                return true;
            }
        }

        // 验证台湾的身份证号
        if (len == 10) {

            // 香港身份证验证
            if (num.indexOf("(") > 0) {
//                  先把首位字母改为数字，即A为1，B为2，C为3...Z为26，再乘以8；
//                  然后把字母后面的6个数字依次乘以7、6、5、4、3、2；
//                  再将以上所有乘积相加的和，除以11，得到余数；
//                  如果整除，则括号中的校验码为0，
//                  如果余数为1，则校验码为A，
//                  如果余数为2～10，则用11减去这个余数的差作校验码。
//例如：P103265（1），P，在字母表中排行16，则以16代表，则计算校验码：
//16×8＋1×7＋0×6＋3×5＋2×4＋6×3＋5×2＝186
//                186÷11＝16......余10
//                11－10＝1，即校验码为1。

                //var num = "P103265（1）";
                var last = num.substring(num.length - 2, num.length - 1);

                var array = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
                var str = num.charAt(0);

                var j = 0;
                var sum = 0;
                for (var i = 0; i < array.length; i++) {
                    if (array[i] == str) {
                        j = i;
                    }
                }
                j++;
                for (var i = 0; i < 7; i++) {
                    if (i == 0) {
                        sum += Number(j * 8);

                        continue;
                    }
                    sum += Number(num.charAt(i)) * (8 - i);
                }

                //求模数
                var a = sum % 11;
                var b;

                if (a == 0) {
                    // 如果整除，则括号中的校验码为0，
                    b = "0";
                } else if (a == 1) {
                    // 如果余数为1，则校验码为A
                    b = "A";
                } else {
                    //如果余数为2～10，则用11减去这个余数的差作校验码。
                    b = String(11 - a);
                }
                if (b == last) {
                    return true;
                }
                return false;
            }
            else {
                var str = num.charAt(0);
                // 台湾身份证验证
                var arr = {
                    "A": 10,
                    "B": 11,
                    "C": 12,
                    "D": 13,
                    "E": 14,
                    "F": 15,
                    "G": 16,
                    "H": 17,
                    "I": 34,
                    "J": 18,
                    "K": 19,
                    "L": 20,
                    "M": 21,
                    "N": 22,
                    "O": 35,
                    "P": 23,
                    "Q": 24,
                    "R": 25,
                    "S": 26,
                    "T": 27,
                    "U": 28,
                    "V": 29,
                    "W": 32,
                    "X": 30,
                    "Y": 31,
                    "Z": 33
                }
                var nu = arr[str];
                //        //例如，A234567893，A对应的验证码是10，最后一位数是3。
                //        // 通算值= 1 + 0*9 + 2*8 + 3*7 + 4*6 + 5*5 + 6*4 + 7*3 + 8*2 + 9*1 = 157，
                //        // 通算值的末尾数是7。则10-7=3，与最后一位数（验证码）相同，身份证号码正确。
                //        // 反之，A234567890的最后一位是0，就不是有效字号。
                var subStr = num.substr(1, 10);
                var r = nu + subStr;
                var sum = 0;
                for (var i = 0; i <= 11; i++) {
                    if (i == 0) {
                        sum += Number(r.charAt(i));
                        continue;
                    }
                    sum += Number(r.charAt(i)) * (10 - i);
                }
                var strings = String(sum);
                var a = strings.substr(-1);
                var b = num.substr(-1);
                if (10 - a == b) {
                    return true;
                }
                return false;

            }

        }

        return false;

    }

    return identityCardTest;

})