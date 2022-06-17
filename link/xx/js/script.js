function calculateDesktopOffset(length) {
  return '-' + (length / 2) * Math.tan(15 * Math.PI / 180) + 'px';
}
function makeOvalOverlay() {
  var section01 = document.getElementById("section01");
  var bannerText = section01.getElementsByClassName('bannerText')[0];
  var bannerImage = section01.getElementsByClassName('bannerImage')[0];
  var oval = section01.getElementsByClassName('oval')[0];
  var $height = bannerText.clientHeight;
  var $width = bannerText.clientWidth;
  
  if (window.innerWidth < 992) {
    bannerImage.style.height = $width + 'px';
    oval.style.width = $width * 2.87 + 'px';        // oval overlay needed to be 2.87x the width
    oval.style.height = $width * 2.87 + 'px';       // of the content, per design
    oval.style.right = '-' + $width * 0.76 + 'px';  // these are magic numbers, because I
    oval.style.top = '-' + $width * 0.2 + 'px';     // gave up trying to figure out the trig
  } else {
    oval.style.width = $height * 2 + 'px';  // oval overlay need to be 2x the height
    oval.style.height = $height * 2 + 'px'  // of the content, per design
    oval.style.top = "-50%"; 
    oval.style.right = calculateDesktopOffset($height); 
    bannerImage.style.height = 'auto';
  }
}

makeOvalOverlay();
window.onresize = function() {
  makeOvalOverlay()
};