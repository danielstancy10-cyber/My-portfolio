/* ============================================
   BOLD & MODERN MARKETING PORTFOLIO - JS
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ---- NAV SCROLL EFFECT ----
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  });

  // ---- MOBILE MENU ----
  const burger = document.getElementById('burger');
  const mobileMenu = document.getElementById('mobileMenu');

  burger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });

  // Close mobile menu on link click
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
    });
  });

  // ---- COUNTER ANIMATION (FIXED) ----
  const counters = document.querySelectorAll('.stat__num');
  let countersAnimated = false;

  function animateCounters() {
    if (countersAnimated) return;
    countersAnimated = true;

    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'));
      const suffix = counter.getAttribute('data-suffix') || '';
      const duration = 2000;
      const step = target / (duration / 16);
      let current = 0;

      const update = () => {
        current += step;
        if (current < target) {
          const displayNum = Math.floor(current);
          counter.textContent = displayNum.toLocaleString() + suffix;
          requestAnimationFrame(update);
        } else {
          counter.textContent = target.toLocaleString() + suffix;
        }
      };

      // Reset to 0 before animating
      counter.textContent = '0' + suffix;
      requestAnimationFrame(update);
    });
  }

  // Trigger counters when hero stats are visible
  const heroStats = document.querySelector('.hero__stats');

  if (heroStats) {
    // Check if already visible on page load
    const rect = heroStats.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      // Already visible — animate after a short delay for page load
      setTimeout(animateCounters, 800);
    }

    // Also observe for scroll-triggered animation
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(animateCounters, 300);
          statsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    statsObserver.observe(heroStats);
  }

  // Fallback: animate counters after 2 seconds no matter what
  setTimeout(animateCounters, 2000);

  // ---- SCROLL REVEAL FOR CASE CARDS ----
  const cards = document.querySelectorAll('.case-card');

  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        cardObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05, rootMargin: '0px 0px -30px 0px' });

  cards.forEach((card, index) => {
    // Stagger with transition delay
    card.style.transitionDelay = (index * 0.1) + 's';
    cardObserver.observe(card);
  });

  // ---- FILTER CASE STUDIES ----
  const filterBtns = document.querySelectorAll('.filter-btn');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active state
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      const timelineItems = document.querySelectorAll('.timeline__item');

      timelineItems.forEach(item => {
        const card = item.querySelector('.case-card');
        if (!card) return;
        const category = card.getAttribute('data-category');
        const shouldShow = filter === 'all' || category === filter;

        if (shouldShow) {
          item.style.display = '';
          item.classList.add('fade-in');
          item.classList.remove('fade-out');
        } else {
          item.classList.add('fade-out');
          setTimeout(() => {
            item.style.display = 'none';
            item.classList.remove('fade-out');
          }, 300);
        }
      });
    });
  });

  // ---- SMOOTH SCROLL FOR ANCHOR LINKS ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ---- PARALLAX BLOBS ON MOUSE MOVE ----
  const blobs = document.querySelectorAll('.blob');

  document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;

    blobs.forEach((blob, i) => {
      const speed = (i + 1) * 10;
      blob.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
    });
  });

  // ---- SCROLL REVEAL FOR SECTIONS ----
  const revealSections = document.querySelectorAll('.about, .contact, .process');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        sectionObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  revealSections.forEach(section => {
    section.classList.add('reveal');
    sectionObserver.observe(section);
  });

  // ---- TIMELINE STAGGER ANIMATION ----
  const timelineItems = document.querySelectorAll('.timeline__item');

  const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        timelineObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  timelineItems.forEach((item, i) => {
    item.style.transitionDelay = (i * 0.15) + 's';
    timelineObserver.observe(item);
  });

});
