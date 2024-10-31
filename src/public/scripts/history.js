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

    // add data cells
    expensesData.forEach((element) => {
        let objProperties = Object.keys(element);
        let row = table.insertRow(0);
        for(let i = 3; i < objProperties.length; i++){
            let cell = row.insertCell(i - 3);
            cell.innerHTML = element[objProperties[i]];
        }
        let editCell = row.insertCell();
        let edit = document.createElement("a");
        edit.href = "/edit/" + element[objProperties[0]];
        edit.text = "edit";
        editCell.appendChild(edit);
        
        let deleteCell = row.insertCell();
        let deleteExpense = document.createElement("a");
        deleteExpense.href = "/delete/" + element[objProperties[0]];
        deleteExpense.text = "delete";
        deleteCell.appendChild(deleteExpense);
        
    
    });

    // add colum titles
    let header = table.createTHead();
    let headerRow = header.insertRow(0);

    let titles = Object.keys(expensesData[0]).slice(3);
    titles.forEach((element, index)=>{
        let cell = headerRow.insertCell(index);
        cell.innerHTML = element;
    });
}



let table = document.getElementById("history");
addDataToTable(table);
