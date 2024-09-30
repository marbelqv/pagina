const express = require('express');
const mysql = require('mysql2');

const app = express();
const port=3001;
var cors = require('cors');
app.use(express.json());

app.use(cors({
    origin: '*' 
  }));



const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'yummis_food'
});
db.connect((err) => {

 if (err){
    console.error('Database connection failed: ' + err.stack);
    return;
 }
console.log('conectado');
});




app.get('/clients', (req, res) => {
    db.query('SELECT * FROM clientes', (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(results);
        }
    });
});











app.get('/personal', (req, res) => {
    db.query('SELECT * FROM personal', (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(results);
        }
    });
});




app.get('/productos', (req, res) => {
    db.query('SELECT * FROM productos', (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(results);
        }
    });
});




app.get('/proveedores', (req, res) => {
    db.query('SELECT * FROM proveedores', (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(results);
        }
    });
});



app.get('/productos/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM productos WHERE id = ?', [id], (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else if (results.length === 0) {
            res.status(404).send('producto  not found');
        } else {
            res.json(results[0]);
        }
    });
});


app.get('/proveedores/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM proveedores WHERE id = ?', [id], (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else if (results.length === 0) {
            res.status(404).send('producto  not found');
        } else {
            res.json(results[0]);
        }
    });
});


app.get('/clients/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM clientes WHERE id = ?', [id], (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else if (results.length === 0) {
            res.status(404).send('Client not found');
        } else {
            res.json(results[0]);
        }
    });
});



app.post('/clients', (req, res) => {
    const newClient = req.body;
    db.query('INSERT INTO clientes SET ?', newClient, (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).json({ id: results.insertId, ...newClient });
        }
    });
});

app.post('/productos', (req, res) => {
    const newClient = req.body;
    db.query('INSERT INTO productos SET ?', newClient, (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).json({ id: results.insertId, ...newClient });
        }
    });
});

app.post('/proveedores', (req, res) => {
    const newClient = req.body;
    db.query('INSERT INTO proveedores SET ?', newClient, (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).json({ id: results.insertId, ...newClient });
        }
    });
});




app.post('/personal', (req, res) => {
    const newClient = req.body;
    db.query('INSERT INTO personal SET ?', newClient, (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).json({ id: results.insertId, ...newClient });
        }
    });
});







app.delete('/clients/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM clientes WHERE id = ?', [id], (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else if (results.affectedRows === 0) {
            res.status(404).send('Client not found');
        } else {
            res.status(204).send();
        }
    });
});




app.delete('/personal/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM personal WHERE id = ?', [id], (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else if (results.affectedRows === 0) {
            res.status(404).send('Client not found');
        } else {
            res.status(204).send();
        }
    });
});


app.delete('/productos/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM productos WHERE id = ?', [id], (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else if (results.affectedRows === 0) {
            res.status(404).send('producto not found');
        } else {
            res.status(204).send();
        }
    });
});

app.delete('/proveedores/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM proveedores WHERE id = ?', [id], (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else if (results.affectedRows === 0) {
            res.status(404).send('producto not found');
        } else {
            res.status(204).send();
        }
    });
});





app.put('/clients/:id', (req, res) => {
    const { id } = req.params;
    const updatedClient = req.body;
    db.query('UPDATE clientes SET ? WHERE id = ?', [updatedClient, id], (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else if (results.affectedRows === 0) {
            res.status(404).send('Client not found');
        } else {
            res.json({ id, ...updatedClient });
        }
    });
});

app.put('/personal/:id', (req, res) => {
    const { id } = req.params;
    const updatedClient = req.body;
    db.query('UPDATE personal SET ? WHERE id = ?', [updatedClient, id], (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else if (results.affectedRows === 0) {
            res.status(404).send('Client not found');
        } else {
            res.json({ id, ...updatedClient });
        }
    });
});




app.put('/productos/:id', (req, res) => {
    const { id } = req.params;
    const updatedproduct = req.body;
    db.query('UPDATE productos SET ? WHERE id = ?', [updatedproduct, id], (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else if (results.affectedRows === 0) {
            res.status(404).send('producto not found');
        } else {
            res.json({ id, ...updatedproduct});
        }
    });
});


app.put('/proveedores/:id', (req, res) => {
    const { id } = req.params;
    const updatedproduct = req.body;
    db.query('UPDATE proveedores SET ? WHERE id = ?', [updatedproduct, id], (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else if (results.affectedRows === 0) {
            res.status(404).send('producto not found');
        } else {
            res.json({ id, ...updatedproduct});
        }
    });
});









app.get('/factura', (req, res) => {
    const facturaQuery = `
        SELECT factura.id, clientes.nombrec AS nombre_clientes, clientes.id AS id_clientes
        FROM factura
        JOIN clientes ON factura.id_clientes = clientes.id;
    `;
    db.query(facturaQuery, (err, factura) => {
        if (err) throw err;

        const productQuery = `
            SELECT f_p.id_factura, productos.id, productos.nombrep, productos.precio_uni
            FROM f_p
            JOIN productos ON f_p.id_producto = productos.id;
        `;
        db.query(productQuery, (err, productos) => {
            if (err) throw err;

            // Combine invoices and their products
            const invoicesWithProducts = factura.map(factura => {
                const invoiceProducts = productos.filter(producto => producto.id_factura === factura.id);
                const total = invoiceProducts.reduce((sum, producto) => sum + parseFloat(producto.precio_uni), 0);
                return {
                    id: factura.id,
                    cliente: {
                        id: factura.id_clientes,
                        name: factura.nombre_clientes
                    },
                    productos: invoiceProducts,
                    total
                };
            });
            res.json(invoicesWithProducts);
        });
    });
});

app.post('/factura', (req, res) => {
    const { clienteId, productIds } = req.body;
    db.query('INSERT INTO factura (id_clientes) VALUES (?)', [clienteId], (err, result) => {
        if (err) throw err;
        const facturaId = result.insertId;
        const invoiceProductInserts = productIds.map(productId => [facturaId, productIds]);
        db.query('INSERT INTO f_p (id_factura, id_producto) VALUES ?', [invoiceProductInserts], (err) => {
            if (err) throw err;
            res.json({ id: facturaId });
        });
    });
});

app.put('/factura/:id', (req, res) => {
    const { id } = req.params;
    const { clienteId, productIds } = req.body;

    // Update customer reference
    db.query('UPDATE factura SET id_clientes = ? WHERE id = ?', [clienteId, id], (err) => {
        if (err) throw err;

        // Delete previous products
        db.query('DELETE FROM f_p WHERE id_factura = ?', [id], (err) => {
            if (err) throw err;

            // Insert new products
            const invoiceProductInserts = productIds.map(productId => [id, productId]);
            db.query('INSERT INTO f_p (id_factura, id_producto) VALUES ?', [invoiceProductInserts], (err) => {
                if (err) throw err;
                res.json({ id });
            });
        });
    });
});

app.delete('/factura/:id', (req, res) => {
    const { id } = req.params;

    // Delete the invoice and related products
    db.query('DELETE FROM f_p WHERE id_factura = ?', [id], (err) => {
        if (err) throw err;

        db.query('DELETE FROM factura WHERE id = ?', [id], (err) => {
            if (err) throw err;
            res.json({ message: 'Invoice deleted' });
        });
    });
});





app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

