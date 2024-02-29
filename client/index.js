document.addEventListener('DOMContentLoaded', function () {
    fetch('http://localhost:5000/getAll')
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));
});

document.querySelector('table tbody').addEventListener('click', function(event) {
    if (event.target.className === "delete-row-btn") {
        deleteRowById(event.target.dataset.id);
    }
    if (event.target.className === "edit-row-btn") {
        handleEditRow(event.target.dataset.id);
    } 
});

const updateBtn = document.querySelector('#update-row-btn');
const searchBtn = document.querySelector('#search-btn');

searchBtn.onclick = function(){
    const playernumInput=document.querySelector('#player-number-input');
    const playernum = playernumInput.value;
    const posInput = document.querySelector('#pos-input');
    const pos =posInput.value;
    const nameInput = document.querySelector('#name-input');
    const name = nameInput.value
    const spdInput = document.querySelector('#spd-input');
    const spd = spdInput.value
    const strInput = document.querySelector('#str-input');
    const str = strInput.value;
    const aglInput = document.querySelector('#agl-input');
    const agl = aglInput.value;
    const intInput = document.querySelector('#int-input');
    const int = intInput.value;
    const disInput = document.querySelector('#dis-input');
    const dis = disInput.value;
    const totalInput = document.querySelector('#total-input');
    const total = totalInput.value;
    const expInput = document.querySelector('#exp-input');
    const exp = expInput.value;
    const teamInput = document.querySelector('#team-input');
    const team = teamInput.value;
    const collegeInput = document.querySelector('#college-input');
    const college = collegeInput.value;
    const awardsInput = document.querySelector('#awards-input');
    const awards = awardsInput.value;
 
    fetch('http://localhost:5000/search',{
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            playernum : playernum,
            pos : pos,
            name : name,
            spd :spd,
            str: str,
            agl :agl,
            int: int,
            dis: dis,
            total: total,
            exp: exp,
            team: team,
            college : college,
            awards : awards})
    })
    
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));      
}

function deleteRowById(id) {
    const passInput = document.querySelector('#password');
    const pass = passInput.value;
    if (pass == "Patrickreed#07"){ 
    fetch('http://localhost:5000/delete/' + id, {method: 'DELETE'})
    .then(response => response.json())
    .then(data => {
        if (data.success) {
        location.reload();
    }       
    });
}else{const updateSection = document.querySelector('#password-error');updateSection.hidden = false;}
}

function handleEditRow(id) {
    const updateSection = document.querySelector('#update-row');updateSection.hidden = false;
    document.querySelector('#update-row-btn').dataset.id = id;
}

updateBtn.onclick = function() {
    const passInput = document.querySelector('#password');
    const pass = passinput.value;
    if (pass == "Patrickreed#07"){ 
    const playernumUpdateInput = document.querySelector('#update-player-number-input');
    const posUpdateInput = document.querySelector('#update-pos-input');
    const nameUpdateInput = document.querySelector('#update-name-input');
    const spdUpdateInput = document.querySelector('#update-spd-input');
    const strUpdateInput = document.querySelector('#update-str-input');
    const aglUpdateInput = document.querySelector('#update-agl-input');
    const intUpdateInput = document.querySelector('#update-int-input');
    const disUpdateInput = document.querySelector('#update-dis-input');
    const totalUpdateInput = document.querySelector('#update-total-input');
    const expUpdateInput = document.querySelector('#update-exp-input');
    const teamUpdateInput = document.querySelector('#update-team-input');
    const collegeUpdateInput = document.querySelector('#update-college-input');
    const awardsUpdateInput = document.querySelector('#update-awards-input');

    const updateRowBtn = document.querySelector('#update-row-btn');

    fetch('http://localhost:5000/update', {
        method: 'PATCH',
        headers: {'Content-type' : 'application/json'}, 
        body: JSON.stringify({
            id: updateRowBtn.dataset.id,
            playernum : playernumUpdateInput.value,
            pos : posUpdateInput.value,
            name : nameUpdateInput.value,
            spd :spdUpdateInput.value,
            str: strUpdateInput.value,
            agl :aglUpdateInput.value,
            int: intUpdateInput.value,
            dis: disUpdateInput.value,
            total: totalUpdateInput.value,
            exp: expUpdateInput.value,
            team: teamUpdateInput.value,
            college: collegeUpdateInput.value,
            awards: awardsUpdateInput.value
            })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
        location.reload();
    }      
    });
}else{const updateSection = document.querySelector('#password-error');updateSection.hidden = false;}
}

const addBtn = document.querySelector('#add-name-btn');

addBtn.onclick = function () {
    const passInput = document.querySelector('#password');
    const pass = passInput.value;
    console.log(pass);
    if (pass == "Patrickreed#07"){ 
    const playernumInput = document.querySelector('#player-number-input');
    const playernum = playernumInput.value;
    const posInput = document.querySelector('#pos-input');
    const pos =posInput.value;
    const nameInput = document.querySelector('#name-input');
    const name = nameInput.value
    const spdInput = document.querySelector('#spd-input');
    const spd = spdInput.value
    const strInput = document.querySelector('#str-input');
    const str = strInput.value;
    const aglInput = document.querySelector('#agl-input');
    const agl = aglInput.value;
    const intInput = document.querySelector('#int-input');
    const int = intInput.value;
    const disInput = document.querySelector('#dis-input');
    const dis = disInput.value;
    const totalInput = document.querySelector('#total-input');
    const total = totalInput.value;
    const expInput = document.querySelector('#exp-input');
    const exp = expInput.value;
    const teamInput = document.querySelector('#team-input');
    const team = teamInput.value;
    const collegeInput = document.querySelector('#college-input');
    const college = collegeInput.value;
    const awardsInput = document.querySelector('#awards-input');
    const awards = awardsInput.value;

    fetch('http://localhost:5000/insert',{
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            playernum : playernum,
            pos : pos,
            name : name,
            spd :spd,
            str: str,
            agl :agl,
            int: int,
            dis: dis,
            total: total,
            exp: exp,
            team: team,
            college: college,
            awards: awards})
    })
    //console.log("add fetch",response)
    .then(response => response.json())
    .then(data => insertRowIntoTable(data['data']));
    }else{const updateSection = document.querySelector('#password-error');updateSection.hidden = false};
}

function insertRowIntoTable(data){

    //console.log("insert row", data);
    const table =document.querySelector('table tbody');
    const isTableData = table.querySelector('.no-data');

    let tableHtml = "<tr>";
    for (var key in data) {
    tableHtml += `<td>${data[key]}</td>`;
    }
    
    tableHtml += `<td><button class="delete-row-btn" data-id=${data.id}>Delete</td>`;
    tableHtml += `<td><button class="edit-row-btn" data-id=${data.id}>Edit</td>`;    
    
    tableHtml += "</tr>";

    if (isTableData) {
        table.innerHtml =tableHtml;
    } else {
        const newRow = table.insertRow();
        newRow.innerHTML =tableHtml;
    }
}

function loadHTMLTable(data) {
    const table = document.querySelector('table tbody');

    //console.log("load table", data);

    if (data.length === 0) {
        table.innerHTML = "<tr><td class='no-data' colspan='14'>No Data</td></tr>";
        return;
    }
    let tableHtml = "";

    data.forEach(function ({id,playernum, pos, name, spd, str, agl, gence, dis, total, exp, team, college, awards}) {
        tableHtml += "<tr>";
        //tableHtml += `<td>${id}</td>`;
        tableHtml += `<td>${playernum}</td>`;
        tableHtml += `<td>${pos}</td>`;
        tableHtml += `<td>${name}</td>`;
        tableHtml += `<td>${spd}</td>`;
        tableHtml += `<td>${str}</td>`;
        tableHtml += `<td>${agl}</td>`;
        tableHtml += `<td>${gence}</td>`;
        tableHtml += `<td>${dis}</td>`;
        tableHtml += `<td>${total}</td>`;
        tableHtml += `<td>${exp}</td>`;
        tableHtml += `<td>${team}</td>`;
        tableHtml += `<td>${college}</td>`;
        tableHtml += `<td>${awards}</td>`;
        tableHtml += `<td><button class="delete-row-btn" data-id=${id}>Delete</td>`;
        tableHtml += `<td><button class="edit-row-btn" data-id=${id}>Edit</td>`;
        tableHtml += "</tr>";
     });

     table.innerHTML =tableHtml;
    
}    
