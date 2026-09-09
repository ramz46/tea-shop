/**
 * CHAI & CO. — Menu Catalog & Interactive Controls (menu.js)
 * Master Menu Catalog, Filtering, Search, Sorting, Interactive Customization Modal, Favorites & Cart
 */

(function () {
  'use strict';

  // Master Menu Catalog (22 Artisan Items across all categories)
  const MENU_ITEMS = [
    {
      id: 'chai-01',
      name: 'Classic Masala Chai',
      category: 'Masala Chai',
      price: 99,
      rating: 4.9,
      reviews: 348,
      image: 'assets/images/classic-masala-chai.jpg',
      description: 'Slow-simmered in copper degchis with robust Upper Assam CTC leaves, crushed Idukki green cardamom, cinnamon quills, and fiery ginger root steeped in creamy farm milk.',
      estate: 'Upper Assam Estate (150m MSL)',
      ingredients: ['Assam CTC Black Tea', 'Idukki Green Cardamom', 'Cinnamon Quill', 'Fresh Crushed Ginger', 'Whole Cloves', 'Creamy Whole Milk', 'Raw Sugar'],
      prepTime: '6 mins',
      caffeine: 'Medium (45mg)',
      temperature: 'Piping Hot (88°C)',
      calories: '120 kcal',
      spiceLevel: 'Warm & Balanced Spice',
      isVeg: true,
      badge: 'Bestseller',
      customizable: true
    },
    {
      id: 'chai-02',
      name: 'Adrak Elaichi Chai',
      category: 'Masala Chai',
      price: 119,
      rating: 4.8,
      reviews: 236,
      image: 'assets/images/adrak-elaichi-chai.jpg',
      description: 'A comforting morning ritual marrying fiery hand-pounded ginger root with fragrant whole cardamom pods, brewed into rich malty orthodox leaves.',
      estate: 'Doomni Estate, Assam Valley',
      ingredients: ['Assam Orthodox Blend', 'Freshly Pounded Ginger Root', 'Fragrant Cardamom Pods', 'Whole Milk', 'Golden Raw Sugar'],
      prepTime: '5 mins',
      caffeine: 'Medium (40mg)',
      temperature: 'Piping Hot (85°C)',
      calories: '115 kcal',
      spiceLevel: 'Zesty & Waking Zing',
      isVeg: true,
      badge: 'Popular',
      customizable: true
    },
    {
      id: 'chai-03',
      name: 'Cardamom Royale',
      category: 'Masala Chai',
      price: 129,
      rating: 4.9,
      reviews: 194,
      image: 'assets/images/cardamom-royale-chai.jpg',
      description: 'An opulent celebration of whole green cardamom pods from the misty hills of Idukki, gently simmered with gold-tipped orthodox leaves and silky frothed milk.',
      estate: 'Idukki Hills, Western Ghats',
      ingredients: ['Idukki 8mm Green Cardamom', 'Single-Estate Orthodox Leaves', 'Steamed Whole Milk', 'Wild Forest Honey'],
      prepTime: '5 mins',
      caffeine: 'Medium (38mg)',
      temperature: 'Piping Hot (85°C)',
      calories: '110 kcal',
      spiceLevel: 'Aromatic Floral Warmth',
      isVeg: true,
      badge: 'Signature',
      customizable: true
    },
    {
      id: 'chai-04',
      name: 'Calcutta Cutting Chai',
      category: 'Masala Chai',
      price: 79,
      rating: 4.9,
      reviews: 412,
      image: 'assets/images/calcutta-cutting-chai.jpg',
      description: 'Street-corner nostalgia: bold high-caffeine CTC dust tea steeped with cracked Tellicherry black pepper, ginger, and caramelized sugar in a terracotta kulhad.',
      estate: 'Terai Lowland Gardens, Bengal',
      ingredients: ['Strong CTC Dust Tea', 'Tellicherry Black Pepper', 'Fresh Ginger', 'Cardamom', 'Thick Milk', 'Caramelized Sugar'],
      prepTime: '4 mins',
      caffeine: 'High (60mg)',
      temperature: 'Boiling Hot (92°C)',
      calories: '95 kcal',
      spiceLevel: 'Bold, Peppery & Robust',
      isVeg: true,
      badge: 'Street Classic',
      customizable: true
    },
    {
      id: 'chai-04a',
      name: 'Kesar Saffron Masala Chai',
      category: 'Masala Chai',
      price: 149,
      rating: 4.9,
      reviews: 295,
      image: 'assets/images/kesar-saffron-masala-chai.jpg',
      description: 'An imperial celebration blend: Upper Assam orthodox leaves steeped in copper vessels with grade-A Kashmiri Mongra saffron threads, crushed green cardamom pods, and creamy buffalo milk.',
      estate: 'Pampore Terraces & Upper Assam (150m MSL)',
      ingredients: ['Upper Assam CTC Tea', 'Grade-A Mongra Saffron', 'Idukki Green Cardamom', 'Crushed Ginger', 'Whole Cream Milk', 'Unrefined Golden Sugar'],
      prepTime: '6 mins',
      caffeine: 'Medium (42mg)',
      temperature: 'Piping Hot (88°C)',
      calories: '135 kcal',
      spiceLevel: 'Regal Saffron & Sweet Cardamom',
      isVeg: true,
      badge: 'Royal Reserve',
      customizable: true
    },
    {
      id: 'chai-04b',
      name: 'Mumbai Lemongrass Cutting Chai',
      category: 'Masala Chai',
      price: 89,
      rating: 4.9,
      reviews: 360,
      image: 'assets/images/mumbai-lemongrass-cutting-chai.jpg',
      description: 'The energetic soul of Mumbai tapris: fresh hand-pounded garden lemongrass stalks simmered with fiery ginger root, whole cloves, and robust CTC dust tea, poured piping hot.',
      estate: 'Nilgiri Organic Foothills & Assam Valley',
      ingredients: ['Fresh Garden Lemongrass', 'Strong Assam CTC Dust', 'Crushed Hot Ginger', 'Whole Cloves', 'Creamy Milk', 'Caramelized Cane Sugar'],
      prepTime: '4 mins',
      caffeine: 'High (55mg)',
      temperature: 'Boiling Hot (92°C)',
      calories: '100 kcal',
      spiceLevel: 'Zesty Citrus & Fiery Ginger',
      isVeg: true,
      badge: 'Tapri Legend',
      customizable: true
    },
    {
      id: 'chai-05',
      name: 'Royal Kashmiri Kahwa',
      category: 'Specialty Tea',
      price: 189,
      rating: 5.0,
      reviews: 178,
      image: 'assets/images/royal-kashmiri-kahwa.jpg',
      description: 'An emperor’s elixir from the Kashmir Valley: delicate handpicked green tea steeped with crimson Pampore Mongra saffron, green cardamom, and toasted almond slivers.',
      estate: 'Pampore Valley & Srinagar Terraces',
      ingredients: ['Kashmiri Whole Green Tea', 'Grade-A Mongra Saffron', 'Slivered Toasted Almonds', 'Ceylon Cinnamon', 'Green Cardamom', 'Wild Flora Honey'],
      prepTime: '7 mins',
      caffeine: 'Low (20mg)',
      temperature: 'Hot Steeped (80°C)',
      calories: '65 kcal',
      spiceLevel: 'Regal Saffron & Sweet Almond',
      isVeg: true,
      badge: "Chef's Special",
      customizable: true
    },
    {
      id: 'chai-06',
      name: 'Darjeeling First Flush Reserve',
      category: 'Specialty Tea',
      price: 219,
      rating: 4.9,
      reviews: 115,
      image: 'assets/images/darjeeling-first-flush.jpg',
      description: 'The Champagne of teas: tender spring buds hand-plucked from mist-cloaked Himalayan slopes, unfurling delicate floral aromatics and sparkling Muscatel grape finish.',
      estate: 'Makaibari Estate, Darjeeling (1,400m MSL)',
      ingredients: ['Single-Estate Darjeeling Orthodox Whole Leaves', 'Natural Himalayan Spring Water'],
      prepTime: '4 mins',
      caffeine: 'Medium (35mg)',
      temperature: 'Gentle Steep (82°C)',
      calories: '2 kcal',
      spiceLevel: 'Pure Delicate Unblended',
      isVeg: true,
      badge: 'Limited Reserve',
      customizable: false
    },
    {
      id: 'chai-07',
      name: 'Golden Turmeric Latte',
      category: 'Specialty Tea',
      price: 159,
      rating: 4.8,
      reviews: 132,
      image: 'assets/images/golden-turmeric-latte.jpg',
      description: 'Ayurvedic liquid sunshine: heirloom Lakadong turmeric with 7.5% natural curcumin, slow-whisked into steamed almond milk, Tellicherry black pepper, and unrefined raw jaggery.',
      estate: 'Jaintia Hills Organic Wilds, Meghalaya',
      ingredients: ['Lakadong High-Curcumin Turmeric (7.5%)', 'Almond Milk', 'Tellicherry Black Pepper', 'Cinnamon Quill', 'Raw Desi Jaggery'],
      prepTime: '5 mins',
      caffeine: 'Caffeine-Free',
      temperature: 'Warm (75°C)',
      calories: '110 kcal',
      spiceLevel: 'Earthy, Golden & Restorative',
      isVeg: true,
      badge: 'Immunity Elixir',
      customizable: true
    },
    {
      id: 'chai-08',
      name: 'Rose Cardamom Chai',
      category: 'Specialty Tea',
      price: 139,
      rating: 4.8,
      reviews: 155,
      image: 'assets/images/rose-cardamom-chai.jpg',
      description: 'A romantic symphony of sun-dried Pushkar Damascus rose petals, fragrant green cardamom, and single-estate Assam tea leaves crowned with velvety frothed milk.',
      estate: 'Pushkar Sacred Groves & Assam Valley',
      ingredients: ['Assam Black Tea Leaves', 'Pushkar Organic Rose Petals', 'Cardamom Pods', 'Steamed Milk', 'Raw Sugar'],
      prepTime: '5 mins',
      caffeine: 'Medium (35mg)',
      temperature: 'Piping Hot (85°C)',
      calories: '125 kcal',
      spiceLevel: 'Sweet Floral & Silky Cardamom',
      isVeg: true,
      badge: 'Must Try',
      customizable: true
    },
    {
      id: 'chai-08a',
      name: 'Silver Needle White Tea',
      category: 'Specialty Tea',
      price: 239,
      rating: 5.0,
      reviews: 92,
      image: 'assets/images/silver-needle-white-tea.jpg',
      description: 'Rare Imperial Reserve: velvety unopened silver downy buds hand-plucked during dawn mist in high-altitude Sikkim, yielding an ethereal champagne liquor with notes of wild honey, white peony, and sweet melon.',
      estate: 'Temi Sikkim Organic Highlands (1,800m MSL)',
      ingredients: ['Grade-A Silver Needle White Tea Buds', 'Himalayan Glacial Spring Water'],
      prepTime: '4 mins',
      caffeine: 'Low (15mg)',
      temperature: 'Gentle Infusion (75°C)',
      calories: '2 kcal',
      spiceLevel: 'Delicate Floral & Sweet Honeysuckle',
      isVeg: true,
      badge: 'Imperial Reserve',
      customizable: false
    },
    {
      id: 'chai-08b',
      name: 'Assam Golden Tippy Orthodox',
      category: 'Specialty Tea',
      price: 199,
      rating: 4.9,
      reviews: 145,
      image: 'assets/images/assam-golden-tippy-tea.jpg',
      description: 'The crown jewel of the Brahmaputra valley: whole black orthodox leaves laden with sun-gilded golden tips, slow-steeped into a rich amber liquor carrying deep notes of dark honeycomb, baked malt, and dried dates.',
      estate: 'Mangalam Estate, Upper Assam (140m MSL)',
      ingredients: ['Single-Estate Golden Tippy Orthodox Leaves', 'Pure Spring Water'],
      prepTime: '5 mins',
      caffeine: 'Medium-High (50mg)',
      temperature: 'Piping Hot (90°C)',
      calories: '3 kcal',
      spiceLevel: 'Malty Amber & Wild Honeycomb',
      isVeg: true,
      badge: 'Gold Harvest',
      customizable: false
    },
    {
      id: 'chai-09',
      name: 'Tulsi Holy Basil Herbal Tisane',
      category: 'Herbal Tea',
      price: 139,
      rating: 4.7,
      reviews: 110,
      image: 'assets/images/tulsi-holy-basil-tea.jpg',
      description: 'An ancient Ayurvedic sanctuary: sacred Krishna and Rama Tulsi leaves hand-gathered in the Himalayas, paired with fragrant wild lemongrass and sweet licorice root.',
      estate: 'Organic Hermitage Gardens, Uttarakhand',
      ingredients: ['Organic Krishna Tulsi', 'Rama Tulsi Leaves', 'Cut Lemongrass', 'Mulethi Licorice Root'],
      prepTime: '4 mins',
      caffeine: 'Caffeine-Free',
      temperature: 'Hot Infusion (90°C)',
      calories: '5 kcal',
      spiceLevel: 'Earthy, Herbaceous & Calming',
      isVeg: true,
      badge: 'Holistic Wellness',
      customizable: true
    },
    {
      id: 'chai-10',
      name: 'Lemongrass Mint Detox',
      category: 'Herbal Tea',
      price: 149,
      rating: 4.8,
      reviews: 95,
      image: 'assets/images/lemongrass-mint-detox.jpg',
      description: 'A crisp awakening of invigorating field peppermint, sun-cured lemongrass stalks, and dried ginger slivers, finished with zesty sun-kissed Meyer lemon peel.',
      estate: 'Nilgiri Foothills, Tamil Nadu',
      ingredients: ['Spearmint & Peppermint', 'Estate Lemongrass', 'Sun-cured Ginger', 'Meyer Lemon Zest'],
      prepTime: '4 mins',
      caffeine: 'Caffeine-Free',
      temperature: 'Warm Infusion (85°C)',
      calories: '8 kcal',
      spiceLevel: 'Crisp, Citrus & Cooling',
      isVeg: true,
      badge: 'Pure Detox',
      customizable: true
    },
    {
      id: 'chai-11',
      name: 'Chamomile Citrus Tisane',
      category: 'Herbal Tea',
      price: 159,
      rating: 4.9,
      reviews: 88,
      image: 'assets/images/chamomile-citrus-tisane.jpg',
      description: 'A peaceful slumber in a cup: whole golden chamomile blossoms infused with fragrant Seville orange petals, French lavender florets, and raw Himachal forest honey.',
      estate: 'Kullu Valley Organic Terraces',
      ingredients: ['Golden Chamomile Flowers', 'Bitter Orange Peel', 'French Lavender Buds', 'Wildflower Honey'],
      prepTime: '5 mins',
      caffeine: 'Caffeine-Free',
      temperature: 'Gentle Steep (80°C)',
      calories: '15 kcal',
      spiceLevel: 'Honeyed Floral & Serene',
      isVeg: true,
      badge: 'Bedtime Serenity',
      customizable: true
    },
    {
      id: 'chai-12',
      name: 'Spiced Mango Iced Chai',
      category: 'Iced Tea',
      price: 169,
      rating: 4.9,
      reviews: 245,
      image: 'assets/images/spiced-mango-iced-chai.jpg',
      description: 'Summer in the tropics: 18-hour cold-steeped Assam orthodox tea shaken with sun-ripened Ratnagiri Alphonso mango puree, fresh garden spearmint, and cracked ice.',
      estate: 'Ratnagiri Coastal Groves & Upper Assam',
      ingredients: ['Cold Brewed Black Chai', 'Alphonso Mango Pulp', 'Garden Mint', 'Cinnamon Dust', 'Sparkling Mineral Water', 'Crystal Ice'],
      prepTime: '3 mins',
      caffeine: 'Medium (30mg)',
      temperature: 'Chilled Over Ice (3°C)',
      calories: '145 kcal',
      spiceLevel: 'Lush Tropical & Zesty Chill',
      isVeg: true,
      badge: 'Summer Favorite',
      customizable: true
    },
    {
      id: 'chai-13',
      name: 'Peach Cardamom Cold Brew',
      category: 'Iced Tea',
      price: 179,
      rating: 4.8,
      reviews: 162,
      image: 'assets/images/peach-cardamom-cold-brew.jpg',
      description: 'An ethereal refresher: high-elevation Nilgiri black leaves cold-matured for 14 hours with ripe white peach nectar, green cardamom essence, and hand-cut citrus slices.',
      estate: 'Craigmore Estate, Nilgiri Blue Mountains',
      ingredients: ['Nilgiri Cold Brewed Tea', 'White Peach Puree', 'Cardamom Essence', 'Meyer Lemon', 'Fresh Mint', 'Crystal Ice'],
      prepTime: '3 mins',
      caffeine: 'Low (25mg)',
      temperature: 'Chilled Over Ice (2°C)',
      calories: '95 kcal',
      spiceLevel: 'Crisp Stone Fruit & Floral Pods',
      isVeg: true,
      badge: 'Artisan Refresher',
      customizable: true
    },
    {
      id: 'chai-14',
      name: 'Hibiscus Berry Iced Brew',
      category: 'Iced Tea',
      price: 169,
      rating: 4.7,
      reviews: 118,
      image: 'assets/images/hibiscus-berry-iced-brew.jpg',
      description: 'Jewel-toned and vitamin-rich: wild crimson hibiscus calyces slow-steeped with antioxidant forest berries, tart lime wedges, and raw organic forest honey over crushed ice.',
      estate: 'Meghalaya Tribal Organic Cooperative',
      ingredients: ['Organic Hibiscus Petals', 'Wild Strawberries & Blueberries', 'Fresh Lime Juice', 'Raw Mountain Honey', 'Crushed Ice'],
      prepTime: '3 mins',
      caffeine: 'Caffeine-Free',
      temperature: 'Chilled Over Ice (2°C)',
      calories: '80 kcal',
      spiceLevel: 'Vibrant Tart Berry & Citrus Zing',
      isVeg: true,
      badge: 'Antioxidant Rich',
      customizable: true
    },
    {
      id: 'chai-15',
      name: 'South Indian Filter Coffee',
      category: 'Coffee',
      price: 129,
      rating: 4.9,
      reviews: 320,
      image: 'assets/images/south-indian-filter-coffee.jpg',
      description: 'The sacred Malabar morning ritual: dark-roasted Chikmagalur Arabica and Peaberry beans dripped through brass gravity filters, aerated into frothing scalding milk with golden crema.',
      estate: 'Chikmagalur Heritage Plantations (1,100m MSL)',
      ingredients: ['Chikmagalur Plantation A Dark Roast', '15% Roasted Chicory', 'Boiled Whole Farm Milk', 'Golden Cane Sugar'],
      prepTime: '5 mins',
      caffeine: 'High (85mg)',
      temperature: 'Frothed Hot (88°C)',
      calories: '135 kcal',
      spiceLevel: 'Deep Cocoa, Caramel & Bold Chicory',
      isVeg: true,
      badge: 'Iconic Heritage',
      customizable: true
    },
    {
      id: 'chai-16',
      name: 'Madras Kaapi Frappe',
      category: 'Coffee',
      price: 169,
      rating: 4.8,
      reviews: 140,
      image: 'assets/images/madras-kaapi-frappe.jpg',
      description: 'A decadent indulgence: double-strength artisan South Indian filter kaapi decoction blended with Madagascar vanilla bean cream, chilled farm milk, and crushed dark cacao nibs.',
      estate: 'Bababudangiri Sacred Hills, Karnataka',
      ingredients: ['Filter Coffee Decoction', 'Chilled Farm Milk', 'Artisan Vanilla Cream', 'Demerara Sugar', 'Dark Cacao Nibs'],
      prepTime: '4 mins',
      caffeine: 'High (80mg)',
      temperature: 'Blended Frozen (0°C)',
      calories: '220 kcal',
      spiceLevel: 'Velvety, Frozen & Dark Mocha',
      isVeg: true,
      badge: 'House Special',
      customizable: true
    },
    {
      id: 'chai-16a',
      name: 'Mysore Cinnamon Filter Kaapi',
      category: 'Coffee',
      price: 139,
      rating: 4.8,
      reviews: 175,
      image: 'assets/images/mysore-cinnamon-filter-kaapi.jpg',
      description: 'A fragrant royal Mysore twist: dark-roasted Chikmagalur Peaberry and Arabica decoction infused with crushed sweet Ceylon cinnamon bark and foaming farm milk.',
      estate: 'Mysore Malnad Foothills (950m MSL)',
      ingredients: ['Chikmagalur Arabica Dark Roast', 'Ceylon Cinnamon Quill', 'Roasted Chicory', 'Frothing Whole Milk', 'Raw Sugar'],
      prepTime: '5 mins',
      caffeine: 'High (80mg)',
      temperature: 'Frothed Hot (88°C)',
      calories: '130 kcal',
      spiceLevel: 'Warm Cinnamon & Toasted Caramel',
      isVeg: true,
      badge: 'Heritage Recipe',
      customizable: true
    },
    {
      id: 'chai-17',
      name: 'Artisan Samosa Platter',
      category: 'Snacks',
      price: 149,
      rating: 4.9,
      reviews: 395,
      image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80',
      description: 'Hand-folded golden pastry crusts baked crisp to perfection, bursting with cumin-tempered baby potatoes, sweet garden peas, and roasted cashews, paired with fresh mint and date chutneys.',
      estate: 'Baked Fresh in Small Hourly Batches',
      ingredients: ['Handcrafted Flaky Pastry', 'Cumin Spiced Potatoes', 'Sweet Green Peas', 'Toasted Cashews', 'Fresh Mint Chutney', 'Tamarind Date Dip'],
      prepTime: '6 mins',
      caffeine: 'None',
      temperature: 'Hot & Crisp (65°C)',
      calories: '280 kcal',
      spiceLevel: 'Warm Cumin, Coriander & Tang',
      isVeg: true,
      badge: 'Bestseller',
      customizable: false
    },
    {
      id: 'chai-18',
      name: 'Paneer Tikka Puff',
      category: 'Snacks',
      price: 139,
      rating: 4.8,
      reviews: 215,
      image: 'assets/images/paneer-tikka-puff.jpg',
      description: 'Flaky laminated French puff pastry infused with royal Indian flair: tender cubes of farm paneer marinated in tandoori spices and smoked over charcoal with sweet bell peppers.',
      estate: 'Handcrafted Fresh Every 2 Hours',
      ingredients: ['Laminated Puff Pastry Layers', 'Tandoori Cottage Cheese', 'Charred Bell Peppers', 'Chaat Masala', 'Fresh Herbs'],
      prepTime: '5 mins',
      caffeine: 'None',
      temperature: 'Warm & Flaky (60°C)',
      calories: '260 kcal',
      spiceLevel: 'Smoky Char & Zesty Chaat Masala',
      isVeg: true,
      badge: 'Freshly Baked',
      customizable: false
    },
    {
      id: 'chai-19',
      name: 'Bun Maska & Jam',
      category: 'Snacks',
      price: 89,
      rating: 4.9,
      reviews: 310,
      image: 'assets/images/bun-maska-jam.jpg',
      description: 'A nostalgic heritage café tribute: warm, pillowy soft sweet brioche split and slathered with salted creamery butter and house-simmered cardamom berry preserve.',
      estate: 'Baked Fresh Daily at Dawn',
      ingredients: ['Artisan Brioche Bun', 'Pure Creamery Butter', 'Homemade Mixed Berry Preserve', 'Cardamom Sugar Dust'],
      prepTime: '3 mins',
      caffeine: 'None',
      temperature: 'Room Temp / Warm Bun',
      calories: '240 kcal',
      spiceLevel: 'Rich Creamery Butter & Sweet Berries',
      isVeg: true,
      badge: 'Timeless Classic',
      customizable: false
    },
    {
      id: 'chai-20',
      name: 'Bombay Vada Pav (Pair)',
      category: 'Snacks',
      price: 119,
      rating: 4.9,
      reviews: 280,
      image: 'assets/images/bombay-vada-pav.jpg',
      description: 'The beloved street royalty: golden turmeric potato spheres in crisp chickpea batter, nestled inside toasted bakery pav with fiery dry coconut-garlic chutney and fried salted chilies.',
      estate: 'Authentic Street Heritage Recipe',
      ingredients: ['Spiced Batata Vada', 'Fresh Bakery Pav', 'Dry Roasted Garlic-Coconut Chutney', 'Fried Salted Green Chilli', 'Tangy Tamarind Dip'],
      prepTime: '5 mins',
      caffeine: 'None',
      temperature: 'Piping Hot & Crisp',
      calories: '310 kcal',
      spiceLevel: 'Fiery Garlic Thecha & Golden Spice',
      isVeg: true,
      badge: 'Street Legend',
      customizable: false
    },
    {
      id: 'chai-20a',
      name: 'Crispy Masala Mathri & Pickle',
      category: 'Snacks',
      price: 99,
      rating: 4.8,
      reviews: 185,
      image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80',
      description: 'Artisanal Rajasthani spiced flaky savory crackers kneaded with carom seeds (ajwain), cracked black pepper, and pure cow ghee, served with aged spicy mango pickle.',
      estate: 'Hand-Rolled in Small Batches Daily',
      ingredients: ['Stoneground Wheat Flour', 'Desi Ghee', 'Ajwain Carom Seeds', 'Tellicherry Black Pepper', 'Aged Mango Achar'],
      prepTime: 'Instant',
      caffeine: 'None',
      temperature: 'Crisp Room Temp',
      calories: '220 kcal',
      spiceLevel: 'Zesty Ajwain & Tangy Mango Achar',
      isVeg: true,
      badge: 'Chai Companion',
      customizable: false
    },
    {
      id: 'chai-20b',
      name: 'Golden Poha Cutlet Trio',
      category: 'Snacks',
      price: 129,
      rating: 4.9,
      reviews: 210,
      image: 'assets/images/paneer-tikka-puff.jpg',
      description: 'Three crispy golden cutlets made from flattened organic rice, tempered potatoes, roasted crunchy peanuts, and green chilies, served with sweet date chutney.',
      estate: 'Prepared to Order Crisp & Golden',
      ingredients: ['Organic Flattened Rice (Poha)', 'Spiced Potatoes', 'Roasted Peanuts', 'Fresh Green Chillies', 'Mint Coriander Dip'],
      prepTime: '5 mins',
      caffeine: 'None',
      temperature: 'Crisp & Hot (70°C)',
      calories: '250 kcal',
      spiceLevel: 'Mildly Spiced with Crunchy Peanuts',
      isVeg: true,
      badge: 'Chef Choice',
      customizable: false
    },
    {
      id: 'chai-21',
      name: 'Gulab Jamun Chai Cake',
      category: 'Desserts',
      price: 169,
      rating: 5.0,
      reviews: 198,
      image: 'assets/images/gulab-jamun-chai-cake.jpg',
      description: 'An imperial celebration confection: tender cardamom-infused sponge soaked in Damascus rose and saffron nectar, embedded with soft gulab jamun spheres and whipped pistachio cream.',
      estate: 'Artisan Patisserie Kitchen',
      ingredients: ['Cardamom Infused Sponge', 'Mawa Gulab Jamun', 'Rose Saffron Syrup', 'Pistachio Buttercream Frosting', 'Edible Pure Silver Vark'],
      prepTime: 'Instant',
      caffeine: 'None',
      temperature: 'Chilled (4°C)',
      calories: '320 kcal',
      spiceLevel: 'Fragrant Rose, Saffron & Mawa',
      isVeg: true,
      badge: 'Chef Signature',
      customizable: false
    },
    {
      id: 'chai-22',
      name: 'Saffron Pistachio Kulfi',
      category: 'Desserts',
      price: 149,
      rating: 4.9,
      reviews: 185,
      image: 'assets/images/saffron-pistachio-kulfi.jpg',
      description: 'Slow-reduced for six hours in heavy brass pans: dense, caramelized whole milk rabri infused with Kashmiri Mongra saffron threads, crushed green cardamom, and Iranian slivered pistachios.',
      estate: 'Traditional Clay-Matka Churned',
      ingredients: ['Slow-Reduced Whole Milk (Rabri)', 'Kashmir Mongra Saffron', 'Idukki Green Cardamom', 'Toasted Iranian Pistachios'],
      prepTime: 'Instant',
      caffeine: 'None',
      temperature: 'Frozen (-5°C)',
      calories: '210 kcal',
      spiceLevel: 'Rich Caramelized Cream & Saffron',
      isVeg: true,
      badge: 'Heritage Recipe',
      customizable: false
    },
    {
      id: 'chai-22a',
      name: 'Cardamom Pistachio Mawa Cake',
      category: 'Desserts',
      price: 139,
      rating: 4.9,
      reviews: 165,
      image: 'assets/images/gulab-jamun-chai-cake.jpg',
      description: 'A beloved Irani café heirloom: dense, buttery caramelized milk-solid (mawa) tea cake infused with green cardamom powder, nutmeg, and crunchy slivered Iranian pistachios.',
      estate: 'Freshly Baked Daily at Sunrise',
      ingredients: ['Pure Buffalo Mawa (Khoya)', 'Fresh Butter', 'Green Cardamom Powder', 'Grated Nutmeg', 'Slivered Pistachios'],
      prepTime: 'Instant',
      caffeine: 'None',
      temperature: 'Room Temp / Gently Warmed',
      calories: '280 kcal',
      spiceLevel: 'Sweet Caramelized Mawa & Cardamom',
      isVeg: true,
      badge: 'Heritage Heirloom',
      customizable: false
    }
  ];

  const FAVORITES_KEY = 'chai_favorites';

  function getFavorites() {
    try {
      const saved = localStorage.getItem(FAVORITES_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  }

  function toggleFavorite(id) {
    let favs = getFavorites();
    const index = favs.indexOf(id);
    let isFav = false;
    if (index > -1) {
      favs.splice(index, 1);
      isFav = false;
      if (window.showToast) window.showToast('Removed from your favorites', 'info');
    } else {
      favs.push(id);
      isFav = true;
      if (window.showToast) window.showToast('Saved to your favorites ❤️', 'success');
    }
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favs));
    return isFav;
  }

  const CATEGORY_META = {
    'Masala Chai': {
      title: 'Heritage Masala Chai Collection',
      eyebrow: 'Heirloom Copper Degchi Brews',
      tagline: 'Slow-simmered in traditional copper degchis with single-estate harvest leaves, whole wild spices pounded at dawn, and velvety farm milk.',
      icon: 'fa-solid fa-mug-hot',
      badge: 'Master Chai Recipe',
      slug: 'masala-chai'
    },
    'Specialty Tea': {
      title: 'Imperial & Reserve Harvest Teas',
      eyebrow: 'Single-Estate & Himalayan Reserves',
      tagline: 'Rare high-altitude Darjeeling first flushes, royal Kashmiri saffron kahwa, and emperor-grade floral whole-leaf infusions.',
      icon: 'fa-solid fa-crown',
      badge: 'Reserve Harvest',
      slug: 'specialty-tea'
    },
    'Herbal Tea': {
      title: 'Ayurvedic Botanicals & Herbal Tisanes',
      eyebrow: '100% Caffeine-Free Holistic Wellness',
      tagline: 'Sacred wild Krishna and Rama Tulsi, whole golden Egyptian chamomile blossoms, and refreshing sun-cured organic peppermint.',
      icon: 'fa-solid fa-leaf',
      badge: 'Pure Botanicals',
      slug: 'herbal-tea'
    },
    'Iced Tea': {
      title: 'Sun-Steeped Cold Brews & Refreshers',
      eyebrow: '18-Hour Slow Cold Immersion',
      tagline: 'Single-origin highland leaves slow-matured in pure mountain water, harmonized with Ratnagiri Alphonso mango and wild hibiscus calyces.',
      icon: 'fa-solid fa-snowflake',
      badge: 'Summer Chill',
      slug: 'iced-tea'
    },
    'Coffee': {
      title: 'Traditional Malabar Filter Kaapi & Cold Brews',
      eyebrow: 'Chikmagalur & Coorg High Estates',
      tagline: 'Shade-grown Arabica and Peaberry beans slow-roasted with chicory, dripped through brass gravity filters and frothed with scalding milk.',
      icon: 'fa-solid fa-mug-saucer',
      badge: 'Estate Roasted',
      slug: 'filter-coffee'
    },
    'Snacks': {
      title: 'Artisanal Savories & Authentic Chai Pairings',
      eyebrow: 'Freshly Baked & Handcrafted Daily',
      tagline: 'Multi-layered flaky French-style paneer puffs, authentic Bombay vada pav with garlic thecha, and pillowy Irani bun maska.',
      icon: 'fa-solid fa-cookie-bite',
      badge: 'Freshly Baked',
      slug: 'snacks-bakes'
    },
    'Desserts': {
      title: 'Artisanal Heritage Sweets & Confections',
      eyebrow: 'Imperial Confectionery Tradition',
      tagline: 'Six-hour slow-reduced rabri kulfi with Kashmiri saffron and delicate cardamom sponge cakes layered with gulab jamun.',
      icon: 'fa-solid fa-ice-cream',
      badge: 'Royal Indulgence',
      slug: 'heritage-desserts'
    }
  };

  const CATEGORY_ORDER = [
    'Masala Chai',
    'Specialty Tea',
    'Herbal Tea',
    'Iced Tea',
    'Coffee',
    'Snacks',
    'Desserts'
  ];

  function escapeHtml(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function renderCardActionButton(productId, productName) {
    const qty = (window.chaiCart && typeof window.chaiCart.getItemQuantity === 'function') 
      ? window.chaiCart.getItemQuantity(productId) 
      : 0;

    if (qty > 0) {
      return `
        <div class="chai-cart-stepper active" data-id="${productId}" role="group" aria-label="Adjust order quantity for ${escapeHtml(productName || '')}">
          <button type="button" class="stepper-btn stepper-minus" data-id="${productId}" aria-label="Decrease quantity">
            <i class="fa-solid fa-minus"></i>
          </button>
          <div class="stepper-count-wrap" title="${qty} in your order tray">
            <span class="count-num">${qty}</span>
            <span class="count-label">in Tray</span>
          </div>
          <button type="button" class="stepper-btn stepper-plus" data-id="${productId}" aria-label="Increase quantity">
            <i class="fa-solid fa-plus"></i>
          </button>
        </div>
      `;
    }

    return `
      <button type="button" class="btn-card-action btn-add-cart add-cart-btn" data-id="${productId}" aria-label="Add ${escapeHtml(productName || '')} to order" title="Add to Order">
        <i class="fa-solid fa-plus"></i> <span>Add to Order</span>
      </button>
    `;
  }

  function renderProductCard(item, isFavorite, index = 0) {
    const badgeText = item.badge || '';
    const lowerBadge = badgeText.toLowerCase();
    let badgeClass = 'badge-special';
    let badgeIcon = 'fa-award';

    if (lowerBadge.includes('bestseller')) {
      badgeClass = 'badge-bestseller';
      badgeIcon = 'fa-fire';
    } else if (lowerBadge.includes('popular') || lowerBadge.includes('street')) {
      badgeClass = 'badge-popular';
      badgeIcon = 'fa-star';
    } else if (lowerBadge.includes('chef') || lowerBadge.includes('signature') || lowerBadge.includes('reserve') || lowerBadge.includes('legend') || lowerBadge.includes('heritage')) {
      badgeClass = 'badge-signature';
      badgeIcon = 'fa-crown';
    } else if (lowerBadge.includes('elixir') || lowerBadge.includes('wellness') || lowerBadge.includes('detox') || lowerBadge.includes('tisane') || lowerBadge.includes('botanical')) {
      badgeClass = 'badge-botanical';
      badgeIcon = 'fa-seedling';
    } else if (lowerBadge.includes('baked') || lowerBadge.includes('fresh') || lowerBadge.includes('must try')) {
      badgeClass = 'badge-fresh';
      badgeIcon = 'fa-sparkles';
    }

    const badgeHtml = badgeText
      ? `<span class="chai-badge ${badgeClass}">
          <i class="fa-solid ${badgeIcon}"></i> ${escapeHtml(badgeText)}
        </span>`
      : '';
    const favActiveClass = isFavorite ? 'active' : '';

    return `
      <article class="chai-card revealed" data-id="${item.id}" data-category="${item.category}" data-price="${item.price}" data-rating="${item.rating}" style="--card-delay:${(index % 8) * 0.05}s;">
        <div class="chai-card-image">
          ${badgeHtml}
          <button type="button" class="chai-card-fav ${favActiveClass}" data-id="${item.id}" aria-label="Add ${item.name} to favorites" title="${isFavorite ? 'Remove from favorites' : 'Save to favorites'}">
            <i class="${isFavorite ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
          </button>
          <img src="${item.image}" alt="${item.name}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=600&q=80'">
          <div class="chai-card-overlay"></div>
        </div>
        <div class="chai-card-body">
          <div class="chai-meta">
            <div class="chai-category-tag-wrap">
              ${item.isVeg ? `<span class="veg-icon" title="100% Pure Vegetarian"><span class="veg-dot"></span></span>` : ''}
              <span class="chai-category-tag">${item.category}</span>
            </div>
            <div class="chai-rating" title="Rated ${item.rating} out of 5 stars based on ${item.reviews} reviews">
              <i class="fa-solid fa-star"></i>
              <span>${item.rating}</span>
              <span class="rating-count">(${item.reviews})</span>
            </div>
          </div>
          <h4 class="chai-title">${item.name}</h4>
          <p class="chai-description">${item.description}</p>

          <div class="chai-specs-row">
            <span class="chai-spec-pill" title="Preparation Time"><i class="fa-regular fa-clock"></i>${item.prepTime}</span>
            <span class="chai-spec-pill" title="Caffeine Level"><i class="fa-solid fa-bolt"></i>${item.caffeine.split(' ')[0]}</span>
            <span class="chai-spec-pill" title="Calorie Count"><i class="fa-solid fa-fire"></i>${item.calories}</span>
          </div>

          <div class="chai-card-recipe-box" title="Artisan Recipe Ingredients">
            <span class="recipe-box-title"><i class="fa-solid fa-mortar-pestle"></i> Recipe:</span>
            <span class="recipe-box-ingredients">${item.ingredients ? item.ingredients.slice(0, 4).join(' • ') : ''}</span>
          </div>

          <div class="chai-card-footer">
            <div class="chai-footer-top-row">
              <div class="chai-price-block">
                <div class="chai-price"><span class="currency-symbol">₹</span>${item.price}</div>
                <div class="price-tax-label"><i class="fa-solid fa-circle-check"></i> Inclusive of taxes</div>
              </div>
              <button type="button" class="btn-card-action quick-view-btn" data-id="${item.id}" aria-label="View recipe notes for ${item.name}" title="View sensory tasting notes & estate harvest">
                <i class="fa-regular fa-compass"></i> <span>Recipe Notes</span>
              </button>
            </div>
            <div class="chai-footer-action-row" data-product-id="${item.id}">
              ${renderCardActionButton(item.id, item.name)}
            </div>
          </div>
        </div>
      </article>
    `;
  }

  function openProductQuickView(productId) {
    const item = MENU_ITEMS.find(p => p.id === productId);
    if (!item) return;

    let modal = document.getElementById('product-quickview-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'product-quickview-modal';
      modal.className = 'modal-overlay';
      document.body.appendChild(modal);
    }

    const ingredientsList = item.ingredients ? item.ingredients.map(i => `<span style="background:var(--primary-light);color:var(--primary);padding:4px 10px;border-radius:var(--radius-pill);font-size:0.8rem;font-weight:600;"><i class="fa-solid fa-seedling" style="font-size:0.7rem;margin-right:4px;"></i>${i}</span>`).join(' ') : '';

    const isBeverage = ['Masala Chai', 'Herbal Tea', 'Iced Tea', 'Specialty Tea', 'Coffee'].includes(item.category);

    modal.innerHTML = `
      <div class="modal-dialog modal-quickview-dialog" role="dialog" aria-modal="true" aria-label="${escapeHtml(item.name)} Sensory Recipe Notes">
        <button type="button" class="modal-close-btn" aria-label="Close dialog" title="Close (Esc)">
          <i class="fa-solid fa-xmark"></i>
        </button>

        <!-- Scrollable Body for Visuals & Details -->
        <div class="quickview-body-scroll">
          <div class="modal-product-grid">
            <!-- Left: Visual Showcase & Origin -->
            <div class="quickview-media-col">
              <div class="quickview-img-wrap">
                <img src="${item.image}" alt="${escapeHtml(item.name)}" class="modal-product-img" onerror="this.src='https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=600&q=80'">
                <div class="quickview-img-badge">
                  <i class="fa-solid fa-leaf"></i> 100% Single-Estate
                </div>
              </div>

              <div class="quickview-origin-card">
                <div class="origin-tag">
                  <i class="fa-solid fa-location-dot"></i> Single-Estate Harvest Origin:
                </div>
                <div class="origin-name">${escapeHtml(item.estate || 'Artisan Chai & Co. House Blend')}</div>
              </div>
            </div>

            <!-- Right: Content & Brewing Options -->
            <div class="quickview-content-col">
              <div class="quickview-header-row">
                <span class="tagline-label">${escapeHtml(item.category)}</span>
                <div class="chai-rating">
                  <i class="fa-solid fa-star"></i>
                  <strong>${item.rating}</strong>
                  <span class="text-muted">(${item.reviews} reviews)</span>
                </div>
              </div>

              <h2 class="quickview-product-title">${escapeHtml(item.name)}</h2>
              <div class="quickview-price-row">
                <div class="chai-price">₹${item.price}</div>
                <span class="tax-tag">incl. 5% GST</span>
              </div>

              <p class="quickview-desc">${escapeHtml(item.description)}</p>

              <div class="quickview-specs-grid">
                <div class="spec-cell">
                  <span class="spec-label"><i class="fa-regular fa-clock"></i> Prep Time</span>
                  <div class="spec-val">${escapeHtml(item.prepTime)}</div>
                </div>
                <div class="spec-cell">
                  <span class="spec-label"><i class="fa-solid fa-bolt"></i> Caffeine</span>
                  <div class="spec-val">${escapeHtml(item.caffeine)}</div>
                </div>
                <div class="spec-cell">
                  <span class="spec-label"><i class="fa-solid fa-fire"></i> Calories</span>
                  <div class="spec-val">${escapeHtml(item.calories)}</div>
                </div>
              </div>

              <!-- Customization Options (if beverage) -->
              ${isBeverage ? `
                <div class="customization-box">
                  <div class="customization-box-title">
                    <span><i class="fa-solid fa-sliders" style="color:var(--primary);margin-right:6px;"></i> Artisan Brewing Preferences:</span>
                    <span style="font-size:0.75rem;font-weight:500;color:var(--text-muted);">Tailored to your palate</span>
                  </div>

                  <div class="customization-fields-grid">
                    <div>
                      <label for="modal-milk-choice" class="custom-field-label">Milk Preference</label>
                      <select id="modal-milk-choice" class="menu-sort-select" style="width:100%;font-size:0.8rem;padding:7px 10px;">
                        <option value="Standard Milk" data-extra="0">Whole Farm Dairy Milk (Standard)</option>
                        <option value="Oat Milk" data-extra="30">Artisanal Barista Oat Milk (+₹30)</option>
                        <option value="Almond Milk" data-extra="30">Organic Almond Milk (+₹30)</option>
                        <option value="Water Steeped" data-extra="0">Black / Pure Spring Water Only</option>
                      </select>
                    </div>
                    <div>
                      <label for="modal-sweetness-choice" class="custom-field-label">Sweetness</label>
                      <select id="modal-sweetness-choice" class="menu-sort-select" style="width:100%;font-size:0.8rem;padding:7px 10px;">
                        <option value="Regular Sugar">Traditional Raw Sugar (100%)</option>
                        <option value="Less Sugar">Gentle Sweetness (50%)</option>
                        <option value="Desi Jaggery (+₹10)" data-extra="10">Desi Organic Jaggery (+₹10)</option>
                        <option value="Unsweetened">Unsweetened / Pure Leaf</option>
                      </select>
                    </div>
                  </div>

                  <div class="custom-addons-row">
                    <label class="custom-addon-item">
                      <input type="checkbox" id="modal-addon-ginger" data-name="Extra Ginger" data-price="15">
                      <span>Pounded Ginger (+₹15)</span>
                    </label>
                    <label class="custom-addon-item">
                      <input type="checkbox" id="modal-addon-saffron" data-name="Saffron Strands" data-price="35">
                      <span>Pampore Saffron (+₹35)</span>
                    </label>
                    <label class="custom-addon-item">
                      <input type="checkbox" id="modal-addon-elaichi" data-name="Extra Elaichi" data-price="15">
                      <span>Crushed Green Elaichi (+₹15)</span>
                    </label>
                  </div>
                </div>
              ` : ''}

              <div class="quickview-ingredients-box">
                <h5 class="ingredients-title"><i class="fa-solid fa-seedling" style="color:var(--primary);"></i> Handpicked Botanical Ingredients & Harvest Elements:</h5>
                <div class="ingredients-list">
                  ${ingredientsList}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Sticky Bottom Action Footer -->
        <div class="quickview-sticky-footer">
          <div class="quickview-footer-inner">
            <div class="cart-qty-ctrl">
              <button type="button" class="qty-btn" id="modal-qty-minus" aria-label="Decrease quantity"><i class="fa-solid fa-minus"></i></button>
              <span class="qty-value" id="modal-qty-val">1</span>
              <button type="button" class="qty-btn" id="modal-qty-plus" aria-label="Increase quantity"><i class="fa-solid fa-plus"></i></button>
            </div>
            <button type="button" class="btn btn-primary modal-action-btn" id="modal-add-cart-btn" aria-label="Add ${escapeHtml(item.name)} to order tray">
              <span class="btn-text-content">
                <i class="fa-solid fa-bag-shopping"></i> Add to Order • <span id="modal-btn-price">₹${item.price}</span>
              </span>
              <span class="btn-success-content" style="display:none;align-items:center;gap:8px;">
                <i class="fa-solid fa-check"></i> Added to Tray!
              </span>
            </button>
          </div>
        </div>
      </div>
    `;

    // Dynamic price calculation with options
    let qty = 1;
    const qtyVal = modal.querySelector('#modal-qty-val');
    const btnPrice = modal.querySelector('#modal-btn-price');
    const minusBtn = modal.querySelector('#modal-qty-minus');
    const plusBtn = modal.querySelector('#modal-qty-plus');
    const addBtn = modal.querySelector('#modal-add-cart-btn');

    function calculateItemUnitPrice() {
      let unit = item.price;
      const milkSelect = modal.querySelector('#modal-milk-choice');
      if (milkSelect) {
        const selectedMilk = milkSelect.options[milkSelect.selectedIndex];
        unit += parseInt(selectedMilk.dataset.extra || '0', 10);
      }
      const sweetSelect = modal.querySelector('#modal-sweetness-choice');
      if (sweetSelect) {
        const selectedSweet = sweetSelect.options[sweetSelect.selectedIndex];
        unit += parseInt(selectedSweet.dataset.extra || '0', 10);
      }
      const gingerCheck = modal.querySelector('#modal-addon-ginger');
      if (gingerCheck && gingerCheck.checked) unit += 15;
      const saffronCheck = modal.querySelector('#modal-addon-saffron');
      if (saffronCheck && saffronCheck.checked) unit += 35;
      const elaichiCheck = modal.querySelector('#modal-addon-elaichi');
      if (elaichiCheck && elaichiCheck.checked) unit += 15;
      return unit;
    }

    function updateModalPrice() {
      const unit = calculateItemUnitPrice();
      btnPrice.textContent = '₹' + (unit * qty);
    }

    // Attach option change listeners
    modal.querySelectorAll('#modal-milk-choice, #modal-sweetness-choice, #modal-addon-ginger, #modal-addon-saffron, #modal-addon-elaichi').forEach(elem => {
      elem.addEventListener('change', updateModalPrice);
    });

    minusBtn.addEventListener('click', () => {
      if (qty > 1) {
        qty--;
        qtyVal.textContent = qty;
        updateModalPrice();
      }
    });

    plusBtn.addEventListener('click', () => {
      qty++;
      qtyVal.textContent = qty;
      updateModalPrice();
    });

    addBtn.addEventListener('click', () => {
      const unit = calculateItemUnitPrice();
      const customOptions = [];

      const milkSelect = modal.querySelector('#modal-milk-choice');
      if (milkSelect && milkSelect.value !== 'Standard Milk') {
        customOptions.push(milkSelect.value);
      }
      const sweetSelect = modal.querySelector('#modal-sweetness-choice');
      if (sweetSelect && sweetSelect.value !== 'Regular Sugar') {
        customOptions.push(sweetSelect.value);
      }
      if (modal.querySelector('#modal-addon-ginger')?.checked) customOptions.push('Extra Ginger');
      if (modal.querySelector('#modal-addon-saffron')?.checked) customOptions.push('Saffron');
      if (modal.querySelector('#modal-addon-elaichi')?.checked) customOptions.push('Extra Elaichi');

      const customNote = customOptions.length > 0 ? customOptions.join(', ') : '';

      // Animate button into success state
      addBtn.classList.add('order-placed-anim');
      const textContent = addBtn.querySelector('.btn-text-content');
      const successContent = addBtn.querySelector('.btn-success-content');
      if (textContent && successContent) {
        textContent.style.display = 'none';
        successContent.style.display = 'inline-flex';
      }

      if (window.chaiCart) {
        window.chaiCart.addToCart({
          id: item.id,
          name: item.name,
          price: unit,
          image: item.image,
          category: item.category,
          quantity: qty,
          customization: customNote
        }, false);
      }

      // Smoothly close modal after feedback animation
      setTimeout(() => {
        if (window.closeModal) window.closeModal();
      }, 420);
    });

    const closeBtn = modal.querySelector('.modal-close-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        if (window.closeModal) window.closeModal();
      });
    }

    if (window.openModal) {
      window.openModal('product-quickview-modal');
    }
  }

  function initMenuGrid(containerSelector, filterCategory = 'All', limit = null) {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    let activeCategory = filterCategory;
    let searchQuery = '';
    let sortMode = 'default';

    function filterAndRender() {
      let filtered = [...MENU_ITEMS];

      // Category filter
      if (activeCategory !== 'All') {
        filtered = filtered.filter(item => item.category.toLowerCase() === activeCategory.toLowerCase());
      }

      // Search filter
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase().trim();
        filtered = filtered.filter(item =>
          item.name.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          (item.estate && item.estate.toLowerCase().includes(q)) ||
          (item.ingredients && item.ingredients.some(i => i.toLowerCase().includes(q)))
        );
      }

      // Sort
      if (sortMode === 'price-asc') {
        filtered.sort((a, b) => a.price - b.price);
      } else if (sortMode === 'price-desc') {
        filtered.sort((a, b) => b.price - a.price);
      } else if (sortMode === 'popular') {
        filtered.sort((a, b) => b.reviews - a.reviews);
      } else if (sortMode === 'rating') {
        filtered.sort((a, b) => b.rating - a.rating);
      }

      // Limit if requested (e.g. homepage preview)
      const displayItems = limit ? filtered.slice(0, limit) : filtered;

      if (displayItems.length === 0) {
        container.innerHTML = `
          <div style="grid-column:1/-1;text-align:center;padding:60px 20px;background:var(--bg-surface);border-radius:var(--radius-lg);border:1px dashed var(--border);width:100%;">
            <div style="width:72px;height:72px;border-radius:50%;background:var(--primary-light);color:var(--primary);display:flex;align-items:center;justify-content:center;font-size:2rem;margin:0 auto 16px;">
              <i class="fa-solid fa-magnifying-glass"></i>
            </div>
            <h4>No creations matched "${escapeHtml(searchQuery || activeCategory)}"</h4>
            <p class="text-muted" style="margin-top:6px;max-width:400px;margin-inline:auto;">Try selecting another artisan category tab or clearing your search term to explore our full culinary collection.</p>
            <button type="button" class="btn btn-outline btn-sm" id="reset-menu-filters" style="margin-top:14px;">
              View All Creations
            </button>
          </div>
        `;
        const resetBtn = container.querySelector('#reset-menu-filters');
        if (resetBtn) {
          resetBtn.addEventListener('click', () => {
            activeCategory = 'All';
            searchQuery = '';
            sortMode = 'default';
            const sInput = document.querySelector('.menu-search-input');
            if (sInput) sInput.value = '';
            const sSelect = document.querySelector('.menu-sort-select');
            if (sSelect) sSelect.value = 'default';
            document.querySelectorAll('.menu-filter-tabs .filter-btn').forEach(b => {
              b.classList.toggle('active', (b.dataset.category || 'All') === 'All');
            });
            filterAndRender();
          });
        }
        return;
      }

      const favs = getFavorites();

      // Case A: Homepage preview with limit — flat grid
      if (limit) {
        container.innerHTML = displayItems.map((item, idx) => renderProductCard(item, favs.includes(item.id), idx)).join('');
        return;
      }

      // Case B: Full menu catalog with active search query or custom sorting
      if (searchQuery.trim() !== '' || sortMode !== 'default') {
        const sSelect = document.querySelector('.menu-sort-select');
        const sortLabel = sSelect && sortMode !== 'default' ? sSelect.options[sSelect.selectedIndex].text : '';
        container.innerHTML = `
          <div class="menu-search-results-banner">
            <div class="menu-search-results-info">
              <div class="search-banner-icon">
                <i class="fa-solid fa-magnifying-glass"></i>
              </div>
              <div>
                <h4 class="search-banner-title">
                  ${searchQuery ? `Search Results for "${escapeHtml(searchQuery)}"` : `Sorted by: ${sortLabel}`}
                </h4>
                <p class="search-banner-desc">Showing ${displayItems.length} matching handcrafted ${displayItems.length === 1 ? 'culinary creation' : 'culinary creations'}</p>
              </div>
            </div>
            <button type="button" class="btn btn-outline btn-sm reset-search-filters-btn">
              <i class="fa-solid fa-rotate-left"></i> Return to Full Catalog
            </button>
          </div>
          <div class="grid grid-3 menu-cards-grid">
            ${displayItems.map((item, idx) => renderProductCard(item, favs.includes(item.id), idx)).join('')}
          </div>
        `;
        const resetSearchBtn = container.querySelector('.reset-search-filters-btn');
        if (resetSearchBtn) {
          resetSearchBtn.addEventListener('click', () => {
            activeCategory = 'All';
            searchQuery = '';
            sortMode = 'default';
            const sInput = document.querySelector('.menu-search-input');
            if (sInput) sInput.value = '';
            if (sSelect) sSelect.value = 'default';
            document.querySelectorAll('.menu-filter-tabs .filter-btn').forEach(b => {
              b.classList.toggle('active', (b.dataset.category || 'All') === 'All');
            });
            filterAndRender();
          });
        }
        return;
      }

      // Case C: Single category selected — Highlighted spotlight header + 3-column grid
      if (activeCategory !== 'All') {
        const meta = CATEGORY_META[activeCategory] || {
          title: activeCategory,
          eyebrow: 'Artisanal Collection',
          tagline: 'Handcrafted signature recipes from our tea masters.',
          icon: 'fa-solid fa-mug-hot',
          badge: 'Stall Classics',
          slug: activeCategory.toLowerCase().replace(/\s+/g, '-')
        };

        container.innerHTML = `
          <div class="menu-category-section menu-category-spotlight">
            <div class="menu-category-header spotlight-header">
              <div class="menu-category-header-main">
                <div class="menu-category-icon-box">
                  <i class="${meta.icon}"></i>
                </div>
                <div class="menu-category-info">
                  <div class="menu-category-eyebrow"><i class="fa-solid fa-star"></i> ${meta.eyebrow}</div>
                  <h3 class="menu-category-title">${meta.title}</h3>
                  <p class="menu-category-desc">${meta.tagline}</p>
                </div>
              </div>
              <div class="menu-category-header-meta">
                <span class="menu-category-badge"><i class="fa-solid fa-award"></i> ${meta.badge}</span>
                <span class="menu-category-count-pill">${displayItems.length} Master Recipes</span>
              </div>
            </div>
            <div class="grid grid-3 menu-cards-grid">
              ${displayItems.map((item, idx) => renderProductCard(item, favs.includes(item.id), idx)).join('')}
            </div>
          </div>
        `;
        return;
      }

      // Case D: "All Blends" — Group into distinctive, highlighted category sections
      let html = '<div class="full-menu-wrapper">';
      let cardIdx = 0;
      CATEGORY_ORDER.forEach(catName => {
        const catItems = displayItems.filter(item => item.category.toLowerCase() === catName.toLowerCase());
        if (catItems.length === 0) return;
        const meta = CATEGORY_META[catName] || {
          title: catName,
          eyebrow: 'Artisanal Collection',
          tagline: 'Handcrafted with signature spices and fresh ingredients.',
          icon: 'fa-solid fa-mug-hot',
          badge: 'Signature',
          slug: catName.toLowerCase().replace(/\s+/g, '-')
        };

        html += `
          <section class="menu-category-section" id="cat-${meta.slug}">
            <div class="menu-category-header">
              <div class="menu-category-header-main">
                <div class="menu-category-icon-box">
                  <i class="${meta.icon}"></i>
                </div>
                <div class="menu-category-info">
                  <div class="menu-category-eyebrow"><i class="fa-solid fa-sparkles"></i> ${meta.eyebrow}</div>
                  <h3 class="menu-category-title">${meta.title}</h3>
                  <p class="menu-category-desc">${meta.tagline}</p>
                </div>
              </div>
              <div class="menu-category-header-meta">
                <span class="menu-category-badge"><i class="fa-solid fa-award"></i> ${meta.badge}</span>
                <span class="menu-category-count-pill">${catItems.length} Master Recipes</span>
              </div>
            </div>
            <div class="grid grid-3 menu-cards-grid">
              ${catItems.map(item => renderProductCard(item, favs.includes(item.id), cardIdx++)).join('')}
            </div>
          </section>
        `;
      });
      html += '</div>';
      container.innerHTML = html;
    }

    // Bind Category Filter Buttons
    document.querySelectorAll('.menu-filter-tabs .filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.menu-filter-tabs .filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeCategory = btn.dataset.category || 'All';
        filterAndRender();
      });
    });

    // Bind Search input
    const searchInput = document.querySelector('.menu-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', e => {
        searchQuery = e.target.value;
        filterAndRender();
      });
    }

    // Bind Sort select
    const sortSelect = document.querySelector('.menu-sort-select');
    if (sortSelect) {
      sortSelect.addEventListener('change', e => {
        sortMode = e.target.value;
        filterAndRender();
      });
    }

    function updateFilterTabCounts() {
      document.querySelectorAll('.menu-filter-tabs .filter-btn').forEach(btn => {
        const cat = btn.dataset.category || 'All';
        const countSpan = btn.querySelector('.tab-count');
        if (countSpan) {
          if (cat.toLowerCase() === 'all') {
            countSpan.textContent = MENU_ITEMS.length;
          } else {
            const count = MENU_ITEMS.filter(i => i.category.toLowerCase() === cat.toLowerCase()).length;
            countSpan.textContent = count;
          }
        }
      });
    }

    // Dynamic sync of tab counts on init
    updateFilterTabCounts();

    // Initial render
    filterAndRender();
  }

  function syncAllCardButtons() {
    document.querySelectorAll('.chai-footer-action-row[data-product-id]').forEach(row => {
      const id = row.dataset.productId;
      const product = MENU_ITEMS.find(p => p.id === id);
      const name = product ? product.name : '';
      row.innerHTML = renderCardActionButton(id, name);
    });

    document.querySelectorAll('.bestseller-action-wrap[data-product-id]').forEach(wrap => {
      const id = wrap.dataset.productId;
      const product = MENU_ITEMS.find(p => p.id === id);
      const name = product ? product.name : '';
      wrap.innerHTML = renderCardActionButton(id, name);
    });
  }

  // Expose to window
  window.chaiMenu = {
    items: MENU_ITEMS,
    initMenuGrid,
    openProductQuickView,
    renderProductCard,
    renderCardActionButton,
    syncAllCardButtons
  };

  // Global event delegation for all product card interactions anywhere on the site
  document.addEventListener('click', e => {
    // Add to cart delegation (morphs into interactive stepper)
    const addBtn = e.target.closest('.add-cart-btn');
    if (addBtn) {
      e.preventDefault();
      const id = addBtn.dataset.id;
      const product = MENU_ITEMS.find(p => p.id === id);
      if (product && window.chaiCart) {
        window.chaiCart.addToCart({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          category: product.category,
          quantity: 1
        }, false);

        syncAllCardButtons();
      }
      return;
    }

    // Stepper plus button
    const plusBtn = e.target.closest('.stepper-plus');
    if (plusBtn) {
      e.preventDefault();
      const id = plusBtn.dataset.id;
      const product = MENU_ITEMS.find(p => p.id === id);
      if (product && window.chaiCart) {
        window.chaiCart.addToCart({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          category: product.category,
          quantity: 1
        }, false);

        syncAllCardButtons();
      }
      return;
    }

    // Stepper minus button
    const minusBtn = e.target.closest('.stepper-minus');
    if (minusBtn) {
      e.preventDefault();
      const id = minusBtn.dataset.id;
      if (window.chaiCart) {
        window.chaiCart.updateQuantity(id, -1);
        syncAllCardButtons();
      }
      return;
    }

    // Quick view delegation
    const qvBtn = e.target.closest('.quick-view-btn');
    if (qvBtn) {
      e.preventDefault();
      openProductQuickView(qvBtn.dataset.id);
      return;
    }

    // Favorite toggle delegation
    const favBtn = e.target.closest('.chai-card-fav');
    if (favBtn) {
      e.preventDefault();
      const id = favBtn.dataset.id;
      const isNowFav = toggleFavorite(id);
      favBtn.classList.toggle('active', isNowFav);
      const icon = favBtn.querySelector('i');
      if (icon) {
        icon.className = isNowFav ? 'fa-solid fa-heart' : 'fa-regular fa-heart';
      }
      const prod = MENU_ITEMS.find(p => p.id === id);
      if (window.showToast && prod) {
        window.showToast(isNowFav ? `❤️ Added ${prod.name} to favorites` : `Removed ${prod.name} from favorites`, 'info');
      }
      return;
    }
  });

  // Listen to external cart updates (e.g. from drawer, checkout, modal)
  window.addEventListener('chaiCart:updated', syncAllCardButtons);

  function initPage() {
    // If on menu page with grid
    if (document.querySelector('#full-menu-grid')) {
      initMenuGrid('#full-menu-grid', 'All');
    }
    // If on homepage preview
    if (document.querySelector('#home-menu-grid')) {
      initMenuGrid('#home-menu-grid', 'All', 6);
    }
    syncAllCardButtons();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPage);
  } else {
    initPage();
  }
})();
