
        document.addEventListener('DOMContentLoaded', () => {
            const invoiceForm = document.getElementById('invoiceForm');
            const invoiceList = document.getElementById('invoiceList');
            let currentInvoiceId = null;

            // Fetch Customers and Products for the form
            function fetchCustomersAndProducts() {
                // Fetch customers
                axios.get('http://localhost:3001/clients').then(response => {
                    const clientes = response.data;
                    const clientesSelect = document.getElementById('invoiceCustomer');
                    clientesSelect.innerHTML = '';
                    clientes.forEach(cliente => {
                        const option = document.createElement('option');
                        option.value = cliente.id;
                        option.textContent = cliente.nombrec;
                        clientesSelect.appendChild(option);
                    });
                });

                // Fetch products
                axios.get('http://localhost:3001/productos').then(response => {
                    const products = response.data;
                    const productsSelect = document.getElementById('invoiceProducts');
                    productsSelect.innerHTML = '';
                    products.forEach(product => {
                        const option = document.createElement('option');
                        option.value = product.id;
                        option.textContent = `${product.nombrep} ($${product.precio_uni})`;
                        productsSelect.appendChild(option);
                    });
                });
            }

            // Fetch and display all invoices
            function fetchInvoices() {
                axios.get('http://localhost:3001/factura').then(response => {
                    invoiceList.innerHTML = '';
                    const facturas= response.data;
                    facturas.forEach(factura => {
                        const listItem = document.createElement('li');
                        const productNames = factura.productos.map(p => p.nombrep).join(', ');
                        listItem.textContent = `Cliente: ${factura.cliente.name}, Producots: ${productNames}, Total: $${factura.total.toFixed(2)} `;

                        // Edit button
                        const editButton = document.createElement('button');
                        editButton.textContent = 'Edit';
                        editButton.onclick = () => editInvoice(factura.id);
                        listItem.appendChild(editButton);

                        // Delete button
                        const deleteButton = document.createElement('button');
                        deleteButton.textContent = 'Delete';
                        deleteButton.onclick = () => deleteInvoice(factura.id);
                        listItem.appendChild(deleteButton);

                        invoiceList.appendChild(listItem);
                    });
                });
            }

            // Add or update an invoice
            invoiceForm.addEventListener('submit', (event) => {
                event.preventDefault();

                const selectedProducts = Array.from(document.getElementById('invoiceProducts').selectedOptions).map(option => option.value);
                const facturaData = {
                    clienteId: document.getElementById('invoiceCustomer').value,
                    productIds: selectedProducts
                };

                if (!currentInvoiceId) {
                    // Add new invoice
                    axios.post('http://localhost:3001/factura/', facturaData).then(() => {
                        fetchInvoices();
                        invoiceForm.reset();
                    });
                } else {
                    // Update existing invoice
                    axios.put(`http://localhost:3001/factura/${currentInvoiceId}`, facturaData).then(() => {
                        fetchInvoices();
                        currentInvoiceId = null;
                        invoiceForm.reset();
                        document.getElementById('invoiceSubmitButton').textContent = 'Add Invoice';
                    });
                }
            });

            // Edit invoice
            function editInvoice(id) {
                axios.get('http://localhost:3001/factura/').then(response => {
                    const invoice = response.data.find(inv => inv.id === id);
                    document.getElementById('invoiceCustomer').value = invoice.cliente.id;
                    const selectedProductIds = invoice.productos.map(p => p.id);
                    Array.from(document.getElementById('invoiceProducts').options).forEach(option => {
                        option.selected = selectedProductIds.includes(option.value);
                    });
                    currentInvoiceId = id;
                    document.getElementById('invoiceSubmitButton').textContent = 'Update Invoice';
                });
            }

            // Delete invoice
            function deleteInvoice(id) {
                axios.delete(`http://localhost:3001/factura/${id}`).then(() => {
                    fetchInvoices();
                });
            }

            // Initial fetch of customers, products, and invoices
            fetchCustomersAndProducts();
            fetchInvoices();
        });
    