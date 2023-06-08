//初步检验用户名和密码是否有效
//建立cookie
function passArgs(){
    window.location.replace("https://ysitech.github.io/TonghaiClass15th/main.html");
}

document.getElementById("loginbutton").onclick=function(){
    //获取用户名和密码
    Name=document.getElementById("Name").innerHTML;
    username=document.getElementById("username").value;
    password=document.getElementById("password").value;
    //开始检验
    if(username==""||password==""){
        alert("用户名或密码不能为空!");
    }else{
        var reg=/[A-Za-z0-9_]/;
        if(!reg.test(password)){
            alert("密码只能由字母、数字、下划线组成!");
        }else{
            if(password.length<6||password.length>20){
                alert("密码长度在六位到二十位之间!");
            }else{
                if(username=="scpx15"&&password=="admin0000"){
                    //传输参数到主页
                    passArgs();
                }else{
                    alert("登录成功！");
                }
                if(username=="scpx2"&&password=="admin0000"){
                    //传输参数到主页
                    passArgs();
                }else{
                    alert("登录成功！");
                }

                if(username=="scpx3"&&password=="admin0000"){
                    //传输参数到主页
                    passArgs();
                }else{
                    alert("登录成功！");
                }
                if(username=="scpx4"&&password=="admin0000"){
                    //传输参数到主页
                    passArgs();
                }else{
                    alert("登录成功！");
                }
 if(username=="scpx1"&&password=="admin0000"){
                    //传输参数到主页
                    passArgs();
                }else{
                    alert("登陆成功！");
                }
            }
        }
    }
}

//检测用户名
//创建名单
var users=new Array("补位","scpx1","scpx2","scpx3","scpx4","scpx5","scpx6","scpx7","scpx8","scpx9","scpx10","scpx11","scpx12","scpx13","scpx14","scpx15","scpx16","scpx17","scpx18","scpx19","scpx20","scpx21","scpx22","scpx23","scpx24","scpx25","scpx26","scpx27","scpx28","scpx29","scpx30","scpx31","scpx32","scpx33","scpx34","scpx35","scpx36","scpx37","scpx38","scpx39","scpx40","scpx41","scpx42","scpx43","scpx44","scpx45","scpx46","scpx47","scpx48","1685805118","scpx50","scpx51","1773733422");
function nameChange(reg){
    if(reg==1){
        Name=document.getElementById("Name");
        Name.style.height=20+"px";
        Name.style.marginTop=0+"px";
    }else{
        Name=document.getElementById("Name");
        Name.style.height=0+"px";
        Name.style.marginTop=20+"px";
    }
}
function checkUsername(reg){
    if(reg==0){
        return;
    }
    //每0.2s检测一次
    setInterval(function(){
        username=document.getElementById("username").value;
        switch(username){
            case users[1]:
                Name.innerHTML="王刚";nameChange(1);break;
 case users[2]:
                Name.innerHTML="唐汶蝶";nameChange(1);break;
 case users[3]:
                Name.innerHTML="王宇杭";nameChange(1);break;
 case users[4]:
                Name.innerHTML="土拨鼠";nameChange(1);break;
 case users[5]:
                Name.innerHTML="刘鑫雨";nameChange(1);break;
 case users[6]:
                Name.innerHTML="陈陈";nameChange(1);break;
 case users[7]:
                Name.innerHTML="杨柳";nameChange(1);break;
 case users[8]:
                Name.innerHTML="谢婉莹";nameChange(1);break;
 case users[9]:
                Name.innerHTML="李鑫雨";nameChange(1);break;
 case users[10]:
                Name.innerHTML="姚海涛";nameChange(1);break;
 case users[11]:
                Name.innerHTML="青和平";nameChange(1);break;
 case users[12]:
                Name.innerHTML="谢子曦";nameChange(1);break;
            case users[42]:
                Name.innerHTML="王瑜";nameChange(1);break;
            case users[13]:
                Name.innerHTML="姚云至";nameChange(1);break;
            case users[14]:
                Name.innerHTML="周云";nameChange(1);break;
            case users[15]:
                Name.innerHTML="谢欣成";nameChange(1);break;
            case users[16]:
                Name.innerHTML="肖颖";nameChange(1);break;
            case users[25]:
                Name.innerHTML="王锶璐";nameChange(1);break;
            case users[30]:
                Name.innerHTML="王浩宇";nameChange(1);break;
            case users[32]:
                Name.innerHTML="王鹏";nameChange(1);break;
            case users[36]:
                Name.innerHTML="巫静";nameChange(1);break;
            case users[37]:
                Name.innerHTML="吴可馨";nameChange(1);break;
            case users[38]:
                Name.innerHTML="吴薇";nameChange(1);break;
            case users[39]:
                Name.innerHTML="吴雨涵";nameChange(1);break;
            case users[40]:
                Name.innerHTML="王宇杭";nameChange(1);break;
            case users[41]:
                Name.innerHTML="杨美玲";nameChange(1);break;
            case users[42]:
                Name.innerHTML="杨森";nameChange(1);break;
            case users[43]:
                Name.innerHTML="谢欣成";nameChange(1);break;
            default:nameChange(0);
        }
    },200)
}

