import { Test, TestingModule } from '@nestjs/testing';
import { DrinksResolver } from './drinks.resolver';

describe('DrinksResolver', () => {
  let resolver: DrinksResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DrinksResolver],
    }).compile();

    resolver = module.get<DrinksResolver>(DrinksResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
