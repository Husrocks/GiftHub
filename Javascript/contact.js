// Form submission
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // Show loading animation on button
  const submitBtn = this.querySelector(".submit-btn");
  const originalText = submitBtn.innerHTML;
  submitBtn.innerHTML = "<span>Sending...</span>";
  submitBtn.disabled = true;

  // Simulate form submission
  setTimeout(() => {
    // Reset form
    this.reset();
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;

    // Show success modal
    document.getElementById("successModal").style.display = "block";
  }, 1500);
});

// Close modal
function closeModal() {
  document.getElementById("successModal").style.display = "none";
}

// Click outside modal to close
window.onclick = function (event) {
  const modal = document.getElementById("successModal");
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// FAQ Toggle
function toggleFAQ(element) {
  const faqItem = element.parentElement;
  faqItem.classList.toggle("active");
}

// Newsletter form
document
  .querySelector(".newsletter-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const email = this.querySelector(".newsletter-input").value;
    alert(`Thank you for subscribing with email: ${email}`);
    this.reset();
  });

// Smooth scroll for anchor links
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

// Add floating label effect
const formInputs = document.querySelectorAll(
  ".form-group input, .form-group textarea, .form-group select"
);
formInputs.forEach((input) => {
  input.addEventListener("focus", function () {
    this.parentElement.classList.add("focused");
  });

  input.addEventListener("blur", function () {
    if (!this.value) {
      this.parentElement.classList.remove("focused");
    }
  });
});

// Parallax effect for hero
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector(".hero-section");
  if (hero) {
    hero.style.transform = `translateY(${scrolled * 0.5}px)`;
  }
});

// Animate elements on scroll
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

// Observe animated elements
document
  .querySelectorAll(".contact-card, .faq-item, .hours-card")
  .forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "all 0.6s ease";
    observer.observe(el);
  });

// Phone number formatting
document.getElementById("phone").addEventListener("input", function (e) {
  let value = e.target.value.replace(/\D/g, "");
  if (value.length > 0) {
    if (value.length <= 3) {
      value = `(${value}`;
    } else if (value.length <= 6) {
      value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
    } else {
      value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(
        6,
        10
      )}`;
    }
  }
  e.target.value = value;
});
