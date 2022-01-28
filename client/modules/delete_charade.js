import { getCharades } from "./get_charades.js";
import { getCharadesByAuth } from "./get_charades.js";

async function deleteCharade(auth, word) {
    const url = `http://127.0.0.1:3000/${word}`;
    const config = {
        method: "delete", 
        body: null
    };

    const fetchResponse = await fetch(url, config);
    getCharades();
    getCharadesByAuth(auth);
}

export { deleteCharade };
