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


async function getCharadesByAuth(auth) {
    const url2 = `http://127.0.0.1:3000/${auth}`; // charades by given author
    const fetchResponse2 = await fetch(url2);
    const jsonResponse2 = await fetchResponse2.json();

    const container = document.getElementById("container");
    container.style.display = "block";
    
    let tbody = document.getElementById("tbody");
    tbody.innerHTML = "";
    let count = 0;
    jsonResponse2.forEach(cha => {
        count++;
        tbody.innerHTML += `
        <tr>
        <td>${cha.word}</td>
        <td>${cha.used}</td>
        <td>${cha.author}</td>
        <td>
            <a class="delete" title="Delete" data-toggle="tooltip" id="id${count}"><span class="glyphicon glyphicon-trash"></span></a>
        </td>
    </tr>   
        `;
    }); 

    $(".delete").on("click", function() {
        const word = $(this).closest('tr').find('td:nth-child(1)').text(); // https://stackoverflow.com/questions/20641146/how-to-get-a-value-of-the-closest-td-with-class-on-button-click/20641164
        deleteCharade(auth, word);
    });
    
}



async function getCharades() {
    const auth_form = document.getElementById("author-form");
    const sel = document.getElementById("author-select");

    const url = "http://127.0.0.1:3000";
    const fetchResponse = await fetch(url);
    const jsonResponse = await fetchResponse.json();

    let authors = [];
    jsonResponse.forEach(ch => {
        authors.push(ch.author);
    });

    sel.innerHTML = `<option>Select Your Name</option>`;
    for (var i = 0; i < authors.length; i++) {
        var optn = authors[i];
        var el = document.createElement("option");
        el.textContent = optn;
        el.value = optn;
        sel.appendChild(el);
    }

    // remove duplicates from select dropdown
    // https://stackoverflow.com/questions/23729456/how-to-remove-duplicate-dropdown-option-elements-with-same-value
    $(".select option").each(function() {
        $(this).siblings('[value="'+ this.value +'"]').remove();
    });

    sel.addEventListener('change', (event) => {
        const result = event.target.value;
        getCharadesByAuth(result);
    });

}


export { getCharades };