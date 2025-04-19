import { Message } from 'src/entities/message';

export class ChatRequestDTO {
  ownerId: string;
}

export class ChatResponseDTO {
  email: string;
  data: {
    title: string;
    messages: Message[];
  }[];
}

export class ChatUpdateRequestDTO {
  _id: string;
  title: string;
  messages: Message[];
}
