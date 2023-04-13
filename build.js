const fs = require('fs');
const pug = require('pug');

const { compileSassAndSave } = require('compile-sass'); 



async function getJson() {
    const json = require("./data.json")
    return json;
}

async function loadHTML() {
    const compilePug = pug.compileFile('index.pug');
    const compiledHtml = await compilePug(
        { news: await getJson() }
    )
    return compiledHtml;
}

const build = async () => {
    const content = await loadHTML();

    fs.writeFile('./public/index.html', content, err => {
        if (err) {
            console.error(err);
        }
        console.log("successfull!")
    });
    await compileSassAndSave('scss/main.scss', 'public/css/');
}
build()