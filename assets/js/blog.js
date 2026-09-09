/**
 * CHAI & CO. — Blog & Stories Module (blog.js)
 * Filtering, Search, Pagination, Article Metadata
 */

(function () {
  'use strict';

  const BLOG_ARTICLES = [
    {
      id: 'post-01',
      title: 'The Sacred Art of Brewing Authentic Indian Masala Chai',
      slug: 'sacred-art-brewing-masala-chai',
      category: 'Recipes',
      author: 'Aarav Sharma',
      authorRole: 'Master Tea Sommelier',
      date: 'Aug 24, 2026',
      readTime: '6 min read',
      image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80',
      excerpt: 'Uncover the centuries-old balance between crushed cardamom, piquant ginger, and slow-simmered Assam orthodox leaf tea.',
      featured: true
    },
    {
      id: 'post-02',
      title: 'Journey to the Clouds: Sourcing Spring Flush in Darjeeling',
      slug: 'sourcing-spring-flush-darjeeling',
      category: 'Sourcing',
      author: 'Priya Sen',
      authorRole: 'Head of Responsible Sourcing',
      date: 'Aug 18, 2026',
      readTime: '8 min read',
      image: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?auto=format&fit=crop&w=800&q=80',
      excerpt: 'Step into the misty high-altitude tea gardens of the Eastern Himalayas where every leaf is hand-plucked at daybreak.',
      featured: false
    },
    {
      id: 'post-03',
      title: 'Why Kashmiri Kahwa Is the Ultimate Himalayan Elixir',
      slug: 'why-kashmiri-kahwa-himalayan-elixir',
      category: 'Tea Culture',
      author: 'Mirza Baig',
      authorRole: 'Kashmiri Tea Curator',
      date: 'Aug 12, 2026',
      readTime: '5 min read',
      image: 'https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?auto=format&fit=crop&w=800&q=80',
      excerpt: 'Saffron threads, slivered almonds, and royal green tea: the timeless tradition of the Kashmiri samovar.',
      featured: false
    },
    {
      id: 'post-04',
      title: 'Spices as Medicine: The Ancient Ayurvedic Wisdom in Your Teacup',
      slug: 'ayurvedic-wisdom-in-your-teacup',
      category: 'Health',
      author: 'Dr. Sunita Patel',
      authorRole: 'Ayurvedic Wellness Consultant',
      date: 'Jul 28, 2026',
      readTime: '7 min read',
      image: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=800&q=80',
      excerpt: 'From turmeric curcumin to gingerols, how a daily cup of spiced tea fortifies gut health and immune vitality.',
      featured: false
    },
    {
      id: 'post-05',
      title: 'The Irani Café Culture: Bun Maska, Cutting Chai & Nostalgia',
      slug: 'irani-cafe-culture-bun-maska',
      category: 'Café Stories',
      author: 'Kabir Mehta',
      authorRole: 'Culinary Historian',
      date: 'Jul 15, 2026',
      readTime: '5 min read',
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
      excerpt: 'How historic vintage chai stalls in Mumbai shaped modern communal gathering spaces over buttery buns.',
      featured: false
    },
    {
      id: 'post-06',
      title: 'Cold Brewed Chai: Modern Twist to Traditional Spices',
      slug: 'cold-brewed-chai-modern-twist',
      category: 'Chai',
      author: 'Ananya Roy',
      authorRole: 'Beverage Innovation Lead',
      date: 'Jul 04, 2026',
      readTime: '4 min read',
      image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=800&q=80',
      excerpt: 'Slow overnight cold extraction brings out sweet fruit notes without bitterness. Here is our signature recipe.',
      featured: false
    }
  ];

  function renderBlogCard(post) {
    return `
      <article class="blog-card revealed" data-category="${post.category}">
        <div class="blog-card-img">
          <img src="${post.image}" alt="${post.title}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80'">
        </div>
        <div class="blog-card-body">
          <div class="blog-meta">
            <span class="blog-category-tag">${post.category}</span>
            <span>•</span>
            <span>${post.date}</span>
            <span>•</span>
            <span>${post.readTime}</span>
          </div>
          <h3 class="blog-title"><a href="blog-details.html">${post.title}</a></h3>
          <p class="blog-excerpt">${post.excerpt}</p>
          <a href="blog-details.html" class="blog-read-more">
            Read Full Story <i class="fa-solid fa-arrow-right"></i>
          </a>
        </div>
      </article>
    `;
  }

  function initBlogGrid() {
    const grid = document.getElementById('blog-posts-grid');
    if (!grid) return;

    let activeCategory = 'All';
    let searchQuery = '';
    let currentPage = 1;
    const itemsPerPage = 3;

    function renderPagination(totalPages) {
      const paginationContainer = document.getElementById('blog-pagination');
      const pageNumbersContainer = document.getElementById('blog-page-numbers');
      const prevBtn = document.getElementById('blog-prev-page');
      const nextBtn = document.getElementById('blog-next-page');

      if (!paginationContainer) return;

      if (totalPages <= 1) {
        paginationContainer.style.display = 'none';
        return;
      }
      paginationContainer.style.display = 'flex';

      if (pageNumbersContainer) {
        let buttonsHtml = '';
        for (let i = 1; i <= totalPages; i++) {
          buttonsHtml += `<button type="button" class="filter-btn ${i === currentPage ? 'active' : ''}" style="padding:8px 16px;" data-page="${i}">${i}</button>`;
        }
        pageNumbersContainer.innerHTML = buttonsHtml;

        pageNumbersContainer.querySelectorAll('.filter-btn').forEach(btn => {
          btn.addEventListener('click', () => {
            currentPage = parseInt(btn.dataset.page, 10);
            filterAndRender();
            grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
          });
        });
      }

      if (prevBtn) {
        prevBtn.disabled = currentPage === 1;
        prevBtn.style.opacity = currentPage === 1 ? '0.4' : '1';
        prevBtn.onclick = () => {
          if (currentPage > 1) {
            currentPage--;
            filterAndRender();
            grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        };
      }

      if (nextBtn) {
        nextBtn.disabled = currentPage === totalPages;
        nextBtn.style.opacity = currentPage === totalPages ? '0.4' : '1';
        nextBtn.onclick = () => {
          if (currentPage < totalPages) {
            currentPage++;
            filterAndRender();
            grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        };
      }
    }

    function filterAndRender() {
      let filtered = [...BLOG_ARTICLES];

      if (activeCategory !== 'All') {
        filtered = filtered.filter(p => p.category.toLowerCase() === activeCategory.toLowerCase());
      }

      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase().trim();
        filtered = filtered.filter(p =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
        );
      }

      const totalPages = Math.ceil(filtered.length / itemsPerPage);
      if (currentPage > totalPages && totalPages > 0) {
        currentPage = 1;
      }

      if (filtered.length === 0) {
        grid.innerHTML = `
          <div style="grid-column:1/-1;text-align:center;padding:50px 20px;">
            <i class="fa-solid fa-book-open-reader" style="font-size:2.5rem;color:var(--primary);margin-bottom:14px;"></i>
            <h4>No articles found</h4>
            <p class="text-muted">No stories matched "${searchQuery}". Try selecting another category.</p>
          </div>
        `;
        renderPagination(0);
        return;
      }

      const startIdx = (currentPage - 1) * itemsPerPage;
      const paginatedItems = filtered.slice(startIdx, startIdx + itemsPerPage);

      grid.innerHTML = paginatedItems.map(renderBlogCard).join('');
      renderPagination(totalPages);
    }

    // Category tabs
    document.querySelectorAll('.blog-filter-tabs .filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.blog-filter-tabs .filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeCategory = btn.dataset.category || 'All';
        currentPage = 1;
        filterAndRender();
      });
    });

    // Search
    const searchInput = document.getElementById('blog-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', e => {
        searchQuery = e.target.value;
        currentPage = 1;
        filterAndRender();
      });
    }

    filterAndRender();
  }

  window.chaiBlog = {
    articles: BLOG_ARTICLES,
    initBlogGrid
  };

  document.addEventListener('DOMContentLoaded', () => {
    initBlogGrid();
  });
})();
