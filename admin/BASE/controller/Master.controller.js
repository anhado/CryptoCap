sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"CryptoCap/admin/BASE/model/formatter",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function(Controller, JSONModel, formatter, Filter, FilterOperator) {
	"use strict";

	return Controller.extend("CryptoCap.admin.BASE.controller.Master", {
		formatter : formatter,
		/**
		 * Função que retorna o router da aplicação
		 */
		getRouter: function() {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},
		PercentOptions: function (){
			return formatTypeOptions("Percent");
		},
		showValue : function ( oEvent ) {
			alert(BASE.oData.Disc);
		},
		liveChange : function ( oEvent ) {
			/*
			var val = oEvent.getSource().getValue();
            val = val.replace(/[^0-9\.]/g, '');
            
            var split = val.split('.');
            if ( split.length === 3 ) {
            	val = split[0] + '.' + split[1] + split[2];
            }
           oEvent.getSource().setValue(val);*/
			
			
			var val = oEvent.getSource().getValue();
			var value = parseFloat(oEvent.getSource().getValue());
			if ( isNaN ( value ) ) {
				 oEvent.getSource().setValue(0);
			}
			 /*
	            var split = val.split('.');
	            if ( split.length === 3 ) {
	            	val = split[0] + '.' + split[1] + split[2];
	            }
	            oEvent.getSource().setValue(val);*/
			
		},
		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf admin.BASE.view.Master
		 * Chamada do serviço para pedir a lista de utilizadores do tipo Empregado
		 */
		onInit: function() {
			var oBody, 
				oPage, 
				oList = this.byId("listaUtilizadores"),
				oModel, 
				oView = this.getView(), 
				oBundle, 
				sTitle,
				_self; 
			
			
			BASE.oData.Disc = 0;
			BASE.oModelGlobal.setData(BASE.oData);
			this.getView().setModel(BASE.oModelGlobal);
			
			var myshell = sap.ui.getCore().byId("idViewApp--myShell");
			if(myshell !== undefined){
				myshell.setVisible(true);
			}
			
			/*   DESCOMENTAR ISTO
			getMethod({
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
			});
			//Chamada da página master
			oPage = this.getView().byId("masterPage");
			this.getView().setModel(BASE.oModelGlobal);
			var oBinding = this.getView().byId("listaOrdensProducao").getBinding("items");
			oBinding.filter( [ new sap.ui.model.Filter([
								  new sap.ui.model.Filter("Status", FilterOperator.Contains, "P" )
								  ],false)
								 ]);
			this.getView().byId("masterPage").setTitle(
					"Ordens de produção (" + oBinding.getLength() + ")");
			
			*/
		},
		
		
		/**
		 * Função despertada quando os dados são carregados na lista ou um filtro é aplicado
		 * Coloca o 1º item da lista como selecionado e chama o router para navegar para a página de Detalhes
		 * Envia para a página de detalhes o path do objecto no modelo da lista
		 * */
		onUpdateFinished : function (oEvent){
			var oList = this.getView().byId("");
			//recupera o 1º item da lista
			var oFirstItem = oList.getItems()[0];
			//se nao houver dados a mostrar mostra uma página detail default
			//se houver mostra os detalhes
			if(oFirstItem === undefined){
				//chama a detail page sem dados
				this.getRouter().navTo("NotFound");
			}
			else{
				var oIndex = String(oFirstItem.getBindingContext().getPath());
				//coloca o 1º item da lista como selecionado
				oList.setSelectedItem(oFirstItem, true);
				//chama a página de detalhes enviando o path do objeto
				if(oIndex !== undefined){
					var _data  = BASE.oModelGlobal.getProperty(oIndex);  
					if(_data != undefined){
						
						BASE.oModelGlobal.setData(BASE.oData);
					}
				}
				var tmp = oIndex.split('/');
				
				 this.getRouter().navTo("EstruturaProduto", {
					key : tmp[tmp.length-1] //oIndex.slice(1,2)
				});
			}
		},
		/**
		 * Função que chama a detail page para mostrar os dados de um utilizador quando é selecionado um novo objeto na lista da master page
		 */
		onSelectionChange : function (oEvent){
			var obj = oEvent.getParameter("listItem").getBindingContext();
    		
    		if(obj !== undefined){
    			var _data  = BASE.oModelGlobal.getProperty(obj.sPath);  
    			
				BASE.oModelGlobal.setData(BASE.oData);
        		var oIndex = obj.getPath(); // oEvent.getSource().getBindingContext().getPath();
        		var oRouter = this.getRouter();
           		var tmp = oIndex.split('/');
        		//encaminha o path do objeto selecionado para a detail page
        		oRouter.navTo("EstruturaProduto", {
        			key : tmp[tmp.length-1]  //oIndex.slice(1,2)
        		});
        		//this.navigation.navTo("idViewRoot--idViewDetail");		
        		//listUtilizadorPerfil(codUtilizador);
    		}
		},
		
		onNavBack : function (){
			navApps.to(navApps.getPreviousPage().sId);
		},
	
	});

});

//*********************** METODOS DE SERVIÇO *****************************

function getMethod(oBody, callback_success, callback_error){
    
    $.ajax({
			    type: "POST",
			    url: config.Get_Path_Data() + "Get_OPs",
			    processData: false,
			    async:false,
			    contentType: 'application/json',
			    data: JSON.stringify(oBody),
			    success: function(r) {
			    	BASE.oData.items = r;
			    	BASE.oModelGlobal.setData(BASE.oData);
			    	if(typeof(callback_success) == "function"){
			    		callback_success(r);
			    	}
			    	
			    },
			    error : function(r){
			    	BASE.oData.items = [];
			    	BASE.oModelGlobal.setData(BASE.oData);
			    	if(typeof(callback_error) == "function"){
			    		callback_error(r);
			    	}
			    }

			});
}