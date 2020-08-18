$(function() {
	
	var badVisionModalId = 'modal-bad-vision';
	var badVisionModalSelector = '#' + badVisionModalId;
	
	var commonStyles = '@media (max-width: 575px) {.' + badVisionModalId + '{display: none!important;}}' +
		'.' + badVisionModalId + '__dialog {max-width: 800px;}' +
		'.' + badVisionModalId + '__header:before {display:none;}' +
		'.' + badVisionModalId + '__title {text-align: center;}' +
		'.bad-vision__params-item {display: table; width: 100%; border-collapse: separate; border: 0; border-spacing: 0;}' +
		'.bad-vision__params-item:not(:last-child) {border-bottom: 2px solid #999999;}' +
		'.bad-vision__params-item-name, .bad-vision__params-item-value {display: table-cell; vertical-align: middle; padding: 20px; text-align: left;}' +
		'.bad-vision__params-item-name {padding-left: 0; font-size: 22px; font-family: "Open Sans", sans-serif; color: #444; width: 35%;}' +
		'.bad-vision__params-item-value {padding-right: 0;}' +
		'.bad-vision-button {cursor: pointer; display: inline-block; margin: 5px 10px 5px 0; line-height: 26px; font-size: 18px; font-family: "Open Sans", sans-serif; padding: 3px 23px; border: 1px solid #333; outline: none!important; box-shadow: none!important; background: #ddd;}' +
		'.bad-vision-button:last-child {margin-right: 0;}' +
		'.bad-vision-button.selected {padding: 0 20px; border-width: 4px;}' +
		'.bad-vision-button.contrast {color: #000; border-color: #000; background: #fff;}' +
		'.bad-vision-button.inverse {color: #fff; border-color: #000; background: #000;}' +
		'.bad-vision-button.inverse.selected {border-color: #999;}' +
		'.bad-vision-button.red {color: #fff; background: #ff0000;}' +
		'.bad-vision-button.red:not(.selected) {border-color: #ff0000;}' +
		'.bad-vision-button.blue {color: #fff; background: #0000ff;}' +
		'.bad-vision-button.blue:not(.selected) {border-color: #0000ff;}' +
		'.bad-vision-button.arial {font-family: Arial, Helvetica, sans-serif;}' +
		'.bad-vision-button.times-new-roman {font-family: "Times New Roman", Times, serif;}' +
		
		'body[data-bv-theme="contrast"] {font-weight: 400;}' +
		'body[data-bv-theme="contrast"] *, body[data-bv-theme="contrast"] *:before, body[data-bv-theme="contrast"] *:after {-webkit-transition: none; transition: none;}' +
		'body[data-bv-theme="contrast"] .footer {background: #fff; color: #000; border-top: 1px solid #000;}' +
		'body[data-bv-theme="contrast"] .footer__bottom {background: #fff; border-top: 1px solid #000;}' +
		'body[data-bv-theme="contrast"] section {background: #fff;}' +
		'body[data-bv-theme="contrast"].home .header__service-link {color: #000!important; opacity:1!important;}' +
		'body[data-bv-theme="contrast"] .main-slider {color: #000;}' +
		'body[data-bv-theme="contrast"] .main-slider__item:after {background-image: none; background-color: rgba(255,255,255,0.9);}' +
		'body[data-bv-theme="contrast"].home .header .selectric-lang-switch .selectric .label {color: #000; font-weight: 400;}' +
		'body[data-bv-theme="contrast"] .selectric-items {border: 1px solid #000;}' +
		'body[data-bv-theme="contrast"] .selectric-items li.selected, body[data-bv-theme="contrast"] .selectric-items li.highlited {background: #ccc;}' +
		'body[data-bv-theme="contrast"] .header-form-search__clear, body[data-bv-theme="contrast"] .header-form-search__submit {background: #ccc;}' +
		'body[data-bv-theme="contrast"] .header-form-search__clear svg, body[data-bv-theme="contrast"] .header-form-search__submit svg {fill: #000;}' +
		'body[data-bv-theme="contrast"] .tile-item__link {color: #000;}' +
		'body[data-bv-theme="contrast"] .tile-item__img:before {background: #fff; opacity: 0.9!important;}' +
		'body[data-bv-theme="contrast"] .slick-dots li:not(.slick-active) button {background: #999;}' +
		'body[data-bv-theme="contrast"] .slick-arrow svg polygon {fill: #999;}' +
		'body[data-bv-theme="contrast"] .tile-item {border: 1px solid #000;}' +
		'body[data-bv-theme="contrast"] .news-item {color: #000; font-weight: 400; border: 1px solid #000; background: #fff;}' +
		'body[data-bv-theme="contrast"] .additional-education-item {border: 1px solid #777;}' +
		'body[data-bv-theme="contrast"] .nav {background: #fff;}' +
		'body[data-bv-theme="contrast"] .nav * {color: #000!important;}' +
		'body[data-bv-theme="contrast"] .nav .container .nav__close:before, body[data-bv-theme="contrast"] .nav .container .nav__close:after {background-color: #000!important;}' +
		'body[data-bv-theme="contrast"] .nav-menu .nav-menu__link {font-weight: 400;}' +
		'body[data-bv-theme="contrast"] .header__service-info, body[data-bv-theme="contrast"] .header__service-link {color: #000!important;}' +
		'body[data-bv-theme="contrast"] .selectric .label {font-weight: 400!important;}' +
		'body[data-bv-theme="contrast"] .breadcrumbs {font-weight: 400;}' +
		'body[data-bv-theme="contrast"] .breadcrumbs a, body[data-bv-theme="contrast"] .breadcrumbs span {color: #000;}' +
		'body[data-bv-theme="contrast"] .about-main__photos__item:before {opacity: 0;}' +
		'body[data-bv-theme="contrast"] .about-main__photos__item h4 {color: #000; background: #fff;}' +
		'body[data-bv-theme="contrast"] .about-main__photos .slick-nav {background: #000;}' +
		'body[data-bv-theme="contrast"] .about-specialties__info {background: #fff; color: #000;}' +
		'body[data-bv-theme="contrast"] .department-summary__desc, body[data-bv-theme="contrast"] .department-info__desc {font-weight: 400;}' +
		'body[data-bv-theme="contrast"] .filter-alphabet__title {color: #000;}' +
		'body[data-bv-theme="contrast"] .filter-alphabet__label {color: #000; font-weight: 400;}' +
		'body[data-bv-theme="contrast"] .filter-alphabet__input:checked + label {color: #fff; background: #000;}' +
		'body[data-bv-theme="contrast"] .teacher {border: 1px solid #000; font-weight: 400;}' +
		'body[data-bv-theme="contrast"] .teacher__discipline {color: #000;}' +
		'body[data-bv-theme="contrast"] .page-nav__arrow {color: #000;}' +
		'body[data-bv-theme="contrast"] .page-nav__link {color: #000; font-weight: 400; background: #fff!important;}' +
		'body[data-bv-theme="contrast"] .page-nav__link.active {color: #fff; background: #000!important;}' +
		'body[data-bv-theme="contrast"] .department__link {border: 1px solid #000; background: #fff!important;}' +
		'body[data-bv-theme="contrast"] .department__link p {color: #000!important;}' +
		'body[data-bv-theme="contrast"] .news-item_top .news-item__img:before {content:""; position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: #fff; opacity: 0.9;}' +
		'body[data-bv-theme="contrast"] .news-item_top .news-item__title {color: #000;}' +
		'body[data-bv-theme="contrast"] .teachers {background: #fff;}' +
		'body[data-bv-theme="contrast"] .timetable__table th {font-weight: 400; color: #000;}' +
		'body[data-bv-theme="contrast"] .header__logo {background: #000;}' +
		'body[data-bv-theme="contrast"] .collapse__btn {font-weight: 400;}' +
		'body[data-bv-theme="contrast"] .footer__menu-label:not([href]) {border-color: #000;}' +
		'body[data-bv-theme="contrast"] .footer__menu-label:not([href]):after {border-color: #000;}' +
		'body[data-bv-theme="contrast"] .timetable__table tbody.active .group-header {background: #000; color: #fff;}' +
		'body[data-bv-theme="contrast"] .timetable__table td:before {color: #000;}' +
		'body[data-bv-theme="contrast"] .timetable__table tbody.active tr {border-bottom-color: #000;}' +
		'body[data-bv-theme="contrast"] .btn-menu span, body[data-bv-theme="contrast"] .btn-menu span:before, body[data-bv-theme="contrast"] .btn-menu span:after {background-color: #000!important;}' +
		'body[data-bv-theme="contrast"] .selectric .button:after {border-top-color: #000;}' +
		'body[data-bv-theme="contrast"] .btn_red {background: #fff; color: #000; border: 2px solid #000;}' +
		'body[data-bv-theme="contrast"] .page__title:after, body[data-bv-theme="contrast"] .section__title:after {background: #000;}' +
		'body[data-bv-theme="contrast"] .slick-dots li.slick-active button {background: #000;}' +
		'body[data-bv-theme="contrast"] .categories-filter__link.active {color: #999!important;}' +
		'body[data-bv-theme="contrast"] .additional-education-item__link, body[data-bv-theme="contrast"] .additional-education-item__title {color: #000!important;}' +
		'body[data-bv-theme="contrast"] .about-info__item .num:before {background: #000;}' +
		'body[data-bv-theme="contrast"] .about-info__item a {color: #000!important;}' +
		'body[data-bv-theme="contrast"] .about-main__info {background: #fff; color: #000; border: 2px solid #000;}' +
		'body[data-bv-theme="contrast"] .about-main__info__item {color: #000;}' +
		'body[data-bv-theme="contrast"] .about-main__info .slick-nav {background: #000;}' +
		'body[data-bv-theme="contrast"] .contacts__item-phone {color: #000;}' +
		'body[data-bv-theme="contrast"] .contacts__item-email {color: #000!important;}' +
		'body[data-bv-theme="contrast"] .about-specialties__nav a:before {background: #000;}' +
		'body[data-bv-theme="contrast"] .categories-filter__link.active {color: #000!important; border-bottom: 2px solid #000;}' +
		'body[data-bv-theme="contrast"] .department-summary__num:after {background: #000;}' +
		'body[data-bv-theme="contrast"] .collapse__btn {color: #000!important;}' +
		'body[data-bv-theme="contrast"] .teacher__name {color: #000!important;}' +
		'body[data-bv-theme="contrast"] .department-head {background: #fff; color: #000!important; border: 2px solid #000;}' +
		'body[data-bv-theme="contrast"] .page__title a, body[data-bv-theme="contrast"] .section__title a {color: #000!important;}' +
		'body[data-bv-theme="contrast"] .page__title a:after, body[data-bv-theme="contrast"] .section__title a:after {border-bottom: 2px solid currentColor;}' +
		'body[data-bv-theme="contrast"] .marhi-modal__header:before {background: #000;}' +
		'body[data-bv-theme="contrast"] .marhi-modal__body {font-weight: 400;}' +
		'body[data-bv-theme="contrast"] .marhi-modal__body ul li:before {background: #000;}' +
		
		'body[data-bv-theme="inverse"] {font-weight: 400; background: #000; color: #fff;}' +
		'body[data-bv-theme="inverse"] *, body[data-bv-theme="contrast"] *:before, body[data-bv-theme="contrast"] *:after {-webkit-transition: none; transition: none;}' +
		'body[data-bv-theme="inverse"] .footer {background: #000; color: #fff; border-top: 1px solid #fff;}' +
		'body[data-bv-theme="inverse"] .footer__bottom {background: #000; border-top: 1px solid #fff;}' +
		'body[data-bv-theme="inverse"] section {background: #000;}' +
		'body[data-bv-theme="inverse"].home .header__service-link {color: #fff!important; opacity:1!important;}' +
		'body[data-bv-theme="inverse"].home .header__nav-mobile-link {color: #fff!important;}' +
		'body[data-bv-theme="inverse"] .header__nav-mobile .selectric-lang-switch .selectric .label {color: #fff!important;}' +
		'body[data-bv-theme="inverse"] .main-slider {color: #fff;}' +
		'body[data-bv-theme="inverse"] .main-slider__item:after {background-image: none; background-color: rgba(0,0,0,0.9);}' +
		'body[data-bv-theme="inverse"].home .header .selectric-lang-switch .selectric .label {color: #fff; font-weight: 400;}' +
		'body[data-bv-theme="inverse"] .selectric-items {border: 1px solid #fff; background: #000;}' +
		'body[data-bv-theme="inverse"] .selectric-items li {color: #fff;}' +
		'body[data-bv-theme="inverse"] .selectric-items li.selected, body[data-bv-theme="inverse"] .selectric-items li.highlited {background: #777;}' +
		'body[data-bv-theme="inverse"] .header__nav {background: #444;}' +
		'body[data-bv-theme="inverse"] .main-menu__link {color: #fff;}' +
		'body[data-bv-theme="inverse"] .header-form-search__input {color: #fff; background: #444;}' +
		'body[data-bv-theme="inverse"] .header-form-search__clear, body[data-bv-theme="inverse"] .header-form-search__submit {background: #444; border: 2px solid #fff;}' +
		'body[data-bv-theme="inverse"] .header-form-search__clear svg, body[data-bv-theme="inverse"] .header-form-search__submit svg {fill: #fff;}' +
		'body[data-bv-theme="inverse"] .page__title, body[data-bv-theme="inverse"] .section__title {color: #fff;}' +
		'body[data-bv-theme="inverse"] .tile-item__link {color: #fff;}' +
		'body[data-bv-theme="inverse"] .tile-item__img:before {background: #000; opacity: 0.9!important;}' +
		'body[data-bv-theme="inverse"] .slick-dots li:not(.slick-active) button {background: #fff;}' +
		'body[data-bv-theme="inverse"] .slick-arrow svg polygon {fill: #fff;}' +
		'body[data-bv-theme="inverse"] .tile-item {border: 1px solid #fff;}' +
		'body[data-bv-theme="inverse"] .categories-filter {color: #fff;}' +
		'body[data-bv-theme="inverse"] .news-item {color: #fff; font-weight: 400; border: 1px solid #fff; background: #000;}' +
		'body[data-bv-theme="inverse"] .news-item__title {color: #fff!important;}' +
		'body[data-bv-theme="inverse"] .additional-education-item {border: 1px solid #fff; background: #000;}' +
		'body[data-bv-theme="inverse"] .nav {background: #000;}' +
		'body[data-bv-theme="inverse"] .nav * {color: #fff!important;}' +
		'body[data-bv-theme="inverse"] .nav .container .nav__close:before, body[data-bv-theme="inverse"] .nav .container .nav__close:after {background-color: #fff!important;}' +
		'body[data-bv-theme="inverse"] .nav-menu .nav-menu__link {font-weight: 400;}' +
		'body[data-bv-theme="inverse"] .header__service-info, body[data-bv-theme="inverse"] .header__service-link {color: #fff!important;}' +
		'body[data-bv-theme="inverse"] .selectric {background: #000;}' +
		'body[data-bv-theme="inverse"] .selectric .label {font-weight: 400!important; color: #fff;}' +
		'body[data-bv-theme="inverse"] .breadcrumbs {font-weight: 400;}' +
		'body[data-bv-theme="inverse"] .breadcrumbs a, body[data-bv-theme="inverse"] .breadcrumbs span {color: #fff;}' +
		'body[data-bv-theme="inverse"] .about-main__photos__item:before {opacity: 0;}' +
		'body[data-bv-theme="inverse"] .about-main__photos__item h4 {color: #fff; background: #000;}' +
		'body[data-bv-theme="inverse"] .about-main__photos .slick-nav {background: #000;}' +
		'body[data-bv-theme="inverse"] .about-specialties__info {background: #000; color: #fff;}' +
		'body[data-bv-theme="inverse"] .header__nav-mobile-link {color: #fff;}' +
		'body[data-bv-theme="inverse"] .selectric .button {background: transparent;}' +
		'body[data-bv-theme="inverse"] .contacts__item-phone {color: #fff;}' +
		'body[data-bv-theme="inverse"] .contacts__item-email {color: #fff!important;}' +
		'body[data-bv-theme="inverse"] .marhi-balloon, body[data-bv-theme="inverse"] [class*="balloon_layout_panel"], body[data-bv-theme="inverse"] [class*="balloon__content"] {background: #000;}' +
		'body[data-bv-theme="inverse"] .marhi-balloon__arrow {background: #000;}' +
		'body[data-bv-theme="inverse"] .marhi-balloon__content {color: #fff;}' +
		'body[data-bv-theme="inverse"] .department-summary__item {color: #fff;}' +
		'body[data-bv-theme="inverse"] .department-info__desc {color: #fff;}' +
		'body[data-bv-theme="inverse"] .department-summary__desc, body[data-bv-theme="inverse"] .department-info__desc {font-weight: 400;}' +
		'body[data-bv-theme="inverse"] .filter-alphabet__title {color: #fff;}' +
		'body[data-bv-theme="inverse"] .filter-alphabet__label {color: #fff; font-weight: 400; background: #000!important;}' +
		'body[data-bv-theme="inverse"] .filter-alphabet__input:checked + label {color: #000; background: #fff!important;}' +
		'body[data-bv-theme="inverse"] .teacher {border: 1px solid #fff; font-weight: 400; background: #000; color: #fff;}' +
		'body[data-bv-theme="inverse"] .teacher__discipline, body[data-bv-theme="inverse"] .teacher__position {color: #fff;}' +
		'body[data-bv-theme="inverse"] .page-nav__arrow {color: #fff;}' +
		'body[data-bv-theme="inverse"] .page-nav__link {color: #fff; font-weight: 400; background: #000!important;}' +
		'body[data-bv-theme="inverse"] .page-nav__link.active {color: #000; background: #fff!important;}' +
		'body[data-bv-theme="inverse"] .form-filter-teachers > .selectric-wrapper .selectric .label {color: #fff;}' +
		'body[data-bv-theme="inverse"] .department__link {border: 1px solid #fff; background: #000!important;}' +
		'body[data-bv-theme="inverse"] .department__link p {color: #fff!important;}' +
		'body[data-bv-theme="inverse"] .news-item_top .news-item__img:before {content:""; position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: #000; opacity: 0.9;}' +
		'body[data-bv-theme="inverse"] .news-item_top .news-item__title {color: #000;}' +
		'body[data-bv-theme="inverse"] .teachers {background: #000;}' +
		'body[data-bv-theme="inverse"] .timetable__table th {font-weight: 400; color: #fff;}' +
		'body[data-bv-theme="inverse"] .header__logo {background: #000;}' +
		'body[data-bv-theme="inverse"] .timetable__table tbody.active .group-header {background: #fff; color: #000;}' +
		'body[data-bv-theme="inverse"] .timetable__table tr:hover td {background: #000; color: #fff;}' +
		'body[data-bv-theme="inverse"] .timetable__table td:before {color: #fff;}' +
		'body[data-bv-theme="inverse"] .timetable__table tbody.active tr {border-bottom-color: #fff;}' +
		'body[data-bv-theme="inverse"] .btn-menu span, body[data-bv-theme="inverse"] .btn-menu span:before, body[data-bv-theme="inverse"] .btn-menu span:after {background-color: #fff!important;}' +
		'body[data-bv-theme="inverse"] .selectric .button:after {border-top-color: #fff;}' +
		'body[data-bv-theme="inverse"] .btn_red {background: #fff; color: #000;}' +
		'body[data-bv-theme="inverse"] .page__title:after, body[data-bv-theme="inverse"] .section__title:after {background: #fff;}' +
		'body[data-bv-theme="inverse"] .slick-dots li.slick-active button {background: #ebd916;}' +
		'body[data-bv-theme="inverse"] .categories-filter__link.active {color: #fff!important; border-bottom: 2px solid #fff;}' +
		'body[data-bv-theme="inverse"] .additional-education-item__link, body[data-bv-theme="inverse"] .additional-education-item__title {color: #fff!important;}' +
		'body[data-bv-theme="inverse"] .about-info__item .num:before {background: #fff;}' +
		'body[data-bv-theme="inverse"] .about-info__item a {color: #fff!important;}' +
		'body[data-bv-theme="inverse"] .about-main__info {background: #000; color: #fff; border: 2px solid #fff;}' +
		'body[data-bv-theme="inverse"] .about-main__info__item {color: #fff;}' +
		'body[data-bv-theme="inverse"] .about-specialties__nav a:before {background: #fff;}' +
		'body[data-bv-theme="inverse"] .department-summary__num:after {background: #fff;}' +
		'body[data-bv-theme="inverse"] .collapse__btn {color: #fff!important;}' +
		'body[data-bv-theme="inverse"] .teacher__name {color: #fff!important;}' +
		'body[data-bv-theme="inverse"] .department-head {background: #000; color: #fff!important; border: 2px solid #fff;}' +
		'body[data-bv-theme="inverse"] .news-detail__desc {color: #fff;}' +
		'body[data-bv-theme="inverse"] .page__title a, body[data-bv-theme="inverse"] .section__title a {color: #fff!important;}' +
		'body[data-bv-theme="inverse"] .page__title a:after, body[data-bv-theme="inverse"] .section__title a:after {border-bottom: 2px solid currentColor;}' +
		'body[data-bv-theme="inverse"] .marhi-modal:not(.modal-bad-vision) {background: rgba(255, 255, 255, 0.65);}' +
		'body[data-bv-theme="inverse"] .marhi-modal:not(.modal-bad-vision) .marhi-modal__dialog {background: #000; color: #fff;}' +
		'body[data-bv-theme="inverse"] .marhi-modal:not(.modal-bad-vision) .marhi-modal__header:before {background: #fff;}' +
		'body[data-bv-theme="inverse"] .marhi-modal:not(.modal-bad-vision) .marhi-modal__title {color: #fff;}' +
		'body[data-bv-theme="inverse"] .marhi-modal:not(.modal-bad-vision) .marhi-modal__body {font-weight: 400; color: #fff;}' +
		'body[data-bv-theme="inverse"] .marhi-modal:not(.modal-bad-vision) .marhi-modal__body ul li:before {background: #fff;}' +
		'body[data-bv-theme="inverse"] .marhi-modal:not(.modal-bad-vision) .marhi-modal__close svg line {stroke: #fff;}' +
		
		'body[data-bv-links="red"] a {color: #f00!important;}' +
		'body[data-bv-links="red"] [class*="link"] {color: #f00;}' +
		'body[data-bv-links="red"] .categories-filter__link.active {border-bottom: 2px solid currentColor;}' +
		'body[data-bv-links="red"] .news-item__caption a, body[data-bv-links="red"] .news-item__title {color: #f00!important;}' +
		'body[data-bv-links="red"] a.footer__menu-label {color: #f00!important;}' +
		'body[data-bv-links="red"] .selectric .label {color: #f00!important;}' +
		'body[data-bv-links="red"] .btn_red {color: #fff!important; background: #f00!important;}' +
		'body[data-bv-links="red"] .about-info__item a {color: #f00!important;}' +
		'body[data-bv-links="red"] .collapse__btn {color: #f00!important;}' +
		'body[data-bv-links="red"] .filter-alphabet__input:not(:checked) + label {color: #f00; }' +
		'body[data-bv-links="red"] .teacher__name {color: #f00; }' +
		
		'body[data-bv-links="blue"] a {color: #00f!important;}' +
		'body[data-bv-links="blue"] [class*="link"] {color: #00f;}' +
		'body[data-bv-links="blue"] .categories-filter__link.active {border-bottom: 2px solid currentColor;}' +
		'body[data-bv-links="blue"] .news-item__caption a, body[data-bv-links="red"] .news-item__title {color: #00f!important;}' +
		'body[data-bv-links="blue"] a.footer__menu-label {color: #00f!important;}' +
		'body[data-bv-links="blue"] .selectric .label {color: #00f!important;}' +
		'body[data-bv-links="blue"] .btn_red {color: #fff!important; background: #00f!important;}' +
		'body[data-bv-links="blue"] .about-info__item a {color: #00f!important;}' +
		'body[data-bv-links="blue"] .collapse__btn {color: #00f!important;}' +
		'body[data-bv-links="blue"] .filter-alphabet__input:not(:checked) + label {color: #00f; }' +
		'body[data-bv-links="blue"] .teacher__name {color: #00f; }' +
		
		'body[data-bv-font="arial"] *, body[data-bv-font="arial"] *:before, body[data-bv-font="arial"] *:after {font-family: Arial, Helvetica, sans-serif!important;}' +
		'body[data-bv-font="roman"] *, body[data-bv-font="roman"] *:before, body[data-bv-font="roman"] *:after {font-family: "Times New Roman", Times, serif!important;}' +
		
		'body[data-bv-images="off"] img {visibility: hidden!important;}' +
		'body[data-bv-images="off"] * {background-image: none!important;}' +
		
		'body[data-bv-size="150"] {zoom: 1.5;}' +
		'body[data-bv-size="200"] {zoom: 2;}';
	
	var badVisionModalHTML = '<div id="' + badVisionModalId + '" class="marhi-modal ' + badVisionModalId + '">' +
		'<div class="marhi-modal__dialog ' + badVisionModalId + '__dialog">' +
			'<button class="marhi-modal__close ' + badVisionModalId + '__close" type="button">' +
				'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22.8 22.8">' +
					'<line class="st0" x1="1.4" y1="1.4" x2="21.3" y2="21.3"/>' +
					'<line class="st0" x1="21.3" y1="1.4" x2="1.4" y2="21.3"/>' +
				'</svg>' +
			'</button>' +
			'<div class="marhi-modal__body ' + badVisionModalId + '__body">' +
				'<div class="bad-vision__params-list">' +
					'<div class="bad-vision__params-item">' +
						'<div class="bad-vision__params-item-name">Цветовая тема</div>' +
						'<div class="bad-vision__params-item-value">' +
							'<button class="bad-vision-button" data-group="bv-theme" data-value="common">Обычный</button>' +
							'<button class="bad-vision-button contrast" data-group="bv-theme" data-value="contrast">Контрастный</button>' +
							'<button class="bad-vision-button inverse" data-group="bv-theme" data-value="inverse">Инверсия</button>' +
						'</div>' +
					'</div>' +
					'<div class="bad-vision__params-item">' +
						'<div class="bad-vision__params-item-name">Цвет кнопок и ссылок</div>' +
						'<div class="bad-vision__params-item-value">' +
							'<button class="bad-vision-button" data-group="bv-links" data-value="common">Обычный</button>' +
							'<button class="bad-vision-button red" data-group="bv-links" data-value="red">Красный</button>' +
							'<button class="bad-vision-button blue" data-group="bv-links" data-value="blue">Синий</button>' +
						'</div>' +
					'</div>' +
					'<div class="bad-vision__params-item">' +
						'<div class="bad-vision__params-item-name">Шрифт</div>' +
						'<div class="bad-vision__params-item-value">' +
							'<button class="bad-vision-button" data-group="bv-font" data-value="common">Обычный</button>' +
							'<button class="bad-vision-button arial" data-group="bv-font" data-value="arial">Arial</button>' +
							'<button class="bad-vision-button times-new-roman" data-group="bv-font" data-value="roman">Times-New-Roman</button>' +
						'</div>' +
					'</div>' +
					'<div class="bad-vision__params-item">' +
						'<div class="bad-vision__params-item-name">Размер шрифта</div>' +
						'<div class="bad-vision__params-item-value">' +
							'<button class="bad-vision-button" data-group="bv-size" data-value="100">100%</button>' +
							'<button class="bad-vision-button" data-group="bv-size" data-value="150">150%</button>' +
							'<button class="bad-vision-button" data-group="bv-size" data-value="200">200%</button>' +
						'</div>' +
					'</div>' +
					'<div class="bad-vision__params-item">' +
						'<div class="bad-vision__params-item-name">Изображения</div>' +
						'<div class="bad-vision__params-item-value">' +
							'<button class="bad-vision-button" data-group="bv-images" data-value="on">Включены</button>' +
							'<button class="bad-vision-button" data-group="bv-images" data-value="off">Отключены</button>' +
						'</div>' +
					'</div>' +
				'</div>' +
			'</div>' +
		'</div>' +
	'</div>';
	
	$(document).on('click', '.header__service-bad-vision a, .header__nav-mobile-bad-vision a', function (e) {
		e.preventDefault();
		$('body').addClass('overflow-hidden');
		$(badVisionModalSelector).fadeIn(300);
	});
	
	$(document).on('click', '.' + badVisionModalId + '__close', function(e) {
		e.preventDefault();
		$(badVisionModalSelector).fadeOut(300, function () {
			$('body').removeClass('overflow-hidden');
		});
	});
	
	$(document).on('click', '.bad-vision-button', function (e) {
		e.preventDefault();
		var $this = $(this);
		if (!$this.is('.selected')) {
			$this.siblings('.selected').removeClass('selected');
			$this.addClass('selected');
			SetStyles($this);
		}
	});
	
	function initBadVisionStyles() {
		
		var arrPropsStyles = {};
		
		$('.bad-vision-button').each(function() {
			arrPropsStyles[$(this).data('group')] = '';
		});
		
		for (var key in arrPropsStyles) {
			var cookieVal = getCookie(key);
			if (!!cookieVal) {
				var $btn = $('.bad-vision-button[data-group="' + key + '"][data-value="' + cookieVal + '"]');
				$btn.addClass('selected');
				arrPropsStyles[key] = $btn.data('value');
			}
			else {
				var $btn = $('.bad-vision-button[data-group="' + key + '"]').eq(0);
				$btn.addClass('selected');
				arrPropsStyles[key] = $btn.data('value');
			}
			$('body').attr('data-' + key, arrPropsStyles[key]);
		}
	}
	
	function SetStyles($btn) {
		
		var prop = $btn.data('group');
		var val = $btn.data('value');
		
		setCookie(prop, val, 30);
		$('body').attr('data-' + prop, val);
	}
	
	function setCookie(cname, cvalue, days) {
		var d = new Date();
		d.setTime(d.getTime() + (days*24*60*60*1000));
		var expires = "expires="+ d.toUTCString();
		document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
	}
	
	function getCookie(cname) {
		var value = "; " + document.cookie;
		var parts = value.split("; " + cname + "=");
		if (parts.length == 2) return parts.pop().split(";").shift();
	}
	
	$('head').append('<style id="bad-vision-styles">' + commonStyles + '</style>');
	$(badVisionModalHTML).insertAfter('footer');
	initBadVisionStyles();
	
});