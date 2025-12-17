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
  initCoreBeliefsTabs();
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
  const nav = document.querySelector("nav");
  if (!nav) return;

  // Get custom scroll background from data attribute or default to white/95
  const scrollBgClass = nav.getAttribute("data-scroll-bg") || "bg-white/95";
  const scrollBg = scrollBgClass.split(" ");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      nav.classList.add(...scrollBg, "backdrop-blur-md", "shadow-md");
      nav.classList.remove("bg-transparent");
    } else {
      nav.classList.remove(...scrollBg, "backdrop-blur-md", "shadow-md");
      nav.classList.add("bg-transparent");
    }
  });
}

// FAQ Accordion
function initFAQ() {
  // Check if we are using the detailed FAQ structure (with .faq-question)
  const faqQuestions = document.querySelectorAll(".faq-question");

  if (faqQuestions.length > 0) {
    faqQuestions.forEach((question) => {
      question.addEventListener("click", function () {
        const faqItem = this.closest(".faq-item");
        const answer = faqItem.querySelector(".faq-answer");
        const icon = faqItem.querySelector(".faq-icon");

        // Toggle answer visibility
        answer.classList.toggle("hidden");

        // Toggle icon
        if (icon) {
          if (answer.classList.contains("hidden")) {
            icon.textContent = "+";
          } else {
            icon.textContent = "−";
          }
        }
      });
    });
  } else {
    // Fallback for simpler FAQ structure if any
    const faqItems = document.querySelectorAll(".faq-item");
    faqItems.forEach((item) => {
      item.addEventListener("click", (e) => {
        // Prevent triggering if we clicked a button inside (handled above if .faq-question exists)
        if (e.target.closest(".faq-question")) return;

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
}

// ... (initSmoothScroll, initParallax, etc. - ensure these are preserved if I am not replacing them) ...
// Wait, I am replacing a chunk. I need to be careful with range.
// The range selected to replace is lines 63 to 201 in the original file.
// I must provide all code between those lines.

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

  if (!menuButton || !menu) return;

  menuButton.addEventListener("click", function () {
    if (menuClose && menu.classList.contains("mobile-menu-overlay")) {
      // Overlay Menu Style (about.html)
      menu.style.transform = "";
      menu.style.visibility = "";
      menu.style.opacity = "";
      menu.style.pointerEvents = "";
      menu.classList.add("active");
      document.body.style.overflow = "hidden";
    } else {
      // Simple Toggle Style (index.html, sundays.html, etc.)
      menu.classList.toggle("hidden");
    }
  });

  if (menuClose) {
    menuClose.addEventListener("click", function () {
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
}

// Core Beliefs Tabs
function initCoreBeliefsTabs() {
  const tabs = document.querySelectorAll(".belief-tab");
  const contents = document.querySelectorAll(".tab-content");

  if (tabs.length === 0) return;

  tabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      const targetTab = this.getAttribute("data-tab");

      // Remove active class from all tabs
      tabs.forEach((t) => {
        t.classList.remove("active");
        t.classList.remove("border-white");
        t.classList.add("border-transparent");
      });

      // Add active class to clicked tab
      this.classList.add("active");
      this.classList.remove("border-transparent");
      this.classList.add("border-white");

      // Hide all content
      contents.forEach((content) => {
        content.classList.add("hidden");
        content.classList.remove("active");
      });

      // Show target content
      const targetContent = document.getElementById(targetTab + "-content");
      if (targetContent) {
        targetContent.classList.remove("hidden");
        targetContent.classList.add("active");
      }
    });
  });
}
