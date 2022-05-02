function show(selector: string) {
	$(selector).removeClass("none-display");
}

function hide(selector: string) {
	$(selector).addClass("none-display");
}

function toggleShow(selector: string) {
	$(selector).toggleClass("none-display");
}