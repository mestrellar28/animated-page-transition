import './main.scss';
import { gsap } from 'gsap';
import barba from '@barba/core';

// delay function
function delay(n) {
   n = n || 2000;
   return new Promise((done) => {
      setTimeout(() => {
         done();
      }, n);
   });
}

// page transtion animation function
function pageTransition() {
   let tl = gsap.timeline();

   tl.to('.transition-item', {
      duration: 0.3,
      scaleY: 1,
      transformOrigin: 'bottom left',
      stagger: 0.15,
      ease: 'power2.easeInOut',
   });
   tl.to('.transition-item', {
      duration: 0.3,
      scaleY: 0,
      transformOrigin: 'bottom left',
      stagger: 0.1,
      ease: 'power2.easeInOut',
   });
}

// content animation function
function contentAnimation() {
   let tl = gsap.timeline();

   tl.from('.item-left', {
      duration: 1.25,
      translateY: 150,
      opacity: 0,
      delay: 0.5,
   });

   tl.to(
      '.image',
      {
         duration: 0.75,
         clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)',
         ease: 'power2.out',
      },
      '-=0.75'
   );
}

// barba init
barba.init({
   sync: true,

   transitions: [
      {
         async leave(data) {
            const done = this.async();

            pageTransition();
            await delay(900);
            done();
         },

         async enter(data) {
            contentAnimation();
         },

         async once(data) {
            pageTransition();
            contentAnimation();
         },
      },
   ],
});

// do something before the transition starts
barba.hooks.before(() => {
   document.querySelector('html').classList.add('is-transitioning');
});

// do something after the transition finishes
barba.hooks.after(() => {
   document.querySelector('html').classList.remove('is-transitioning');
});

// scroll to the top of the page
barba.hooks.enter(() => {
   window.scrollTo(0, 0);
});
