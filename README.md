# NovaTech — Smart Gear & Audio Store

Aplicación móvil desarrollada con **React Native** y **Expo** para la gestión reactiva de catálogos de tecnología, filtrado dinámico, favoritos y carrito de compras en tiempo real.

## Tecnologías Utilizadas
- **React Native** (0.86.3)
- **Expo** (SDK 57)
- **@expo/vector-icons** (Ionicons)
- **React Hooks** (`useState`, `useMemo`)

## Instalación y Ejecución

```bash
# 1. Instalar dependencias
npm install

# 2. Ejecutar en navegador web
npm run web

# 3. Ejecutar en dispositivo móvil (Expo Go)
npm start
```

## Estructura del Proyecto

```text
S09_T05_DAM/
├── App.js                      # Componente principal y gestión global de estados
├── app.json                    # Configuración de Expo
├── package.json
└── src/
    ├── components/
    │   ├── Header.js           # Cabecera con insignias y contadores reactivos
    │   ├── SearchBar.js        # Buscador interactivo (TextInput)
    │   ├── CategoryFilter.js   # Filtro horizontal por categorías (Pressable)
    │   ├── ProductCard.js      # Tarjeta de producto con acciones y steppers
    │   ├── CartModal.js        # Modal interactivo de carrito y cupones
    │   └── SuccessModal.js     # Modal de confirmación de compra
    └── data/
        └── products.js         # Datos del catálogo de productos
```
