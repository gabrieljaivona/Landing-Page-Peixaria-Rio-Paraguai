/* ============================================
   PEIXARIA RIO PARAGUAI — script.js
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* -----------------------------------------
     1. MENU HAMBURGER
     ----------------------------------------- */
  const hamburger = document.querySelector('.hamburger');
  const navMenu   = document.querySelector('.nav-menu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });

    document.addEventListener('click', (e) => {
      if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      }
    });
  }

  /* -----------------------------------------
     2. BANNER DE COOKIES (LGPD / AdSense)
     ----------------------------------------- */
  const cookieBanner = document.getElementById('cookieBanner') || document.querySelector('.cookie-banner');
  const cookieAccept = document.getElementById('cookieAccept') || document.querySelector('.cookie-accept');

  if (cookieBanner && cookieAccept) {
    if (localStorage.getItem('cookie_consent') === 'accepted') {
      cookieBanner.classList.add('hidden');
    }

    cookieAccept.addEventListener('click', () => {
      localStorage.setItem('cookie_consent', 'accepted');
      cookieBanner.classList.add('hidden');
    });
  }

  /* -----------------------------------------
     3. SELEÇÃO DE CORTES (Página de Detalhe)
     ----------------------------------------- */
  const cutOptions = document.querySelectorAll('.cut-option');
  const mainGalleryImg = document.querySelector('.gallery-main img');
  const galleryThumbs  = document.querySelectorAll('.gallery-thumb');

  cutOptions.forEach(option => {
    option.addEventListener('click', () => {
      cutOptions.forEach(o => o.classList.remove('selected'));
      option.classList.add('selected');
      const radio = option.querySelector('input[type="radio"]');
      if (radio) radio.checked = true;

      const targetImage = option.dataset.image;
      if (targetImage && mainGalleryImg) {
        mainGalleryImg.src = targetImage;
        galleryThumbs.forEach(thumb => {
          const thumbImg = thumb.querySelector('img');
          thumb.classList.toggle('active', thumbImg && thumbImg.getAttribute('src') === targetImage);
        });
      }
    });
  });

  /* -----------------------------------------
     4. GALERIA DE IMAGENS (Página de Detalhe)
     ----------------------------------------- */
  document.querySelectorAll('.product-gallery').forEach(gallery => {
    const mainImg = gallery.querySelector('.gallery-main img');
    const thumbs  = gallery.querySelectorAll('.gallery-thumb');

    thumbs.forEach(thumb => {
      thumb.addEventListener('click', () => {
        const thumbImg = thumb.querySelector('img');
        mainImg.src = thumbImg.src;
        mainImg.alt = thumbImg.alt;
        thumbs.forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
      });
    });
  });

  /* -----------------------------------------
     5. FILTROS DO CATÁLOGO

     Fluxo em duas etapas para transição suave:
       1. Fade-out (opacity → 0) nos cards atualmente visíveis.
       2. Após FADE_MS ms (mesmo valor da transition CSS), aplica display:none
          nos cards que não batem com o filtro e restaura opacity nos demais.
     O atributo data-category nos cards é comparado com data-filter dos botões.
     O valor "all" exibe tudo.
     ----------------------------------------- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const FADE_MS = 250;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      const cards  = document.querySelectorAll('.catalog-card');

      // Etapa 1: fade-out dos cards atualmente visíveis
      cards.forEach(card => {
        if (card.style.display !== 'none') {
          card.style.opacity   = '0';
          card.style.transform = 'translateY(8px) scale(0.97)';
        }
      });

      // Etapa 2: após o fade-out, redefine visibilidade e faz fade-in
      setTimeout(() => {
        cards.forEach(card => {
          const match = filter === 'all' || card.dataset.category === filter;
          card.style.display   = match ? '' : 'none';
          card.style.opacity   = '';
          card.style.transform = '';
        });
      }, FADE_MS);
    });
  });

});
