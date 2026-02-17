(function () {
  'use strict';

  // Category filter (home page)
  var filterBtns = document.querySelectorAll('.filter-btn');
  var caseStudyCards = document.querySelectorAll('.case-study-card');
  if (filterBtns.length && caseStudyCards.length) {
    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var category = this.getAttribute('data-category');
        filterBtns.forEach(function (b) { b.classList.remove('active'); });
        this.classList.add('active');
        caseStudyCards.forEach(function (card) {
          var cardCat = card.getAttribute('data-category');
          card.style.display = (category === 'all' || cardCat === category) ? '' : 'none';
        });
      });
    });
  }

  // Header search (navigate to blog with query or show case studies)
  var headerSearch = document.getElementById('header-search');
  if (headerSearch) {
    headerSearch.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        var q = (this.value && this.value.trim() || '').toLowerCase();
        if (!q) return;
        var path = window.location.pathname || '';
        var depth = path.split('/').filter(Boolean).length - 1;
        var prefix = depth > 0 ? Array(depth + 1).join('../') : '';
        var url = prefix + 'blog/index.html';
        if (q.indexOf('nykaa') !== -1) url = prefix + 'case-studies/nykaa.html';
        else if (q.indexOf('amazon') !== -1) url = prefix + 'case-studies/amazon.html';
        else if (q.indexOf('flipkart') !== -1) url = prefix + 'case-studies/flipkart.html';
        else if (q.indexOf('keyword') !== -1) url = prefix + 'keyword-research.html';
        else if (q.indexOf('competitor') !== -1) url = prefix + 'competitor-analysis.html';
        window.location.href = url + (url.indexOf('?') === -1 ? '?' : '&') + 'q=' + encodeURIComponent(q);
      }
    });
  }

  // Newsletter form
  var newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var email = document.getElementById('newsletter-email');
      if (email && email.value.trim()) {
        alert('Thanks for subscribing! We\'ll send SEO case studies and tips to ' + email.value.trim());
        email.value = '';
      }
    });
  }

  // Comment form (client-side: append to list)
  var commentForm = document.getElementById('comment-form');
  var commentBody = document.getElementById('comment-body');
  var commentList = document.querySelector('.comment-list');
  if (commentForm && commentBody && commentList) {
    commentForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var text = commentBody.value.trim();
      if (!text) return;
      var item = document.createElement('div');
      item.className = 'comment-item';
      item.innerHTML = '<span class="author">You</span> <span class="date">Just now</span><p>' + text.replace(/</g, '&lt;').replace(/>/g, '&gt;') + '</p>';
      commentList.appendChild(item);
      commentBody.value = '';
    });
  }
})();
