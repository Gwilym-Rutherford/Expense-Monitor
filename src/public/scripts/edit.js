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