const fastify = require('fastify')({ logger: true });
const path = require('path');
const pug = require('pug');

fastify.register(require('@fastify/static'), {
    root: path.join(__dirname, 'public'),
    prefix: '/public/'
});

async function getJson() {
    const json = require("./data.json")
    return json;
}

fastify.get('/', async function (request, reply) {
    const compilePug = pug.compileFile('index.pug');
    const html = await compilePug(
        { news: await getJson() }
    )
    reply.type('text/html').send(html);
})

fastify.listen({ port: 3000 }, function (err, address) {
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }
})