import { Test, TestingModule } from '@nestjs/testing';
import { WordsByTopicController } from './words-by-topic.controller';

describe('WordsByTopicController', () => {
  let controller: WordsByTopicController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WordsByTopicController],
    }).compile();

    controller = module.get<WordsByTopicController>(WordsByTopicController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
