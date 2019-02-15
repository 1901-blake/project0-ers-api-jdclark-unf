// send an http get request to the provided url
fetch("http://localhost:3000/users", {
    credentials: 'include'
})
.then(resp => resp.json())
.then(users => {
    console.log(users);
    // get the table body
    const tbody = document.getElementById('user-table-body');
    tbody.innerHTML = '';

    // for each user retreived from the db
    users.forEach(user => {

        // create a row
        const tr = document.createElement('tr');

        // add the name data to the row
        let nameData = document.createElement('td');
        nameData.innerText = `${user.firstName} ${user.lastName}`;
        tr.appendChild(nameData);

        // add the username data to the row
        let usernameData = document.createElement('td');
        usernameData.innerText = user.username;
        tr.appendChild(usernameData);

        // add the delete data to the row
        let deleteData = document.createElement('td');
        deleteData.innerText = 'delete';
        deleteData.className = 'delete-button';
        tr.appendChild(deleteData);

        // add the row to the table body
        tbody.appendChild(tr);    
    })
})
.catch(console.log);