var hashaes = $.import("./libs/hashaes.xsjslib");
var extensions = $.import("./libs/extensions.xsjslib");
var Helper = $.import("./libs/Helper.xsjslib");$.response.contentType = "application/json";

$.response.status = 200;
$.response.contentType = "text/plain";

//Implementation of GET call
function fnHandleGet() {
    return {"myResult":"success"};
}

//Implementation of PUT call
function fnHandlePut() {
    return {"myStatus":"success"};
}

try {
    switch ( $.request.method ) {
        //Handle your GET calls here
        case $.net.http.GET:
            $.response.setBody(JSON.stringify(fnHandleGet()));
            break;
        //Handle your PUT calls here
        case $.net.http.PUT:
            $.response.setBody(JSON.stringify(fnHandlePut()));
            break;            
        default:
            break;
    }
} catch (err) {
    $.response.setBody("Failed to execute action: " + err.toString());
}