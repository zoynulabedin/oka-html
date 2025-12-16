// Wait for DOM to load
document.addEventListener("DOMContentLoaded", () => {
  console.log("One Kingdom Church website loaded!");

  // Initialize all features
  initScrollAnimations();
  initNavbar();
  initFAQ();
  initSmoothScroll();
  initParallax();
  initMobileMenu();
});

// Scroll Animations
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  }, observerOptions);

  const scrollElements = document.querySelectorAll(".scroll-animate");
  scrollElements.forEach((el) => observer.observe(el));
}

// Navbar Scroll Effect
function initNavbar() {
  // Use specific logic from about.html if standard #navbar is not appropriate or use both
  const nav = document.querySelector("nav");
  if (!nav) return;

  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      nav.classList.add("bg-white/95", "backdrop-blur-md", "shadow-md");
      nav.classList.remove("bg-transparent");
    } else {
      nav.classList.remove("bg-white/95", "backdrop-blur-md", "shadow-md");
      nav.classList.add("bg-transparent");
    }
  });

  // Preserve original #navbar logic if it exists and is different
  const navbar = document.getElementById("navbar");
  if (navbar && navbar !== nav) {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 100) {
        navbar.classList.add("shadow-lg");
      } else {
        navbar.classList.remove("shadow-lg");
      }
    });
  }
}

// FAQ Accordion
function initFAQ() {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    item.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      // Close all items
      faqItems.forEach((i) => {
        i.classList.remove("active");
        const icon = i.querySelector("span");
        if (icon) icon.textContent = "+";
      });

      // Open clicked item if it wasn't active
      if (!isActive) {
        item.classList.add("active");
        const icon = item.querySelector("span");
        if (icon) icon.textContent = "−";
      }
    });
  });
}

// Smooth Scroll for Anchor Links
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href === "#") return;

      e.preventDefault();
      const target = document.querySelector(href);

      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
}

// Parallax Effect
function initParallax() {
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll(".hero-bg");

    parallaxElements.forEach((element) => {
      const speed = 0.5;
      element.style.transform = `translateY(${scrolled * speed}px)`;
    });
  });
}

// Add hover effects to cards
const cards = document.querySelectorAll(".card, .group");
cards.forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-5px)";
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0)";
  });
});

// Animate elements on scroll
function animateOnScroll() {
  const elements = document.querySelectorAll(
    ".animate-fade-in, .animate-slide-right, .animate-slide-left"
  );

  elements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    const elementBottom = element.getBoundingClientRect().bottom;

    if (elementTop < window.innerHeight && elementBottom > 0) {
      element.style.opacity = "1";
      element.style.transform = "translateX(0) translateY(0)";
    }
  });
}

window.addEventListener("scroll", animateOnScroll);
window.addEventListener("load", animateOnScroll);

// Mobile Menu
function initMobileMenu() {
  const menuButton = document.getElementById("mobile-menu-button");
  const menu = document.getElementById("mobile-menu");
  const menuClose = document.getElementById("mobile-menu-close");

  if (!menuButton || !menu || !menuClose) return;

  menuButton.addEventListener("click", function () {
    // Remove inline styles and add active class
    menu.style.transform = "";
    menu.style.visibility = "";
    menu.style.opacity = "";
    menu.style.pointerEvents = "";
    menu.classList.add("active");
    document.body.style.overflow = "hidden"; // Prevent scrolling when menu is open
  });

  menuClose.addEventListener("click", function () {
    menu.classList.remove("active");
    // Restore inline styles after animation
    setTimeout(() => {
      if (!menu.classList.contains("active")) {
        menu.style.transform = "translateX(-100%)";
        menu.style.visibility = "hidden";
        menu.style.opacity = "0";
        menu.style.pointerEvents = "none";
      }
    }, 400); // Match transition duration
    document.body.style.overflow = ""; // Restore scrolling
  });

  // Close menu when clicking on a link
  const menuLinks = menu.querySelectorAll("a");
  menuLinks.forEach((link) => {
    link.addEventListener("click", function () {
      menu.classList.remove("active");
      setTimeout(() => {
        if (!menu.classList.contains("active")) {
          menu.style.transform = "translateX(-100%)";
          menu.style.visibility = "hidden";
          menu.style.opacity = "0";
          menu.style.pointerEvents = "none";
        }
      }, 400);
      document.body.style.overflow = "";
    });
  });
}
