export interface WordByTopic {
  word: string;
  part_of_speech: string;
  topic: string;
  pronunciation: {
    uk: string;
    us: string;
  };
}
export interface GetWordsByTopicResDTO {
  wordsByTopic: WordByTopic[];
  cursor: any | null;
  isEndList: boolean;
}
