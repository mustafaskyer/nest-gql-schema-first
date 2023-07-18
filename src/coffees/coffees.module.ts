import { Module } from '@nestjs/common';
import { CoffeesResolver } from './coffees.resolver';
import { CoffeesService } from './coffees.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';
import { CoffeeFlavorsResolver } from './coffee-flavors.resolver';
import { PubSubModule } from 'src/pub-sub/pub-sub.module';
import { FlavorsByCoffeeLoader } from './data-loader/flavors-by-coffee.loader';

@Module({
  imports: [TypeOrmModule.forFeature([Coffee, Flavor]), PubSubModule],
  providers: [
    CoffeesResolver,
    CoffeesService,
    CoffeeFlavorsResolver,
    FlavorsByCoffeeLoader,
  ],
})
export class CoffeesModule {}
