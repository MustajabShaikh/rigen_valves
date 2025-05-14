(function ($) {
  "use strict";

  // Spinner
  var spinner = function () {
    setTimeout(function () {
      if ($("#spinner").length > 0) {
        $("#spinner").removeClass("show");
      }
    }, 1);
  };
  spinner(0);

  // Initiate the wowjs
  new WOW().init();

  // Header carousel
  $(".header-carousel").owlCarousel({
    animateOut: "fadeOut",
    items: 1,
    margin: 0,
    stagePadding: 0,
    autoplay: true,
    smartSpeed: 1000,
    dots: false,
    loop: true,
    nav: true,
    navText: [
      '<i class="bi bi-arrow-left"></i>',
      '<i class="bi bi-arrow-right"></i>',
    ],
  });

  // Service-carousel
  $(".service-carousel").owlCarousel({
    autoplay: true,
    smartSpeed: 2000,
    center: false,
    dots: false,
    loop: true,
    margin: 25,
    nav: true,
    navText: [
      '<i class="bi bi-arrow-left"></i>',
      '<i class="bi bi-arrow-right"></i>',
    ],
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
      },
      576: {
        items: 1,
      },
      768: {
        items: 2,
      },
      992: {
        items: 2,
      },
      1200: {
        items: 2,
      },
    },
  });

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      $(".back-to-top").fadeIn("slow");
    } else {
      $(".back-to-top").fadeOut("slow");
    }
  });
  $(".back-to-top").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 1500, "easeInOutExpo");
    return false;
  });

  $(document).ready(function () {
    /*** Home Page ***/
    const allImageNumbers = Array.from({ length: 114 }, (_, i) => i + 1);
    for (let i = allImageNumbers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allImageNumbers[i], allImageNumbers[j]] = [
        allImageNumbers[j],
        allImageNumbers[i],
      ];
    }
    const selectedNumbers = allImageNumbers.slice(0, 50);
    const productImages = selectedNumbers.map(
      (num) => `img/Rigen_Brochure_Images-${num}.jpg`
    );

    const leftCarouselImages = productImages.slice(0, 25);
    const rightCarouselImages = productImages.slice(25, 50);

    leftCarouselImages.forEach((img, index) => {
      $(".product-carousel-left").append(`
      <div class="item text-center p-3">
        <img src="${img}" class="img-fluid mb-2" alt="Product ${index + 1}">
        <h6 class="mb-0">Product ${index + 1}</h6>
      </div>
    `);
    });

    rightCarouselImages.forEach((img, index) => {
      $(".product-carousel-right").append(`
      <div class="item text-center p-3">
        <img src="${img}" class="img-fluid mb-2" alt="Product ${index + 26}">
        <h6 class="mb-0">Product ${index + 26}</h6>
      </div>
    `);
    });

    $(".product-carousel-left").owlCarousel({
      loop: true,
      margin: 10,
      autoplay: true,
      autoplayTimeout: 2500,
      rtl: true,
      responsive: {
        0: { items: 2 },
        576: { items: 3 },
        768: { items: 4 },
        992: { items: 5 },
        1200: { items: 6 },
      },
    });

    $(".product-carousel-right").owlCarousel({
      loop: true,
      margin: 10,
      autoplay: true,
      autoplayTimeout: 2500,
      rtl: false,
      responsive: {
        0: { items: 2 },
        576: { items: 3 },
        768: { items: 4 },
        992: { items: 5 },
        1200: { items: 6 },
      },
    });
    /*** Home Page ***/

    /*** Product Page ***/
    const imagePaths = [];
    for (let i = 1; i <= 114; i++) {
      imagePaths.push(`img/Rigen_Brochure_Images-${i}.jpg`);
    }

    const $grid = $(".product-grid");
    const $loadMoreBtn = $("#loadMoreBtn");
    const perPage = $(window).width() >= 992 ? 15 : 12;
    let currentIndex = 0;

    function loadProducts() {
      const nextBatch = imagePaths.slice(currentIndex, currentIndex + perPage);
      $.each(nextBatch, function (index, path) {
        const $div = $("<div>", { class: "product-box" }).append(
          $("<img>", {
            src: path,
            alt: `Product ${currentIndex + index + 1}`,
          })
        );
        $grid.append($div);
      });
      currentIndex += perPage;

      if (currentIndex >= imagePaths.length) {
        $loadMoreBtn.hide();
      }
    }

    // Initial load
    loadProducts();

    // On click load more
    $loadMoreBtn.on("click", function () {
      loadProducts();
    });
    /*** Product Page ***/
  });
})(jQuery);
