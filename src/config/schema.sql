-- Crear tabla de usuarios
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  role VARCHAR(50) DEFAULT 'customer',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Crear tabla de estaciones
CREATE TABLE IF NOT EXISTS stations (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  latitude DECIMAL(10,8) NOT NULL,
  longitude DECIMAL(10,8) NOT NULL,
  address TEXT NOT NULL,
  available_units INT DEFAULT 0,
  total_units INT DEFAULT 10,
  device_types TEXT[] DEFAULT ARRAY['Smartphones'],
  status VARCHAR(50) DEFAULT 'activa',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Crear tabla de power banks
CREATE TABLE IF NOT EXISTS powerbanks (
  id SERIAL PRIMARY KEY,
  station_id INT REFERENCES stations(id) ON DELETE CASCADE,
  capacity_mah INT DEFAULT 20000,
  status VARCHAR(50) DEFAULT 'available',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Crear tabla de contactos
CREATE TABLE IF NOT EXISTS contact_forms (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'new',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Crear tabla de solicitudes de franquicia
CREATE TABLE IF NOT EXISTS franchise_requests (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  business_name VARCHAR(255),
  location VARCHAR(255),
  type VARCHAR(50) DEFAULT 'franchise',
  message TEXT,
  status VARCHAR(50) DEFAULT 'new',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Crear tabla de rentales
CREATE TABLE IF NOT EXISTS rentals (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) ON DELETE SET NULL,
  powerbank_id INT REFERENCES powerbanks(id) ON DELETE SET NULL,
  pickup_time TIMESTAMP NOT NULL,
  return_time TIMESTAMP,
  cost DECIMAL(10,2),
  status VARCHAR(50) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_stations_location ON stations(latitude, longitude);
CREATE INDEX IF NOT EXISTS idx_rentals_user ON rentals(user_id);
CREATE INDEX IF NOT EXISTS idx_contact_forms_email ON contact_forms(email);
CREATE INDEX IF NOT EXISTS idx_franchise_email ON franchise_requests(email);
