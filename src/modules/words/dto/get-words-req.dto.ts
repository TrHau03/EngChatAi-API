export interface GetListWordsReqDTO {
  cursor?: string;
  limit: number;
  search: string;
  level?: string;
  partOfSpeech?: string;
}
