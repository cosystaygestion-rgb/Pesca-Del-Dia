export interface FishCatchItem {
  id: string;
  nameFr: string;
  nameAr: string;
  nameEn: string;
  origin: string;
  pricePerKg?: number;
  portionPrice?: number;
  texture: string;
  flavor: string;
  recommendedCook: ('plancha' | 'friture' | 'mqila' | 'paella')[];
  descriptionFr: string;
  descriptionEn: string;
  descriptionAr: string;
}

export interface MenuItem {
  id: string;
  nameFr: string;
  nameAr: string;
  nameEn: string;
  category: 'starters' | 'friture' | 'grilled' | 'casseroles' | 'desserts_drinks';
  priceMad: number;
  descriptionFr: string;
  descriptionEn: string;
  descriptionAr: string;
  signature?: boolean;
  complimentary?: boolean;
}

export interface ReviewItem {
  id: string;
  author: string;
  rating: number;
  date: string;
  source: 'Google Maps' | 'Avis Vérifié';
  contentFr: string;
  contentEn: string;
  contentAr: string;
  keyHighlight: string;
}

export const RESTAURANT_INFO = {
  name: 'Pesca Del Dia 2',
  nameArabic: 'صيد اليوم 2',
  descriptorFr: 'Restaurant de Poissons Frais & Fruits de Mer',
  descriptorEn: 'Fresh Seafood & Fish Market Restaurant',
  descriptorAr: 'مطعم الأسماك الطازجة وفواكه البحر',
  address: 'Avenue Oujda, Tanger 90060, Maroc',
  phone: '+212 5393-25212',
  phoneDisplay: '+212 539 32 52 12',
  phoneRaw: '+212539325212',
  whatsappUrl: 'https://wa.me/212539325212',
  googleMapsUrl: 'https://maps.app.goo.gl/etx6zTzaAgsLC8mr6',
  googleRating: 4.1,
  reviewCount: 676,
  coordinates: {
    lat: 35.7752668,
    lng: -5.7941674,
  },
  openingHoursFr: 'Tous les jours : 12h00 – 23h30',
  openingHoursEn: 'Every day: 12:00 PM – 11:30 PM',
  openingHoursAr: 'يومياً من 12:00 ظهراً حتى 11:30 مساءً',
  serviceStyle: 'Service continu midi & soir',
  payment: 'Espèces (MAD) · Cartes bancaires',
  taxiDirections: 'Tanger Centre-Ville, Avenue Oujda (près de la gare Tanger Ville et de la corniche)',
  taxiArabic: 'شارع وجدة، طنجة (قريب من المحطة والكورنيش)',
};

export const CATCH_OF_THE_DAY: FishCatchItem[] = [
  {
    id: 'loup-de-mer',
    nameFr: 'Loup de Mer (Bar Sauvage)',
    nameAr: 'سمك الدرعي (القاروص)',
    nameEn: 'Wild Sea Bass',
    origin: 'Détroit de Gibraltar & Baie de Tanger',
    portionPrice: 120,
    pricePerKg: 240,
    texture: 'Chair délicate, fondante et ferme',
    flavor: 'Iodée, fine et naturellement savoureuse',
    recommendedCook: ['plancha'],
    descriptionFr: 'Pêché au large de Tanger, grillé à la flamme avec un filet d\'huile d\'olive vierge, gros sel et herbes fraîches.',
    descriptionEn: 'Fished off the Tangier coast, flame-grilled on the plancha with extra virgin olive oil, sea salt, and fresh herbs.',
    descriptionAr: 'يُصطاد قبالة سواحل طنجة، يُشوى على البلانشا بزيت الزيتون البكر والملح الخشن والأعشاب.',
  },
  {
    id: 'dorade-royale',
    nameFr: 'Dorade Royale du Détroit',
    nameAr: 'الزريقة الملكية',
    nameEn: 'Royal Gilthead Seabream',
    origin: 'Eaux côtières de Tanger',
    portionPrice: 110,
    pricePerKg: 220,
    texture: 'Blanche, juteuse et nacrée',
    flavor: 'Subtilement douce, goût noble de la mer',
    recommendedCook: ['plancha'],
    descriptionFr: 'Une dorade royale préparée à la plancha ou cuite au gros sel, servie avec quartiers de citron et chermoula.',
    descriptionEn: 'Fresh seabream prepared on the plancha or roasted with sea salt, served with lemon wedges and chermoula.',
    descriptionAr: 'زريقة طازجة مشوية على البلانشا أو في الملح الخشن، تقدم مع شرائح الليمون والشرمولة الأصيلة.',
  },
  {
    id: 'sole-atlantique',
    nameFr: 'Sole de l\'Atlantique',
    nameAr: 'سمك موسى (الصول)',
    nameEn: 'Atlantic Dover Sole',
    origin: 'Pêche locale Atlantique Nord',
    portionPrice: 130,
    pricePerKg: 260,
    texture: 'Très tendre, fondante en bouche',
    flavor: 'Légère, raffinée, saveur beurrée',
    recommendedCook: ['plancha', 'friture'],
    descriptionFr: 'Poisson noble par excellence, cuit meunière dorée au beurre de ferme ou à la plancha croustillante.',
    descriptionEn: 'The king of delicate flatfish, pan-seared to a golden finish or grilled on the plancha.',
    descriptionAr: 'أرقى الأسماك البيضاء، مطبوخة بلمسة ذهبية مقرمشة وخفيفة.',
  },
  {
    id: 'lotte-fraiche',
    nameFr: 'Lotte Fraîche (Filete de Lotte)',
    nameAr: 'سمك الصنور / اللوت',
    nameEn: 'Fresh Monkfish',
    origin: 'Arrivage direct du port de pêche',
    portionPrice: 125,
    pricePerKg: 250,
    texture: 'Chair dense, sans arêtes, rappelant la langouste',
    flavor: 'Riche, délicieuse en sauce ou grillée',
    recommendedCook: ['mqila', 'plancha'],
    descriptionFr: 'Le fameux filet de lotte préparé en Mqila traditionnelle mijotée à la chermoula rouge et poivrons rôtis.',
    descriptionEn: 'The famous monkfish fillet braised in a sizzling clay Mqila with red chermoula and roasted sweet peppers.',
    descriptionAr: 'فيليه اللوت الشهير مطبوخ في مقيلة فخارية تقليدية بالشرمولة الحمراء والفلفل المشوي.',
  },
  {
    id: 'espadon-detroit',
    nameFr: 'Pavé d\'Espadon du Détroit',
    nameAr: 'سمك أبو سيف (الإسبادون)',
    nameEn: 'Strait Swordfish Steak',
    origin: 'Détroit de Gibraltar',
    portionPrice: 115,
    pricePerKg: 230,
    texture: 'Ferme, juteux et généreux',
    flavor: 'Goût prononcé, légèrement fumé au grill',
    recommendedCook: ['plancha'],
    descriptionFr: 'Tranche épaisse saisie à haute température, arrosée de citron frais et marinade tangéroise.',
    descriptionEn: 'Thick swordfish steak seared at high heat, drizzled with fresh lemon and Tangier herb marinade.',
    descriptionAr: 'شريحة سميكة من سمك أبو سيف مشوية على نار عالية مع عصير الليمون وتتبيلة طنجة.',
  },
  {
    id: 'calamars-frais',
    nameFr: 'Calamars de la Baie',
    nameAr: 'الكالمار الطازج',
    nameEn: 'Fresh Bay Calamari',
    origin: 'Baie de Tanger',
    portionPrice: 95,
    texture: 'Croustillant à l\'extérieur, fondant au cœur',
    flavor: 'Doux, parfumé d\'embruns marins',
    recommendedCook: ['friture', 'plancha'],
    descriptionFr: 'Enrobés d\'un voile de farine et frits à la perfection sans la moindre trace d\'huile résiduelle.',
    descriptionEn: 'Lightly dusted and flash-fried to golden, crisp perfection with zero greasiness.',
    descriptionAr: 'كالمار مقرمش ذهبي خفيف بدون أي زيوت زائدة، أو مشوي على البلانشا.',
  },
  {
    id: 'crevettes-royales',
    nameFr: 'Crevettes Royales & Gambas',
    nameAr: 'القيمرون الملكي (الجمبري)',
    nameEn: 'Royal King Prawns & Gambas',
    origin: 'Côtes tangéroises',
    portionPrice: 120,
    texture: 'Croquante et juteuse',
    flavor: 'Naturellement sucrée et iodée',
    recommendedCook: ['plancha', 'mqila', 'paella'],
    descriptionFr: 'Sautées entières à l\'ail frais et piment pil-pil ou flambées à la plancha au gros sel.',
    descriptionEn: 'Sautéed whole with fresh garlic and chili pil-pil style, or plancha-seared with coarse salt.',
    descriptionAr: 'جمبري كبير سوتيه بالثوم والفلفل الحار بيل-بيل أو مشوي مع الملح الخشن.',
  },
  {
    id: 'rouget-roche',
    nameFr: 'Rougets de Roche',
    nameAr: 'الميرلا والروجي (سمك السلطان إبراهيم)',
    nameEn: 'Red Mullet',
    origin: 'Fonds rocheux de Tanger',
    portionPrice: 85,
    texture: 'Chair fine, friable et savoureuse',
    flavor: 'Arôme profond de roche et de crustacés',
    recommendedCook: ['friture'],
    descriptionFr: 'Les petits rougets croustillants indispensables sur un véritable plateau de friture du Nord.',
    descriptionEn: 'Crispy red mullet, essential for an authentic Northern Moroccan mixed seafood platter.',
    descriptionAr: 'سمك الروجي الصخري المقرمش اللذيذ، أساس صينية الفريتور الشمالية.',
  },
];

export const FULL_MENU: MenuItem[] = [
  // 1. Entrées & Accueil
  {
    id: 'accueil-traditionnel',
    nameFr: 'L\'Accueil Tangérois (Pain chaud, Olives marinées & Chermoula)',
    nameAr: 'ضيافة طنجة (خبز ساخن، زيتون مشرمل وشرمولة الدار)',
    nameEn: 'Tangier Welcome Spread (Warm bread, marinated olives & house chermoula)',
    category: 'starters',
    priceMad: 0,
    complimentary: true,
    descriptionFr: 'Offert avec chaque repas : pain marocain tout chaud, olives locales marinées, chermoula fraîche parfumée et harissa douce.',
    descriptionEn: 'Complimentary with every meal: hot crusty bread, spiced olives, house-made chermoula dip, and fresh condiments.',
    descriptionAr: 'مقدم مجاناً مع كل طلبية: خبز مغربي ساخن، زيتون بلدي متبل، شرمولة طازجة وهريسة خفيفة.',
  },
  {
    id: 'crevettes-pil-pil',
    nameFr: 'Crevettes Sautées Pil-Pil à l\'Ail & Piment',
    nameAr: 'قيمرون بيل بيل بالثوم والحار وزيت الزيتون',
    nameEn: 'Pil-Pil Sizzling Prawns with Garlic & Chili',
    category: 'starters',
    priceMad: 75,
    signature: true,
    descriptionFr: 'Poêlon brûlant d\'huile d\'olive vierge, ail émincé, paprika doux, piment de Cayenne et coriandre fraîche.',
    descriptionEn: 'Sizzling skillet of virgin olive oil, crushed garlic, smoked paprika, chili, and fresh coriander.',
    descriptionAr: 'طاجين ساخن بزيت الزيتون البكر، ثوم طري، بابريكا، وفلفل حار وكزبرة طازجة.',
  },
  {
    id: 'pulpo-gallega',
    nameFr: 'Pulpo a la Gallega (Poulpe tendre & Pimentón)',
    nameAr: 'الأخطبوط بالطريقة الجاليكية (زيت الزيتون والبابريكا)',
    nameEn: 'Galician-Style Tender Octopus with Paprika',
    category: 'starters',
    priceMad: 80,
    signature: true,
    descriptionFr: 'Rondelles de poulpe fondantes sur lit de pommes de terre vapeur, arrosées d\'huile d\'olive et fleur de sel.',
    descriptionEn: 'Tender octopus slices over steamed potatoes, finished with Spanish pimentón and sea salt flakes.',
    descriptionAr: 'قطع أخطبوط طرية على بطاطس مسلوقة مع زيت الزيتون والبابريكا المدخنة والملح الصخري.',
  },
  {
    id: 'salade-marocaine-zaalouk',
    nameFr: 'Duo Salade Marocaine & Zaalouk d\'Aubergines',
    nameAr: 'دويتو سلطة مغربية وزعلوك بالباذنجان المشوي',
    nameEn: 'Moroccan Fresh Salad & Smoked Eggplant Zaalouk',
    category: 'starters',
    priceMad: 40,
    descriptionFr: 'Tomates mûres, concombres croquants, oignons doux et caviar d\'aubergines mijoté aux épices douces.',
    descriptionEn: 'Ripe vine tomatoes, crisp cucumber, sweet onion, and slow-simmered smoked eggplant puree.',
    descriptionAr: 'طماطم، خيار، بصل مفروم مع طبق زعلوك الباذنجان المتبل بالكمون والثوم.',
  },
  {
    id: 'soupe-poisson',
    nameFr: 'Soupe de Poissons du Détroit à la Tangéroise',
    nameAr: 'شوربة السمك على الطريقة الطنجاوية',
    nameEn: 'Tangier Strait Fishermen Seafood Soup',
    category: 'starters',
    priceMad: 45,
    descriptionFr: 'Bouillon riche et parfumé de poissons de roche et fruits de mer, servi avec croûtons et rouille.',
    descriptionEn: 'Rich, aromatic rockfish and shellfish broth seasoned with Mediterranean herbs.',
    descriptionAr: 'حساء غني بأسماك الصخور وفواكه البحر مع الأعشاب والخبز المقرمش.',
  },

  // 2. Fritures
  {
    id: 'friture-mixte-royale',
    nameFr: 'Friture Mixte Royale Pesca Del Dia',
    nameAr: 'فريتور ملكي مشكل بيسكا ديل ديا',
    nameEn: 'Pesca Del Dia Royal Mixed Fried Seafood Platter',
    category: 'friture',
    priceMad: 160,
    signature: true,
    descriptionFr: 'Le plat légendaire de la maison : calamars dorés, crevettes croustillantes, merlan de ligne et rougets, sans excès d\'huile.',
    descriptionEn: 'The house centerpiece: golden calamari, crispy prawns, line whiting, and red mullet, served feather-light.',
    descriptionAr: 'الطبق الأسطوري للمطعم: كالمار، قيمرون، ميرلان وروجي مقلي بخفة وذهبية تامة.',
  },
  {
    id: 'friture-calamars-seuls',
    nameFr: 'Friture de Calamars Frais de la Baie',
    nameAr: 'صحن كالمار طازج مقلي مقرمش',
    nameEn: 'Crispy Fresh Bay Calamari Rings',
    category: 'friture',
    priceMad: 95,
    descriptionFr: 'Anneaux de calamars ultra-frais enrobés de farine fine, frits à feu vif, accompagnés de citrons marinés.',
    descriptionEn: 'Fresh squid rings lightly floured and quick-fried, served with fresh lemons and herb dip.',
    descriptionAr: 'حلقات كالمار طازجة ومقرمشة مع شرائح الحامض الطازج.',
  },
  {
    id: 'friture-merlan-rouget',
    nameFr: 'Duo Friture Merlan & Rouget de Ligne',
    nameAr: 'فريتور ميرلا وروجي طازج',
    nameEn: 'Fried Whiting & Red Mullet Duo',
    category: 'friture',
    priceMad: 90,
    descriptionFr: 'Filets de merlan blanc et petits rougets croustillants savoureux, servis avec chermoula maison.',
    descriptionEn: 'Tender white whiting fillets and savory small red mullets with lemon and dipping sauce.',
    descriptionAr: 'سمك ميرلان أبيض وروجي مقرمش مع شرمولة الدار.',
  },

  // 3. Poissons Nobles Grillés
  {
    id: 'loup-bar-grille',
    nameFr: 'Loup de Mer Entier Grillé à la Plancha',
    nameAr: 'سمك الدرعي (القاروص) مشوي على البلانشا',
    nameEn: 'Whole Sea Bass Seared on the Plancha',
    category: 'grilled',
    priceMad: 120,
    signature: true,
    descriptionFr: 'Poisson entier ouvert en papillon, saisi à la plancha, arrosé d\'huile d\'olive extra vierge et jus de citron frais.',
    descriptionEn: 'Butterflied whole sea bass grilled on high heat with sea salt, olive oil, and fresh lemon juice.',
    descriptionAr: 'سمكة درعي كاملة مشوية على نار هادئة بالملح الخشن وزيت الزيتون والحامض.',
  },
  {
    id: 'dorade-grillee',
    nameFr: 'Dorade Royale Grillée aux Herbes Fraîches',
    nameAr: 'سمك الزريقة مشوي بالأعشاب الطبيعية',
    nameEn: 'Grilled Royal Seabream with Fresh Herbs',
    category: 'grilled',
    priceMad: 110,
    descriptionFr: 'Dorade fraîche saisie avec ail pilé, persil plat et citron confit, chair nacrée et peau croustillante.',
    descriptionEn: 'Fresh seabream with crushed garlic, flat parsley, and lemon, crisp skin and succulent white meat.',
    descriptionAr: 'زريقة مشوية طازجة بالثوم والليمون والأعشاب، جلد مقرمش ولحم أبيض ناعم.',
  },
  {
    id: 'sole-meuniere-ou-grillee',
    nameFr: 'Sole de l\'Atlantique Grillée ou Meunière',
    nameAr: 'سمك الصول على الصاج أو بالطريقة الكلاسيكية',
    nameEn: 'Atlantic Sole Grilled or Meunière',
    category: 'grilled',
    priceMad: 130,
    descriptionFr: 'Sole entière levée avec soin, chair fine et savoureuse, nappée d\'un beurre noisette citronné ou nature.',
    descriptionEn: 'Whole delicate sole pan-seared with brown butter and lemon, or plain grilled over sea salt.',
    descriptionAr: 'سمك صول رقيق ومميز مشوي بالزبدة والليمون أو خفيف على الصاج.',
  },
  {
    id: 'espadon-plancha',
    nameFr: 'Pavé d\'Espadon Tranché à la Plancha',
    nameAr: 'ستيك سمك أبو سيف مشوي على البلانشا',
    nameEn: 'Seared Swordfish Steak Plancha',
    category: 'grilled',
    priceMad: 115,
    descriptionFr: 'Belle darne d\'espadon du détroit, marinée brièvement à la chermoula puis saisie à cœur.',
    descriptionEn: 'Thick swordfish steak from the Strait, marinated in delicate chermoula and flash-seared.',
    descriptionAr: 'قطعة ستيك إسبادون متبلة بالشرمولة ومشوية على الصاج.',
  },

  // 4. Casseroles & Paëlla
  {
    id: 'paella-pesca-del-dia',
    nameFr: 'Grande Paëlla aux Fruits de Mer de la Baie',
    nameAr: 'بايلا فواكه البحر الكبيرة على الطريقة الطنجاوية',
    nameEn: 'Grand Mediterranean Seafood Paella',
    category: 'casseroles',
    priceMad: 120,
    signature: true,
    descriptionFr: 'Riz safrané parfumé, moules charnues, gambas royales, anneaux de calamars, poivrons rouges et petits pois.',
    descriptionEn: 'Saffron rice with plump black mussels, king prawns, calamari rings, roasted peppers, and lemon.',
    descriptionAr: 'أرز بالزعفران غني بالجمبري الملكي، بلح البحر، كالمار طري وفلفل مشوي وحامض.',
  },
  {
    id: 'mqila-lotte-chermoula',
    nameFr: 'Mqila de Lotte à la Chermoula Traditionnelle',
    nameAr: 'مقيلة فيليه اللوت بالشرمولة والفلفل المشوي',
    nameEn: 'Clay-Skillet Monkfish Mqila in Chermoula Sauce',
    category: 'casseroles',
    priceMad: 125,
    signature: true,
    descriptionFr: 'Morceaux de lotte sans arêtes mijotés dans un plat en terre cuite avec réduction de tomates, coriandre et cumin.',
    descriptionEn: 'Boneless monkfish medallions simmered in a piping hot terracotta dish with tomato reduction and spices.',
    descriptionAr: 'قطع فيليه لوت بدون حسك مطبوخة في مقيلة فخار بصلصة الطماطم المعسلة والكمون والكزبرة.',
  },
  {
    id: 'tagine-poisson-legumes',
    nameFr: 'Tagine de Poisson du Jour aux Légumes du Nord',
    nameAr: 'طاجين سمك اليوم بالخضار والليمون المصير',
    nameEn: 'Catch of the Day Tagine with Northern Market Vegetables',
    category: 'casseroles',
    priceMad: 95,
    descriptionFr: 'Poisson du jour cuit à l\'étouffée avec pommes de terre, carottes, olives violettes et citron confit.',
    descriptionEn: 'Slow-braised catch of the day with potatoes, carrots, purple olives, and preserved lemon.',
    descriptionAr: 'طاجين سمك طازج مع بطاطس وجزر وزيتون أحمر وحامض مصير.',
  },

  // 5. Boissons & Desserts
  {
    id: 'the-menthe-nord',
    nameFr: 'Thé à la Menthe Fraîche du Nord (Moussao)',
    nameAr: 'أتاي طنجاوي مشحر بالنعناع والشيبة',
    nameEn: 'Fresh Tangier Mint Tea Service',
    category: 'desserts_drinks',
    priceMad: 15,
    descriptionFr: 'Servi dans la pure tradition tangéroise avec menthe fraîche généreuse et mousse onctueuse.',
    descriptionEn: 'Authentic northern Moroccan green tea brewed with fragrant fresh mint leaves.',
    descriptionAr: 'شاي أخضر مغربي أصيل بالنعناع الطري المنعش مع الرغوة الطنجاوية.',
  },
  {
    id: 'flan-tanger',
    nameFr: 'Flan Traditionnel Caramel à la Tangéroise',
    nameAr: 'فلان بالكراميل على الطريقة الطنجاوية التقليدية',
    nameEn: 'Traditional Tangier Caramel Flan',
    category: 'desserts_drinks',
    priceMad: 25,
    descriptionFr: 'Recette héritée de la tradition hispano-marocaine, texture soyeuse et caramel ambré.',
    descriptionEn: 'Silky smooth custard flan with dark amber caramel, an Andalusian-Tangier classic.',
    descriptionAr: 'فلان بيتي ناعم مع صلصة كراميل ذهبية، حلوى طنجة الكلاسيكية.',
  },
  {
    id: 'salade-oranges-cannelle',
    nameFr: 'Salade d\'Oranges à la Cannelle & Fleur d\'Oranger',
    nameAr: 'سلطة البرتقال بالقرفة وماء الزهر',
    nameEn: 'Fresh Sliced Oranges with Cinnamon & Orange Blossom',
    category: 'desserts_drinks',
    priceMad: 25,
    descriptionFr: 'Oranges fraîches du terroir taillées finement, cannelle moulue et gouttes d\'eau de fleur d\'oranger.',
    descriptionEn: 'Thinly sliced sweet oranges dusted with Ceylon cinnamon and pure orange blossom water.',
    descriptionAr: 'شرائح برتقال طازج مع القرفة المطحونة وقطرات ماء الزهر الأصيل.',
  },
  {
    id: 'jus-oranges-fraiches',
    nameFr: 'Jus d\'Oranges Pressé Minute',
    nameAr: 'عصير برتقال طبيعي معصور طازجاً',
    nameEn: 'Freshly Squeezed Orange Juice',
    category: 'desserts_drinks',
    priceMad: 20,
    descriptionFr: 'Oranges douces marocaines pressées à la commande.',
    descriptionEn: 'Pressed to order from sweet Moroccan seasonal oranges.',
    descriptionAr: 'عصير برتقال طبيعي معصور في الحين بدون سكر مضاف.',
  },
];

export const VERIFIED_REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    author: 'Karim B.',
    rating: 5,
    date: 'Il y a 2 semaines',
    source: 'Google Maps',
    keyHighlight: 'Fraîcheur absolue & Banc de poissons',
    contentFr: 'Le meilleur rapport qualité-prix de poisson à Tanger sans aucun doute. On choisit son poisson directement sur la glace et on décide du mode de cuisson (plancha ou friture). Le personnel est d\'une gentillesse exemplaire et les petits accompagnements offerts au début sont délicieux !',
    contentEn: 'Undoubtedly the best value for fresh seafood in Tangier. You pick your fish straight from the ice display and choose plancha or fry. Staff is exceptionally warm and the complimentary appetizers at the start are wonderful!',
    contentAr: 'أحسن مطعم سمك من حيث الجودة والسعر في طنجة. تختار سمكك مباشرة من الثلج وتختار طريقة الطهي. المعاملة ممتازة وضيافة البداية رائعة!',
  },
  {
    id: 'rev-2',
    author: 'Elena R. (Espagne)',
    rating: 5,
    date: 'Il y a 1 mois',
    source: 'Google Maps',
    keyHighlight: 'Fritura crujiente & Pulpo tierno',
    contentFr: 'Une friture de poisson ultra croustillante et pas du tout grasse. Le pulpo a la gallega et le filet de lotte étaient tendres et parfaitement assaisonnés. Tout respire la mer et la fraîcheur. Très propre et accueillant pour les familles.',
    contentEn: 'Incredibly crispy fried seafood with zero grease. The pulpo a la gallega and monkfish fillet were tender and seasoned to perfection. Everything smells of fresh ocean breeze. Very clean and family-friendly.',
    contentAr: 'فريتور مقرمش جداً وخفيف وغير زيتي نهائياً. الأخطبوط وفيليه اللوت طري ولذيذ جداً. مكان نظيف ومثالي للعائلات.',
  },
  {
    id: 'rev-3',
    author: 'Youssef M.',
    rating: 5,
    date: 'Il y a 3 semaines',
    source: 'Google Maps',
    keyHighlight: 'Portions généreuses & Service rapide',
    contentFr: 'Je viens à Pesca Del Dia 2 à chaque passage à Tanger sur l\'avenue Oujda. La paëlla est copieuse, le loup grillé est exceptionnel et le pain chaud qui sort avec la chermoula... un régal ! Bravo à toute l\'équipe.',
    contentEn: 'I visit Pesca Del Dia 2 every time I\'m in Tangier on Avenue Oujda. The paella is generous, grilled sea bass is sensational, and hot bread with chermoula is pure joy! Kudos to the entire crew.',
    contentAr: 'كنزور صيد اليوم 2 في شارع وجدة في كل زيارة لطنجة. البايلا عامرة والدرعي المشوي روعة مع الخبز الساخن والشرمولة. تبارك الله عليكم.',
  },
  {
    id: 'rev-4',
    author: 'Sophie L. (France)',
    rating: 4,
    date: 'Il y a 1 mois',
    source: 'Google Maps',
    keyHighlight: 'Authenticité marocaine du port',
    contentFr: 'Ambiance vivante et authentique, loin des pièges à touristes. Voir le chef préparer le poisson sous nos yeux donne une totale confiance. Les prix sont très raisonnables pour une telle fraîcheur.',
    contentEn: 'Lively and authentic atmosphere, far from tourist traps. Seeing the chef prepare fresh fish right in front of you builds complete trust. Very reasonable prices for such unmatched freshness.',
    contentAr: 'أجواء أصيلة وحقيقية بعيداً عن الأماكن التجارية. رؤية تحضير السمك أمامك تعطي ثقة تامة والأسعار جد مناسبة.',
  },
];
