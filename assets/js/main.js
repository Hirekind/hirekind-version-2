/*
	Exponent by Pixelarity
	pixelarity.com | hello@pixelarity.com
	License: pixelarity.com/license
*/

(function($) {

	skel.breakpoints({
		xlarge: '(max-width: 1680px)',
		large: '(max-width: 1280px)',
		medium: '(max-width: 980px)',
		small: '(max-width: 736px)',
		xsmall: '(max-width: 480px)'
	});

	$(function() {

		var	$window = $(window),
			$body = $('body');

		// Disable animations/transitions until the page has loaded.
			$body.addClass('is-loading');

			$window.on('load', function() {

				window.setTimeout(function() {
					$body.removeClass('is-loading');
				}, 500);

			});

		// Touch?
			if (skel.vars.mobile)
				$body.addClass('is-touch');

		// Fix: Placeholder polyfill.
			$('form').placeholder();

		// Prioritize "important" elements on medium.
			skel.on('+medium -medium', function() {
				$.prioritize(
					'.important\\28 medium\\29',
					skel.breakpoint('medium').active
				);
			});

		// Scrolly.
			$('.scrolly').scrolly({
				speed: 1500,
				offset: 100
			});

		// Banner.
			var $banner = $('#banner');

			if ($banner.length > 0) {

				// Parallax background.
					if (skel.vars.browser != 'ie'
					&&	!skel.vars.mobile) {

						skel.on('change', function() {

							if (skel.breakpoint('medium').active) {

								$window.off('scroll.px');
								$banner.css('background-position', '');

							}
							else {

								$banner.css('background-position', 'center 0px');

								$window.on('scroll.px', function() {
									$banner.css('background-position', 'center ' + (parseInt($window.scrollTop()) * -0.5) + 'px');
								});

							}

						});

					}

			}

		// Menu.
			$('#menu')
				.prepend('<h2>Menu</h2>')
				.append('<a href="#menu" class="closer"></a>')
				.appendTo($body)
				.panel({
					delay: 500,
					hideOnClick: true,
					hideOnSwipe: true,
					resetScroll: true,
					resetForms: true,
					side: 'right',
					target: $body,
					visibleClass: 'menu-visible'
				});

			// Fix: Remove transitions on WP<10 (poor/buggy performance).
				if (skel.vars.os == 'wp' && skel.vars.osVersion < 10)
					$('#menu')
						.css('transition', 'none');

	});

})(jQuery);