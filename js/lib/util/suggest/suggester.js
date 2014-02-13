define(function(require, exports) {
	var parent,array;
	function init(option){
		parent=option.target;
		array=option.suggest;
	}
	function ui_event(){
		$("body").on('change', parent, function(event) {
			event.preventDefault();
			/* Act on the event */
		});
	}
})