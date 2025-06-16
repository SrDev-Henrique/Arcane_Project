export interface ContentItem {
  image?: string;
  content: string;
}

export interface JourneyItem {
  image?: string;
  quote?: string;
  content: string;
}

export interface AboutBlock {
  src: string[];
  title: string[];
  content: string[];
}

export interface ConclusionItem {
  content: string;
}

export interface PlaylistItem {
  songName: string;
  artistName: string;
  imgSrc: string;
}

export interface CharacterData {
  theme: string;
  color: string;
  secondaryColor: string;
  icon: string;
  heroImage: string;
  name: string;
  lastName: string;
  description: string;
  quote: string;
  personalidade: AboutBlock;
  aparencia: AboutBlock;
  habilidades: AboutBlock;
  jornada: JourneyItem[];
  temporada1: ContentItem[];
  temporada2: ContentItem[];
  conclusion: ConclusionItem[];
  playlist: PlaylistItem[];
}
