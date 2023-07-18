import { GraphQLDefinitionsFactory } from '@nestjs/graphql';
import { join } from 'path';

const definitionsFactory = new GraphQLDefinitionsFactory();
definitionsFactory.generate({
  typePaths: ['./**/*.graphql'],
  path: join(process.cwd(), 'src/graphql-types.ts'),
  outputAs: 'class',
  watch: true,
  skipResolverArgs: true,
  defaultTypeMapping: {
    ID: 'number',
  },
});
