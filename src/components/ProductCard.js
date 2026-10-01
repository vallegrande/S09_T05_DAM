import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ProductCard({
  product,
  isFavorite,
  cartQuantity,
  onToggleFavorite,
  onAddToCart,
  onRemoveFromCart,
}) {
  const isInCart = cartQuantity > 0;

  return (
    <View style={styles.card}>
      {/* Product Image and Top Badges */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: product.image }}
          style={styles.image}
          resizeMode="cover"
        />

        {/* Category / Feature Tag */}
        <View style={styles.tagBadge}>
          <Text style={styles.tagText}>{product.tag}</Text>
        </View>

        {/* Favorite Pressable Toggle */}
        <Pressable
          style={[
            styles.favoriteButton,
            isFavorite && styles.favoriteButtonActive,
          ]}
          onPress={() => onToggleFavorite(product.id)}
          accessibilityLabel={isFavorite ? "Quitar de favoritos" : "Guardar en favoritos"}
        >
          <Ionicons
            name={isFavorite ? 'heart' : 'heart-outline'}
            size={18}
            color={isFavorite ? '#F43F5E' : '#FFFFFF'}
          />
        </Pressable>
      </View>

      {/* Content Section */}
      <View style={styles.content}>
        {/* Rating and Reviews */}
        <View style={styles.ratingRow}>
          <View style={styles.starsWrapper}>
            <Ionicons name="star" size={14} color="#F59E0B" />
            <Text style={styles.ratingScore}>{product.rating.toFixed(1)}</Text>
          </View>
          <Text style={styles.reviewsCount}>({product.reviewsCount} resenas)</Text>
          <View style={styles.categoryDot} />
          <Text style={styles.categoryLabel}>{product.categoryName}</Text>
        </View>

        {/* Product Name */}
        <Text style={styles.productName} numberOfLines={1}>
          {product.name}
        </Text>

        {/* Short Description */}
        <Text style={styles.description} numberOfLines={2}>
          {product.description}
        </Text>

        {/* Bottom Section: Price & Action */}
        <View style={styles.footerRow}>
          <View>
            <Text style={styles.priceLabel}>Precio</Text>
            <View style={styles.priceContainer}>
              <Text style={styles.currentPrice}>${product.price.toFixed(2)}</Text>
              <Text style={styles.originalPrice}>${product.originalPrice.toFixed(2)}</Text>
            </View>
          </View>

          {/* Conditional Cart Button / Stepper */}
          {isInCart ? (
            <View style={styles.stepperContainer}>
              <Pressable
                style={styles.stepBtn}
                onPress={() => onRemoveFromCart(product.id)}
                accessibilityLabel="Disminuir cantidad"
              >
                <Ionicons name="remove-outline" size={16} color="#F8FAFC" />
              </Pressable>

              <View style={styles.stepValueBadge}>
                <Text style={styles.stepValueText}>{cartQuantity}</Text>
              </View>

              <Pressable
                style={styles.stepBtn}
                onPress={() => onAddToCart(product)}
                accessibilityLabel="Aumentar cantidad"
              >
                <Ionicons name="add-outline" size={16} color="#F8FAFC" />
              </Pressable>
            </View>
          ) : (
            <Pressable
              style={styles.addCartBtn}
              onPress={() => onAddToCart(product)}
              accessibilityLabel="Agregar al carrito"
            >
              <Ionicons name="cart-outline" size={16} color="#FFFFFF" style={styles.btnIcon} />
              <Text style={styles.addCartText}>Agregar</Text>
            </Pressable>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#131B2E',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#202D45',
    marginBottom: 16,
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
    height: 180,
    backgroundColor: '#0F172A',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  tagBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: 'rgba(15, 23, 42, 0.85)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  tagText: {
    color: '#38BDF8',
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  favoriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(15, 23, 42, 0.75)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  favoriteButtonActive: {
    backgroundColor: 'rgba(244, 63, 94, 0.25)',
    borderColor: '#F43F5E',
  },
  content: {
    padding: 16,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  starsWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  ratingScore: {
    color: '#F59E0B',
    fontSize: 12,
    fontWeight: '700',
    marginLeft: 2,
  },
  reviewsCount: {
    color: '#64748B',
    fontSize: 11,
    marginLeft: 4,
  },
  categoryDot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: '#475569',
    marginHorizontal: 6,
  },
  categoryLabel: {
    color: '#94A3B8',
    fontSize: 11,
    fontWeight: '500',
  },
  productName: {
    color: '#F8FAFC',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  description: {
    color: '#94A3B8',
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 14,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#1E293B',
  },
  priceLabel: {
    color: '#64748B',
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 6,
  },
  currentPrice: {
    color: '#F8FAFC',
    fontSize: 18,
    fontWeight: '800',
  },
  originalPrice: {
    color: '#64748B',
    fontSize: 12,
    textDecorationLine: 'line-through',
  },
  addCartBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4F46E5',
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 10,
  },
  btnIcon: {
    marginRight: 6,
  },
  addCartText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  stepperContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#334155',
    padding: 3,
  },
  stepBtn: {
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: '#334155',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepValueBadge: {
    minWidth: 28,
    paddingHorizontal: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepValueText: {
    color: '#F8FAFC',
    fontSize: 13,
    fontWeight: '700',
  },
});
