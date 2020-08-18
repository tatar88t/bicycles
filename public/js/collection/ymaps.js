if ($('#contacts-map').length > 0) {
	ymaps.ready(InitContacts);
}

/* INIT CONTACTS */
function InitContacts() {

	var point = [55.871141, 37.649590];

	var map = new ymaps.Map('contacts-map', {
		center: point,
		zoom: 16
	});


	map.behaviors.disable('scrollZoom');

	var myPlacemark = new ymaps.Placemark({
		type: "Point",
		coordinates: point
	}, {
		balloonContent: '<b>GrowMedia</b><br><br>' +
			'Москва, проезд Дежнёва, 1, БЦ «Дежнёв Плаза», офис 622<br>' +
			'+7 (495) 967 90 63<br>' +
			'order@growmedia.ru'
	}, {
		preset: 'islands#redIcon'
	});

	map.geoObjects.add(myPlacemark);

	map.events.add('sizeChange', function() {
		map.setCenter(point);
	});

	$(window).on('resize.contactsMap', function() {
		map.setCenter(point);
	})
}