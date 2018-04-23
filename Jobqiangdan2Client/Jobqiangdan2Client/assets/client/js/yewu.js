
var shoplist = [];
var billlist = [];
var goodlist = [];
var addresslist = [];
var focusobj = null;
var focushop = {};
var foodcarlist = [];
var gouwuche = "gouwuche";

$(function(){
//设置种类列表
    var p = {};
    p.tpl = '<li><a href="#" onclick="toGoods(%s);">'+
                //'<img src="'+fileurl+'%s">'+
                '<h2>%s</h2>'+
                //'<p>%s</p>'+
            '</a></li>';
    p.colums = ["id","sname"];
    $("#shops").data("property",JSON.stringify(p));

    var pga2 = {};
    pga2.tpl = '<li><a href="#" onclick="toGoodAdimin(%s);">'+
     '<img src="'+fileurl+'%s">'+
     '<h2>%s</h2>'+
     '<p>%s</p>'+
     '<p style="color: red;">%s 元</p>'+
     '</a></li>';
    pga2.colums = ["id","img","gname","note","price"];
     $("#goodsadmin").data("property",JSON.stringify(pga2));

    var p2 = {};
    p2.tpl = '<li><a href="#" onclick="toGood(%s);">'+
        //'<img src="'+fileurl+'%s">'+
        '<h2>%s</h2>'+
        '<p>%s</p>'+
        '<p style="color: red;">酬金:%s 元</p>'+
        ''
        '</a></li>';
    p2.colums = ["id","gname","note","price"];
    $("#goods").data("property",JSON.stringify(p2));

    /*var p2 = {};
    p2.tpl ='<a onclick="toGood(%s);"><li class="gitem"><div><img src="'+fileurl+'%s"><h2>%s</h2><p>现价:%s元/原价:%s</p><h3>%s</h3></div></li></a>';
    p2.colums = ["id","img","gname","price","oldprice","ndate"];
    $("#goods").data("property",JSON.stringify(p2));*/


    /*var p2 = {};
    p2.tpl='<li>'+
    '<a href="#" onclick="toGood(%s);">'+
    '<img class="previewimg listimg" src="'+fileurl+'%s">'+
    '<h2 style="">%s</h2>'+
    '<p style="color: red;">%s 元</p>'+
        '<p style="color: red;">销量:%s</p>'+
    '</a>'+
    '<div class="countopreadiv">'+
    '<a onclick="countFood(%s,1);"><img src="images/add.png"></a>'+
    '<input id="food%s" data-role="none" type="text" value="0">'+
    '<a onclick="countFood(%s,-1);"><img src="images/jian.png"></a>'+
    '</div>'+
    '</li>';
    p2.colums = ["id","img","gname","price","xiaoliang","id","id","id"];
    $("#goods").data("property",JSON.stringify(p2));*/


    var p2t = {};
    p2t.tpl='<li>'+
        '<a href="#" onclick="toGood(%s);">'+
        '<img class="previewimg" src="'+fileurl+'%s">'+
        '<h2 style="">%s</h2>'+
        '<p style="color: red;">%s 元</p>'+
        '</a>'+
        '<div class="countopreadiv">'+
        '<a onclick="countFood(%s,1);"><img src="images/add.png"></a>'+
        '<input id="food%s" data-role="none" type="text" value="0">'+
        '<a onclick="countFood(%s,-1);"><img src="images/jian.png"></a>'+
        '</div>'+
        '</li>';
    p2t.colums = ["id","img","gname","price","id","id","id"];
    $("#tuijianlist").data("property",JSON.stringify(p2t));




    var p3 = {};
    p3.tpl = '<li><a>'+
        '<img src="'+fileurl+'%s" class="ui-li-thumb">'+
        '<h2>%s</h2>'+
        '<p style="color: red;">%s 元</p>'+
        //'<p>数量:%s</p>'+
        '</a><a onclick="removeCar(%s);">删除</a>'+
        '</li>';
    p3.colums = ["img","gname","price","id"];
    $("#cars").data("property",JSON.stringify(p3));


    /*var p3 = {};
    p3.tpl='<li>'+
    '<a href="#" onclick="toGood(%s);">'+
    '<img class="previewimg" src="'+fileurl+'%s">'+
    '<h2 style="">%s</h2>'+
    '<p style="color: red;">%s 元</p>'+
    '</a>'+
    '<div class="countopreadiv">'+
    '<a onclick="countFoodCar(%s,1);"><img src="images/add.png"></a>'+
    '<input id="foodcar%s" data-role="none" type="text" value="%s">'+
    '<a onclick="countFoodCar(%s,-1);"><img src="images/jian.png"></a>'+
    '</div>'+
    '</li>';
    p3.colums = ["id","img","gname","price","id","id","count","id"];
    $("#cars").data("property",JSON.stringify(p3));*/

    var p4 = {};
    p4.tpl = '<li><a href="#" onclick="billDetail(%s);">'+
        '<h2>%s</h2>'+
        '<p>%s</p>'+
        '<p style="color: red;">酬金:%s</p>'+
        //'<p>电话:%s</p>'+
        //'<p style="color: red;">状态:%s</p>'+
        '</a></li>';
    p4.colums = ["id","ndate","gnames","total"];
    $("#bills").data("property",JSON.stringify(p4));
    $("#bills2").data("property",JSON.stringify(p4));




    
    var p6 = {};
    p6.tpl = '<li><a href="#" onclick="">'+
        //'<img src="'+fileurl+'%s">'+
    '<p>%s    %s</p>'+
    '<p>%s</p>'+
    '</a></li>';
    p6.colums = ["username","ndate","note"];
    $("#replays").data("property",JSON.stringify(p6));


    var p7 = {};
    p7.tpl = '<li><a href="#" onclick="toGood(%s,1);">'+
    '<img src="'+fileurl+'%s" class="ui-li-thumb">'+
    '<h2>%s %s</h2>'+
    '<p>%s</p>'+
    '<p style="color: red;">现价:%s 元 原价:%s元</p>'+
        '<p style="color: red;">距离:%s米</p>'+
        '<p>%s</p>'+
    '</a></li>';
    p7.colums = ["id","img","gname","zuozhe","note","price","oldprice","distance","ndate"];
    $("#goodslist").data("property",JSON.stringify(p2));


    var pdz = {};
    pdz.tpl = '<li><a href="#" onclick="">'+
    '<h2>%s</h2>'+
    '<p>电话:%s</p>'+
    '<p>日期:%s</p>'+
    '<p>时间:%s</p>'+
    '<p>人数:%s</p>'+
    '<p>备注:%s</p>'+
    '<p>%s</p>'+
    '</a></li>';
    pdz.colums = ["xingming","shouji","todate","shijian","renshu","beizhu","ndate"];
    $("#dingzuolist").data("property",JSON.stringify(pdz));

    var atpl = {};
    atpl.tpl = '<li><a href="#" onclick="toAddressMg(%s);">'+
    '<h2>%s</h2>'+
    '</a><a onclick="delAddress(%s);"></a></li>';
    atpl.colums = ["id","title","id"];
    $("#addresss").data("property",JSON.stringify(atpl));


/*    var $container = $('#goods');
    $container.masonry({
        columnWidth: 200,
        itemSelector: '.gitem'
    });*/

    /*$("#mainpage").on("pagebeforeshow",function(){
       if(!userinfo){
           logout();
       }
    });*/

    var p77 = {};
    p77.tpl = '<li><a href="#" onclick="toGood(%s,1);">'+
        //'<img src="'+fileurl+'%s" class="ui-li-thumb">'+
        '<h2>%s</h2>'+
        '<p>%s</p>'+
        '<p style="color: red;">酬金:%s</p>'+
        '</a></li>';
    p77.colums = ["id","gname","note","price"];
    $("#billgoods").data("property",JSON.stringify(p77));


    $("#pinglunclick").click(function(e){
        var offsetx = e.offsetX;
        var widht = 0;
        if(offsetx>0 && offsetx<35){
            widht = 35;
        }else if(offsetx>=35 && offsetx<70){
            widht = 70;
        }else if(offsetx>=70 && offsetx<105){
            widht = 105;
        }else if(offsetx>=105 && offsetx<140){
            widht = 140;
        }else if(offsetx>=140){
            widht = 175;
        }
        $("#starwidht").css({width:widht+"px"});
    });

    initGdMap();
});
function countFood(id,flag){
    var obj = getObjectById(id,goodlist);
    if(obj){
        var el = $("#food"+id);
        var ocount = el.val();
        ocount = parseInt(ocount);
        ocount+=flag;
        if(ocount<=0){
            el.val("0");
            ocount = 0;
        }
        obj.count = ocount;
        el.val(ocount);
        addToFoodCar(obj,0);
    }
}

function countFoodCar(id,flag){
    var obj = getObjectById(id,goodlist);
    if(obj){
        var el = $("#foodcar"+id);
        var ocount = el.val();
        ocount = parseInt(ocount);
        ocount+=flag;
        if(ocount<=0){
            el.val("0");
            ocount = 0;
        }
        obj.count = ocount;
        el.val(ocount);
        addToFoodCar(obj,1);
    }
}
//加入关注
function addToFoodCar(obj,type){
    var newlist = [];
    var flag = false;
    for(var i=0;i<foodcarlist.length;i++){
        if(foodcarlist[i].id == obj.id){
            if(foodcarlist[i].count==0){
                continue;
            }else{
                foodcarlist[i] = obj;
                flag = true;
            }

        }
        newlist.push(foodcarlist[i]);
    }
    if(!flag){
        newlist.push(obj);
    }
    foodcarlist = newlist;
    if(type==1){
        listFoodCar();
    }
}






/********************************************************地址增删改******************************************/
function toAddressPage(){
    changePage("addresspage");
    listAddress();
}
function listAddress(){
    ajaxCallback("listAddress",{uid:userinfo.id},function(data){
        addresslist = data;
        $("#addresss").refreshShowListView(data);
    });
}
function toAddressMg(id){
    changePage("addressmgpage");
    if(id){
        $("#addressid").val(id);
        $("#addressaction").val("edit");
        var obj = getObjectById(id,addresslist);
        focusobj = obj;
        $("#title").val(obj.title);
    }else{
        $("#addressform")[0].reset();
        $("#addressaction").val("add");
    }

}





function saveAddress(){
    var fdata = serializeObject($("#addressform"));
    fdata.uid = userinfo.id;
    ajaxCallback("saveAddress",fdata,function(){
       showTipTimer("操作成功",function(){
           toAddressPage();
       });
    });
}

function addAddress(){
    var fdata = {};
    fdata.uid = userinfo.id;
    fdata.title = userinfo.address;
    fdata.action = "add";
    ajaxCallback("saveAddress",fdata,function(){

    });
}


function delAddress(id){
    ajaxCallback("delAddress",{id:id},function(){
        toAddressPage();
        showLoader("操作成功",true);
    });
}
/********************************************************地址增删改end******************************************/
function toMain(){
    toGoods();
    //toShops();
}

function toMyGood(){
    changePage('mygoodspage');
    ajaxCallback("listGood",{sid:userinfo.id},function(data){
        //goodlist = data;
        var html = "";
        for(var i=0;i<data.length;i++){
            var obj = data[i];
            obj.statuscn = "待刷新";
            if(obj.status=="1"){
                obj.statuscn = "待刷新";
            }else if(obj.status=="2"){
                obj.statuscn = "正在交易";
            }else if(obj.status=="3"){
                obj.statuscn = "已交易";
            }
            var option = '<div class="optionctn2"><a href="#" onclick="changGoodStatus('+obj.id+',1);">刷新</a>' +
                //'<a href="#" onclick="changGoodStatus('+obj.id+',2);">正在交易</a><a href="#" onclick="changGoodStatus('+obj.id+',3);">已交易</a>' +
                '</div>';

            if(obj.status=="3"){
             option="";
             }
            var tpl = '<li style="border-bottom: 1px #ddd solid;">'+
                //'<img style="width: 50%;" onclick="toGood('+obj.id+');" src="'+fileurl+obj.img+'" alt="">'+
                '<h1 onclick="toGood('+obj.id+');">'+obj.gname+'('+obj.statuscn+')</h1>'+
                '<h2>'+obj.note+'</h2>'+
                //'<p>购买日期:'+obj.cbs+'</p>'+
                '<p style="top: 180px;">'+obj.price+'元'+'</p>'+
                option+
                '</li>';
            html+=tpl;


        }
        $("#goodslist2").html(html);

    });
}

function changGoodStatus(id,type){
    ajaxCallback("changGoodStatus",{id:id,type:type},function(data){
        toMyGood();
    });
}

function toShops(){
    changePage("shopspage");
    listShop();
}

function listShop(){
    ajaxCallback("listShop",{},function(data){
        shoplist = data;
        $("#shops").refreshShowListView(data);
    });
}

function toShop(id){
    focushop = getObjectById(id,shoplist);
    toShopDetail();
}

function toShopDetail(){
    changePage('shoppage');
    $("#gname3").text("名称:"+focushop.sname);
    $("#gimg3").attr("src",fileurl+focushop.img);
    $("#gaddress").text("地址:"+focushop.address);
    $("#gtel3").text("电话:"+focushop.tel);
    $("#gnote3").text("介绍:"+focushop.note);

}

function toGoods(id){
    var sid = id || focushop.id;
    changePage("mainpage");
    listType();
    listGood(sid);
    //initIdeaScroll();
}

function toTuijian(){
    changePage("tuijianpage");
    listGoodTuijian();
}
function listGoodTuijian(){
    ajaxCallback("listGood",{},function(data){
        goodlist = data;
        var newlist = [];
        for(var i=0;i<data.length;i++){
            if(newlist.length<10){
                newlist.push(data[i]);
            }
        }
        $("#tuijianlist").refreshInsertView(newlist);
        //$("#goods").refreshShowListView(data);
    });
}
function refreshGood(title,type){
    var stype = title || $("#type").val() || "";
    var paixu = $("#type2").val();
    ajaxCallback("listGood",{stitle:title,stype:stype,order:paixu},function(data){
        if(userinfo.roletype=="3"){
            $("#goodsadmin").refreshShowListView(data);
        }else{
            $("#goods").refreshShowListView(data);
        }

    });
}

function listGood(sid){
    ajaxCallback("listGood",{sid:sid},function(data){

        for(var i=0;i<data.length;i++){
            var obj = data[i];
            var tlatitude = obj.latitude*1;
            var tlongitude = obj.longitude*1;
            if(latitude==tlatitude && tlongitude==longitude){
                obj.distance = 0;
            }else{
                obj.distance = (getFlatternDistance(latitude,longitude,tlatitude,tlongitude)).toFixed(0);
            }

        }
        goodlist = data;
        /*goodlist.sort(function (a,b){
            return a.distance-b.distance;
        });*/
        refreshGoods("goods",goodlist);
        //if(userinfo.roletype=="2"){
            //$("#goods").refreshInsertView(data);
        /*}else{
            $("#goodsadmin").refreshShowListView(data);
        }*/

        //$("#goods").refreshShowListView(data);
    });
}

function listType(){
    ajaxCallback("listType",{},function(data){
        //$("#type").empty();
        //var html = "<option value=''>请选择</option>";
        //$("#type").append(html);
        //for(var i=0;i<data.length;i++){
        //    var obj = data[i];
        //    var html = "<option value='"+obj.id+"'>"+obj.title+"</option>";
        //    $("#type").append(html);
        //}
        $("#type").refreshShowSelectMenu(data,"选择种类");
    });
}

function refreshGoods(el,data){
    $("#"+el).refreshShowListView(data);
    /*var html = "";
    for(var i=0;i<data.length;i++){
        var obj = data[i];

        var zhekou = ((obj.price/obj.oldprice)*10).toFixed(1);
        html+='<a onclick="toGood('+obj.id+');">' +
            '<li class="gitem">' +
            '<div>' +
            '<img src="'+fileurl+obj.img+'">' +
            '<h2>'+obj.gname+' '+obj.zuozhe+' '+obj.level+'成新 '+zhekou+'折</h2>' +
            '<p>距离:'+obj.distance+'米</p>' +
            '<p>酬金:'+obj.price+'元/'+obj.oldprice+'元</p>' +
            '<h3>'+obj.ndate+'</h3>' +
            '</div>' +
            '</li></a>'
    }
    $("#"+el).html(html);*/
}


function toGood(id,flag){
    var obj = getGoodById(id);
    focusobj = obj;
    changePage("goodpage");
    $("#gname2").text("名称:"+obj.gname);
    //$("#gimg2").attr("src",fileurl+obj.img);
    $("#gnote2").text("要求:"+obj.note);
    $("#vbanben").text("地址:"+obj.address);
    $("#gprice2").text("酬金:"+obj.price);
    $("#vndate").text("刷新时间:"+obj.ndate);
    $("#guser").text("发布者:"+obj.shop);
    //geocoder(obj.address);
    /*$("#zan").text(obj.zan||0);*/

    listReplay();
    $("#canreplay").hide();
    $("#canbuy").hide();
    $("#jduser").hide();

    ajaxCallback("getGoodBillList",{gid:focusobj.id},function(data){
    	//alert(JSON.stringify(data));
    	//alert(JSON.stringify(data.user));
    	//alert(username);
    	
    	var uname = "";
    	var ii = 0;
    	for(i in data)
    	{
    		uname +=","+data[i].user;
    		ii++;
    	}

    	var uuu = new String(uname);
        if(data && (uuu.indexOf(username) > -1)){
            $("#jduser").text("接单者:"+uuu).show();
            $("#canreplay").show();
            $("#statuscn").text("状态:"+data[0].statecn);
        }else{
            $("#statuscn").text("状态:待参与");
            $("#canbuy").show();
        }
        $("#count").text("参与人数："+ii+" 人");


    });



}

function toUserInfo(){
    var uid = focusobj.sid;
    ajaxCallback("getUser",{id:uid},function(data){
        changePage("userinfopage2");
        $("#vusername2").text("用户名:"+data.username);
        $("#vtel2").text("电话:"+data.tel);
        $("#vwechat2").text("微信:"+data.wechat);
        $("#vsex2").text("性别:"+data.sex);
        $("#vbirth2").text("生日:"+data.birth);
        $("#vaddress2").text("地址:"+data.address);

        $("#eimgtx4").css("background-image", "url("+fileurl+userinfo.img+")");
    });
}

function toGoodDetail(obj){
    focusobj = obj;
    changePage("goodpage");
    $("#gname2").text("约玩信息名:"+obj.gname);
    $("#gimg2").attr("src",fileurl+obj.img);
    $("#gnote2").text("简介:"+obj.note);
    $("#gprice2").text("酬金:"+obj.price);
    $("#guser").text("发布者:"+obj.shop);
    $("#gtel").text("电话:"+obj.tel);
    $("#guid").text("用户id:"+obj.ownid);
    $("#gaddress").text("地点:"+obj.address);
    $("#zan").text(obj.zan||0);
    listReplay();
    $("#canreplay").hide();
    $("#canbuy").hide();
    $("#canbuy").show();
}


function toGoodAdimin(id){
    var obj = getGoodById(id);
    focusobj = obj;
    changePage("goodpage");
    $("#gname2").text("名称:"+obj.gname);
    $("#gimg2").attr("src",fileurl+obj.img);
    $("#gnote2").text("简介:"+obj.note);
    $("#gprice2").text("酬金:"+obj.price);
    $("#zan").text(obj.zan||0);
    listReplay();
}

function refreshMainGood(el){
    var type = $(el).val();
    if(type==0){
        goodlist.sort(function (a,b){
            return a.distance-b.distance;
        });
    }else if(type=="1"){
        goodlist.sort(function (a,b){
            return a.price*1-b.price*1;
        });
    }else if(type=="2"){
        goodlist.sort(function (a,b){
            return b.price*1-a.price*1;
        });
    }else{
        goodlist.sort(function (a,b){
            return b.ntime-a.ntime;
        });
    }

    //$("#goods").refreshInsertView(goodlist);
    refreshGoods("goods",goodlist);
}




function refreshMainGood2(rrlist){
    var type = $("#sort").val();
    if(type==0){
        rrlist.sort(function (a,b){
            return a.distance-b.distance;
        });
    }else if(type=="1"){
        rrlist.sort(function (a,b){
            return a.price*1-b.price*1;
        });
    }else if(type=="2"){
        rrlist.sort(function (a,b){
            return b.price*1-a.price*1;
        });
    }else{
        goodlist.sort(function (a,b){
            return b.ntime-a.ntime;
        });
    }

    return rrlist;
    //$("#goodslist").refreshInsertView(goodlist);

}


function zan(){
    var id = focusobj.id;
    ajaxCallback("zan",{id:id},function(data){
        $("#zan").text(data.info);
    });
}


function listReplay(){
    ajaxCallback("listReplay",{pid:focusobj.id},function(data){
        $("#replays").refreshShowListView(data);
    });
}
function addReplay(){
    if(uploadFileUrl){
        uplaodImg(function(r){
            commitReplay(r);
        });
    }else{
        commitReplay();
    }


}

function commitReplay(img){
    img = img || "";
    var note = $("#rnote").val();
    ajaxCallback("addReplay",{pid:focusobj.id,uid:userinfo.id,username:userinfo.username,note:note,img:img},function(data){
        listReplay();
    });
}

function getGoodById(id){
    for(var i=0;i<goodlist.length;i++){
        var good = goodlist[i];
        if(good.id == id){
            return good;
        }
    }
    return null;
}

function tijiaouser(){
    var note = $("#infobeizhu2").val();
    var bill = {};
    bill.uid = userinfo.id;
    bill.user = userinfo.username;
    bill.shop = focusobj.shop;
    bill.sid = focusobj.sid;
    bill.gids = focusobj.id;
    bill.gnames = focusobj.gname;
    bill.total = focusobj.price*parseInt(focusobj.count);
    bill.tel = userinfo.tel;
    bill.address = $("#naddress").val();
    bill.note = note;
    bill.statecn="未完成";
    ajaxCallback("saveBill",bill,function(data){
        $("#infobeizhu").val("");
        showTipTimer("订单提交成功!",function(){
            billDetail(data)
        });

    });
}

function tijiao(){
    focusobj.count = $("#count").val();
    if(userinfo){
        changePage("infopage2");
        $("#iscar2").val("1");
        setUserInfo();
    }else{
        changePage("infopage");
        $("#iscar").val("1");
    }
}

function setUserInfo(){
    $("#ntel").text("电话:"+userinfo.tel);
    ajaxCallback("listAddress",{uid:userinfo.id},function(data){
        $("#naddress").refreshShowSelectMenu(data,null,"title","title");
    });

}

function tijiaoyouke(){
    var tel = $("#infotel").val();
    var address = $("#infoaddress").val();
    var note = $("#infobeizhu").val();
    if($.trim(tel)=="" || $.trim(address)==""){
        showLoader("请填写电话和地址信息!",true);
        return;
    }
    if(tel.length<11){
        showLoader("请填写正确的电话号码!",true);
        return;
    }
    var bill = {};
    bill.shop = focushop.sname;
    bill.sid = focushop.id;
    bill.gids = focusobj.id;
    bill.gnames = focusobj.gname;
    bill.total = focusobj.price;
    bill.tel = tel;
    bill.address = address;
    bill.note = note;
    bill.statecn="未完成";
    ajaxCallback("saveBill",bill,function(){
        $("#infobeizhu2").val("");
        showTipTimer("订单提交成功!",function(){
            toMain();
        });

    });
}

function youketijiao(){
    var type = $("#iscar").val();
    if(type == 1){
        tijiaoyouke();
    }else{
        tijiaocaryouke();
    }
}

function usertijiao(){
    ajaxCallback("getGoodBill",{gid:focusobj.id},function(data){
        if(data && data.user && (data.user.indexOf(username) >= 0)){
            showLoader("你已经参与!",true);
        }else{
            var type = $("#iscar2").val();
            if(type == 1){
                tijiaouser()
            }else{
                tijiaocaruser();
            }
        }
    });

}

function toTousu(){
    changePage('tousupage');
}

function tousu(){
    var note = $("#tousunote").val();
    var tel = $("#telfankui").val();
    ajaxCallback("saveFankui",{note:note,uid:userinfo.id,username:userinfo.username,tel:tel},function(data){
        showLoader("提交成功!",true);
    });
}

function addToCar(){
    var str = localStorage[gouwuche];
    var list = [];
    if(str){
        list = JSON.parse(str);
    }
    focusobj.count = $("#count").val();
    list.push(focusobj);
    localStorage[gouwuche] = JSON.stringify(list);
    /*focusobj.count = $("#count").val();
    addToFoodCar(focusobj,0);*/
    showLoader("已经添加到关注!",true);
}

function showCar(){
    if(!userinfo){
        changePage("loginpage");
        return;
    }
    changePage("carspage");
    carlist();
    //listFoodCar();
}

function listFoodCar(){
    $("#cars").refreshShowListView(foodcarlist);
}

function carlist(){
    var str = localStorage[gouwuche];
    var list = [];
    if(str){
        list = JSON.parse(str);
    }
    $("#cars").refreshShowListView(list);
}

function removeCar(id){
    var str = localStorage[gouwuche];
    var list = [];
    var newlist = [];
    if(str){
        list = JSON.parse(str);
        for(var i=0;i<list.length;i++){
            var obj = list[i];
            if(obj.id == id){
                continue;
            }
            newlist.push(obj);
        }
        localStorage[gouwuche] = JSON.stringify(newlist);
        $("#cars").refreshShowListView(newlist);
    }
}

function tijiaocar(){
    if(userinfo){
        changePage("infopage2");
        $("#iscar2").val("2");
        setUserInfo();
    }else{
        changePage("infopage");
        $("#iscar").val("2");
    }
}

function tijiaocaruser(){
    var note = $("#infobeizhu2").val();
    var str = localStorage[gouwuche];
    foodcarlist = JSON.parse(str);
    var sids = [];
    var shopgoods = {};
    var bills = [];
    if(foodcarlist){
        var list = foodcarlist;
        for(var i=0;i<list.length;i++){
            var flag = false;
            var good = list[i];
            for(var n=0;n<sids.length;n++){
                if(sids[n]==good.sid){
                    shopgoods[good.sid].push(good);
                    flag = true;
                    break;
                }
            }
            if(!flag){
                shopgoods[good.sid] = [];
                shopgoods[good.sid].push(good);
                sids.push(good.sid);
            }
        }
    }

    for(var i=0;i<sids.length;i++){
        var goodlist = shopgoods[sids[i]];
        var gids = "";
        var gnames = "";
        var sname = "";
        var total = 0;
        var sid = sids[i];
        var bill = {};
        bill.uid = userinfo.id;
        bill.user = userinfo.username;
        for(var n=0;n<goodlist.length;n++){
            var good = goodlist[n];
            if(n==0){
                sname = good.shop;
                gids+=good.id;
                gnames+=good.gname;
            }else{
                gids+=","+good.id;
                gnames+=","+good.gname;
            }
            total+=parseInt(good.price)*parseInt(good.count);
        }
        bill.shop = sname;
        bill.sid = sid;
        bill.gids = gids;
        bill.gnames = gnames;
        bill.total = total;
        bill.tel = userinfo.tel;
        bill.address = $("#naddress").val();
        bill.note = note;
        bill.statecn="未完成";
        bills.push(bill);
    }
    if(bills.length){
        ajaxCallback("saveBills",{bills:JSON.stringify(bills)},function(data){
            //localStorage[gouwuche] = "";
            foodcarlist = [];
            $("#infobeizhu").val("");
            showTipTimer("订单提交成功!",function(){
                billDetail(data);
            });
        });
    }

}

function tijiaocaryouke(){
    var tel = $("#infotel").val();
    var address = $("#infoaddress").val();
    var note = $("#infobeizhu").val();
    if($.trim(tel)=="" || $.trim(address)==""){
        showLoader("请填写电话和地址信息!",true);
        return;
    }
    if(tel.length<11){
        showLoader("请填写正确的电话号码!",true);
        return;
    }
    var str = localStorage[gouwuche];
    var sids = [];
    var shopgoods = {};
    var bills = [];
    if(str){
        var list = JSON.parse(str);
        for(var i=0;i<list.length;i++){
            var flag = false;
            var good = list[i];
            for(var n=0;n<sids.length;n++){
                if(sids[n]==good.sid){
                    shopgoods[good.sid].push(good);
                    flag = true;
                    break;
                }
            }
            if(!flag){
                shopgoods[good.sid] = [];
                shopgoods[good.sid].push(good);
                sids.push(good.sid);
            }
        }
    }

    for(var i=0;i<sids.length;i++){
        var goodlist = shopgoods[sids[i]];
        var gids = "";
        var gnames = "";
        var sname = "";
        var total = 0;
        var sid = sids[i];
        var bill = {};
        bill.uid = "";
        bill.user = "";
        for(var n=0;n<goodlist.length;n++){
            var good = goodlist[n];
            if(n==0){
                sname = good.shop;
                gids+=good.id;
                gnames+=good.gname;
            }else{
                gids+=","+good.id;
                gnames+=","+good.gname;
            }
            total+=parseInt(good.price);
        }
        bill.shop = sname;
        bill.sid = sid;
        bill.gids = gids;
        bill.gnames = gnames;
        bill.total = total;
        bill.tel = tel;
        bill.address = address;
        bill.note = note;
        bills.push(bill);
    }
    if(bills.length){
        ajaxCallback("saveBills",{bills:JSON.stringify(bills)},function(data){
            localStorage[gouwuche] = "";
            showTipTimer("订单提交成功!",function(){
                toMyBill();
            });
        });
    }

}



function toMyBill(){
    if(userinfo){
        changePage("mybillpage");
        mybillslist();
    }else{
        changePage("loginpage");
    }

}

function toMyBill2(){
    if(userinfo){
        changePage("mybillpage2");
        mybillslist2();
    }else{
        changePage("loginpage");
    }

}

function mybillslist(type){
    if(userinfo.roletype=="2"){
        ajaxCallback("mybills",{uid:userinfo.id},function(data){
            billlist = data;
            $("#bills").refreshShowListView(data);
        });
    }else{
        ajaxCallback("mybills",{sid:userinfo.sid,type:type},function(data){
            billlist = data;
            $("#bills").refreshShowListView(data);
        });
    }

}

function mybillslist2(){
    ajaxCallback("mybills2",{uid:userinfo.id},function(data){
        billlist = data;
        $("#bills2").refreshShowListView(data);
    });
}

var _linetimmer = null;

function billDetail(id) {
    clearInterval(_linetimmer);
    /*if(flag){

    }else{*/
        changePage("billgoodspage");
    //}

    var bill = {};
    if (typeof id == "object") {
        bill = id;
    } else {
        bill = getObjectById(id, billlist);
    }

    focusobj = bill;
    $("#btotal").text("酬金:" + bill.total);
    //$("#bfenqi").text("积分:"+bill.fenqi+"个月");
    $("#bndate").text("下单时间:" + bill.ndate);

    //var m = bill.total*1/bill.fenqi;
    //m = m.toFixed(2);
    //$("#bmoney").text("每月3号还款:"+m);
    $("#statecn").text("订单状态:" + bill.statecn);
    if (bill) {
        var gids = bill.gids;
        ajaxCallback("listBillGoods", {gids: gids}, function (data) {
            $("#billgoods").refreshShowListView(data);
        },true);
    }
    if (bill.statecn == "未完成") {
        $("#paydiv").show();
    } else {
        $("#paydiv").hide();
        $("#surediv").hide();
    }

    if (bill.statecn == "送餐中") {
        $("#surediv").show();
    } else if (bill.statecn == "未完成") {
        $("#surediv").hide();
    }else{
        $("#surediv").hide();
    }

    /*if(bill.statecn=="未叫号"){
        getLineNumber(id,function (count){
            if(count==0){
                $("#statecn").text("订单状态:已叫号");
            }else if(count<3){
                $("#statecn").text("准备取餐");
                myObj.showIntentActivityNotify("点餐提示","请准备取餐",100);
            }else{
                $("#statecn").text("等待人数:" + count+"人");
            }
            _linetimmer = setInterval(function(){
                billDetail(id,true);
            },5000);
        });
    }else{
        clearInterval(_linetimmer);
        $("#statecn").text("订单状态:" + bill.statecn);
    }*/




}


function getLineNumber(bid,cb){
    ajaxCallback("getLineNumber",{bid:bid},function(data){
        //alert(data.info);
        cb && cb(data.info);
    },true);
}

function payBill(){
    //if(userinfo.money && userinfo.money*1>focusobj.total*1){
        var id = focusobj.id;
        var statecn="已完成";
        ajaxCallback("billState",{id:id,statecn:statecn},function(data){
            showTipTimer("操作成功!",function(){
                billDetail(data);
            });

        });
/*    }else{
        showLoader("余额不足!",true);
    }*/

}


function refreshBill(el){
    var v = $(el).val();
    mybillslist(v);
}


function sureBill(){

        var id = focusobj.id;
        var statecn="已确认";
        ajaxCallback("billState",{id:id,statecn:statecn},function(data){
            showTipTimer("操作成功!",function(){
                billDetail(data);
            });

        });


}


function cuidan(){
    var id = focusobj.id;
    ajaxCallback("billCuidan",{id:id},function(data){
        showTipTimer("操作成功!",function(){
            billDetail(data);
        });

    });
}

function changStatus(){
    var id = focusobj.id;
    var statecn = $("#statecnvalue").val();
    ajaxCallback("billState",{id:id,statecn:statecn},function(data){
        showTipTimer("操作成功!",function(){
            billDetail(data);
        });

    });
}

function filterMainGood(){
    var keystr = $("#searchinput").val();
    var newlist = [];
    if(keystr){
        for(var i=0;i<goodlist.length;i++){
            var obj = goodlist[i];
            var gname = obj.gname;
            if(gname.indexOf(keystr)==-1){
                continue;
            }
            newlist.push(obj);
        }

    }else{
        newlist = goodlist;
    }
    refreshGoods("goods",newlist);
}


function filterGood(){
    var list = filterObj(goodlist);
    $("#goodslist").refreshShowListView(list);
    $("#mypanel").trigger("close");
}

function filterObj(list){
    var sgname = $("#sgname").val();
    var szuozhe = $("#szuozhe").val();
    var scbs = $("#scbs").val();
    var pricefrom = $("#pricefrom").val();
    var priceto = $("#priceto").val();
    var levelfrom = $("#levelfrom").val();
    var levelto = $("#levelto").val();
    var rlist = [];
    if(!sgname && !szuozhe&& !scbs && !pricefrom && !priceto && !levelfrom && !levelto){
        rlist = list;
    }else{
        for(var i= 0,len=list.length;i<len;i++){
            var obj = list[i];

            if(levelfrom){
                if(parseInt(obj.level)<parseInt(levelfrom)){
                    continue;
                }
            }
            if(levelto){
                if(parseInt(obj.level)>parseInt(levelto)){
                    continue;
                }
            }
            if(pricefrom){
                if(parseInt(obj.price)<parseInt(pricefrom)){
                    continue;
                }
            }

            if(priceto){
                if(parseInt(obj.price)>parseInt(priceto)){
                    continue;
                }
            }
            if(sgname){
                var gname = obj.gname;
                if(gname.indexOf(sgname)==-1){
                    continue;
                }
            }
            if(szuozhe){
                var zuozhe = obj.zuozhe;
                if(zuozhe.indexOf(szuozhe)==-1){
                    continue;
                }
            }
            if(scbs){
                var cbs = obj.cbs;
                if(cbs.indexOf(scbs)==-1){
                    continue;
                }
            }
            rlist.push(obj);

        }
    }
    if(rlist.length){
        rlist = refreshMainGood2(rlist);
    }

    return rlist;
    /*var pricefrom = $("#pricefrom").val();
     var priceto = $("#priceto").val();
     var rrlist = [];
     if(!pricefrom && !priceto){
     return rlist;
     }else{
     for(var i=0;i<rlist.length;i++){
     var obj = rlist[i];
     if(pricefrom){
     if(pricefrom*1>obj.price*1){
     continue
     }
     }
     if(priceto){
     if(priceto*1<obj.price*1){
     continue;
     }
     }
     rrlist.push(obj);

     }
     return rrlist;
     }*/



}

function toDingzuo(){
    changePage("dingzuopage");
    myDingzuo();
}

function toAddDingzuo(){
    changePage("dingzuo");
    fulshDateSelect();
}

function saveDingzuo() {
    var fdata = serializeObject($("#dingzuoform"));
    fdata.openid = userinfo.id;
    fdata.username = userinfo.username;
    ajaxCallback("saveDingzuo",fdata,function(){
        showTipTimer("操作成功!",function(){
            toDingzuo();
        });
    });

}
function myDingzuo() {
    ajaxCallback("myDingzuo",{uid:userinfo.id},function(data){
        $("#dingzuolist").refreshShowListView(data);
    });
}

function dzDetail(data){
    $.mobile.changePage($("#mydingzuo"),{transition:"flow"});
    $("#renshu2").text("人数:" + data.renshu);
    $("#xingming2").text("姓名:" + data.xingming);
    $("#shouji2").text("电话:" + data.shouji);
    $("#dateselect2").text("日期:" + data.todate);
    $("#shijian2").text("时间:" + data.shijian);
    $("#mendianselect2").text("门店:" + data.shopname);
    $("#beizhu2").text("说明:" + data.beizhu);

}

function dzjl() {
    showLoader("请稍后...");
    $.ajax({
        type: "GET",
        async: false,
        url: "__APP__/Client/dzjl",
        dataType: "jsonp",
        jsonp: "callback",
        contentType: "text/html; charset=utf-8",
        data: {
        },
        success: function (data) {
            hideLoader();
            if(!data) return;
            var objs = data;
            var html = "";
            for(var i=0;i<objs.length;i++){
                var obj = objs[i];
                var li = '<li><a href="javascript:dzxx(\''+obj.id+'\');">'+obj.ndate+'</a></li>';
                html+=li;
            }
            $("#dzjllist").html(html);
            $("#dzjllist").listview('refresh');
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            hideLoader();
        }
    });

}

function dzxx(id){
    showLoader("请稍后...");
    $.ajax({
        type: "GET",
        async: false,
        url: "__APP__/Client/getDzById",
        dataType: "jsonp",
        jsonp: "callback",
        contentType: "text/html; charset=utf-8",
        data: {
            id:id
        },
        success: function (data) {
            hideLoader();
            if(!data) return;
            dzDetail(data);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            hideLoader();
        }
    });
}
function fulshDateSelect() {
    var d = new Date().getTime();
    var td1 = d + 86400000;
    var td2 = td1 + 86400000;
    var td3 = td2 + 86400000;

    var d1 = new Date();
    d1.setTime(td1);
    var mon1 = parseInt(d1.getMonth() + 1);
    mon1 = mon1>9?mon1:('0'+mon1);
    var day1 = d1.getDate();
    day1 = day1>9?day1:('0'+day1);
    var rd1 = d1.getFullYear() + "-" + mon1 + "-" + day1;
    var d2 = new Date(td2);
    d2.setTime(td2);
    var mon2 = parseInt(d2.getMonth() + 1);
    mon2 = mon2>9?mon2:('0'+mon2);
    var day2 = d2.getDate();
    day2 = day2>9?day2:('0'+day2);
    var rd2 = d2.getFullYear() + "-" + mon2 + "-" + day2;
    var d3 = new Date(td3);
    d3.setTime(td3);
    var mon3 = parseInt(d3.getMonth() + 1);
    mon3 = mon3>9?mon3:('0'+mon3);
    var day3 = d3.getDate();
    day3 = day3>9?day3:('0'+day3);
    var rd3 = d3.getFullYear() + "-" + mon3 + "-" + day3;
    var html = "<option value=''>请选择</option>";
    html += "<option value='" + rd1 + "'>" + rd1 + "</option>";
    html += "<option value='" + rd2 + "'>" + rd2 + "</option>";
    html += "<option value='" + rd3 + "'>" + rd3 + "</option>";
    $("#dateselect").html(html);
}


/*function toAddPage(){
    $("#goodform")[0].reset();
    $("#rmyImage1").attr("src","");
    $("#action").val("add");
    $("#id").val("");
    changePage('fabupage');
    ajaxCallback("listType",{},function(data){

        $("#fcity").refreshShowSelectMenu(data,"选择种类","id","title");
    });
}*/

function toAddPage(){

    /*if(!latitude){
        showLoader("正在定位!");
        getMyLocation(function (){
            hideLoader();
            getAddressByGaode();
        })
    }else{*/
    //getAddressByGaode();
    //}
    $("#goodform")[0].reset();
    $("#eimgtx3").css("background-image", "url()");
    $("#action").val("add");
    $("#id").val("");
    $("#sid").val(userinfo.id);
    $("#shop").val(userinfo.username);
    $("#latitude").val(latitude);
    $("#longitude").val(longitude);
    $("#address").val(userinfo.address);
    changePage('fabupage');
    ajaxCallback("listType",{},function(data){

        $("#typeid").refreshShowSelectMenu(data,"选择分类","id","title");
    });
    fabulocation();
}

function getAddressByGaode(){
    $.get("http://restapi.amap.com/v3/geocode/regeo?output=json&location="+longitude+","+latitude+"&key=20ad717f0939c4e737e2ff57a450195d&radius=1000&extensions=base",function (data){
        var address = data.regeocode.formatted_address;
        $("#address").val(address);
    });
}

function toSearch(){
    changePage('searchpage');
}

function toEditPage(){
    changePage('fabupage');
    $("#action").val("edit");
    $("#id").val(focusobj.id);
    ajaxCallback("listType",{},function(data){
        $("#fcity").refreshShowSelectMenu(data,"选择种类","id","title");
    });

    $("#fcity").val(focusobj.typeid);
    $("#gname").val(focusobj.gname);
    $("#price").val(focusobj.price);
    $("#img").val(focusobj.img);
    $("#note").val(focusobj.note);
    $("#xiaoliang").val(focusobj.xiaoliang);
    $("#rmyImage1").attr("src",fileurl+focusobj.img);

}

function saveGood(){
    var fdata = serializeObject($("#goodform"));
    /*if(checkObjectValue(fdata)){
        showLoader("请填写完整信息!",true);
        return;
    }*/
    if(true){
        ajaxFormUploadFile("saveGood",$("#goodform"),function(r){
            //alert(r);
            hideLoader();
            if(r=="0"){
                showLoader("操作成功!",true);
                toMyGood();
            }else{
                showLoader("操作失败!",true);
            }

        });
    }else{
        if(fdata.address){
            getAddressByLatLng(fdata.address,function (r){
                if(r=="-1"){
                    showLoader("解析地址失败!",true);
                }else{
                    var geocode = r.geocodes;

                    if(geocode.length){
                        var latlng = geocode[0];
                        $("#latitude").val(latlng.location.getLat());
                        $("#longitude").val(latlng.location.getLng());
                        ajaxFormUploadFile("saveGood",$("#goodform"),function(r){
                            //alert(r);
                            hideLoader();
                            if(r=="0"){
                                showLoader("操作成功!",true);
                                toMyGood();
                            }else{
                                showLoader("操作失败请稍候再试!",true);
                            }

                        });
                    }
                }
            })
        }else{
            showLoader("请输入地址!",true);
        }
    }

    /*var fdata = serializeObject($("#goodform"));
     fdata.sid = focushop.id;
     fdata.shop = userinfo.username;
     fdata.ownid = userinfo.id;
     fdata.address = userinfo.address;

     uplaodImg(function(img){
     if(img){
     fdata.img = img;
     }

     ajaxCallback("saveGood",fdata,function(){
     showLoader("发布成功!",true);
     toGoods();
     });
     });*/
}


function delGood(){
    ajaxCallback("delGood",{id:focusobj.id},function(data){
        toGoods();
    });
}
var _billtimmer = null;
var _oldbillcount = localStorage['_oldbillcount']||0;
function startBillListLoop(){
    clearInterval(_billtimmer);
    _billtimmer = setInterval(function (){
        ajaxCallback("mybills",{sid:userinfo.sid},function(data){
            if(data.length!=_oldbillcount){
                _oldbillcount = data.length;
                localStorage['_oldbillcount'] = _oldbillcount;
                billlist = data;
                $("#bills").refreshShowListView(data);
                myObj.showIntentActivityNotify("外卖通知","您有新的外卖订单请及时处理!",100);
            }
        },true);
    },5000);
}


function scanErcode(){
    scanCode(function (id){
        id = parseInt(id);
        ajaxCallback("getGood",{id:id},function(data){

            if(data){
                toGoodDetail(data);
            }else{
                showLoader("没有找到约玩信息!",true);
            }
        });
    });
}