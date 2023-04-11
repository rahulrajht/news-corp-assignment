const fs = require('fs');
const pug = require('pug');



async function getJson() {
    const json = require("./data.json")
    return json;
}

async function  loadHTML(){
    const compilePug = pug.compileFile('index.pug');
    const compiledHtml = await compilePug(
        { news: await getJson() }
    )
    return compiledHtml;
}

const build = async ()=>{
    const content = await loadHTML();

fs.writeFile('./public/index.html', content, err => {
  if (err) {
    console.error(err);
  }
  console.log("successfully")
  // file written successfully
});
}
build()