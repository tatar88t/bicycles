$(document).on('click', '#toggle-menu', function() {
	
	var $toggler = $(this);
	var $target = $toggler.attr('href');
	
	if ($target.length > 0) {
		$toggler.toggleClass('active');
		$target.slideToggle();
	}
});