import { Query, ResolveField, Resolver } from '@nestjs/graphql';
import * as GraphQLTypes from 'src/graphql-types';

@Resolver('DrinksResult')
export class DrinksResolver {
  @Query('drinks')
  async findAll(): Promise<GraphQLTypes.DrinksResult[]> {
    const coffees = new GraphQLTypes.Coffee();
    coffees.id = 1;
    coffees.name = 'coffee';
    coffees.brand = 'brand';

    const tea = new GraphQLTypes.Tea();
    tea.name = 'tea';
    return [tea, coffees];
  }

  @ResolveField()
  __resolveType(value: GraphQLTypes.Drink) {
    // return Object.getPrototypeOf(value).constructor.name;
    // if ('brand' in value) {
    //   return 'Coffee';
    // }
    // return 'Tea';
    if (value instanceof GraphQLTypes.Coffee) {
      return 'Coffee';
    } else if (value instanceof GraphQLTypes.Tea) {
      return 'Tea';
    }
    return null;
  }
}
