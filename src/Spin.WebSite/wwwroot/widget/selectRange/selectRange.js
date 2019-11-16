$(function () {
    // the widget definition, where "spin" is the namespace,
    $.widget("spin.selectRange", {
        // default options
        options: {
            min: 0,
            max: 100,
            itemsNumber: 6,
            prefix: 0
        },

        // The constructor
        _create: function () {
            this.element.hide();

            var contentWidget = $("<div>", { "class": "content-select-range" });
            var selectData = $("<div>", {})
                .append(
                    $("<div>", { "id": "uno" }),
                    $("<div>", { "id": "dos" }), )
                .append($("<div>", { "id": "tres" }))
                .appendTo(contentWidget)
                ;

            contentWidget.appendTo(this.element.parent());
        },

        // Called when created, and later when changing options
        _refresh: function () {

        },


        // Events bound via _on are removed automatically
        // revert other modifications here
        _destroy: function () {

        },

        // _setOptions is called with a hash of all options that are changing
        // always refresh when changing options
        _setOptions: function () {
            // _super and _superApply handle keeping the right this-context
            this._superApply(arguments);
            this._refresh();
        },

        // _setOption is called for each individual option that is changing
        _setOption: function (key, value) {
            // prevent invalid color values
            this._super(key, value);
        }
    });

});