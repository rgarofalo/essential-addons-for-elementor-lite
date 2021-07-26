var AdvAccordionHandler = function ($scope, $) {
	var $advanceAccordion = $scope.find(".eael-adv-accordion"),
		$accordionHeader = $scope.find(".eael-accordion-header"),
		$accordionType = $advanceAccordion.data("accordion-type"),
		$accordionSpeed = $advanceAccordion.data("toogle-speed");

	// Open default actived tab
	$accordionHeader.each(function () {
		if ($(this).hasClass("active-default")) {
			$(this).addClass("show active");
			$(this).next().slideDown($accordionSpeed);
		}
	});

	// Remove multiple click event for nested accordion
	$accordionHeader.unbind("click");

	$accordionHeader.click(function (e) {
		e.preventDefault();

		var $this = $(this),
			$contentNext = $this.next(),
			$filterGallery = $contentNext.find(
				".eael-filter-gallery-container"
			);

		ea.hooks.doAction("ea-advanced-accordion-triggered", $contentNext);

		if ($accordionType === "accordion") {
			if ($this.hasClass("show")) {
				$this.removeClass("show active");
				$contentNext.slideUp($accordionSpeed);
			} else {
				$this
					.parent()
					.parent()
					.find(".eael-accordion-header")
					.removeClass("show active");
				$this
					.parent()
					.parent()
					.find(".eael-accordion-content")
					.slideUp($accordionSpeed);
				$this.toggleClass("show active");
				$contentNext.slideToggle($accordionSpeed);

				if ($filterGallery.length) {
					$filterGallery.isotope("layout");
				}
			}
		} else {
			// For acccordion type 'toggle'
			if ($this.hasClass("show")) {
				$this.removeClass("show active");
				$contentNext.slideUp($accordionSpeed);
			} else {
				$this.addClass("show active");
				$contentNext.slideDown($accordionSpeed);

				if ($filterGallery.length) {
					$filterGallery.isotope("layout");
				}
			}
		}
	});
};
jQuery(window).on("elementor/frontend/init", function () {
	elementorFrontend.hooks.addAction(
		"frontend/element_ready/eael-adv-accordion.default",
		AdvAccordionHandler
	);
});
