const menuBtn = document.querySelector('#menu-btn');
const mainNav = document.querySelector('#main-nav');
const topBtn = document.querySelector('#top-btn');
const contactForm = document.querySelector('#contact-form');
const formMsg = document.querySelector('#form-msg');
const currentYear = document.querySelector('#current-year');
const profileImage = document.querySelector('#profile-image');

if (profileImage) {
  function showProfilePlaceholder() {
    if (!profileImage.src.endsWith('profile-placeholder.svg')) {
      profileImage.src = 'img/profile-placeholder.svg';
    }
  }

  profileImage.addEventListener('error', showProfilePlaceholder);

  if (profileImage.complete && profileImage.naturalWidth === 0) {
    showProfilePlaceholder();
  }
}

function closeMenu() {
  if (!menuBtn || !mainNav) return;

  mainNav.classList.remove('open');
  menuBtn.textContent = '☰';
  menuBtn.setAttribute('aria-expanded', 'false');
  menuBtn.setAttribute('aria-label', '메뉴 열기');
}

if (menuBtn && mainNav) {
  menuBtn.addEventListener('click', function () {
    const isOpen = mainNav.classList.toggle('open');
    menuBtn.textContent = isOpen ? '✕' : '☰';
    menuBtn.setAttribute('aria-expanded', String(isOpen));
    menuBtn.setAttribute('aria-label', isOpen ? '메뉴 닫기' : '메뉴 열기');
  });

  mainNav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  window.addEventListener('resize', function () {
    if (window.innerWidth >= 900) closeMenu();
  });
}

if (topBtn) {
  function updateTopButton() {
    topBtn.classList.toggle('show', window.scrollY > 500);
  }

  window.addEventListener('scroll', updateTopButton, { passive: true });
  updateTopButton();

  topBtn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

function showMessage(text, type) {
  if (!formMsg) return;

  formMsg.textContent = text;
  formMsg.className = type;
}

if (contactForm) {
  contactForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.querySelector('#name').value.trim();
    const email = document.querySelector('#email').value.trim();
    const message = document.querySelector('#message').value.trim();
    const recipient = contactForm.dataset.recipient;
    const emailRule = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (name === '') {
      showMessage('이름을 입력해 주세요.', 'error');
      return;
    }

    if (!emailRule.test(email)) {
      showMessage('올바른 이메일 주소를 입력해 주세요.', 'error');
      return;
    }

    if (message.length < 10) {
      showMessage('문의 내용을 10자 이상 입력해 주세요.', 'error');
      return;
    }

    const subject = encodeURIComponent(`[포트폴리오 문의] ${name}님`);
    const body = encodeURIComponent(`보낸 사람: ${name}\n회신 이메일: ${email}\n\n${message}`);

    showMessage('메일 앱을 여는 중입니다.', 'success');
    window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
  });
}

if (currentYear) {
  currentYear.textContent = String(new Date().getFullYear());
}
