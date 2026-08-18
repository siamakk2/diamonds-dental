// Diamond's Dental Inc. — shared behaviour
(function () {
  'use strict';

  var header = document.getElementById('siteHeader');
  if (header) {
    window.addEventListener('scroll', function () {
      header.classList.toggle('scrolled', window.scrollY > 8);
    }, { passive: true });
  }

  // mobile menu
  var burger = document.getElementById('burgerBtn');
  var links = document.getElementById('navLinks');
  if (burger && links) {
    burger.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        links.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // language toggle, persisted across pages
  var btnEN = document.getElementById('btnEN');
  var btnES = document.getElementById('btnES');
  function setLang(lang) {
    document.documentElement.setAttribute('data-active-lang', lang);
    if (btnEN && btnES) {
      btnEN.classList.toggle('active', lang === 'en');
      btnES.classList.toggle('active', lang === 'es');
      btnEN.setAttribute('aria-pressed', lang === 'en');
      btnES.setAttribute('aria-pressed', lang === 'es');
    }
    try { localStorage.setItem('dd-lang', lang); } catch (e) {}
  }
  if (btnEN && btnES) {
    btnEN.addEventListener('click', function () { setLang('en'); });
    btnES.addEventListener('click', function () { setLang('es'); });
  }
  try { setLang(localStorage.getItem('dd-lang') || 'en'); } catch (e) { setLang('en'); }

  // footer year
  var yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();

  // highlight today's hours
  var today = document.querySelector('.hours-table tr[data-day="' + new Date().getDay() + '"]');
  if (today) today.classList.add('today');

  // scroll reveal
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  // appointment request -> pre-filled email to the office
  var OFFICE_EMAIL = 'REPLACE_WITH_OFFICE_EMAIL@example.com';
  var form = document.getElementById('apptForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var d = new FormData(this);
      var body = [
        'Name: ' + d.get('name'),
        'Phone: ' + d.get('phone'),
        'Preferred day: ' + (d.get('day') || '-'),
        'Preferred time: ' + (d.get('time') || '-'),
        'Reason for visit: ' + (d.get('reason') || '-'),
        'Dental insurance: ' + (d.get('ins') || '-'),
        'Preferred language: ' + d.get('langpref'),
        'Message: ' + (d.get('message') || '-')
      ].join('\r\n');
      window.location.href = 'mailto:' + OFFICE_EMAIL +
        '?subject=' + encodeURIComponent('Appointment request - ' + d.get('name')) +
        '&body=' + encodeURIComponent(body);
    });
  }
})();
