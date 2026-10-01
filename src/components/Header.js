import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Header({
  cartCount,
  favoritesCount,
  onOpenCart,
  showOnlyFavorites,
  onToggleFilterFavorites,
}) {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.leftSection}>
        <View style={styles.logoBadge}>
          <Ionicons name="hardware-chip-outline" size={22} color="#6366F1" />
        </View>
        <View>
          <View style={styles.titleRow}>
            <Text style={styles.brandTitle}>NovaTech</Text>
            <View style={styles.teamTag}>
              <Text style={styles.teamTagText}>TEAM 05</Text>
            </View>
          </View>
          <Text style={styles.subtitle}>DAM • Estado e Interactividad</Text>
        </View>
      </View>

      <View style={styles.rightSection}>
        {/* Toggle Favorites Filter Button */}
        <Pressable
          style={[
            styles.iconButton,
            showOnlyFavorites && styles.iconButtonActive,
          ]}
          onPress={onToggleFilterFavorites}
          accessibilityLabel="Filtrar favoritos"
        >
          <Ionicons
            name={showOnlyFavorites ? 'heart' : 'heart-outline'}
            size={22}
            color={showOnlyFavorites ? '#F43F5E' : '#94A3B8'}
          />
          {favoritesCount > 0 && (
            <View
              style={[
                styles.badge,
                showOnlyFavorites && styles.favoriteBadgeActive,
              ]}
            >
              <Text style={styles.badgeText}>{favoritesCount}</Text>
            </View>
          )}
        </Pressable>

        {/* Open Cart Button */}
        <Pressable
          style={styles.cartButton}
          onPress={onOpenCart}
          accessibilityLabel="Abrir carrito"
        >
          <Ionicons name="cart-outline" size={22} color="#FFFFFF" />
          {cartCount > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.badgeText}>{cartCount}</Text>
            </View>
          )}
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 14,
    backgroundColor: '#0F172A',
    borderBottomWidth: 1,
    borderBottomColor: '#1E293B',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  logoBadge: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: 'rgba(99, 102, 241, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.35)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  brandTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#F8FAFC',
    letterSpacing: 0.3,
  },
  teamTag: {
    backgroundColor: '#312E81',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#4338CA',
  },
  teamTagText: {
    color: '#A5B4FC',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  iconButton: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: '#1E293B',
    borderWidth: 1,
    borderColor: '#334155',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  iconButtonActive: {
    backgroundColor: 'rgba(244, 63, 94, 0.15)',
    borderColor: 'rgba(244, 63, 94, 0.4)',
  },
  cartButton: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: '#4F46E5',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#F43F5E',
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
    borderWidth: 1.5,
    borderColor: '#0F172A',
  },
  favoriteBadgeActive: {
    backgroundColor: '#E11D48',
  },
  cartBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#10B981',
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
    borderWidth: 1.5,
    borderColor: '#0F172A',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
});
