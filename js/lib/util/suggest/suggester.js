define(function(require, exports) {
	require("../../../res/css/suggester.css");

	var parent, array, current = 0;

	function init(option) {
		parent = option.target;
		array = option.suggest;
		$(parent).after("<div class='sug'></div>");
		$(".sug").hide();
		ui_event();
	}

	//数据渲染
	function render(data) {
		var html = "";
		if (data) {
			data=data.split("@")[0];
			$.each(array, function(i) {
				if (i != current) {
					html += "<div class='itm' attr=" + i + ">" + data + array[i] + "</div>";
				} else {
					html += "<div class='itm selected' attr=" + i + ">" + data + array[i] + "</div>";
				}
			});
		}
		$(".sug").empty().append(html).show();
	}

	function ui_event() {
		$("body").on('mouseenter', '.sug div', function(event) {
			current = $(this).attr("attr");
			$(".sug div").removeClass('selected').eq(current).addClass('selected');
		}).on('mouseleave', '.sug div', function(event) {
			current = $(this).attr("attr");
			$(".sug div").removeClass('selected').eq(current).addClass('selected');
		}).on('click', '.sug div', function(event) {
			$(parent).val($(this).text());
			$(".sug").hide();
		});
		$(parent).focusin(function(event) {
			var _this = $(this);
			$("body").on('keyup', function(event) {
				switch (event.keyCode) {
					case 38:
						//up
						up();
						break;
					case 40:
						//down
						down();
						break;
					case 13:
						//enter
						enter();
						break;
					default:
						render(_this.val());
				}
			});
		}).focusout(function(event) {
			$("body").off('keyup');
			setTimeout(function() {
				$(".sug").hide();
			},100);
		});

	}

	function up() {
		if (current == 0) {
			current = array.length - 1;
		} else {
			current--;
		}
		$(".sug div").removeClass('selected').eq(current).addClass('selected');
	}

	function down() {
		if (current == array.length - 1) {
			current = 0;
		} else {
			current++;
		}
		$(".sug div").removeClass('selected').eq(current).addClass('selected');
	}

	function enter() {
		$(parent).val($(".sug .selected").text());
		$(".sug").hide();
	}

	exports.init = init;
})