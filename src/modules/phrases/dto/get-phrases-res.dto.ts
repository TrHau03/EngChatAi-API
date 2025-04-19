export interface Phrases {
  word: string;
  level: string;
  pronunciation: {
    uk: string;
    us: string;
  };
}

export interface GetPhrasesResDTO {
  phrases: Phrases[];
  cursor: any | null;
  isEndList: boolean;
}
