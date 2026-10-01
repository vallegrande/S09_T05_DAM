# S09_T05_DAM — NovaTech Store

Proyecto desarrollado para la sesión **S09 | M09: Manejo de Estados y Lógica de Componentes: De una interfaz estática a una interfaz interactiva** en **React Native + Expo**.

## Equipo
- **Grupo:** Team 05
- **Materia:** Desarrollo de Aplicaciones Móviles (DAM)
- **App:** NovaTech — Smart Gear & Audio Store

## Características Principales
- **Diseño Moderno & Sin Emojis:** Interfaz temática oscura de alta fidelidad utilizando únicamente iconografía vectorial oficial (`@expo/vector-icons / Ionicons`).
- **Manejo Integral de Estado (`useState`):**
  - Búsqueda en vivo (`searchQuery`).
  - Categorías dinámicas (`selectedCategory`).
  - Sistema de favoritos reactivo con persistencia temporal (`favorites`).
  - Filtro exclusivo de favoritos (`showOnlyFavorites`).
  - Carrito de compras interactivo con actualización de cantidades por artículo (`cart`).
  - Descuentos con cupones interactivos (`couponApplied`, código `TEAM05`).
  - Pantallas modales dinámicas (`CartModal`, `SuccessModal`).
- **Lógica Condicional:** Uso de operadores ternarios `? :` y cortocircuito lógico `&&` para alternar estados visuales, badges, listas vacías y confirmaciones de pago.

## Capturas de Pantalla

| Catálogo Inicial | Búsqueda Reactiva |
| :---: | :---: |
| ![Catálogo Inicial](./docs/screenshots/01_catalogo_inicial.png) | ![Búsqueda Reactiva](./docs/screenshots/02_busqueda_reactiva.png) |

| Favoritos y Badges | Scroll y Acciones |
| :---: | :---: |
| ![Favoritos](./docs/screenshots/03_favoritos_actualizados.png) | ![Scroll](./docs/screenshots/04_catalogo_scroll.png) |

## Ejecución del Proyecto

```bash
# Instalar dependencias (si es primera vez)
npm install

# Iniciar servidor web
npm run web

# Iniciar en Expo Go (Android/iOS)
npm start
```

Para consultar el informe completo con las respuestas detalladas a las preguntas de la guía docente, consultar [DOCUMENTO_ENTREGA_S09_T05_DAM.md](./DOCUMENTO_ENTREGA_S09_T05_DAM.md).
