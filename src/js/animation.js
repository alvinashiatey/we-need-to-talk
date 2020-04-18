import gsap from "gsap";

let revealBtn = (div, dur) => {
  gsap.set(div, {
    visibility: "visible",
  });
  gsap.from(div, dur, {
    x: -100,
    opacity: 0,
    ease: "power3.inOut",
  });
};

let revealAboutUs = (div1, dur1) => {
  gsap.set(div1, { visibility: "visible" });
  gsap.to(div1, dur1, {
    x: 40,
    ease: "power3.inOut",
  });
};

let hideAboutUs = (div1, dur1) => {
  gsap.to(div1, dur1, {
    x: -300,
    ease: "power3.inOut",
  });
  gsap.set(div1, { visibility: "hidden", delay: dur1 });
};

let revealparagraph = (str, dur2) => {
  gsap.from(str, dur2, {
    y: 13,
    opacity: 0,
    ease: "power3.in",
    stagger: 0.1,
  });
};

export { revealBtn, revealAboutUs, hideAboutUs, revealparagraph };
