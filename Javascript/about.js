// Counter animation for statistics
const counters = document.querySelectorAll(".stat-number");
const speed = 200;

const countUp = () => {
  counters.forEach((counter) => {
    const target = +counter.getAttribute("data-target");
    const count = +counter.innerText.replace(/[^0-9]/g, "");
    const increment = target / speed;

    if (count < target) {
      counter.innerText = Math.ceil(count + increment);
      setTimeout(countUp, 10);
    } else {
      // Add formatting for thousands
      if (target >= 1000) {
        counter.innerText = target.toLocaleString() + "+";
      } else {
        counter.innerText = target + "+";
      }
    }
  });
};

// Intersection Observer for counter animation
const statsSection = document.querySelector(".stats-section");
const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        countUp();
        statsObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

statsObserver.observe(statsSection);

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Parallax effect for hero section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector(".hero-section");
  if (hero) {
    hero.style.transform = `translateY(${scrolled * 0.5}px)`;
  }
});

// Add animation on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe all animated elements
document
  .querySelectorAll(".value-card, .team-member, .timeline-item")
  .forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "all 0.6s ease";
    observer.observe(el);
  });
