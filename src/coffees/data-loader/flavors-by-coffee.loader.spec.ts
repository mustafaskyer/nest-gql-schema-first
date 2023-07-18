import { Test, TestingModule } from '@nestjs/testing';
import { FlavorsByCoffeeLoader } from './flavors-by-coffee.loader';

describe('FlavorsByCoffeeLoader', () => {
  let provider: FlavorsByCoffeeLoader;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FlavorsByCoffeeLoader],
    }).compile();

    provider = module.get<FlavorsByCoffeeLoader>(FlavorsByCoffeeLoader);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
