async function detectLanguage() {
  try {
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();
    return data.country === 'ID' ? 'en' : 'id'; // Jika IP Indonesia pakai English, luar Indonesia pakai Bahasa
  } catch (error) {
    console.error('Gagal mendeteksi lokasi:', error);
    return 'id'; // Default ke Bahasa Indonesia jika error
  }
}

// Fungsi terjemahan
function applyTranslations(lang) {
  const translations = {
    en: {
      logo: "a",
      title: "Site Under Maintenance",
      subtitle: "We're currently upgrading our portfolio to bring you a better experience. We'll be back soon!",
      countdownLabel: "Coming Back: ",
      featuresTitle: "Why We're Updating",
      featuresSubtitle: "We're making significant improvements to provide you with the best portfolio experience.",
      // ... tambahkan terjemahan lainnya
    },
    id: {
      logo: "WkenD",
      title: "Situs Dalam Pemeliharaan",
      subtitle: "Kami sedang memperbarui portofolio untuk memberikan pengalaman yang lebih baik. Kami akan segera kembali!",
      countdownLabel: "Akan Kembali: ",
      featuresTitle: "Alasan Pembaruan",
      featuresSubtitle: "Kami melakukan perbaikan signifikan untuk memberikan pengalaman portofolio terbaik.",
      // ... tambahkan terjemahan lainnya
    }
  };

  // Terapkan terjemahan ke elemen
  document.querySelector('.logo').textContent = translations[lang].logo;
  document.querySelector('h1').textContent = translations[lang].title;
  document.querySelector('.subtitle').textContent = translations[lang].subtitle;
  document.querySelector('.countdown').innerHTML = translations[lang].countdownLabel +
    '<span id="countdown-timer">00:00:00:00</span>';
  document.querySelector('.features-heading h2').textContent = translations[lang].featuresTitle;
  document.querySelector('.features-heading p').textContent = translations[lang].featuresSubtitle;

  // Update semua teks lainnya sesuai kebutuhan...
}



// Pasang class untuk disable scroll segera saat DOM siap
document.documentElement.classList.add('loading');
document.body.classList.add('loading');

window.addEventListener('load', () => {
  // total animasi ≈ 6s (4s logo + 3×1s panel dengan overlap delay)
  const totalDuration = 8000;
  setTimeout(() => {
    // langsung remove overlay (tanpa fade)
    const loader = document.getElementById('loader');
    if (loader) loader.remove();
    // kembalikan scroll
    document.documentElement.classList.remove('loading');
    document.body.classList.remove('loading');
  }, totalDuration);
});







// Parallax effect for cards
const cards = document.querySelectorAll('.card');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  // Only apply parallax on desktop
  if (window.innerWidth > 768) {
    cards.forEach(card => {
      const speed = parseFloat(card.getAttribute('data-speed'));
      const yPos = -(scrollY * speed);

      // Get the initial position based on nth-child
      let initialPos = 0;
      if (card.parentElement.children[0] === card) initialPos = 20;
      else if (card.parentElement.children[1] === card) initialPos = -20;
      else if (card.parentElement.children[2] === card) initialPos = 20;
      else if (card.parentElement.children[3] === card) initialPos = -20;

      card.style.transform = `translateY(${initialPos + yPos}px)`;
    });
  }
});

// Form submission
const form = document.querySelector('.subscribe-form');
form.addEventListener('submit', function(e) {
  e.preventDefault();
  const email = this.querySelector('input[type="email"]').value;
  alert(`Thank you! We'll notify ${email} when our portfolio is back online.`);
  this.reset();
});

// Add smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});