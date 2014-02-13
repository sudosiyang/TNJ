define(function(require, exports) {
	require("../../../res/css/suggester.css");

	var parent, array;

	function init(option) {
		parent = option.target;
		array = option.suggest;
		$(parent).after("<div class='sug'></div>");
		ui_event();
	}

	//数据渲染
	function render(data) {
		var html = "";
		if (data) {
			$.each(array, function(i) {
				html += "<div>" + data + array[i] + "</div>";
			});
		}
		$(".sug").empty().append(html);
	}

	function ui_event() {
		$(parent).focusin(function(event) {
			var _this = $(this);
			$("body").on('keyup', function(event) {
				switch (event.keyCode) {
					case 38:
						//up
						break;
					case 40:
						//down
						break;
					case 13:
						//enter
						break;
					default:
						render(_this.val());
				}
			});
		});
	}
	exports.init = init;
})