let body = document.querySelector('body');
let row = document.querySelector("#row");
let inp = document.querySelector('#search');
let lang = document.querySelector('#lang');
let btn = document.querySelector('#btn');
let apiUrl = "https://randomuser.me/api/?results=100";
let users = [];

async function renderUsers(usersList = users) {
    row.innerHTML = '';

    // Fetch faqat bir marta
    if (users.length === 0) {
        const res = await fetch(apiUrl);
        const data = await res.json();
        users = data.results;
        usersList = users;
    }

    usersList.forEach(item => {
        let div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = `
                    <img src="${item.picture.large}" alt="User Photo">
                    <p><strong>Age:</strong> ${item.dob.age}</p>
                    <h1>${item.name.first} ${item.name.last}</h1>
                    <p><strong>Email:</strong> ${item.email}</p>
                    <p><strong>Location:</strong> ${item.location.city}, ${item.location.country}</p>
                `;
        row.appendChild(div);
    });
}

function sortPeoples() {
    let sorted = [...users];

    if (lang.value === 'az') {
        sorted.sort((a, b) => a.name.first.localeCompare(b.name.first));
    } else if (lang.value === 'za') {
        sorted.sort((a, b) => b.name.first.localeCompare(a.name.first));
    } else if (lang.value === 'age') {
        sorted.sort((a, b) => a.dob.age - b.dob.age);
    }

    renderUsers(sorted);
}

function searchData() {
    let inputValue = inp.value.toLowerCase();
    let usersList = users.filter(item =>
        item.name.first.toLowerCase().includes(inputValue) ||
        item.name.last.toLowerCase().includes(inputValue)
    );
    renderUsers(usersList);
}

lang.addEventListener('change', sortPeoples);
btn.addEventListener('click', searchData);

// Boshlanishda render
renderUsers();