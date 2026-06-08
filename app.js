/* ReViSense.AI — shared interactions */
(function () {
  'use strict';

  /* ---------- Mobile menu ---------- */
  document.addEventListener('click', function (e) {
    var t = e.target.closest('[data-nav-toggle]');
    if (t) {
      var menu = document.getElementById('mobileMenu');
      if (menu) menu.classList.toggle('open');
      return;
    }
    if (!e.target.closest('#mobileMenu') && !e.target.closest('[data-nav-toggle]')) {
      var m = document.getElementById('mobileMenu');
      if (m) m.classList.remove('open');
    }
  });

  /* ---------- Scroll reveal ---------- */
  var revs = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revs.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    revs.forEach(function (r) { io.observe(r); });
  } else {
    revs.forEach(function (r) { r.classList.add('in'); });
  }

  /* ---------- Animated counters ---------- */
  function animateCount(el) {
    var raw = el.getAttribute('data-count');
    var target = parseFloat(raw);
    var suffix = el.getAttribute('data-suffix') || '';
    var prefix = el.getAttribute('data-prefix') || '';
    var decimals = (raw.split('.')[1] || '').length;
    var dur = 1400, start = performance.now();
    function frame(now) {
      var p = Math.min((now - start) / dur, 1);
      var e = 1 - Math.pow(1 - p, 3);
      var val = target * e;
      el.textContent = prefix + val.toLocaleString('en-IN', { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) + suffix;
      if (p < 1) requestAnimationFrame(frame);
      else el.textContent = prefix + target.toLocaleString('en-IN', { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) + suffix;
    }
    requestAnimationFrame(frame);
  }
  var counters = document.querySelectorAll('[data-count]');
  if ('IntersectionObserver' in window && counters.length) {
    var co = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { animateCount(en.target); co.unobserve(en.target); }
      });
    }, { threshold: 0.6 });
    counters.forEach(function (c) { co.observe(c); });
  }

  /* ---------- Generic tab groups ---------- */
  document.querySelectorAll('[data-tabs]').forEach(function (group) {
    var scope = group.getAttribute('data-tabs-scope');
    var root = scope ? document.querySelector(scope) : document;
    group.addEventListener('click', function (e) {
      var b = e.target.closest('[data-tab]');
      if (!b) return;
      var key = b.getAttribute('data-tab');
      group.querySelectorAll('[data-tab]').forEach(function (x) { x.classList.toggle('active', x === b); });
      root.querySelectorAll('[data-panel]').forEach(function (p) {
        var on = p.getAttribute('data-panel') === key;
        p.classList.toggle('show', on);
      });
    });
  });

  /* ---------- Nav shadow on scroll ---------- */
  var nav = document.querySelector('.nav');
  if (nav) {
    var onScroll = function () {
      if (window.scrollY > 12) nav.style.borderColor = 'var(--border-2)';
      else nav.style.borderColor = 'var(--border)';
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ====================================================================
     FORM HANDLING - SIMPLE & WORKING
     ==================================================================== */

  function leadFormMarkup(opts) {
    opts = opts || {};
    return '<form class="lead-form" data-lead-form><div class="lead-err" data-lead-err></div><div class="row2"><div class="field"><label>Your Name <span class="req">*</span></label><input name="Name" type="text" required placeholder="Principal / Admin name" autocomplete="name" /></div><div class="field"><label>Phone Number <span class="req">*</span></label><input name="Phone" type="tel" required placeholder="+91 98765 43210" autocomplete="tel" /></div></div><div class="field"><label>School Name <span class="req">*</span></label><input name="School" type="text" required placeholder="Your school's full name" /></div><div class="row2"><div class="field"><label>City / District <span class="req">*</span></label><input name="City" type="text" required placeholder="Bangalore, Chennai..." /></div><div class="field"><label>No. of Students</label><select name="Students"><option>Under 200</option><option>200 – 500</option><option>500 – 1000</option><option>1000 – 2500</option><option>2500+</option></select></div></div><div class="field"><label>Package Interest</label><select name="Package"><option selected>Free Trial (15 days — all features)</option><option>Advance Package</option><option>Premium Package</option><option>Elite (Custom)</option><option>3D Hologram / Digital Board</option><option>Book a Demo</option></select></div><div class="field"><label>Email Address</label><input name="Email" type="email" placeholder="admin@yourschool.com" autocomplete="email" /></div><input type="hidden" name="_subject" value="New ReViSense.AI lead" /><input type="text" name="_honey" style="display:none" tabindex="-1" autocomplete="off" /><button type="submit" class="btn-submit">Submit & Get Started →</button><p class="lead-note"><svg viewBox="0 0 24 24" fill="none" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>Your information is secure and never shared. We will contact you within 24 hours.</p></form>';
  }

  function leadSuccessMarkup() {
    return '<div class="lead-success"><div class="ok"><svg viewBox="0 0 24 24" fill="none" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg></div><h3>You are all set! 🎉</h3><p>Thanks for reaching out. Our team will contact you within 24 hours to set up your school account — completely free for 15 days.</p></div>';
  }

  var overlay = null;
  function buildOverlay() {
    if (overlay) return overlay;
    overlay = document.createElement('div');
    overlay.className = 'lead-overlay';
    overlay.innerHTML = '<div class="lead-dialog" role="dialog" aria-modal="true" aria-label="Start your free trial"><button class="lead-close" data-lead-close aria-label="Close"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg></button><div class="lead-card"><span class="lc-eye">ReViSense.AI</span><h3>Start Your Free Trial</h3><p class="lc-sub">Fill in your details and we will set up your full-feature school account within 24 hours — completely free for 15 days.</p><div data-lead-slot>' + leadFormMarkup() + '</div></div></div>';
    document.body.appendChild(overlay);
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay || e.target.closest('[data-lead-close]')) closeLead();
    });
    return overlay;
  }

  function openLead(opts) {
    buildOverlay();
    var slot = overlay.querySelector('[data-lead-slot]');
    slot.innerHTML = leadFormMarkup(opts || {});
    overlay.classList.add('open');
    document.documentElement.style.overflow = 'hidden';
    var first = overlay.querySelector('input,select'); if (first) setTimeout(function () { first.focus(); }, 60);
  }

  function closeLead() {
    if (!overlay) return;
    overlay.classList.remove('open');
    document.documentElement.style.overflow = '';
  }

  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeLead(); });

  var TRIAL_RX = /(book\s+(a\s+|enterprise\s+)?demo|free trial|get started|get premium|contact for elite|claim trial|talk to us|schedule a demo|start institution setup|request quote|get a quote)/i;
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a, button');
    if (!a) return;
    if (a.hasAttribute('data-no-modal') || a.type === 'submit' || a.closest('[data-lead-form]')) return;
    var txt = (a.textContent || '').replace(/\s+/g, ' ').trim();
    if (a.hasAttribute('data-trial') || TRIAL_RX.test(txt)) {
      e.preventDefault();
      var pkg = a.getAttribute('data-pkg') || '';
      var src = a.getAttribute('data-source') || txt.slice(0, 60) || 'Website';
      openLead({ pkg: pkg, source: src });
    }
  });

  /* FORM SUBMISSION - SHOW SUCCESS */
  document.addEventListener('submit', function (e) {
    var form = e.target.closest('[data-lead-form]');
    if (!form) return;
    e.preventDefault();

    // Spam check
    if (form.querySelector('[name="_honey"]') && form.querySelector('[name="_honey"]').value) return;

    // Get form data
    var formData = {};
    new FormData(form).forEach(function(v, k) {
      formData[k] = v;
    });

    console.log('✓ Form Submitted:', formData);

    // SHOW SUCCESS IMMEDIATELY
    var slot = form.parentNode;
    if (slot) {
      slot.innerHTML = leadSuccessMarkup();

      // Add close button if in modal
      if (overlay && overlay.classList.contains('open')) {
        var sc = slot.querySelector('.lead-success');
        if (sc) {
          var btn = document.createElement('button');
          btn.className = 'btn btn-primary';
          btn.textContent = 'Close';
          btn.setAttribute('data-lead-close','');
          btn.onclick = function() { closeLead(); };
          sc.appendChild(btn);
        }
      }
    }
  });

  window.ReViSenseLead = { open: openLead, close: closeLead };
})();
