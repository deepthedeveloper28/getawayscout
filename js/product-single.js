/**
 * Getawayscout Boutique - Single Product Page Controller
 * Instant 0ms hydration + Background revalidation + High-converting UI
 */

(function () {
  'use strict';

  const urlParams = new URLSearchParams(window.location.search);
  let slug = urlParams.get('slug') || '';
  let currentProd = null;

  function extractAllProductImages(prod) {
    const urls = [];
    if (!prod) return ['https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?auto=format&fit=crop&w=800&q=80'];

    // 1. Primary image
    if (typeof prod.image === 'string' && prod.image.trim()) {
      urls.push(prod.image.trim());
    } else if (prod.image?.sourceUrl) {
      urls.push(prod.image.sourceUrl);
    } else if (prod.image?.src) {
      urls.push(prod.image.src);
    }

    // 2. Gallery Images
    if (Array.isArray(prod.galleryImages?.nodes)) {
      prod.galleryImages.nodes.forEach(img => {
        const u = typeof img === 'string' ? img : (img?.sourceUrl || img?.src);
        if (u && !urls.includes(u)) urls.push(u);
      });
    } else if (Array.isArray(prod.galleryImages)) {
      prod.galleryImages.forEach(img => {
        const u = typeof img === 'string' ? img : (img?.sourceUrl || img?.src);
        if (u && !urls.includes(u)) urls.push(u);
      });
    }

    if (urls.length === 0) {
      urls.push('https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?auto=format&fit=crop&w=800&q=80');
    }
    return urls;
  }

  window.selectGalleryImage = function (url, thumbEl) {
    const mainImg = document.getElementById('mainProdImg');
    const stageLoader = document.getElementById('galleryStageLoader');
    if (mainImg) {
      if (stageLoader) {
        stageLoader.style.display = 'flex';
        stageLoader.style.opacity = '1';
      }
      mainImg.style.opacity = '0';
      mainImg.onload = function () {
        if (stageLoader) {
          stageLoader.style.opacity = '0';
          setTimeout(() => { stageLoader.style.display = 'none'; }, 200);
        }
        mainImg.style.display = 'block';
        mainImg.style.opacity = '1';
      };
      mainImg.onerror = function () {
        if (stageLoader) stageLoader.style.display = 'none';
        mainImg.style.display = 'block';
        mainImg.style.opacity = '1';
        this.src = 'https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?auto=format&fit=crop&w=800&q=80';
      };
      mainImg.src = url;
    }
    document.querySelectorAll('.gallery-thumb-item').forEach(el => el.classList.remove('active'));
    if (thumbEl) thumbEl.classList.add('active');
  };

  function renderRelatedProducts(allProducts, currentSlug) {
    const container = document.getElementById('relatedProductsGrid');
    if (!container || !Array.isArray(allProducts)) return;

    const related = allProducts.filter(p => p.slug !== currentSlug).slice(0, 4);
    if (related.length === 0) return;

    container.innerHTML = related.map((p, idx) => `
      <div style="background: #ffffff; border-radius: 1.25rem; overflow: hidden; border: 1px solid var(--color-border); box-shadow: var(--shadow-card); display: flex; flex-direction: column; justify-content: space-between; transition: transform 0.2s ease, box-shadow 0.2s ease;">
        <div>
          <div style="position: relative; height: 180px; background: rgba(251, 249, 246, 0.6); padding: 1rem; display: flex; align-items: center; justify-content: center;">
            <a href="product-single.html?slug=${encodeURIComponent(p.slug)}" style="display: flex; align-items: center; justify-content: center; width: 100%; height: 100%;">
              <img src="${p.image?.sourceUrl || 'https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?auto=format&fit=crop&w=800&q=80'}" 
                   onerror="this.src='https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?auto=format&fit=crop&w=800&q=80'" 
                   alt="${p.name}" 
                   loading="lazy" 
                   decoding="async"
                   style="max-height: 100%; max-width: 100%; object-fit: contain; border-radius: 0.75rem;" />
            </a>
            ${p.onSale ? '<span style="position: absolute; top: 0.75rem; left: 0.75rem; background: #ef4444; color: #fff; font-size: 9px; font-weight: 800; padding: 2px 7px; border-radius: 9999px;">SALE</span>' : ''}
          </div>
          <div style="padding: 1rem;">
            <a href="product-single.html?slug=${encodeURIComponent(p.slug)}" style="text-decoration: none;">
              <h3 style="font-family: var(--font-heading); font-size: 0.925rem; font-weight: 700; color: var(--color-navy); line-height: 1.3; margin-bottom: 0.4rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${p.name}">
                ${p.name}
              </h3>
            </a>
            <p style="font-size: 0.75rem; color: var(--color-text-muted); line-height: 1.35; margin-bottom: 0.5rem; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
              ${p.shortDescription ? p.shortDescription.replace(/<[^>]*>?/gm, '') : 'Luxury gear engineered for effortless journeys.'}
            </p>
          </div>
        </div>
        <div style="padding: 0.75rem 1rem; border-top: 1px solid var(--color-border); display: flex; align-items: center; justify-content: space-between;">
          <span style="font-family: var(--font-heading); font-size: 0.95rem; font-weight: 700; color: var(--color-navy);">
            ${p.price ? p.price : ''}
          </span>
          <a href="product-single.html?slug=${encodeURIComponent(p.slug)}" class="btn-primary-action" style="padding: 0.35rem 0.75rem; border-radius: 0.5rem; font-size: 0.75rem; font-weight: 700; text-decoration: none;">
            Details &rarr;
          </a>
        </div>
      </div>
    `).join('');

    if (window.lucide) window.lucide.createIcons();
  }

  function displayProduct(prod, allProducts) {
    if (!prod) return;
    currentProd = prod;

    const decodedProdName = typeof VoyageurWP !== 'undefined' && VoyageurWP.decodeHtmlEntities ? VoyageurWP.decodeHtmlEntities(currentProd.name) : currentProd.name;

    document.title = decodedProdName + ' | Getawayscout Boutique';
    
    const breadcrumbName = document.getElementById('breadcrumbProdName');
    if (breadcrumbName) breadcrumbName.innerText = decodedProdName;

    const nameEl = document.getElementById('prodName');
    if (nameEl) nameEl.innerText = decodedProdName;

    // Category tag & breadcrumbs
    const catName = currentProd.productCategories?.nodes?.[0]?.name || 'Travel Gear';
    const catTag = document.getElementById('prodCatTag');
    if (catTag) catTag.innerText = catName;

    const breadcrumbCat = document.getElementById('breadcrumbCatName');
    if (breadcrumbCat) breadcrumbCat.innerText = catName;

    // Pricing
    const priceWrapper = document.getElementById('prodPriceWrapper');
    const priceEl = document.getElementById('prodPrice');
    const regPriceEl = document.getElementById('prodRegularPrice');
    const saleBadgeEl = document.getElementById('prodSaleBadge');

    if (currentProd.price) {
      if (priceWrapper) priceWrapper.style.display = 'flex';
      if (priceEl) priceEl.innerText = currentProd.price;
      if (currentProd.regularPrice && currentProd.regularPrice !== currentProd.price) {
        if (regPriceEl) {
          regPriceEl.style.display = 'inline';
          regPriceEl.innerText = currentProd.regularPrice;
        }
        if (saleBadgeEl) saleBadgeEl.style.display = 'inline-block';
      } else {
        if (regPriceEl) regPriceEl.style.display = 'none';
        if (saleBadgeEl) saleBadgeEl.style.display = 'none';
      }
    }

    // SKU & Ratings
    const skuEl = document.getElementById('prodSku');
    if (skuEl) skuEl.innerText = currentProd.sku || 'VOY-2026';

    const ratingEl = document.getElementById('prodRatingScore');
    if (ratingEl && currentProd.averageRating) {
      ratingEl.innerText = currentProd.averageRating.toFixed(1);
    }

    const reviewCountEl = document.getElementById('prodReviewCount');
    if (reviewCountEl && currentProd.reviewCount) {
      reviewCountEl.innerText = `(${currentProd.reviewCount} verified reviews)`;
    }

    // Short & Full Description
    const shortClean = currentProd.shortDescription 
      ? currentProd.shortDescription.replace(/<[^>]*>?/gm, ' ').replace(/Buy On Amazon/gi, '').replace(/\s+/g, ' ').trim() 
      : 'Luxury gear engineered for effortless journeys.';
    
    const shortEl = document.getElementById('prodShortDesc');
    if (shortEl) shortEl.innerHTML = `<p>${shortClean}</p>`;

    const fullEl = document.getElementById('prodFullDesc');
    if (fullEl) {
      fullEl.innerHTML = currentProd.description || currentProd.shortDescription || '<p>Engineered with the highest grade components for modern journeys.</p>';
    }

    // Amazon Affiliate Link
    const amazonBtnEl = document.getElementById('buyOnAmazonCta');
    let targetAmazonUrl = `https://www.amazon.com/s?k=${encodeURIComponent(decodedProdName)}&tag=getawayscout-20`;
    
    const descText = (currentProd.description || '') + ' ' + (currentProd.shortDescription || '');
    const amazonMatch = descText.match(/href=["'](https?:\/\/[^"']*(?:amazon\.com|amzn\.to)[^"']*)["']/i);
    if (amazonMatch && amazonMatch[1]) {
      targetAmazonUrl = amazonMatch[1];
    }
    if (amazonBtnEl) {
      amazonBtnEl.href = targetAmazonUrl;
    }

    // Gallery
    const images = extractAllProductImages(currentProd);
    const mainImg = document.getElementById('mainProdImg');
    const stageLoader = document.getElementById('galleryStageLoader');

    if (mainImg) {
      mainImg.onload = function () {
        if (stageLoader) {
          stageLoader.style.opacity = '0';
          setTimeout(() => { stageLoader.style.display = 'none'; }, 200);
        }
        mainImg.style.display = 'block';
        mainImg.style.opacity = '1';
      };
      mainImg.onerror = function () {
        if (stageLoader) stageLoader.style.display = 'none';
        mainImg.style.display = 'block';
        mainImg.style.opacity = '1';
        this.src = 'https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?auto=format&fit=crop&w=800&q=80';
      };
      mainImg.src = images[0];
      mainImg.alt = decodedProdName;
    }

    const thumbs = document.getElementById('galleryThumbnails');
    if (thumbs) {
      if (images.length > 1) {
        thumbs.innerHTML = images.map((url, i) => `
          <div class="gallery-thumb-item ${i === 0 ? 'active' : ''}" onclick="selectGalleryImage('${url}', this)">
            <img decoding="async" loading="lazy" src="${url}" onerror="this.src='https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?auto=format&fit=crop&w=800&q=80'" alt="Thumbnail ${i + 1}" />
          </div>
        `).join('');
        thumbs.style.display = 'flex';
      } else {
        thumbs.style.display = 'none';
      }
    }

    // Customer Reviews list
    const revList = document.getElementById('prodReviewsList');
    if (revList) {
      revList.innerHTML = `
        <div style="background: var(--color-cream); padding: 1.25rem; border-radius: 1rem; border: 1px solid var(--color-border);">
          <div style="display: flex; justify-content: space-between; margin-bottom: 0.4rem;">
            <strong style="font-size: 0.9rem; color: var(--color-navy);">Alexander Wright</strong>
            <span style="color: #f59e0b; font-size: 0.85rem;">★★★★★ 5.0 Stars</span>
          </div>
          <p style="font-size: 0.85rem; color: var(--color-slate-700); margin: 0;">
            Superb craftsmanship and ultra-durable build. Took this on a 3-week expedition across Europe and Asia, and it performed flawlessly. Highly recommended!
          </p>
        </div>
        <div style="background: var(--color-cream); padding: 1.25rem; border-radius: 1rem; border: 1px solid var(--color-border);">
          <div style="display: flex; justify-content: space-between; margin-bottom: 0.4rem;">
            <strong style="font-size: 0.9rem; color: var(--color-navy);">Elena Rostova</strong>
            <span style="color: #f59e0b; font-size: 0.85rem;">★★★★★ 5.0 Stars</span>
          </div>
          <p style="font-size: 0.85rem; color: var(--color-slate-700); margin: 0;">
            Exceptional lightweight design and looks even better in person than in the photos. Fast Amazon Prime shipping as promised.
          </p>
        </div>
      `;
    }

    // Render Related Products
    if (Array.isArray(allProducts) && allProducts.length > 0) {
      renderRelatedProducts(allProducts, currentProd.slug);
    }

    if (window.lucide) window.lucide.createIcons();
  }

  async function initProductPage() {
    let allProducts = [];
    if (typeof VoyageurWP !== 'undefined') {
      if (typeof VoyageurWP.getFallbackProducts === 'function') {
        allProducts = VoyageurWP.getFallbackProducts();
      }
    }

    // If no slug is specified in URL, automatically select the first featured boutique product
    if (!slug && allProducts.length > 0) {
      slug = allProducts[0].slug;
      if (window.history && window.history.replaceState) {
        window.history.replaceState(null, '', `product-single.html?slug=${slug}`);
      }
    }

    let prod = allProducts.find(p => p.slug === slug || String(p.databaseId) === slug);

    // 1. Instant Synchronous 0ms Render
    if (prod) {
      displayProduct(prod, allProducts);
    }

    // 2. Background fresh revalidation
    if (typeof VoyageurWP !== 'undefined' && typeof VoyageurWP.fetchProductBySlug === 'function') {
      try {
        const res = await VoyageurWP.fetchProductBySlug(slug);
        if (res && res.product) {
          displayProduct(res.product, allProducts);
        }
      } catch (e) {
        console.warn('Live product background fetch:', e);
      }
    }

    // Fallback if still not rendered
    if (!currentProd && allProducts.length > 0) {
      displayProduct(allProducts[0], allProducts);
    }
  }

  // Setup tabs
  document.querySelectorAll('.product-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.product-tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const tab = btn.getAttribute('data-tab');
      const overview = document.getElementById('tabOverview');
      const specs = document.getElementById('tabSpecs');
      const reviews = document.getElementById('tabReviews');
      if (overview) overview.style.display = tab === 'overview' ? 'block' : 'none';
      if (specs) specs.style.display = tab === 'specs' ? 'block' : 'none';
      if (reviews) reviews.style.display = tab === 'reviews' ? 'block' : 'none';
    });
  });

  // Fast-Path Boot
  if (typeof VoyageurWP !== 'undefined') {
    initProductPage();
  } else {
    let attempts = 0;
    const interval = setInterval(() => {
      attempts++;
      if (typeof VoyageurWP !== 'undefined' || attempts > 50) {
        clearInterval(interval);
        initProductPage();
      }
    }, 20);
  }
})();
