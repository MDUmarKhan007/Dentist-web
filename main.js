document.addEventListener("DOMContentLoaded", function () {
  const mobileMenuIcon = document.querySelector(".mobile-menu-icon");
  const mainNav = document.querySelector(".main-nav");

  if (mobileMenuIcon && mainNav) {
    mobileMenuIcon.addEventListener("click", () => {
      mainNav.classList.toggle("active");
    });
  }

  function scrollHeader() {
    const header = document.getElementById("header");
    if (this.scrollY >= 80) header.classList.add("scroll-header");
    else header.classList.remove("scroll-header");
  }
  window.addEventListener("scroll", scrollHeader);

  // // Smooth Scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // ===========================
  // Carousel (Only if present)
  // ===========================

  const carousel = document.querySelector(".carousel");
  const wrapper = document.querySelector(".wrapper");

  if (carousel && wrapper) {
    const card2 = carousel.querySelector(".card2");
    const arrowBtns = document.querySelectorAll(".wrapper i");
    const firstCardWidth = carousel.querySelector(".card2").offsetWidth;
    const carouselChildren = [...carousel.children];

    let isDragging = false,
      startX,
      startScrollLeft,
      timeoutId;

    //get the number of card that can be left in the carousel at once
    let cardPreview = Math.round(carousel.offsetWidth / firstCardWidth);

    // insert the cards in the carousel for infinite scroll
    carouselChildren
      .slice(-cardPreview)
      .reverse()
      .forEach((card) => {
        carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
      });

    // insert copies of the first cards in the carousel for infinite scroll
    carouselChildren.slice(0, cardPreview).forEach((card) => {
      carousel.insertAdjacentHTML("beforeend", card.outerHTML);
    });

    arrowBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        carousel.scrollLeft +=
          btn.id === "left" ? -firstCardWidth : firstCardWidth;
      });
    });
    const dragStart = (e) => {
      isDragging = true;
      carousel.classList.add("dragging");
      startX = e.pageX;
      startScrollLeft = carousel.scrollLeft;
    };

    const dragging = (e) => {
      if (!isDragging) return;
      carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
    };
    const dragStop = () => {
      isDragging = false;
      carousel.classList.remove("dragging");
    };
    const autoPlay = () => {
      if (window.innerWidth < 800) return; // return if window is small than 800px
      // get the current autoplay scroll position
      timeoutId = setTimeout(() => (carousel.scrollLeft += firstCardWidth), 2500);
    };
    autoPlay();

    const InfiniteScroll = () => {
      //carousel is at the begging scroll to the end
      if (carousel.scrollLeft === 0) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth - (2 * carousel.offsetWidth);
        carousel.classList.remove("no-transition");
      }

      //carousel is at the end of the begging
      else if (
        Math.ceil(carousel.scrollLeft) ===
        carousel.scrollWidth - carousel.offsetWidth
      ) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition");
      }

      // start and stop auto play
      clearTimeout(timeoutId);
      if (!wrapper.matches(":hover")) autoPlay();
    };


    carousel.addEventListener("mousemove", dragging);
    carousel.addEventListener("mousedown", dragStart);
    carousel.addEventListener("mouseup", dragStop);
    carousel.addEventListener("scroll", InfiniteScroll);
  }


  const resizable = document.getElementById("resizable");
  const handle = document.getElementById("sliderHandle");
  const beforeBtn = document.getElementById("beforeBtn");
  const afterBtn = document.getElementById("afterBtn");
  const container = document.querySelector(".comparison-wrapper2");

  // Drag functionality
  if (resizable && handle && beforeBtn && afterBtn && container) {
    handle.addEventListener("mousedown", function (e) {
      document.onmousemove = function (event) {
        let rect = container.getBoundingClientRect();
        let offsetX = event.clientX - rect.left;
        offsetX = Math.max(0, Math.min(offsetX, rect.width));
        let percent = (offsetX / rect.width) * 100;
        resizable.style.width = percent + "%";
        handle.style.left = percent + "%";
      };
      document.onmouseup = function () {
        document.onmousemove = null;
      };
    });

    // Click Buttons
    beforeBtn.addEventListener("click", () => {
      resizable.style.width = "100%";
      handle.style.left = "100%";
    });

    afterBtn.addEventListener("click", () => {
      resizable.style.width = "0%";
      handle.style.left = "0%";
    });
  }
  //FAQ JS
  const accordionItems = document.querySelectorAll('.accordion-item');

  accordionItems.forEach(item => {
    const title = item.querySelector('.accordion-title');

    title.addEventListener('click', () => {
      const openItem = document.querySelector('.accordion-item.active');

      if (openItem && openItem !== item) {
        openItem.classList.remove('active');
      }

      item.classList.toggle('active');
    });
  });

  // video player 
  document.getElementById('videoSection').addEventListener('click', () => {
    document.getElementById('videoSection').classList.add('d-none');
    document.getElementById('videoFrame').classList.remove('d-none');
  });


  // case stories js
  const slider = document.getElementById('sliderBar');
  const beforeImg = document.querySelector('.before-img img');
  const containercase = document.getElementById('beforeAfter');

  containercase.addEventListener('mousemove', (e) => {
    const rect = containercase.getBoundingClientRect();
    let pos = ((e.clientX - rect.left) / rect.width) * 100;
    if (pos < 0) pos = 0;
    if (pos > 100) pos = 100;
    beforeImg.style.clipPath = `inset(0 ${100 - pos}% 0 0)`;
    slider.style.left = `${pos}%`;
  });

  containercase.addEventListener('touchmove', (e) => {
    const rect = containercase.getBoundingClientRect();
    let touch = e.touches[0];
    let pos = ((touch.clientX - rect.left) / rect.width) * 100;
    if (pos < 0) pos = 0;
    if (pos > 100) pos = 100;
    beforeImg.style.clipPath = `inset(0 ${100 - pos}% 0 0)`;
    slider.style.left = `${pos}%`;
  });





  // Example for a smooth scroll if you add anchor links later
  // document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  //     anchor.addEventListener('click', function (e) {
  //         e.preventDefault();
  //         document.querySelector(this.getAttribute('href')).scrollIntoView({
  //             behavior: 'smooth'
  //         });
  //     });
  // });
});
