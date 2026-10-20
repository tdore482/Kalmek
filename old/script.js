/* Kalmek: interactions
   Motion follows the design system tokens:
   fast 120ms press, base 250ms hover, slow 500ms slider/reveal,
   ease-out for entrances and hovers, ease-in-out for the slider track. */

(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* ---------- hero entrance (one orchestrated load moment) ---------- */

  function playHero() {
    document.querySelectorAll('[data-hero]').forEach(function (el) {
      el.classList.add('is-in');
    });
  }

  if (reduceMotion.matches) {
    playHero();
  } else {
    requestAnimationFrame(function () {
      requestAnimationFrame(playHero);
    });
  }

  /* ---------- scroll reveals (headings, cards, gallery; once only) ---------- */

  var revealEls = document.querySelectorAll('[data-reveal]');

  if (reduceMotion.matches || !('IntersectionObserver' in window)) {
    revealEls.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.15 });

    revealEls.forEach(function (el) { observer.observe(el); });
  }

  /* ---------- navigation ---------- */

  var navLinks = document.getElementById('nav-links');
  var navToggle = document.querySelector('.nav__toggle');

  function setMenu(open) {
    if (!navLinks || !navToggle) return;
    navLinks.classList.toggle('is-open', open);
    navToggle.setAttribute('aria-expanded', String(open));
    var icon = navToggle.querySelector('.ph');
    if (icon) icon.className = open ? 'ph ph-x' : 'ph ph-list';
  }

  if (navToggle) {
    navToggle.addEventListener('click', function () {
      setMenu(!navLinks.classList.contains('is-open'));
    });
  }

  if (navLinks) {
    navLinks.addEventListener('click', function (event) {
      if (event.target.closest('a')) setMenu(false);
    });
  }

  /* ---------- nav search ---------- */

  var searchBtn = document.querySelector('.nav__search-btn');
  var searchForm = document.querySelector('.nav__search');
  var searchNote = document.querySelector('.nav__search-note');

  function setSearch(open) {
    if (!searchForm || !searchBtn) return;
    searchForm.classList.toggle('is-open', open);
    searchBtn.setAttribute('aria-expanded', String(open));
    if (open) {
      var input = searchForm.querySelector('input');
      if (input) input.focus();
    } else if (searchNote) {
      searchNote.textContent = '';
    }
  }

  if (searchBtn) {
    searchBtn.addEventListener('click', function () {
      setSearch(!searchForm.classList.contains('is-open'));
    });
  }

  if (searchForm) {
    searchForm.addEventListener('submit', function (event) {
      event.preventDefault();
      if (searchNote) {
        searchNote.textContent = 'Search opens with the full site. Try the destination grid below.';
      }
    });
  }

  document.addEventListener('keydown', function (event) {
    if (event.key !== 'Escape') return;
    setMenu(false);
    setSearch(false);
  });

  /* ---------- testimonial slider ---------- */

  var slider = document.querySelector('[data-slider]');

  if (slider) {
    var track = slider.querySelector('.slider__track');
    var cards = Array.prototype.slice.call(track.children);
    var dotsWrap = slider.querySelector('[data-slider-dots]');
    var viewport = slider.querySelector('.slider__viewport');
    var perView = 1;
    var index = 0;
    var timer = null;
    var autoplayMs = 5000;

    function readPerView() {
      var raw = getComputedStyle(slider).getPropertyValue('--per-view');
      var parsed = parseInt(raw, 10);
      return parsed > 0 ? parsed : 1;
    }

    function maxIndex() {
      return Math.max(0, cards.length - perView);
    }

    function renderDots() {
      dotsWrap.innerHTML = '';
      for (var i = 0; i <= maxIndex(); i++) {
        var dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'dot';
        dot.setAttribute('aria-label', 'Go to testimonial ' + (i + 1));
        dot.dataset.index = String(i);
        dotsWrap.appendChild(dot);
      }
      syncDots();
    }

    function syncDots() {
      Array.prototype.forEach.call(dotsWrap.children, function (dot, i) {
        var active = i === index;
        dot.classList.toggle('is-active', active);
        if (active) {
          dot.setAttribute('aria-current', 'true');
        } else {
          dot.removeAttribute('aria-current');
        }
      });
    }

    function goTo(next) {
      index = Math.min(Math.max(next, 0), maxIndex());
      var offset = cards[index].offsetLeft - cards[0].offsetLeft;
      track.style.transform = 'translateX(' + (-offset) + 'px)';
      syncDots();
    }

    function step() {
      goTo(index >= maxIndex() ? 0 : index + 1);
    }

    function stopAutoplay() {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    }

    function startAutoplay() {
      stopAutoplay();
      if (reduceMotion.matches || document.hidden) return;
      timer = setInterval(step, autoplayMs);
    }

    function restartAutoplay() {
      stopAutoplay();
      startAutoplay();
    }

    dotsWrap.addEventListener('click', function (event) {
      var dot = event.target.closest('.dot');
      if (!dot) return;
      goTo(parseInt(dot.dataset.index, 10));
      restartAutoplay();
    });

    slider.addEventListener('mouseenter', stopAutoplay);
    slider.addEventListener('mouseleave', startAutoplay);
    slider.addEventListener('focusin', stopAutoplay);
    slider.addEventListener('focusout', function (event) {
      if (!slider.contains(event.relatedTarget)) startAutoplay();
    });

    document.addEventListener('visibilitychange', function () {
      if (document.hidden) stopAutoplay();
      else startAutoplay();
    });

    /* swipe: one card per flick, same easing as the track */
    var startX = null;
    var startY = null;

    viewport.addEventListener('pointerdown', function (event) {
      startX = event.clientX;
      startY = event.clientY;
    });

    viewport.addEventListener('pointerup', function (event) {
      if (startX === null) return;
      var dx = event.clientX - startX;
      var dy = event.clientY - startY;
      startX = null;
      startY = null;
      if (Math.abs(dx) < 50 || Math.abs(dy) > 40) return;
      goTo(dx < 0 ? index + 1 : index - 1);
      restartAutoplay();
    });

    var resizeTimer = null;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        var next = readPerView();
        if (next !== perView) {
          perView = next;
          renderDots();
        }
        goTo(Math.min(index, maxIndex()));
      }, 150);
    });

    perView = readPerView();
    renderDots();
    goTo(0);
    startAutoplay();

    reduceMotion.addEventListener('change', function () {
      if (reduceMotion.matches) stopAutoplay();
      else startAutoplay();
    });
  }

  /* ---------- experience detail modal ---------- */

  var EXPERIENCES = {
    mulanje: {
      title: 'Mount Mulanje massif hikes',
      loc: 'Mulanje, Southern Region',
      price: '$260',
      img: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=80',
      alt: '',
      summary: 'Walk the forested lower slopes and, for the bold, the granite dome of Sapitwa, the highest point in Central Africa, with a guide who grew up on the mountain.',
      duration: '3 days / 2 nights',
      group: 'Max 12',
      level: 'Moderate to hard',
      highlights: [
        'Sunrise on Sapitwa peak at 3,002 m',
        'Cedar and podocarpus forest trails',
        'Tea estate walk and tasting',
        'A swim at the Likhubula rock pools'
      ],
      included: [
        'Licensed mountain guide',
        'Park fees and hut permits',
        'All meals on the trail',
        'Transfers from Blantyre'
      ]
    },
    capemaclear: {
      title: 'Cape Maclear lake days',
      loc: 'Cape Maclear, Lake Malawi',
      price: '$340',
      img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80',
      alt: '',
      summary: 'Turquoise water, granite islands and the clearest freshwater on the continent. Snorkel among cichlids, paddle to Domwe and watch fish eagles hunt at dusk.',
      duration: '4 days / 3 nights',
      group: 'Max 10',
      level: 'Easy',
      highlights: [
        'Snorkelling the Lake Malawi cichlid reefs',
        'Kayak to Domwe and Thumbi islands',
        'Sunset dhow cruise',
        'Guided village walk'
      ],
      included: [
        'Lakefront lodge nights',
        'Snorkel and kayak gear',
        'Boat trips with a local guide',
        'All breakfasts and dinners'
      ]
    },
    liwonde: {
      title: 'Liwonde river safaris',
      loc: 'Liwonde National Park, Machinga',
      price: '$480',
      img: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=1200&q=80',
      alt: '',
      summary: 'Drift the Shire River past pods of hippo and herds of elephant, then swap the boat for a game drive as the light turns gold.',
      duration: '3 days / 2 nights',
      group: 'Max 8',
      level: 'Easy',
      highlights: [
        'Boat safari on the Shire River',
        'Large herds of elephant and sable',
        'Fish eagles, bee-eaters and kingfishers',
        'A night drive from the lodge'
      ],
      included: [
        'Riverside lodge nights',
        'Two safaris each day',
        'Park and conservation fees',
        'All meals and drinks'
      ]
    },
    majete: {
      title: 'Majete big-game drives',
      loc: 'Majete Wildlife Reserve, Chikwawa',
      price: '$460',
      img: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1200&q=80',
      alt: '',
      summary: 'Malawi\u2019s comeback story: a reserve hunted out decades ago, now home to the Big Five and a model community partnership.',
      duration: '3 days / 2 nights',
      group: 'Max 8',
      level: 'Easy',
      highlights: [
        'Big Five game drives',
        'Walking safari with an armed ranger',
        'River and waterhole hides',
        'A community project visit'
      ],
      included: [
        'Tented camp nights',
        'All game activities',
        'Park fees',
        'All meals'
      ]
    },
    nyika: {
      title: 'Nyika plateau rides',
      loc: 'Nyika National Park, Rumphi',
      price: '$520',
      img: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=1200&q=80',
      alt: '',
      summary: 'High rolling grassland, orchids and the largest population of Crawshay\u2019s zebra anywhere. Ride, hike or cycle by day and warm up by the fire at night.',
      duration: '4 days / 3 nights',
      group: 'Max 8',
      level: 'Moderate',
      highlights: [
        'Horseback or mountain-bike safari',
        'Crawshay\u2019s zebra and roan antelope',
        'Afromontane forest walks',
        'Star-filled highland nights'
      ],
      included: [
        'Plateau lodge nights',
        'Guided rides or hikes',
        'Park fees',
        'All meals'
      ]
    },
    likoma: {
      title: 'Likoma island escapes',
      loc: 'Likoma Island, Lake Malawi',
      price: '$610',
      img: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80',
      alt: '',
      summary: 'A quiet island in the middle of the lake, reachable by boat or plane, with sandy coves, giant baobabs and St Peter\u2019s, one of Africa\u2019s largest cathedrals.',
      duration: '4 days / 3 nights',
      group: 'Max 10',
      level: 'Easy',
      highlights: [
        'Beach days along the island coves',
        'Snorkelling and kayaking',
        'St Peter\u2019s Cathedral and baobab walks',
        'Fresh chambo dinners by the water'
      ],
      included: [
        'Island lodge nights',
        'Boat transfers',
        'Snorkel and kayak gear',
        'All meals'
      ]
    }
  };

  var modal = document.getElementById('exp-modal');

  if (modal && typeof modal.showModal === 'function') {
    var mImg = modal.querySelector('.exp-modal__img');
    var mPrice = modal.querySelector('[data-exp-price]');
    var mLoc = modal.querySelector('[data-exp-loc]');
    var mTitle = modal.querySelector('[data-exp-title]');
    var mSummary = modal.querySelector('[data-exp-summary]');
    var mDuration = modal.querySelector('[data-exp-duration]');
    var mGroup = modal.querySelector('[data-exp-group]');
    var mLevel = modal.querySelector('[data-exp-level]');
    var mHighlights = modal.querySelector('[data-exp-highlights]');
    var mIncluded = modal.querySelector('[data-exp-included]');
    var mClose = modal.querySelector('[data-exp-close]');
    var mBook = modal.querySelector('[data-exp-book]');
    var lastTrigger = null;

    var fillList = function (el, items) {
      el.innerHTML = '';
      items.forEach(function (item) {
        var li = document.createElement('li');
        var tick = document.createElement('i');
        tick.className = 'ph ph-check';
        tick.setAttribute('aria-hidden', 'true');
        li.appendChild(tick);
        li.appendChild(document.createTextNode(item));
        el.appendChild(li);
      });
    };

    var openExperience = function (id, trigger) {
      var data = EXPERIENCES[id];
      if (!data) return;
      lastTrigger = trigger || null;
      mImg.src = data.img;
      mImg.alt = data.alt;
      mPrice.innerHTML = '<b>' + data.price + '</b><small>/person</small>';
      mLoc.textContent = data.loc;
      mTitle.textContent = data.title;
      mSummary.textContent = data.summary;
      mDuration.textContent = data.duration;
      mGroup.textContent = data.group;
      mLevel.textContent = data.level;
      fillList(mHighlights, data.highlights);
      fillList(mIncluded, data.included);
      modal.dataset.current = id;
      modal.showModal();
      document.body.classList.add('modal-open');
      if (mClose) mClose.focus();
    };

    document.querySelectorAll('[data-exp]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        openExperience(btn.dataset.exp, btn);
      });
    });

    if (mClose) {
      mClose.addEventListener('click', function () {
        modal.close();
      });
    }

    modal.addEventListener('click', function (event) {
      if (event.target === modal) modal.close();
    });

    modal.addEventListener('close', function () {
      document.body.classList.remove('modal-open');
      if (lastTrigger && typeof lastTrigger.focus === 'function') lastTrigger.focus();
    });

    if (mBook) {
      mBook.addEventListener('click', function () {
        var select = document.getElementById('contact-trip');
        if (select && modal.dataset.current) select.value = modal.dataset.current;
        modal.close();
      });
    }
  }

  /* ---------- contact form ---------- */

  var contact = document.querySelector('[data-contact]');

  if (contact) {
    var cNote = contact.querySelector('.contact__note');
    contact.addEventListener('submit', function (event) {
      event.preventDefault();
      var name = contact.querySelector('#contact-name');
      var who = name && name.value.trim() ? 'Thanks, ' + name.value.trim() + '.' : 'Thanks.';
      if (cNote) {
        cNote.textContent = who + ' A Kalmek planner will reply within one working day.';
      }
      contact.reset();
    });
  }

  /* ---------- newsletter ---------- */

  var newsletter = document.querySelector('[data-newsletter]');

  if (newsletter) {
    var note = newsletter.querySelector('.newsletter__note');
    newsletter.addEventListener('submit', function (event) {
      event.preventDefault();
      var input = newsletter.querySelector('input');
      var button = newsletter.querySelector('button');
      input.value = '';
      input.placeholder = 'Subscribed';
      button.textContent = 'Done';
      button.disabled = true;
      if (note) note.textContent = 'Thanks, we will write soon.';
      setTimeout(function () {
        button.textContent = 'Subscribe';
        button.disabled = false;
        input.placeholder = 'Email';
      }, 4000);
    });
  }
})();
