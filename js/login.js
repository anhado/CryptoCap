function onPressLogout(){
	$.removeCookie("Token", {
		path: '/'
	});
	$.removeCookie("Username", {
		path: '/'
	});
	$.removeCookie("DisplayName", {
		path: '/'
	});
	$.removeCookie("SecureToken", {
		path: '/'
	});
	$(location).attr('href', '.');
}

function validate(event) {
    event.preventDefault();
    if (!document.getElementById('txtUser').value) {
      alert("Please enter your name.");
    } else {
      grecaptcha.execute();
    }
} 

function onPressRegister() {
	var oBody = {
		USERNAME: GibberishAES.enc(document.getElementById('txtUser').value, "#Cr%pT&aC$"),
		PASSWORD: GibberishAES.enc(document.getElementById('txtPwd').value, "#Cr%pT&aC$"),
		NAME: GibberishAES.enc(document.getElementById('txtName').value, "#Cr%pT&aC$"),
		EMAIL: GibberishAES.enc(document.getElementById('txtEmail').value, "#Cr%pT&aC$")
	};

	var date = new Date();
	var minutes = 30;
	date.setTime(date.getTime() + (minutes * 60 * 1000));

	$.ajax({
		type: "PUT",
		url: Get_Path_Login(),
		processData: false,
		contentType: 'application/json;charset=UTF-8',
		data: JSON.stringify(oBody),
		success: function(r) {
			if (r.success === true) { 
				$.removeCookie("Token", {
					path: '/'
				});
				$.removeCookie("Username", {
					path: '/'
				});
				$.removeCookie("DisplayName", {
					path: '/'
				});
				$.removeCookie("SecureToken", {
					path: '/'
				});
				$(location).attr('href', 'login.html');
			} else {
				$.removeCookie("Token", {
					path: '/'
				});
				$.removeCookie("Username", {
					path: '/'
				});
				$.removeCookie("DisplayName", {
					path: '/'
				});
				$.removeCookie("SecureToken", {
					path: '/'
				});
				alert(r.Msg);
			}
		},
		error: function(r) {
			$.removeCookie("Token", {
				path: '/'
			});
			$.removeCookie("Username", {
				path: '/'
			});
			$.removeCookie("DisplayName", {
				path: '/'
			});
			$.removeCookie("SecureToken", {
				path: '/'
			});
			alert(r.responseText);
		}
	});
}

function onPressLogin() {
	var oBody = {
		USERNAME: GibberishAES.enc(document.getElementById('txtUser').value, "#Cr%pT&aC$"),
		PASSWORD: GibberishAES.enc(document.getElementById('txtPwd').value, "#Cr%pT&aC$")
	};

	var date = new Date();
	var minutes = 30;
	date.setTime(date.getTime() + (minutes * 60 * 1000));

	$.ajax({
		type: "POST",
		url: Get_Path_Login(),
		processData: false,
		contentType: 'application/json;charset=UTF-8',
		data: JSON.stringify(oBody),
		success: function(r) {
			if (r.success === true) {
				//criação dos cookies que vão ser utilizados na sessão
				$.cookie("Token", r.Token, {
					path: '/'
				});
				$.cookie("Username", r.Data.USERNAME, {
					path: '/'
				});
				$.cookie("DisplayName", r.Data.NAME, {
					path: '/'
				});
				$.cookie("SecureToken",  GibberishAES.enc(r.Data.ADMIN, "#Cr%pT&aC$"), {
					path: '/'
				});
				$(location).attr('href', '.');
			} else {
				$.removeCookie("Token", {
					path: '/'
				});
				$.removeCookie("Username", {
					path: '/'
				});
				$.removeCookie("DisplayName", {
					path: '/'
				});
				$.removeCookie("SecureToken", {
					path: '/'
				});
				alert(r.Msg);
			}
		},
		error: function(r) {
			$.removeCookie("Token", {
				path: '/'
			});
			$.removeCookie("Username", {
				path: '/'
			});
			$.removeCookie("DisplayName", {
				path: '/'
			});
			$.removeCookie("SecureToken", {
				path: '/'
			});
			alert(r.responseText);
		}
	});
}
 
function getUrlVars()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

$(document).ready(function() {
    
    
	$("#ext_menu").append("<div class='langBar'><div class='btUSD'>USD</div><div class='btEUR'>EUR</div></div>");
	//$("body").append("<div class='langBar'><div class='btLang'>Pt</div><div class='btLang'>En</div></div>");
	
	
	$(".btUSD").click(function() {
	    $.cookie("Currency", "USD", {
					path: '/'
				});
				 
		window.location.reload();
	});
	$(".btEUR").click(function() {
	    $.cookie("Currency", "EUR", {
					path: '/'
				});
		window.location.reload();
	});
	
	if ($.cookie("Username") !== undefined) {
	    $("#btRegister").hide();
	    $("#btLogin").hide(); 
	    $("#btUserArea").show();
	    $("#btLogout").show(); 
	    $("#username").html($.cookie("DisplayName"));
	    if(GibberishAES.dec($.cookie("SecureToken"), "#Cr%pT&aC$") === "1"){
	        $("#btAdmin").show(); 
	    }
	    else{ 
	        $("#btAdmin").hide(); 
	    }
	}
	else{
	    $("#btRegister").show();
	    $("#btLogin").show(); 
	    $("#btUserArea").hide(); 
	    $("#btLogout").hide();   
	    $("#btAdmin").hide(); 
	}
    
    var element = document.getElementById('submit');
    if(element){
        element.onclick = validate;
    }
    
});