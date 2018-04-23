
var gdmap = null;
var geolocation = null;
/*function initGdMap(){
    var map = new AMap.Map('container', {
        center: [117.000923, 36.675807],
        zoom: 15
    });
    map.plugin(["AMap.ToolBar"], function() {
        map.addControl(new AMap.ToolBar());
    });
    gdmap = map;

    gdmap.plugin('AMap.Geolocation', function () {
        geolocation = new AMap.Geolocation({
            enableHighAccuracy: true,//是否使用高精度定位，默认:true
            timeout: 10000,          //超过10秒后停止定位，默认：无穷大
            maximumAge: 0,           //定位结果缓存0毫秒，默认：0
            convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
            showButton: true,        //显示定位按钮，默认：true
            buttonPosition: 'LB',    //定位按钮停靠位置，默认：'LB'，左下角
            buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
            showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
            showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
            panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
            zoomToAccuracy:true      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
        });
        gdmap.addControl(geolocation);
        showLoader("正在定位...");
        geolocation.getCurrentPosition(function (status,data){
            hideLoader();
            if(status=="complete"){
                latitude = data.position.lat;
                longitude = data.position.lng;

                var uinfo = localStorage['userinfo'];
                if(uinfo && $.trim(uinfo)!=""){
                    uinfo  = JSON.parse(uinfo);
                    $("#lusername").val(uinfo.username);
                    $("#lpasswd").val(uinfo.passwd);
                    uinfo.remember = "1";
                    if(uinfo.roletype=="2"){
                        login(uinfo);
                    }

                }else{
                    toLogin();
                }
            }else{
                alert("定位失败!");
            }

        });
*/        /*AMap.event.addListener(geolocation, 'complete', function (data){
            alert(data);
        });//返回定位信息
        AMap.event.addListener(geolocation, 'error', function (ed){
            alert(ed);
        });*/      //返回定位出错信息
    });
}

/*function fabulocation(){
    showLoader("正在定位...");
    geolocation.getCurrentPosition(function (status,data){
        hideLoader();
        if(status=="complete"){
            latitude = data.position.lat;
            longitude = data.position.lng;
            $("#address").val(data.formattedAddress);
        }else{
            alert("定位失败!");
        }

    });
}*/

function geocoder(address) {
    var geocoder = new AMap.Geocoder({
        //city: "010", //地区，默认：“全国”
        radius: 1000 //范围，默认：500
    });
    //地理编码,返回地理编码结果
    geocoder.getLocation(address, function(status, result) {
        if (status === 'complete' && result.info === 'OK') {
            geocoder_CallBack(result);
        }
    });
}

function getAddressByLatLng(address,cb){
    var geocoder = new AMap.Geocoder({
        //city: "010", //地区，默认：“全国”
        radius: 1000 //范围，默认：500
    });
    //地理编码,返回地理编码结果
    geocoder.getLocation(address, function(status, result) {
        if (status === 'complete' && result.info === 'OK') {
            cb && cb(result);
        }else{
            cb && cb("-1");
        }
    });
}

var oldmarker = null;
function addMarker(i, d) {
    if(oldmarker){
        gdmap.remove(oldmarker);
    }
    var marker = new AMap.Marker({
        map: gdmap,
        position: [ d.location.getLng(),  d.location.getLat()]
    });
    oldmarker = marker;
    var infoWindow = new AMap.InfoWindow({
        content: d.formattedAddress,
        offset: {x: 0, y: -30}
    });
    marker.on("mouseover", function(e) {
        infoWindow.open(gdmap, marker.getPosition());
    });
}
//地理编码返回结果展示
function geocoder_CallBack(data) {
    var resultStr = "";
    //地理编码结果数组
    var geocode = data.geocodes;
    for (var i = 0; i < geocode.length; i++) {
        //拼接输出html
        resultStr += "<span style=\"font-size: 12px;padding:0px 0 4px 2px; border-bottom:1px solid #C1FFC1;\">" + "<b>地址</b>：" + geocode[i].formattedAddress + "" + "&nbsp;&nbsp;<b>的地理编码结果是:</b><b>&nbsp;&nbsp;&nbsp;&nbsp;坐标</b>：" + geocode[i].location.getLng() + ", " + geocode[i].location.getLat() + "" + "<b>&nbsp;&nbsp;&nbsp;&nbsp;匹配级别</b>：" + geocode[i].level + "</span>";
        addMarker(i, geocode[i]);
    }
    gdmap.setFitView();
    //document.getElementById("result").innerHTML = resultStr;
}