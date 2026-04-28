const express = require('express');
const router = express.Router();
const Station = require('../models/Station');

/**
 * GET /api/stations
 * Listar todas las estaciones
 */
router.get('/', async (req, res) => {
  try {
    const stations = await Station.findAll();
    res.json({
      success: true,
      total: stations.length,
      stations: stations
    });
  } catch (error) {
    console.error('Error obteniendo estaciones:', error);
    res.status(500).json({ error: 'Error al obtener estaciones' });
  }
});

/**
 * GET /api/stations/:id
 * Obtener una estación específica
 */
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const station = await Station.findById(id);

    if (!station) {
      return res.status(404).json({
        error: 'Estación no encontrada'
      });
    }

    res.json({
      success: true,
      station: station
    });
  } catch (error) {
    console.error('Error obteniendo estación:', error);
    res.status(500).json({ error: 'Error al obtener estación' });
  }
});

/**
 * GET /api/stations/search/nearby?lat=&lng=&radius=
 * Obtener estaciones cercanas (por coordenadas)
 */
router.get('/search/nearby', async (req, res) => {
  try {
    const { lat, lng, radius = 5 } = req.query;

    if (!lat || !lng) {
      return res.status(400).json({
        error: 'Latitude y longitude requeridos'
      });
    }

    const nearby = await Station.findNearby(lat, lng, radius);

    res.json({
      success: true,
      userLocation: { lat, lng },
      radiusKm: radius,
      found: nearby.length,
      stations: nearby
    });
  } catch (error) {
    console.error('Error buscando estaciones cercanas:', error);
    res.status(500).json({ error: 'Error al buscar estaciones' });
  }
});

/**
 * POST /api/stations
 * Crear nueva estación (admin)
 */
router.post('/', async (req, res) => {
  try {
    const { name, latitude, longitude, address, totalUnits, deviceTypes } = req.body;

    if (!name || !latitude || !longitude || !address) {
      return res.status(400).json({
        error: 'Campos requeridos: name, latitude, longitude, address'
      });
    }

    const newStation = await Station.create(
      name,
      parseFloat(latitude),
      parseFloat(longitude),
      address,
      totalUnits || 10,
      deviceTypes || ['Smartphones']
    );

    console.log(`✅ Nueva estación creada: ${name}`);

    res.status(201).json({
      success: true,
      message: 'Estación creada exitosamente',
      station: newStation
    });

  } catch (error) {
    console.error('Error creando estación:', error);
    res.status(500).json({
      error: 'Error al crear la estación'
    });
  }
});

module.exports = router;
