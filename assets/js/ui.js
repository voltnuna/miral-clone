var MiralUi = (function (miral, $) {
  // 해당 페이지에 element가 있는지 체크
  var _checkEl = function (el) {
    return el.length > 0;
  };

  // 초기화
  miral.init = function () {
    miral.front.navigation();
    miral.front.modal.closeBtn();

    if (_checkEl($(".main"))) {
      miral.front.main();
    }
    if (_checkEl($(".tab__select"))) {
      miral.front.tabToggle();
    }
    if (_checkEl($(".breadcrumbs"))) {
      miral.front.breadcrumbs();
    }
    if (_checkEl($(".faq"))) {
      miral.front.accordion();
    }
  };

  // 스크립트 작성
  miral.front = {
    navigation: function () {
      //Toggle GNB Menu
      let active = false; //열린 메뉴있는지
      function toggleAllMenu(target) {
        if (active === false) {
          active = $(target).children(".depth-2");
          $(active).addClass("display-on");
        } else {
          $(active).removeClass("display-on");
          active = false;
        }
      }

      function scrollTopFix() {}

      function resizeWindow() {
        var navItem = $(".nav__item");
        $("body").addClass("is-fixed");
        if (navItem.hasClass("nav__item--is-active")) {
          $(".nav__item--is-active").find(".nav__depth").stop().slideDown(300);
          return;
        }
        navItem
          .eq(0)
          .addClass("nav__item--is-active")
          .find(".nav__depth")
          .stop()
          .slideDown(300);
      }

      //GNB Menu event
      $(document).on("mouseenter  mouseleave", "#header .depth-1", (e) =>
        toggleAllMenu(e.target)
      );

      if (window.matchMedia("(max-width: 1600px)").matches) {
        $(document).on("click", ".nav__item", function () {
          $(".nav__item")
            .removeClass("nav__item--is-active")
            .find(".nav__depth")
            .stop()
            .slideUp();
          $(this)
            .addClass("nav__item--is-active")
            .find(".nav__depth")
            .stop()
            .slideDown(300);
        });
      }

      $(window).scroll(function () {
        fixHeader();
      });

      $(window).resize(function () {
        if ($("#header").find(".depth-2").hasClass("display-on")) {
          if (window.matchMedia("(max-width: 1600px)").matches) {
            return resizeWindow();
          }
          $("body").removeClass("is-fixed");
          $(".nav__item")
            .removeClass("nav__item--is-active")
            .find(".nav__depth")
            .removeAttr("style");
        }

        if (window.matchMedia("(max-width: 1600px)").matches) return;
        $(".nav__item")
          .removeClass("nav__item--is-active")
          .find(".nav__depth")
          .removeAttr("style");
      });
    },
    breadcrumbs: function () {
      var title = $(".visual .visual__title").text();
      var subTitle = $(".screen-modulate .sub-page__title").text();
      var navIdx = $(".breadcrumbs").attr("data-nav-idx");
      var navDepth1 = $(".nav .nav__1st").clone();
      var nav = $(".nav .nav__item").eq(navIdx - 1);
      var navDepth2 = nav.find(".nav__2nd").clone();

      $(".breadcrumbs .inner").append(
        '<div class="breadcrumbs__dep1"><div class="list__dep1"></div></div><div class="breadcrumbs__dep2"><div class="list__dep2"></div></div>'
      );
      $(".breadcrumbs__dep1").prepend(
        '<button type="button" class="title__dep1">' + title + "</button>"
      );
      $(".breadcrumbs__dep2").prepend(
        '<button type="button" class="title__dep2">' + subTitle + "</button>"
      );
      $(".breadcrumbs__dep1 .list__dep1").append(navDepth1);
      $(".breadcrumbs__dep2 .list__dep2").append(navDepth2);

      $(document).on("click", ".title__dep1", function (e) {
        dropDownToggle(e.target);
      });

      $(document).on("click", ".title__dep2", function (e) {
        dropDownToggle(e.target);
      });

      function dropDownToggle(obj) {
        var toggleItem = $(obj);
        if (toggleItem.hasClass("is-active")) {
          toggleItem.removeClass("is-active").siblings("div").slideUp();
        } else {
          toggleItem.addClass("is-active").siblings("div").slideDown();
        }
        $(document).on("click", function (e) {
          if (e.target != obj) {
            toggleItem.removeClass("is-active").siblings("div").slideUp();
          }
        });
      }
    },
    modal: {
      show: function (clickBtn) {
        $("#" + clickBtn).addClass("modal--is-active");
      },
      hide: function (closeBtn) {
        $(closeBtn).closest(".modal").removeClass("modal--is-active");
      },
      closeBtn: function () {
        $(document).on("click", ".modal .modal__close", function () {
          $(this).closest(".modal").removeClass("modal--is-active");
        });
      },
    },
    tabToggle: function () {
      $(document).on("click", ".tab__select", function (e) {
        dropDownToggle(e.target);
      });
      $(document).on("click", ".tab__item", function (e) {
        dropDownToggle(e.target);
      });

      function dropDownToggle(obj) {
        var toggleItem = $(obj).siblings(".tab__list");

        if (toggleItem.hasClass("tab__list--is-active")) {
          toggleItem.removeClass("tab__list--is-active").stop().slideUp(100);
        } else {
          toggleItem.addClass("tab__list--is-active").stop().slideDown(100);
        }

        $(document).on("click", function (e) {
          if (e.target != obj) {
            toggleItem.removeClass("tab__list--is-active").stop().slideUp(100);
          }
        });
      }

      $(window).resize(function () {
        if (window.matchMedia("(max-width: 1024px)").matches) return;
        $(".tab__list").removeClass("tab__list--is-active").removeAttr("style");
      });
    },
    accordion: function () {
      $(".faq__item")
        .eq(0)
        .addClass("faq__item--is-active")
        .find(".faq__desc")
        .stop()
        .slideDown();
      $(document).on("click", ".faq__title__question", function (e) {
        if ($(e.target).hasClass("faq__item--is-active")) {
          return;
        }
        $(".faq__item")
          .removeClass("faq__item--is-active")
          .find(".faq__desc")
          .stop()
          .slideUp();
        $(e.target)
          .parents(".faq__item")
          .addClass("faq__item--is-active")
          .find(".faq__desc")
          .stop()
          .slideDown();
      });
    },
    main: function () {
      // Visual
      var mainVisual = new Swiper(".main-visual", {
        autoplay: {
          delay: 4000,
          disableOnInteraction: false,
        },
        loop: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
      });

      $(".main-visual .swiper-auto-play").on("click", function (e) {
        if ($(e.currentTarget).hasClass("is-pause")) {
          $(e.currentTarget).removeClass("is-pause");
          mainVisual.autoplay.start();
        } else {
          $(e.currentTarget).addClass("is-pause");
          mainVisual.autoplay.stop();
        }
      });

      // Issue
      var issuePc = new Swiper(".issue__swiper.pc", {
        slidesPerView: 3,
        slidesPerColumn: 2,
        slidesPerGroup: 3,
        spaceBetween: 0,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        on: {
          init: function () {
            if ($(".issue__swiper.pc .swiper-slide").length <= 6) {
              $(".issue__swiper.pc .swiper-wrapper").addClass("is-animate");
            }
          },
        },
      });
      var issueMobile = new Swiper(".issue__swiper.mobile", {
        slidesPerView: 1.5,
        slidesPerColumn: 0,
        slidesPerGroup: 1,
        spaceBetween: 10,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        breakpoints: {
          768: {
            slidesPerView: 2,
            slidesPerColumn: 0,
            slidesPerGroup: 1,
            spaceBetween: 20,
          },
        },
      });

      $(".notice__tab .notice__tab__item").eq(0).addClass("is-active");
      $(".notice__contents > .notice__panel").eq(0).show();
      $(document).on("click", ".notice__tab__item a", function () {
        var idx = $(this).parent().index();

        $(this).parents("ul").find("li").removeClass("is-active");
        $(this).parent().addClass("is-active");
        $(this)
          .closest(".notice")
          .find(".notice__contents > .notice__panel")
          .eq(idx)
          .show()
          .siblings()
          .hide();
        return false;
      });

      var youtubeSwiper = new Swiper(".yt-sec__swiper", {
        slidesPerView: 1,
        spaceBetween: 15,
        hashNavigation: {
          watchState: true,
        },
        breakpoints: {
          768: {
            spaceBetween: 30,
          },
        },
      });

      var snsSwiper = new Swiper(".sns-swiper", {
        slidesPerView: 1,
        spaceBetween: 30,
        hashNavigation: {
          watchState: true,
        },
        breakpoints: {
          768: {
            spaceBetween: 30,
          },
        },
      });
    },
  };

  miral.addEventListener("load", function () {
    miral.init();
  });

  return miral;
})(window, jQuery);
