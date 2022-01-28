import { getCharades } from "./get_charades.js";

// validate form (client-side)
// if no problems, call createCharade()
async function validateForm() {

    let returnValue = true;
    let word = document.getElementById("word-input");
    let author = document.getElementById("author-input");
    
    let errorContainer = document.getElementById("error-msg");
    let errors = document.getElementById("error-list");
    let success = document.getElementById("success-msg");

    
    /* resets form styles and empties error message if resubmitted */
    errorContainer.style.display = "none";
    errors.innerHTML = "<p>Error! Please fix the following issues:</p>";
    word.style.backgroundColor = "#ffffff";
    word.style.borderColor = "#257cd1";
    author.style.backgroundColor = "#ffffff";
    author.style.borderColor = "#257cd1";
    const nameRegex = /^[a-zA-Z]+$/; /* alpha characters only, + is for one or more letters */

    const url = "http://127.0.0.1:3000";
    const fetchResponse = await fetch(url);
    const jsonResponse = await fetchResponse.json();
    let isDuplicate = false;

    jsonResponse.forEach(ch => {
        if (ch.word === word.value.toLowerCase()) {
            isDuplicate = true;
        }
    });

    if (word.value != "" && isDuplicate) {
        errorContainer.style.display = "block";
        errors.innerHTML += `<li>Someone already added that word! Please pick a new one.</li>`;
        word.style.backgroundColor = "#f5caca";
        word.style.borderColor = "#ba0000";
        returnValue = false;
    }

    /* form returns false if word length is less than 2, prints styled error message to DOM  */
    if (word.value.length < 2) {
        errorContainer.style.display = "block";
        errors.innerHTML += `<li>Word must contain at least 2 characters.</li>`;

        word.style.backgroundColor = "#f5caca";
        word.style.borderColor = "#ba0000";
        returnValue = false;
    }
    /* form returns false if author length is less than 2 or non-alphabetical characters are used, prints styled error message to DOM  */
    if (author.value.length < 2 || !author.value.match(nameRegex)) {
        errorContainer.style.display = "block";

        if (author.value.length < 2) {
            errors.innerHTML += `<li>Author must contain at least 2 characters.</li>`;
        } 
        if (!author.value.match(nameRegex)) {
            errors.innerHTML += `<li>Author must contain alphabetical characters only.</li>`;
        }

        author.style.backgroundColor = "#f5caca";
        author.style.borderColor = "#ba0000";
        returnValue = false;
    }
    
    /* if no errors, show success message */
    if (returnValue === true) {
        success.innerHTML = "<p>&#9989; Success! Your response was recorded.</p>";
        createCharade();
        setTimeout(function() {
            success.innerHTML = "";
            const create_btn = document.getElementById("create-char-btn");
            const play_btn = document.getElementById("play-btn");
            
            play_btn.style.display = "inline-block";
            create_btn.style.display = "inline-block";
            getCharades();
        }, 2000)
    } 
}

// posts to db, resets various vars for UI
async function createCharade() {
    
    const data = {
        word:       document.getElementById("word-input").value.toLowerCase(),
        author:     document.getElementById("author-input").value.toLowerCase()
    }

    const config = {
        method: "post", 
        mode: "cors", 
        cache: "no-cache", 
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
    };

    const url = "http://127.0.0.1:3000";
    const fetchResponse = await fetch(url, config);
    const jsonResponse = await fetchResponse.json();

    const save_btn = document.getElementById("save-btn");
    const cancel_create_btn = document.getElementById("cancel-create-btn");
    const form = document.getElementById("create-form");
    const play_btn = document.getElementById("play-btn");
    const select = document.getElementById("author-select");

    select.disabled = false;
    save_btn.style.display = "none";
    cancel_create_btn.style.display = "none";
    form.style.display = "none";
    play_btn.disabled = false;    
}


export { validateForm };