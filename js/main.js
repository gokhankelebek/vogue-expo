// Navigation
document.addEventListener("DOMContentLoaded", () => {
  // Replace video source with a high-quality expo video
  const heroVideo = document.querySelector(".hero__video video source");
  if (heroVideo) {
    heroVideo.src =
      "https://player.vimeo.com/external/437377839.sd.mp4?s=0c76e0398b29f73f00ea53c5607b8f1e4535a339&profile_id=164&oauth2_token_id=57447761";
  }

  const navToggle = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");

  // Toggle mobile menu
  navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
  });

  // Close mobile menu when clicking a nav link
  document.querySelectorAll(".nav__link").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
    });
  });

  // Change navigation background on scroll
  window.addEventListener("scroll", () => {
    const nav = document.querySelector(".nav");
    if (window.scrollY > 50) {
      nav.style.background = "rgba(255, 255, 255, 0.95)";
      nav.style.backdropFilter = "blur(10px)";
    } else {
      nav.style.background = "var(--color-background)";
      nav.style.backdropFilter = "none";
    }
  });
});

// Portfolio Gallery
const galleryData = [
  {
    image: "assets/DALL·E 2025-02-09 09.35.16 - An elegant and high-end luxury fashion expo stand set in a premium exhibition space. The stand features a minimalist boutique-style layout with carefu.webp",
    title: "Luxury Fashion Showcase",
    description: "Minimalist boutique-style layout with premium finishes",
  },
  {
    image: "assets/DALL·E 2025-02-09 09.35.14 - A cutting-edge smart home and IoT technology expo stand designed to showcase the latest innovations in home automation. The stand features interactive.webp",
    title: "Smart Home Innovation Hub",
    description: "Interactive IoT technology showcase with live demos",
  },
  {
    image: "assets/DALL·E 2025-02-09 09.35.11 - A futuristic and immersive gaming and e-sports expo stand featuring a sleek, high-tech design. The stand includes multiple gaming stations with high-p.webp",
    title: "E-Sports Arena",
    description: "Immersive gaming experience with high-tech stations",
  },
  {
    image: "assets/DALL·E 2025-02-09 09.35.07 - A highly realistic and professional electric vehicle and charging solutions expo stand set in a modern exhibition hall. The stand features a futuristi.webp",
    title: "EV Innovation Center",
    description: "Futuristic showcase of electric vehicle solutions",
  },
  {
    image: "assets/DALL·E 2025-02-09 09.35.01 - A highly realistic and professional university and academic institution expo stand set in a modern exhibition hall. The stand features a clean and inv.webp",
    title: "Academic Excellence",
    description: "Modern educational institution showcase",
  },
  {
    image: "assets/DALL·E 2025-02-09 09.34.49 - A visually appealing and modern food franchise expo stand with minimal text. The design focuses on vibrant food imagery, with high-quality photos of d.webp",
    title: "Culinary Showcase",
    description: "Vibrant food franchise presentation",
  }
];

const workGallery = document.getElementById("work-gallery");
if (workGallery) {
  galleryData.forEach((item) => {
    const galleryItem = document.createElement("div");
    galleryItem.className = "gallery__item";
    galleryItem.innerHTML = `
      <img src="${item.image}" alt="${item.title}" loading="lazy">
      <div class="gallery__overlay">
        <h3>${item.title}</h3>
        <p>${item.description}</p>
      </div>
    `;
    
    // Add click event to the gallery item
    galleryItem.addEventListener("click", () => {
      openLightbox(item.image, item.title);
    });
    
    workGallery.appendChild(galleryItem);
  });
}

// Lightbox functionality
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const lightboxClose = document.querySelector(".lightbox__close");

// Function to open lightbox
function openLightbox(imageSrc, title = '') {
  lightboxImage.src = imageSrc;
  lightboxImage.alt = title;
  lightbox.classList.add("active");
  document.body.style.overflow = "hidden"; // Prevent scrolling
}

// Function to close lightbox
function closeLightbox() {
  lightbox.classList.remove("active");
  document.body.style.overflow = ""; // Restore scrolling
  setTimeout(() => {
    lightboxImage.src = ''; // Clear the source after animation
  }, 300);
}

// Close lightbox when clicking close button
lightboxClose.addEventListener("click", (e) => {
  e.stopPropagation();
  closeLightbox();
});

// Close lightbox when clicking outside the image
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    closeLightbox();
  }
});

// Close lightbox when pressing Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && lightbox.classList.contains("active")) {
    closeLightbox();
  }
});

// Testimonials Slider
const testimonialData = [
  {
    text: "Vogue Expo transformed our trade show presence. Their innovative design attracted twice the foot traffic compared to our previous booths.",
    author: "Sarah Johnson",
    company: "Tech Innovations Inc.",
    image:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
  },
  {
    text: "The attention to detail and project management were exceptional. Our sustainable booth design received numerous compliments.",
    author: "Michael Chen",
    company: "Global Solutions Ltd.",
    image:
      "https://images.unsplash.com/photo-1556157382-97eda2d62296?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
  },
  // Add more testimonials as needed
];

const testimonialsSlider = document.getElementById("testimonials-slider");
if (testimonialsSlider) {
  testimonialData.forEach((item) => {
    const testimonialCard = document.createElement("div");
    testimonialCard.className = "testimonial__card";
    testimonialCard.innerHTML = `
        <p class="testimonial__text">${item.text}</p>
        <div class="testimonial__author">
            <div class="author__image">
                <img src="${item.image}" alt="${item.author}" loading="lazy">
            </div>
            <div class="author__info">
                <h4>${item.author}</h4>
                <p>${item.company}</p>
            </div>
        </div>
    `;
    testimonialsSlider.appendChild(testimonialCard);
  });
}

// Contact Form Handling
const contactForm = document.getElementById("contact-form");
if (contactForm) {
  // Form validation
  const validateForm = (formData) => {
    const errors = [];
    const email = formData.get("email");
    const phone = formData.get("phone");

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.push("Please enter a valid email address");
    }

    // Phone validation (optional)
    if (phone) {
      const phoneRegex = /^\+?[\d\s-]{10,}$/;
      if (!phoneRegex.test(phone)) {
        errors.push("Please enter a valid phone number");
      }
    }

    // Name validation
    if (formData.get("name").length < 2) {
      errors.push("Name must be at least 2 characters long");
    }

    // Company validation
    if (formData.get("company").length < 2) {
      errors.push("Company name must be at least 2 characters long");
    }

    // Message validation
    if (formData.get("message").length < 10) {
      errors.push("Message must be at least 10 characters long");
    }

    return errors;
  };

  // Show form feedback
  const showFormFeedback = (message, isError = false) => {
    const feedbackDiv = document.createElement("div");
    feedbackDiv.className = `form__feedback ${
      isError ? "form__feedback--error" : "form__feedback--success"
    }`;
    feedbackDiv.textContent = message;

    // Remove any existing feedback
    const existingFeedback = contactForm.querySelector(".form__feedback");
    if (existingFeedback) {
      existingFeedback.remove();
    }

    // Insert feedback after form header
    const formHeader = contactForm.querySelector(".form__header");
    formHeader.insertAdjacentElement("afterend", feedbackDiv);

    // Remove feedback after 5 seconds
    setTimeout(() => {
      feedbackDiv.remove();
    }, 5000);
  };

  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(contactForm);

    // Validate form
    const errors = validateForm(formData);

    if (errors.length > 0) {
      showFormFeedback(errors.join(". "), true);
      return;
    }

    try {
      // Disable submit button and show loading state
      const submitButton = contactForm.querySelector('button[type="submit"]');
      const originalButtonText = submitButton.textContent;
      submitButton.disabled = true;
      submitButton.innerHTML =
        '<i class="fas fa-spinner fa-spin"></i> Sending...';

      // Convert FormData to object
      const data = Object.fromEntries(formData.entries());

      // Here you would typically send the data to your backend
      // For demonstration, we'll simulate an API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Form submitted:", data);

      // Show success message
      showFormFeedback(
        "Thank you for your message! We will contact you shortly."
      );

      // Reset form
      contactForm.reset();

      // Reset button state
      submitButton.disabled = false;
      submitButton.textContent = originalButtonText;
    } catch (error) {
      console.error("Error submitting form:", error);
      showFormFeedback(
        "There was an error submitting the form. Please try again.",
        true
      );
    }
  });

  // Real-time field validation
  const formInputs = contactForm.querySelectorAll("input, textarea, select");
  formInputs.forEach((input) => {
    input.addEventListener("blur", () => {
      if (input.required && !input.value) {
        input.classList.add("form__input--error");
      } else {
        input.classList.remove("form__input--error");
      }
    });

    input.addEventListener("input", () => {
      input.classList.remove("form__input--error");
    });
  });
}

// Chat Widget
const chatWidget = document.querySelector(".chat-widget__button");
if (chatWidget) {
  chatWidget.addEventListener("click", () => {
    // Here you would typically initialize your chat widget
    // For demonstration, we'll just show an alert
    alert("Chat functionality coming soon!");
  });
}

// Smooth Scroll
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

// Animations on Scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate");
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe elements to animate
document
  .querySelectorAll(
    ".section__title, .service__card, .gallery__item, .testimonial__card"
  )
  .forEach((el) => {
    observer.observe(el);
  });

// Add styles for form feedback and validation
const style = document.createElement("style");
style.textContent = `
    .form__feedback {
        padding: 1rem;
        margin-bottom: 1.5rem;
        border-radius: 0.5rem;
        font-size: 0.875rem;
        animation: slideFadeIn 0.3s ease-out;
    }

    .form__feedback--success {
        background-color: #ecfdf5;
        color: #047857;
        border: 1px solid #047857;
    }

    .form__feedback--error {
        background-color: #fef2f2;
        color: #dc2626;
        border: 1px solid #dc2626;
    }

    .form__input--error {
        border-color: #dc2626 !important;
    }

    @keyframes slideFadeIn {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .fa-spinner {
        margin-right: 0.5rem;
    }
`;
document.head.appendChild(style);
