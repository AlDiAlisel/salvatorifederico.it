/**
 * Salvatori Federico - Arboricoltura, Potatura & Lavori in fune
 * Main JavaScript Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Drawer Toggle
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const drawerCloseBtn = document.querySelector('.drawer-close');
  const mobileDrawer = document.querySelector('.mobile-drawer');
  const drawerOverlay = document.querySelector('.drawer-overlay');

  function openDrawer() {
    if (mobileDrawer && drawerOverlay) {
      mobileDrawer.classList.add('open');
      drawerOverlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeDrawer() {
    if (mobileDrawer && drawerOverlay) {
      mobileDrawer.classList.remove('open');
      drawerOverlay.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openDrawer);
  if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeDrawer);
  if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);

  // Close drawer when clicking navigation links inside drawer
  const drawerLinks = document.querySelectorAll('.drawer-nav a');
  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  // 2. Sticky Header Scroll Effect
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (header) {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
  });

  // 3. FAQ Accordion
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const faqItem = question.closest('.faq-item');
      const isActive = faqItem.classList.contains('active');

      // Optional: close other open items for cleaner accordion
      document.querySelectorAll('.faq-item').forEach(item => {
        if (item !== faqItem) item.classList.remove('active');
      });

      if (isActive) {
        faqItem.classList.remove('active');
      } else {
        faqItem.classList.add('active');
      }
    });
  });

  // 4. Contact Form Simulation & Feedback
  const quoteForm = document.getElementById('contactForm');
  if (quoteForm) {
    quoteForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = quoteForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Invio richiesta in corso...';
      
      setTimeout(() => {
        submitBtn.innerHTML = '✓ Richiesta inviata con successo!';
        submitBtn.style.backgroundColor = '#2e7d32';
        
        // Show success alert message
        const alertBox = document.createElement('div');
        alertBox.className = 'form-success-alert';
        alertBox.style.cssText = `
          background: #e8f5e9;
          color: #1b5e20;
          padding: 1.2rem;
          border-radius: 12px;
          margin-top: 1.5rem;
          font-weight: 600;
          border: 1px solid #a5d6a7;
          text-align: center;
        `;
        alertBox.innerHTML = `
          <h4 style="color:#1b5e20; margin-bottom: 0.25rem;">Grazie per averci contattato!</h4>
          <p style="color:#2e7d32; margin-bottom: 0; font-size: 0.95rem;">Abbiamo ricevuto la tua richiesta di sopralluogo. Salvatori Federico ti ricontatterà entro brevissimo tempo.</p>
        `;
        
        quoteForm.appendChild(alertBox);
        quoteForm.reset();
        
        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
          submitBtn.style.backgroundColor = '';
        }, 5000);
      }, 900);
    });
  }

  // 5. Active Link Highlight in Navbar
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link, .dropdown-link');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
});
