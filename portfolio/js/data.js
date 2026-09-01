// ============================================================
//  BUREAU DES ENTRÉES — CONTENU
// ------------------------------------------------------------
//  👉 C'est LE fichier à modifier pour changer le portfolio.
//     Pour ajouter un projet : un objet de plus dans DOSSIERS,
//     et il se présentera tout seul au guichet.
// ============================================================

/* ---------- Identité de l'inspecteur ---------- */
const BUREAU = {
  etat: "BUREAU DES ENTRÉES",
  devise: "L'ORDRE PAR LE FORMULAIRE",
  inspecteur: {
    nom: "AYOUB OUAADOUD",
    matricule: "EHB-0142",
    poste: "DÉVELOPPEUR — iOS · WEB · BACK-END",
    ville: "BRUXELLES, BELGIQUE",
    github: "https://github.com/AyoubO22",
    linkedin: "https://www.linkedin.com/in/ayoub-ouaadoud-5a9550293",
    email: "ayoub.ouaadoud@student.ehb.be",
  },
};

/* ---------- Briefing affiché avant le service ---------- */
const BRIEFING = {
  jour: "JOUR 1",
  titre: "BUREAU DES ENTRÉES",
  intro: "Poste de contrôle. Douze dossiers demandent leur entrée : applications iOS et macOS, plateformes web, services d'intégration, outils. Chacun présente ses papiers. À vous de les inspecter.",
  consignes: [
    "Appelez un dossier avec le buzzer SUIVANT.",
    "Lisez les papiers : cliquez pour agrandir, glissez pour déplacer.",
    "Tamponnez APPROUVÉ ou REFUSÉ. Aucun verdict n'est faux.",
    "RÈGLEMENT : profil, compétences, parcours, contact.",
    "TERMINAL : tapez « dossiers » pour tout voir d'un coup.",
    "Des anomalies sont dissimulées dans ce bureau. Elles ne sont pas signalées.",
  ],
};

/* ============================================================
   LES DOSSIERS (= les candidats au guichet)
   ------------------------------------------------------------
   {
     id, nom, type, graine (dessine le visage), repliques[],
     docs: [
       { kind:"passeport", titre, sous, photo:true, champs:[["CLÉ","valeur"]] }
       { kind:"note",      titre, texte, points:[...] }
       { kind:"permis",    titre, texte, liens:[{label,url}] }
     ],
     oui, non
   }
   ============================================================ */

const DOSSIERS = [

  /* ---------------------------------------------------------- */
  {
    id: "gameboxd",
    nom: "GAMEBOXD",
    type: "APPLICATION iOS",
    graine: 51027,
    repliques: [
      "Application iOS. Je viens pour l'entrée.",
      "Un journal de jeux vidéo : noter, critiquer, suivre ce qu'on a joué. Le principe de Letterboxd, appliqué au jeu.",
      "Écrite en SwiftUI. Cinquante-deux fichiers Swift. Tout est dans le dossier.",
    ],
    docs: [
      {
        kind: "passeport",
        titre: "GAMEBOXD",
        sous: "APPLICATION iOS · SWIFTUI",
        photo: true,
        champs: [
          ["TYPE", "App iOS native"],
          ["LANGAGE", "Swift 5 · SwiftUI"],
          ["ARCHI.", "MVVM"],
          ["DONNÉES", "API RAWG + persistance locale"],
          ["EXTRAS", "Widget · tests · CI"],
          ["LANGUES", "FR / EN"],
          ["ANNÉE", "2026"],
        ],
      },
      {
        kind: "note",
        titre: "RAPPORT D'INSPECTION",
        texte: "Le projet est découpé proprement : Models, Services, ViewModels, Views. Les clés d'API restent hors du dépôt (fichiers xcconfig), et le README distingue explicitement ce qui tourne de ce qui est encore illustratif.",
        points: [
          "Recherche et fiches de jeux via l'API RAWG",
          "Notes, critiques et bibliothèque personnelle",
          "Extension widget (WidgetKit)",
          "Cible de tests unitaires + intégration continue GitHub Actions",
          "Localisation française et anglaise",
        ],
      },
      {
        kind: "permis",
        titre: "AUTORISATION D'ACCÈS",
        texte: "Le porteur est autorisé à consulter le code source et la documentation technique.",
        liens: [{ label: "CODE SOURCE", url: "https://github.com/AyoubO22/Gameboxd" }],
      },
    ],
    oui: "Entrée accordée. Bonne inspection.",
    non: "Refusée. Je repasserai à la prochaine version.",
  },

  /* ---------------------------------------------------------- */
  {
    id: "pokemon",
    nom: "ENCYCLOPÉDIE POKÉMON",
    type: "PLATEFORME WEB",
    graine: 25025,
    repliques: [
      "Guide du Pokémon compétitif. Générations 1 à 9, simples et doubles.",
      "Mille vingt-cinq fiches, neuf cents attaques, un calculateur de dégâts et un constructeur d'équipe.",
      "Oui, c'est un centre d'intérêt. C'est aussi quinze sections de contenu à structurer.",
    ],
    docs: [
      {
        kind: "passeport",
        titre: "POKÉMON COMPÉTITIF",
        sous: "ENCYCLOPÉDIE STRATÉGIQUE",
        photo: true,
        champs: [
          ["TYPE", "Application web"],
          ["STACK", "React 18 · TypeScript"],
          ["OUTILS", "Vite · Tailwind · Radix"],
          ["DONNÉES", "PokéAPI (1025 Pokémon)"],
          ["TAILLE", "61 composants"],
          ["ANNÉE", "2026"],
        ],
      },
      {
        kind: "note",
        titre: "CONTENU DÉCLARÉ",
        texte: "Le projet mêle une base de données consultable et des outils de calcul. La partie stratégique est écrite, pas générée : quinze sections couvrant types, stats, talents, objets, statuts et teambuilding.",
        points: [
          "Calculateur de dégâts avec sélection via l'API",
          "Constructeur d'équipe : faiblesses, couverture, rôles",
          "Quiz de 74 questions avec explications",
          "Import d'équipe depuis un paste Pokémon Showdown",
          "Thème clair/sombre, taille de texte réglable, responsive",
        ],
      },
      {
        kind: "permis",
        titre: "AUTORISATION D'ACCÈS",
        texte: "Consultation du code source autorisée.",
        liens: [{ label: "CODE SOURCE", url: "https://github.com/AyoubO22/Pokemon-guide" }],
      },
    ],
    oui: "Merci. Le méta évolue, le guide aussi.",
    non: "Refusé ? Vous n'avez pas lu la section teambuilding.",
  },

  /* ---------------------------------------------------------- */
  {
    id: "crm",
    nom: "SERVICE D'INTÉGRATION CRM",
    type: "BACK-END · ÉQUIPE",
    graine: 8801,
    repliques: [
      "Service d'intégration. Je transporte des messages entre systèmes.",
      "RabbitMQ d'un côté, Salesforce de l'autre, et cinq services autour : caisse, facturation, mailing, planning, identité.",
      "Projet d'équipe. Mon dossier est celui de la couche CRM.",
    ],
    docs: [
      {
        kind: "passeport",
        titre: "CRM INTEGRATION SERVICE",
        sous: "PROJET D'INTÉGRATION EN ÉQUIPE",
        photo: true,
        champs: [
          ["TYPE", "Service back-end"],
          ["LANGAGE", "Node.js"],
          ["MESSAGERIE", "RabbitMQ (amqplib)"],
          ["CRM", "Salesforce (jsforce)"],
          ["FORMAT", "XML validé par XSD"],
          ["LIVRAISON", "Docker · Compose · CI"],
          ["ANNÉE", "2026"],
        ],
      },
      {
        kind: "note",
        titre: "FONCTIONNEMENT",
        texte: "Le service consomme des messages XML sur plusieurs files, les valide, résout ou crée un identifiant maître auprès du service d'identité, met à jour Salesforce, puis réémet des messages vers les systèmes en aval.",
        points: [
          "Validation structurelle et XSD (49 schémas)",
          "Files de reprise pour les échecs temporaires",
          "File morte pour les messages non rejouables",
          "Journalisation Winston, configuration par variables d'environnement",
          "Travail en équipe, revues de code et CI sur chaque poussée",
        ],
      },
      {
        kind: "permis",
        titre: "AUTORISATION D'ACCÈS",
        texte: "Dépôt d'équipe. Organisation IntegrationProject-Groep1.",
        liens: [{ label: "CODE SOURCE", url: "https://github.com/IntegrationProject-Groep1/CRM" }],
      },
    ],
    oui: "Message accepté. Transmis en aval.",
    non: "Refusé. Direction la file morte.",
  },

  /* ---------------------------------------------------------- */
  {
    id: "corplol",
    nom: "CORPLOL",
    type: "APPLICATION BUREAU",
    graine: 4400,
    repliques: [
      "Gestionnaire d'équipes. League of Legends.",
      "Un roster, des disponibilités, et la génération automatique de deux équipes équilibrées à cinq.",
      "Je parle aussi à l'API Riot et à Discord. Papiers en règle.",
    ],
    docs: [
      {
        kind: "passeport",
        titre: "CORPLOL — TEAM MANAGER",
        sous: "APPLICATION DE BUREAU",
        photo: true,
        champs: [
          ["TYPE", "App bureau (Win/Mac)"],
          ["LANGAGE", "Python 3.11"],
          ["INTERFACE", "CustomTkinter"],
          ["API", "Riot Games"],
          ["BOT", "discord.py"],
          ["ANNÉE", "2026"],
        ],
      },
      {
        kind: "note",
        titre: "FONCTIONS DÉCLARÉES",
        texte: "Outil pensé pour un groupe de joueurs réguliers : qui joue quel jour, avec qui, à quel poste, et qui a gagné la dernière fois.",
        points: [
          "Roster : rang, rôles, pseudo, disponibilités hebdomadaires",
          "Génération d'équipes 5v5 équilibrées par score et par rôle",
          "Historique des matchs et suivi des victoires/défaites",
          "Statistiques Riot : KDA, rang, parties récentes",
          "Export de la composition formatée pour Discord",
          "Documentation d'installation pas à pas, Mac et Windows",
        ],
      },
      {
        kind: "permis",
        titre: "AUTORISATION D'ACCÈS",
        texte: "Licence MIT. Publication de versions via GitHub Actions.",
        liens: [{ label: "CODE SOURCE", url: "https://github.com/AyoubO22/corplol" }],
      },
    ],
    oui: "Compo validée. Bonne partie.",
    non: "Refusé. On jouera à quatre, alors.",
  },

  /* ---------------------------------------------------------- */
  {
    id: "eylen",
    nom: "EYLEN KLINIEK",
    type: "SITE CLIENT · EN LIGNE",
    graine: 6031,
    repliques: [
      "Site d'un cabinet médical. Médecine esthétique et fonctionnelle.",
      "Un vrai commanditaire, un vrai public, une mise en ligne réelle.",
      "Je suis consultable dès maintenant. Vous pouvez vérifier.",
    ],
    docs: [
      {
        kind: "passeport",
        titre: "EYLEN KLINIEK",
        sous: "SITE VITRINE · EN LIGNE",
        photo: true,
        champs: [
          ["TYPE", "Site vitrine"],
          ["STACK", "HTML · CSS · JS"],
          ["POIDS", "Une page, sans framework"],
          ["LIVRAISON", "GitHub Pages via Actions"],
          ["ÉTAT", "En ligne"],
          ["ANNÉE", "2026"],
        ],
      },
      {
        kind: "note",
        titre: "NATURE DU TRAVAIL",
        texte: "Site de présentation d'un cabinet : services, informations pratiques, prise de contact. Contrainte principale : rester lisible et rapide sur téléphone, sans dépendance à charger.",
        points: [
          "Page unique, structurée pour la lecture mobile",
          "Déploiement automatisé à chaque poussée",
          "Contenu bilingue orienté patient",
        ],
      },
      {
        kind: "permis",
        titre: "AUTORISATION D'ACCÈS",
        texte: "Site public. Le dépôt est hébergé par la commanditaire.",
        liens: [
          { label: "▶ VOIR LE SITE", url: "https://zohra-fellah.github.io/Eylen-Kliniek/" },
          { label: "CODE SOURCE", url: "https://github.com/Zohra-Fellah/Eylen-Kliniek" },
        ],
      },
    ],
    oui: "Merci. Le cabinet vous remercie aussi.",
    non: "Refusé. Le client, lui, avait approuvé.",
  },

  /* ---------------------------------------------------------- */
  {
    id: "sanzo",
    nom: "SANZO OUTFIT MATCHER",
    type: "APPLICATION macOS",
    graine: 15948,
    repliques: [
      "Application macOS. Question de couleurs.",
      "Cent cinquante-neuf teintes du peintre japonais Sanzo Wada, trois cent quarante-huit palettes harmonieuses.",
      "Je dis quoi porter avec quoi. Scientifiquement, si l'on veut.",
    ],
    docs: [
      {
        kind: "passeport",
        titre: "SANZO OUTFIT MATCHER",
        sous: "APPLICATION macOS · SWIFTUI",
        photo: true,
        champs: [
          ["TYPE", "App macOS native"],
          ["LANGAGE", "Swift · SwiftUI"],
          ["DONNÉES", "159 couleurs Sanzo Wada"],
          ["PALETTES", "348 combinaisons"],
          ["LICENCE", "MIT"],
          ["ANNÉE", "2026"],
        ],
      },
      {
        kind: "note",
        titre: "PRINCIPE",
        texte: "Le nuancier de Sanzo Wada, publié dans les années 1930, sert de base à un moteur de suggestion vestimentaire : on choisit une couleur, l'application propose des tenues coordonnées.",
        points: [
          "Sélection par pipette, code hexadécimal ou nuancier",
          "Suggestions réparties en haut / bas / veste / accessoire",
          "Filtres sur les palettes proposées",
          "Interface native, pensée pour le clavier et la souris",
        ],
      },
      {
        kind: "permis",
        titre: "AUTORISATION D'ACCÈS",
        texte: "Consultation du code source autorisée.",
        liens: [{ label: "CODE SOURCE", url: "https://github.com/AyoubO22/SanzoOutfitMatcher" }],
      },
    ],
    oui: "Accordé. Et votre tampon va bien avec le dossier.",
    non: "Refusé. Sans doute une question de teinte.",
  },

  /* ---------------------------------------------------------- */
  {
    id: "recrutement",
    nom: "PLATEFORME DE RECRUTEMENT",
    type: "PLATEFORME WEB",
    graine: 7212,
    repliques: [
      "Plateforme de recrutement et de sélection.",
      "Le processus complet : demande de poste, publication, candidature, évaluation structurée, décision.",
      "Trois rôles distincts, soixante-douze composants. Projet de cours, exécution complète.",
    ],
    docs: [
      {
        kind: "passeport",
        titre: "RECRUITMENT & SELECTION",
        sous: "PLATEFORME WEB · PROJET DE COURS",
        photo: true,
        champs: [
          ["TYPE", "Application web"],
          ["STACK", "React · TypeScript · Vite"],
          ["UI", "Tailwind · Radix · Recharts"],
          ["TAILLE", "72 composants"],
          ["CADRE", "Generative Application Design"],
          ["ANNÉE", "2026"],
        ],
      },
      {
        kind: "note",
        titre: "PROBLÈME TRAITÉ",
        texte: "Beaucoup d'organisations recrutent par courriel et tableur, ce qui disperse l'information. La plateforme centralise le parcours pour les trois parties concernées, à partir d'un prototype haute-fidélité.",
        points: [
          "Recruteur : gestion et publication des postes, tri des candidatures",
          "Manager : désignation des évaluateurs, décision finale",
          "Candidat : suivi transparent de l'état de sa candidature",
          "Évaluation structurée plutôt qu'appréciation libre",
          "Tableaux de bord et graphiques de suivi",
        ],
      },
      {
        kind: "permis",
        titre: "AUTORISATION D'ACCÈS",
        texte: "Consultation du code source autorisée.",
        liens: [{ label: "CODE SOURCE", url: "https://github.com/AyoubO22/HR-App" }],
      },
    ],
    oui: "Candidature retenue. C'est assez rare pour être noté.",
    non: "Refusé. Vous recevrez un courriel type.",
  },

  /* ---------------------------------------------------------- */
  {
    id: "undercover",
    nom: "UNDERCOVER",
    type: "JEU WEB · EN LIGNE",
    graine: 1337,
    repliques: [
      "Jeu de société. Un seul téléphone, plusieurs joueurs.",
      "Chacun reçoit un mot en secret. Sauf les infiltrés, qui en reçoivent un autre. Et Mr. White, qui n'a rien.",
      "Je tiens dans trois fichiers. Aucune dépendance.",
    ],
    docs: [
      {
        kind: "passeport",
        titre: "UNDERCOVER — DOSSIER SECRET",
        sous: "JEU WEB · PASS-THE-PHONE",
        photo: true,
        champs: [
          ["TYPE", "Jeu multijoueur local"],
          ["STACK", "HTML · CSS · JS vanilla"],
          ["DÉPENDANCES", "Aucune"],
          ["STOCKAGE", "localStorage"],
          ["ÉTAT", "En ligne"],
          ["ANNÉE", "2026"],
        ],
      },
      {
        kind: "note",
        titre: "NOTE DE SERVICE",
        texte: "Toute la logique de partie tient en un fichier : distribution des rôles, ordre de parole, vote, élimination, et la dernière chance laissée à Mr. White de deviner le mot des civils.",
        points: [
          "Équilibrage automatique selon le nombre de joueurs",
          "Paires de mots personnalisées, enregistrées sur le téléphone",
          "Interface conçue pour un écran qui circule de main en main",
        ],
      },
      {
        kind: "permis",
        titre: "AUTORISATION D'ACCÈS",
        texte: "Jeu public, jouable immédiatement.",
        liens: [
          { label: "▶ JOUER", url: "https://ayoubo22.github.io/undercover/" },
          { label: "CODE SOURCE", url: "https://github.com/AyoubO22/undercover" },
        ],
      },
    ],
    oui: "Merci. Et n'en parlez à personne.",
    non: "Refusé. C'était donc vous, l'infiltré.",
  },

  /* ---------------------------------------------------------- */
  {
    id: "crema",
    nom: "INVITATION & RSVP",
    type: "SITE ÉVÉNEMENT",
    graine: 5241,
    repliques: [
      "Petit dossier. Une invitation, un formulaire de réponse.",
      "Les réponses partent par courriel et se recopient dans une feuille de calcul.",
      "Court, mais il fallait qu'il marche du premier coup. Il n'y a pas de deuxième soirée.",
    ],
    docs: [
      {
        kind: "passeport",
        titre: "SITE D'INVITATION",
        sous: "PAGE ÉVÉNEMENT AVEC RSVP",
        photo: true,
        champs: [
          ["TYPE", "Page événement"],
          ["STACK", "HTML · CSS · JS"],
          ["RSVP", "Google Sheets (Apps Script)"],
          ["SECOURS", "FormSubmit non bloquant"],
          ["LIVRAISON", "GitHub Pages via Actions"],
          ["ANNÉE", "2026"],
        ],
      },
      {
        kind: "note",
        titre: "POINT TECHNIQUE",
        texte: "L'envoi vise d'abord la feuille de calcul ; si le script ne répond pas, le formulaire bascule sur l'envoi courriel sans bloquer l'invité. Une réponse perdue est une place vide.",
        points: [
          "Formulaire tolérant aux pannes du service tiers",
          "Mise en page soignée, lecture mobile d'abord",
          "Page non indexée : invitation privée",
        ],
      },
      {
        kind: "permis",
        titre: "AUTORISATION D'ACCÈS",
        texte: "Le site est une invitation privée ; seul le code est présenté.",
        liens: [{ label: "CODE SOURCE", url: "https://github.com/AyoubO22/Crema" }],
      },
    ],
    oui: "Réponse enregistrée. Une place de plus.",
    non: "Refusé. Je dirai que vous aviez un empêchement.",
  },

  /* ---------------------------------------------------------- */
  {
    id: "bureau",
    nom: "LE BUREAU LUI-MÊME",
    type: "PORTFOLIO",
    graine: 88,
    repliques: [
      "Je suis ce bureau. Le site où vous vous trouvez.",
      "Poste-frontière, papiers, tampons, terminal. Aucune image, aucune librairie.",
      "Un peu récursif, je sais. Tamponnez quand même.",
    ],
    docs: [
      {
        kind: "passeport",
        titre: "BUREAU DES ENTRÉES",
        sous: "PORTFOLIO INTERACTIF",
        photo: true,
        champs: [
          ["TYPE", "Portfolio jouable"],
          ["STACK", "HTML · CSS · JS vanilla"],
          ["IMAGES", "Aucune : tout est dessiné"],
          ["VISAGES", "Pixel art généré par graine"],
          ["AUDIO", "Synthèse WebAudio"],
          ["ANNÉE", "2026"],
        ],
      },
      {
        kind: "note",
        titre: "RAPPORT TECHNIQUE",
        texte: "Les candidats sont des bustes en pixel art construits pixel par pixel sur un canvas, avec ombrage directionnel, clignement des yeux et respiration. Les bruitages sont synthétisés à la volée : le site ne charge pas un seul fichier binaire.",
        points: [
          "Amorçage CRT et briefing avant le service",
          "Documents déplaçables, agrandissables, tamponnables",
          "Terminal avec commandes documentées… et d'autres non",
          "Registre d'anomalies extensible",
          "Adapté au mobile : les papiers s'empilent",
        ],
      },
      {
        kind: "permis",
        titre: "AUTORISATION D'ACCÈS",
        texte: "Esthétique inspirée des jeux de poste-frontière et des portfolios-scènes interactifs.",
        liens: [{ label: "CODE SOURCE", url: "https://github.com/AyoubO22/undercover/tree/main/portfolio" }],
      },
    ],
    oui: "Approuvé par son propre auteur. Le comble.",
    non: "Refuser le bureau depuis le bureau. Audacieux.",
  },

  /* ---------------------------------------------------------- */
  {
    id: "formation",
    nom: "DOSSIER DE FORMATION",
    type: "PARCOURS",
    graine: 4242,
    repliques: [
      "Dossier scolaire. Erasmushogeschool Brussel.",
      "Les relevés sont à l'intérieur : ce qui a été étudié, et ce qui en est sorti.",
      "Trois langues de travail, si la question se pose.",
    ],
    docs: [
      {
        kind: "passeport",
        titre: "ERASMUSHOGESCHOOL BRUSSEL",
        sous: "ENSEIGNEMENT SUPÉRIEUR · BRUXELLES",
        photo: true,
        champs: [
          ["ÉTABLIS.", "Erasmushogeschool Brussel"],
          ["VILLE", "Bruxelles, Belgique"],
          ["FILIÈRE", "[à compléter dans data.js]"],
          ["ANNÉE", "[à compléter]"],
          ["LANGUES", "FR · NL · EN"],
        ],
      },
      {
        kind: "note",
        titre: "MATIÈRES ATTESTÉES PAR LES TRAVAUX",
        texte: "Les dépôts rendus couvrent une gamme large : .NET et C#, Java et Spring, PHP et Laravel, Python et analyse de données, conception d'applications, et un projet d'intégration inter-services en équipe.",
        points: [
          "Integration Project — messagerie, Salesforce, équipe",
          "Generative Application Design — plateforme de recrutement",
          "Java Frameworks — application Spring Boot multilingue",
          "Développement .NET — applications WPF, ASP.NET et MAUI",
          "Laravel — API et application web",
          "Python — traitement et visualisation de données",
        ],
      },
    ],
    oui: "Le dossier suit son cours.",
    non: "Je repasserai au prochain semestre.",
  },

  /* ---------------------------------------------------------- */
  {
    id: "contact",
    nom: "COURSIER DU BUREAU",
    type: "COURRIER",
    graine: 777,
    repliques: [
      "Pli officiel pour l'inspecteur.",
      "Coordonnées de contact. À transmettre à qui les demande.",
      "Signez ici, et je disparais.",
    ],
    docs: [
      {
        kind: "passeport",
        titre: "FICHE DE CONTACT",
        sous: "TRANSMISSION AUTORISÉE",
        photo: true,
        champs: [
          ["NOM", "Ayoub Ouaadoud"],
          ["POSTE", "Développeur"],
          ["VILLE", "Bruxelles, BE"],
          ["GITHUB", "@AyoubO22"],
          ["LINKEDIN", "ayoub-ouaadoud"],
          ["COURRIEL", "ayoub.ouaadoud@student.ehb.be"],
        ],
      },
      {
        kind: "permis",
        titre: "VOIES DE CONTACT",
        texte: "Le bureau reçoit les propositions de stage, de poste et de collaboration.",
        liens: [
          { label: "LINKEDIN", url: "https://www.linkedin.com/in/ayoub-ouaadoud-5a9550293" },
          { label: "GITHUB", url: "https://github.com/AyoubO22" },
          { label: "COURRIEL", url: "mailto:ayoub.ouaadoud@student.ehb.be" },
        ],
      },
    ],
    oui: "Pli remis. Bonne continuation.",
    non: "Le pli restera sans réponse, alors.",
  },
];

/* ---------- Dossier caché : n'arrive qu'à la fin du service ---------- */
const DOSSIER_FINAL = {
  id: "inspecteur",
  nom: "L'INSPECTEUR",
  type: "PERSONNEL",
  graine: 2026,
  repliques: [
    "…",
    "C'est votre propre dossier, inspecteur.",
    "La file est vide. Il ne reste que vous à contrôler.",
  ],
  docs: [
    {
      kind: "passeport",
      titre: "AYOUB OUAADOUD",
      sous: "DÉVELOPPEUR · BRUXELLES",
      photo: true,
      champs: [
        ["MATRICULE", "EHB-0142"],
        ["DOMAINES", "iOS · Web · Back-end"],
        ["LANGUES", "FR · NL · EN"],
        ["STATUT", "En service"],
      ],
    },
    {
      kind: "note",
      titre: "APPRÉCIATION",
      texte: "Passe d'une plateforme à l'autre sans s'y perdre : SwiftUI un mois, React le suivant, Node et files de messages le troisième. Finit ce qu'il commence et le met en ligne.",
      points: ["Ce bureau grandira : d'autres dossiers arrivent."],
    },
    {
      kind: "permis",
      titre: "VOIES DE CONTACT",
      texte: "Disponible pour un stage, un premier poste ou un projet.",
      liens: [
        { label: "LINKEDIN", url: "https://www.linkedin.com/in/ayoub-ouaadoud-5a9550293" },
        { label: "GITHUB", url: "https://github.com/AyoubO22" },
        { label: "COURRIEL", url: "mailto:ayoub.ouaadoud@student.ehb.be" },
      ],
    },
  ],
  oui: "Vous vous êtes approuvé vous-même. Personne ne dira rien.",
  non: "Sévère, mais honnête.",
};

/* ============================================================
   LE RÈGLEMENT (les onglets du livret)
   ============================================================ */
const REGLEMENT = [
  {
    tab: "PROFIL",
    titre: "DOSSIER DE L'INSPECTEUR",
    sous: "SECTION 1 — IDENTITÉ",
    paras: [
      "Ayoub Ouaadoud, développeur, Bruxelles. Étudiant à l'Erasmushogeschool Brussel.",
      "Je ne suis pas installé sur une seule plateforme : applications natives en Swift pour iOS et macOS, applications web en React et TypeScript, services back-end en Node.js autour d'une file de messages. Les cours ont ajouté .NET, Java, Laravel et Python.",
      "Ce qui revient d'un projet à l'autre : finir, mettre en ligne, documenter assez pour qu'un autre puisse reprendre. Un dépôt sans README est un projet à moitié rendu.",
    ],
    listeTitre: "PRINCIPES DE SERVICE",
    liste: [
      "<b>Livré</b> — un projet en ligne vaut mieux qu'un projet parfait.",
      "<b>Honnête</b> — mes README distinguent ce qui tourne de ce qui est illustratif.",
      "<b>Sans dépendance inutile</b> — comprendre avant d'installer.",
      "<b>En équipe</b> — le projet d'intégration s'est joué à plusieurs, avec revues et CI.",
    ],
  },
  {
    tab: "COMPÉTENCES",
    titre: "AUTORISATIONS TECHNIQUES",
    sous: "SECTION 2 — HABILITATIONS (AUTO-ÉVALUATION)",
    barres: [
      ["JS / TYPESCRIPT", 85],
      ["REACT / TAILWIND", 80],
      ["SWIFT / SWIFTUI", 75],
      ["GIT / CI-CD", 75],
      ["NODE.JS / API", 70],
      ["PYTHON", 65],
      ["SQL / DONNÉES", 60],
      ["C# / .NET", 60],
      ["JAVA / SPRING", 55],
      ["PHP / LARAVEL", 55],
    ],
    listeTitre: "AUTRES MENTIONS",
    liste: [
      "<b>Intégration</b> — RabbitMQ, XML/XSD, Salesforce, Docker.",
      "<b>Interfaces</b> — SwiftUI, Radix/shadcn, Tailwind, CSS à la main.",
      "<b>APIs tierces</b> — RAWG, PokéAPI, Riot Games, Discord, Google Apps Script.",
      "<b>Outillage</b> — GitHub Actions, Vite, Xcode, ESLint.",
      "<b>Langues</b> — français, néerlandais, anglais.",
    ],
  },
  {
    tab: "PARCOURS",
    titre: "REGISTRE CHRONOLOGIQUE",
    sous: "SECTION 3 — ANTÉCÉDENTS",
    listeTitre: "ENTRÉES ENREGISTRÉES",
    liste: [
      "<b>2026 —</b> Gameboxd, application iOS en SwiftUI (MVVM, API RAWG, widget, tests).",
      "<b>2026 —</b> Service d'intégration CRM en équipe : RabbitMQ, Salesforce, Docker.",
      "<b>2026 —</b> Encyclopédie Pokémon compétitif : React, TypeScript, PokéAPI.",
      "<b>2026 —</b> Eylen Kliniek : site d'un cabinet médical, en ligne.",
      "<b>2026 —</b> Corplol, Sanzo Outfit Matcher, plateforme de recrutement, Undercover.",
      "<b>2025 —</b> Credibill : suite d'applications .NET (WPF, ASP.NET, MAUI). API Laravel.",
      "<b>2024 —</b> GamerGalaxy (Laravel), Anderlechtse Gazette (Spring Boot), Python/Pandas.",
      "<b>—</b> Erasmushogeschool Brussel, Bruxelles.",
    ],
    paras: [
      "Le registre ne contient que des travaux réellement rendus ; plusieurs autres dépôts sont privés (projets de cours et applications clientes).",
    ],
  },
  {
    tab: "CONTACT",
    titre: "VOIES OFFICIELLES",
    sous: "SECTION 4 — CORRESPONDANCE",
    paras: [
      "Le bureau reçoit les propositions de stage, de premier poste et de collaboration.",
    ],
    listeTitre: "ADRESSES",
    liste: [
      "<b>Courriel</b> — ayoub.ouaadoud@student.ehb.be",
      "<b>LinkedIn</b> — linkedin.com/in/ayoub-ouaadoud",
      "<b>GitHub</b> — github.com/AyoubO22",
      "<b>Poste</b> — Bruxelles, Belgique",
    ],
  },
  {
    tab: "ADDENDA",
    titre: "NOTE À L'ATTENTION DU PROPRIÉTAIRE",
    sous: "SECTION 5 — MAINTENANCE",
    paras: [
      "Tout le contenu de ce bureau tient dans js/data.js. Les mécaniques sont ailleurs et n'ont pas besoin d'être touchées.",
    ],
    listeTitre: "OÙ MODIFIER QUOI",
    liste: [
      "<b>Un projet</b> — un objet dans DOSSIERS (id, nom, graine, repliques, docs).",
      "<b>Ce livret</b> — le tableau REGLEMENT.",
      "<b>Une anomalie</b> — js/eggs.js, tableau ANOMALIES.",
      "<b>Une commande</b> — js/terminal.js, objet COMMANDES.",
      "<b>Un visage</b> — changez la graine : le buste est redessiné.",
    ],
  },
];
