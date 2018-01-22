var hashaes = $.import("./libs/hashaes.xsjslib");
var extensions = $.import("./libs/extensions.xsjslib");
var Helper = $.import("./libs/Helper.xsjslib");
var config = $.import("config.xsjslib");
 
//Implementation of GET call
function fnHandleGet(body) {
	return {
		"myResult": "success"
	};
}

//Implementation of POST call
function fnHandlePost(body) {
	try {
		var cn = $.db.getConnection();
		var cs = cn.prepareCall('SET SCHEMA "' + config.Database + '"');
		cs.execute();

		var cri = "select * from users where username='" + hashaes.GibberishAES.dec(body.USERNAME, config.tokenSecretHash) + "'";
		cs = cn.prepareCall(cri);
		cs.execute();
		var rs = cs.getResultSet();
		var ds = Helper.rsToArray(rs);
		if (ds.length > 0) {
		    if(hashaes.GibberishAES.dec(ds[0].PASSWORD, config.tokenSecretHash) === hashaes.GibberishAES.dec(body.PASSWORD, config.tokenSecretHash)){
    			return {
    				"success": true,
    				"Msg": "",
    				"Data" : ds[0]
    			};
    		} else {
    			return {
    				"success": false,
    				"Msg": "The Username or Password incorrect!"
    			};
    		}
		} else {
			return {
				"success": false,
    			"Msg": "The Username or Password incorrect!"
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
//Implementation of PATCH call
function fnHandlePatch(body) {
	return {
		"myResult": "success"
	};
}

//Implementation of PUT call
function fnHandlePut(body) {
	try {
		var cn = $.db.getConnection();
		var cs = cn.prepareCall('SET SCHEMA "' + config.Database + '"');
		cs.execute();

		var cri = "select * from users where username='" + hashaes.GibberishAES.dec(body.USERNAME, config.tokenSecretHash) + "'";
		cs = cn.prepareCall(cri);
		cs.execute();
		var rs = cs.getResultSet();
		var ds = Helper.rsToArray(rs);
		if (ds.length > 0) {
			return {
				"success": false,
				"Msg": "The Username already exists"
			};
		} else {
			//var decPassword = hashaes.GibberishAES.dec(body.PASSWORD, config.tokenSecretHash);
			cri = "insert into USERS(username,password,name,email,admin) values(";
			cri += "'" + hashaes.GibberishAES.dec(body.USERNAME, config.tokenSecretHash) + "',";
			cri += "'" + body.PASSWORD + "',";
			cri += "'" + hashaes.GibberishAES.dec(body.NAME, config.tokenSecretHash) + "',";
			cri += "'" + hashaes.GibberishAES.dec(body.EMAIL, config.tokenSecretHash) + "',";
			cri += "0";
			cri += ")"; 
			cs = cn.prepareStatement(cri);
			cs.execute(); 
			cn.commit();
		}
		return {
			"success": true,
			"Msg": ""
		};
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
		case $.net.http.GET:
    		$.response.contentType = 'application/json; charset=UTF-8';
			$.response.setBody(JSON.stringify(fnHandleGet(vbody)));
    		$.response.status = $.net.http.OK; 
			break;
			//Handle your PUT calls here
		case $.net.http.PUT:
    		$.response.contentType = 'application/json; charset=UTF-8';
			$.response.setBody(JSON.stringify(fnHandlePut(vbody)));
    		$.response.status = $.net.http.OK; 
			break;
		case $.net.http.PATCH:
    		$.response.contentType = 'application/json; charset=UTF-8';
			$.response.setBody(JSON.stringify(fnHandlePatch(vbody)));
    		$.response.status = $.net.http.OK; 
			break;
		case $.net.http.POST: 
    		$.response.contentType = 'application/json; charset=UTF-8';
    		$.response.setBody(JSON.stringify(fnHandlePost(vbody)));
    		$.response.status = $.net.http.OK; 
			break;
		default:
			break;
	}
} catch (err) {
	
		$.response.contentType = 'application/json; charset=UTF-8';
		$.response.setBody(JSON.stringify({
			error: err.message
		}));
		$.response.status = 400;
}