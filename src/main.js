import '../style.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

window.addEventListener('error', (event) => {
  console.warn('Caught error:', event.message);
  event.preventDefault();
});

window.addEventListener('unhandledrejection', (event) => {
  console.warn('Caught unhandled rejection:', event.reason);
  event.preventDefault();
});

let lenis;

const initApp = () => {
  if (typeof document === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);

  lenis = new Lenis({
    lerp: 0.08,
    wheelMultiplier: 1,
    infinite: false,
    gestureOrientation: 'vertical',
    normalizeWheel: true,
    smoothWheel: true,
  });

  lenis.on('scroll', ScrollTrigger.update);

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  initHeroAnimations();
  initProductRevealAnimations();
  initEthosAnimations();
  initDismantleAnimations();
  initNavScroll();
  initModal();

  setTimeout(() => {
    ScrollTrigger.refresh();
  }, 200);

  window.addEventListener('resize', () => {
    ScrollTrigger.refresh();
  });
};

const initHeroAnimations = () => {
  const hero = document.querySelector('.hero');
  const video = document.querySelector('.bg-video');
  const frame = document.querySelector('.hero-frame');
  const overline = document.querySelector('.hero-overline');
  const title = document.querySelector('.hero-title');
  const scrollIndicator = document.querySelector('.hero-scroll-indicator');
  const subtitle = document.querySelector('.hero-subtitle');
  const bgText = document.querySelector('.hero-text-bg');
  const details = document.querySelector('.hero-details');
  const bottomRail = document.querySelector('.hero-bottom-rail');
  const nav = document.querySelector('.nav');

  if (!hero || !video || !frame || !details || !nav) {
    console.warn('Hero elements missing, skipping hero animations');
    return;
  }

  try {
    gsap.set(video, { scale: 1.08, opacity: 0, force3D: true });
    gsap.set(frame, { opacity: 0, force3D: true });
    gsap.set(nav, { y: -30, opacity: 0, force3D: true });
    gsap.set(bgText, { opacity: 0, y: 20, force3D: true });
    gsap.set([overline, title, scrollIndicator, subtitle].filter(Boolean), { y: 40, opacity: 0, force3D: true });
    gsap.set(bottomRail, { y: 25, opacity: 0, force3D: true });

    const heroTl = gsap.timeline({ defaults: { ease: 'power2.out', force3D: true } });

    heroTl
      .to(video, { scale: 1, opacity: 1, duration: 1.8 }, 0)
      .to(frame, { opacity: 1, duration: 0.8 }, 0.5)
      .to(nav, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }, 0.6)
      .to(bgText, { y: 0, opacity: 1, duration: 0.8 }, 1)
      .to(title, { y: 0, opacity: 1, duration: 0.8 }, 1.2)
      .to(overline, { y: 0, opacity: 1, duration: 0.6 }, 1.3)
      .to(scrollIndicator, { y: 0, opacity: 1, duration: 0.6 }, 1.5)
      .to(subtitle, { y: 0, opacity: 1, duration: 0.7 }, 1.5)
      .to(bottomRail, { y: 0, opacity: 1, duration: 0.6 }, 1.7);

    gsap.to(video, {
      scale: 0.95,
      ease: 'none',
      scrollTrigger: {
        trigger: hero,
        start: 'top top',
        end: '+=800',
        scrub: 1,
      },
    });

    gsap.to(details, {
      y: -60,
      opacity: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: hero,
        start: '10% top',
        end: 'bottom top',
        scrub: 1,
      },
    });

    if (bgText) {
      gsap.to(bgText, {
        y: -50,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: hero,
          start: '15% top',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }

    if (bottomRail) {
      gsap.to(bottomRail, {
        y: -20,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: hero,
          start: '5% top',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }

    gsap.to(frame, {
      opacity: 0.3,
      ease: 'none',
      scrollTrigger: {
        trigger: hero,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      },
    });
  } catch (error) {
    console.warn('Hero animation error:', error.message);
  }
};

const initProductRevealAnimations = () => {
  const section = document.querySelector('.product-reveal');
  const watch = document.querySelector('.product-reveal-watch');
  const title = document.querySelector('.product-reveal-title');
  const subtitle = document.querySelector('.product-reveal-subtitle');
  const cta = document.querySelector('.product-reveal-cta-group');
  const details = document.querySelector('.product-reveal-details');
  const bgText = document.querySelector('.product-reveal-text-bg');

  if (!section || !watch || !title || !subtitle || !cta || !details || !bgText) {
    console.warn('Product reveal elements missing, skipping animations');
    return;
  }

  try {
    gsap.set(watch, { opacity: 0, y: 40, rotation: -3, force3D: true });
    gsap.set([title, subtitle, cta], { opacity: 0, y: 30, force3D: true });

    const revealTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 60%',
        toggleActions: 'play none none reverse',
      },
    });

    revealTimeline
      .to(watch, { opacity: 1, y: 0, rotation: 0, duration: 1, ease: 'power3.out' })
      .to(title, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, '-=0.6')
      .to(subtitle, { opacity: 1, y: 0, duration: 0.65, ease: 'power2.out' }, '-=0.4')
      .to(cta, { opacity: 1, y: 0, duration: 0.65, ease: 'power2.out' }, '-=0.4');

    gsap.to(watch, {
      rotation: 15,
      scale: 1.2,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.5,
      },
    });

    gsap.to(details, {
      y: -100,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      },
    });

    gsap.to(bgText, {
      y: -180,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      },
    });
  } catch (error) {
    console.warn('Product reveal animation error:', error.message);
  }
};

const initEthosAnimations = () => {
  const section = document.querySelector('.ethos');
  const panels = Array.from(document.querySelectorAll('.ethos-main'));
  const bgImages = Array.from(document.querySelectorAll('.ethos-bg-img'));
  const triggers = Array.from(document.querySelectorAll('.ethos-next-btn'));

  if (!section || !panels.length || !bgImages.length || !triggers.length) {
    console.warn('Ethos elements missing, skipping animations');
    return;
  }

  try {
    bgImages.forEach((image) => {
      gsap.to(image, {
        scale: 1.08,
        yPercent: 8,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
    });

    const animatePanelIn = (panel) => {
      const textChildren = panel.querySelectorAll('.ethos-text-side > *');
      const watch = panel.querySelector('.ethos-watch-img');

      gsap.set(textChildren, { x: 60, opacity: 0, force3D: true });
      gsap.set(watch, { x: 100, opacity: 0, rotation: 3, force3D: true });

      gsap
        .timeline()
        .to(textChildren, {
          x: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.06,
          ease: 'power2.out',
        })
        .to(watch, { x: 0, opacity: 1, rotation: 0, duration: 0.8, ease: 'power3.out' }, '-=0.4');
    };

    const activePanel = document.querySelector('.ethos-main.active');
    if (activePanel) {
      animatePanelIn(activePanel);
    }

    let isAnimating = false;

    triggers.forEach((trigger) => {
      trigger.addEventListener('click', () => {
        if (isAnimating) return;

        const currentPanel = document.querySelector('.ethos-main.active');
        const targetKey = trigger.dataset.target;
        const nextPanel = document.querySelector(`.ethos-main.variant-${targetKey}`);
        const currentBg = document.querySelector('.ethos-bg-img.active');
        const nextBg = document.querySelector(`.ethos-bg-${targetKey}`);

        if (!currentPanel || !nextPanel || currentPanel === nextPanel || !currentBg || !nextBg) {
          return;
        }

        isAnimating = true;

        const currentTextChildren = currentPanel.querySelectorAll('.ethos-text-side > *');
        const currentWatch = currentPanel.querySelector('.ethos-watch-img');
        const nextTextChildren = nextPanel.querySelectorAll('.ethos-text-side > *');
        const nextWatch = nextPanel.querySelector('.ethos-watch-img');

        gsap.set(nextTextChildren, { x: 80, opacity: 0, force3D: true });
        gsap.set(nextWatch, { x: 100, opacity: 0, rotation: 3, force3D: true });

        gsap
          .timeline({
            onComplete: () => {
              isAnimating = false;
            },
          })
          .to(currentTextChildren, {
            x: -80,
            opacity: 0,
            duration: 0.35,
            stagger: 0.03,
            ease: 'power2.inOut',
          })
          .to(currentWatch, { x: -100, opacity: 0, duration: 0.4, ease: 'power2.inOut' }, '<')
          .add(() => {
            currentPanel.classList.remove('active');
            nextPanel.classList.add('active');
            currentBg.classList.remove('active');
            nextBg.classList.add('active');
          })
          .to(nextTextChildren, {
            x: 0,
            opacity: 1,
            duration: 0.55,
            stagger: 0.05,
            ease: 'power2.out',
          })
          .to(nextWatch, { x: 0, opacity: 1, rotation: 0, duration: 0.7, ease: 'power3.out' }, '-=0.4');
      });
    });
  } catch (error) {
    console.warn('Ethos animation error:', error.message);
  }
};

const initDismantleAnimations = () => {
  const section = document.querySelector('.dismantle');
  const header = document.querySelector('.dismantle-header');
  const canvas = document.getElementById('dismantle-canvas');

  if (!section || !header || !canvas) {
    console.warn('Dismantle elements missing, skipping animations');
    return;
  }

  const context = canvas.getContext('2d');
  if (!context) return;

  const totalFrames = 40;
  const images = [];
  const sequence = { frame: 0 };
  let loadedCount = 0;
  let allLoaded = false;

  const clearCanvas = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
  };

  const drawFallback = () => {
    clearCanvas();
    const gradient = context.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#0a0a0a');
    gradient.addColorStop(0.5, '#121018');
    gradient.addColorStop(1, '#050505');
    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.strokeStyle = 'rgba(201, 169, 124, 0.25)';
    context.lineWidth = 1.5;
    context.strokeRect(canvas.width * 0.15, canvas.height * 0.2, canvas.width * 0.7, canvas.height * 0.6);

    context.fillStyle = 'rgba(255, 255, 255, 0.8)';
    context.font = '500 36px Outfit, sans-serif';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText('CRAFTSMANSHIP', canvas.width / 2, canvas.height / 2 - 15);

    context.fillStyle = 'rgba(255, 255, 255, 0.4)';
    context.font = '300 16px Inter, sans-serif';
    context.fillText('Mechanical precision through every component', canvas.width / 2, canvas.height / 2 + 25);
  };

  const drawImageContain = (image) => {
    if (!image || !image.complete || !image.naturalWidth || !image.naturalHeight) {
      drawFallback();
      return;
    }
    clearCanvas();
    const ratio = Math.min(canvas.width / image.naturalWidth, canvas.height / image.naturalHeight);
    const width = image.naturalWidth * ratio;
    const height = image.naturalHeight * ratio;
    const x = (canvas.width - width) / 2;
    const y = (canvas.height - height) / 2;
    context.drawImage(image, x, y, width, height);
  };

  const render = () => {
    if (allLoaded && images[sequence.frame]) {
      drawImageContain(images[sequence.frame]);
    } else {
      drawFallback();
    }
  };

  for (let i = 0; i < totalFrames; i++) {
    const image = new Image();
    image.src = `/images/sequence/ezgif-frame-${String(i + 1).padStart(3, '0')}.jpg`;
    image.onload = () => {
      loadedCount++;
      if (loadedCount === totalFrames) {
        allLoaded = true;
        ScrollTrigger.refresh();
      }
      if (sequence.frame === i) render();
    };
    image.onerror = () => {
      loadedCount++;
      if (loadedCount === totalFrames) {
        allLoaded = true;
        ScrollTrigger.refresh();
      }
    };
    images.push(image);
  }

  drawFallback();

  try {
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

    gsap.to(header, {
      x: -120,
      opacity: 0,
      ease: 'power2.in',
      scrollTrigger: {
        trigger: section,
        start: 'top 45%',
        end: 'top 10%',
        scrub: 1,
      },
    });
  } catch (error) {
    console.warn('Dismantle animation error:', error.message);
  }
};

const initNavScroll = () => {
  const nav = document.querySelector('.nav');
  const navMenu = document.querySelector('.nav-menu');

  if (!nav) return;

  const closeNavMenu = () => {
    if (!navMenu) return;
    nav.classList.remove('is-open');
    navMenu.setAttribute('aria-expanded', 'false');
  };

  if (navMenu) {
    navMenu.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      navMenu.setAttribute('aria-expanded', String(isOpen));
    });

    document.addEventListener('click', (event) => {
      if (!nav.contains(event.target)) closeNavMenu();
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) closeNavMenu();
    });
  }

  let lastScroll = 0;
  let navTween = null;

  lenis.on('scroll', ({ scroll }) => {
    if (nav.classList.contains('is-open')) {
      lastScroll = scroll;
      return;
    }

    if (scroll <= 10) {
      gsap.to(nav, { yPercent: 0, duration: 0.3, ease: 'power2.out', overwrite: true });
      lastScroll = scroll;
      return;
    }

    if (scroll > lastScroll + 5) {
      gsap.to(nav, { yPercent: -100, duration: 0.25, ease: 'power2.out', overwrite: true });
    } else if (scroll < lastScroll - 5) {
      gsap.to(nav, { yPercent: 0, duration: 0.25, ease: 'power2.out', overwrite: true });
    }

    lastScroll = scroll;
  });
};

const initModal = () => {
  const modal = document.getElementById('reserve-modal');
  const closeButton = document.getElementById('modal-close');
  const openButtons = document.querySelectorAll('.open-reserve-modal');
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  const nav = document.querySelector('.nav');
  const navMenu = document.querySelector('.nav-menu');
  const form = document.getElementById('reserve-form');

  if (!modal || !closeButton) return;

  const closeNavMenu = () => {
    if (!nav || !navMenu) return;
    nav.classList.remove('is-open');
    navMenu.setAttribute('aria-expanded', 'false');
  };

  const openModal = () => {
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    lenis.stop();
  };

  const closeModal = () => {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    lenis.start();
  };

  openButtons.forEach((button) => button.addEventListener('click', openModal));
  closeButton.addEventListener('click', closeModal);

  modal.addEventListener('click', (event) => {
    if (event.target === modal) closeModal();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.classList.contains('active')) closeModal();
  });

  anchorLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      const targetId = link.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      event.preventDefault();
      closeNavMenu();
      lenis.scrollTo(target, { offset: -80, duration: 1 });
      if (modal.classList.contains('active')) closeModal();
    });
  });

  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());
      console.log('Reservation form submitted:', data);

      const submitBtn = form.querySelector('.form-submit-btn');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Thank You!';
      submitBtn.disabled = true;
      submitBtn.style.background = 'linear-gradient(180deg, #c9a97c 0%, #b8945e 100%)';

      setTimeout(() => {
        form.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        submitBtn.style.background = '';
        closeModal();
      }, 2000);
    });
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
