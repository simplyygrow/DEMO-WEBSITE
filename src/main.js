import '../style.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: 'vertical',
  gestureOrientation: 'vertical',
  smoothWheel: true,
  wheelMultiplier: 1,
  touchMultiplier: 2,
  infinite: false,
});

lenis.on('scroll', ScrollTrigger.update);

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

const init = () => {
  initNav();
  initHero();
  initProduct();
  initVariants();
  initCraft();
  initModal();
  ScrollTrigger.refresh();
};

/* ===== Nav ===== */
const initNav = () => {
  const nav = document.querySelector('.nav');
  const toggle = document.getElementById('nav-toggle');
  const links = document.querySelector('.nav-links');

  if (!nav || !toggle || !links) return;

  toggle.addEventListener('click', () => {
    const isOpen = links.classList.toggle('open');
    toggle.classList.toggle('active');
    toggle.setAttribute('aria-expanded', isOpen);
  });

  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target)) {
      links.classList.remove('open');
      toggle.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      links.classList.remove('open');
      toggle.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });

  let lastScroll = 0;
  let ticking = false;

  lenis.on('scroll', ({ scroll }) => {
    if (ticking) return;
    ticking = true;

    requestAnimationFrame(() => {
      if (scroll <= 10) {
        gsap.to(nav, { y: 0, duration: 0.3, ease: 'power2.out' });
      } else if (scroll > lastScroll + 5) {
        gsap.to(nav, { y: -100, duration: 0.25, ease: 'power2.out' });
      } else if (scroll < lastScroll - 5) {
        gsap.to(nav, { y: 0, duration: 0.25, ease: 'power2.out' });
      }
      lastScroll = scroll;
      ticking = false;
    });
  });
};

/* ===== Hero ===== */
const initHero = () => {
  const hero = document.querySelector('.hero');
  const video = document.querySelector('.hero-video');
  const eyebrow = document.querySelector('.hero-eyebrow');
  const title = document.querySelector('.hero-title');
  const subtitle = document.querySelector('.hero-subtitle');
  const scroll = document.querySelector('.hero-scroll');
  const pills = document.querySelector('.hero-pills');
  const nav = document.querySelector('.nav');

  if (!hero || !video) return;

  gsap.set(video, { scale: 1.1, opacity: 0 });
  gsap.set(nav, { y: -30, opacity: 0 });
  gsap.set([eyebrow, title, subtitle, scroll].filter(Boolean), { y: 30, opacity: 0 });
  gsap.set(pills, { y: 20, opacity: 0 });

  const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

  tl
    .to(video, { scale: 1, opacity: 1, duration: 2 }, 0)
    .to(nav, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }, 0.5)
    .to(title, { y: 0, opacity: 1, duration: 0.9 }, 0.8)
    .to(eyebrow, { y: 0, opacity: 1, duration: 0.6 }, 1)
    .to(subtitle, { y: 0, opacity: 1, duration: 0.7 }, 1.1)
    .to(scroll, { y: 0, opacity: 1, duration: 0.6 }, 1.3)
    .to(pills, { y: 0, opacity: 1, duration: 0.6 }, 1.4);

  gsap.to(video, {
    scale: 0.95,
    ease: 'none',
    scrollTrigger: {
      trigger: hero,
      start: 'top top',
      end: '+=600',
      scrub: true,
    },
  });

  gsap.to([title, subtitle, eyebrow].filter(Boolean), {
    y: -80,
    opacity: 0,
    ease: 'none',
    scrollTrigger: {
      trigger: hero,
      start: '10% top',
      end: 'bottom top',
      scrub: true,
    },
  });

  gsap.to(scroll, {
    opacity: 0,
    y: -20,
    ease: 'none',
    scrollTrigger: {
      trigger: hero,
      start: '5% top',
      end: '15% top',
      scrub: true,
    },
  });

  gsap.to(pills, {
    y: -30,
    opacity: 0,
    ease: 'none',
    scrollTrigger: {
      trigger: hero,
      start: '5% top',
      end: 'bottom top',
      scrub: true,
    },
  });
};

/* ===== Product ===== */
const initProduct = () => {
  const section = document.querySelector('.product');
  const image = document.querySelector('.product-image img');
  const info = document.querySelector('.product-info');

  if (!section || !image || !info) return;

  gsap.set(image, { opacity: 0, y: 50, scale: 0.95 });
  gsap.set(info, { opacity: 0, y: 40 });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: 'top 60%',
      toggleActions: 'play none none reverse',
    },
  });

  tl
    .to(image, { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'power3.out' })
    .to(info, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, '-=0.5');

  gsap.to(image, {
    rotation: 12,
    scale: 1.15,
    ease: 'none',
    scrollTrigger: {
      trigger: section,
      start: 'top top',
      end: 'bottom top',
      scrub: 1.5,
    },
  });
};

/* ===== Variants ===== */
const initVariants = () => {
  const section = document.querySelector('.variants');
  const variants = document.querySelectorAll('.variant');
  const bgImages = document.querySelectorAll('.variants-bg-img');
  const buttons = document.querySelectorAll('.btn-next');

  if (!section || !variants.length || !bgImages.length) return;

  bgImages.forEach((img) => {
    gsap.to(img, {
      scale: 1.08,
      yPercent: 8,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  });

  let isAnimating = false;

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      if (isAnimating) return;

      const current = document.querySelector('.variant.active');
      const targetKey = btn.dataset.target;
      const next = document.querySelector(`.variant[data-variant="${targetKey}"]`);
      const currentBg = document.querySelector('.variants-bg-img.active');
      const nextBg = document.querySelector(`.variants-bg-${targetKey}`);

      if (!current || !next || current === next) return;

      isAnimating = true;

      const currentEls = current.querySelectorAll('.variant-text > *');
      const currentImg = current.querySelector('.variant-image img');
      const nextEls = next.querySelectorAll('.variant-text > *');
      const nextImg = next.querySelector('.variant-image img');

      gsap.set(nextEls, { x: 60, opacity: 0 });
      gsap.set(nextImg, { x: 80, opacity: 0, rotation: 3 });

      gsap
        .timeline({
          onComplete: () => {
            isAnimating = false;
          },
        })
        .to(currentEls, {
          x: -60,
          opacity: 0,
          duration: 0.35,
          stagger: 0.03,
          ease: 'power2.inOut',
        })
        .to(currentImg, { x: -80, opacity: 0, duration: 0.4, ease: 'power2.inOut' }, '<')
        .add(() => {
          current.classList.remove('active');
          next.classList.add('active');
          if (currentBg) currentBg.classList.remove('active');
          if (nextBg) nextBg.classList.add('active');
        })
        .to(nextEls, {
          x: 0,
          opacity: 1,
          duration: 0.55,
          stagger: 0.05,
          ease: 'power2.out',
        })
        .to(nextImg, { x: 0, opacity: 1, rotation: 0, duration: 0.7, ease: 'power3.out' }, '-=0.4');
    });
  });
};

/* ===== Craft ===== */
const initCraft = () => {
  const section = document.querySelector('.craft');
  const header = document.querySelector('.craft-header');
  const canvas = document.getElementById('craft-canvas');

  if (!section || !canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const totalFrames = 40;
  const images = [];
  const sequence = { frame: 0 };
  let loaded = 0;
  let allLoaded = false;

  const drawFallback = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#0a0a0a');
    gradient.addColorStop(0.5, '#121018');
    gradient.addColorStop(1, '#050505');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = 'rgba(201, 169, 124, 0.25)';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(canvas.width * 0.15, canvas.height * 0.2, canvas.width * 0.7, canvas.height * 0.6);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.font = '500 36px Outfit, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('CRAFTSMANSHIP', canvas.width / 2, canvas.height / 2 - 15);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.font = '300 16px Inter, sans-serif';
    ctx.fillText('Mechanical precision through every component', canvas.width / 2, canvas.height / 2 + 25);
  };

  const drawImage = (img) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (!img || !img.complete || !img.naturalWidth) {
      drawFallback();
      return;
    }
    const ratio = Math.min(canvas.width / img.naturalWidth, canvas.height / img.naturalHeight);
    const w = img.naturalWidth * ratio;
    const h = img.naturalHeight * ratio;
    ctx.drawImage(img, (canvas.width - w) / 2, (canvas.height - h) / 2, w, h);
  };

  const render = () => {
    if (allLoaded && images[Math.round(sequence.frame)]) {
      drawImage(images[Math.round(sequence.frame)]);
    } else {
      drawFallback();
    }
  };

  for (let i = 0; i < totalFrames; i++) {
    const img = new Image();
    img.src = `/images/sequence/ezgif-frame-${String(i + 1).padStart(3, '0')}.jpg`;
    img.onload = () => {
      loaded++;
      if (loaded === totalFrames) {
        allLoaded = true;
        ScrollTrigger.refresh();
      }
      if (Math.round(sequence.frame) === i) render();
    };
    img.onerror = () => {
      loaded++;
      if (loaded === totalFrames) {
        allLoaded = true;
        ScrollTrigger.refresh();
      }
    };
    images.push(img);
  }

  drawFallback();

  gsap.to(sequence, {
    frame: totalFrames - 1,
    snap: { frame: 1 },
    ease: 'none',
    onUpdate: render,
    scrollTrigger: {
      trigger: section,
      start: 'top 40%',
      end: 'bottom bottom',
      scrub: 0.5,
    },
  });

  if (header) {
    gsap.to(header, {
      x: -120,
      opacity: 0,
      ease: 'power2.in',
      scrollTrigger: {
        trigger: section,
        start: 'top 45%',
        end: 'top 10%',
        scrub: true,
      },
    });
  }
};

/* ===== Modal ===== */
const initModal = () => {
  const modal = document.getElementById('modal');
  const backdrop = document.getElementById('modal-backdrop');
  const closeBtn = document.getElementById('modal-close');
  const openBtns = [document.getElementById('nav-reserve-btn'), document.getElementById('footer-reserve-btn')];
  const form = document.getElementById('modal-form');
  const navLinks = document.querySelectorAll('.nav-links a');

  if (!modal || !backdrop) return;

  const open = () => {
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    lenis.stop();
  };

  const close = () => {
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    lenis.start();
  };

  openBtns.forEach((btn) => {
    if (btn) btn.addEventListener('click', open);
  });

  if (closeBtn) closeBtn.addEventListener('click', close);
  backdrop.addEventListener('click', close);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') {
      close();
    }
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href || href === '#') return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();

      const links = document.querySelector('.nav-links');
      const toggle = document.getElementById('nav-toggle');
      if (links) links.classList.remove('open');
      if (toggle) toggle.classList.remove('active');

      lenis.scrollTo(target, { offset: -80 });
      close();
    });
  });

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const btn = form.querySelector('.btn-submit');
      const original = btn.textContent;
      btn.textContent = 'Thank You!';
      btn.disabled = true;
      btn.style.background = 'linear-gradient(180deg, #c9a97c 0%, #b8945e 100%)';

      setTimeout(() => {
        form.reset();
        btn.textContent = original;
        btn.disabled = false;
        btn.style.background = '';
        close();
      }, 2000);
    });
  }
};

/* ===== Smooth scroll for anchor links ===== */
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  if (link.closest('.nav-links')) return;

  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (!href || href === '#') return;

    const target = document.querySelector(href);
    if (!target) return;

    e.preventDefault();
    lenis.scrollTo(target, { offset: -80 });
  });
});

/* ===== Start ===== */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

window.addEventListener('resize', () => {
  ScrollTrigger.refresh();
});
