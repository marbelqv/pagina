document.addEventListener('DOMContentLoaded', function () {
    let customers = [];
    let currentCustomerId = null;

    // Fetch customers from the backend using Axios
    function fetchCustomers() {
        axios.get('http://localhost:3001/clients')
            .then(response => {
                customers = response.data;
                renderCustomers(customers);
            })
            .catch(error => console.error('Error fetching customers:', error));
    }

    // Handle form submission for create or update
    const customerForm = document.getElementById('customerForm');
    customerForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const nombrec = document.getElementById('nombrec').value;
        const apellido = document.getElementById('apellido').value;
        const telefono = document.getElementById('telefono').value;
        const identificacion = document.getElementById('identificacion').value;
        
        const direccion = document.getElementById('direccion').value;


        const customerData = {
            nombrec: document.getElementById('nombrec').value,
            apellido: document.getElementById('apellido').value,
            telefono: document.getElementById('telefono').value,
            identificacion: document.getElementById('identificacion').value,
            direccion: document.getElementById('direccion').value
        };  

        if (currentCustomerId === null) {
            // Create new customer
            axios.post('http://localhost:3001/clients', customerData)
                .then(response => {
                    customers.push(response.data);
                    renderCustomers(customers);
                })
                .catch(error => console.error('Error adding customer:', error));
        } else {
            // Update existing customer
            axios.put(`http://localhost:3001/clients/${currentCustomerId}`, customerData)
                .then(response => {
                    const index = customers.findIndex(customer => customer.id === currentCustomerId);
                    customers[index] = response.data;
                    renderCustomers(customers);
                    currentCustomerId = null;
                    document.getElementById('submitButton').textContent = 'Add Customer';
                })
                .catch(error => console.error('Error updating customer:', error));
        }

        customerForm.reset();
    });

    // Render customers to the table
    function renderCustomers(customers) {
        const customersBody = document.getElementById('customersBody');
        customersBody.innerHTML = '';
        customers.forEach(customer => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${customer.id}</td>
                <td>${customer.nombrec}</td>
                <td>${customer.apellido}</td>
                <td>${customer.telefono}</td>
                 <td>${customer.identificacion}</td>
                <td>${customer.direccion}</td>
                <td>
                    <button onclick="editCustomer(${customer.id})">Edit</button>
                    <button onclick="deleteCustomer(${customer.id})">Delete</button>
                </td>
            `;
            customersBody.appendChild(row);
        });
    }

    // Delete customer
    window.deleteCustomer = function (id) {
        axios.delete(`http://localhost:3001/clients/${id}`)
            .then(response => {
                customers = customers.filter(customer => customer.id !== id);
                renderCustomers(customers);
            })
            .catch(error => console.error('Error deleting customer:', error));
    };

    // Edit customer
    window.editCustomer = function (id) {
        const customer = customers.find(c => c.id === id);

      

    
        document.getElementById('nombrec').value = customer.nombrec;
        document.getElementById('apellido').value = customer.apellido;
        document.getElementById('telefono').value = customer.telefono;
        document.getElementById('identificacion').value = customer.identificacion;
        document.getElementById('direccion').value = customer.direccion;
        
        
        currentCustomerId = customer.id;
        document.getElementById('submitButton').textContent = 'Update Customer';
    };

    // Fetch customers on page load
    fetchCustomers();
});
