import { getCharades } from "./get_charades.js";

async function playCharades() {
    const url = `http://127.0.0.1:3000/play/charade`;

    const fetchResponse = await fetch(url);
    const jsonResponse = await fetchResponse.json();

    // update UI
    let main = document.querySelector("main");
    main.style.display = "none";
    let play_screen = document.getElementById("play-container");
    play_screen.style.height = "100vh";

    if (jsonResponse.numCharades >= 1) {
        const word = jsonResponse.charade.word;
        const author = jsonResponse.charade.author;

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
                    <button id="done-btn" class="btn btn-primary">Done</button>
                </div>
                `;
                // add skip btn event listener
                const skip_btn = document.getElementById("skip-btn");
                // if it is the last charade, disable skip btn
                if (jsonResponse.numCharades === 1) {
                    skip_btn.disabled = true;
                } else {
                    if ( skip_btn ) {
                        skip_btn.addEventListener("click", () => {
                            skipCharade(word, author);
                        });
                    } else {
                        console.error(`Unable to bind to target! Debug Required.`);
                    }
                }

                // add done btn event listener
                const done_btn = document.getElementById("done-btn");
                if ( done_btn ) {
                    done_btn.addEventListener("click", () => {
                        document.querySelector("main").style.display = "block";   
                        document.getElementById("play-container").style.height = 0; 
                        document.getElementById("create-char-btn").style.display = "inline-block";
                        document.getElementById("play-btn").style.display = "inline-block";
                        document.getElementById("author-form").style.display = "block";
                        skip_btn.style.display = "none";
                        done_btn.style.display = "none";
                        document.getElementById("countdown").style.display = "none";
                    });
                } else {
                    console.error(`Unable to bind to target! Debug Required.`);
                }

            } else if (count === 0) {
                play_screen.innerHTML = `<h1 id="countdown">GO!</h1>`;
            } else {
                play_screen.innerHTML = `<h1 id="countdown">${count}</h1>`;
            }
            count--;
        }, 1000);

    // if there are no more charades in database (jsonResponse.numCharades === 0)
    } else { 
        const message = jsonResponse.message;
        play_screen.innerHTML = `<h1 id="countdown">${message}</h1>`;
        setTimeout(function() {
            play_screen.innerHTML = "";
            document.querySelector("main").style.display = "block";   
            document.getElementById("play-container").style.height = 0; 
            document.getElementById("create-char-btn").style.display = "inline-block";
            document.getElementById("play-btn").style.display = "inline-block";
            document.getElementById("author-form").style.display = "block";
            getCharades();
        }, 2000)
    }
}

async function skipCharade(word, author) {

    playCharades(); // get new charade before resetting old charade in db

    word = word.toLowerCase();
    const url = `http://127.0.0.1:3000/${word}`;

    const data = {
        word:       word,
        author:     author
    };

    const config = {
        method: "put",
        mode: "cors", 
        cache: "no-cache", 
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
    };

    const fetchResponse = await fetch(url, config);
    const jsonResponse = await fetchResponse.json();
}



export { playCharades, skipCharade };