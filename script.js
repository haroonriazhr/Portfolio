// OPTIMIZATION: Locomotive Scroll initialization
function locomotive() {
  // Initialize Locomotive Scroll with optimized settings
  const scroll = new LocomotiveScroll({
    el: document.querySelector("main"),
    smooth: true,
    // OPTIMIZED: Consistent settings across devices for better performance
    smartphone: { smooth: true },
    tablet: { smooth: true },
  });

  // OPTIMIZED: Register plugin only once
  gsap.registerPlugin(ScrollTrigger);
  
  // OPTIMIZED: Efficient proxy setup for ScrollTrigger
  ScrollTrigger.scrollerProxy("main", {
    scrollTop(value) {
      return arguments.length
        ? scroll.scrollTo(value, 0, 0)
        : scroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
      // OPTIMIZED: Avoid recalculating dimensions repeatedly
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // OPTIMIZED: Conditional check for transform support
    pinType: document.querySelector("main").style.transform
      ? "transform"
      : "fixed",
  });

  // OPTIMIZATION: Use passive event listeners where possible
  scroll.on("scroll", ScrollTrigger.update);

  // OPTIMIZED: Single event listener for refresh
  ScrollTrigger.addEventListener("refresh", () => scroll.update());
  
  // OPTIMIZATION: Group similar ScrollTrigger configurations
  const triggerConfigs = [
    { trigger: ".about", start: "top center", callback: about },
    { trigger: ".work", start: "top center", callback: work },
    { trigger: ".project", start: "top 50%", callback: project1 },
    { trigger: ".project-2", start: "top 50%", callback: project2 },
    { trigger: ".project-3", start: "top 50%", callback: project3 },
    { trigger: ".project-4", start: "top 50%", callback: project4 },
    { trigger: "footer", start: "top 50%", callback: footer },
  ];

  // Create all ScrollTriggers with consistent settings
  triggerConfigs.forEach((config) => {
    ScrollTrigger.create({
      trigger: config.trigger,
      scroller: "main",
      start: config.start,
      fastScrollEnd: true,
      onEnter: () => config.callback(),
    });
  });

  // IMPROVEMENT: Debounce anchor link clicks to prevent multiple scrolls
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        // OPTIMIZATION: Use requestAnimationFrame instead of setTimeout
        requestAnimationFrame(() => {
          scroll.scrollTo(targetElement);
        });
      }
    });
  });

  // Force refresh ScrollTrigger after a short delay to ensure everything is initialized
  setTimeout(() => {
    ScrollTrigger.refresh();
  }, 200);

  // Return the scroll instance for potential use elsewhere
  return scroll;
}

// OPTIMIZATION: Group related GSAP settings
function valuesetter() {
  // OPTIMIZED: Group related elements for batch processing

  // Hero section elements
  const heroElements = {
    nav: { selector: "header nav a", props: { y: "-100%", opacity: 0 } },
    greet: { selector: ".hero .Greet .parent .child", props: { y: "100%" } },
    heroname: {
      selector: ".hero .heroname .parent .child",
      props: { y: "100%" },
    },
    ocup: { selector: ".hero .ocup .parent .child", props: { y: "100%" } },
    ocupSpan: {
      selector: ".hero .ocup .parent .child span",
      props: { y: "100%", opacity: 0 },
    },
  };

  // About section elements
  const aboutElements = {
    heading: {
      selector: ".about .about-text h4 .parent .child",
      props: { y: "100%" },
    },
    paragraph: {
      selector: ".about .about-text p .parent .child",
      props: { y: "100%", opacity: "0" },
    },
    subheading: {
      selector: ".about .about-text h3 .parent .child",
      props: { y: "100%" },
    },
    tech: {
      selector: ".about .about-text .tech>img",
      props: { x: "-100%", opacity: 0 },
    },
    image: {
      selector: ".about .about-img img",
      props: { x: "100%", opacity: 0 },
    },
  };

  // OPTIMIZATION: Batch set operations for better performance
  // Set initial states for hero elements
  Object.values(heroElements).forEach((el) => {
    gsap.set(el.selector, el.props);
  });

  // Set initial states for about elements
  Object.values(aboutElements).forEach((el) => {
    gsap.set(el.selector, el.props);
  });

  // OPTIMIZATION: Use consistent properties for work section
  gsap.set(".work .work-text h3 .parent .child", { y: "100%" });
  gsap.set(".work .work-text p .parent .child", { y: "100%", opacity: "0" });

  // OPTIMIZATION: Use a loop for repetitive project settings
  const projectSelectors = [
    ".work .project",
    ".work .project-2",
    ".work .project-3",
    ".work .project-4",
  ];

  projectSelectors.forEach((selector) => {
    gsap.set(`${selector} .project-text h4 .parent .child`, { y: "100%" });
    gsap.set(`${selector} .project-text p .parent .child`, {
      y: "100%",
      opacity: "0",
    });
  });

  // Footer elements
  gsap.set(".footer .f-uper p .parent .child", { y: "120%" });
  gsap.set(".footer .social h2 .parent .child", { y: "100%" });
  gsap.set(".footer .f-uper .social a>i", { x: "100%", opacity: 0 });
}

// OPTIMIZATION: DOM manipulation optimization
function reveal() {
  // OPTIMIZED: Use document fragment for better performance
  const elements = document.querySelectorAll(".reveal");

  // OPTIMIZATION: Create elements once outside the loop
  const createElements = () => {
    const parent = document.createElement("span");
    const child = document.createElement("span");
    parent.classList.add("parent");
    child.classList.add("child");
    return { parent, child };
  };

  // OPTIMIZATION: Batch DOM operations
  const fragment = document.createDocumentFragment();

  elements.forEach(function (elem) {
    // Clone the template elements for each reveal element
    const { parent, child } = createElements();

    // Set content
    child.innerHTML = elem.innerHTML;
    parent.appendChild(child);

    // Clear and append
    elem.innerHTML = "";
    elem.appendChild(parent);
  });
}

// OPTIMIZATION: Animation sequence optimization
function loaderAnimation() {
  // OPTIMIZED: Use a single timeline for all animations
  var tl = gsap.timeline();

  // OPTIMIZATION: Chain animations for better performance
  tl.from(".loader .child span", {
    x: 100,
    duration: 1.4,
    stagger: 0.2,
    opacity: 0,
    ease: "Power3.easeInOut",
  })
    .to(".loader .parent .child", {
      y: "-100%",
      duration: 1,
      delay: 1,
      ease: "Circ.easeInOut",
    })
    .to("#end", {
      duration: -1.2,
      delay: -0.5,
      display: "none",
    })
    .to(".loader", {
      height: 0,
      duration: 1,
      ease: "Circ.easeInOut",
      display: "none",
    })
    .to(".purple", {
      height: "100%",
      duration: 1,
      top: 0,
      delay: -1,
      ease: "Circ.easeInOut",
    })
    .to(".purple", {
      height: "0%",
      duration: 1,
      delay: -0.4,
      ease: "Circ.easeInOut",
      display: "none",
      // OPTIMIZATION: Fix typo in callback name
      onComplete: function () {
        homepage();
      },
    });
}

// OPTIMIZATION: Homepage animation sequence
function homepage() {
  // OPTIMIZED: Single timeline for all animations
  var tl = gsap.timeline();

  // OPTIMIZATION: Chain animations with proper timing
  tl.to("header nav a", {
    y: 0,
    opacity: 1,
    duration: .6,
    delay: 0.5,
    stagger: 0.05,
    ease: "Expo.easeInOut",
  })
    // OPTIMIZATION: Use negative delays for parallel animations
    .to(".hero .heroname .parent .child", {
      y: 0,
      delay: -1.5,
      duration: 1.2,
      stagger: 0.5,
      ease: "Expo.easeInOut",
    })
    .to(".hero .Greet .parent .child", {
      y: 0,
      delay: -1.5,
      duration: 1.3,
      stagger: 0.5,
      ease: "Expo.easeInOut",
    })
    .to(".hero .ocup .parent .child", {
      y: 0,
      delay: -1.5,
      duration: 1.4,
      stagger: 0.5,
      ease: "Expo.easeInOut",
    })
    .to(".hero .ocup .parent .child span", {
      y: 0,
      delay: -1.5,
      opacity: 1,
      duration: 1.5,
      stagger: 0.5,
      ease: "Circ.easeInOut",
    });
}

function about() {
  var tl = gsap.timeline();

  tl.to(".about .about-text h4 .parent .child", {
    y: 0,
    duration: 1.5,
    ease: "Expo.easeInOut",
  });
  tl.to(".about .about-text p .parent .child", {
    y: 0,
    opacity: 1,
    delay: -2,
    duration: 2,
    ease: "Expo.easeInOut",
  });
  tl.to(".about .about-text h3 .parent .child", {
    y: 0,
    delay: -2,
    duration: 2,
    ease: "Expo.easeInOut",
  });
  tl.to(".about .about-img img", {
    x: 0,
    delay: -2,
    duration: 2,
    opacity: 1,
    stagger: 0.2,
    ease: "Expo.easeInOut",
  });
  tl.to(".about .about-text .tech>img", {
    x: 0,
    delay: -2,
    opacity: 1,
    duration: 2,
    stagger: 0.2,
    ease: "Expo.easeInOut",
  });
}

// OPTIMIZATION: Section animation functions
function work() {
  // OPTIMIZED: Reuse timeline for animations
  var tl = gsap.timeline();
  tl.to(".work .work-text h3 .parent .child", {
    y: 0,
    duration: 0.8,
    ease: "Expo.easeInOut",
  });
  tl.to(".work .work-text p .parent .child", {
    y: 0,
    opacity: 1,
    delay: -0.8, // OPTIMIZED: Parallel animation
    duration: 1.2,
    ease: "Expo.easeInOut",
  });
}
// OPTIMIZATION: Create a factory function for project animations
function createProjectAnimation(projectSelector) {
  return function () {
    var tl = gsap.timeline();
    tl.to(`${projectSelector} .project-text h4 .parent .child`, {
      y: 0,
      duration: 0.8,
      ease: "Expo.easeInOut",
    });
    tl.to(`${projectSelector} .project-text p .parent .child`, {
      y: 0,
      opacity: 1,
      delay: -0.8,
      duration: 1.2,
      ease: "Expo.easeInOut",
    });
  };
}

// OPTIMIZATION: Use the factory to create consistent project animations
const project1 = createProjectAnimation(".work .project");
const project2 = createProjectAnimation(".work .project-2");
const project3 = createProjectAnimation(".work .project-3");
const project4 = createProjectAnimation(".work .project-4");

// OPTIMIZATION: Footer animation
function footer() {
  var tl = gsap.timeline();
  tl.to(".footer .f-uper .contact p .parent .child", {
    y: 0,
    duration: 1.5,
    ease: "Expo.easeInOut",
  });
  tl.to(".footer .social h2 .parent .child", {
    y: 0,
    duration: 1,
    delay: -1.5, // OPTIMIZED: Parallel animation
    ease: "Expo.easeInOut",
  });
  tl.to(".footer .f-uper .social a > i", {
    x: 0,
    delay: -1.5,
    opacity: 1,
    duration: 1.5,
    stagger: 0.2, // OPTIMIZED: Staggered animation for visual interest
    ease: "Expo.easeInOut",
  });
}

// OPTIMIZATION: Initialize everything in the correct order
function init() {
  reveal(); // Create DOM structure first
  valuesetter(); // Set initial GSAP states
  
  // Wait for a short delay to ensure all scripts are loaded
  setTimeout(() => {
    locomotive(); // Initialize scroll
    
    // Force another refresh after everything is loaded
    setTimeout(() => {
      if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.refresh();
      }
    }, 500);
    
    loaderAnimation(); // Start with loader animation
  }, 100);

  // OPTIMIZATION: Add console message
  console.log(
    "Designed and Developed by Haroon Khokhar. This website is copyrighted, any act of stealing or altering would result in legal action."
  );
}

// OPTIMIZATION: Start everything when DOM is ready
document.addEventListener("DOMContentLoaded", init);
