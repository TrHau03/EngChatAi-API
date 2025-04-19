export interface Word {
  word: string;
  part_of_speech: string;
  level: string;
  pronunciation: {
    uk: string;
    us: string;
  };
}

export interface GetListWordsResDTO {
  words: Word[];
  cursor: any | null;
  isEndList: boolean;
}
