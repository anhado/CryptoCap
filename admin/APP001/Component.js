sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"CryptoCap/admin/APP001/model/models"
], function(UIComponent, Device, models) {
	"use strict";

	return UIComponent.extend("CryptoCap.admin.APP001.Component", {

		metadata: {
			manifest: "json"
		},
		createContent : function() {

			// create root view
			// create root view
			var oView = sap.ui.view({
				id : "idViewApp",
				viewName : "CryptoCap.admin.APP001.view.App",
				type : "XML",
				viewData : {
					component : this
				}
			});	

			// done
			return oView;
		},
		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function() {
			// call the APP001 component's init function
			UIComponent.prototype.init.apply(this, arguments);
			// create the views APP001d on the url/hash
			this.getRouter().initialize();
			// set the device model
			this.setModel(models.createDeviceModel(), "device");
		}
	});

});