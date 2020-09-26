let totalOutput = document.getElementById('total-balance');
let incomeOutput = document.getElementById('total-income-value');
let expenseOutput = document.getElementById('total-expense-value');
let addBtn = document.getElementById('add-btn');
let transactionName = document.getElementById('transaction-name');
let transactionAmount = document.getElementById('transaction-amount');
let cardList = document.getElementById('card-list');
let transactions = [];

init();

function init() {
    const transactions = getTransactions();
    display();
}

function display() {
    cardList.innerHTML = '';
    transactions.forEach(transaction => {
        addCard(transaction)
    });
    calculate();
}

function getTransactions() {
    if(localStorage.getItem('transactions')===null)
        transactions = [];
    else
        transactions=JSON.parse(localStorage.getItem('transactions'));
    return transactions;
}

function setTransactions(transactions) {
    localStorage.setItem('transactions', JSON.stringify(transactions))
}

function addCard(transaction) {
    let x;
    (transaction.amount>0)?(x='income-card'):(x='expense-card');
    let output =
    `
        <div class="display-card ${x}">
            <div class="p-0 del-btn bg-danger text-white">
                &times;
            </div>
            <div class="card-content">
                <div class='d-none'>${transaction.id}</div>
                <h4 class="m-0 item">${transaction.name}<span class="amount">${transaction.amount}</span></h4>
            </div>
        </div>
    `  
    cardList.innerHTML+= output; 
    addDeleteFunctionality();      
}

function addDeleteFunctionality() {
    let delBtns = document.querySelectorAll('.del-btn');
    delBtns.forEach(delBtn => {
        delBtn.addEventListener('click', (e) => {
            let x = e.target.parentElement;
            console.log(x);
            remove(x.firstElementChild.nextElementSibling.firstElementChild.innerHTML);
        })
    })
}

function remove(id) {
    console.log(id);
    transactions = transactions.filter(transaction => transaction.id != id);
    setTransactions(transactions);
    display();
}

function calculate() {
    let income = 0;
    let expense = 0;
    let total = 0;
    transactions.forEach(transaction => {
        if(transaction.amount>0)
            income+=transaction.amount;
        else
            expense+=(transaction.amount*(-1));
    })
    total = income-expense;
    totalOutput.innerHTML = `$ ${total.toFixed(2)}`;
    incomeOutput.innerHTML = `$ ${income.toFixed(2)}`;
    expenseOutput.innerHTML = `$ ${expense.toFixed(2)}`;
}

addBtn.addEventListener('click', () => {
    let tname = transactionName.value;
    let tamount = transactionAmount.value;
    transactionName.value='';
    transactionAmount.value='';
    const transaction = {
        name: tname,
        amount: parseFloat(tamount,10),
        id: transactions.length
    }
    console.log(transactions);
    addCard(transaction);
    transactions.push(transaction);
    setTransactions(transactions);
    calculate();
})