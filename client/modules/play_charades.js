async function playCharades() {
    const url = `http://127.0.0.1:3000/play/charade`;

    const fetchResponse = await fetch(url);
    const jsonResponse = await fetchResponse.json();

    const word = jsonResponse.word;

    let main = document.querySelector("main");
    main.style.display = "none";
    let play_screen = document.getElementById("play-container");
    play_screen.style.height = "100vh";

    let count = 3;
    play_screen.innerHTML = `<h1 id="countdown">${count}</h1>`;
    count--;

    let timer = setInterval( () => {
        if (count === -2) {
            clearInterval(timer);
        } else if (count === -1) {
            play_screen.innerHTML = `
            <h1 id="countdown">${word}</h1>
            <div id="play-btns">
                <button id="skip-btn" class="btn btn-secondary">Skip</button>
                <button id="done-btn" class="btn btn-primary" onclick="done()">Done</button>
            </div>
            `;
        } else if (count === 0) {
            play_screen.innerHTML = `<h1 id="countdown">GO!</h1>`;
        } else {
            play_screen.innerHTML = `<h1 id="countdown">${count}</h1>`;
        }
        count--;
    }, 1000);
}

// async function skipCharade(word) {
//     console.log("in skip charade");

//     playCharades();

//     const url = `http://127.0.0.1:3000/play/${word}`;

//     const data = {
//         word:       word
//     };

//     const config = {
//         method: "put",
//         mode: "cors", 
//         cache: "no-cache", 
//         headers: {"Content-Type": "application/json"},
//         body: JSON.stringify(data)
//     };

//     const fetchResponse = await fetch(url, config);
//     const jsonResponse = await fetchResponse.json();

// }



export { playCharades };