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
      img: 'assets/images/Mulanje-Mountain-Hiking.jpg',
      alt: '',
      gallery: [
        'assets/images/Mulanje-Mountain-Hiking.jpg',
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80'
      ],
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
      img: 'https://images.unsplash.com/photo-1751318416461-e028cae693ef?auto=format&fit=crop&w=1200&q=80',
      alt: '',
      gallery: [
        'https://images.unsplash.com/photo-1751318416461-e028cae693ef?auto=format&fit=crop&w=1200&q=80',
        'assets/images/meg-von-haartman-RtZUgho6x-s-unsplash.jpg',
        'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80'
      ],
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
      img: 'assets/images/river-safari.jpg',
      alt: '',
      gallery: [
        'assets/images/river-safari.jpg',
        'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&w=1200&q=80'
      ],
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
      img: 'assets/images/Majete-Game-Drives.jpg',
      alt: '',
      gallery: [
        'assets/images/Majete-Game-Drives.jpg',
        'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80'
      ],
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
      img: 'assets/images/plateau-rides.jpg',
      alt: '',
      gallery: [
        'assets/images/plateau-rides.jpg',
        'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=1200&q=80'
      ],
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
      img: 'assets/images/Likoma-Island.jpg',
      alt: '',
      gallery: [
        'assets/images/Likoma-Island.jpg',
        'https://images.unsplash.com/photo-1505881502353-a1986add3762?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80'
      ],
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

  /* ---------- booking confirmation dialog ---------- */

  var confirmDlg = document.getElementById('book-confirm');

  function showConfirm(name, trip) {
    if (!confirmDlg || typeof confirmDlg.showModal !== 'function') return;
    var n = confirmDlg.querySelector('[data-confirm-name]');
    var t = confirmDlg.querySelector('[data-confirm-trip]');
    if (n) n.textContent = name;
    if (t) t.textContent = trip || 'your trip';
    confirmDlg.showModal();
  }

  if (confirmDlg) {
    confirmDlg.querySelector('[data-confirm-close]').addEventListener('click', function () { confirmDlg.close(); });
    confirmDlg.addEventListener('click', function (e) { if (e.target === confirmDlg) confirmDlg.close(); });
  }

  /* ---------- gallery lightbox ---------- */

  var lightbox = document.getElementById('lightbox');

  if (lightbox && typeof lightbox.showModal === 'function') {
    var lbItems = Array.prototype.slice.call(document.querySelectorAll('[data-lightbox]'));
    var lbImg = lightbox.querySelector('[data-lb-img]');
    var lbCap = lightbox.querySelector('[data-lb-cap]');
    var lbIndex = 0;
    var paint = function () {
      var btn = lbItems[lbIndex];
      var img = btn.querySelector('img');
      lbImg.src = img.currentSrc || img.src;
      lbImg.alt = img.alt || '';
      lbCap.textContent = btn.dataset.caption || '';
    };
    lbItems.forEach(function (btn, i) {
      btn.addEventListener('click', function () { lbIndex = i; paint(); lightbox.showModal(); });
    });
    lightbox.querySelector('[data-lb-close]').addEventListener('click', function () { lightbox.close(); });
    lightbox.querySelector('[data-lb-prev]').addEventListener('click', function (e) { e.stopPropagation(); lbIndex = (lbIndex - 1 + lbItems.length) % lbItems.length; paint(); });
    lightbox.querySelector('[data-lb-next]').addEventListener('click', function (e) { e.stopPropagation(); lbIndex = (lbIndex + 1) % lbItems.length; paint(); });
    lightbox.addEventListener('click', function (e) { if (e.target === lightbox) lightbox.close(); });
    lightbox.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') lightbox.querySelector('[data-lb-prev]').click();
      if (e.key === 'ArrowRight') lightbox.querySelector('[data-lb-next]').click();
    });
  }

  var modal = document.getElementById('exp-modal');
  if (modal && typeof modal.showModal === 'function') {
    var $ = function (s) { return modal.querySelector(s); };
    var ids = Object.keys(EXPERIENCES), lastTrigger = null, cur = null;
    var money = function (n) { return '$' + n.toLocaleString('en-US'); };
    var fill = function (el, items) {
      el.innerHTML = '';
      items.forEach(function (t) { var li = document.createElement('li'); li.innerHTML = '<i class="ph ph-check"></i>'; li.appendChild(document.createTextNode(t)); el.appendChild(li); });
    };
    var chips = function (el, items, icon) {
      el.innerHTML = '';
      items.forEach(function (t) { var s = document.createElement('span'); s.innerHTML = icon ? '<i class="ph ' + icon + '"></i>' : ''; s.appendChild(document.createTextNode(t)); el.appendChild(s); });
    };
    var recalc = function () {
      if (!cur) return;
      var nights = parseInt(cur.duration.split('/')[1], 10) || 1, days = parseInt(cur.duration, 10) || nights + 1;
      var pax = parseInt($('[data-pax]').value, 10), base = parseInt(cur.price.replace('$', ''), 10) * pax, extra = 0, extras = [];
      modal.querySelectorAll('[data-x]:checked').forEach(function (c) { extra += parseInt(c.dataset.x, 10); extras.push(c.parentNode.textContent.trim() + ' ($' + c.dataset.x + ')'); });
      var disc = Math.round((base + extra) * (pax >= 6 ? .1 : 0));
      var start = $('[data-start]').value, endText = '';
      if (start) { var d = new Date(start); d.setDate(d.getDate() + days - 1); endText = d.toDateString().slice(4); $('[data-end]').textContent = endText; }
      var total = base + extra - disc;
      $('[data-sum]').innerHTML = '<div class="bk__row"><span>' + days + ' days &times; ' + pax + ' pax</span><b>' + money(base) + '</b></div><div class="bk__row"><span>Extras</span><b>' + money(extra) + '</b></div><div class="bk__row"><span>Service fee</span><b>$0</b></div><div class="bk__row"><span>Discount</span><b>-' + money(disc) + '</b></div><div class="bk__row bk__total"><span>Total Cost</span><span>' + money(total) + '</span></div>';
      $('[data-book-trip]').value = cur.title;
      $('[data-book-start]').value = start ? new Date(start).toDateString() : 'To be confirmed';
      $('[data-book-end]').value = endText || 'To be confirmed';
      $('[data-book-pax]').value = pax;
      $('[data-book-extras]').value = extras.length ? extras.join(', ') : 'None';
      $('[data-book-total]').value = money(total);
    };
    var show = function (id, trigger) {
      cur = EXPERIENCES[id]; if (!cur) return;
      lastTrigger = trigger || null; modal.dataset.current = id;
      var n = ids.indexOf(id), g = $('[data-gal]'); g.innerHTML = '';
      var gal = cur.gallery || [cur.img, EXPERIENCES[ids[(n + 1) % ids.length]].img, EXPERIENCES[ids[(n + 2) % ids.length]].img];
      gal.forEach(function (u) { var i = document.createElement('img'); i.src = u; i.alt = ''; g.appendChild(i); });
      $('[data-exp-title]').textContent = cur.title;
      $('[data-exp-loc]').textContent = cur.loc + ', Malawi';
      $('[data-exp-summary]').textContent = cur.summary;
      $('[data-exp-price]').innerHTML = cur.price + ' <small>/person</small>';
      chips($('[data-tags]'), [cur.level, cur.group, 'Small group', 'Malawi']);
      chips($('[data-feat]'), [cur.duration, cur.group, cur.included[0], cur.included[cur.included.length - 1]], 'ph-check-circle');
      fill($('[data-exp-highlights]'), cur.highlights); fill($('[data-exp-included]'), cur.included);
      var s = $('[data-start]'); s.min = new Date().toISOString().slice(0, 10); if (!s.value) { var t = new Date(); t.setDate(t.getDate() + 30); s.value = t.toISOString().slice(0, 10); }
      $('[data-note]').textContent = ''; recalc();
      modal.querySelectorAll('[data-tab]').forEach(function (b, i) { b.classList.toggle('on', i === 0); });
      modal.querySelectorAll('.bk__pane').forEach(function (p, i) { p.classList.toggle('on', i === 0); });
      modal.showModal(); document.body.classList.add('modal-open');
    };
    document.querySelectorAll('[data-exp]').forEach(function (b) { b.addEventListener('click', function () { show(b.dataset.exp, b); }); });
    modal.querySelectorAll('[data-tab]').forEach(function (b) {
      b.addEventListener('click', function () {
        modal.querySelectorAll('[data-tab]').forEach(function (x) { x.classList.toggle('on', x === b); });
        modal.querySelectorAll('.bk__pane').forEach(function (p, i) { p.classList.toggle('on', i === +b.dataset.tab); });
      });
    });
    modal.addEventListener('input', recalc); modal.addEventListener('change', recalc);
    $('[data-exp-close]').addEventListener('click', function () { modal.close(); });
    $('[data-goto-pay]').addEventListener('click', function () { var f = $('[data-book]'); if (f) f.scrollIntoView({ behavior: 'smooth', block: 'center' }); });
    $('[data-save]').addEventListener('click', function (e) { var i = e.currentTarget.firstElementChild; i.className = i.classList.contains('ph-fill') ? 'ph ph-heart' : 'ph-fill ph-heart'; });
    $('[data-share]').addEventListener('click', function () { if (navigator.clipboard) navigator.clipboard.writeText(location.href.split('#')[0] + '#discover'); $('[data-note]').textContent = 'Link copied.'; });
    var bookForm = $('[data-book]');
    if (bookForm) {
      bookForm.addEventListener('submit', function (e) {
        e.preventDefault();
        var note = $('[data-note]');
        var name = bookForm.elements.name.value.trim();
        var email = bookForm.elements.email.value.trim();
        var phone = bookForm.elements.phone.value.trim();
        if (!name || !email || !phone || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
          note.textContent = 'Please add your name, a valid email and a phone number.';
          bookForm.reportValidity();
          return;
        }
        recalc();
        if (window.location.protocol === 'file:') {
          note.textContent = 'Booking submitted. When hosted on a web server, this will be emailed to the owner.';
          var tripName = (bookForm.elements.trip && bookForm.elements.trip.value) || (cur ? cur.title : '');
          setTimeout(function() {
            showConfirm(name, tripName);
            modal.close();
            bookForm.reset();
            recalc();
          }, 300);
          return;
        }
        note.textContent = 'Sending your booking\u2026';
        var payload = {};
        new FormData(bookForm).forEach(function (v, k) { payload[k] = v; });
        payload.name = name; payload.email = email; payload.phone = phone;
        delete payload._honey;
        delete payload._subject;
        delete payload._template;
        delete payload._captcha;
        fetch('https://formsubmit.co/ajax/kohelethdigitalsolutions@gmail.com', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(payload)
        }).then(function (r) { 
          return r.json().catch(function () { return { success: 'true' }; }); 
        }).then(function (data) {
          note.textContent = '';
          bookForm.reset();
          recalc();
          showConfirm(name, payload.trip || (cur ? cur.title : ''));
          modal.close();
        }).catch(function () {
          note.textContent = '';
          showConfirm(name, payload.trip || (cur ? cur.title : ''));
          modal.close();
          bookForm.reset();
          recalc();
        });
      });
    }
    modal.addEventListener('click', function (e) { if (e.target === modal) modal.close(); });
    modal.addEventListener('close', function () { document.body.classList.remove('modal-open'); if (lastTrigger) lastTrigger.focus(); });
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
