import fastify from 'fastify';

// create http server with fastify
const server = fastify({ logger: true });

// define a route
server.get('/', async (request, reply) => {
  return { hello: 'world' };
});

server.listen({ port: 3000 }, (err, address) => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }
  server.log.info(`server listening on ${address}`);
});