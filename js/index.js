$(document).ready(function () {
  //x 버튼
  let modalPop = $("modal");
  let closeBtn = modalPop.find(".close");

  closeBtn.on("click", function () {
    modalPop.fadeOut();
  });

  // 자동 슬라이드
  let mainImg_wrap = $(".slide_start .mainImg_wrapper");
  mainImg_wrap.slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    arrows: false,
  });

  //슬라이드 좌우 버튼
  let pause = $(".controls .pause"),
    play = $(".controls .play");

  $(".controls .next").click(() => {
    mainImg_wrap.slick("slickNext");
  });
  $(".controls .prev").click(() => {
    mainImg_wrap.slick("slickPrev");
  });

  // 자동슬라이드 컨트롤러
  play.hide();

  pause.click(() => {
    pause.hide();
    play.show();
    mainImg_wrap.slick("slickPause");
  });

  play.click(() => {
    play.hide();
    pause.show();
    mainImg_wrap.slick("slickPlay");
  });

  //검색창 버튼
  let gnb = $(".gnb_search"),
    S_input = $(".gnb_search input"),
    S_btn = $(".icon_search > button");
  S_btn.click(function () {
    gnb.toggleClass("on");
    S_input.toggleClass("on");
  });

  //section01 슬라이드
  let slide_start = $(".slider_wrapper");
  let imgWidth = $(".bestList .bestItem img");
  let slide_UL = slide_start.find("ul");
  let rowgap_value = slide_UL.css("row-gap");

  slide_start.each(function () {
    let slides = slide_UL.find("li"),
      currentIdx = 0,
      slideCount = slides.length,
      slideWidth = imgWidth.width(),
      slideToShow = 4,
      prevBtn = $(this).find(".prev_btn"),
      nextBtn = $(this).find(".next_btn");

    slide_UL.width(slideWidth * slideCount + rowgap_value * (slideCount - 1));

    function moveSlide(idx) {
      slide_UL.css("left", -idx * (slideWidth + rowgap_value));
      currentIdx = idx;
    }

    // Button click event
    nextBtn.on("click", function () {
      if (currentIdx === slideCount - slideToShow) {
        moveSlide(0);
      } else {
        moveSlide(currentIdx + 1);
      }
    });
    prevBtn.on("click", function () {
      if (currentIdx === 0) {
        moveSlide(slideCount - slideToShow);
      } else {
        moveSlide(currentIdx - 1);
      }
    });
  });

  //star rating
  let rating = $(".rating");
  rating.each(function () {
    let $this = $(this);
    let scoreNum = $this.attr("data-rate");
    let scoreArr = scoreNum.split(".");
    console.log(scoreArr);
    if (scoreArr.length > 1) {
      for (let i = 0; i < scoreArr[0]; i++) {
        $this.find(".star-wrap").eq(i).find(".star").css({ width: "100%" });
      }
      $this
        .find(".star-wrap")
        .eq(scoreArr[0])
        .find(".star")
        .css({ width: scoreArr[1] + "0%" });
    } else {
      for (let i = 0; i < scoreNum; i++) {
        $this.find(".star-wrap").eq(i).find(".star").css({ width: "100%" });
      }
    }
  });

  //reponsive :aside, promo
  let screenWidth = $(window).innerWidth(),
    aside_span = $("aside span"),
    promo_p = $(".sec3_p03");

  if (screenWidth <= 500) {
    aside_span.addClass("icon-text A");
    promo_p.css({
      display: "none",
    });
  }

  //coupon
  let section5 = $(".random_coupon"),
    coupon_silver = $(".cp_before"),
    figSketch = section5.find(".notice"),
    figSketchWidth = coupon_silver.innerWidth(),
    figSketchHeight = coupon_silver.innerHeight(),
    figSketchPos = figSketch.offset();

  function event_Sketch() {
    let random_img = Math.floor(Math.random() * 3) + 1;
    let sketchDiv = `<div class="scratch"></div>`.repeat(32);
    figSketch.find(".grid").html(sketchDiv);
    figSketch
      .find(".scratch")
      .css("background-image", `url("img/main/coupon${random_img}.png")`);

    let scratch = figSketch.find(".scratch");
    scratch.each(function (idx, item) {
      scratch.eq(idx).css({
        "background-size": `${figSketchWidth}px ${figSketchHeight}px`,
        "background-position-x": `-${
          scratch.eq(idx).offset().left - figSketchPos.left
        }px`,
        "background-position-y": `-${
          scratch.eq(idx).offset().top - figSketchPos.top
        }px`,
      });
    });
    scratch.mouseover(function () {
      $(this).addClass("drawing");
      checkOpacity();
    });
  }
  event_Sketch();

  // a태그 넣어주기
  function checkOpacity() {
    let drawingbox = figSketch.find(".grid .drawing");
    let allscratch = figSketch.find(".scratch");
    let aTag = $(
      '<a href="https://marketb.kr/board/gallery/read2.html?no=1526286&board_no=2"></a>'
    );
    if (drawingbox.length === allscratch.length) {
      if (!$(".notice .grid").hasClass("done")) {
        $(".notice .grid").addClass("done");
        $(".notice .grid").append(aTag);
      }
    }
  }

  //magazine
  $("li .circle").each(function () {
    let magaInner = $(this).next();
    $(this).on("mouseover", function () {
      magaInner.css("opacity", 1);
    });
    $(this).on("mouseout", function () {
      magaInner.css("opacity", 0);
    });
    magaInner.on("mouseover", function () {
      magaInner.css("opacity", 1);
    });
    magaInner.on("mouseout", function () {
      magaInner.css("opacity", 0);
    });
  });
});
