document.addEventListener('DOMContentLoaded', function () {
    let proveedores= [];
    let currentproveedorId = null;

    // Fetch customers from the backend using Axios
    function fetchproveedores() {
        axios.get('http://localhost:3001/proveedores')
            .then(response => {
                proveedores = response.data;
                renderproveedores(proveedores);
            })
            .catch(error => console.error('Error fetching  proveedores:', error));
    }

    // Handle form submission for create or update
    const  proveedorForm = document.getElementById('proveedorForm');
    proveedorForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const nombrepro = document.getElementById('nombrepro').value;
        
        const telefono = document.getElementById('telefono').value;
        const identificacion = document.getElementById('identificacion').value;
        
        const producto = document.getElementById('producto').value;


        const  proveedorData = {
            nombrepro: document.getElementById('nombrepro').value,
            telefono: document.getElementById('telefono').value,
          
            identificacion: document.getElementById('identificacion').value,
            producto: document.getElementById('producto').value
        };  

        if (currentproveedorId === null) {
            // Create new customer
            axios.post('http://localhost:3001/proveedores',  proveedorData)
                .then(response => {
                    proveedores.push(response.data);
                    renderproveedores( proveedores);
                })
                .catch(error => console.error('Error adding  proveedor:', error));
        } else {
            // Update existing customer
            axios.put(`http://localhost:3001/proveedores/${currentproveedorId}`,  proveedorData)
                .then(response => {
                    const index =  proveedores.findIndex( proveedor =>  proveedor.id === currentproveedorId);
                    proveedores[index] = response.data;
                    renderproveedores( proveedores);
                    currentproveedorId = null;
                    document.getElementById('submitButton').textContent = 'Add  proveedor';
                })
                .catch(error => console.error('Error updating  proveedor:', error));
        }

        proveedorForm.reset();
    });

    // Render customers to the table
    function renderproveedores(proveedores) {
        const  proveedoresBody = document.getElementById('proveedoresBody');
        proveedoresBody.innerHTML = '';
        proveedores.forEach(proveedor => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${proveedor.id}</td>
                <td>${proveedor.nombrepro}</td>
                <td>${proveedor.telefono}</td>
                 <td>${proveedor.identificacion}</td>
                <td>${proveedor.producto}</td>
                <td>
                    <button onclick="editproveedor(${proveedor.id})">Edit</button>
                    <button onclick="deleteproveedor(${proveedor.id})">Delete</button>
                </td>
            `;
            proveedoresBody.appendChild(row);
        });
    }

    // Delete customer
    window.deleteproveedor = function (id) {
        axios.delete(`http://localhost:3001/proveedores/${id}`)
            .then(response => {
                proveedores = proveedores.filter(proveedor => proveedor.id !== id);
                renderproveedores(proveedores);
            })
            .catch(error => console.error('Error deleting proveedor:', error));
    };

    // Edit customer
    window.editproveedor = function (id) {
        const proveedor = proveedores.find(c => c.id === id);

      

    
        document.getElementById('nombrepro').value = proveedor.nombrepro;
       
        document.getElementById('telefono').value = proveedor.telefono;
        document.getElementById('identificacion').value = proveedor.identificacion;
        document.getElementById('producto').value = proveedor.producto;
        
        
        currentproveedorId = proveedor.id;
        document.getElementById('submitButton').textContent = 'Update proveedor';
    };

    // Fetch customers on page load
    fetchproveedores();
});
