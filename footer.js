function generate_footer(VERSION, levels) {
    var $footer = $("footer"), lasts = "../";
    lasts = lasts.repeat(levels);
    $footer.append($("<div><p>cup11</p><a href=\"".concat(lasts, "homepage/declaration.html\" target=\"_blank\">\u5173\u4E8E\u5F00\u53D1\u8005</a> <a href=\"").concat(lasts, "feedback/index.html\" target=\"_blank\">\u8054\u7CFB\u5F00\u53D1\u8005</a> <a href=\"").concat(lasts, "homepage/index.html\" target=\"_blank\">\u5F00\u53D1\u8005\u9996\u9875</a></div><div><p>\u4F20\u9001\u95E8</p><a href=\"").concat(lasts, "\u5E72\u77AA\u773C\u8BA1\u5206\u5668/index.html\" target=\"_blank\">\u5E72\u77AA\u773C\u8BA1\u5206\u5668</a></div><hr><div><span>Version: ").concat(VERSION, "</span></div>")));
}
generate_footer("V0.0.1 (Dev)", 1);
