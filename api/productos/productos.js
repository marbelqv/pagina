document.addEventListener('DOMContentLoaded', function () {
    let productos = [];
    let currentproductoId = null;

    // Fetch customers from the backend using Axios
    function fetchproductos() {
        axios.get('http://localhost:3001/productos')
            .then(response => {
                productos = response.data;
                renderproductos(productos);
            })
            .catch(error => console.error('Error fetching productos:', error));
    }

    // Handle form submission for create or update
    const productoForm = document.getElementById('productoForm');
    productoForm.addEventListener('submit', function (e) {
        e.preventDefault();



        const nombrep = document.getElementById('nombrep').value;
        const precio_uni = document.getElementById('precio_uni').value;
       
        const proovedor = document.getElementById('proovedor').value;
       
       
        const productoData = {
            nombrep: document.getElementById('nombrep').value,
            precio_uni: document.getElementById('precio_uni').value,
            
            proovedor: document.getElementById('proovedor').value
            
            
        }; 


        if (currentproductoId === null) {
            // Create new customer
            axios.post('http://localhost:3001/productos', productoData)
                .then(response => {
                    productos.push(response.data);
                    renderproductos(productos);
                })
                .catch(error => console.error('Error adding producto:', error));
        } else {
            // Update existing customer
            axios.put(`http://localhost:3001/productos/${currentproductoId}`, productoData)
                .then(response => {
                    const index = productos.findIndex(producto => producto.id === currentproductoId);
                    productos[index] = response.data;
                    renderproductos(productos);
                    currentproductoId = null;
                    document.getElementById('submitButton').textContent = 'Add producto';
                })
                .catch(error => console.error('Error updating producto:', error));
        }

        productoForm.reset();
    });

    // Render customers to the table
    function renderproductos(productos) {
        const productosBody = document.getElementById('productosBody');
        productosBody.innerHTML = '';
        productos.forEach(producto => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${producto.id}</td>
                <td>${producto.nombrep}</td>
                <td>${producto.precio_uni}</td>
                
                <td>${producto.proovedor}</td>
                
                <td>
                    <button onclick="editproducto(${producto.id})">Edit</button>
                    <button onclick="deleteproducto(${producto.id})">Delete</button>
                </td>
            `;
            productosBody.appendChild(row);
        });
    }

    // Delete customer
    window.deleteproducto = function (id) {
        axios.delete(`http://localhost:3001/productos/${id}`)
            .then(response => {
                productos = productos.filter(producto => producto.id !== id);
                renderproductos(productos);
            })
            .catch(error => console.error('Error deleting producto:', error));
    };




    

    // Edit customer
    window.editproducto = function (id) {
        const producto = productos.find(c => c.id === id);
        document.getElementById('nombrep').value = producto.nombrep;
        document.getElementById('precio_uni').value = producto.precio_uni;
       
        document.getElementById('proovedor').value = producto.proovedor;



        currentproductoId = producto.id;
        document.getElementById('submitButton').textContent = 'Update producto';
    };

    // Fetch customers on page load
    fetchproductos();
});
