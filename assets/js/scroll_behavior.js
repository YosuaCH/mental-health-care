let isScrolling = false;
let scrollTimeout = null;
let isTrackpad = false;

window.addEventListener(
  "wheel",
  (e) => {
    if (Math.abs(e.deltaY) < 50) {
      isTrackpad = true;
    }

    if (isTrackpad) {
      if (isScrolling) return;

      e.preventDefault();
      isScrolling = true;

      const sections = document.querySelectorAll("section");
      const currentScroll = window.scrollY;
      const windowHeight = window.innerHeight;

      let currentIndex = 0;
      sections.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        if (Math.abs(sectionTop - currentScroll) < windowHeight / 2) {
          currentIndex = index;
        }
      });

      let targetSection = null;
      if (e.deltaY > 0) {
        targetSection = sections[currentIndex + 1];
      } else {
        targetSection = sections[currentIndex - 1];
      }

      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }

      setTimeout(() => {
        isScrolling = false;
      }, 800);
    } else {
      e.preventDefault();

      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }

      scrollTimeout = setTimeout(() => {
        if (isScrolling) return;

        isScrolling = true;

        const sections = document.querySelectorAll("section");
        const currentScroll = window.scrollY;
        const windowHeight = window.innerHeight;

        let currentIndex = 0;
        sections.forEach((section, index) => {
          const sectionTop = section.offsetTop;
          if (Math.abs(sectionTop - currentScroll) < windowHeight / 2) {
            currentIndex = index;
          }
        });

        let targetSection = null;
        if (e.deltaY > 0) {
          targetSection = sections[currentIndex + 1];
        } else {
          targetSection = sections[currentIndex - 1];
        }

        if (targetSection) {
          targetSection.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }

        setTimeout(() => {
          isScrolling = false;
        }, 800);
      }, 100);
    }
  },
  { passive: false },
);

// Disable default scroll behavior
