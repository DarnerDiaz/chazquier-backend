require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Importar configuración de BD
const pool = require('./config/database');

// Importar rutas
const contactRoutes = require('./routes/contact');
const stationsRoutes = require('./routes/stations');
const franchiseRoutes = require('./routes/franchise');

const app = express();

// Middleware
const corsOptions = process.env.NODE_ENV === 'production'
  ? {
      origin: ['https://chazquier.com', 'https://www.chazquier.com'],
      credentials: false
    }
  : {
      origin: (origin, callback) => {
        // Permitir null (file://), localhost y cualquier origen en desarrollo
        callback(null, true);
      },
      credentials: false,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization']
    };

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/api/contact', contactRoutes);
app.use('/api/stations', stationsRoutes);
app.use('/api/franchise', franchiseRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date(),
    environment: process.env.NODE_ENV 
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Algo salió mal en el servidor',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 404
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor Chaskier corriendo en puerto ${PORT}`);
  console.log(`📍 Ambiente: ${process.env.NODE_ENV}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/api/health`);
  console.log(`📦 Base de datos: ${process.env.DB_HOST}:${process.env.DB_PORT}`);
});
