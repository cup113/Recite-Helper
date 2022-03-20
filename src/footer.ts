function generate_footer(VERSION: string, levels: number): void {
	var $footer = $("footer"),
	lasts: string = "../";
	lasts = (lasts as any).repeat(levels);
	$footer.append($(`<div><p>cup11</p><a href="${lasts}homepage/declaration.html" target="_blank">关于开发者</a> <a href="${lasts}feedback/index.html" target="_blank">联系开发者</a> <a href="${lasts}homepage/index.html" target="_blank">开发者首页</a></div><div><p>传送门</p><a href="${lasts}干瞪眼计分器/index.html" target="_blank">干瞪眼计分器</a></div><hr><div><span>Version: ${VERSION}</span></div>`));
}

generate_footer("V0.0.1 (Dev)", 1);