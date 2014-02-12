define(function(require, exports) {
	var total, parent, current, per_item, display_num = 7;
	var templ = "<div class='autoPager'><a class='pre'>上一页</a><%=item%><a class='next'>下一页</a></div>";

	function init(option) {
		total = option.total;
		parent = option.parent;
		current = option.current ? option.current : 1;
		per_item = option.per_item ? option.per_item : 10;
		drawLink();
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

	function drawLink() {
		var temp = "";
		if (total <= 1) return;
		if (current == 1) {
			$(".autoPager .pre").addClass('disable');
		}
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
				for (var i = numPages(); i > numPages() - display_num; i--) {
					if (current == i) {
						temp += '<a class="current">' + i + '</a>';
					} else {
						temp += '<a>' + i + '</a>';
					}
				}
			} else {
				var hf_num = Math.ceil(display_num / 2);
				if (current >= hf_num) {
					var pre=[],next="";
					for(var i=1;i<hf_num;i++){
						 pre.push('<a>' + (+current-i) + '</a>');
						 next+='<a>' + (+current+i) + '</a>';
					}
					temp=pre.reverse().join("")+'<a class="current">' + current + '</a>'+next;
				}else{
					var next="",pre=[];
					for(var i=+current+1;i<=display_num;i++){
						next+='<a>' + i + '</a>';
					}
					for(var j=(+current-1);j>=1;j--){
						pre.push('<a>' + j + '</a>');
					}
					temp=pre.reverse().join("")+'<a class="current">' + current + '</a>'+next;
				}
			}

		}
		$(parent).append(parseTpl(templ, {
			"item": temp
		}));
	}
	exports.init = init;

});