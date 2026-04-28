# Test de APIs - Chaskier Backend

## 🔗 Health Check
```bash
curl http://localhost:3000/api/health
```

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2024-04-27T...",
  "environment": "development"
}
```

---

## 📧 Contact Form

### POST /api/contact
```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Juan Pérez",
    "email": "juan@example.com",
    "message": "Me interesa conocer más sobre Chaskier"
  }'
```

**Response:**
```json
{
  "success": true,
  "message": "¡Mensaje recibido! Nos contactaremos pronto.",
  "data": {
    "id": 1,
    "name": "Juan Pérez",
    "email": "juan@example.com",
    "message": "Me interesa conocer más sobre Chaskier",
    "status": "nuevo",
    "createdAt": "2024-04-27T..."
  }
}
```

### GET /api/contact (admin)
```bash
curl http://localhost:3000/api/contact
```

---

## 🏪 Estaciones

### GET /api/stations
```bash
curl http://localhost:3000/api/stations
```

**Response:**
```json
{
  "success": true,
  "total": 3,
  "stations": [
    {
      "id": 1,
      "name": "Estación Centro Lima",
      "latitude": -12.0464,
      "longitude": -77.0428,
      "address": "Jirón de la Unión 500, Lima",
      "availableUnits": 12,
      "totalUnits": 15,
      "deviceTypes": ["Smartphones", "Tablets", "Auriculares"],
      "status": "activa"
    }
  ]
}
```

### GET /api/stations/:id
```bash
curl http://localhost:3000/api/stations/1
```

### GET /api/stations/search/nearby
```bash
curl "http://localhost:3000/api/stations/search/nearby?lat=-12.0464&lng=-77.0428&radius=5"
```

### POST /api/stations (admin)
```bash
curl -X POST http://localhost:3000/api/stations \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Estación Miraflores",
    "latitude": -12.1136,
    "longitude": -77.0282,
    "address": "Av. Principal 100, Miraflores",
    "totalUnits": 15,
    "deviceTypes": ["Smartphones", "Tablets"]
  }'
```

---

## 🏢 Franquicia

### POST /api/franchise
```bash
curl -X POST http://localhost:3000/api/franchise \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Carlos López",
    "email": "carlos@hotel.com",
    "phone": "+51987654321",
    "businessName": "Hotel Plaza Mayor",
    "location": "Lima Centro",
    "type": "host",
    "message": "Queremos instalar una estación en nuestro lobby"
  }'
```

### GET /api/franchise (admin)
```bash
curl http://localhost:3000/api/franchise
```

### GET /api/franchise/:id
```bash
curl http://localhost:3000/api/franchise/1
```

### PUT /api/franchise/:id/status (admin)
```bash
curl -X PUT http://localhost:3000/api/franchise/1/status \
  -H "Content-Type: application/json" \
  -d '{
    "status": "aprobada"
  }'
```

---

## 📝 Notas

- Todos los endpoints están usando datos en memoria (simulados)
- Próximamente se conectarán a PostgreSQL
- JWT y autenticación serán agregados después
- Rate limiting será implementado para producción
