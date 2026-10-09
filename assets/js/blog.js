/**
 * CHAI & CO. — Blog & Stories Module (blog.js)
 * Filtering, Search, Pagination, Dynamic Multi-Article Loader
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
      authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
      authorBio: 'Aarav is the founder and tea sommelier of Chai & Co. He spent over a decade traveling tea estates in Assam, Darjeeling, and Sri Lanka studying indigenous spice botany.',
      date: 'Aug 24, 2026',
      readTime: '6 min read',
      image: 'assets/images/authentic-masala-chai-brewing.jpg',
      heroBg: 'assets/images/banner-blog.jpg',
      excerpt: 'Uncover the centuries-old balance between crushed cardamom, piquant ginger, and slow-simmered Assam orthodox leaf tea.',
      featured: true,
      tags: ['#MasalaChai', '#IndianTraditions', '#BrewingGuide', '#AssamTea', '#ChaiAndCo'],
      contentHtml: `
        <p>
          In every corner of India, from early morning platform vendors in old Delhi to sleepy hill-station stops in Munnar, the day begins with the melodic clang of a brass ladle striking the side of a pot. Masala chai is not merely a morning beverage; it is a shared cultural ritual, a comforting antidote to winter chills, and an aromatic expression of love.
        </p>
        <p>
          Yet in Western coffee chains and modern supermarkets, chai has frequently been degraded into sticky sugary syrups, cloying concentrates, or synthetic powders devoid of genuine spice character. Today, we open the notebook of Chai & Co. to reveal the authentic, time-honored principles of true Indian chai.
        </p>
        <blockquote>
          "Real chai cannot be rushed with a teabag in a paper cup. It requires fire, the bruising of whole pods, and the patience of a rolling boil."
        </blockquote>
        <h2>1. The Foundation: Whole Orthodox & CTC Tea</h2>
        <p>
          The most common mistake when making masala chai is using delicate green tea or light English Breakfast bags. True chai requires high-grown Assam CTC (Crush, Tear, Curl) black tea leaves. The granular CTC structure yields a bold, astringent, deep reddish-brown infusion that can withstand generous amounts of whole milk without tasting diluted.
        </p>
        <h2>2. The Sacred Spice Ratios (Per 2 Cups)</h2>
        <p>
          At Chai & Co., our kitchen adheres to an exact ratio to achieve balance—where no single spice overwhelms the tea itself:
        </p>
        <ul style="margin-bottom:24px;display:flex;flex-direction:column;gap:10px;">
          <li><strong>4 Green Cardamom Pods:</strong> Lightly cracked in a stone mortar until the dark seeds peek out.</li>
          <li><strong>1 Inch Fresh Ginger Root:</strong> Coarsely pounded with the skin on to extract fiery juice.</li>
          <li><strong>1 Small Stick Ceylon Cinnamon:</strong> Broken into small slivers for woody sweetness.</li>
          <li><strong>2 Sun-Dried Cloves:</strong> For deep, warming, clove-oil aromatics.</li>
          <li><strong>3 Tellicherry Black Peppercorns:</strong> To provide a subtle back-of-the-throat tingle.</li>
        </ul>
        <div style="background:var(--bg-surface-soft);border:1px solid var(--border);border-radius:var(--radius-md);padding:24px;margin:32px 0;">
          <h4 style="margin-bottom:10px;"><i class="fa-solid fa-fire-burner" style="color:var(--primary);margin-right:8px;"></i> Step-by-Step Brewing Masterclass</h4>
          <ol style="margin-left:20px;display:flex;flex-direction:column;gap:10px;font-size:0.95rem;">
            <li><strong>The Water Extraction:</strong> Bring 1 cup of filtered cold water to a rolling boil with your crushed spices and ginger. Let it bubble vigorously for 3 minutes until the water turns pale gold and fragrant.</li>
            <li><strong>Add the Tea:</strong> Add 2 generous teaspoons of Assam CTC black tea. Lower heat to medium and simmer for 2 minutes. The liquid will turn a deep mahogany.</li>
            <li><strong>The Milk Simmer:</strong> Pour in 1 cup of creamy whole milk (or oat milk). Increase the flame until the chai rises to the lip of the pot, then lower the heat. Repeat this "double rise" three times to emulsify the dairy fat.</li>
            <li><strong>Sweeten & Aerate:</strong> Stir in raw unrefined cane sugar or crushed jaggery. Strain through a fine brass sieve from a height of 12 inches to froth the tea naturally before serving into earthenware kulhads.</li>
          </ol>
        </div>
      `
    },
    {
      id: 'post-02',
      title: 'Journey to the Clouds: Sourcing Spring Flush in Darjeeling',
      slug: 'sourcing-spring-flush-darjeeling',
      category: 'Sourcing',
      author: 'Priya Sen',
      authorRole: 'Head of Responsible Sourcing',
      authorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=120&q=80',
      authorBio: 'Priya has spent 12 years walking Himalayan slopes, managing fair-trade partnerships with 45+ single-estate organic gardens across Darjeeling and Assam.',
      date: 'Aug 18, 2026',
      readTime: '8 min read',
      image: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?auto=format&fit=crop&w=800&q=80',
      heroBg: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?auto=format&fit=crop&w=1600&q=80',
      excerpt: 'Step into the misty high-altitude tea gardens of the Eastern Himalayas where every leaf is hand-plucked at daybreak.',
      featured: false,
      tags: ['#Darjeeling', '#SpringFlush', '#EthicalSourcing', '#HimalayanTea', '#SingleEstate'],
      contentHtml: `
        <p>
          High in the Eastern Himalayas, shrouded in perpetual alpine mist at 6,500 feet elevation, lies the fabled mountain district of Darjeeling. Revered by sommeliers worldwide as the "Champagne of Teas," this dramatic terroir of steep hillsides, volcanic loam, and snow-fed mountain streams creates an environment found nowhere else on earth.
        </p>
        <p>
          Every spring, as the Himalayan snows recede and the first warm rays of March sun strike the slopes of Kanchenjunga, ancient tea bushes awaken from three months of winter dormancy. The new spring shoots that burst forth are small, velvety, and intensely concentrated in natural polyphenols.
        </p>
        <blockquote>
          "A true first-flush leaf captures the exact morning dew of the Kanchenjunga sunrise. Once steeped, its pale amber liquor sings of muscatel grapes, wild orchids, and green almonds."
        </blockquote>
        <h2>1. The Precision of Daybreak Hand-Harvesting</h2>
        <p>
          Unlike industrial mass-market harvests, authentic Darjeeling tea cannot be harvested by machines. Between 5:30 AM and 10:00 AM, skilled plucking masters ascend the terraces to hand-harvest only the finest "two leaves and a bud." By midday, rising sun heats the leaves and initiates premature oxidation, so the day's harvest must be rushed immediately to the micro-batch withering lofts.
        </p>
        <h2>2. Ethical Partnerships with 45 Mountain Estates</h2>
        <p>
          At Chai & Co., responsible sourcing is not a marketing buzzword—it is the bedrock of our company. We bypass commodity auction houses to work directly with organic, biodynamic smallholder cooperatives across the Kurseong, Mirik, and Rungbong valleys:
        </p>
        <ul style="margin-bottom:24px;display:flex;flex-direction:column;gap:10px;">
          <li><strong>100% Certified Organic & Regenerative:</strong> Cultivated without synthetic pesticides, protecting Himalayan watersheds and native bird habitats.</li>
          <li><strong>35% Above Fair Trade Living Wages:</strong> Directly funding year-round healthcare dispensaries and secondary education for plucking communities.</li>
          <li><strong>Zero Middlemen Traceability:</strong> Every lot we serve can be traced back to its specific elevation, pluck date, and estate garden parcel.</li>
        </ul>
        <div style="background:var(--bg-surface-soft);border:1px solid var(--border);border-radius:var(--radius-md);padding:24px;margin:32px 0;">
          <h4 style="margin-bottom:10px;"><i class="fa-solid fa-leaf" style="color:var(--primary);margin-right:8px;"></i> How to Brew Delicate First Flush Darjeeling</h4>
          <ol style="margin-left:20px;display:flex;flex-direction:column;gap:10px;font-size:0.95rem;">
            <li><strong>Gentle Water Temperature:</strong> Heat freshly drawn water to exactly 85°C (185°F). Never use boiling water, as scorching water destroys delicate floral aromatics.</li>
            <li><strong>Leaf Measurement:</strong> Use 2.5 grams of whole orthodox leaves per 200ml of filtered mountain spring water.</li>
            <li><strong>Gentle Steeping:</strong> Cover and steep for exactly 3 minutes. The leaves will slowly unfurl from tight silver quills into tender emerald sheets.</li>
            <li><strong>Pure Enjoyment:</strong> Never add milk or sugar. Sip slowly from a fine ceramic or glass cup to experience the luminous lingering notes of honey and crisp stone fruit.</li>
          </ol>
        </div>
      `
    },
    {
      id: 'post-03',
      title: 'Why Kashmiri Kahwa Is the Ultimate Himalayan Elixir',
      slug: 'why-kashmiri-kahwa-himalayan-elixir',
      category: 'Tea Culture',
      author: 'Mirza Baig',
      authorRole: 'Kashmiri Tea Curator',
      authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
      authorBio: 'Born in Srinagar, Mirza preserves the royal centuries-old Kahwa traditions and brass samovar rituals passed down through four generations of tea masters.',
      date: 'Aug 12, 2026',
      readTime: '5 min read',
      image: 'https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?auto=format&fit=crop&w=800&q=80',
      heroBg: 'https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?auto=format&fit=crop&w=1600&q=80',
      excerpt: 'Saffron threads, slivered almonds, and royal green tea: the timeless tradition of the Kashmiri samovar.',
      featured: false,
      tags: ['#KashmiriKahwa', '#SaffronChai', '#HimalayanTraditions', '#SamovarBrewing', '#HerbalWellness'],
      contentHtml: `
        <p>
          In the snow-blanketed valleys of Srinagar and Pahalgam, when temperatures plummet below freezing and winter winds whistle down from the Pir Panjal mountains, hospitality is measured by the glowing embers of a hand-carved copper samovar.
        </p>
        <p>
          Kahwa is Kashmir's crowning culinary jewel: a fragrant, sun-golden infusion of unfermented green tea leaves, royal Pampore saffron, cracked cardamom pods, and slivered blanched almonds. Unlike heavy milky masala chai, Kahwa is light, ethereal, and invigoratingly restorative.
        </p>
        <blockquote>
          "Kahwa is not simply a beverage; it is an ancient antidote to winter melancholy. The fragrance of warm saffron and crushed nuts brings spring sunshine into the cold valley."
        </blockquote>
        <h2>1. The Miracle of Pampore Saffron</h2>
        <p>
          The beating heart of true Kahwa is <em>Zafran</em> (saffron) harvested from the purple Crocus sativus blossoms of Pampore plateau. Recognized for centuries as the world's most potent saffron, its deep crimson stigmas yield crocin and safranal—compounds clinically studied for mood enhancement, cardiovascular support, and internal warmth.
        </p>
        <h2>2. The Living Tradition of the Copper Samovar</h2>
        <p>
          A traditional Kashmiri samovar is an engineering marvel: a central chimney filled with burning wood coals heats an outer water chamber, maintaining a gentle rolling simmer for hours without ever scorching the delicate green tea leaves.
        </p>
        <div style="background:var(--bg-surface-soft);border:1px solid var(--border);border-radius:var(--radius-md);padding:24px;margin:32px 0;">
          <h4 style="margin-bottom:10px;"><i class="fa-solid fa-crown" style="color:var(--primary);margin-right:8px;"></i> Crafting Authentic Kashmiri Kahwa at Home</h4>
          <ol style="margin-left:20px;display:flex;flex-direction:column;gap:10px;font-size:0.95rem;">
            <li><strong>The Aromatic Decoction:</strong> In a stainless steel or copper pot, bring 2 cups of water to a simmer with 2 crushed green cardamom pods, 1 small piece of cinnamon, and a dried rose petal. Simmer gently for 4 minutes.</li>
            <li><strong>Bloom the Saffron:</strong> In a small bowl, steep 5-6 crimson saffron threads in 2 tablespoons of warm water until it turns radiant golden yellow.</li>
            <li><strong>The Green Tea Steep:</strong> Turn off the heat. Add 1 teaspoon of Kashmiri orthodox green tea leaves. Cover with a lid and let steep off the flame for 2.5 minutes.</li>
            <li><strong>The Almond Finish:</strong> Place a tablespoon of finely slivered blanched almonds into two glass cups. Strain the hot aromatic tea over the almonds, stir in the bloomed saffron water, and sweeten with wild acacia honey.</li>
          </ol>
        </div>
      `
    },
    {
      id: 'post-04',
      title: 'Spices as Medicine: The Ancient Ayurvedic Wisdom in Your Teacup',
      slug: 'ayurvedic-wisdom-in-your-teacup',
      category: 'Health',
      author: 'Dr. Sunita Patel',
      authorRole: 'Ayurvedic Wellness Consultant',
      authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80',
      authorBio: 'Dr. Sunita Patel is an Ayurvedic physician and botanical researcher specializing in adaptogenic spices, digestive dosha balances, and holistic botanical teas.',
      date: 'Jul 28, 2026',
      readTime: '7 min read',
      image: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=800&q=80',
      heroBg: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=1600&q=80',
      excerpt: 'From turmeric curcumin to gingerols, how a daily cup of spiced tea fortifies gut health and immune vitality.',
      featured: false,
      tags: ['#Ayurveda', '#GutHealth', '#HealingSpices', '#TurmericAndGinger', '#HolisticLiving'],
      contentHtml: `
        <p>
          Long before tea leaves were combined with milk and sugar to create modern cafe chai, ancient Ayurvedic vaidyas in Kerala and Varanasi prepared spiced herbal decoctions known as <em>kwatha</em>. In classical Ayurvedic texts like the Charaka Samhita, whole spices were viewed not merely as culinary flavorings, but as potent, bio-active botanical remedies.
        </p>
        <p>
          Every warming cup of authentic spiced tea is a balanced symphony of nature's most revered medicinal plants, designed to awaken <em>Agni</em> (the digestive fire), clear <em>Ama</em> (metabolic toxicity), and bring equilibrium to the three doshas: Vata, Pitta, and Kapha.
        </p>
        <blockquote>
          "When diet and spices are correct, medicine is of no need. When diet and spices are incorrect, medicine is of no use."
        </blockquote>
        <h2>1. The Five Pharmacological Spice Pillars</h2>
        <p>
          Each spice in the Chai & Co. signature masala performs a distinct biological and metabolic role:
        </p>
        <ul style="margin-bottom:24px;display:flex;flex-direction:column;gap:10px;">
          <li><strong>Zingiber Officinale (Fresh Ginger):</strong> Packed with gingerols and shogaols, ginger accelerates gastric motility, clears sinus congestion, and provides powerful anti-inflammatory benefits.</li>
          <li><strong>Elettaria Cardamomum (Green Cardamom):</strong> Known as the 'Queen of Spices', its volatile cineole oils neutralize excess stomach acidity and calm erratic nervous energy.</li>
          <li><strong>Cinnamomum Verum (Ceylon Cinnamon):</strong> Naturally supports healthy glycemic regulation, curbing insulin spikes and promoting steady, sustained mental clarity.</li>
          <li><strong>Syzygium Aromaticum (Sun-Dried Cloves):</strong> Containing up to 85% eugenol, cloves act as a powerful antimicrobial shield for oral and respiratory wellness.</li>
          <li><strong>Piper Nigrum (Tellicherry Black Pepper):</strong> Piperine increases the intestinal bioavailability of companion herbs and spices by up to 2,000%, ensuring full nutrient uptake.</li>
        </ul>
        <h2>2. Tailoring Your Spices by Season</h2>
        <p>
          In ancient Ayurvedic tradition, tea formulation changes with the turning of the seasons. In damp winter months (<em>Hemanta</em>), we elevate dry roasted black pepper and crushed ginger to disperse cold Kapha buildup. During summer heat (<em>Grishma</em>), we dial back pungent cloves and accentuate sweet fennel seeds and fragrant green cardamom to soothe internal Pitta heat.
        </p>
        <div style="background:var(--bg-surface-soft);border:1px solid var(--border);border-radius:var(--radius-md);padding:24px;margin:32px 0;">
          <h4 style="margin-bottom:10px;"><i class="fa-solid fa-heart-pulse" style="color:var(--primary);margin-right:8px;"></i> The Daily Immunity Agni Tonic</h4>
          <ol style="margin-left:20px;display:flex;flex-direction:column;gap:10px;font-size:0.95rem;">
            <li><strong>Bruise Fresh Roots:</strong> Coarsely crush a thumb-sized piece of fresh ginger and half an inch of fresh raw turmeric root in a mortar.</li>
            <li><strong>Extract the Bioactives:</strong> Simmer in 2 cups of filtered water with 1 cinnamon quill and 3 cracked Tellicherry peppercorns for 6 minutes.</li>
            <li><strong>Holy Basil Infusion:</strong> Drop in 4-5 fresh Rama Tulsi leaves right as you pull the pot from the heat.</li>
            <li><strong>Enzyme-Safe Sweetener:</strong> Allow the decoction to cool slightly to drinking temperature before stirring in raw unprocessed honey, preserving vital live enzymes.</li>
          </ol>
        </div>
      `
    },
    {
      id: 'post-05',
      title: 'The Irani Café Culture: Bun Maska, Cutting Chai & Nostalgia',
      slug: 'irani-cafe-culture-bun-maska',
      category: 'Café Stories',
      author: 'Kabir Mehta',
      authorRole: 'Culinary Historian',
      authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
      authorBio: 'Kabir Mehta chronicles heritage foodways, vintage Bombay culture, and communal chai rituals across Western India.',
      date: 'Jul 15, 2026',
      readTime: '5 min read',
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
      heroBg: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1600&q=80',
      excerpt: 'How historic vintage chai stalls in Mumbai shaped modern communal gathering spaces over buttery buns.',
      featured: false,
      tags: ['#IraniCafe', '#BunMaska', '#CuttingChai', '#BombayHeritage', '#CafeCulture'],
      contentHtml: `
        <p>
          Push open the squeaking wooden doors of a vintage Mumbai Irani café, and the modern city's frenetic honking abruptly fades into the gentle hum of ceiling fans spinning lazily beneath high Victorian rafters. Here, under sepia mirrors and checkered tablecloths, generations of poets, merchants, taxi drivers, and college students have gathered across the century.
        </p>
        <p>
          Established by Zoroastrian Persian immigrants who settled in Bombay and Pune in the late 19th and early 20th centuries, these legendary cafes birthed a distinct urban culinary institution centered around two simple pleasures: cutting chai and bun maska.
        </p>
        <blockquote>
          "An Irani café is the ultimate democratic space. Here, the billionaire and the daily wager sit on identical bentwood chairs, dunking buttered buns into scalding chai."
        </blockquote>
        <h2>1. The Philosophy of the 'Cutting' Chai</h2>
        <p>
          Why order a "cutting"? In Mumbai street lexicon, a cutting is half a glass of chai—literally 'cut' into two portions. Concentrated, intensely spiced, slow-simmered with rich full-cream milk, and sweetened with caramelized cane sugar, a cutting delivers maximum warmth and energy without letting the tea grow cool before the final sip.
        </p>
        <h2>2. Bun Maska: The Art of the Sacred Dunk</h2>
        <p>
          The ritual companion to cutting chai is Bun Maska: an airy, slightly sweet yeast bun sliced horizontally and slathered with an unsparing slab of salted Amul butter. To eat it correctly is an art form: tear off a golden pillow of bread, dip it three-quarters into the piping hot chai for precisely two seconds, and eat before the melted butter drips.
        </p>
        <div style="background:var(--bg-surface-soft);border:1px solid var(--border);border-radius:var(--radius-md);padding:24px;margin:32px 0;">
          <h4 style="margin-bottom:10px;"><i class="fa-solid fa-mug-hot" style="color:var(--primary);margin-right:8px;"></i> Recreating the Vintage Café Cutting at Home</h4>
          <ol style="margin-left:20px;display:flex;flex-direction:column;gap:10px;font-size:0.95rem;">
            <li><strong>The Intense Tea Base:</strong> Use high-grade strong CTC dust tea. Boil 1 cup of water with 2 teaspoons of tea and 2 crushed green cardamom pods for 3 minutes until dark and robust.</li>
            <li><strong>The Caramel Reduction:</strong> Pour in 1 cup of evaporated or full-fat whole buffalo milk. Add 2 teaspoons of raw cane sugar.</li>
            <li><strong>The Aeration Cascade:</strong> Simmer vigorously on low-medium flame for 5 minutes until the tea reduces by 20% and achieves a deep caramel hue.</li>
            <li><strong>The Classic Glass Pour:</strong> Strain into vintage fluted chai tumblers from a foot above the glass to generate a rich, creamy foam crown.</li>
          </ol>
        </div>
      `
    },
    {
      id: 'post-06',
      title: 'Cold Brewed Chai: Modern Twist to Traditional Spices',
      slug: 'cold-brewed-chai-modern-twist',
      category: 'Chai',
      author: 'Ananya Roy',
      authorRole: 'Beverage Innovation Lead',
      authorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80',
      authorBio: 'Ananya heads beverage innovation at Chai & Co., developing refreshing cold infusions and modern artisan drinks rooted in pure spices.',
      date: 'Jul 04, 2026',
      readTime: '4 min read',
      image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=800&q=80',
      heroBg: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=1600&q=80',
      excerpt: 'Slow overnight cold extraction brings out sweet fruit notes without bitterness. Here is our signature recipe.',
      featured: false,
      tags: ['#ColdBrewChai', '#SummerRefreshment', '#ModernChai', '#CraftBeverages', '#SlowBrewing'],
      contentHtml: `
        <p>
          For generations, chai purists believed that authentic spiced tea could only be born over roaring gas flames and bubbling brass pots. But as summer temperatures rise and contemporary craft beverage movements evolve, an exciting revolution has taken hold: the art of artisan cold brewed chai.
        </p>
        <p>
          Cold water extraction completely transforms the chemical profile of both the tea leaf and the accompanying botanical spices. By replacing intense heat with 12 to 16 hours of slow, patient refrigerator steeping, you extract aromatic essential oils without releasing bitter catechins or harsh tannins.
        </p>
        <blockquote>
          "Cold brewing extracts the sweet, delicate soul of the Assam tea leaf and whole spices, creating a naturally sweet, velvety elixir with zero bitterness."
        </blockquote>
        <h2>1. The Chemistry of Cold Extraction</h2>
        <p>
          When tea leaves are boiled, heat rapidly releases tannic acid—the compound responsible for astringency and bitterness. Cold water, by contrast, selectively dissolves sweet amino acids (theanine) and volatile aromatics. The resulting infusion is naturally sweet, full-bodied, and extraordinarily smooth on the palate.
        </p>
        <h2>2. Whole Spices vs. Ground Powders</h2>
        <p>
          The golden rule of cold brew chai is never using pre-ground spice powders, which create a murky, muddy suspension. Instead, we use whole crushed spices: cracked green cardamom pods, cracked star anise, cinnamon quills, and thin translucent coins of fresh ginger root.
        </p>
        <div style="background:var(--bg-surface-soft);border:1px solid var(--border);border-radius:var(--radius-md);padding:24px;margin:32px 0;">
          <h4 style="margin-bottom:10px;"><i class="fa-solid fa-snowflake" style="color:var(--primary);margin-right:8px;"></i> The 12-Hour Master Artisan Cold Brew Chai</h4>
          <ol style="margin-left:20px;display:flex;flex-direction:column;gap:10px;font-size:0.95rem;">
            <li><strong>The Blend Ratio:</strong> In a 1-liter glass carafe or French press, combine 4 tablespoons of loose orthodox Assam leaf tea, 4 cracked cardamom pods, 1 star anise, 1 small cinnamon quill, and 3 coins of fresh ginger.</li>
            <li><strong>The Slow Steep:</strong> Fill with 1 liter of cold filtered water. Cover tightly and refrigerate for 12 to 14 hours.</li>
            <li><strong>The Clean Filtration:</strong> Press the French press plunger down or pour through a fine stainless-steel coffee filter into a clean glass pitcher.</li>
            <li><strong>Serving Ritual:</strong> Pour over clear crystal ice cubes. Top with a splash of chilled barista oat milk, or serve sparkling with tonic water and a twist of fresh orange peel for a sophisticated non-alcoholic aperitif.</li>
          </ol>
        </div>
      `
    }
  ];

  function getArticleByIdOrSlug(key) {
    if (!key) return BLOG_ARTICLES[0];
    const search = key.trim().toLowerCase();
    return BLOG_ARTICLES.find(a => 
      a.id.toLowerCase() === search || 
      a.slug.toLowerCase() === search
    ) || BLOG_ARTICLES[0];
  }

  function renderBlogCard(post) {
    return `
      <article class="blog-card revealed" data-category="${post.category}">
        <a href="blog-details.html?id=${post.id}" class="blog-card-img" aria-label="Read ${post.title}">
          <img src="${post.image}" alt="${post.title}" loading="lazy" onerror="this.src='assets/images/authentic-masala-chai-brewing.jpg'">
        </a>
        <div class="blog-card-body">
          <div class="blog-meta">
            <span class="blog-category-tag">${post.category}</span>
            <span>•</span>
            <span>${post.date}</span>
            <span>•</span>
            <span>${post.readTime}</span>
          </div>
          <h3 class="blog-title"><a href="blog-details.html?id=${post.id}">${post.title}</a></h3>
          <p class="blog-excerpt">${post.excerpt}</p>
          <a href="blog-details.html?id=${post.id}" class="blog-read-more" aria-label="Read full article: ${post.title}">
            Read Full Story <i class="fa-solid fa-arrow-right"></i>
          </a>
        </div>
      </article>
    `;
  }

  function initBlogGrid() {
    const grid = document.getElementById('blog-posts-grid');
    if (!grid) return;

    const urlParams = new URLSearchParams(window.location.search);
    let activeCategory = urlParams.get('category') || 'All';
    let searchQuery = urlParams.get('q') || '';
    let currentPage = 1;
    const itemsPerPage = 3;

    // Synchronize UI search input if present in URL
    const searchInput = document.getElementById('blog-search-input');
    if (searchInput && searchQuery) {
      searchInput.value = searchQuery;
    }

    // Synchronize active category button if present in URL
    if (activeCategory !== 'All') {
      const catBtns = document.querySelectorAll('.blog-filter-tabs .filter-btn');
      let matched = false;
      catBtns.forEach(btn => {
        if ((btn.dataset.category || '').toLowerCase() === activeCategory.toLowerCase()) {
          catBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          matched = true;
        }
      });
      if (!matched) activeCategory = 'All';
    }

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
          buttonsHtml += `<button type="button" class="blog-page-btn ${i === currentPage ? 'active' : ''}" data-page="${i}" aria-label="Page ${i}">${i}</button>`;
        }
        pageNumbersContainer.innerHTML = buttonsHtml;

        pageNumbersContainer.querySelectorAll('.blog-page-btn').forEach(btn => {
          btn.addEventListener('click', () => {
            currentPage = parseInt(btn.dataset.page, 10);
            filterAndRender();
            grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
          });
        });
      }

      if (prevBtn) {
        prevBtn.disabled = currentPage === 1;
        prevBtn.setAttribute('aria-disabled', currentPage === 1);
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
        nextBtn.setAttribute('aria-disabled', currentPage === totalPages);
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
    if (searchInput) {
      searchInput.addEventListener('input', e => {
        searchQuery = e.target.value;
        currentPage = 1;
        filterAndRender();
      });
    }

    filterAndRender();
  }

  function initArticleDetails() {
    const articleContentContainer = document.querySelector('.blog-article-content');
    if (!articleContentContainer) return;

    const urlParams = new URLSearchParams(window.location.search);
    const key = urlParams.get('id') || urlParams.get('slug') || (window.location.hash ? window.location.hash.replace('#', '') : '') || 'post-01';
    const article = getArticleByIdOrSlug(key);

    // 1. Page Title
    document.title = `${article.title} | CHAI & CO.`;

    // 2. Hero Background & Tagline
    const heroSection = document.getElementById('article-page-hero') || document.querySelector('.page-hero-blog');
    if (heroSection) {
      heroSection.style.setProperty('--hero-bg', `url('${article.heroBg || article.image}')`);
    }

    const heroTagline = document.getElementById('article-hero-tagline');
    if (heroTagline) {
      heroTagline.innerHTML = `<i class="fa-solid fa-book-open"></i> ${article.category}`;
    }

    // 3. Hero Title
    const heroTitle = document.getElementById('article-hero-title');
    if (heroTitle) {
      heroTitle.textContent = article.title;
    }

    // 4. Breadcrumb Title
    const breadcrumbTitle = document.getElementById('article-breadcrumb-title');
    if (breadcrumbTitle) {
      breadcrumbTitle.textContent = article.title;
    }

    // 5. Author Header Info
    const authorAvatar = document.getElementById('article-author-avatar');
    if (authorAvatar) {
      authorAvatar.src = article.authorAvatar;
      authorAvatar.alt = article.author;
    }

    const authorName = document.getElementById('article-author-name');
    if (authorName) {
      authorName.textContent = article.author;
    }

    const metaInfo = document.getElementById('article-meta-info');
    if (metaInfo) {
      metaInfo.textContent = `${article.authorRole} • ${article.date} • ${article.readTime}`;
    }

    // 6. Featured Image
    const featuredImg = document.getElementById('article-featured-img');
    if (featuredImg) {
      featuredImg.src = article.image;
      featuredImg.alt = article.title;
    }

    // 7. Body Content
    const bodyContent = document.getElementById('article-body-content');
    if (bodyContent && article.contentHtml) {
      bodyContent.innerHTML = article.contentHtml;
    }

    // 8. Tags
    const tagsContainer = document.getElementById('article-tags');
    if (tagsContainer && Array.isArray(article.tags)) {
      tagsContainer.innerHTML = article.tags.map(t => `<span class="tagline-label" style="margin:0;">${t}</span>`).join('');
    }

    // 9. Author Bio Card
    const bioAvatar = document.getElementById('article-bio-avatar');
    if (bioAvatar) {
      bioAvatar.src = article.authorAvatar;
      bioAvatar.alt = article.author;
    }

    const bioName = document.getElementById('article-bio-name');
    if (bioName) {
      bioName.textContent = `Written by ${article.author}`;
    }

    const bioDesc = document.getElementById('article-bio-desc');
    if (bioDesc) {
      bioDesc.textContent = article.authorBio;
    }

    // 10. Sidebar Recent Stories (Show other articles)
    const recentStoriesContainer = document.getElementById('article-recent-stories');
    if (recentStoriesContainer) {
      const otherArticles = BLOG_ARTICLES.filter(a => a.id !== article.id).slice(0, 3);
      recentStoriesContainer.innerHTML = otherArticles.map(a => `
        <div style="display:flex;gap:12px;align-items:center;">
          <img src="${a.image}" alt="${a.title}" style="width:60px;height:60px;border-radius:var(--radius-sm);object-fit:cover;" onerror="this.src='assets/images/authentic-masala-chai-brewing.jpg'">
          <div>
            <h5 style="font-size:0.85rem;line-height:1.3;margin-bottom:4px;">
              <a href="blog-details.html?id=${a.id}">${a.title}</a>
            </h5>
            <span class="text-muted" style="font-size:0.75rem;">${a.date}</span>
          </div>
        </div>
      `).join('');
    }

    // 11. Social Share Buttons
    const shareX = document.getElementById('article-share-x');
    if (shareX) {
      shareX.onclick = () => {
        const url = encodeURIComponent(window.location.href);
        const text = encodeURIComponent(`Reading "${article.title}" on CHAI & CO.:`);
        window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank', 'width=600,height=400');
      };
    }

    const shareFb = document.getElementById('article-share-fb');
    if (shareFb) {
      shareFb.onclick = () => {
        const url = encodeURIComponent(window.location.href);
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank', 'width=600,height=400');
      };
    }

    const shareWa = document.getElementById('article-share-wa');
    if (shareWa) {
      shareWa.onclick = () => {
        const text = encodeURIComponent(`Check out "${article.title}" from CHAI & CO.: ${window.location.href}`);
        window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
      };
    }

    // 12. Sidebar Search Handler
    const sidebarSearchInput = document.querySelector('.sidebar-widget .menu-search-input');
    if (sidebarSearchInput) {
      sidebarSearchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && sidebarSearchInput.value.trim()) {
          window.location.href = `blog.html?q=${encodeURIComponent(sidebarSearchInput.value.trim())}`;
        }
      });
    }
  }

  // Handle URL changes via back/forward
  window.addEventListener('popstate', () => {
    initArticleDetails();
  });

  window.chaiBlog = {
    articles: BLOG_ARTICLES,
    getArticleByIdOrSlug,
    initBlogGrid,
    initArticleDetails
  };

  document.addEventListener('DOMContentLoaded', () => {
    initBlogGrid();
    initArticleDetails();
  });
})();
