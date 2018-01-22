var BASE = {};

BASE._App = null;
var _imageProfile;
BASE.oData = { 
		userimg: 'sap-icon://person-placeholder',
		showmenu: false,
		showhome: false,
		appso: [],
		maxapphist: 3
};
BASE.oModelGlobal = new sap.ui.model.json.JSONModel();

sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"sap/ui/model/json/JSONModel"
], function(Controller, MessageBox) {
	"use strict";

	return Controller.extend("CryptoCap.admin.BASE.controller.App", {
   		onInit : function(oEvent) {
   			this.oRoot = this.getView().byId("idAppControlBASE");
   			BASE._App = this.oRoot;
   			var that = this;
   			this.oRoot.getMasterPages().forEach(function(oPage) {
   				oPage.getController().navigation = that;
   			});
   			this.getView().setModel(BASE.oModelGlobal);
   			
   			
   			//ValidateToken();
   			var i18nModel = new sap.ui.model.resource.ResourceModel({
                bundleName: "admin.BASE.i18n.i18n"
             });
             this.getView().setModel(i18nModel, "i18n");
    		
   			
   			
   			//colocar utilizador logado e empresa no header 
   			BASE.oData.nameuser =  $.cookie("DisplayName");
    		BASE.oModelGlobal.setData(BASE.oData);
    		
    		
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
