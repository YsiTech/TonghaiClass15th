var head = document.getElementById('head');

window.onscroll = function() {
    var a = document.documentElement.scrollTop || document.body.scrollTop;
    var b = document.documentElement.clientHeight || document.body.clientHeight;
    var c = document.documentElement.scrollHeight || document.body.scrollHeight;
    if(a > 0){
        head.className = "head-active";
    }else if(a === 0){
        head.className = "head";
    }
}



// var waifuScript = document.createElement("script");
// waifuScript.type = "text/javascript";
// waifuScript.src = "live2d-widget-master/autoload.js";
// document.body.appendChild(waifuScript);