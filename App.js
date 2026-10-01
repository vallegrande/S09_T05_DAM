import React, { useState, useMemo } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  SafeAreaView,
  StatusBar,
  Pressable,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { INITIAL_PRODUCTS } from './src/data/products';
import Header from './src/components/Header';
import SearchBar from './src/components/SearchBar';
import CategoryFilter from './src/components/CategoryFilter';
import ProductCard from './src/components/ProductCard';
import CartModal from './src/components/CartModal';
import SuccessModal from './src/components/SuccessModal';

export default function App() {
  // 1. ESTADO: Busqueda de texto (TextInput)
  const [searchQuery, setSearchQuery] = useState('');

  // 2. ESTADO: Categoria seleccionada (Pressable chips)
  const [selectedCategory, setSelectedCategory] = useState('all');

  // 3. ESTADO: Lista de IDs de productos favoritos (Pressable heart)
  const [favorites, setFavorites] = useState([1]);

  // 4. ESTADO: Filtro para visualizar unicamente favoritos
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  // 5. ESTADO: Carrito de compras (Coleccion de articulos con cantidad)
  const [cart, setCart] = useState([
    {
      id: 1,
      name: 'Aura Pro ANC Headphones',
      price: 199.99,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
      quantity: 1,
    },
  ]);

  // 6. ESTADO: Visibilidad del modal del carrito
  const [isCartOpen, setIsCartOpen] = useState(false);

  // 7. ESTADO: Datos de la orden confirmada y modal de exito
  const [orderData, setOrderData] = useState(null);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  // LOGICA DERIVADA: Total de articulos en carrito
  const totalCartCount = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  // LOGICA DERIVADA: Filtrado reactivo de productos
  const filteredProducts = useMemo(() => {
    return INITIAL_PRODUCTS.filter((product) => {
      // Condicion 1: Filtro por categoria
      const matchCategory =
        selectedCategory === 'all' || product.category === selectedCategory;

      // Condicion 2: Filtro por texto de busqueda
      const query = searchQuery.trim().toLowerCase();
      const matchSearch =
        query === '' ||
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query);

      // Condicion 3: Filtro solo favoritos
      const matchFavorite = !showOnlyFavorites || favorites.includes(product.id);

      return matchCategory && matchSearch && matchFavorite;
    });
  }, [searchQuery, selectedCategory, favorites, showOnlyFavorites]);

  // ACCION 1: Alternar estado de favorito para un producto
  const handleToggleFavorite = (productId) => {
    setFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  // ACCION 2: Agregar producto al carrito o incrementar su cantidad
  const handleAddToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: 1,
        },
      ];
    });
  };

  // ACCION 3: Disminuir cantidad o remover del carrito si llega a 0
  const handleRemoveFromCart = (productId) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === productId);
      if (!existing) return prev;
      if (existing.quantity <= 1) {
        return prev.filter((item) => item.id !== productId);
      }
      return prev.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
      );
    });
  };

  // ACCION 4: Eliminar articulo completo del carrito
  const handleDeleteCartItem = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  // ACCION 5: Vaciar carrito
  const handleClearCart = () => {
    setCart([]);
  };

  // ACCION 6: Confirmar compra / Checkout
  const handleCheckout = (data) => {
    setOrderData(data);
    setIsCartOpen(false);
    setIsSuccessOpen(true);
    setCart([]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#0F172A" />

      <View style={styles.container}>
        {/* Cabecera Principal */}
        <Header
          cartCount={totalCartCount}
          favoritesCount={favorites.length}
          onOpenCart={() => setIsCartOpen(true)}
          showOnlyFavorites={showOnlyFavorites}
          onToggleFilterFavorites={() => setShowOnlyFavorites((prev) => !prev)}
        />

        {/* Barra de Busqueda Interactiva con TextInput */}
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          onClear={() => setSearchQuery('')}
          resultsCount={filteredProducts.length}
          totalCount={INITIAL_PRODUCTS.length}
        />

        {/* Filtro de Categorias con Pressables */}
        <CategoryFilter
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        {/* Banner Condicional: Filtro de Favoritos Activo */}
        {showOnlyFavorites && (
          <View style={styles.favoriteActiveBanner}>
            <View style={styles.bannerLeft}>
              <Ionicons name="heart" size={16} color="#F43F5E" />
              <Text style={styles.bannerText}>
                Mostrando tus {favorites.length} favoritos
              </Text>
            </View>
            <Pressable
              onPress={() => setShowOnlyFavorites(false)}
              style={styles.bannerClearBtn}
            >
              <Text style={styles.bannerClearText}>Ver Todos</Text>
            </Pressable>
          </View>
        )}

        {/* Catalogo de Productos o Estado Vacio Condicional */}
        {filteredProducts.length === 0 ? (
          <View style={styles.emptyResultsWrapper}>
            <View style={styles.emptyIconBox}>
              <Ionicons name="search-outline" size={40} color="#64748B" />
            </View>
            <Text style={styles.emptyTitle}>Sin resultados encontrados</Text>
            <Text style={styles.emptySubtitle}>
              No hay productos que coincidan con los criterios seleccionados.
            </Text>
            <Pressable
              style={styles.resetFiltersBtn}
              onPress={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setShowOnlyFavorites(false);
              }}
            >
              <Ionicons name="refresh-outline" size={16} color="#FFFFFF" style={styles.btnIcon} />
              <Text style={styles.resetFiltersText}>Restablecer Filtros</Text>
            </Pressable>
          </View>
        ) : (
          <FlatList
            data={filteredProducts}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => {
              const cartItem = cart.find((c) => c.id === item.id);
              const quantityInCart = cartItem ? cartItem.quantity : 0;
              const isFav = favorites.includes(item.id);

              return (
                <ProductCard
                  product={item}
                  isFavorite={isFav}
                  cartQuantity={quantityInCart}
                  onToggleFavorite={handleToggleFavorite}
                  onAddToCart={handleAddToCart}
                  onRemoveFromCart={handleRemoveFromCart}
                />
              );
            }}
          />
        )}

        {/* Boton Flotante del Carrito (Visible cuando hay productos) */}
        {totalCartCount > 0 && (
          <Pressable
            style={styles.floatingCartBtn}
            onPress={() => setIsCartOpen(true)}
            accessibilityLabel="Ver resumen del carrito"
          >
            <View style={styles.floatingCartLeft}>
              <View style={styles.floatingBadge}>
                <Text style={styles.floatingBadgeText}>{totalCartCount}</Text>
              </View>
              <Text style={styles.floatingCartTitle}>Ver Carrito</Text>
            </View>
            <View style={styles.floatingCartRight}>
              <Text style={styles.floatingCartTotal}>
                $
                {cart
                  .reduce((sum, item) => sum + item.price * item.quantity, 0)
                  .toFixed(2)}
              </Text>
              <Ionicons name="chevron-forward" size={18} color="#FFFFFF" />
            </View>
          </Pressable>
        )}

        {/* Modal de Carrito Interactivo */}
        <CartModal
          visible={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cartItems={cart}
          onAddToCart={handleAddToCart}
          onRemoveFromCart={handleRemoveFromCart}
          onDeleteItem={handleDeleteCartItem}
          onClearCart={handleClearCart}
          onCheckout={handleCheckout}
        />

        {/* Modal de Confirmacion de Compra Exitosa */}
        <SuccessModal
          visible={isSuccessOpen}
          orderData={orderData}
          onClose={() => {
            setIsSuccessOpen(false);
            setOrderData(null);
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0F172A',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    backgroundColor: '#0B0F19',
  },
  listContent: {
    padding: 16,
    paddingBottom: 90,
  },
  favoriteActiveBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(244, 63, 94, 0.12)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(244, 63, 94, 0.25)',
  },
  bannerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  bannerText: {
    color: '#FDA4AF',
    fontSize: 12,
    fontWeight: '600',
  },
  bannerClearBtn: {
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 6,
    backgroundColor: 'rgba(244, 63, 94, 0.2)',
  },
  bannerClearText: {
    color: '#F43F5E',
    fontSize: 11,
    fontWeight: '700',
  },
  emptyResultsWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  emptyIconBox: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#1E293B',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  emptyTitle: {
    color: '#F8FAFC',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 6,
  },
  emptySubtitle: {
    color: '#64748B',
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 19,
    marginBottom: 20,
  },
  resetFiltersBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4F46E5',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
  },
  btnIcon: {
    marginRight: 6,
  },
  resetFiltersText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 13,
  },
  floatingCartBtn: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#4F46E5',
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  floatingCartLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  floatingBadge: {
    backgroundColor: '#10B981',
    minWidth: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
  floatingBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },
  floatingCartTitle: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 15,
  },
  floatingCartRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  floatingCartTotal: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 16,
  },
});
