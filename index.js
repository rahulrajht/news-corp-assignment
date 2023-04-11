const fastify = require('fastify')({ logger: true });
const path = require('path');
const pug = require('pug');
// const fastifyPug = require('fastify-pug');

fastify.register(require('@fastify/static'), {
    root: path.join(__dirname, 'public'),
    prefix: '/public/'
});

// fastify.register(fastifyPug, {views: 'views'});

async function getJson() {
    const json = require("./data.json")
    return json;
}

fastify.get('/', async function (request, reply) {
    const compilePug = pug.compileFile('index.pug');
    const compiledHTML = await compilePug(
        { news: await getJson() }
    )
    
    reply.type('text/html').send(compiledHTML);
})

fastify.listen({ port: 3000 }, function (err, address) {
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }
})