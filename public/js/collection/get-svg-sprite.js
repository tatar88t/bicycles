$.get($("body").data('svg-sprite'), function(data) {
	const sprite = document.createElement("div");
	$(sprite).css({
		position: 'absolute',
		width: 0,
		height: 0
	});
	sprite.innerHTML = new XMLSerializer().serializeToString(data.documentElement);
	$("body").prepend(sprite);
});