export interface GetWordsByTopicReqDTO {
  cursor?: string;
  limit?: number;
  search?: string;
  topic?: string;
  part_of_speech?: string;
}
