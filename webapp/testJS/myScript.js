 	function sleep(milliseconds) {
 		return new Promise(resolve => setTimeout(resolve, milliseconds));
 	}
 	$(document).ready(function () {

 		var listItems = $("#ulID").children();
 		listItems.each(function (i) {
 			if (this.textContent.includes("3")) {
 				this.className = "yellow";
 			}
 			if (this.textContent.includes("remote")) {
 				this.style.border = "1px solid #000";
 				this.onclick = function () {
 					this.style.display = "inline";
 					sleep(2000).then(() => {
 						this.style.display = "block";
 					});
 				};
 			}
 		});
 	});