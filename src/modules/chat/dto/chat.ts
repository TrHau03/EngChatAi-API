import { Message } from 'src/entities/message';

export class ChatRequestDTO {
  ownerId: string;
}

export class ChatResponseDTO {
  ownerId: string;
  messages: Message[];
}

export class ChatUpdateRequestDTO {
  messages: Message[];
}
