sap.ui.define([
	"sap/ui/core/mvc/Controller",
	'sap/ui/model/Filter',
	'sap/m/Dialog',
	"sap/ui/model/json/JSONModel",
	'sap/m/MessageToast',
	'sap/m/MessageBox',
	"CryptoCap/admin/APP001/model/formatter"
], function(Controller, Filter, Dialog, JSONModel, MessageToast, MessageBox, formatter) {
	"use strict";
	return Controller.extend("CryptoCap.admin.APP001.controller.Detail", {
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
		 * @memberOf admin.APP001.view.Detail
		 */
		onInit: function() { 
            APP001._this = this;
            
			this.getView().setModel(APP001.oModelGlobal);
			//this.getRouter().getRoute("OrdemProducao").attachPatternMatched(this._onObjectMatched, this);
		},
		
		handleSaveButtonPress: function() { 
		    saveDetail(APP001.oData.Details);
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
				"dataAPP001":$.cookie("DataAPP001"),
				"userid":$.cookie("User"),
				"fiori_token":$.cookie("Token")
			}, function(r){
				if(r.length > 0){ 
					console.log(r);
					var _data = APP001.oModelGlobal.getProperty("/items/0");
					if (_data !== undefined ) {
						APP001.oModelGlobal.setData(APP001.oData);
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

APP001.saveDetail = function saveDetail(oBody) {

	$.ajax({
		type: "POST",
		url: Get_Path_Integration() + "?cmd=SaveApi",
		processData: false,
		async: false,
		contentType: 'application/json',
		data: JSON.stringify(oBody),
		success: function(r) { 
			alert("Success");
		},
		error: function(r) {  
			alert(r.responseText);
		}

	});
}