import { Test, TestingModule } from '@nestjs/testing';
import { WordsByTopicService } from './words-by-topic.service';

describe('WordsByTopicService', () => {
  let service: WordsByTopicService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WordsByTopicService],
    }).compile();

    service = module.get<WordsByTopicService>(WordsByTopicService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
