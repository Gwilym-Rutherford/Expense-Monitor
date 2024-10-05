window.addEventListener("load", async ()=>{
    let expenses = await getExpenses();
    let select = document.getElementById("selectTag");

    let blankOption = document.createElement("option");
    blankOption.value = "";
    blankOption.text = "Please select an Expense";
    select.appendChild(blankOption);

    for(let i = 0; i < expenses.length; i ++){
        let option = document.createElement("option");
        option.value = expenses[i];
        option.text = expenses[i];
        select.appendChild(option);
    }
});


async function getExpenses(){
    let expenses = await fetch("/content/expenses");
    let expenses_json = await expenses.json();
    let expenses_arr = [];
    for(let i = 0; i < expenses_json.length; i++){
        expenses_arr.push(expenses_json[i].expense);
    }

    return expenses_arr;
}


// disable text input if dropdown menu has been selected and vice versa
let dropDown = document.getElementById("selectTag");
let expenseInput = document.getElementById("expense");
dropDown.addEventListener("change", (Event)=>{
    if(dropDown.value != ""){
        expenseInput.disabled = true;
    }else{
        expenseInput.disabled = false;
    }
});

expenseInput.addEventListener("change", ()=>{
    if(expenseInput.value != ""){
        dropDown.disabled = true;
    }else{
        dropDown.disabled = false;
    }
});




const ctx = document.getElementById('myChart');

new Chart(ctx, {
type: 'bar',
data: {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [{
    label: '# of Votes',
    data: [12, 19, 3, 5, 2, 3],
    borderWidth: 1
    }]
},
options: {
    scales: {
    y: {
        beginAtZero: true
    }
    }
}
});