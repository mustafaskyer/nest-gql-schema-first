import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Coffee } from './entities/coffee.entity';
import { UpdateCoffeeInput } from './dto/update-coffee.input';
import { CreateCoffeeInput } from './dto/create-coffee.input';
import { Flavor } from './entities/flavor.entity';
import { PubSub } from 'graphql-subscriptions';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeRepository: Repository<Coffee>,
    @InjectRepository(Flavor)
    private readonly flavorRepository: Repository<Flavor>,
    private readonly pubSub: PubSub,
  ) {}
  async findAll(): Promise<Coffee[]> {
    return this.coffeRepository.find();
  }

  async findOne(id: string): Promise<Coffee> {
    const coffee = await this.coffeRepository.findOne({ where: { id: +id } });
    if (!coffee) {
      throw new Error(`Coffee #${id} not found`);
    }
    return coffee;
  }

  async create(createCoffeeInput: CreateCoffeeInput): Promise<Coffee> {
    const flavors = await Promise.all(
      createCoffeeInput.flavors.map((name) =>
        this.preloadFlavorsByName('' + name),
      ),
    );
    const coffee = await this.coffeRepository.create({
      ...createCoffeeInput,
      flavors,
    });
    const newCoffeeEntity = await this.coffeRepository.save(coffee);
    this.pubSub.publish('coffeeAdded', { coffeeAdded: newCoffeeEntity });
    return newCoffeeEntity;
  }

  async update(
    id: string,
    updateCoffeeInput: UpdateCoffeeInput,
  ): Promise<Coffee> {
    const flavors =
      updateCoffeeInput.flavors &&
      (await Promise.all(
        updateCoffeeInput.flavors.map((name) =>
          this.preloadFlavorsByName('' + name),
        ),
      ));
    const coffee = await this.coffeRepository.preload({
      id: +id,
      ...updateCoffeeInput,
      flavors,
    });
    if (!coffee) {
      throw new Error(`Coffee #${id} not found`);
    }
    return this.coffeRepository.save(coffee);
  }

  async remove(id: string): Promise<Coffee> {
    const coffee = await this.findOne(id);
    return this.coffeRepository.remove(coffee);
  }

  private async preloadFlavorsByName(name: string): Promise<Flavor> {
    const existingFlavor = await this.flavorRepository.findOneBy({ name });
    if (existingFlavor) {
      return existingFlavor;
    }
    const flavor = await this.flavorRepository.create({ name });
    return this.flavorRepository.create(flavor);
  }
}
