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


async function getJson(request){
    let expenses = await fetch(request);
    return await expenses.json();
}

async function getExpenses(){
    let expenses_json = await getJson("/content/expenses")
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


// get graph data
let expenses = await getExpenses();
let expensesData = await getJson("/content/expenseS?amount=true");
let amountArr = new Array(expenses.length).fill(parseInt(0));
expensesData.forEach(element => {
    let expense = element.expense;
    let amountValue = element.amount;
    let index = expenses.indexOf(expense);
    amountArr[index] = amountArr[index] + parseInt(amountValue);
});

// get dates for graphs


const ctx = document.getElementById('dashboardChart');

new Chart(ctx, {
  type: 'line',
  data: {
    labels: expenses,
    datasets: [{
      label: `Expenses for: ${(new Date).getMonth() + 1} / ${(new Date).getFullYear()} `,
      data: amountArr,
      borderWidth: 2,
      tension: 0.1
    },{
    label: `Expenses for: ${(new Date).getMonth()} / ${(new Date).getFullYear()} `,
    data: amountArr,
    borderWidth: 2,
    tension: 0.1
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