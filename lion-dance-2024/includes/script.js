jQuery(document).ready(function ($) {
  // Track all external links clicked
  $('.external-link').on('click', function () {
    var linkUrl = $(this).attr('href');
    var linkText = $(this).text();

    dataLayer.push({
      event: 'outbound_link',
      event_category: 'external_link',
      event_action: linkUrl,
      event_label: linkText,
    });
  });
});
