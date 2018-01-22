function Get_Path_Login () {
	var sPath = "http://192.168.1.242:8090/CryptoCap/SERVICES/Users.xsjs";
	return sPath;
}
function Get_Path_Coins () {
	var sPath = "http://192.168.1.242:8090/CryptoCap/SERVICES/Coins.xsjs";
	return sPath;
}
function Get_Path_Integration () {
	var sPath = "http://192.168.1.242:8090/CryptoCap/SERVICES/Integration.xsjs";
	return sPath;
}
function Get_Path_Currencys() {
	var sPath = "http://192.168.1.242:8090/CryptoCap/SERVICES/Currencys.xsjs";
	return sPath;
}
function Get_Path_Coin() {
	var sPath = "http://192.168.1.242:8090/CryptoCap/SERVICES/Coin.xsjs";
	return sPath;
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
