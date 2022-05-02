var Err;
(function (Err) {
    var $error = $("#__error"), errCount = 0;
    function reduce_opacity(op_now, op_reduce, id) {
        var $item = $("#__error-item-" + id.toString());
        if (op_now <= 0) {
            $item.remove();
            return;
        }
        else {
            $item.css("opacity", (op_now / 100).toFixed(1));
            setTimeout(reduce_opacity, 200, op_now - op_reduce, op_reduce, id);
        }
    }
    /**
     * @brief 显示/新增一个error
     * @param text 错误内容
     * @param duration 持续时间(ms)
     */
    function error_display(text, duration, icon) {
        if (duration === void 0) { duration = 6000; }
        if (icon === void 0) { icon = "❌"; }
        $("<p></p>").attr({ "id": "__error-item-" + (++errCount).toString(), "class": "__error-item" })
            .css("opacity", "1")
            .append($("<span></span>").text(icon))
            .append($("<span></span>").text(text))
            .append($("<button></button>").text("×").on('click', { id: errCount }, function (event) { $("#__error-item-" + event.data.id.toString()).remove(); }))
            .appendTo($error);
        setTimeout(reduce_opacity, duration / 4, 100, 25000 / duration, errCount);
    }
    Err.error_display = error_display;
})(Err || (Err = {}));
