// Portfolio Gallery Data
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
        
        // Close lightbox when clicking outside or on close button
        lightbox.addEventListener("click", (e) => {
          if (e.target === lightbox || e.target.classList.contains('lightbox__close')) {
            lightbox.classList.add('fade-out');
            setTimeout(() => {
              document.body.removeChild(lightbox);
            }, 300);
          }
        });
        
        document.body.appendChild(lightbox);
        // Trigger reflow to ensure animation plays
        lightbox.offsetHeight;
        lightbox.classList.add('fade-in');
      });
      
      workGallery.appendChild(galleryItem);
    });
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
  
  console.log("Found DOM elements:", {
    track: track ? "Found" : "Not found",
    dotsContainer: dotsContainer ? "Found" : "Not found",
    prevButton: prevButton ? "Found" : "Not found",
    nextButton: nextButton ? "Found" : "Not found"
  });

  if (!track || !dotsContainer || !prevButton || !nextButton) {
    console.error('Testimonials elements not found. Aborting initialization.');
    return;
  }

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
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);
    console.log(`Added dot ${index + 1} to dots container`);
  });

  // Update slide positions
  const updateSlides = () => {
    console.log(`Updating slides to index ${currentIndex}`);
    const cards = track.querySelectorAll('.testimonial__card');
    const dots = dotsContainer.querySelectorAll('.testimonial__dot');
    
    // Update active states
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
  const goToSlide = (index) => {
    currentIndex = index;
    updateSlides();
  };

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

  // Contact Form Handling
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      // Form submission logic here
    });
  }
});
