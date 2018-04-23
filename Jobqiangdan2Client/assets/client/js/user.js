/**
 * Created by ideabobo on 14-6-28.
 */

/***************************************用户模块*******************************************/
$(function(){

    getMyLocation(function (){
        hideLoader();
        var uinfo = localStorage['userinfo'];
        if(uinfo && $.trim(uinfo)!=""){
            uinfo  = JSON.parse(uinfo);
            $("#lusername").val(uinfo.username);
            $("#lpasswd").val(uinfo.passwd);
            uinfo.remember = "1";
            if(uinfo.roletype=="2"){
                login(uinfo);
            }

        }
    });
});
var userinfo = null;
function login(uinfo){
    var fdata = uinfo || serializeObject($("#loginform"));
    if($.trim(fdata.username)=="" || $.trim(fdata.passwd) == ""){
        showLoader("请输入用户名或密码！",true);
        return;
    }
    ajaxCallback("login",fdata,function(data){
       if(data.info && data.info=="fail"){
           showLoader("用户名或密码错误",true);
           changePage("loginpage");
       }else{
           showLoader("登录成功!",true);
           userinfo = data;
           if(fdata.remember == "1"){
                localStorage["userinfo"] = JSON.stringify(data);
           }else{
               localStorage["userinfo"] = "";
           }
           toMain();
           //toGoods();
           /*if(userinfo.roletype==2){
               toMain();
           }else{
               ajaxCallback("getShop",{id:userinfo.sid},function(data){
                   focushop = data;
                   toMyBill();
                   startBillListLoop();
               });

           }*/

       }
    });
}

function logout(){
    userinfo = null;
    localStorage['userinfo'] = "";
    toLogin();
}

function toRegister(){
    changePage("registerpage");
    ajaxCallback("listShop",{},function(data){
        $("#shequ").refreshShowSelectMenu(data,"选择地区","id","sname");
    });
}

function toLogin(){
    $($(':input','#loginform').get(1)).val("");
    changePage("loginpage");
}

function register(){

    var fdata = serializeObject($("#registerform"));
    if($.trim(fdata.username) == "" || $.trim(fdata.passwd) == "" || $.trim(fdata.tel) == ""){
        showLoader("请填写完整信息!",true);
        return;
    }
    if(fdata.tel.length<11){
        showLoader("电话号码格式不对!",true);
        return;
    }
    if(fdata.passwd != fdata.passwd2){
        showLoader("两次密码不一致!",true);
        return;
    }
    /*if(uploadFileUrl){
     uplaodImg(function(r){
     fdata.img = r;
     commitRegiesterInfo(fdata);
     });
     }else{*/
    //commitRegiesterInfo(fdata);
    //}
    ajaxCallback("checkUser",fdata,function(d){
        if(d.info == "success"){
            ajaxFormUploadFile("register",$("#registerform"),function(r){
                //alert(r);
                hideLoader();
                if(r=="0"){
                    showLoader("注册成功!",true);
                    userinfo = fdata;
                    userinfo.id = r.info;
                    addAddress();
                    toLogin();
                }else{
                    showLoader("注册失败请稍候再试!",true);
                }

            });
        }else{
            showLoader("用户名已存在!",true);
        }
    });


}

function commitRegiesterInfo(fdata){

}

function myinfo(){
    if(!userinfo){
        changePage("loginpage");
        return;
    }
    changePage("userinfopage");
    $("#vusername").text(userinfo.username);
    $("#vtel").val(userinfo.tel);
    $("#vqq").val(userinfo.qq);
    $("#vwechat").val(userinfo.wechat);
    $("#vsex").val(userinfo.sex);
    $("#vbirth").val(userinfo.birth);
    $("#vemail").val(userinfo.email);
    $("#vaddress").val(userinfo.address);
    $("#uid").val(userinfo.id);
    $("#uimg").val(userinfo.img);
    $("#uusername").val(userinfo.username);
    $("#upasswd").val(userinfo.passwd);
    $("#uroletype").val(userinfo.roletype);
    $("#eimgtx2").css("background-image", "url("+fileurl+userinfo.img+")");
}

function editUserInfo(){
    $("#editbutton").show();
}

function updateUserInfo(){
    //var fdata = serializeObject($("#userform"));
    //fdata.id = userinfo.id;
    /*if(uploadFileUrl){
     uplaodImg(function(r){
     fdata.img = r;
     commitUpdateUserInfo(fdata);
     });
     }else{*/
    //commitUpdateUserInfo(fdata);
    //}
    ajaxFormUploadFile("updateUser",$("#userform"),function(r){
        //alert(r);
        hideLoader();
        if(r=="0"){
            showLoader("操作成功!",true);
        }else{
            showLoader("注册失败请稍候再试!",true);
        }

    });
}

function commitUpdateUserInfo(fdata){
    ajaxCallback("updateUser",fdata,function(user){
        if(user.username){
            showLoader("保存成功!",true);
            userinfo = user;
            uploadFileUrl = null;
        }else{
            showLoader("保存失败,请稍候再试!",true);
        }
    });
}

function toChangePasswd(){
    $("#pusername").text("用户名:"+userinfo.username);
    changePage("passwdpage");
}

function changePasswd(){
    var fdata = serializeObject($("#passwdform"));
    fdata.id = userinfo.id;
    if(fdata.oldpasswd != userinfo.passwd){
        showLoader("原始密码错误！",true);
        return;
    }
    if($.trim(fdata.passwd) == ""){
        showLoader("密码不能为空！",true);
        return;
    }
    if(fdata.passwd != fdata.passwd2){
        showLoader("两次密码不一致！",true);
        return;
    }
    ajaxCallback("changePasswd",fdata,function(r){
        if(r.info == "success"){
            showLoader("保存成功!",true);
            setTimeout(function(){
                toLogin();
            },2000);
        }else{
            showLoader("保存失败,请稍候再试!",true);
        }
    });
}

function toMore(){
    changePage('morepage');
}

/***************************************用户模块*******************************************/




