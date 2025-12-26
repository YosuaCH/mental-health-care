const section = document.getElementById("scroll-section");
const steps = document.querySelectorAll(".step");

window.addEventListener("scroll", () => {
  const rect = section.getBoundingClientRect();
  const maxScroll = section.offsetHeight - window.innerHeight;

  const progress = Math.min(Math.max(-rect.top / maxScroll, 0), 1);

  const activeStep = Math.floor(progress * steps.length);

  steps.forEach((el, index) => {
    if (index <= activeStep) {
      el.classList.remove("opacity-0", "translate-y-10");
    } else {
      el.classList.add("opacity-0", "translate-y-10");
    }
  });
});
