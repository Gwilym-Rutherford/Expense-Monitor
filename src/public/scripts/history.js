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

async function addDataToTable(table){
    let expenses = await getExpenses();
    let expensesData = await getJson("/content/expenseS?amount=true");
    expensesData.forEach((element) => {
        let objProperties = Object.keys(element);
        let row = table.insertRow(0);
        for(let i = 3; i < objProperties.length; i++){
            let cell = row.insertCell(i - 3);
            cell.innerHTML = element[objProperties[i]];
        }
        let editCell = row.insertCell(-1);
        let anchor = document.createElement("a");
        anchor.href = "/edit/" + element[objProperties[0]];
        anchor.text = "edit";
        editCell.appendChild(anchor);

    });
}


let table = document.getElementById("history");
addDataToTable(table);
