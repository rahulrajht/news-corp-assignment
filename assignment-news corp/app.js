let jsondata = [];

async function getJson() {
    let response = await fetch("./data.json");
    let data = await response.json()
    return data;
}
window.addEventListener("load", (event) => {
    async function main() {
        jsondata = await getJson()
        const articles = jsondata.map((data) => generateLayout(data))

        const article = document.createElement("article")
        const leftDiv = document.createElement("div")
        const rightContainer = document.createElement("div")
        const rightDiv = document.createElement("div")
        rightContainer.append(rightDiv)
        article.append(leftDiv, rightContainer)
        document.body.appendChild(article)
        leftDiv.classList.add("left")
        rightDiv.classList.add("right")
        article.classList.add("article")
        leftDiv.append(articles[0])
        rightContainer.append(articles[1], articles[2], articles[3])

    }
    main()



    function generateLayout(data) {
        const div = document.createElement("div");
        div.classList.add("news")
        const img = document.createElement("img");
        img.src = data.image;
        img.classList.add("img")
        const h4 = document.createElement("h4");
        h4.innerHTML = "✍ "+data.Title.toUpperCase();
        const p1 = document.createElement("p");

        if (data.isExclusive) {
            const span = document.createElement("span")
            span.innerText = "EXCLUSIVE"
            span.style.color = "#6CB4EE";
            span.style.marginRight = "5px"
            p1.append(span, data.description)
        }
        else {
            p1.innerHTML = data.description;
        }

        const hr = document.createElement("hr");

        const info = document.createElement("div")
        info.classList.add("info-div")
        const time = document.createElement("p")
        const comment = document.createElement("p")
        comment.innerHTML = data.comments === 0 ? " " + "📨" : data.comments + "📨"
        time.innerHTML =  "⏲" +  data.time
        info.append(time, comment)

        if (data.description) {
            div.append(img, h4, p1, info)
            return div;
        }
        else {
            div.classList.add("small-news")
            const wrapDiv = document.createElement("div")
            div.append(h4, img)
            wrapDiv.append(hr, div, info)
            wrapDiv.classList.add("small-container")
            return wrapDiv
        }

    }
})

