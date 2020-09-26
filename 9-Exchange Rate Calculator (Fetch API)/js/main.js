let exchangeRate;

fetch("https://api.exchangeratesapi.io/latest?base=INR")
.then(res => res.json())
.then(data => {
    let output1 = '';
    let output2 = '';
    Object.keys(data['rates']).forEach(key => {
        output1+=
        `
            <option value="${key}" class="currency-1">${key}</option>
        `
        output2+=
        `
            <option value="${key}" class="currency-2">${key}</option>
        `
    });
    document.getElementById('currency-1-list').innerHTML = output1;
    document.getElementById('currency-2-list').innerHTML = output2;
})

function fetchData(currency1, currency2)
{   
    url = `https://api.exchangeratesapi.io/latest?base=${currency1}`;
    fetch(url)
    .then(res => res.json())
    .then(data => calculate(data['rates'][currency2]));
}

function calculate(exchangerate)
{
    exchangeRate = exchangerate;
    let value1 = document.getElementById('currency-1-input').value;
    document.getElementById('currency-2-input').value = parseFloat(value1*exchangerate.toFixed(4));
    document.getElementById('exchange-rate').innerHTML = `Exchange Rate : ${exchangerate}`;
}

function init()   {
    let currency1index = document.getElementById('currency-1-list').selectedIndex;
    let currency2index = document.getElementById('currency-2-list').selectedIndex;
    let currency1 = document.querySelectorAll('.currency-1')[currency1index].value;
    let currency2 = document.querySelectorAll('.currency-2')[currency2index].value;
    fetchData(currency1, currency2);
}

document.querySelectorAll('.currency-list').forEach(item => {
    item.addEventListener('change', init)
})

document.getElementById('currency-1-input').addEventListener('input', init);

document.getElementById('swap-btn').addEventListener('click', swap);

function swap()
{
    let currency1index = document.getElementById('currency-1-list').selectedIndex;
    let currency2index = document.getElementById('currency-2-list').selectedIndex;
    document.getElementById('currency-1-list').selectedIndex = currency2index;
    document.getElementById('currency-2-list').selectedIndex = currency1index;
    init();
}