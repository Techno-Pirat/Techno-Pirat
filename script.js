/* Header behavior and mobile navigation */
(function(){
  const header = document.querySelector('[data-header]');
  const toggleButton = document.querySelector('.nav-toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  function setExpanded(isExpanded){
    toggleButton.setAttribute('aria-expanded', String(isExpanded));
    toggleButton.setAttribute('aria-label', isExpanded ? 'Close menu' : 'Open menu');
    if(isExpanded){
      mobileMenu.hidden = false;
      document.body.style.overflow = 'hidden';
    } else {
      mobileMenu.hidden = true;
      document.body.style.overflow = '';
    }
  }

  if(toggleButton){
    toggleButton.addEventListener('click', () => {
      const isOpen = toggleButton.getAttribute('aria-expanded') === 'true';
      setExpanded(!isOpen);
    });
  }

  // Close mobile on link click
  mobileMenu?.querySelectorAll('[data-close]')?.forEach((el) => {
    el.addEventListener('click', () => setExpanded(false));
  });

  // Sticky header style on scroll
  const onScroll = () => {
    const scrolled = window.scrollY > 4;
    header.classList.toggle('is-scrolled', scrolled);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

/* Smooth scroll for internal links */
(function(){
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if(!href || href === '#' || href.length === 1) return;
      const target = document.querySelector(href);
      if(target){
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
})();

/* Accessible accordion */
(function(){
  const root = document.querySelector('[data-accordion]');
  if(!root) return;
  root.querySelectorAll('.accordion-item').forEach((item) => {
    const trigger = item.querySelector('.accordion-trigger');
    const panel = item.querySelector('.accordion-panel');
    if(!trigger || !panel) return;

    trigger.setAttribute('aria-controls', `${Math.random().toString(36).slice(2)}-panel`);
    panel.id = trigger.getAttribute('aria-controls');

    function open(){
      trigger.setAttribute('aria-expanded', 'true');
      panel.hidden = false;
    }
    function close(){
      trigger.setAttribute('aria-expanded', 'false');
      panel.hidden = true;
    }

    close();

    trigger.addEventListener('click', () => {
      const isOpen = trigger.getAttribute('aria-expanded') === 'true';
      // close others for single-open behavior
      root.querySelectorAll('.accordion-trigger[aria-expanded="true"]').forEach((openTrigger) => {
        if(openTrigger !== trigger){
          openTrigger.setAttribute('aria-expanded', 'false');
          const otherPanelId = openTrigger.getAttribute('aria-controls');
          const otherPanel = otherPanelId ? document.getElementById(otherPanelId) : null;
          if(otherPanel) otherPanel.hidden = true;
        }
      });
      if(isOpen){ close(); } else { open(); }
    });
  });
})();

/* Pricing CTA buttons */
(function(){
  document.querySelectorAll('.choose-plan').forEach((btn) => {
    btn.addEventListener('click', () => {
      const plan = btn.getAttribute('data-plan') || 'plan';
      const subscribeSection = document.getElementById('subscribe');
      if(subscribeSection){
        subscribeSection.scrollIntoView({ behavior: 'smooth' });
        const message = document.querySelector('.form-message');
        if(message){
          message.textContent = `Prefilled plan: ${plan}. Enter your email and we will reach out.`;
        }
      }
    });
  });
})();

/* Newsletter subscription */
(function(){
  const form = document.getElementById('subscribe-form');
  if(!form) return;
  const emailInput = form.querySelector('input[name="email"]');
  const messageEl = form.querySelector('.form-message');

  function isValidEmail(value){
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = emailInput.value;
    if(!isValidEmail(email)){
      messageEl.textContent = 'Please enter a valid email address.';
      messageEl.style.color = '#b91c1c';
      emailInput.focus();
      return;
    }

    // Simulate async request
    try{
      messageEl.textContent = 'Subscribing…';
      messageEl.style.color = '#6b7280';
      await new Promise((r) => setTimeout(r, 650));
      messageEl.textContent = 'Thanks! You are on the list.';
      messageEl.style.color = '#166534';
      form.reset();
    }catch(err){
      messageEl.textContent = 'Sorry, something went wrong. Please try again.';
      messageEl.style.color = '#b91c1c';
    }
  });
})();

/* Footer year */
(function(){
  const el = document.getElementById('year');
  if(el) el.textContent = new Date().getFullYear();
})();
