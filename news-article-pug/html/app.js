async function getJson() {
    let response = await fetch("./data.json");
    let data = await response.json()
    return data;
}

async function main(){
    console.log("Hellow")
    jsondata = await getJson()
    console.log(jsondata)
}
const arr = [1,2,3]
main()