jQuery.sap.require("sap.ui.qunit.qunit-css");
jQuery.sap.require("sap.ui.thirdparty.qunit");
jQuery.sap.require("sap.ui.qunit.qunit-junit");
QUnit.config.autostart = false;

sap.ui.require([
	"sap/ui/test/Opa5",
	"ZZ1/ZZSOCIAL_MEDIA_EX/test/integration/pages/Common",
	"sap/ui/test/opaQunit",
	"ZZ1/ZZSOCIAL_MEDIA_EX/test/integration/pages/App",
	"ZZ1/ZZSOCIAL_MEDIA_EX/test/integration/pages/Browser",
	"ZZ1/ZZSOCIAL_MEDIA_EX/test/integration/pages/Master",
	"ZZ1/ZZSOCIAL_MEDIA_EX/test/integration/pages/Detail",
	"ZZ1/ZZSOCIAL_MEDIA_EX/test/integration/pages/NotFound"
], function (Opa5, Common) {
	"use strict";
	Opa5.extendConfig({
		arrangements: new Common(),
		viewNamespace: "ZZ1.ZZSOCIAL_MEDIA_EX.view."
	});

	sap.ui.require([
		"ZZ1/ZZSOCIAL_MEDIA_EX/test/integration/NavigationJourneyPhone",
		"ZZ1/ZZSOCIAL_MEDIA_EX/test/integration/NotFoundJourneyPhone",
		"ZZ1/ZZSOCIAL_MEDIA_EX/test/integration/BusyJourneyPhone"
	], function () {
		QUnit.start();
	});
});