# Backend de Chaskier

API REST para gestionar:
- Estaciones de power banks
- Formularios de contacto
- Solicitudes de franquicia/host
- Rentales (próximamente)
- Autenticación (próximamente)

## 🚀 Instalación

```bash
npm install
```

## 📝 Configuración

Crear archivo `.env` con:
```
PORT=3000
NODE_ENV=development
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=chaskier
JWT_SECRET=tu_secreto
FRONTEND_URL=http://localhost:3000
```

## ▶️ Ejecutar

```bash
npm start          # Modo producción
npm run dev        # Modo desarrollo (con nodemon)
npm run test       # Tests (próximamente)
```

## 📚 API Endpoints

### Salud
```
GET /api/health
```

### Contacto
```
POST /api/contact
  Body: { name, email, message }

GET /api/contact (admin)
```

### Estaciones
```
GET /api/stations
GET /api/stations/:id
GET /api/stations/search/nearby?lat=&lng=&radius=

POST /api/stations (admin)
  Body: { name, latitude, longitude, address, totalUnits, deviceTypes }
```

### Franquicia
```
POST /api/franchise
  Body: { name, email, phone, businessName, location, type, message }

GET /api/franchise (admin)
GET /api/franchise/:id

PUT /api/franchise/:id/status (admin)
  Body: { status: 'nueva|revisada|aprobada|rechazada' }
```

## 🗄️ Base de Datos

Próximamente: Migraciones y modelos PostgreSQL

## 🔐 Seguridad

- [ ] Autenticación JWT
- [ ] Rate limiting
- [ ] Validación de entrada
- [ ] CORS configurado
- [ ] HTTPS en producción

## 📦 Deploy

Próximamente: Railway, Heroku, Vercel

## 📄 Licencia

MIT
