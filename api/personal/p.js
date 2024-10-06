document.addEventListener('DOMContentLoaded', function () {
    let personals = [];
    let currentpersonalId = null;

    // Fetch customers from the backend using Axios
    function fetchpersonals() {
        axios.get('http://localhost:3001/personal')
            .then(response => {
                personals = response.data;
                renderpersonals(personals);
            })
            .catch(error => console.error('Error fetching personals:', error));
    }

    // Handle form submission for create or update
    const personalForm = document.getElementById('personalForm');
    personalForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const nombre = document.getElementById('nombre').value;

        const apellido = document.getElementById('apellido').value;
        const telefono = document.getElementById('telefono').value;
        const identificacion = document.getElementById('identificacion').value;
        
        const horas = document.getElementById('horas').value;
        const cargo = document.getElementById('cargo').value;


        const personalData = {
            nombre: document.getElementById('nombre').value,
            apellido: document.getElementById('apellido').value,
            telefono: document.getElementById('telefono').value,
            identificacion: document.getElementById('identificacion').value,
            horas: document.getElementById('horas').value,
            cargo: document.getElementById('cargo').value
        };  

        if (currentpersonalId === null) {
            // Create new customer
            axios.post('http://localhost:3001/personal', personalData)
                .then(response => {
                    personals.push(response.data);
                    renderpersonals(personals);
                })
                .catch(error => console.error('Error adding personal:', error));
        } else {
            // Update existing customer
            axios.put(`http://localhost:3001/personal/${currentpersonalId}`, personalData)
                .then(response => {
                    const index = personals.findIndex(personal => personal.id === currentpersonalId);
                    personals[index] = response.data;
                    renderpersonals(personals);
                    currentpersonalId = null;
                    document.getElementById('submitButton').textContent = 'Add personal';
                })
                .catch(error => console.error('Error updating personal:', error));
        }

        personalForm.reset();
    });

    // Render customers to the table
    function renderpersonals(personals) {
        const personalsBody = document.getElementById('personalsBody');
        personalsBody.innerHTML = '';
        personals.forEach(personal => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${personal.id}</td>
                <td>${personal.nombre}</td>
                <td>${personal.apellido}</td>
                <td>${personal.telefono}</td>
                 <td>${personal.identificacion}</td>
                <td>${personal.horas}</td>
                <td>${personal.cargo}</td>
                <td>
                    <button onclick="editpersonal(${personal.id})">Edit</button>
                    <button onclick="deletepersonal(${personal.id})">Delete</button>
                </td>
            `;
            personalsBody.appendChild(row);
        });
    }

    // Delete customer
    window.deletepersonal = function (id) {
        axios.delete(`http://localhost:3001/personal/${id}`)
            .then(response => {
                personals = personals.filter(personal => personal.id !== id);
                renderpersonals(personals);
            })
            .catch(error => console.error('Error deleting personal:', error));
    };

    // Edit customer
    window.editpersonal = function (id) {
        const personal = personals.find(c => c.id === id);

      

    
        document.getElementById('nombre').value = personal.nombre;
        document.getElementById('apellido').value = personal.apellido;
        document.getElementById('telefono').value = personal.telefono;
        document.getElementById('identificacion').value = personal.identificacion;
        document.getElementById('horas').value = personal.horas;
        document.getElementById('cargo').value = personal.cargo;
        
        
        currentpersonalId = personal.id;
        document.getElementById('submitButton').textContent = 'Update personal';
    };

    // Fetch customers on page load
    fetchpersonals();
});
