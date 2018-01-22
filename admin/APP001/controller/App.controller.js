var APP001 = {};

APP001._App = null;
var _imageProfile;
APP001.oData = { 
		userimg: 'sap-icon://person-placeholder',
		showmenu: false,
		showhome: false,
		appso: [],
		maxapphist: 3
};
APP001.oModelGlobal = new sap.ui.model.json.JSONModel();

sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"sap/ui/model/json/JSONModel", 
], function(Controller, MessageBox) {
	"use strict";

	return Controller.extend("CryptoCap.admin.APP001.controller.App", {
   		onInit : function(oEvent) {
   		    if($.cookie("SecureToken")===undefined){
        	    $(location).attr('href', '../../index.html');
   		    }
            if(GibberishAES.dec($.cookie("SecureToken"), "#Cr%pT&aC$") !== "1"){
        	    $(location).attr('href', '../../index.html');
            }
   			this.oRoot = this.getView().byId("idAppControlAPP001");
   			APP001._App = this.oRoot;
   			var that = this;
   			this.oRoot.getMasterPages().forEach(function(oPage) {
   				oPage.getController().navigation = that;
   			});
   			this.getView().setModel(APP001.oModelGlobal);
   			
   			
   			//ValidateToken();
   			var i18nModel = new sap.ui.model.resource.ResourceModel({
                bundleName: "CryptoCap.admin.APP001.i18n.i18n"
             });
             this.getView().setModel(i18nModel, "i18n");
    		
   			
   			
   			//colocar utilizador logado e empresa no header 
   			APP001.oData.nameuser =  $.cookie("DisplayName");
    		APP001.oModelGlobal.setData(APP001.oData);
    		
    		
   		},
   		onAfterRendering : function() {
   			
			
			
		 },
   		navTo : function(sPageId, oContext) {
   			this.oRoot.to(sPageId);
   			if (oContext) {
   				this.oRoot.getPage(sPageId).setBindingContext(oContext);
   			}
   		},

   		navBack : function() {
   			this.oRoot.back();
   		}
   		
   	});

});
