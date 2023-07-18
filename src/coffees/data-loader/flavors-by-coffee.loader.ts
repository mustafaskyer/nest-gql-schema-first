import { Injectable, Scope } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { Flavor } from '../entities/flavor.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Coffee } from '../entities/coffee.entity';
import { In, Repository } from 'typeorm';
@Injectable({ scope: Scope.REQUEST })
export class FlavorsByCoffeeLoader extends DataLoader<number, Flavor[]> {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,
  ) {
    super((keys) => this.batchLoadFn(keys));
  }
  private async batchLoadFn(coffeeIds: readonly number[]): Promise<Flavor[][]> {
    const coffeeWithFlavors = await this.coffeeRepository.find({
      select: ['id'],
      relations: {
        flavors: true,
      },
      where: {
        id: In(coffeeIds as number[]),
      },
    });
    return coffeeWithFlavors.map((coffee) => coffee.flavors);
  }
}
