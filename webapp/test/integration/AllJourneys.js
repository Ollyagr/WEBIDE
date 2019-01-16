jQuery.sap.require("sap.ui.qunit.qunit-css");
jQuery.sap.require("sap.ui.thirdparty.qunit");
jQuery.sap.require("sap.ui.qunit.qunit-junit");
QUnit.config.autostart = false;

// We cannot provide stable mock data out of the template.
// If you introduce mock data, by adding .json files in your webapp/localService/mockdata folder you have to provide the following minimum data:
// * At least 3 ZZ1_BPSOCIAL_ACC in the list
// * All 3 ZZ1_BPSOCIAL_ACC have at least one to_MediaAccount

sap.ui.require([
	"sap/ui/test/Opa5",
	"ZZ1/ZZSOCIAL_MEDIA_EX/test/integration/pages/Common",
	"sap/ui/test/opaQunit",
	"ZZ1/ZZSOCIAL_MEDIA_EX/test/integration/pages/App",
	"ZZ1/ZZSOCIAL_MEDIA_EX/test/integration/pages/Browser",
	"ZZ1/ZZSOCIAL_MEDIA_EX/test/integration/pages/Master",
	"ZZ1/ZZSOCIAL_MEDIA_EX/test/integration/pages/Detail",
	"ZZ1/ZZSOCIAL_MEDIA_EX/test/integration/pages/Create",
	"ZZ1/ZZSOCIAL_MEDIA_EX/test/integration/pages/NotFound"
], function (Opa5, Common) {
	"use strict";
	Opa5.extendConfig({
		arrangements: new Common(),
		viewNamespace: "ZZ1.ZZSOCIAL_MEDIA_EX.view."
	});

	sap.ui.require([
		"ZZ1/ZZSOCIAL_MEDIA_EX/test/integration/MasterJourney",
		"ZZ1/ZZSOCIAL_MEDIA_EX/test/integration/NavigationJourney",
		"ZZ1/ZZSOCIAL_MEDIA_EX/test/integration/NotFoundJourney",
		"ZZ1/ZZSOCIAL_MEDIA_EX/test/integration/BusyJourney",
		"ZZ1/ZZSOCIAL_MEDIA_EX/test/integration/FLPIntegrationJourney"
	], function () {
		QUnit.start();
	});
});