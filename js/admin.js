function LoadApis(){ 
    window.open('./APP001/index.html', "popupWindow", "width=800, height=600, scrollbars=yes");
}

function LoadMarkets(){ 
    window.open('./BASE/index.html', "popupWindow", "width=800, height=600, scrollbars=yes");
}

$(document).ready(function() {
	if ($.cookie("Username") !== undefined) {
        if(GibberishAES.dec($.cookie("SecureToken"), "#Cr%pT&aC$") !== "1"){
    	    $(location).attr('href', '../index.html');
        }
	}else{
        $(location).attr('href', '../index.html');
	}
});