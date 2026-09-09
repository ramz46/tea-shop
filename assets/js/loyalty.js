/**
 * CHAI & CO. — Loyalty Program & Points Calculator (loyalty.js)
 * Live calculation: ₹100 = 10 Chai Points, Tier Progression & Visual perks
 */

(function () {
  'use strict';

  function initLoyaltyCalculator() {
    const input = document.getElementById('loyalty-spend-input');
    const pointsDisplay = document.getElementById('loyalty-points-val');
    const tierDisplay = document.getElementById('loyalty-tier-badge');
    const tierPerkText = document.getElementById('loyalty-perk-text');
    const progressBar = document.getElementById('loyalty-progress-fill');

    if (!input || !pointsDisplay) return;

    function calculate() {
      const amount = Math.max(0, parseFloat(input.value) || 0);
      // ₹100 = 10 points (i.e. 10% of ₹ in points)
      const points = Math.floor(amount * 0.1);

      // Animate point counter
      pointsDisplay.textContent = points.toLocaleString('en-IN');

      let tierName = 'Chai Lover';
      let tierColor = 'var(--primary)';
      let tierPerk = 'Earn 10 pts per ₹100 • Free birthday chai upgrade';
      let progressPercent = Math.min((points / 1200) * 100, 100);

      if (points >= 1000) {
        tierName = 'Chai Connoisseur';
        tierColor = 'var(--accent)';
        tierPerk = 'VIP Access • Complimentary quarterly tasting kit • 20% discount on merchandise';
      } else if (points >= 500) {
        tierName = 'Chai Explorer';
        tierColor = 'var(--secondary)';
        tierPerk = 'Free pastry on 10th visit • Exclusive seasonal blend preview';
      }

      if (tierDisplay) {
        tierDisplay.textContent = tierName;
        tierDisplay.style.color = tierColor;
      }
      if (tierPerkText) {
        tierPerkText.textContent = tierPerk;
      }
      if (progressBar) {
        progressBar.style.width = `${progressPercent}%`;
      }

      // Highlight active tier card
      document.querySelectorAll('.tier-card').forEach(card => {
        const tier = card.dataset.tier;
        if (tier === tierName.toLowerCase().replace(/\s+/g, '-')) {
          card.style.borderColor = 'var(--primary)';
          card.style.transform = 'translateY(-6px)';
        } else {
          card.style.borderColor = '';
          card.style.transform = '';
        }
      });
    }

    input.addEventListener('input', calculate);
    calculate(); // run initial calculation
  }

  document.addEventListener('DOMContentLoaded', () => {
    initLoyaltyCalculator();
  });
})();
