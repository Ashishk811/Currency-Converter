const URL ="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

// const dropdowns = document.querySelectorAll("form select");

// for(let select of dropdowns){ //selects inside select-container
//     for(i in countryList){ //currency names
//         let newOpt = document.createElement('option');
//         newOpt.innerText= i;
//         newOpt.value= i;
//         select.append(newOpt);
//     }
// }

const convertBtn = document.querySelector('.btn');
const amount =document.querySelector('#inputValue');
const fromValue= document.querySelector('.selectFrom');
const toValue= document.querySelector('.selectTo');
const display = document.querySelector('.message');


const dropdowns = document.querySelectorAll("form select");

for(let select of dropdowns){ //selects inside select-container
    let newHtml='';
    for(i in countryList){ //currency names
        if(select.name=="from" && i == "INR") newHtml += `<option value="${i}" selected>${i}</option>`;
        if(select.name=="to" && i == "USD") newHtml += `<option value="${i}" selected>${i}</option>`;
        else newHtml += `<option value="${i}">${i}</option>`;
    }
    select.innerHTML=newHtml;
    select.addEventListener("change",(event)=>{
        assignFlag(event, event.target.name);
    })
}

function assignFlag(evt, targetName){
    let selectedValue = evt.target.value;
    if (targetName== 'to') document.querySelector('#to-img').src=`https://flagsapi.com/${countryList[selectedValue]}/flat/64.png`;
    else document.querySelector('#from-img').src=`https://flagsapi.com/${countryList[selectedValue]}/flat/64.png`;
}    

async function getText() {
    let from = fromValue.value.toLowerCase();
    let to = toValue.value.toLowerCase();
    let newURL=`${URL}/${from}.json`;

    let response = await fetch(newURL);
    const importArr = await response.json();

    let temp = eval(`importArr.${from}.${to}`);
    let currentRate=(amount.value*temp).toFixed(2);
    display.textContent=`${amount.value} ${fromValue.value} = ${currentRate} ${toValue.value}`;
}

getText();
convertBtn.addEventListener("click",(evt)=>{
    if(amount.value <=0 || amount.value==""){
        amount.value='1';
    }
    evt.preventDefault();
    getText();
})
