/**
 * MIRCHARAM SWEETS & RESTAURANT
 * Absolute Image Integrity & UI Controller
 */

document.addEventListener('DOMContentLoaded', () => {

  // 1. Centralized Verified Product Data Structure
  const products = [
    {
      id: 'ghewar',
      name: 'Traditional Ghewar',
      category: 'traditional',
      image: 'assets/images/ghewar.webp',
      alt: 'Traditional Festive Ghewar from Mircharam Sweets',
      badge: 'Festive Classic',
      description: 'The celebrated honeycomb delicacy of North India, crafted crisp and steeped in fragrant syrup during festive seasons.'
    },
    {
      id: 'rasmalai',
      name: 'Kesar Rasmalai',
      category: 'milk',
      image: 'assets/images/rasmalai.webp',
      alt: 'Fresh Kesar Rasmalai from Mircharam Sweets',
      badge: 'Milk Confection',
      description: 'Delicate handmade cottage cheese discs soaked in saffron-infused chilled milk and garnished with slivered pistachios.'
    },
    {
      id: 'cham-cham',
      name: 'Cham Cham & Chumchum',
      category: 'milk',
      image: 'assets/images/cham-cham.webp',
      alt: 'Authentic Cham Cham sweet from Mircharam Sweets',
      badge: 'Heritage Special',
      description: 'Traditional Bengali-style oval sweets steeped in light sugar syrup and garnished with mawa and cardamom.'
    },
    {
      id: 'ladoo',
      name: 'Dry Fruit Ladoo',
      category: 'traditional',
      image: 'assets/images/dry-fruit-ladoo.webp',
      alt: 'Dry Fruit Ladoo prepared at Mircharam Sweets',
      badge: 'Pure Ghee',
      description: 'Wholesome confections rolled with roasted nuts, dry fruits, and aromatic spices for traditional nutrition.'
    },
    {
      id: 'paan-gilori',
      name: 'Paan Gilori Mithai',
      category: 'traditional',
      image: 'assets/images/paan-gilori.webp',
      alt: 'Paan Gilori sweet crafted at Mircharam Sweets',
      badge: 'Regional Delicacy',
      description: 'An artisanal sweet recreating the refreshing essence of paan with gulkand, nuts, and silver leaf foil.'
    },
    {
      id: 'momos',
      name: 'Steamed & Fried Momos',
      category: 'savouries',
      image: 'assets/images/momo.webp',
      alt: 'Steamed momos with hot dipping chutney at Mircharam',
      badge: 'Popular Savoury',
      description: 'Thin-skinned dumplings loaded with savory vegetables, served piping hot with fiery red garlic-chilli chutney.'
    }
  ];

  // 2. Strict Image Fallback Handler
  function handleImageFallback(imgElement, productName, imagePath) {
    console.warn(`[Image System] Verified image missing: ${productName} (${imagePath}). Displaying editorial placeholder.`);

    const parentContainer = imgElement.parentElement;
    imgElement.remove();

    const placeholder = document.createElement('div');
    placeholder.className = 'photo-placeholder';
    placeholder.innerHTML = `
      <span class="placeholder-brand-mark">MIRCHARAM</span>
      <span class="placeholder-badge">Authentic Item</span>
      <h4 class="placeholder-title">${productName}</h4>
      <p class="placeholder-text">Real product photo coming soon</p>
    `;

    parentContainer.appendChild(placeholder);
  }

  // 3. Render Product Cards to DOM
  const productGrid = document.getElementById('productGrid');

  function renderProducts(items) {
    if (!productGrid) return;
    productGrid.innerHTML = '';

    items.forEach(product => {
      const card = document.createElement('article');
      card.className = 'product-card';
      card.setAttribute('data-category', product.category);

      card.innerHTML = `
        <div class="product-image-container">
          <span class="product-tag">${product.badge}</span>
          <img 
            src="${product.image}" 
            alt="${product.alt}" 
            class="product-img"
            loading="lazy"
          >
        </div>
        <div class="product-details">
          <h3 class="product-title">${product.name}</h3>
          <p class="product-desc">${product.description}</p>
          <div class="product-meta">
            <span>Hardoi Kitchen</span>
            <span class="meta-status">Fresh Preparation</span>
          </div>
        </div>
      `;

      // Attach image load error guard
      const img = card.querySelector('.product-img');
      img.addEventListener('error', () => {
        handleImageFallback(img, product.name, product.image);
      });

      productGrid.appendChild(card);
    });
  }

  // Initial Product Render
  renderProducts(products);

  // 4. Attach Fallback to Static In-Page Images
  const staticPhotos = document.querySelectorAll('img.verified-photo');
  staticPhotos.forEach(img => {
    img.addEventListener('error', () => {
      const productName = img.getAttribute('data-product') || 'Verified Mircharam Item';
      handleImageFallback(img, productName, img.src);
    });
  });

  // 5. Category Filter System
  const filterButtons = document.querySelectorAll('.filter-btn');
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const filterValue = button.getAttribute('data-filter');
      if (filterValue === 'all') {
        renderProducts(products);
      } else {
        const filtered = products.filter(item => item.category === filterValue);
        renderProducts(filtered);
      }
    });
  });

  // 6. Navigation Scroll State
  const siteHeader = document.getElementById('siteHeader');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }
  }, { passive: true });

  // 7. Mobile Drawer Navigation
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileNavDrawer = document.getElementById('mobileNavDrawer');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileMenuBtn && mobileNavDrawer) {
    mobileMenuBtn.addEventListener('click', () => {
      const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
      mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
      mobileNavDrawer.classList.toggle('open');
      mobileNavDrawer.setAttribute('aria-hidden', isExpanded);
    });

    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        mobileNavDrawer.classList.remove('open');
        mobileNavDrawer.setAttribute('aria-hidden', 'true');
      });
    });
  }

  // 8. Footer Dynamic Year
  const currentYearSpan = document.getElementById('currentYear');
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }
});
