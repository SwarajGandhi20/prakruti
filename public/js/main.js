$(function(e) {
  "use strict";
  e(".page-loader").fadeOut("slow"),
    e(".disable-loader").on("click", function() {
      e(".page-loader").fadeOut("slow")
    }),
    e(".counter").counterUp({
      delay: 10,
      time: 1e3
    }),
    e(".animate-title").textillate({
      loop: !0,
      type: "word",
      "in": {
        delay: 120
      },
      out: {
        delay: 120
      }
    }),
    e(".background-slider").backstretch(["images/kids-img-1.jpg", "images/kids-img-2.jpg", "images/kids-img-3.jpg"], {
      duration: 3e3,
      fade: 750
    });
  var a = new Swiper(".swiper-container", {
    pagination: ".swiper-pagination",
    paginationClickable: !0
  });
  console.log(a),
    e(window).on("scroll resize", function() {
      return e(window).scrollTop() >= 75 && e("body").addClass("fixed-header"),
        e(window).scrollTop() < 75 ? e("body").removeClass("fixed-header") : void 0
    }),
    e(".campaign-info").matchHeight(),
    e(".same-ht").matchHeight(),
    e(".owl-carousel-single").owlCarousel({
      loop: !1,
      navRewind: !1,
      margin: 10,
      dots: !0,
      nav: !1,
      autoplay: !1,
      navText: [],
      items: 1
    })
});
