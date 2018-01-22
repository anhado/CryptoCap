var hashaes = $.import("./libs/hashaes.xsjslib");
var extensions = $.import("./libs/extensions.xsjslib");
var Helper = $.import("./libs/Helper.xsjslib");
var config = $.import("config.xsjslib");

function getApis(body){ 
	try {
		var cn = $.db.getConnection();
		var cs = cn.prepareCall('SET SCHEMA "' + config.Database + '"');
		cs.execute();

		var cri = "select * from Integration";
		cs = cn.prepareCall(cri);
		cs.execute();
		var rs = cs.getResultSet();
		var ds = Helper.rsToArray(rs);
		
		$.response.contentType = "application/json";
		$.response.setBody(JSON.stringify({
			"success": true,
			"Msg": "",
			"Data":ds
		})); 
		
	} catch (ex) {
		cn.rollback();
		
		$.response.contentType = "application/json";
		$.response.setBody(JSON.stringify({
			"success": false,
			"Msg": ex.message
		}));
		$.response.status = 400; 
	}
} 
function saveApi(body) {
	try {
		var cn = $.db.getConnection();
		var cs = cn.prepareCall('SET SCHEMA "' + config.Database + '"');
		cs.execute();

		var cri = "select * from INTEGRATION where id='" + body.ID + "'";
		cs = cn.prepareCall(cri);
		cs.execute();
		var rs = cs.getResultSet();
		var ds = Helper.rsToArray(rs);
		if (ds.length > 0) {
		    cri = "update " + config.Database + ".INTEGRATION set APINAME = ?";
		    cri += "                    , URL = ?";
		    cri += "                    , URLCURRENCY = ?";
		    cri += "                    , URLMARKET = ?";
		    cri += "                    , URLORDERS = ?";
		    cri += " where id=" + body.ID;
			cs = cn.prepareStatement(cri);
			cs.setString(1, body.APINAME);
			cs.setString(2, body.URL);
			cs.setString(3, body.URLCURRENCY);
			cs.setString(4, body.URLMARKET);
			cs.setString(5, body.URLORDERS);
			cs.execute(); 
			cn.commit();
		} else {
			//var decPassword = hashaes.GibberishAES.dec(body.PASSWORD, config.tokenSecretHash);
			cri = "insert into " + config.Database + ".INTEGRATION(APINAME,URL,URLCURRENCY,URLMARKET,URLORDERS) values(?,?,?,?,?)"; 
			cs = cn.prepareStatement(cri);
			cs.setString(1, body.APINAME);
			cs.setString(2, body.URL);
			cs.setString(3, body.URLCURRENCY);
			cs.setString(4, body.URLMARKET);
			cs.setString(5, body.URLORDERS);
			cs.execute(); 
			cn.commit();
		} 
		$.response.contentType = "application/json";
		$.response.setBody(JSON.stringify({
			"success": true,
			"Msg": ""
		}));
		$.response.status = 200;
		
	} catch (ex) {
		cn.rollback();
		$.response.contentType = "application/json";
		$.response.setBody(JSON.stringify({
			"success": false,
			"Msg": ex.message
		}));
		$.response.status = 400; 
	}
}

var cmd = $.request.parameters.get('cmd');
var content = $.request.body.asString();
var nbody = JSON.parse(content);
 
switch (cmd) {
	case "getApis": 
	    getApis(nbody);
		$.response.status = $.net.http.OK;  
		break; 
	case "SaveApi": 
		saveApi(nbody);
		break; 
	default:
		$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
		$.response.setBody('Invalid Command: ' + cmd);
}