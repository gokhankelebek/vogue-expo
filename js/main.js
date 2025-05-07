// Portfolio Gallery Data
const galleryData = [
  {
    image: "assets/PHOTO-2025-03-01-23-42-53 2.jpg",
    title: "Modern Exhibition Design",
    description: "Contemporary booth with striking visual elements",
  },
  {
    image: "assets/PHOTO-2025-03-01-23-42-53 3.jpg",
    title: "Interactive Display Solution",
    description: "Engaging booth design with multimedia integration",
  },
  {
    image: "assets/PHOTO-2025-03-01-23-42-53 4.jpg",
    title: "Premium Brand Experience",
    description: "Luxury-focused exhibition space with elegant details",
  },
  {
    image: "assets/PHOTO-2025-03-01-23-42-53 5.jpg",
    title: "Dynamic Trade Show Booth",
    description: "Bold and innovative stand design",
  },
  {
    image: "assets/PHOTO-2025-03-01-23-42-53 6.jpg",
    title: "Corporate Exhibition Space",
    description: "Professional and sophisticated booth layout",
  },
  {
    image: "assets/PHOTO-2025-03-01-23-42-54.jpg",
    title: "Custom Brand Showcase",
    description: "Tailored exhibition design with brand focus",
  }
];

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM loaded");

  // Navigation functionality
  const navToggle = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");

  // Toggle mobile menu
  if (navToggle) {
    navToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active");
    });
  }

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

  // Handle header scroll effect
  const header = document.getElementById('header');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
  });

  // Initialize Portfolio Gallery
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
      
      // Add click event to open lightbox
      galleryItem.addEventListener("click", () => {
        const lightbox = document.createElement("div");
        lightbox.className = "lightbox";
        
        const img = new Image();
        img.src = item.image;
        img.alt = item.title;
        
        lightbox.innerHTML = `
          <div class="lightbox__content">
            <button class="lightbox__close">&times;</button>
            <img src="${item.image}" alt="${item.title}">
            <div class="lightbox__caption">
              <h3>${item.title}</h3>
              <p>${item.description}</p>
            </div>
          </div>
        `;
        
        document.body.style.overflow = 'hidden'; // Prevent scrolling when lightbox is open
        
        // Close lightbox when clicking outside or on close button
        lightbox.addEventListener("click", (e) => {
          if (e.target === lightbox || e.target.classList.contains('lightbox__close')) {
            document.body.style.overflow = ''; // Restore scrolling
            document.body.removeChild(lightbox);
          }
        });
        
        document.body.appendChild(lightbox);
      });
      
      workGallery.appendChild(galleryItem);
    });
  }

  // Newsletter subscription
  async function handleNewsletterSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;

    try {
      submitButton.textContent = 'Subscribing...';
      submitButton.disabled = true;

      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Subscription failed');
      }

      // Show success message
      form.innerHTML = `
        <div class="newsletter__success">
          <i class="fas fa-check-circle"></i>
          <p>Thank you for subscribing! Check your email for confirmation.</p>
        </div>
      `;
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      alert(error.message || 'Failed to subscribe. Please try again later.');
      
      // Reset button
      submitButton.textContent = originalButtonText;
      submitButton.disabled = false;
    }
  }

  // Initialize testimonials
  console.log("Starting testimonials initialization...");
  
  const testimonialData = [
    {
      content: "Vogue Expo transformed our trade show presence completely. Their innovative design attracted twice the foot traffic compared to our previous booths. The attention to detail and execution were flawless.",
      author: "Sarah Johnson",
      role: "Marketing Director, Tech Innovations Inc.",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    },
    {
      content: "Working with Vogue Expo was a game-changer for our brand. Their sustainable booth design not only aligned with our values but also received numerous industry accolades. Truly exceptional work!",
      author: "Michael Chen",
      role: "CEO, EcoSolutions Ltd.",
      image: "https://images.unsplash.com/photo-1556157382-97eda2d62296?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    },
    {
      content: "The level of creativity and professionalism at Vogue Expo is unmatched. They took our concept and elevated it beyond our expectations. Our booth became the talk of the exhibition!",
      author: "Emily Rodriguez",
      role: "Creative Director, Design Studio X",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    }
  ];

  const track = document.getElementById('testimonials-track');
  const dotsContainer = document.getElementById('testimonial-dots');
  const prevButton = document.getElementById('prev-testimonial');
  const nextButton = document.getElementById('next-testimonial');
  
  if (!track || !dotsContainer || !prevButton || !nextButton) {
    console.error('Testimonials elements not found. Aborting initialization.');
    return;
  }

  // Initialize testimonials
  let currentIndex = 0;

  // Create testimonial cards
  testimonialData.forEach((item, index) => {
    console.log(`Creating testimonial ${index + 1}`);
    
    // Create testimonial card
    const card = document.createElement('div');
    card.className = `testimonial__card ${index === 0 ? 'active' : ''}`;
    card.style.transform = `translateX(${index * 100}%)`;
    card.innerHTML = `
      <div class="testimonial__content">${item.content}</div>
      <div class="testimonial__author">
        <img src="${item.image}" alt="${item.author}" class="testimonial__avatar" loading="lazy">
        <div class="testimonial__info">
          <div class="testimonial__name">${item.author}</div>
          <div class="testimonial__role">${item.role}</div>
        </div>
      </div>
    `;
    track.appendChild(card);
    console.log(`Added testimonial card ${index + 1} to track`);

    // Create dot
    const dot = document.createElement('button');
    dot.className = `testimonial__dot ${index === 0 ? 'active' : ''}`;
    dot.setAttribute('aria-label', `Go to testimonial ${index + 1}`);
    dot.addEventListener('click', () => {
      currentIndex = index;
      updateSlides();
    });
    dotsContainer.appendChild(dot);
    console.log(`Added dot ${index + 1} to dots container`);
  });

  // Update slide positions
  const updateSlides = () => {
    console.log(`Updating slides to index ${currentIndex}`);
    const cards = track.querySelectorAll('.testimonial__card');
    const dots = dotsContainer.querySelectorAll('.testimonial__dot');
    
    cards.forEach((card, index) => {
      card.classList.toggle('active', index === currentIndex);
      card.style.transform = `translateX(${(index - currentIndex) * 100}%)`;
      card.style.transition = 'all 0.5s ease-in-out';
    });
    
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
    });
  };

  // Navigation functions
  const nextSlide = () => {
    currentIndex = (currentIndex + 1) % testimonialData.length;
    updateSlides();
  };

  const prevSlide = () => {
    currentIndex = (currentIndex - 1 + testimonialData.length) % testimonialData.length;
    updateSlides();
  };

  // Add event listeners
  prevButton.addEventListener('click', () => {
    console.log('Previous button clicked');
    prevSlide();
  });
  
  nextButton.addEventListener('click', () => {
    console.log('Next button clicked');
    nextSlide();
  });

  // Auto-advance slides
  let autoplayInterval = setInterval(nextSlide, 5000);

  // Pause autoplay on hover
  track.addEventListener('mouseenter', () => {
    console.log('Mouse entered track - pausing autoplay');
    clearInterval(autoplayInterval);
  });

  track.addEventListener('mouseleave', () => {
    console.log('Mouse left track - resuming autoplay');
    autoplayInterval = setInterval(nextSlide, 5000);
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      console.log('Left arrow pressed');
      prevSlide();
    }
    if (e.key === 'ArrowRight') {
      console.log('Right arrow pressed');
      nextSlide();
    }
  });

  // Initialize first slide
  console.log('Initializing first slide');
  updateSlides();
  console.log('Testimonials initialization complete');

  // Initialize newsletter forms
  const newsletterForms = document.querySelectorAll('.newsletter__form');
  newsletterForms.forEach(form => {
    form.addEventListener('submit', handleNewsletterSubmit);
  });

  // Initialize Supabase client
  const supabaseUrl = 'https://owxsjpzzsqgqgrrajsiu.supabase.co';
  const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im93eHNqcHp6c3FncWdycmFqc2l1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc1ODY3OTUsImV4cCI6MjAyMzE2Mjc5NX0.8Wy4iLKPH8oYDwI5E_KvXhyaGnxBWYSI_GAUOqMnODk';
  const supabase = supabase.createClient(supabaseUrl, supabaseAnonKey);

  // Contact Form Handling
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    // Add input validation feedback
    const formInputs = contactForm.querySelectorAll('input, textarea, select');
    formInputs.forEach(input => {
      input.addEventListener('blur', () => {
        validateInput(input);
      });
      
      input.addEventListener('input', () => {
        // Clear error state when user starts typing
        input.classList.remove('error');
        const errorElement = input.parentElement.querySelector('.input-error');
        if (errorElement) {
          errorElement.remove();
        }
      });
    });
    
    function validateInput(input) {
      // Skip validation for optional fields that are empty
      if (input.id === 'phone' && input.value.trim() === '') {
        return true;
      }
      
      let isValid = input.checkValidity();
      
      // Custom validation
      if (input.id === 'email' && input.value.trim() !== '') {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        isValid = emailPattern.test(input.value.trim());
        if (!isValid) {
          showError(input, 'Please enter a valid email address');
        }
      }
      
      if (input.required && input.value.trim() === '') {
        isValid = false;
        showError(input, 'This field is required');
      }
      
      if (!isValid) {
        input.classList.add('error');
      } else {
        input.classList.remove('error');
        const errorElement = input.parentElement.querySelector('.input-error');
        if (errorElement) {
          errorElement.remove();
        }
      }
      
      return isValid;
    }
    
    function showError(input, message) {
      // Remove any existing error message
      const existingError = input.parentElement.querySelector('.input-error');
      if (existingError) {
        existingError.remove();
      }
      
      // Add error message
      const errorElement = document.createElement('div');
      errorElement.className = 'input-error';
      errorElement.textContent = message;
      input.parentElement.appendChild(errorElement);
    }
    
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const formError = document.getElementById('form-error');
      formError.textContent = '';
      formError.style.display = 'none';
      
      // Validate all inputs
      let isFormValid = true;
      formInputs.forEach(input => {
        if (!validateInput(input)) {
          isFormValid = false;
        }
      });
      
      if (!isFormValid) {
        formError.textContent = 'Please correct the errors in the form.';
        formError.style.display = 'block';
        return;
      }
      
      const submitButton = contactForm.querySelector('button[type="submit"]');
      const originalButtonText = submitButton.textContent;
      
      // Get form data
      const formData = {
        name: contactForm.querySelector('#name').value.trim(),
        email: contactForm.querySelector('#email').value.trim(),
        company: contactForm.querySelector('#company').value.trim(),
        phone: contactForm.querySelector('#phone').value.trim(),
        interest: contactForm.querySelector('#interest').value,
        message: contactForm.querySelector('#message').value.trim()
      };

      try {
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;

        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to send message');
        }

        // Show success message
        const formWrapper = contactForm.parentElement;
        formWrapper.innerHTML = `
          <div class="form__success">
            <i class="fas fa-check-circle"></i>
            <h3>Thank You!</h3>
            <p>Your message has been sent successfully. We'll get back to you within 24 hours.</p>
          </div>
        `;

      } catch (error) {
        console.error('Form submission error:', error);
        formError.textContent = error.message || 'Failed to send message. Please try again later.';
        formError.style.display = 'block';
        
        // Reset button
        submitButton.textContent = originalButtonText;
        submitButton.disabled = false;
      }
    });
  }

  // Blog Filters
  const initBlogFilters = () => {
    const filterButtons = document.querySelectorAll('.blog-filter');
    const blogCards = document.querySelectorAll('.blog-card');
    const searchInput = document.querySelector('.blog-search input');

    if (!filterButtons.length || !blogCards.length) return;

    // Helper: fade in effect
    function fadeIn(el) {
      el.style.opacity = 0;
      el.style.display = 'block';
      setTimeout(() => {
        el.style.transition = 'opacity 0.3s';
        el.style.opacity = 1;
      }, 10);
    }

    // Filter by category
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Update active state
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const category = button.textContent.trim().toLowerCase();

        blogCards.forEach(card => {
          // Support for multiple categories in the future
          const cardCategory = card.querySelector('.blog-card__category').textContent.trim().toLowerCase();
          if (category === 'all' || cardCategory === category) {
            fadeIn(card);
          } else {
            card.style.display = 'none';
            card.style.opacity = 1;
          }
        });

        // Also apply current search filter
        if (searchInput.value) {
          filterBySearch(searchInput.value);
        }
      });
    });

    // Search functionality
    let searchTimeout;
    searchInput.addEventListener('input', (e) => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        filterBySearch(e.target.value);
      }, 300);
    });

    function filterBySearch(searchTerm) {
      searchTerm = searchTerm.toLowerCase();
      blogCards.forEach(card => {
        if (card.style.display === 'none') return; // Skip if hidden by category filter
        const title = card.querySelector('.blog-card__title').textContent.toLowerCase();
        const excerpt = card.querySelector('.blog-card__excerpt').textContent.toLowerCase();
        const category = card.querySelector('.blog-card__category').textContent.toLowerCase();
        if (title.includes(searchTerm) || excerpt.includes(searchTerm) || category.includes(searchTerm)) {
          fadeIn(card);
        } else {
          card.style.display = 'none';
          card.style.opacity = 1;
        }
      });
    }
  };

  // Initialize blog filters if on blog page
  if (document.querySelector('.blog-filters')) {
    initBlogFilters();
  }
});
