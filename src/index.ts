import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import * as Express from 'express';
import { buildSchema, Resolver, Query } from 'type-graphql';

@Resolver()
class HelloResolver {
  @Query(() => String)
  async hello() {
    return 'hello world';
  }
}

const main = async () => {
  const schema = await buildSchema({
    resolvers: [HelloResolver],
  });

  const appolloServer = new ApolloServer({ schema });

  const app = Express();

  appolloServer.applyMiddleware({ app });

  const PORT = 4000;
  app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}/graphql`);
  });
};

main();
