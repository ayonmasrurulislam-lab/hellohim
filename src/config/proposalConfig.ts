/**
 * Proposal Website Configuration
 * 
 * Customize all texts, dates, photos, names, and music easily here.
 */

export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  image: string;
  altText: string;
}

export interface GalleryPhoto {
  id: string;
  image: string;
  caption: string;
  rotation: number; // slight polaroid tilt angle in degrees
}

export interface ProposalConfig {
  partnerName: string;
  partnerNickname?: string;
  proposerName: string;
  introMessage: string;
  heroSubtitle: string;
  secretLoveNote: string;
  timelineEvents: TimelineEvent[];
  galleryPhotos: GalleryPhoto[];
  thingsILove: string[];
  starryQuote: string;
  proposalMessage: string;
  proposalQuestion: string;
  celebrationTitle: string;
  celebrationSubtitle: string;
  celebrationFinalNote: string;
  customAudioUrl?: string; // Optional custom MP3 URL. If omitted, built-in ambient piano synthesizer plays automatically.
}

export const proposalConfig: ProposalConfig = {
  partnerName: "Khandaker Him",
  proposerName: "Ayon",
  introMessage: "Khandaker Him… this is for you.",
  heroSubtitle: "A little story of us, written in the stars, just for you.",
  secretLoveNote: "From the very first day we spoke, you brought a warmth into my life that I had never known before. You are my morning peace, my midnight smile, and the best thing that has ever happened to me. I love you with all my heart, Khandaker Him. ❤️",
  
  timelineEvents: [
    {
      id: "how-we-met",
      date: "The First Chapter · How We Met",
      title: "The Moment Our Worlds Collided",
      description: "It started with a simple hello and a spark that caught me completely off guard. From that very first conversation, the entire room seemed to quiet down, and I knew deep in my soul that you were someone truly extraordinary.",
      image: "/src/assets/images/story_how_we_met_1794436334323.jpg",
      altText: "Cozy cafe table bathed in golden sunlight with coffee and open book"
    },
    {
      id: "first-date",
      date: "The First Date · Magic In The Air",
      title: "Hours That Felt Like Minutes",
      description: "Under the warm glow of evening lights, we talked about our dreams, laughed until our sides hurt, and lost all track of time. That night on the way home, I couldn't stop smiling because my heart already knew.",
      image: "/src/assets/images/story_first_date_1794436334693.jpg",
      altText: "Romantic evening dining terrace with sparkling fairy lights and candles"
    },
    {
      id: "special-trip",
      date: "Our Journey · A Special Moment",
      title: "Chasing Sunsets Together",
      description: "Standing beside you, looking out at the endless horizon as the sky turned shades of rose and gold. In that gentle breeze, holding your hand, I realized that any place in the world is paradise as long as you're with me.",
      image: "/src/assets/images/story_special_trip_1794436335566.jpg",
      altText: "Scenic clifftop overlooking a breathtaking golden sunset over the sea"
    },
    {
      id: "when-i-knew",
      date: "The Realization · When I Knew",
      title: "Forever Became So Clear",
      description: "It wasn't just in the grand moments, but in the quiet ones—the effortless laughs, the quiet comfortable silence, and how your gentle voice can melt away any worry. That was when I knew: you are my forever.",
      image: "/src/assets/images/story_when_i_knew_1794436336022.jpg",
      altText: "Romantic starlit balcony with warm lanterns overlooking city lights"
    }
  ],

  galleryPhotos: [
    {
      id: "photo-1",
      image: "/src/assets/images/story_holding_hands_1794436335653.jpg",
      caption: "The day I fell even harder",
      rotation: -2
    },
    {
      id: "photo-2",
      image: "/src/assets/images/story_how_we_met_1794436334323.jpg",
      caption: "Our quiet golden moments",
      rotation: 3
    },
    {
      id: "photo-3",
      image: "/src/assets/images/story_first_date_1794436334693.jpg",
      caption: "Your laugh, my favorite melody",
      rotation: -3
    },
    {
      id: "photo-4",
      image: "/src/assets/images/story_special_trip_1794436335566.jpg",
      caption: "Every adventure is sweeter with you",
      rotation: 2
    },
    {
      id: "photo-5",
      image: "/src/assets/images/story_when_i_knew_1794436336022.jpg",
      caption: "Under the stars with my favorite person",
      rotation: -1
    },
    {
      id: "photo-6",
      image: "/src/assets/images/story_holding_hands_1794436335653.jpg",
      caption: "Holding hands, holding forever",
      rotation: 2.5
    }
  ],

  thingsILove: [
    "Your radiant smile that brightens even the cloudiest of days",
    "The effortless and adorable way you laugh when you're truly happy",
    "How you turn the simplest, most ordinary days into unforgettable memories",
    "Your gentle kindness, pure heart, and the warmth you give to everyone",
    "The peaceful feeling of home whenever I look into your eyes",
    "How you make me want to be the best version of myself every single day"
  ],

  starryQuote: "Out of all the stars in the vast universe, my heart found you.",

  proposalMessage: "Khandaker Him, from the moment you entered my life, every prayer of mine found its answer. You are my greatest joy, my deepest peace, and my truest love. I want to spend all my tomorrows making you smile, holding your hand through every chapter, and loving you more with each passing breath.",

  proposalQuestion: "will you marry me?",

  celebrationTitle: "She said YES! 🎉",
  celebrationSubtitle: "Forever starts now, Khandaker Him ❤️",
  celebrationFinalNote: "I love you endlessly, unconditionally, and for all of time. — Ayon"
};
