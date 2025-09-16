// Toggle Dark Mode
document.addEventListener('DOMContentLoaded', () => {
  const darkToggle = document.getElementById('darkToggle');
  if (document.body.classList.contains('dark')) {
    darkToggle.textContent = '☀';
    darkToggle.setAttribute('aria-label', 'تبديل إلى الوضع النهاري');
  } else {
    darkToggle.textContent = '🌙';
    darkToggle.setAttribute('aria-label', 'تبديل إلى الوضع الليلي');
  }
  darkToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
  });
});

// Toast Notification Logic
function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.style.display = 'block';
  setTimeout(() => {
    toast.style.display = 'none';
  }, 3000);
}

// Open links with confirmation
function openLink(url, platform) {
  if (confirm(`You will be redirected to ${platform}. Do you want to continue?`)) {
    if (url.startsWith("mailto:") || url.startsWith("tel:") || url.includes("wa.me")) {
      window.location.href = url; // يفتح البريد أو الواتساب مباشرة
    } else {
      window.open(url, '_blank', 'noopener,noreferrer'); // يفتح الروابط الأخرى في نافذة جديدة
    }
  }
}

// Lazy load images
document.addEventListener('DOMContentLoaded', function() {
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    img.loading = 'lazy';
  });
});

// Counter Logic
document.addEventListener('DOMContentLoaded', () => {
  const projectsCount = document.getElementById('projects-count');
  const certificatesCount = document.getElementById('certificates-count');
  const experienceCount = document.getElementById('experience-count');

  const projects = 10; // عدد المشاريع المكتملة
  const certificates = document.querySelectorAll('.cert-marquee img').length / 2; // عدد الشهادات
  const experience = new Date().getFullYear() - 2024; // إذا كانت الخبرة بدأت في 2024

  let count = 0;
  const interval = setInterval(() => {
    if (count <= projects) projectsCount.textContent = count;
    if (count <= certificates) certificatesCount.textContent = count;
    if (count <= experience) experienceCount.textContent = count;

    if (count >= Math.max(projects, certificates, experience)) clearInterval(interval);
    count++;
  }, 100);
});

// Back to Top Button Logic
const backToTop = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTop.style.display = 'block';
  } else {
    backToTop.style.display = 'none';
  }
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
