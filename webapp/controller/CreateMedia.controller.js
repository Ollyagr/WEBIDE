sap.ui.define([
	"ZZ1/ZZSOCIAL_MEDIA_EX/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageBox", "sap/ui/Device",
], function (BaseController, JSONModel, MessageBox, Device) {
	"use strict";

	return BaseController.extend("ZZ1.ZZSOCIAL_MEDIA_EX.controller.CreateMedia", {
		parentUID: "",
		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf ZZ1.ZZSOCIAL_MEDIA_EX.view.CreateMedia
		 */
		onInit: function () {
			var that = this;
			this.saveEnabled = false;
			this.getRouter().getTargets().getTarget("createMedia").attachDisplay(null, this._onDisplay, this);
			this._oODataModel = this.getOwnerComponent().getModel();
			this._oResourceBundle = this.getResourceBundle();
			this._oViewModel = new JSONModel({
				enableCreate: false,
				delay: 0,
				busy: false,
				mode: "create",
				viewTitle: ""
			});
			this.setModel(this._oViewModel, "viewModel");

			// Register the view with the message manager
			sap.ui.getCore().getMessageManager().registerObject(this.getView(), true);
			var oMessagesModel = sap.ui.getCore().getMessageManager().getMessageModel();
			this._oBinding = new sap.ui.model.Binding(oMessagesModel, "/", oMessagesModel.getContext("/"));
			this._oBinding.attachChange(function (oEvent) {
				var aMessages = oEvent.getSource().getModel().getData();
				for (var i = 0; i < aMessages.length; i++) {
					if (aMessages[i].type === "Error" && !aMessages[i].technical) {
						that._oViewModel.setProperty("/enableCreate", false);
					}
				}
			});
		},
		// Overwrite
		onNavBack: function () {
			this.getModel("appView").setProperty("/addEnabled", true);
			var oHistory = sap.ui.core.routing.History.getInstance(),
				sPreviousHash = oHistory.getPreviousHash();

			this.getView().unbindObject();
			if (sPreviousHash !== undefined) {
				// The history contains a previous entry
				history.go(-1);
			} else {
				this.getRouter().getTargets().display("object");
			}
		},
		_onDisplay: function (oEvent) {
			var oData = oEvent.getParameter("data");

			if (oData && oData.mode === "update") {
				this._onEdit(oEvent);
			} else {
				this._onCreate(oEvent);
			}
		
			this.parentUID = this._oODataModel.getProperty(oData.objectPath + "/SAP_PARENT_UUID");
		},
		_onCreate: function (oEvent) {
			var oData = oEvent.getParameter("data");

			var oContext = this._oODataModel.createEntry(oData.objectPath + "/to_MediaAccount", {
				/*	properties: {
						SAP_PARENT_UUID: parentUUID
					},*/
				success: this._fnEntityCreated.bind(this),
				error: this._fnEntityCreationFailed.bind(this)
			});
			this.getView().setBindingContext(oContext);
		},
		_onEdit: function (oEvent) {
			var oData = oEvent.getParameter("data");
			var oView = this.getView();
			this._oViewModel.setProperty("/mode", "edit");
			this._oViewModel.setProperty("/enableCreate", true);
			//	this._oViewModel.setProperty("/viewTitle", this._oResourceBundle.getText("editViewTitle"));

			oView.bindElement({
				path: oData.objectPath
			});
		},
		/* Handles the success of creating an object
		 *@param {object} oData the response of the save action
		 * @private
		 */
		_fnEntityCreated: function (oData) {
			this._oViewModel.setProperty("/enableCreate", true);
				this.onNavBack();
		},

		/**
		 * Handles the failure of creating/updating an object
		 * @private
		 */
		_fnEntityCreationFailed: function () {
			this.getModel("appView").setProperty("/busy", false);
		},
		onSave: function (oEvent) {
			this.getModel().submitChanges();
			this._oViewModel.setProperty("/enableCreate", false);
		},
		_validateSaveEnablement: function () {
			this._oViewModel.setProperty("/enableCreate", true);

		},

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf ZZ1.ZZSOCIAL_MEDIA_EX.view.CreateMedia
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf ZZ1.ZZSOCIAL_MEDIA_EX.view.CreateMedia
		 */
			onAfterRendering: function() {
		    
		      var i;
			}

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf ZZ1.ZZSOCIAL_MEDIA_EX.view.CreateMedia
		 */
		//	onExit: function() {
		//
		//	}

	});

});