var hashaes = $.import("./libs/hashaes.xsjslib");
var extensions = $.import("./libs/extensions.xsjslib");
var Helper = $.import("./libs/Helper.xsjslib");
var config = $.import("config.xsjslib");


function fnHandleGet() {
    try {
    	var cn = $.db.getConnection();
    	var cs = cn.prepareCall('SET SCHEMA "' + config.Database + '"');
    	cs.execute();
    
    	var cri = "select row_number() over(order by available_supply * price_usd desc) as LIN";
    	cri += "        , Currency";
    	cri += "        , Name";
    	cri += "        , Price_USD, Price_eur, to_nvarchar(Price_btc) as Price_btc";
    	cri += "        , Available_supply";
    	cri += "        , market_cap_usd, market_cap_eur";
    	cri += "        , volume_usd_24h, volume_eur_24h";
    	cri += "        , percent_change_24h ";
    	cri += "        , percent_change_1h ";
    	cri += "        , percent_change_7d ";
    	cri += "     from Currencys WHERE LAST_UPDATE>=add_seconds(current_timestamp,-8000)";
    	cri += "    order by available_supply * price_btc desc";
    	cs = cn.prepareCall(cri);
    	cs.execute();
    	var rs = cs.getResultSet();
    	var ds = Helper.rsToArray(rs);
    	return {data:ds};
    } catch (ex) { 
    	return {data:[{Name:ex.message}]};
    }
}
try {
	switch ($.request.method) {
		//Handle your GET calls here
		case $.net.http.GET:
    		$.response.contentType = 'application/json; charset=UTF-8';
			$.response.setBody(JSON.stringify(fnHandleGet()));
    		$.response.status = $.net.http.OK; 
			break;
			//Handle your PUT calls here
		case $.net.http.PUT:
    		$.response.contentType = 'application/json; charset=UTF-8';
			$.response.setBody(JSON.stringify(fnHandleGet()));
    		$.response.status = $.net.http.OK; 
			break;
		case $.net.http.PATCH:
    		$.response.contentType = 'application/json; charset=UTF-8';
			$.response.setBody(JSON.stringify(fnHandleGet()));
    		$.response.status = $.net.http.OK; 
			break;
		case $.net.http.POST: 
    		$.response.contentType = 'application/json; charset=UTF-8';
    		$.response.setBody(JSON.stringify(fnHandleGet()));
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