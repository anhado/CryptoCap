sap.ui.define([
	"sap/ui/core/mvc/Controller",
	'sap/ui/model/Filter',
	'sap/m/Dialog',
	"sap/ui/model/json/JSONModel",
	'sap/m/MessageToast',
	'sap/m/MessageBox',
	"CryptoCap/admin/BASE/model/formatter"
], function(Controller, Filter, Dialog, JSONModel, MessageToast, MessageBox, formatter) {
	"use strict";
	return Controller.extend("CryptoCap.admin.BASE.controller.Detail", {
		formatter : formatter,
		/**
		 * Função que retorna o router da aplicação
		 */
		getRouter: function() {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},
		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf admin.BASE.view.Detail
		 */
		onInit: function() {
			this.getView().setModel(BASE.oModelGlobal);
			//this.getRouter().getRoute("OrdemProducao").attachPatternMatched(this._onObjectMatched, this);
		},
		
		
		/*=======================================================================*/
		/* INICIO: Metodos Internos                                              */
		/*=======================================================================*/
		/**
		 * Metodo despertado quando a rota é chamada
		 * Chama o serviço para recuperar a lista de utilizadores e coloca como visivel o caminho que vem da master detail
		 * 
		 */
		_onObjectMatched : function (oEvent){
			/*
			getDetailsMethod({
				"database":$.cookie("Database"),
				"userid":$.cookie("User"),
				"fiori_token":$.cookie("Token")
			}, function(r){
				if(r.length > 0){ 
					console.log(r);
					var _data = BASE.oModelGlobal.getProperty("/items/0");
					if (_data !== undefined ) {
						BASE.oModelGlobal.setData(BASE.oData);
					}
				}

			}, function (r) {
				oBundle = _self.getView().getModel("i18n").getResourceBundle();
				_self._mensagemErro(oBundle.getText("messageBoxError") + r.responseText);
			});*/
		},
		/**
		 * Metodo que retorna uma mensagem de erro
		 */
		_mensagemErro : function (sMsg){
			var oBundle = this.getView().getModel("i18n").getResourceBundle();
			MessageBox.error(sMsg, {
			    title: oBundle.getText("messageBoxTitle"),                                   
			    textDirection: sap.ui.core.TextDirection.Inherit,
			    });
		}
	});

});

//************************** METODOS DE SERVIÇO ************************************

function getDetailsMethod(oBody, callback_success, callback_error){
    
    $.ajax({
			    type: "POST",
			    url: config.Get_Path_Data() + "Get_DetailsOP",
			    processData: false,
			    async:false,
			    contentType: 'application/json',
			    data: JSON.stringify(oBody),
			    success: function(r) {
			    	BASE.oData.details = r;
			    	BASE.oModelGlobal.setData(BASE.oData);
			    	if(typeof(callback_success) == "function"){
			    		callback_success(r);
			    	}
			    	
			    },
			    error : function(r){
			    	BASE.oData.details = [];
			    	BASE.oModelGlobal.setData(BASE.oData);
			    	if(typeof(callback_error) == "function"){
			    		callback_error(r);
			    	}
			    }

			});
}