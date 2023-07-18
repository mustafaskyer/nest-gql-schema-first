import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import * as GraphQLTypes from '../graphql-types';
import { ParseIntPipe } from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { Coffee } from './entities/coffee.entity';
import { CreateCoffeeInput } from './dto/create-coffee.input';
import { UpdateCoffeeInput } from './dto/update-coffee.input';
import { PubSub } from 'graphql-subscriptions';

@Resolver()
export class CoffeesResolver {
  constructor(
    private readonly coffeesService: CoffeesService,
    private readonly pubSub: PubSub,
  ) {}
  @Query('coffees')
  async findAllCoffees(): Promise<GraphQLTypes.Coffee[]> {
    return this.coffeesService.findAll();
  }

  @Query('coffee')
  async findOne(
    @Args('id', ParseIntPipe) id: string,
  ): Promise<GraphQLTypes.Coffee> {
    return this.coffeesService.findOne(id);
  }

  @Mutation('createCoffee')
  async createCoffee(
    @Args('createCoffeeInput')
    createCoffeeInput: CreateCoffeeInput,
  ): Promise<GraphQLTypes.Coffee> {
    return this.coffeesService.create(createCoffeeInput);
  }

  @Mutation('updateCoffee')
  async updateCoffee(
    @Args('id') id: string,
    @Args('updateCoffeeInput')
    updateCoffeeInput: UpdateCoffeeInput,
  ) {
    return this.coffeesService.update(id, updateCoffeeInput);
  }

  @Mutation('removeCoffee')
  async removeCoffee(@Args('id') id: string): Promise<Coffee> {
    return this.coffeesService.remove(id);
  }

  @Subscription('coffeeAdded')
  coffeeAdded() {
    return this.pubSub.asyncIterator('coffeeAdded');
  }
}
