import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Pressable,
  ScrollView,
  Image,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function CartModal({
  visible,
  onClose,
  cartItems,
  onAddToCart,
  onRemoveFromCart,
  onDeleteItem,
  onClearCart,
  onCheckout,
}) {
  const [couponInput, setCouponInput] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState('');

  // Calculate pricing
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const discountRate = couponApplied ? 0.15 : 0;
  const discountAmount = subtotal * discountRate;
  const shippingCost = subtotal > 200 || subtotal === 0 ? 0 : 15.0;
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingCost);
  const totalItemCount = cartItems.reduce((acc, it) => acc + it.quantity, 0);

  const handleApplyCoupon = () => {
    const code = couponInput.trim().toUpperCase();
    if (!code) {
      setCouponError('Ingresa un codigo de cupon');
      return;
    }

    if (code === 'TEAM05' || code === 'PROMO15' || code === 'EXPO') {
      setCouponApplied(true);
      setCouponError('');
    } else {
      setCouponApplied(false);
      setCouponError('Codigo invalido. Prueba con "TEAM05"');
    }
  };

  const handleRemoveCoupon = () => {
    setCouponApplied(false);
    setCouponInput('');
    setCouponError('');
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalCard}>
          {/* Header */}
          <View style={styles.modalHeader}>
            <View style={styles.headerTitleRow}>
              <View style={styles.cartIconWrapper}>
                <Ionicons name="cart" size={20} color="#6366F1" />
              </View>
              <View>
                <Text style={styles.modalTitle}>Carrito de Compras</Text>
                <Text style={styles.modalSubtitle}>
                  {totalItemCount} {totalItemCount === 1 ? 'articulo' : 'articulos'} seleccionados
                </Text>
              </View>
            </View>

            <Pressable
              style={styles.closeBtn}
              onPress={onClose}
              accessibilityLabel="Cerrar carrito"
            >
              <Ionicons name="close" size={20} color="#94A3B8" />
            </Pressable>
          </View>

          {/* Conditional Content: Empty State vs Cart List */}
          {cartItems.length === 0 ? (
            <View style={styles.emptyContainer}>
              <View style={styles.emptyIconCircle}>
                <Ionicons name="bag-remove-outline" size={48} color="#475569" />
              </View>
              <Text style={styles.emptyTitle}>Tu carrito esta vacio</Text>
              <Text style={styles.emptyDesc}>
                Explora el catalogo y agrega dispositivos de ultima generacion.
              </Text>
              <Pressable style={styles.exploreBtn} onPress={onClose}>
                <Ionicons name="compass-outline" size={18} color="#FFFFFF" style={styles.btnIcon} />
                <Text style={styles.exploreBtnText}>Explorar Productos</Text>
              </Pressable>
            </View>
          ) : (
            <ScrollView
              style={styles.itemsScroll}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.itemsScrollContent}
            >
              {/* Product items list */}
              <View style={styles.itemsList}>
                {cartItems.map((item) => (
                  <View key={item.id} style={styles.cartItemRow}>
                    <Image source={{ uri: item.image }} style={styles.itemThumb} />

                    <View style={styles.itemInfo}>
                      <Text style={styles.itemTitle} numberOfLines={1}>
                        {item.name}
                      </Text>
                      <Text style={styles.itemUnitPrice}>
                        ${item.price.toFixed(2)} c/u
                      </Text>

                      {/* Stepper controls */}
                      <View style={styles.itemControls}>
                        <View style={styles.stepperMini}>
                          <Pressable
                            style={styles.stepMiniBtn}
                            onPress={() => onRemoveFromCart(item.id)}
                            accessibilityLabel="Restar 1"
                          >
                            <Ionicons name="remove" size={14} color="#F8FAFC" />
                          </Pressable>

                          <Text style={styles.stepMiniVal}>{item.quantity}</Text>

                          <Pressable
                            style={styles.stepMiniBtn}
                            onPress={() => onAddToCart(item)}
                            accessibilityLabel="Sumar 1"
                          >
                            <Ionicons name="add" size={14} color="#F8FAFC" />
                          </Pressable>
                        </View>

                        <Text style={styles.itemTotal}>
                          ${(item.price * item.quantity).toFixed(2)}
                        </Text>
                      </View>
                    </View>

                    {/* Delete Item Button */}
                    <Pressable
                      style={styles.deleteBtn}
                      onPress={() => onDeleteItem(item.id)}
                      accessibilityLabel="Eliminar producto"
                    >
                      <Ionicons name="trash-outline" size={18} color="#EF4444" />
                    </Pressable>
                  </View>
                ))}
              </View>

              {/* Coupon Section */}
              <View style={styles.couponCard}>
                <View style={styles.couponHeader}>
                  <Ionicons name="pricetag-outline" size={16} color="#6366F1" />
                  <Text style={styles.couponTitle}>Cupon de Descuento</Text>
                </View>

                {couponApplied ? (
                  <View style={styles.couponAppliedRow}>
                    <View style={styles.appliedBadge}>
                      <Ionicons name="checkmark-circle" size={16} color="#10B981" />
                      <Text style={styles.appliedText}>
                        Cupon TEAM05 aplicado (-15%)
                      </Text>
                    </View>
                    <Pressable onPress={handleRemoveCoupon} style={styles.removeCouponBtn}>
                      <Ionicons name="close-circle-outline" size={18} color="#94A3B8" />
                    </Pressable>
                  </View>
                ) : (
                  <View style={styles.couponInputRow}>
                    <TextInput
                      style={styles.couponTextInput}
                      placeholder="Ej: TEAM05"
                      placeholderTextColor="#64748B"
                      value={couponInput}
                      onChangeText={(text) => {
                        setCouponInput(text);
                        if (couponError) setCouponError('');
                      }}
                      autoCapitalize="characters"
                    />
                    <Pressable style={styles.applyCouponBtn} onPress={handleApplyCoupon}>
                      <Text style={styles.applyCouponBtnText}>Aplicar</Text>
                    </Pressable>
                  </View>
                )}

                {/* Conditional Coupon Error */}
                {couponError.length > 0 && (
                  <View style={styles.couponErrorRow}>
                    <Ionicons name="alert-circle-outline" size={14} color="#F59E0B" />
                    <Text style={styles.couponErrorText}>{couponError}</Text>
                  </View>
                )}
              </View>

              {/* Summary Calculations */}
              <View style={styles.summaryCard}>
                <Text style={styles.summaryCardTitle}>Resumen de Orden</Text>

                <View style={styles.summaryLine}>
                  <Text style={styles.summaryLabel}>Subtotal</Text>
                  <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
                </View>

                {/* Conditional discount line */}
                {couponApplied && (
                  <View style={styles.summaryLine}>
                    <Text style={[styles.summaryLabel, styles.discountText]}>
                      Descuento Especial (15%)
                    </Text>
                    <Text style={[styles.summaryValue, styles.discountText]}>
                      -${discountAmount.toFixed(2)}
                    </Text>
                  </View>
                )}

                <View style={styles.summaryLine}>
                  <Text style={styles.summaryLabel}>Envio Seguro</Text>
                  <Text style={styles.summaryValue}>
                    {shippingCost === 0 ? 'GRATIS' : `$${shippingCost.toFixed(2)}`}
                  </Text>
                </View>

                {subtotal > 0 && subtotal <= 200 && (
                  <Text style={styles.shippingNotice}>
                    Agrega ${(200 - subtotal).toFixed(2)} mas para envio gratis
                  </Text>
                )}

                <View style={styles.divider} />

                <View style={styles.totalLine}>
                  <Text style={styles.totalLabel}>Total a Pagar</Text>
                  <Text style={styles.totalValue}>${grandTotal.toFixed(2)}</Text>
                </View>
              </View>

              {/* Action Buttons */}
              <View style={styles.actionButtonsCol}>
                <Pressable
                  style={styles.checkoutBtn}
                  onPress={() => onCheckout({ grandTotal, totalItemCount })}
                >
                  <Ionicons name="shield-checkmark-outline" size={18} color="#FFFFFF" style={styles.btnIcon} />
                  <Text style={styles.checkoutBtnText}>Confirmar y Pagar</Text>
                </Pressable>

                <Pressable style={styles.clearBtn} onPress={onClearCart}>
                  <Ionicons name="trash-outline" size={16} color="#94A3B8" style={styles.btnIcon} />
                  <Text style={styles.clearBtnText}>Vaciar Carrito</Text>
                </Pressable>
              </View>
            </ScrollView>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    justifyContent: 'flex-end',
  },
  modalCard: {
    backgroundColor: '#0F172A',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '90%',
    paddingBottom: 24,
    borderWidth: 1,
    borderColor: '#1E293B',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1E293B',
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  cartIconWrapper: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: 'rgba(99, 102, 241, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#F8FAFC',
  },
  modalSubtitle: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 1,
  },
  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#1E293B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyIconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#1E293B',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#F8FAFC',
    marginBottom: 6,
  },
  emptyDesc: {
    fontSize: 13,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 19,
    marginBottom: 24,
  },
  exploreBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4F46E5',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
  },
  exploreBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },
  itemsScroll: {
    maxHeight: 500,
  },
  itemsScrollContent: {
    padding: 20,
  },
  itemsList: {
    gap: 12,
    marginBottom: 20,
  },
  cartItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#131B2E',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: '#202D45',
  },
  itemThumb: {
    width: 60,
    height: 60,
    borderRadius: 10,
    backgroundColor: '#0F172A',
  },
  itemInfo: {
    flex: 1,
    marginLeft: 12,
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#F8FAFC',
    marginBottom: 2,
  },
  itemUnitPrice: {
    fontSize: 11,
    color: '#64748B',
    marginBottom: 6,
  },
  itemControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  stepperMini: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#334155',
    padding: 2,
  },
  stepMiniBtn: {
    width: 24,
    height: 24,
    borderRadius: 6,
    backgroundColor: '#334155',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepMiniVal: {
    color: '#F8FAFC',
    fontSize: 12,
    fontWeight: '700',
    paddingHorizontal: 8,
  },
  itemTotal: {
    color: '#F8FAFC',
    fontWeight: '700',
    fontSize: 13,
  },
  deleteBtn: {
    padding: 8,
    marginLeft: 8,
  },
  couponCard: {
    backgroundColor: '#131B2E',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#202D45',
    marginBottom: 16,
  },
  couponHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 10,
  },
  couponTitle: {
    color: '#F8FAFC',
    fontSize: 13,
    fontWeight: '700',
  },
  couponInputRow: {
    flexDirection: 'row',
    gap: 8,
  },
  couponTextInput: {
    flex: 1,
    backgroundColor: '#1E293B',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#334155',
    paddingHorizontal: 12,
    height: 40,
    color: '#F8FAFC',
    fontSize: 13,
  },
  applyCouponBtn: {
    backgroundColor: '#4F46E5',
    borderRadius: 10,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  applyCouponBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13,
  },
  couponAppliedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(16, 185, 129, 0.12)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.3)',
  },
  appliedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  appliedText: {
    color: '#10B981',
    fontSize: 12,
    fontWeight: '600',
  },
  removeCouponBtn: {
    padding: 2,
  },
  couponErrorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 8,
  },
  couponErrorText: {
    color: '#F59E0B',
    fontSize: 11,
  },
  summaryCard: {
    backgroundColor: '#131B2E',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#202D45',
    marginBottom: 20,
  },
  summaryCardTitle: {
    color: '#F8FAFC',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 12,
  },
  summaryLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    color: '#94A3B8',
    fontSize: 13,
  },
  summaryValue: {
    color: '#F8FAFC',
    fontSize: 13,
    fontWeight: '600',
  },
  discountText: {
    color: '#10B981',
  },
  shippingNotice: {
    color: '#6366F1',
    fontSize: 11,
    marginBottom: 8,
  },
  divider: {
    height: 1,
    backgroundColor: '#1E293B',
    marginVertical: 10,
  },
  totalLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    color: '#F8FAFC',
    fontSize: 15,
    fontWeight: '800',
  },
  totalValue: {
    color: '#6366F1',
    fontSize: 20,
    fontWeight: '900',
  },
  actionButtonsCol: {
    gap: 10,
  },
  checkoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#10B981',
    paddingVertical: 14,
    borderRadius: 12,
  },
  checkoutBtnText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 15,
  },
  clearBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    paddingVertical: 10,
    borderRadius: 12,
  },
  clearBtnText: {
    color: '#94A3B8',
    fontWeight: '600',
    fontSize: 13,
  },
  btnIcon: {
    marginRight: 6,
  },
});
