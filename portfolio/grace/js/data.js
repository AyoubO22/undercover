// ============================================================
//  SITE DE GRÂCE — CONTENU
// ------------------------------------------------------------
//  👉 C'est LE fichier à modifier. Chaque projet est un objet
//     de l'inventaire : un nom, un emblème (tiré de sa graine),
//     une description, et ses effets — les faits techniques.
// ============================================================

const PORTEUR = {
  nom: "AYOUB OUAADOUD",
  titre: "DÉVELOPPEUR",
  lieu: "BRUXELLES, BELGIQUE",
  ecole: "ERASMUSHOGESCHOOL BRUSSEL",
  niveau: 26,                      // un niveau par dépôt
  github: "https://github.com/AyoubO22",
  linkedin: "https://www.linkedin.com/in/ayoub-ouaadoud-5a9550293",
  email: "ayoub.ouaadoud@student.ehb.be",
};

/* ============================================================
   L'INVENTAIRE
   ------------------------------------------------------------
   {
     id, nom, type, graine (dessine l'emblème),
     rarete: 1 à 3    (3 = pièce maîtresse)
     poids: "12.5"    (taille du projet, pour la ligne de stats)
     description: le texte d'objet — évocateur, mais vrai
     effets: [ les faits techniques ]
     liens: [{ label, url }]
   }
   ============================================================ */

const INVENTAIRE = [
  {
    id: "gameboxd",
    nom: "GAMEBOXD",
    type: "Application iOS · SwiftUI",
    graine: 51027,
    rarete: 3,
    poids: "52 fichiers",
    annee: "2026",
    description: "Un registre où consigner chaque partie jouée : la note, la critique, la date. Ce que l'on a traversé finit par dire qui l'on est.",
    effets: [
      "Architecture MVVM — Models, Services, ViewModels, Views",
      "Fiches et recherche de jeux via l'API RAWG",
      "Extension widget (WidgetKit)",
      "Tests unitaires et intégration continue GitHub Actions",
      "Localisation française et anglaise",
      "Clés d'API tenues hors du dépôt (xcconfig)",
    ],
    liens: [{ label: "CODE SOURCE", url: "https://github.com/AyoubO22/Gameboxd" }],
  },
  {
    id: "pokemon",
    nom: "ENCYCLOPÉDIE COMPÉTITIVE",
    type: "Plateforme web · React / TypeScript",
    graine: 25025,
    rarete: 3,
    poids: "61 composants",
    annee: "2026",
    description: "Mille vingt-cinq créatures, neuf cents attaques, et la longue patience de celui qui veut comprendre pourquoi une équipe tient debout.",
    effets: [
      "Quinze sections de stratégie écrites, des types au teambuilding",
      "Pokédex complet connecté à PokéAPI",
      "Calculateur de dégâts et constructeur d'équipe",
      "Analyse de couverture, faiblesses et rôles en temps réel",
      "Import d'équipe depuis un paste Pokémon Showdown",
      "Quiz de 74 questions, thème clair/sombre, responsive",
    ],
    liens: [{ label: "CODE SOURCE", url: "https://github.com/AyoubO22/Pokemon-guide" }],
  },
  {
    id: "crm",
    nom: "PASSAGE DES MESSAGES",
    type: "Service d'intégration · Node.js",
    graine: 8801,
    rarete: 3,
    poids: "49 schémas",
    annee: "2026",
    description: "Sept systèmes qui ne parlent pas la même langue, et une seule voie entre eux. Ce qui se perd ici ne se retrouve nulle part ailleurs.",
    effets: [
      "Consomme des messages XML sur plusieurs files RabbitMQ",
      "Valide la structure et les schémas XSD (49 schémas)",
      "Résout ou crée un identifiant maître auprès du service d'identité",
      "Met à jour Salesforce, puis réémet vers les systèmes en aval",
      "Files de reprise et file morte pour les messages non rejouables",
      "Docker, Compose, journalisation Winston, CI sur chaque poussée",
      "Projet d'équipe — revues de code et intégration continue",
    ],
    liens: [{ label: "CODE SOURCE", url: "https://github.com/IntegrationProject-Groep1/CRM" }],
  },
  {
    id: "corplol",
    nom: "CORPLOL",
    type: "Application de bureau · Python",
    graine: 4400,
    rarete: 2,
    poids: "6 modules",
    annee: "2026",
    description: "Réunir cinq joueurs de force inégale et en faire deux camps qui s'affrontent à armes égales. Un vieux problème, résolu par le calcul.",
    effets: [
      "Roster : rang, rôles, pseudo, disponibilités hebdomadaires",
      "Génération d'équipes 5v5 équilibrées par score et par rôle",
      "Statistiques Riot Games : KDA, rang, parties récentes",
      "Historique des matchs et suivi des victoires",
      "Export de la composition formatée pour Discord",
      "Interface CustomTkinter, licence MIT, versions publiées",
    ],
    liens: [{ label: "CODE SOURCE", url: "https://github.com/AyoubO22/corplol" }],
  },
  {
    id: "eylen",
    nom: "EYLEN KLINIEK",
    type: "Site client · En ligne",
    graine: 6031,
    rarete: 2,
    poids: "1 page",
    annee: "2026",
    description: "Un commanditaire réel, un public réel, une adresse que l'on peut ouvrir. Le seul travail qui compte vraiment est celui qui est livré.",
    effets: [
      "Site vitrine d'un cabinet de médecine esthétique et fonctionnelle",
      "Page unique, sans framework, structurée pour la lecture mobile",
      "Déploiement automatisé à chaque poussée (GitHub Actions)",
      "Contenu orienté patient, bilingue",
    ],
    liens: [
      { label: "VOIR LE SITE", url: "https://zohra-fellah.github.io/Eylen-Kliniek/" },
      { label: "CODE SOURCE", url: "https://github.com/Zohra-Fellah/Eylen-Kliniek" },
    ],
  },
  {
    id: "sanzo",
    nom: "NUANCIER DE SANZO",
    type: "Application macOS · SwiftUI",
    graine: 15948,
    rarete: 2,
    poids: "348 palettes",
    annee: "2026",
    description: "Cent cinquante-neuf teintes relevées par un peintre japonais dans les années trente. Elles savaient déjà ce qui va ensemble.",
    effets: [
      "Moteur de suggestion vestimentaire fondé sur les palettes de Sanzo Wada",
      "Sélection par pipette, code hexadécimal ou nuancier complet",
      "Propositions réparties en haut / bas / veste / accessoire",
      "Application macOS native, licence MIT",
    ],
    liens: [{ label: "CODE SOURCE", url: "https://github.com/AyoubO22/SanzoOutfitMatcher" }],
  },
  {
    id: "recrutement",
    nom: "REGISTRE DES CANDIDATURES",
    type: "Plateforme web · React / TypeScript",
    graine: 7212,
    rarete: 2,
    poids: "72 composants",
    annee: "2026",
    description: "Trois regards sur un même dossier : celui qui recrute, celui qui décide, et celui qui attend une réponse. Le troisième est trop souvent oublié.",
    effets: [
      "Processus complet : demande de poste, publication, candidature, décision",
      "Recruteur : gestion des postes et tri des candidatures",
      "Manager : désignation des évaluateurs et décision finale",
      "Candidat : suivi transparent de l'état de sa candidature",
      "Évaluation structurée plutôt qu'appréciation libre",
      "Tableaux de bord et graphiques de suivi (Recharts)",
    ],
    liens: [{ label: "CODE SOURCE", url: "https://github.com/AyoubO22/HR-App" }],
  },
  {
    id: "undercover",
    nom: "LE MOT DE L'INFILTRÉ",
    type: "Jeu web · En ligne",
    graine: 1337,
    rarete: 1,
    poids: "3 fichiers",
    annee: "2026",
    description: "Tous reçoivent le même mot. Sauf un, qui en reçoit un autre. Et un dernier, qui n'a rien du tout et devra faire semblant.",
    effets: [
      "Jeu de société local : un seul téléphone qui circule",
      "Distribution des rôles et équilibrage automatique",
      "Vote, élimination, dernière chance laissée à Mr. White",
      "Paires de mots personnalisées, enregistrées sur l'appareil",
      "HTML, CSS et JavaScript purs — aucune dépendance",
    ],
    liens: [
      { label: "JOUER", url: "https://ayoubo22.github.io/undercover/" },
      { label: "CODE SOURCE", url: "https://github.com/AyoubO22/undercover" },
    ],
  },
  {
    id: "crema",
    nom: "L'INVITATION",
    type: "Page événement · RSVP",
    graine: 5241,
    rarete: 1,
    poids: "1 page",
    annee: "2026",
    description: "Il n'y a pas de seconde soirée. Le formulaire devait fonctionner du premier coup, et il fallait prévoir qu'il ne le fasse pas.",
    effets: [
      "Réponses envoyées vers une feuille Google via Apps Script",
      "Bascule automatique sur l'envoi courriel si le service ne répond pas",
      "Formulaire tolérant aux pannes du service tiers",
      "Page non indexée — invitation privée",
    ],
    liens: [{ label: "CODE SOURCE", url: "https://github.com/AyoubO22/Crema" }],
  },
  {
    id: "grace",
    nom: "CE SITE DE GRÂCE",
    type: "Portfolio · HTML / CSS / JS",
    graine: 999,
    rarete: 2,
    poids: "0 image",
    annee: "2026",
    description: "Le lieu où vous vous tenez. Tout ce que vous y voyez — les emblèmes, les braises, le son — est calculé, jamais chargé.",
    effets: [
      "Emblèmes héraldiques générés au code depuis une graine",
      "Braises et brume dessinées sur canvas, sans une seule image",
      "Bruitages synthétisés en WebAudio",
      "Navigation clavier complète, manette de menu au son",
      "HTML, CSS et JavaScript purs — aucune librairie",
    ],
    liens: [{ label: "CODE SOURCE", url: "https://github.com/AyoubO22/undercover/tree/main/portfolio" }],
  },
];

/* ============================================================
   LES ATTRIBUTS
   ============================================================ */
const ATTRIBUTS = [
  ["JS / TYPESCRIPT", 85, "React, Node, vanilla — le socle de la plupart des projets."],
  ["REACT / TAILWIND", 80, "Radix et shadcn, deux plateformes livrées cette année."],
  ["SWIFT / SWIFTUI", 75, "Deux applications natives : une iOS, une macOS."],
  ["GIT / CI-CD", 75, "GitHub Actions sur la quasi-totalité des dépôts."],
  ["NODE.JS / API", 70, "Service d'intégration en production d'équipe."],
  ["PYTHON", 65, "Application de bureau, API tierces, traitement de données."],
  ["SQL / DONNÉES", 60, "Modélisation et requêtes, côté cours et côté projets."],
  ["C# / .NET", 60, "WPF, ASP.NET et MAUI — série d'applications de cours."],
  ["JAVA / SPRING", 55, "Application Spring Boot multilingue avec base MySQL."],
  ["PHP / LARAVEL", 55, "Deux projets web, dont une API."],
];

const MEMOIRE = [
  ["LANGUES", "Français · Néerlandais · Anglais"],
  ["INTÉGRATION", "RabbitMQ · XML/XSD · Salesforce · Docker"],
  ["API TIERCES", "RAWG · PokéAPI · Riot Games · Discord · Apps Script"],
  ["OUTILS", "Xcode · Vite · GitHub Actions · ESLint · Figma"],
];

/* ============================================================
   LA CHRONIQUE
   ============================================================ */
const CHRONIQUE = [
  ["2026", "Gameboxd", "Application iOS en SwiftUI : MVVM, API RAWG, widget, tests, CI."],
  ["2026", "Service d'intégration CRM", "En équipe : RabbitMQ, Salesforce, validation XSD, Docker."],
  ["2026", "Encyclopédie compétitive", "React et TypeScript, PokéAPI, calculateur et constructeur d'équipe."],
  ["2026", "Eylen Kliniek", "Site d'un cabinet médical, livré et en ligne."],
  ["2026", "Corplol · Nuancier de Sanzo · Registre des candidatures", "Python, macOS, React."],
  ["2025", "Credibill", "Suite d'applications .NET — WPF, ASP.NET, MAUI. API Laravel."],
  ["2024", "GamerGalaxy · Anderlechtse Gazette", "Laravel, Spring Boot, Python et Pandas."],
  ["—", "Erasmushogeschool Brussel", "Bruxelles. Trois langues de travail."],
];

/* ============================================================
   LES MISSIVES — messages laissés au sol
   ============================================================ */
const MISSIVES = [
  {
    texte: "Développeur en quête… tenter un stage ?",
    detail: "ayoub.ouaadoud@student.ehb.be",
    url: "mailto:ayoub.ouaadoud@student.ehb.be",
    appreciations: 12,
  },
  {
    texte: "Code par ici… vingt-six dépôts, plus bas.",
    detail: "github.com/AyoubO22",
    url: "https://github.com/AyoubO22",
    appreciations: 26,
  },
  {
    texte: "Parcours devant… mais avec vigueur.",
    detail: "linkedin.com/in/ayoub-ouaadoud",
    url: "https://www.linkedin.com/in/ayoub-ouaadoud-5a9550293",
    appreciations: 8,
  },
];
