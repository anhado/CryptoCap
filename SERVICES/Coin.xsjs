var hashaes = $.import("./libs/hashaes.xsjslib");
var extensions = $.import("./libs/extensions.xsjslib");
var Helper = $.import("./libs/Helper.xsjslib");
var config = $.import("config.xsjslib");
$.response.contentType = "application/json";
$.response.status = 200;
$.response.contentType = "application/json";

//Implementation of GET call
function fnHandleGet(body) { 
	try {
		var cn = $.db.getConnection();
		var cs = cn.prepareCall('SET SCHEMA "' + config.Database + '"');
		cs.execute();
		var cri = "select * from currencys where currency='" + body.coin + "'";
		cs = cn.prepareCall(cri);
		cs.execute();
		var rs = cs.getResultSet();
		var ds = Helper.rsToArray(rs);
		if (ds.length > 0) {
			var toRet = {
				success: true,
				data: ds[0]
			};
            return toRet;
		} else {

			return {
				"success": false,
				"Msg": "Not Found"
			};
		}
	} catch (ex) {
		cn.rollback();
		return {
			"success": false,
			"Msg": ex.message
		};
	}
}

try {
	var content = $.request.body.asString();
	var vbody = JSON.parse(content);
	switch ($.request.method) {
		//Handle your GET calls here
		case $.net.http.POST:
			$.response.setBody(JSON.stringify(fnHandleGet(vbody)));
			break;
		default:
			break;
	}
} catch (err) {
	$.response.setBody("Failed to execute action: " + err.toString());
}