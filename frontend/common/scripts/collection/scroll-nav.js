/* SCROLL NAV */
var transforming = false;
$(document).on('click', '[data-scroll-to]', function(event) {
	event.preventDefault();

	var $link = $(this);
	var $target = $($link.data('scroll-to'));

	if ($target.length > 0 && !transforming) {
		scrollDocumentTo($target)
	}
});
function scrollDocumentTo($block) {
	var targetTop = $block.offset().top;
	var cPos = $(window).scrollTop();
	var time = Math.abs(cPos - targetTop) * 0.4;
	transforming = true;
	$('html, body').animate({scrollTop: targetTop}, time, 'swing', function() {
		transforming = false;
	});
}