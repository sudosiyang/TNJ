define(function(require, exports) {
	/**
	*   parent
		current
		item
		total
		selectChange
	*
	**/

	require("../../../res/css/pager.css");
	var total, parent, current, per_item, display_num = 7,
		fn;
	var templ = "<div class='autoPager'><a class='pre'>上一页</a><%=item%><a class='next'>下一页</a></div>";

	function init(option) {
		total = option.total;
		parent = option.parent;
		current = option.current ? option.current : 1;
		per_item = option.per_item ? option.per_item : 10;
		fn = option.selectChange;
		drawLink();
		linkClick();
	}
	/**
	 *  计算最大页数
	 */
	function numPages() {
		return Math.ceil(total / per_item);
	}

	function parseTpl(str, data) {
		var tmpl = 'var __p=[];' + 'with(obj||{}){__p.push(\'' +
			str.replace(/\\/g, '\\\\')
			.replace(/'/g, '\\\'')
			.replace(/<%=([\s\S]+?)%>/g, function(match, code) {
				return '\',' + code.replace(/\\'/, '\'') + ',\'';
			})
			.replace(/<%([\s\S]+?)%>/g, function(match, code) {
				return '\');' + code.replace(/\\'/, '\'')
					.replace(/[\r\n\t]/g, ' ') + '__p.push(\'';
			})
			.replace(/\r/g, '\\r')
			.replace(/\n/g, '\\n')
			.replace(/\t/g, '\\t') +
			'\');}return __p.join("");',
			func = new Function('obj', tmpl);

		return data ? func(data) : func;
	};

	function linkClick() {
		$("body").on('click', '.autoPager a', function(event) {
			event.preventDefault();
			if (!isNaN($(this).text())) {
				current = $(this).text();
			} else {
				if ($(this).hasClass('disable')) return;
				if ($(this).hasClass('pre')) {
					current--;
				} else {
					current++;
				}
			}
			drawLink();
			fn();
		});
	}

	function drawLink() {
		var temp = "";
		$(parent).empty();
		if (total <= 1) return;
		if (numPages() < display_num) {

			for (var i = 1; i <= numPages(); i++) {
				if (current == i) {
					temp += '<a class="current">' + i + '</a>';
				} else {
					temp += '<a>' + i + '</a>';
				}
			};
		} else {
			if (numPages() - current < display_num) {
				var te=[];
				for (var i = numPages(); i > numPages() - display_num; i--) {
					if (current == i) {
						te.push ('<a class="current">' + i + '</a>');
					} else {
						te.push( '<a>' + i + '</a>');
					}
				}
				temp=te.reverse().join("");
			} else {
				var hf_num = Math.ceil(display_num / 2);
				var pre = [],
					next = "";
				if (current >= hf_num) {

					for (var i = 1; i < hf_num; i++) {
						pre.push('<a>' + (+current - i) + '</a>');
						next += '<a>' + (+current + i) + '</a>';
					}

				} else {
					for (var i = +current + 1; i <= display_num; i++) {
						next += '<a>' + i + '</a>';
					}
					for (var j = (+current - 1); j >= 1; j--) {
						pre.push('<a>' + j + '</a>');
					}
				}
				temp = pre.reverse().join("") + '<a class="current">' + current + '</a>' + next;
			}

		}
		$(parent).append(parseTpl(templ, {
			"item": temp
		}));
		if (current == 1) {
			$(".autoPager .pre").addClass('disable');
		}
		if (current == numPages()) {
			$(".autoPager .next").addClass('disable');
		}
	}
	exports.init = init;

});