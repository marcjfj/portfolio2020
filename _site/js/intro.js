const head = document.querySelector('.marc-head');
const left = document.querySelector('.intro-box .left');
if (head) {
  gsap.to(head, { y: 0, duration: 3, ease: 'bounce.out' });
  const tl = gsap.timeline({ repeat: -1 });

  tl.to(
    head,
    {
      rotation: -5,
      transformOrigin: '100% 100%',
      duration: 3,
      ease: 'Power3.out',
      repeat: 1,
      yoyo: true,
    },
    0
  );
  tl.to(
    head,
    {
      rotation: 5,
      transformOrigin: '0% 100%',
      duration: 3,
      ease: 'Power3.In',
      repeat: 1,
      yoyo: true,
    },
    6
  );

  left.addEventListener('mouseenter', () => {
    gsap.to(head, { y: 300, duration: 1, ease: 'Power3.out' });
  });
  left.addEventListener('mouseleave', () => {
    gsap.to(head, { y: 0, duration: 3, ease: 'bounce.out' });
  });
  const eBox = document.querySelector('.contact-box');
  const email = eBox.querySelector('a');

  eBox.addEventListener('mousemove', e => {
    //   console.log(e);
    const x = e.clientX;
    const y = e.clientY;
    gsap.to(email, {
      transformOrigin: '50% 50%',
      x: x - e.target.clientWidth / 2,
    });
    gsap.to(email, {
      transformOrigin: '50% 50%',
      y: y - e.target.clientHeight,
    });
  });
  eBox.addEventListener('mouseleave', e => {
    gsap.to(email, { x: 0 });
    gsap.to(email, { y: 0 });
  });

  const sectionTitle = document.querySelectorAll('.section-title');
  sectionTitle.forEach(title => {
    // init controller
    var controller = new ScrollMagic.Controller();
    const titleHead = title.querySelector('.title');
    const titleTag = title.querySelector('.tagline');
    const titleLine = title.querySelector('.line');
    console.log('made it');
    // create a scene
    const secFade = gsap.timeline({});
    const fadeIn = secFade
      .to(titleHead, { y: 0, opacity: 1, duration: 0.2, ease: 'Power4.out' })
      .to(titleTag, { y: 0, opacity: 1, duration: 0.2, ease: 'Power4.out' })
      .to(
        titleLine,
        {
          scaleX: 1,
          opacity: 1,
          duration: 0.2,
          ease: 'Power4.out',
        },
        '-=.3'
      );
    new ScrollMagic.Scene({
      triggerElement: title,
      offset: -50, // start this scene after scrolling for 50px
    })
      .setTween(fadeIn)
      .addTo(controller); // assign the scene to the controller
  });
}

const headerBox = document.querySelectorAll('header .name-block div');
const headerLine = document.querySelectorAll('header .line');
const headerFade = gsap.timeline({});
const headerFadePlay = headerFade
  .to(headerBox, { opacity: 1, y: 0, stagger: { amount: 0.2 } }, 0.2)
  .to(headerLine, { scaleX: 1 }, '-=0.2')
  .to('header nav a', { opacity: 1, x: 0, stagger: { amount: 0.2 } }, '-=0.2');
