const express = require('express');
const sql = require('mssql');
const cors = require('cors');

const app = express();
app.use(express.json()); // Para entender datos JSON
app.use(cors());         // Para permitir peticiones del navegador

const config = {
    user: 'sa',
    password: 'password123', // La que pusiste en el paso 2
    server: 'localhost',
    database: 'FormularioDB',
    options: {
        encrypt: false, // Cambiar a true si usas Azure
        trustServerCertificate: true
    }
};

app.post('/api/guardar', async (req, res) => {
    try {
        let pool = await sql.connect(config);
        await pool.request()
            .input('nombre', sql.NVarChar, req.body.nombre)
            .input('email', sql.NVarChar, req.body.email)
            .query('INSERT INTO Usuarios (Nombre, CorreoElectronico) VALUES (@nombre, @email)');
        
        res.status(200).send({ mensaje: "¡Guardado con éxito!" });
    } catch (err) {
        console.error(err);
        res.status(500).send({ mensaje: "Error al guardar" });
    }
});

app.use(express.json());

// Prueba de conexión inicial
sql.connect(dbConfig).then(pool => {
    if (pool.connected) {
        console.log("✅ CONECTADO A SQL SERVER EXITOSAMENTE");
    }
}).catch(err => {
    console.log("❌ ERROR DE CONEXIÓN A SQL:");
    console.error(err);
});
app.listen(3000, () => {
    console.log("🚀 Servidor corriendo en http://localhost:3000");
});

app.listen(3000, () => console.log("Servidor en http://localhost:3000"));