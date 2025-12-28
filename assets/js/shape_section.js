const shape = document.getElementById("shape");

window.addEventListener("scroll", () => {
  const section = shape.closest("section");
  const sectionTop = section.offsetTop;
  const sectionHeight = section.offsetHeight;
  const scrollY = window.scrollY;

  const progress = Math.min(
    Math.max(
      (scrollY - sectionTop + window.innerHeight) /
        (sectionHeight + window.innerHeight),
      0
    ),
    1
  );
  const scale = 0.3 + progress * 10;

  shape.style.setProperty("--scale", scale);
});
