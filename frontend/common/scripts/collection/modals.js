/* MODALS */
$(document).on('click', '[data-show-modal]', function(event) {
	event.preventDefault();

	var $target = $($(this).data('show-modal'));
	var $openModals = $('.modal.show');

	if ($target.length > 0) {
		if ($openModals.length > 0) HideModal($openModals);
		ShowModal($target);
	}
});
$(document).on('click', '.modal__close', function(event) {
	event.preventDefault();
	var $modal = $(this).closest('.modal');
	if ($modal.length > 0) HideModal($modal);
});
$(document).on('mousedown', '.modal', function() {
	var $clickTarget = $(event.target);
	var $modal = $clickTarget.is('.modal') ? $clickTarget : $clickTarget.closest('.modal');
	var isContent = $clickTarget.is('.modal__content') || ($clickTarget.closest('.modal__content').length > 0);
	if ($modal.length > 0 && !isContent) {
		HideModal($modal);
	}
});
function ShowModal($modal) {
	$('html').addClass('overflow-hidden');
	$modal.trigger('modal.show');
	$modal.addClass('show').fadeIn(300, function() {
		$modal.trigger('modal.shown');
	});
}
function HideModal($modal) {
	$modal.trigger('modal.hide');
	$modal.removeClass('show').fadeOut(300, function() {
		$modal.trigger('modal.hidden');
		$('html').removeClass('overflow-hidden');
	});
}