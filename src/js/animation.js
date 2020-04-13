import gsap from "gsap";

let revealBtn = (div, dur) => {
  gsap.set(div, {
    visibility: "visible",
  });
  gsap.from(div, dur, {
    x: -100,
    ease: "power3.inOut",
  });
};

export { revealBtn };
