let users = [];

function displayUsers() {
    let output = '';
    users.forEach(user => {
        output+=
        `
            <div class="row m-0">
                <p class="lead mb-0"> <strong>${user.name}</strong>   </p>
                <p class="lead wealth mb-0">$ ${user.wealth}</p>
            </div>
        `
    })
    document.getElementById('users').innerHTML = output;
}

async function getRandomUser() {
    let res = await fetch("https://randomuser.me/api");
    const data = await res.json();
    const name = `${data.results[0].name['first']} ${data.results[0].name['last']}`;
    const wealth = Math.round(Math.random()*2111111)
    const person = {
        'name': name,
        'wealth' : wealth
    }
    users.push(person);
    displayUsers();
}

function doubleMoney()  {
    users =  users.map(user => {
        return { ...user, wealth: user.wealth*2}
    });
    displayUsers();
}

function filterMillionaires() {
    users = users.filter(user => user['wealth']>=1000000);
    displayUsers();
}

function sortByRichest()  {
    users.sort((user1, user2) => user2.wealth-user1.wealth)
    displayUsers();
}

function calculateTotal()  {
    const totalWealth = users.reduce((acc, user) => acc+user.wealth, 0);
    document.getElementById('total-wealth').innerHTML = `$ ${totalWealth}`;
    document.getElementById('total').classList.remove('d-none');
}

document.getElementById('add').addEventListener('click',getRandomUser);
document.getElementById('double').addEventListener('click',doubleMoney);
document.getElementById('millionaire').addEventListener('click',filterMillionaires);
document.getElementById('richest').addEventListener('click',sortByRichest);
document.getElementById('total-btn').addEventListener('click',calculateTotal)
