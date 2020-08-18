// import Comparison from "./collection/comparison";
import Comparison from "./collection/comparison.js";

Comparison()

$(function() {
	//SHOW BENEFIT BLOCK------------------------------------------
	function showBenefitBlock () {
		let trigger = document.querySelectorAll(".about-benefits-toggler");
		let blockItem = document.querySelector(".benefit-card-wrapper");

		trigger.forEach(btn => {
			btn.addEventListener("click", (e) => {
				btn.nextElementSibling.classList.toggle("benefit-card-wrapper_active")
				btn.classList.toggle("about-benefits-toggler_active")
			})
		})

	}
	showBenefitBlock ()

	// GET SVG SPRITE
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

	// ACTIVITY
	$("[data-toggle-activity]").on("click", function(evt) {
		evt.preventDefault();
		var $toggler = $(this);
		var $target = $($toggler.attr("data-toggle-activity"));

		if ($target.length > 0) {
			if ($target.is(".active")) Deactivate($toggler, $target);
			else Activate($toggler, $target);
		}

		function Activate($link, $block) {
			$link.addClass("active");
			$block.addClass("active").trigger("activate");
			var hasclick = false;
			$("body").bind("click.blockactivity", function() {
				if (hasclick) {
					Deactivate($link, $block);
				}
				hasclick = true;
			});
		}
		function Deactivate($link, $block) {
			$link.removeClass("active");
			$block.removeClass("active").trigger("deactivate");
			$("body").unbind("click.blockactivity");
		}

	});

	// MAIN MENU FIX
	var $mainMenu = $('#main-menu');
	if ($mainMenu.length > 0) {
		$mainMenu.on('shown', function() {
			$('body').addClass('main-menu-active');
		});
		$mainMenu.on('hide', function() {
			$('body').removeClass('main-menu-active');
		});
	}

	// TOGGLE MAIN MENU
	$(document).on('click', '.toggle-menu', function() {
		var menuAnimation = false;
		var menuAnimationTime = 500;
		if ($mainMenu.length > 0 && !menuAnimation) {
			menuAnimation = true;

			if ($mainMenu.hasClass('active')) {
				$mainMenu.trigger('hide');
				$mainMenu.fadeOut(menuAnimationTime, function() {
					$mainMenu.removeClass('active').trigger('hidden');
					menuAnimation = false;
				});
			}
			else {
				$mainMenu.addClass('active').trigger('show');
				$mainMenu.fadeIn(menuAnimationTime, function() {
					$mainMenu.trigger('shown');
					menuAnimation = false;
				});
			}
		}
	});

	// FANCYBOX DEFAULTS
	if (!!$.fancybox) {
		$.fancybox.defaults.loop = true;
		$.fancybox.defaults.infobar = false;
		$.fancybox.defaults.toolbar = true;
		$.fancybox.defaults.buttons = ["close"];
		$.fancybox.defaults.animationEffect = "fade";
		$.fancybox.defaults.autoFocus = false;
		$.fancybox.defaults.backFocus = false;
		$.fancybox.defaults.clickOutside = "close";
		$.fancybox.defaults.clickSlide = "close";
		$.fancybox.defaults.btnTpl = {
			close: '<button data-fancybox-close class="fancybox-button fancybox-button-close" title=""><svg class="icon" xmlns="http://www.w3.org/2000/svg"><use xlink:href="#close"/></svg></button>',
			arrowLeft: '<button data-fancybox-prev class="fancybox-button fancybox-button-prev" title=""><svg class="icon" xmlns="http://www.w3.org/2000/svg"><use xlink:href="#arrow-right"/></svg></button>',
			arrowRight: '<button data-fancybox-next class="fancybox-button fancybox-button-next" title=""><svg class="icon" xmlns="http://www.w3.org/2000/svg"><use xlink:href="#arrow-right"/></svg></button>'
		};
	}

	// FANCYBOX MODAL
	var $modalTogglers = $("[data-modal]");
	if ($modalTogglers.length > 0) {
		$modalTogglers.click(function(evt) {
			evt.preventDefault();

			var targetModal = $(this).data('modal');
			if ($(targetModal).length > 0) {
				$.fancybox.open({
					src: targetModal,
					//arrows: false
					modal: true,
					afterShow: function() {
						$(document).bind('click.fancyboxOutside', function(evt) {
							var $target = $(evt.target);
							if (($target.is('.fancybox-slide') || $target.closest('.fancybox-slide').length > 0)
								&& !($target.is('.modal') || $target.closest('.modal').length > 0)) {
								$.fancybox.close();
							}
						})
					},
					beforeClose: function() {
						$(document).unbind('click.fancyboxOutside');
					}
				});
			}
		})
	}

	// SELECT
	var $selects = $('select');
	if ($selects.length > 0) {
		$selects.selectric({
			//disableOnMobile: true
		});
	}

	// SCROLL NAV
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

	// NAV TABS
	$('.nav-tabs a').click(function(evt) {
		evt.preventDefault();
		var $link = $(this);
		var $target = $($link.attr('href'));

		$link.closest('.nav-tabs').find('.active').removeClass('active');
		$link.addClass('active');

		if ($target.length > 0) {
			$target.addClass('active').trigger('tab.show');
			$target.siblings().removeClass('active').trigger('tab.hide');
		}
	});
	$('.nav-tab-mobile').click(function(evt) {
		evt.preventDefault();
		var $link = $(this);
		var $target = $($link.attr('href'));

		$link.toggleClass('active');

		if ($target.length > 0) {
			$target.slideToggle();
		}
	});

	// HEADER SEARCH FORM
	var $headerSearch = $('.header-search');
	if ($headerSearch.length > 0) {

		$headerSearch.each(function() {

			var $headerSearchForm = $(this).find(".header-search-form");
			var $headerSearchToggler = $headerSearch.find('.header-search-form-toggler');
			var $headerSearchInput = $headerSearch.find('.header-search-form-input');

			// ACTIVATE
			if ($headerSearchToggler.length > 0) {
				$headerSearchToggler.on('click', function(evt) {
					evt.preventDefault();
					if ($headerSearchForm.is(".active")) {
						$headerSearchForm.removeClass("active").fadeOut();
					}
					else {
						$headerSearchForm.addClass("active").fadeIn();
						if ($headerSearchInput.length > 0) $headerSearchInput.focus();
					}
				});
			}

		});
	}

	// SLIDERS ON MAIN PAGE
	var $mainPageSlider = $('.main-slider');
	if($mainPageSlider.length > 0) {
		$mainPageSlider.each(function() {
			var $swiperBlock = $(this);
			var $slides = $swiperBlock.find('.swiper-slide');
			var slidesCount = $slides.length;
			var $pagination = $swiperBlock.find('.swiper-pagination');
			var $navBtnPrev = $swiperBlock.find('.swiper-button-prev');
			var $navBtnNext = $swiperBlock.find('.swiper-button-next');

			if (slidesCount > 1) {
				var swiper = new Swiper($swiperBlock.find('.swiper-container'), {
					init: false,
					loop: false,
					speed: 500,
					autoplay: {
						delay: 5000
					},
					navigation: {
						prevEl: $navBtnPrev,
						nextEl: $navBtnNext
					},
					initialSlide: 0,
					slidesPerView: 1,
					slidesPerGroup: 1,
					spaceBetween: 0,
					pagination: {
						el: $pagination,
						clickable: true
					},
					on: {
						init: RecalculateNav,
						slideChange: RecalculateNav
					}
				});

				swiper.init();
			}
			else {
				$swiperBlock.addClass("swiper-slider-no-active");
			}

			function RecalculateNav() {
				var activeIndex = swiper.realIndex;
				$navBtnPrev.html(NormalizeNumber((activeIndex > 0) ? activeIndex : slidesCount));
				$navBtnNext.html(NormalizeNumber((activeIndex + 2 <= slidesCount) ? (activeIndex + 2) : 0));
			}

			function NormalizeNumber(val) {
				return (("" + val).length > 1) ? ("" + val) : ("0" + val);
			}
		});
	}

	// MAIN CATALOG SLIDERS
	var $mainCatalogSlider = $('.main-catalog-slider');
	if($mainCatalogSlider.length > 0) {

		$mainCatalogSlider.each(function() {
			var $swiperBlock = $(this);
			var mainCatalogSwiper = false;
			InitMainCatalogSwiper();
			$(window).on('resize.newsDetail', InitMainCatalogSwiper);

			function InitMainCatalogSwiper() {
				if (window.matchMedia("(max-width: 559px)").matches) {
					if (!mainCatalogSwiper) {
						mainCatalogSwiper = new Swiper($swiperBlock.find('.swiper-container'), {
							init: true,
							speed: 300,
							autoplay: false,
							loop: false,
							slidesPerView: 1,
							slidesPerGroup: 1,
							spaceBetween: 40,
							navigation: false,
							pagination: {
								el: $swiperBlock.find('.swiper-pagination'),
								clickable: true
							}
						});
					} else {
						if (!!mainCatalogSwiper) mainCatalogSwiper.destroy();
						mainCatalogSwiper = false;
					}
				}
			}
		});
	}

	// MAIN INSTAGRAM SLIDER
	var $mainInstagramSlider = $('.main-instagram-slider');
	if($mainInstagramSlider.length > 0) {
		var mainInstagramSwiper = false;
		InitMainInstagramSwiper();
		$(window).on('resize.newsDetail', InitMainInstagramSwiper);

		function InitMainInstagramSwiper() {
			if (window.matchMedia("(max-width: 999px)").matches) {
				if (!mainInstagramSwiper) {
					mainInstagramSwiper = new Swiper($mainInstagramSlider.find('.swiper-container'), {
						init: true,
						speed: 300,
						autoplay: false,
						loop: false,
						slidesPerView: 3,
						slidesPerGroup: 3,
						spaceBetween: 40,
						navigation: false,
						pagination: {
							el: $mainInstagramSlider.find('.swiper-pagination'),
							clickable: true
						},
						breakpoints: {
							767: {
								slidesPerView: 2,
								slidesPerGroup: 2,
								spaceBetween: 20,
							},
							559: {
								slidesPerView: 1,
								slidesPerGroup: 1,
								spaceBetween: 20,
							}
						}
					});
				} else {
					if (!!mainInstagramSwiper) mainInstagramSwiper.destroy();
					mainInstagramSwiper = false;
				}
			}
		}
	}

	// MAIN SELECTION SLIDER
	var $mainSelectionSlider = $('.main-selection-form-slider');
	if($mainSelectionSlider.length > 0) {
		new Swiper($mainSelectionSlider.find('.swiper-container'), {
			init: true,
			effect: 'fade',
			fadeEffect: {
				crossFade: true
			},
			loop: false,
			speed: 300,
			autoplay: false,
			navigation: {
				prevEl: $mainSelectionSlider.find('.swiper-button-prev'),
				nextEl: $mainSelectionSlider.find('.swiper-button-next')
			},
			slidesPerView: 1,
			slidesPerGroup: 1,
			spaceBetween: 0,
			pagination: false
		});
	}

	// MAIN SALE SLIDERS
	var $mainSaleSlider = $('.main-sale-slider');
	if($mainSaleSlider.length > 0) {

		$mainSaleSlider.each(function() {
			var $swiperBlock = $(this);
			var mainSaleSwiper = false;
			InitMainCatalogSwiper();
			$(window).on('resize.newsDetail', InitMainCatalogSwiper);

			function InitMainCatalogSwiper() {
				if (window.matchMedia("(max-width: 999px)").matches) {
					if (!mainSaleSwiper) {
						mainCatalogSwiper = new Swiper($swiperBlock.find('.swiper-container'), {
							init: true,
							speed: 300,
							autoplay: false,
							loop: false,
							slidesPerView: 2,
							slidesPerGroup: 2,
							spaceBetween: 40,
							navigation: false,
							pagination: {
								el: $swiperBlock.find('.swiper-pagination'),
								clickable: true
							},
							breakpoints: {
								559: {
									slidesPerView: 1,
									slidesPerGroup: 1,
									spaceBetween: 20,
								}
							}
						});
					} else {
						if (!!mainSaleSwiper) mainSaleSwiper.destroy();
						mainSaleSwiper = false;
					}
				}
			}
		});
	}

	// CATALOG FILTER
	var $catalogFilter = $('#catalog-filter');
	if ($catalogFilter.length > 0) {

		var $catalogFilterItems = $(".catalog-filter-item");

		if ($catalogFilterItems.length > 0) {

			$catalogFilterItems.each(function() {
				var $item = $(this);
				var $toggler = $item.find(".head .toggler");
				var $body = $item.find(".body");

				$toggler.click(function(evt) {
					evt.preventDefault();
					$item.toggleClass('open');
					$body.slideToggle(300, function() {
						$body.toggleClass('open');
					});
				});
			});
		}
	}

	// var $catalogFilterToggler = $('#catalog-filter-toggler');
	// if ($catalogFilterToggler.length > 0 && $catalogFilter.length > 0) {
	// 	$catalogFilterToggler.click(function(evt) {
	// 		evt.preventDefault();
	// 		$catalogFilterToggler.toggleClass('active');
	// 		$catalogFilter.find('.catalog-filter__body').slideToggle();
	// 	})
	// }

	// RANGE SLIDERS
	var $uiRangeSliders = $('.ui-range-slider');
	if ($uiRangeSliders.length > 0) {
		$uiRangeSliders.each(function() {
			var $this = $(this);
			var minVal = +$this.data('min-value');
			var maxVal = +$this.data('max-value');

			var $block = $this.closest('.range-block');
			var $minField = $block.find('[data-min-field]');
			var $maxField = $block.find('[data-max-field]');

			var minValReal = !!$minField.val() ? $minField.val() : minVal;
			var maxValReal = !!$maxField.val() ? $maxField.val() : maxVal;

			$this.slider({
				min: minVal,
				max: maxVal,
				range: true,
				step: !!$this.data('step') ? + $this.data('step') : 1,
				values: [minValReal, maxValReal],
				slide: function(event, ui) {
					var values = $this.slider('values');
					$minField.val(values[0]).trigger('change');
					$maxField.val(values[1]).trigger('change');
				}
			});

			$minField.on('keyup', function() {
				var minVal = getNumbersFromString($minField.val());
				var values = $this.slider('values');
				$this.slider('values', [minVal, values[1]]);
				$minField.trigger("change");
			});
			$maxField.on('keyup', function() {
				var maxVal = getNumbersFromString($maxField.val());
				var values = $this.slider('values');
				$this.slider('values', [values[0], maxVal]);
				$maxField.trigger("change");
			});

			FormatInputValue($minField);
			$minField.on("change", function() {
				FormatInputValue($minField);
			});
			FormatInputValue($maxField);
			$maxField.on("change", function() {
				FormatInputValue($maxField);
			});

		})
	}

	// PRODUCT CARD FEATURES SLIDER
	var $productCardFeaturesSlider = $('.product-page-features-slider');
	if($productCardFeaturesSlider.length > 0) {
		$productCardFeaturesSlider.each(function() {
			var $swiperBlock = $(this);
			new Swiper($swiperBlock.find('.swiper-container'), {
				init: true,
				loop: false,
				speed: 300,
				navigation: {
					prevEl: $swiperBlock.find('.swiper-button-prev'),
					nextEl: $swiperBlock.find('.swiper-button-next')
				},
				initialSlide: 0,
				slidesPerView: 3,
				slidesPerGroup: 1,
				spaceBetween: 0,
				pagination: {
					el: $swiperBlock.find('.swiper-pagination'),
					clickable: true
				},
				breakpoints: {
					999: {
						slidesPerView: 2
					},
					559: {
						slidesPerView: 1
					}
				}
			});
		});
	}

	// PRODUCT TECHNOLOGIES SLIDERS
	var $productTechnologiesSliders = $('.product-page-technologies-slider');
	if($productTechnologiesSliders.length > 0) {

		$productTechnologiesSliders.each(function() {
			var $swiperBlock = $(this);
			new Swiper($swiperBlock.find('.swiper-container'), {
				init: true,
				speed: 300,
				autoplay: false,
				loop: false,
				slidesPerView: 3,
				slidesPerGroup: 1,
				spaceBetween: 40,
				navigation: {
					prevEl: $swiperBlock.find('.swiper-button-prev'),
					nextEl: $swiperBlock.find('.swiper-button-next')
				},
				pagination: {
					el: $swiperBlock.find('.swiper-pagination'),
					clickable: true
				},
				breakpoints: {
					999: {
						slidesPerView: 2
					},
					767: {
						slidesPerView: 1
					}
				}
			});
		});
	}

	// PRODUCT CARD VIEWED SLIDER
	var $productCardViewedSlider = $('.product-page-viewed-slider');
	if($productCardViewedSlider.length > 0) {
		$productCardViewedSlider.each(function() {
			var $swiperBlock = $(this);
			new Swiper($swiperBlock.find('.swiper-container'), {
				init: true,
				loop: false,
				speed: 300,
				navigation: false,
				initialSlide: 0,
				slidesPerView: 3,
				slidesPerGroup: 1,
				spaceBetween: 40,
				pagination: {
					el: $swiperBlock.find('.swiper-pagination'),
					clickable: true
				},
				breakpoints: {
					1199: {
						slidesPerView: 2
					},
					767: {
						slidesPerView: 1
					}
				}
			});
		});
	}

	// IMAGE MAPPING
	var $mappedImages = $("img[data-img-map]");
	if ($mappedImages.length > 0) {

		$mappedImages.each(function() {

			var $originalImg = $(this);
			var $img = $originalImg.clone().insertAfter($originalImg);
			var $wrapper = $('<div class="image-mapper"></div>').insertAfter($img);
			var $globalWrapper = $('<div class="image-mapper-wrapper"></div>').insertAfter($img);
			$wrapper.css("position", "relative").append($img);
			$globalWrapper.css("position", "relative").append($originalImg).append($wrapper);
			$originalImg
				.addClass("original")
				.css({
					"visibility": "hidden",
					"opacity": "0",
					"position": "absolute",
					"top": "0",
					"left": "0",
					"z-index": "-1000"
				});

			var $map = $("map[name=" + $img.data("img-map") + "]");
			var pointsStr = '';

			if ($map.length > 0) {

				var $areas = $map.find("area");

				if ($areas.length > 0) {

					$areas.each(function() {

						var $area = $(this);
						var coords = $area.attr("coords") || "";
						var arrCoords = coords.split(",");

						if (arrCoords.length > 1) {
							var pointLeft = (+arrCoords[0]) / $img[0].naturalWidth * 100;
							var pointTop = (+arrCoords[1]) / $img[0].naturalHeight * 100;

							var pointTooltip = $area.data("tooltip-content") || false;

							var pointSrc = $area.data("point-src") || false;
							var pointColor = $area.data("point-color") || false;
							var pointStr = "";

							if (pointSrc) {
								pointStr += '<img src="' + pointSrc + '" class="point" data-tooltip="' + (pointTooltip ? pointTooltip : '') + '" />';
							}
							else if (pointColor) {
								pointStr += '<div class="point point-' + pointColor + '" data-tooltip="' + (pointTooltip ? pointTooltip : '') + '"></div>';
							}

							pointsStr += '<div class="point-wrapper" style="position:absolute;left:' + pointLeft + '%;top:' + pointTop +'%;">' + pointStr + '</div>';
						}

					});

					$wrapper.append(pointsStr);
				}
			}

			SetWrapperSizes();
			$(window).on('resize', SetWrapperSizes);
			function SetWrapperSizes() {
				console.log($wrapper)
				$wrapper.css({
					"width": $originalImg.width() + "px",
					"height": $originalImg.height() + "px"
				});
			}
		});
	}

	// TOOLTIPS
	var $existTooltip = false;

	$(document).on('mouseenter touchend', '[data-tooltip]', function(evt) {
		if (!!$existTooltip) {
			HideTooltip($existTooltip);
			$existTooltip = false;
			$(document).unbind('click.tooltip');
		}
		$existTooltip = ShowTooltip($(this));

		$(document).bind('click.tooltip', function(clickOutside) {
			clickOutside.preventDefault();
			HideTooltip($existTooltip);
			$existTooltip = false;
			$(document).unbind('click.tooltip');
		});

	});
	$(document).on('mouseleave', '[data-tooltip]', function() {
		if (!!$existTooltip) {
			HideTooltip($existTooltip);
			$existTooltip = false;
			$(document).unbind('click.tooltip');
		}
	});

	function ShowTooltip($el) {
		var $w = $(window);
		var wT = $w.scrollTop();
		var wL = $w.scrollLeft();
		var wW = $w.innerWidth();
		var wH = $w.innerHeight();

		var elT = $el.offset().top;
		var elL = $el.offset().left;
		var elH = $el.outerHeight();
		var elW = $el.outerWidth();

		var tooltip = document.createElement('div');
		var $tooltip = $(tooltip);
		$tooltip.addClass('tooltip').html($el.data('tooltip')).appendTo('body');

		var tH = $tooltip.outerHeight();
		var tW = $tooltip.outerWidth();

		var tolerance = 30;

		if (elT - wT > tH + tolerance) {
			$tooltip.addClass('top').css({
				'top': elT - tH,
				'left': elL + elW/2 - tW/2
			});
		}
		else if (wL + wW - elL - elW > tW + tolerance) {
			$tooltip.addClass('right').css({
				'top': elT + elH/2 - tH/2,
				'left': elL + elW
			});
		}
		else if (wT + wH - elT - elH > tH + tolerance) {
			$tooltip.addClass('bottom').css({
				'top': elT + elH,
				'left': elL + elW/2 - tW/2
			});
		}
		else if (elL - wL > tW + tolerance) {
			$tooltip.addClass('left').css({
				'top': elT + elH/2 - tH/2,
				'left': elL - tW
			})
		}
		else {
			$tooltip.addClass('top').css({
				'top': elT - tH,
				'left': elL + elW/2 - tW/2
			});
		}

		$tooltip.addClass('open');
		return $tooltip;
	}

	function HideTooltip($t) {
		$t.removeClass('open');
		$t.remove();
		// setTimeout(function() {
		// 	$t.remove();
		// }, 300);
	}

	var $lkmenu = $("#lk-menu");
	if ($lkmenu.length > 0) {

		// ACTIVITY ON MOBILE
		$lkmenu.on("activate", function() {
			$lkmenu.slideDown(300);
		});
		$lkmenu.on("deactivate", function() {
			$lkmenu.slideUp(300);
		});

		$lkmenu.find("a").on("click", function(evt) {
			var $sub = $(this).siblings("ul");
			if ($sub.length > 0) {
				evt.preventDefault();
				$sub.slideToggle(300)
			}
		});
	}
});

// FORMAT NUMBER
function getNumbersFromString(str) {
	var newstr = str;
	return +(newstr.replace(/\D/g,''));
}
function formatNumber(num) {
	var newnum = num;
	return (newnum.toLocaleString('ru'));
}
function FormatInputValue($input) {
	var newVal = getNumbersFromString($input.val());
	$input.val(formatNumber(newVal));
}

// CONTACTS MAP
function InitMainContactsMap() {
	var $contactsMaps = $('#main-contacts-map');
	if ($contactsMaps.length > 0) {
		var map = new google.maps.Map($contactsMaps[0], {
			center: {lat: +($contactsMaps.data('lat')), lng: +($contactsMaps.data('lat'))},
			zoom: 8
		})
	}
}
