/* PARALLAX */
startParallax();
$(window).on('load resize', startParallax);

function startParallax() {
	var $parallaxBlocks = $('.parallax');
	if ($parallaxBlocks.length > 0 && window.matchMedia("only screen and (min-width:992px)").matches) {
		$(window).bind('scroll.parallax', function() {
			$parallaxBlocks.each(function() {
				Parallax($(this));
			})
		});
	}
	else {
		$(window).unbind('scroll.parallax');
	}
}
function Parallax($block) {

	var wH = $(window).height();

	var bTop = $block.offset().top;
	var bHeight = $block.innerHeight();
	var bBottom = bTop + bHeight;

	$block.find('.parallax__item').each(function(){
		var $item = $(this);
		var itemTop = $item.offset().top;
		var itemAmplitude = + $item.data('amplitude');

		var wTop = $(window).scrollTop();
		var wBottom = wTop + wH;

		var kTranslation = Math.min(Math.max((wBottom - bTop) / (bHeight + wH), 0), 1) - 0.5;
		var bTranslation = - (itemAmplitude * 2 * kTranslation);

		$item.css({
			"-webkit-transform": "translate(0, " + bTranslation + "px)",
			"transform": "translate(0, " + bTranslation + "px)"
		});
	});
}