/**
 * Created by ideabobo on 14-6-28.
 * commontools
 */
serializeObject = function(form) {
    var o = {};
    $.each(form.serializeArray(), function(index) {
        if (o[this['name']]) {
            o[this['name']] = o[this['name']] + "," + this['value'];
        } else {
            o[this['name']] = this['value'];
        }
    });
    return o;
};

function ajaxCallback(action, data, cb,notshow) {
    if(!clientUrl){
        alert("请先设置服务端根路径");
        return;
    }
    !notshow && showLoader("请稍后...");
    data = data || {};
    var retrytimes = 5;
    var count = 0;
    var connectServer = function(){
        !notshow && showLoader("请稍后...");
        $.ajax({
            type: "GET",
            url: clientUrl + action,
            dataType: "jsonp",
            jsonp: "callback",
            contentType: "text/html; charset=utf-8",
            data: data,
            timeout:50000,
            async:true,
            success: function (data) {
                hideLoader();
                cb(data);
                console.log("success");
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                hideLoader();
                console.log("error:"+XMLHttpRequest+" textStatus:"+textStatus+" errorThrown"+errorThrown);
            },
            complete:function(XMLHttpRequest, textStatus){
                console.log("complete:"+XMLHttpRequest+"textStatus:"+textStatus);
                if(textStatus == "timeout"){
                    if(count<retrytimes){
                        count++;
                        connectServer();
                        console.log(count);
                    }else{
                        showLoader("连接服务器超时！",true);
                    }

                }
            }
        });
    };
    connectServer();
}
/**
 * 判断是否所有的属性都有值
 * @param obj
 * @returns {boolean}
 */
function checkObjectValue(obj) {
    for(var p in obj){
        if(obj[p]!=undefined && obj[p]!=null){
            if($.trim(obj[p]) == ""){
                return true;
            }
        }
    }
    return false;
}

function getObjectById(id,goodlist){
    for(var i=0;i<goodlist.length;i++){
        var good = goodlist[i];
        if(good.id == id){
            return good;
        }
    }
    return null;
}



var _bigfileflag = false;
function showPicImg(files,el){
    var reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = function(e){ // reader onload start
        /*var total =e.total;
        if(total>20000000){
            _bigfileflag = true;
            tipTool.showAlert("图片过大!");
        }else{
            _bigfileflag = false;
            $("#"+el).css("background-image", "url("+e.target.result+")");
        }*/
        // ajax
        _bigfileflag = false;
        $("#"+el).css("background-image", "url("+e.target.result+")");

    }

}


function ajaxFormUploadFile(action,jel,cb){
    jel.ajaxForm({
        url : clientUrl+action,
        type:"post",
        beforeSubmit: function(){
            return true;
        },
        success : function(r){
            cb && cb(r);
        },
        xhr: function() {
            var xhr = $.ajaxSettings.xhr();
            //绑定上传进度的回调函数
            xhr.upload.addEventListener('progress', function(e){
                var totalsize = e.totalSize;
                var currentsize = e.position;
                var percent = parseInt((currentsize/totalsize)*100);
                showLoader("正在上传图片 "+percent+"%...");
            }, false);
            return xhr;//一定要返回，不然jQ没有XHR对象用了
        },
        resetForm:false
    });
    jel.submit();
    /*var option = {
     url : __APP__+action,
     type:"post",
     /!**
     * 校验文件格式是否符合要求符合返回true否者返回false
     *!/
     beforeSubmit: function(){
     return true;
     },
     success : function(r){
     cb && cb(r);
     },
     resetForm:false
     };
     jel.ajaxSubmit(option);*/
}


var EARTH_RADIUS = 6378137.0;    //单位M
function getGreatCircleDistance(lat1,lng1,lat2,lng2){
    var radLat1 = getRad(lat1);
    var radLat2 = getRad(lat2);

    var a = radLat1 - radLat2;
    var b = getRad(lng1) - getRad(lng2);

    var s = 2*Math.asin(Math.sqrt(Math.pow(Math.sin(a/2),2) + Math.cos(radLat1)*Math.cos(radLat2)*Math.pow(Math.sin(b/2),2)));
    s = s*EARTH_RADIUS;
    s = Math.round(s*10000)/10000.0;

    return s;
}

function getFlatternDistance(lat1,lng1,lat2,lng2){

    var f = getRad((lat1 + lat2)/2);
    var g = getRad((lat1 - lat2)/2);
    var l = getRad((lng1 - lng2)/2);

    var sg = Math.sin(g);
    var sl = Math.sin(l);
    var sf = Math.sin(f);

    var s,c,w,r,d,h1,h2;
    var a = EARTH_RADIUS;
    var fl = 1/298.257;

    sg = sg*sg;
    sl = sl*sl;
    sf = sf*sf;

    s = sg*(1-sl) + (1-sf)*sl;
    c = (1-sg)*(1-sl) + sf*sl;

    w = Math.atan(Math.sqrt(s/c));
    r = Math.sqrt(s*c)/w;
    d = 2*w*a;
    h1 = (3*r -1)/2/c;
    h2 = (3*r +1)/2/s;

    return d*(1 + fl*(h1*sf*(1-sg) - h2*(1-sf)*sg));
}

function getRad(d){
    var PI = Math.PI;
    return d*PI/180.0;
}

function getMyLocation(cb){
    navigator.geolocation.getCurrentPosition(function (value){
        longitude = value.coords.longitude;
        latitude = value.coords.latitude;
        cb && cb();
        //alert("坐标经度为：" + latitude + "， 纬度为：" + longitude );
        /*var gpsPoint = new BMap.Point(longitude, latitude);    // 创建点坐标
         map.centerAndZoom(gpsPoint, 15);
         parklist.sort(function (a,b){
         return getFlatternDistance(latitude,longitude,a.latitude,a.longitude)-getFlatternDistance(latitude,longitude,b.latitude,b.longitude);
         });*/
        //alert(parklist);

    }, function (){
        alert("获取位置失败!");
        cb && cb();
    }, { enableHighAccuracy: true, maximumAge: 1000 });
}
