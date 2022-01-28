async function playCharades(auth) {
    const url = `http://127.0.0.1:3000/play/${auth}`;

    const fetchResponse = await fetch(url);
    const jsonResponse = await fetchResponse.json();

    console.log(jsonResponse.word);
}

export { playCharades };