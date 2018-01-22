sap.ui.define(["sap/ui/core/format/DateFormat"], function (DateFormat){
	"use strict";
	return{
		isActive : function (sValue) {
			if(sValue === 'Y'){
				return "Ativo";
			} else {
				return "Inativo";
			}
		},  
		hasPermission : function (sValue){
			if (sValue === 'Y'){
				return true;
			}
			else {
				return false;
			}
		}
	};
});
