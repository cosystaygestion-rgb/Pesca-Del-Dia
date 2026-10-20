import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'fr' | 'ar' | 'en';

interface Translations {
  nav: {
    fishCounter: string;
    menu: string;
    tradition: string;
    reviews: string;
    location: string;
    bookTable: string;
  };
  hero: {
    kicker: string;
    titleLine1: string;
    titleLine2: string;
    subtitle: string;
    exploreCatch: string;
    viewMenu: string;
    openDaily: string;
    addressShort: string;
    ratingText: string;
  };
  fishCounterSection: {
    badge: string;
    title: string;
    subtitle: string;
    instruction: string;
    cookMethodTitle: string;
    methods: {
      plancha: { label: string; desc: string };
      friture: { label: string; desc: string };
      mqila: { label: string; desc: string };
      paella: { label: string; desc: string };
    };
    originBadge: string;
    textureLabel: string;
    flavorLabel: string;
    orderThisCatch: string;
    selectedNotice: string;
  };
  feastBuilder: {
    title: string;
    subtitle: string;
    addFish: string;
    totalEstimate: string;
    includedStarters: string;
    reserveFeast: string;
    emptySelection: string;
  };
  menuSection: {
    badge: string;
    title: string;
    subtitle: string;
    categories: {
      all: string;
      starters: string;
      friture: string;
      grilled: string;
      casseroles: string;
      desserts_drinks: string;
    };
    offeredTag: string;
    signatureTag: string;
    currency: string;
  };
  traditionSection: {
    badge: string;
    title: string;
    story1Title: string;
    story1Body: string;
    story2Title: string;
    story2Body: string;
    story3Title: string;
    story3Body: string;
    complimentaryTitle: string;
    complimentaryBody: string;
  };
  reviewsSection: {
    badge: string;
    title: string;
    subtitle: string;
    googleRatingText: string;
  };
  bookingModal: {
    title: string;
    subtitle: string;
    dateLabel: string;
    timeLabel: string;
    guestsLabel: string;
    guestsCount: string;
    areaLabel: string;
    areas: {
      main: string;
      family: string;
      terrace: string;
    };
    nameLabel: string;
    phoneLabel: string;
    notesLabel: string;
    notesPlaceholder: string;
    selectedCatchLabel: string;
    submitWhatsapp: string;
    submitCall: string;
    cancel: string;
    confirmNotice: string;
    successMessage: string;
  };
  locationSection: {
    badge: string;
    title: string;
    subtitle: string;
    addressTitle: string;
    hoursTitle: string;
    hoursDetail: string;
    phoneTitle: string;
    callNow: string;
    openGoogleMaps: string;
    taxiCardTitle: string;
    taxiCardSubtitle: string;
    taxiPhonetics: string;
    copyAddress: string;
    addressCopied: string;
  };
  footer: {
    rights: string;
    portNote: string;
  };
}

const translations: Record<Language, Translations> = {
  fr: {
    nav: {
      fishCounter: 'Banc de Poissons',
      menu: 'La Carte',
      tradition: 'La Tradition',
      reviews: 'Avis Clients',
      location: 'Accès & Contact',
      bookTable: 'Réserver une table',
    },
    hero: {
      kicker: 'Port de Tanger · Avenue Oujda',
      titleLine1: 'Du banc de glace',
      titleLine2: 'à votre table.',
      subtitle: 'La fraîcheur absolue des eaux du Détroit de Gibraltar et de l\'Atlantique. Choisissez votre prise du jour, préparée sous vos yeux à la plancha, en friture croustillante ou en Mqila mijotée.',
      exploreCatch: 'Découvrir le banc du jour',
      viewMenu: 'Consulter la carte',
      openDaily: 'Ouvert 7j/7 · 12h00 – 23h30',
      addressShort: 'Avenue Oujda, Tanger',
      ratingText: '4.1/5 sur Google · 676+ avis',
    },
    fishCounterSection: {
      badge: 'Expérience Signature',
      title: 'Le Banc de Poissons Vivant',
      subtitle: 'À Pesca Del Dia 2, pas de carte figée : approchez-vous de la glace, observez le regard vif et les ouïes nacrées de nos arrivages matinaux, et choisissez votre mode de cuisson préféré.',
      instruction: 'Cliquez sur un poisson pour explorer ses saveurs et préparer votre repas :',
      cookMethodTitle: 'Modes de préparation artisanaux :',
      methods: {
        plancha: {
          label: 'À la Plancha',
          desc: 'Saisi à haute température au gros sel marin, huile d\'olive vierge et quartiers de citron.',
        },
        friture: {
          label: 'Friture Dorée',
          desc: 'Voile léger de farine, bain vif pour une texture croustillante et légère, zéro huile superflue.',
        },
        mqila: {
          label: 'Mqila Traditionnelle',
          desc: 'Mijoté en plat de terre cuite avec chermoula maison, purée de tomates fraîches et piments doux.',
        },
        paella: {
          label: 'Façon Paëlla',
          desc: 'Intégré au grand plat de riz safrané parfumé aux coquillages et crustacés de la baie.',
        },
      },
      originBadge: 'Origine certifiée',
      textureLabel: 'Texture en bouche',
      flavorLabel: 'Profil aromatique',
      orderThisCatch: 'Ajouter à ma sélection de table',
      selectedNotice: 'Poisson sélectionné pour votre visite',
    },
    feastBuilder: {
      title: 'Votre Sélection pour le Repas',
      subtitle: 'Composez votre festin marin avant votre arrivée',
      addFish: 'Ajouter d\'autres poissons',
      totalEstimate: 'Estimation indicative pour la table :',
      includedStarters: 'Inclus d\'office : Pain chaud marocain, olives marinées, chermoula et harissa de bienvenue.',
      reserveFeast: 'Réserver cette sélection sur WhatsApp',
      emptySelection: 'Sélectionnez des poissons sur le banc de glace pour composer votre table.',
    },
    menuSection: {
      badge: 'Cuisine du Détroit',
      title: 'La Carte Authentique',
      subtitle: 'Des recettes fidèles à la tradition maritime tangéroise, où les produits nobles sont sublimés par des cuissons franches et l\'incomparable chermoula marocaine.',
      categories: {
        all: 'Tout voir',
        starters: 'Entrées & Accueil',
        friture: 'La Grande Friture',
        grilled: 'Poissons Nobles Grillés',
        casseroles: 'Casseroles Mqila & Paëlla',
        desserts_drinks: 'Douceurs & Boissons',
      },
      offeredTag: 'Offert à table',
      signatureTag: 'Spécialité',
      currency: 'MAD',
    },
    traditionSection: {
      badge: 'L\'Esprit Pesca Del Dia 2',
      title: 'L\'Hospitalité Maritime de Tanger',
      story1Title: 'L\'Arrivage Quotidien du Port',
      story1Body: 'Tanger est au confluent unique de l\'Océan Atlantique et de la Mer Méditerranée. Chaque matin à l\'aube, les chaluts et barques côtières accostent au port. Nous sélectionnons uniquement les prises d\'une fraîcheur irréprochable.',
      story2Title: 'L\'Accueil Tangérois Inclus',
      story2Body: 'Avant même de prendre votre commande, nous déposons sur votre table un panier de pain croustillant tout chaud sorti du four, des olives locales marinées aux épices, et notre chermoula maison. C\'est notre manière de vous dire bienvenue.',
      story3Title: 'La Cuisson Sans Fard',
      story3Body: 'Quand le poisson est de ce niveau de fraîcheur, nul besoin d\'artifices. Une plancha brûlante, un trait d\'huile d\'olive vierge du terroir, un peu de fleur de sel, et la magie opère.',
      complimentaryTitle: 'Le Rituel de Bienvenue Offert',
      complimentaryBody: 'Pain chaud · Olives marinées · Chermoula fraîche · Harissa douce',
    },
    reviewsSection: {
      badge: 'Paroles de Visiteurs',
      title: 'Ce que nos clients racontent',
      subtitle: 'Plus de 670 avis vérifiés sur Google Maps témoignent de la constance, de la fraîcheur et de la chaleur de notre maison.',
      googleRatingText: 'Note moyenne certifiée sur Google Maps',
    },
    bookingModal: {
      title: 'Réserver une Table',
      subtitle: 'Pesca Del Dia 2 · Avenue Oujda, Tanger',
      dateLabel: 'Date souhaitée',
      timeLabel: 'Heure de service',
      guestsLabel: 'Nombre de personnes',
      guestsCount: 'personnes',
      areaLabel: 'Espace préféré',
      areas: {
        main: 'Salle Principale (Vue Banc)',
        family: 'Espace Famille (Spacieux & Calme)',
        terrace: 'Terrasse Extérieure',
      },
      nameLabel: 'Nom & Prénom',
      phoneLabel: 'Numéro de téléphone / WhatsApp',
      notesLabel: 'Demande particulière ou envie de poisson',
      notesPlaceholder: 'Ex: Nous aimerions une belle sole à la plancha et une friture mixte...',
      selectedCatchLabel: 'Sélection issue du banc de glace :',
      submitWhatsapp: 'Confirmer via WhatsApp',
      submitCall: 'Appeler le restaurant (+212 5393-25212)',
      cancel: 'Fermer',
      confirmNotice: 'Réservation directe sans intermédiaire. Confirmation rapide par notre équipe.',
      successMessage: 'Votre demande est prête à être transmise !',
    },
    locationSection: {
      badge: 'Nous Trouver',
      title: 'Au Cœur de Tanger',
      subtitle: 'Situé sur l\'Avenue Oujda, à quelques minutes de la gare Tanger Ville et de la baie, notre établissement vous accueille en continu 7 jours sur 7.',
      addressTitle: 'Adresse Exacte',
      hoursTitle: 'Horaires d\'Ouverture',
      hoursDetail: 'Lundi au Dimanche sans interruption',
      phoneTitle: 'Téléphone & Réservations',
      callNow: 'Appeler le restaurant',
      openGoogleMaps: 'Itinéraire Google Maps',
      taxiCardTitle: 'Guide Petit Taxi Tanger',
      taxiCardSubtitle: 'Montrez cette consigne à votre chauffeur de taxi :',
      taxiPhonetics: '« 3afak l\'Avenue Oujda, Restaurant Pesca Del Dia 2 »',
      copyAddress: 'Copier l\'adresse',
      addressCopied: 'Adresse copiée !',
    },
    footer: {
      rights: 'Tous droits réservés. Restaurant de poissons frais à Tanger.',
      portNote: 'Du port de pêche de Tanger à l\'Avenue Oujda.',
    },
  },
  en: {
    nav: {
      fishCounter: 'Ice Counter',
      menu: 'The Menu',
      tradition: 'Our Story',
      reviews: 'Reviews',
      location: 'Location & Contact',
      bookTable: 'Book a Table',
    },
    hero: {
      kicker: 'Port of Tangier · Avenue Oujda',
      titleLine1: 'From the ice counter',
      titleLine2: 'to your table.',
      subtitle: 'The unmatched freshness of the Strait of Gibraltar and the Atlantic. Choose your catch of the day, prepared before your eyes on the plancha, in crispy golden batter, or slow-simmered in clay Mqila.',
      exploreCatch: 'Explore Today\'s Catch',
      viewMenu: 'Browse the Menu',
      openDaily: 'Open 7 days a week · 12:00 PM – 11:30 PM',
      addressShort: 'Avenue Oujda, Tangier',
      ratingText: '4.1/5 on Google · 676+ verified reviews',
    },
    fishCounterSection: {
      badge: 'Signature Experience',
      title: 'The Living Fish Counter',
      subtitle: 'At Pesca Del Dia 2, there is no generic printed routine: step up to the crushed ice, inspect the bright eyes and glistening scales of the morning haul, and choose your preferred preparation.',
      instruction: 'Click on any catch to explore tasting notes and build your ocean feast:',
      cookMethodTitle: 'Artisanal Cooking Methods:',
      methods: {
        plancha: {
          label: 'Plancha Seared',
          desc: 'High heat sear with coarse sea salt, virgin olive oil, and fresh lemon wedges.',
        },
        friture: {
          label: 'Golden Crispy Fry',
          desc: 'Light flour dusting, flash-fried for an airy, crunchy texture with zero oiliness.',
        },
        mqila: {
          label: 'Clay-Pot Mqila',
          desc: 'Slow-simmered in terracotta with homemade chermoula, crushed tomatoes, and sweet peppers.',
        },
        paella: {
          label: 'Paella Style',
          desc: 'Woven into our grand saffron rice pan with bay shellfish and king prawns.',
        },
      },
      originBadge: 'Certified Origin',
      textureLabel: 'Palate Texture',
      flavorLabel: 'Flavor Profile',
      orderThisCatch: 'Add to Table Selection',
      selectedNotice: 'Selected for your dining table',
    },
    feastBuilder: {
      title: 'Your Table Selection',
      subtitle: 'Customize your seafood banquet before arrival',
      addFish: 'Add more fish from counter',
      totalEstimate: 'Estimated table price:',
      includedStarters: 'Complimentary on arrival: Warm Moroccan bread, spiced olives, house chermoula and mild harissa.',
      reserveFeast: 'Reserve Selection via WhatsApp',
      emptySelection: 'Select catches from the ice counter above to curate your dining table.',
    },
    menuSection: {
      badge: 'Strait Gastronomy',
      title: 'The Authentic Menu',
      subtitle: 'Honoring Tangier\'s maritime heritage, where pristine ocean bounty meets straightforward cooking and unmatched Moroccan spices.',
      categories: {
        all: 'All Dishes',
        starters: 'Starters & Welcome',
        friture: 'Crispy Fried Seafood',
        grilled: 'Noble Grilled Fish',
        casseroles: 'Clay Mqila & Paella',
        desserts_drinks: 'Sweets & Infusions',
      },
      offeredTag: 'Complimentary',
      signatureTag: 'House Specialty',
      currency: 'MAD',
    },
    traditionSection: {
      badge: 'The Pesca Del Dia 2 Ethos',
      title: 'Tangier\'s Maritime Hospitality',
      story1Title: 'Daily Morning Port Haul',
      story1Body: 'Tangier rests at the legendary meeting point of the Atlantic and Mediterranean. Every morning at dawn, local fishing boats pull into harbor. We hand-select only catches of impeccable freshness.',
      story2Title: 'The Complimentary Tangier Welcome',
      story2Body: 'Before you even order, warm crusty bread from the oven, spiced purple olives, and fragrant house-made chermoula arrive at your table. It is northern Morocco\'s timeless gesture of welcoming guests.',
      story3Title: 'Honest Cooking Without Pretense',
      story3Body: 'When fish is this fresh, there is nothing to hide behind heavy sauces. A scorching plancha, a splash of virgin olive oil, coarse sea salt, and fresh lemon create culinary magic.',
      complimentaryTitle: 'Complimentary Welcome Ritual',
      complimentaryBody: 'Warm bread · Spiced olives · Fresh chermoula · Sweet harissa',
    },
    reviewsSection: {
      badge: 'Diner Testimonials',
      title: 'What Real Guests Say',
      subtitle: 'Over 670 verified Google reviews attest to our consistency, generosity, and vibrant coastal hospitality.',
      googleRatingText: 'Certified Google Maps rating',
    },
    bookingModal: {
      title: 'Reserve a Table',
      subtitle: 'Pesca Del Dia 2 · Avenue Oujda, Tangier',
      dateLabel: 'Desired Date',
      timeLabel: 'Service Time',
      guestsLabel: 'Number of Guests',
      guestsCount: 'guests',
      areaLabel: 'Seating Area',
      areas: {
        main: 'Main Dining Room (Counter View)',
        family: 'Family Area (Spacious & Quiet)',
        terrace: 'Outdoor Terrace',
      },
      nameLabel: 'Full Name',
      phoneLabel: 'Phone / WhatsApp Number',
      notesLabel: 'Special Requests or Fish Preferences',
      notesPlaceholder: 'e.g. We would love a whole sea bass on the plancha and mixed calamari...',
      selectedCatchLabel: 'Pre-selected catches from ice display:',
      submitWhatsapp: 'Confirm via WhatsApp',
      submitCall: 'Call Restaurant Direct (+212 5393-25212)',
      cancel: 'Close',
      confirmNotice: 'Direct reservation with zero middleman. Quick confirmation by our staff.',
      successMessage: 'Your booking request is ready to send!',
    },
    locationSection: {
      badge: 'Find Us',
      title: 'In the Heart of Tangier',
      subtitle: 'Located on Avenue Oujda, minutes from Tangier Ville rail station and the picturesque bay, welcoming you continuously 7 days a week.',
      addressTitle: 'Exact Address',
      hoursTitle: 'Opening Hours',
      hoursDetail: 'Monday to Sunday without interruption',
      phoneTitle: 'Telephone & Bookings',
      callNow: 'Call Now',
      openGoogleMaps: 'Open in Google Maps',
      taxiCardTitle: 'Tangier Petit Taxi Phrasebook',
      taxiCardSubtitle: 'Show this instruction directly to your taxi driver:',
      taxiPhonetics: '« 3afak l\'Avenue Oujda, Restaurant Pesca Del Dia 2 »',
      copyAddress: 'Copy Address',
      addressCopied: 'Address Copied!',
    },
    footer: {
      rights: 'All rights reserved. Fresh seafood restaurant in Tangier.',
      portNote: 'From the fishing port of Tangier to Avenue Oujda.',
    },
  },
  ar: {
    nav: {
      fishCounter: 'بسطة السمك (صيد اليوم)',
      menu: 'قائمة الطعام',
      tradition: 'أصالة طنجة',
      reviews: 'آراء الزبائن',
      location: 'الموقع والتواصل',
      bookTable: 'حجز طاولة',
    },
    hero: {
      kicker: 'ميناء طنجة · شارع وجدة',
      titleLine1: 'من بسطة الثلج',
      titleLine2: 'إلى طاولتك مباشرة.',
      subtitle: 'طراوة لا تُضاهى من مياه مضيق جبل طارق والمحيط الأطلسي. اختر صيدك اليومي بنفسك، يُطهى أمامك على البلانشا أو في فريتور مقرمش أو مقيلة فخارية طنجاوية.',
      exploreCatch: 'استكشف صيد اليوم',
      viewMenu: 'تصفح القائمة الكاملة',
      openDaily: 'مفتوح 7 أيام في الأسبوع · 12:00 ظهراً – 11:30 ليلاً',
      addressShort: 'شارع وجدة، طنجة',
      ratingText: '4.1/5 على خرائط جوجل · أكثر من 676 تقييم حقيقي',
    },
    fishCounterSection: {
      badge: 'التجربة الحية',
      title: 'بسطة صيد اليوم الطازج',
      subtitle: 'في مطعم صيد اليوم 2 (Pesca Del Dia 2)، لا نعتمد على قوائم جامدة: اقترب من بسطة الثلج، عاين بريق ولمعان السمك القادم صباحاً من الميناء، وحدد طريقة طهيك المفضلة.',
      instruction: 'اضغط على أي نوع سمك لاستكشاف مميزاته وبناء وجبتك البحرية :',
      cookMethodTitle: 'طرق التحضير التقليدية المتاحة :',
      methods: {
        plancha: {
          label: 'مشوي على البلانشا',
          desc: 'شواء على حرارة عالية بزيت الزيتون البكر، الملح الخشن، وشرائح الليمون الحامض.',
        },
        friture: {
          label: 'فريتور مقرمش ذهبي',
          desc: 'تغليف خفيف بالطحين وقلي سريع يعطي قرمشة خفيفة بدون أي زيوت متبقية.',
        },
        mqila: {
          label: 'مقيلة فخارية',
          desc: 'طهي هادئ في طاجين فخار بالشرمولة المغربية والطماطم المعسلة والفلفل الحلو.',
        },
        paella: {
          label: 'بايلا فواكه البحر',
          desc: 'تضاف إلى صينية الأرز بالزعفران مع بلح البحر والجمبري والكالمار.',
        },
      },
      originBadge: 'مصدر موثوق',
      textureLabel: 'ملمس اللحم',
      flavorLabel: 'المذاق والنكهة',
      orderThisCatch: 'أضف إلى اختيارات طاولتي',
      selectedNotice: 'تم اختيار هذا الصيد لطاولتك',
    },
    feastBuilder: {
      title: 'تشكيلة طاولتك المختارة',
      subtitle: 'رتّب مائدتك البحرية قبل وصولك للمطعم',
      addFish: 'إضافة المزيد من البسطة',
      totalEstimate: 'التقدير التقريبي للطاولة :',
      includedStarters: 'مشمول مجاناً عند الجلوس: خبز مغربي ساخن، زيتون مشرمل، شرمولة الدار وهريسة خفيفة.',
      reserveFeast: 'تأكيد الحجز عبر واتساب',
      emptySelection: 'اختر أنواع السمك من بسطة الثلج أعلاه لتجهيز مائدتك.',
    },
    menuSection: {
      badge: 'مطبخ المضيق',
      title: 'القائمة الأصيلة',
      subtitle: 'وصفات مخلصة لتراث طنجة البحري العريق، حيث تلتقي ثمار البحر الفاخرة مع الشرمولة الطنجاوية اللذيذة.',
      categories: {
        all: 'جميع الأطباق',
        starters: 'المقبلات والضيافة',
        friture: 'الفريتور المقرمش',
        grilled: 'الأسماك المشوية',
        casseroles: 'المقيلات والبايلا',
        desserts_drinks: 'الحلويات والمشروبات',
      },
      offeredTag: 'ضيافة مجانية',
      signatureTag: 'طبق مميز',
      currency: 'درهم',
    },
    traditionSection: {
      badge: 'روح صيد اليوم 2',
      title: 'كرم وضيافة طنجة البحرية',
      story1Title: 'صيد الصباح من الميناء',
      story1Body: 'تقع طنجة عند نقطة التقاء فريدة بين المحيط الأطلسي والبحر الأبيض المتوسط. فجر كل يوم، ترسو المراكب في الميناء لنختار لكم أفضل الأسماك الطازجة.',
      story2Title: 'ضيافة طنجة الأصيلة',
      story2Body: 'قبل أن تطلب طعامك، نضع على مائدتك سلة خبز ساخن يخرج من الفرن، مع زيتون متبل وشرمولة طنجاوية مصنوعة يومياً، تعبيراً عن ترحيبنا الحار بكم.',
      story3Title: 'طهي أصيل ونظيف',
      story3Body: 'حينما يكون السمك فائق الطراوة، لا يحتاج لأي تصنع. بلانشا ساخنة، قطرات من زيت الزيتون البلدي، رشة ملح خشن، وعصير ليمون طازج.',
      complimentaryTitle: 'طقس الضيافة الترحيبية المجانية',
      complimentaryBody: 'خبز ساخن · زيتون مشرمل · شرمولة طازجة · هريسة بلدية',
    },
    reviewsSection: {
      badge: 'شهادات الزبائن',
      title: 'ماذا يقول ضيوفنا',
      subtitle: 'أكثر من 670 تقييم معتمد على خرائط جوجل يشهدون بجودة أسماكنا وكرم الضيافة.',
      googleRatingText: 'التقييم المعتمد على خرائط جوجل',
    },
    bookingModal: {
      title: 'حجز طاولة',
      subtitle: 'صيد اليوم 2 (Pesca Del Dia 2) · شارع وجدة، طنجة',
      dateLabel: 'التاريخ المطلوب',
      timeLabel: 'وقت الحضور',
      guestsLabel: 'عدد الضيوف',
      guestsCount: 'أشخاص',
      areaLabel: 'المكان المفضل',
      areas: {
        main: 'القاعة الرئيسية (إطلالة على بسطة السمك)',
        family: 'قسم العائلات (مريح وواسع)',
        terrace: 'الجلسة الخارجية',
      },
      nameLabel: 'الاسم الكامل',
      phoneLabel: 'رقم الهاتف / واتساب',
      notesLabel: 'ملاحظات أو أسماك مفضلة',
      notesPlaceholder: 'مثال: نفضل سمكة درعي على البلانشا وصحن فريتور مشكل...',
      selectedCatchLabel: 'الأسماك المختارة من بسطة الثلج :',
      submitWhatsapp: 'تأكيد الحجز عبر واتساب',
      submitCall: 'الاتصال المباشر بالمطعم (0539325212)',
      cancel: 'إغلاق',
      confirmNotice: 'حجز مباشر وفوري دون أي وسيط أو تكلفة إضافية.',
      successMessage: 'طلبك جاهز للإرسال !',
    },
    locationSection: {
      badge: 'طريقة الوصول',
      title: 'في قلب طنجة',
      subtitle: 'يقع مطعمنا في شارع وجدة، على بعد دقائق من محطة قطار طنجة المدينة وكورنيش البحر، نرحب بكم يومياً دون انقطاع.',
      addressTitle: 'العنوان الكامل',
      hoursTitle: 'أوقات العمل',
      hoursDetail: 'من الإثنين إلى الأحد دون انقطاع',
      phoneTitle: 'الهاتف والحجوزات',
      callNow: 'اتصل بالمطعم الآن',
      openGoogleMaps: 'فتح في خرائط جوجل',
      taxiCardTitle: 'دليل التاكسي الصغير بطنجة',
      taxiCardSubtitle: 'وجّه سائق التاكسي الصغير بهذه العبارة :',
      taxiPhonetics: '« عافاك شارع وجدة، مطعم بيسكا ديل ديا 2 (صيد اليوم) »',
      copyAddress: 'نسخ العنوان',
      addressCopied: 'تم نسخ العنوان !',
    },
    footer: {
      rights: 'جميع الحقوق محفوظة. مطعم الأسماك وفواكه البحر الطازجة في طنجة.',
      portNote: 'من ميناء صيد طنجة إلى شارع وجدة.',
    },
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
  isRtl: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('fr');

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  };

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  const value: LanguageContextType = {
    language,
    setLanguage,
    t: translations[language],
    isRtl: language === 'ar',
  };

  return (
    <LanguageContext.Provider value={value}>
      <div className={language === 'ar' ? 'font-arabic' : 'font-sans'}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
