jQuery(document).ready(function ($) {
  // Track all links clicked
  $('.ga-top-nav').on('click', function () {
    var linkUrl = $(this).attr('href');
    var linkText = $(this).text();

    dataLayer.push({
      event: 'GAEvent',
      eventCategory: 'Main Landing - Top Nav',
      event_action: linkUrl,
      event_label: linkText,
    });
  });

  $('.ga-banner').on('click', function () {
    var linkUrl = $(this).attr('href');
    var linkText = $(this).attr('title');

    dataLayer.push({
      event: 'GAEvent',
      eventCategory: 'Main Landing - Banner',
      event_action: linkUrl,
      event_label: linkText,
    });
  });

  $(document).on('click', '.ga-banner-btn', function () {
    var imgPath = $(this).find('img').attr('src');
    var imgAlt = $(this).find('img').attr('alt');

    dataLayer.push({
      event: 'GAEvent',
      eventCategory: 'Main Landing - Banner',
      event_action: imgPath,
      event_label: imgAlt,
    });
  });

  $('.ga-quick-links').on('click', function () {
    var linkUrl = $(this).attr('href');
    var linkText = $(this).text();

    dataLayer.push({
      event: 'GAEvent',
      eventCategory: 'Main Landing - Quick Links',
      event_action: linkUrl,
      event_label: linkText,
    });
  });

  $('.ga-highlights').on('click', function () {
    var linkUrl = $(this).attr('href');
    var linkText = $(this).attr('title');

    dataLayer.push({
      event: 'GAEvent',
      eventCategory: 'Main Landing - Highlights',
      event_action: linkUrl,
      event_label: linkText,
    });
  });

  $('.ga-glance').on('click', function () {
    var linkUrl = $(this).attr('href');
    var linkText = $(this).text();

    dataLayer.push({
      event: 'GAEvent',
      eventCategory: 'Main Landing - At a Glance',
      event_action: linkUrl,
      event_label: linkText,
    });
  });

  $('.ga-footer').on('click', function () {
    var linkUrl = $(this).attr('href');
    var linkText = $(this).text();

    dataLayer.push({
      event: 'GAEvent',
      eventCategory: 'Main Landing - Footer',
      event_action: linkUrl,
      event_label: linkText,
    });
  });

  // Slick slide
  $('.slider').slick({
    mobileFirst: true,
    arrows: true,
    dots: true,
    autoplay: true,
    speed: 800,
    prevArrow:
      '<button type="button" class="slick-prev ga-banner-btn"><img src="../../en/Pages/images/banner-prev-btn.png" alt="prev-btn" class="img-fluid" /></button>',
    nextArrow:
      '<button type="button" class="slick-next ga-banner-btn"><img src="../../en/Pages/images/banner-next-btn.png" alt="next-btn" class="img-fluid" /></button>',
  });
});
