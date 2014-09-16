var googleLink = new RegExp('google');
var ss = document.getElementsByTagName('script');

for(i=0; i<ss.length; i++) {
    var script = ss[i];
    if(script.src && script.src.match(googleLink)) {
        script.parentNode.removeChild(script);
        //script.src="http://mat1.gtimg.com/www/asset/lib/jquery/jquery/jquery-1.11.1.min.js";
    }
}
console.log(ss.length);
