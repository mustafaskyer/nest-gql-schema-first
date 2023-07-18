import { Test, TestingModule } from '@nestjs/testing';
import { CoffeeFlavorsResolver } from './coffee-flavors.resolver';

describe('CoffeeFlavorsResolver', () => {
  let resolver: CoffeeFlavorsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoffeeFlavorsResolver],
    }).compile();

    resolver = module.get<CoffeeFlavorsResolver>(CoffeeFlavorsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
