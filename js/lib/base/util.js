define(function(require, exports) {

	/******************************
	 * ajax提交
	 ******************************/

	exports.ajax = function(_url, _data, succeed, type) {
		var _type = _type ? _type : "json";
		$.ajax({
			url: _url,
			type: 'post',
			data: _data,
			dataType: _type
		}).done(function(e) {
			succeed(e);
		})
	}

	/******************************
	 * 表单验证
	 ******************************/
	var flag = true;
	exports.validate = function() {
		$("form").on("click", ".tooltip", function() {
			$(this).prev().tooltip("destroy")
		});
		$('form input[type!=checkbox]:visible').focusout(function(event) {
			if (!$(this).parent().attr("v")) {
				//不为空
				if (!$(this).val()) {
					$(this).parent().tooltip({
						"title": "输入的内容不能为空"
					}).tooltip("show");
					flag = false;
					return;
				}
			}
			//长短
			if (!($(this).parent().attr("v") && !$(this).val().length)) {
				var max = $(this).parent().attr('max') ? $(this).parent().attr('max') : 99999;
				var min = $(this).parent().attr('min') ? $(this).parent().attr('min') : 0;
				if (max < $(this).val().length || min > $(this).val().length) {
					var title;
					if (max == min) {
						title = "请输入" + min + "个字符";
					} else {
						title = "请输入" + min + "~" + max + "个字符";
					}
					$(this).parent().tooltip({
						"title": title
					}).tooltip("show");
					flag = false;
					return;
				}

				//正则
				if ($(this).parent().attr('reg')) {
					var reg = new RegExp($(this).parent().attr('reg'), "g");
					if (!$(this).val().match(reg)) {
						$(this).parent().tooltip({
							"title": "您输入的内容不合法"
						}).tooltip('show');
						flag = false;
						return;
					}
				}
			}
		}).focusin(function(event) {
			$(this).parent().tooltip("destroy");
			flag = true;
		});

		$("form").submit(function(event) {
			if (flag) {
				$('input').focusout();
				if ($(".tooltip").length > 0) {
					return false;
				} else {
					$("input[type=submit]").val("正在提交...");
					flag = false;
				}
			} else {
				return false;
			};
		});
	}

	/******************************
	 * 复制到文字剪切板
	 ******************************/
	exports.copy = function(btn, text_con, a_fn, path) {
		//避免重复创建
		if ($(btn).next().attr("class") == "zclip") return false;
		var _path = path ? path : 'js/res/copy.swf';
		//初始化
		require.async("../util/copy/copy", function() {
			$(btn).zclip({
				path: _path,
				copy: $(text_con).text(),
				afterCopy: a_fn
			});
		})

	}

	/******************************
	 * 格式化输出
	 ******************************/
	exports.stringCat = function() {
		var str = arguments[0];
		var arg = arguments,
			i = 0;
		return str.replace(/%%/g, function() {
			i++;
			return arg[i];
		})
	}

	/******************************
	 * fileupload
	 ******************************/

	exports.uploadfile = function(_url, fileId, succeed, faild) {
		require.async("../util/ajax/ajaxupload", function() {
			$.ajaxFileUpload({
				url: _url,
				secureuri: false,
				fileElementId: fileId,
				dataType: 'json',
				success: function(data) {
					succeed(data);
				},
				error: function(data, status, e) {
					faild(data);
				}
			});
		});
	}
})