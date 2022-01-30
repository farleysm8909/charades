import { validateForm } from "./modules/create_charade.js";
import { getCharades } from "./modules/get_charades.js";
import { playCharades } from "./modules/play_charades.js";

window.addEventListener('DOMContentLoaded', () => {

    getCharades();

    const create_btn = document.getElementById("create-char-btn");
    //const get_auth_btn = document.getElementById("get-char-by-auth-btn");
    const play_btn = document.getElementById("play-btn");
    play_btn.disabled = true;
    const select = document.getElementById("author-select");
    select.disabled = true;
    const save_btn = document.getElementById("save-btn");
    const cancel_create_btn = document.getElementById("cancel-create-btn");
    const form = document.getElementById("create-form");
    const auth_form = document.getElementById("author-form");
    const container = document.getElementById("container");
    const error_msg = document.getElementById("error-msg");
    let word = document.getElementById("word-input").style;
    let author = document.getElementById("author-input").style;



   // create charade btn (display form)
   if ( create_btn ) {
       create_btn.addEventListener("click", () => {
            play_btn.style.display = "none";
            create_btn.style.display = "none";
            auth_form.style.display = "none";
            container.style.display = "none";
            save_btn.style.display = "inline-block";
            cancel_create_btn.style.display = "inline-block";
            form.style.display = "block";
            error_msg.style.display = "none";
            word.backgroundColor = "#ffffff";
            word.borderColor = "#257cd1";
            author.backgroundColor = "#ffffff";
            author.borderColor = "#257cd1";
       });
   } else {
       console.error(`Unable to bind to target! Debug Required.`);
   }

   // save charade btn (display form)
   if ( save_btn ) {
        save_btn.addEventListener("click", () => {
            validateForm();
        });
    } else {
        console.error(`Unable to bind to target! Debug Required.`);
    }

    // cancel create charade btn (return home)
    if ( cancel_create_btn ) {
        cancel_create_btn.addEventListener("click", () => {
            getCharades();
            play_btn.style.display = "inline-block";
            create_btn.style.display = "inline-block";
            save_btn.style.display = "none";
            cancel_create_btn.style.display = "none";
            form.style.display = "none";
        });
    } else {
        console.error(`Unable to bind to target! Debug Required.`);
    }

    // create charade btn (display form)
    if ( play_btn ) {
        play_btn.addEventListener("click", () => {
            //const author = select.options[select.selectedIndex].text; // Text of the selected value, need to store in local storage?
            play_btn.style.display = "none";
            create_btn.style.display = "none";
            auth_form.style.display = "none";
            container.style.display = "none";
            playCharades();
        });
    } else {
        console.error(`Unable to bind to target! Debug Required.`);
    }


    // skip charade btn (generate new charade)
            // const skip_btn = document.getElementById("skip-btn");
            // if ( skip_btn ) {
            //     skip_btn.addEventListener("click", () => {
            //         skipCharade(word);
            //     });
            // } else {
            //     console.error(`Unable to bind to target! Debug Required.`);
            // }





});