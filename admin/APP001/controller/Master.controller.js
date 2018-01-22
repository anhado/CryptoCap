sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"CryptoCap/admin/APP001/model/formatter",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function(Controller, JSONModel, formatter, Filter, FilterOperator) {
	"use strict";

	return Controller.extend("CryptoCap.admin.APP001.controller.Master", {
		formatter: formatter,
		/**
		 * Função que retorna o router da aplicação
		 */
		getRouter: function() {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},
		PercentOptions: function() {
			return formatTypeOptions("Percent");
		},

		liveChange: function(oEvent) {
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
			if (isNaN(value)) {
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
		 * @memberOf admin.APP001.view.Master
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

			APP001.oModelGlobal.setData(APP001.oData);
			this.getView().setModel(APP001.oModelGlobal);
			APP001.getApis({});
			var myshell = sap.ui.getCore().byId("idViewApp--myShell");
			if (myshell !== undefined) {
				myshell.setVisible(true);
			}

		},

		/**
		 * Função que chama a detail page para mostrar os dados de um utilizador quando é selecionado um novo objeto na lista da master page
		 */
		onSelectionChange: function(oEvent) {
			var obj = oEvent.getParameter("listItem").getBindingContext();

			if (obj !== undefined) {
				var _data = APP001.oModelGlobal.getProperty(obj.sPath);
                APP001.oData.Details = _data;
				APP001.oModelGlobal.setData(APP001.oData);
				var oIndex = obj.getPath(); // oEvent.getSource().getBindingContext().getPath();
                APP001.ColocaOEditorNoSitio();
				this.navigation.navTo("App_APP001--idViewDetailAPP001");
			}
		},

		onNavBack: function() {
			navApps.to(navApps.getPreviousPage().sId);
		},

	});

});

//*********************** METODOS DE SERVIÇO *****************************
 
APP001.getApis = function getApis(oBody, callback_success, callback_error) {

	$.ajax({
		type: "POST",
		url: Get_Path_Integration() + "?cmd=getApis",
		processData: false,
		async: false,
		contentType: 'application/json',
		data: JSON.stringify(oBody),
		success: function(r) {
			APP001.oData.MasterData = r.Data;
			APP001.oModelGlobal.setData(APP001.oData);

		},
		error: function(r) {
			APP001.oData.MasterData = [];
			APP001.oModelGlobal.setData(APP001.oData);
			alert(r.responseText);
		}

	});
}

APP001.ColocaOEditorNoSitio = function ColocaOEditorNoSitio() {
	var rhymeCompleter = {
		getCompletions: function(editor, session, pos, prefix, callback) {

			/*
		        var AutCompleteData=[];
		        
	            var newObja = {};
	            newObja.Name="GetQueryResult('<BaseDadosOrigem>',baseObj,'<Query>')";
	            newObja.Type="Function";
	            newObja.Object="Function";
	            AutCompleteData.push(newObja); 
	            
	            newObja = {};
	            newObja.Name="GetQueryResultFromExternalSource(EventRow,'<BaseDadosOrigem>',baseObj,'<Query>')";
	            newObja.Type="Function";
	            newObja.Object="Function";
	            AutCompleteData.push(newObja); 
	            
	            newObja = {};
	            newObja.Name="GetQueryResultByPropName('<BaseDadosOrigem>',baseObj,'" + APP001.oData.cab.Code + "','<PropertyName>')";
	            newObja.Type="Function";
	            newObja.Object="Function";
	            AutCompleteData.push(newObja); 
	            
	            newObja = {};
	            newObja.Name="GetCorrectKey('<BaseDadosOrigem>','<ObjType>',<KeyFields>,<KeyValues>)";
	            newObja.Type="Function";
	            newObja.Object="Function";
	            AutCompleteData.push(newObja); 
	            
	            newObja = {};
	            newObja.Name="newObject";
	            newObja.Type="Variable";
	            newObja.Object="Variable";
	            AutCompleteData.push(newObja); 
	            
	            newObja = {};
	            newObja.Name="baseObj";
	            newObja.Type="Variable";
	            newObja.Object="Variable";
	            AutCompleteData.push(newObja); 
	            
	            newObja = {};
	            newObja.Name="Template";
	            newObja.Type="Function";
	            newObja.Object="Function";
	            AutCompleteData.push(newObja); 
	            */

			callback(null, AutCompleteData.map(function(ea) {
				var obbb = ea.Object || "";
				if (obbb === "") {
					obbb = APP001.detailView.byId("txtObjectoSL")._lastValue;
				}
				return {
					name: ea.Name,
					value: ea.Name,
					meta: obbb
				}
			}));
		}
	}

	// vai mudar as input para o editor do ACE 
	if (APP001.EditorUtilizador == null) {
		var langTools = ace.require("ace/ext/language_tools");
		document.getElementById("idViewApp--idViewDetailAPP001--idUser").innerHTML = "";

		var editor2 = ace.edit("idViewApp--idViewDetailAPP001--idUser");

		editor2.setTheme("ace/theme/chrome");
		editor2.getSession().setMode("ace/mode/javascript");
		editor2.setOptions({
			enableBasicAutocompletion: true,
			enableSnippets: true,
			enableLiveAutocompletion: true,
			maxLines: Infinity
		});

		langTools.addCompleter(rhymeCompleter);

		APP001.EditorUtilizador = editor2;
	}

	document.getElementById("idViewApp--idViewDetailAPP001--idResultado").innerHTML = ""
	var container = document.getElementById('idViewApp--idViewDetailAPP001--idResultado');

	var options = {
		mode: 'view',
		onError: function(err) {
			alert(err.toString());
		},
		onModeChange: function(newMode, oldMode) {
			console.log('Mode switched from', oldMode, 'to', newMode);
		}
	};

	var json = {};

	var editor = new JSONEditor(container, options, json);
	document.getElementById('idViewApp--idViewDetailAPP001--idResultado').setAttribute("style",
		"display:block;height:500px");
	document.getElementById('idViewApp--idViewDetailAPP001--idResultado').style.height = '500px';

}