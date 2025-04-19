export interface GetPhrasesReqDto {
  cursor?: string;
  limit: number;
  search: string;
  level?: string;
  partOfSpeech?: string;
}
