import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import * as Express from 'express';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import { RegisterResolver } from './modules/User/Register';

const main = async () => {
  await createConnection();
  const schema = await buildSchema({
    resolvers: [RegisterResolver],
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
