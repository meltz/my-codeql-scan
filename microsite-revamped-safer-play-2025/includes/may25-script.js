jQuery(document).ready(function ($) {
  // Track all external links clicked
  $('a').on('click', function () {
    var linkUrl = $(this).attr('href');
    var linkText = $(this).text();

    dataLayer.push({
      event: 'outbound_link',
      event_category: 'link_click',
      event_action: linkUrl,
      event_label: linkText,
    });
  });

  // Initialize all tooltips
  $('[data-bs-toggle="tooltip"]').tooltip();

  // Auto calculate fixed nav height and apply padding to the required div
  function adjustPadding() {
    var navHeight = $('.fixed-top').outerHeight(); // Get navbar height
    $('.featured-section').css('padding-top', navHeight + 'px'); // Apply padding
  }

  // Run on page load
  adjustPadding();

  // Adjust on window resize
  $(window).on('resize', function () {
    adjustPadding();
  });
});
