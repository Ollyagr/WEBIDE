 $(document).ready(function () {
 	var listItems = $("#ulID").children();
 	listItems.each(function (i) {
 		if (this.textContent.includes("3")) {
 			this.className = "yellow";
 		}
 	});
 });