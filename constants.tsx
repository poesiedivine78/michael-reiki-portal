
import React from 'react';

export const COLORS = {
  primary: '#020617', // Deepest Space Blue
  secondary: '#0F172A', // Midnight Blue
  accent: '#C084FC', // Luminous Violet
  blue: '#3B82F6', // Electric Blue
  violet: '#8B5CF6',
};

export const SOCIALS = [
  { name: 'Instagram', url: '#', icon: 'Instagram' },
  { name: 'Facebook', url: '#', icon: 'Facebook' },
  { name: 'YouTube', url: '#', icon: 'Youtube' }
];

export const LINEAGE = [
  { 
    name: "Mikao Usui", 
    role: "Fondateur", 
    story: "Moine bouddhiste japonais qui a redécouvert le Reiki lors d'une méditation de 21 jours sur le Mont Kurama en 1922.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Mikao_Usui.jpg/220px-Mikao_Usui.jpg"
  },
  { 
    name: "Chujiro Hayashi", 
    role: "Maître", 
    story: "Officier de marine et médecin, il a systématisé les techniques de Reiki et ouvert la première clinique à Tokyo.",
    image: "https://upload.wikimedia.org/wikipedia/commons/b/be/Chujiro_Hayashi.jpg"
  },
  { 
    name: "Hawayo Takata", 
    role: "Maître", 
    story: "Elle a introduit le Reiki en Occident (Hawaï) et a formé les 22 premiers maîtres occidentaux.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200"
  },
  { 
    name: "Phyllis Lei Furumoto", 
    role: "Maître", 
    story: "Petite-fille de Mme Takata, elle a porté la tradition et l'organisation mondiale du Reiki Usui Shiki Ryoho.",
    image: "https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&q=80&w=200"
  },
  { 
    name: "Michael Furtak", 
    role: "Praticien Starseed", 
    story: "Maître Praticien contemporain alliant la tradition Usui aux énergies cristallines et stellaires.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200"
  }
];

export const CHAKRAS = [
  { name: "Racine", color: "#EF4444", meaning: "Ancrage & Sécurité" },
  { name: "Sacré", color: "#F97316", meaning: "Émotion & Créativité" },
  { name: "Plexus Solaire", color: "#FACC15", meaning: "Volonté & Pouvoir" },
  { name: "Cœur", color: "#22C55E", meaning: "Amour & Compassion" },
  { name: "Gorge", color: "#06B6D4", meaning: "Communication & Vérité" },
  { name: "Troisième Œil", color: "#6366F1", meaning: "Intuition & Sagesse" },
  { name: "Couronne", color: "#A855F7", meaning: "Éveil & Spiritualité" }
];

export const BLOG_POSTS = [
  {
    title: "Comment le Reiki transforme l'anxiété moderne",
    category: "Bien-être",
    date: "12 Mars 2025",
    excerpt: "Dans un monde de sur-stimulation, le Reiki offre un sanctuaire de silence et de reconnexion...",
    readTime: "5 min"
  },
  {
    title: "Les cristaux et l'éveil du chakra du cœur",
    category: "Spiritualité",
    date: "05 Fév 2025",
    excerpt: "L'émeraude et le quartz rose ne sont pas que des pierres, ce sont des amplificateurs de fréquence...",
    readTime: "8 min"
  },
  {
    title: "Transition Starseed : comprendre vos origines",
    category: "Éveil",
    date: "20 Jan 2025",
    excerpt: "Vous sentez-vous souvent 'ailleurs' ? Découvrez les signes d'une âme stellaire en incarnation...",
    readTime: "12 min"
  }
];

export const SOUL_QUIZ = {
  questions: [
    {
      id: 1,
      text: "Quel est votre besoin dominant aujourd'hui ?",
      options: [
        { label: "M'ancrer, me sentir en sécurité", result: "Usui" },
        { label: "M'éveiller, libérer ma puissance", result: "Kundalini" },
        { label: "Apaiser mon mental bruyant", result: "Usui" },
        { label: "Trouver un sens à ma vie", result: "Kundalini" }
      ]
    },
    {
      id: 2,
      text: "Comment décririez-vous votre énergie actuelle ?",
      options: [
        { label: "Éteinte, besoin d'une étincelle", result: "Kundalini" },
        { label: "Dispersée, besoin de clarté", result: "Usui" },
        { label: "Bloquée, besoin de fluidité", result: "Kundalini" },
        { label: "Tendu, besoin de douceur", result: "Usui" }
      ]
    }
  ]
};

export const TESTIMONIALS = [
  {
    author: "Sophie M.",
    role: "Artiste",
    text: "Une expérience transcendante. Michael a cette capacité rare de voir au-delà du visible.",
    videoThumb: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400"
  },
  {
    author: "Julien R.",
    role: "Entrepreneur",
    text: "Le soin Kundalini est d'une puissance insoupçonnée. J'ai retrouvé une clarté mentale.",
    videoThumb: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400"
  },
  {
    author: "Clara D.",
    role: "Infirmière",
    text: "La bienveillance de Michael est un baume pour l'âme. Ses soins Reiki m'apportent un ancrage précieux.",
    videoThumb: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400"
  }
];

export const SERVICES = [
  {
    title: "Soin Reiki Usui Traditionnel",
    price: "50€",
    duration: "60 min",
    type: "Usui" as const,
    subtitle: "L'Ancrage et l'Harmonie",
    description: "Une séance d'une heure dédiée à l'harmonisation de vos centres énergétiques. Idéal pour débuter votre parcours.",
    benefits: ["Réalignement des chakras", "Libération des tensions physiques", "Apaisement du mental", "Harmonisation de l'aura"]
  },
  {
    title: "Soin Reiki Kundalini",
    price: "60€",
    duration: "75 min",
    type: "Kundalini" as const,
    subtitle: "L'Ascension et le Feu Intérieur",
    description: "Un soin intense axé sur l'éveil de votre énergie vitale. Recommandé pour ceux cherchant une transformation profonde.",
    benefits: ["Activation de l'énergie vitale", "Libération des canaux énergétiques", "Nettoyage des mémoires anciennes", "Éveil spirituel et créatif"]
  }
];

export const FULL_TEXTS = {
  hero: {
    title: "Starseed Cosmic Angel",
    subtitle: "Un voyage céleste où l’énergie du Reiki, telle une étoile scintillante, harmonise vos chakras pour une quête sereine vers l’éveil cosmique."
  }
};

export const BIO_STORY = [
  {
    phase: "L'ORIGINE",
    title: "Un artiste incompris",
    images: ["https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?auto=format&fit=crop&q=80&w=800"],
    text: "Depuis tout petit, j'étais animé par cette soif de connaissances. Je passais beaucoup de temps dans la médiathèque à étudier les livres sur la spiritualité."
  },
  {
    phase: "LE MIRACLE",
    title: "Le réveil du Bonsaï",
    images: ["https://images.unsplash.com/photo-1512428813833-df52167ad839?auto=format&fit=crop&q=80&w=800"],
    text: "Mon premier soin fut pour mon bonsaï qui se mourait. Deux jours après avoir imposé mes mains, une belle tige verte avait repoussé. Je fus très ému."
  },
  {
    phase: "LA RUPTURE",
    title: "Vive les bouchons Lyonnais",
    images: ["https://images.unsplash.com/photo-1549488344-cbb6c34ce08b?auto=format&fit=crop&q=80&w=800"],
    text: "J'ai tout quitté. Ma maison, un travail stable. Je suis parti pour Lyon, seul face à mon destin et mes schémas défaillants."
  },
  {
    phase: "L'ACCOMPAGNEMENT",
    title: "L'Équipe Céleste",
    images: ["https://images.unsplash.com/photo-1515462277126-2dd0c162007a?auto=format&fit=crop&q=80&w=800"],
    text: "L'Univers m'a envoyé des signes : une fève d'ange, un bracelet d'émeraudes marqué d'un 'M'. 'Nous sommes là, ton équipe céleste t'accompagne'."
  },
  {
    phase: "L'ÉVEIL",
    title: "L'Inondation de Lumière",
    images: ["https://images.unsplash.com/photo-1464802686167-b939a6910659?auto=format&fit=crop&q=80&w=800"],
    text: "En méditant, mon chakra du cœur a vibré d'une lumière dorée intense. Je n'avais plus de corps, j'étais pur esprit au-dessus de la Terre."
  },
  {
    phase: "LA SIGNATURE",
    title: "Le Sourire de Yezalel",
    images: ["https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?auto=format&fit=crop&q=80&w=800"],
    text: "Une voix me souffla : 'Yezalel'. Mon ange gardien. Deux jours plus tard, dans mon thé, j'ai découvert un 'Y' et un grand sourire étoilé."
  }
];

export const FORMATIONS = [
  { date: "2009 / 2022", title: "Reiki Usui Ryoho", location: "Lignée Usui" },
  { date: "2023 - 2024", title: "Maître Praticien Reiki", location: "Starseed Cosmic Angel" }
];
