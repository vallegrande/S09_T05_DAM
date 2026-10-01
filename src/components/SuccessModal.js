import React from 'react';
import { View, Text, StyleSheet, Modal, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SuccessModal({ visible, orderData, onClose }) {
  if (!orderData) return null;

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.card}>
          {/* Animated checkmark icon ring */}
          <View style={styles.iconCircle}>
            <Ionicons name="checkmark-done" size={44} color="#10B981" />
          </View>

          <Text style={styles.title}>¡Orden Confirmada!</Text>
          <Text style={styles.subtitle}>
            Tu compra en NovaTech ha sido procesada de manera exitosa.
          </Text>

          {/* Receipt Card */}
          <View style={styles.receiptBox}>
            <View style={styles.receiptRow}>
              <Text style={styles.receiptLabel}>Codigo de Orden</Text>
              <Text style={styles.receiptCode}>#NT-2026-T05</Text>
            </View>

            <View style={styles.receiptDivider} />

            <View style={styles.receiptRow}>
              <Text style={styles.receiptLabel}>Total Articulos</Text>
              <Text style={styles.receiptValue}>
                {orderData.totalItemCount} {orderData.totalItemCount === 1 ? 'unidad' : 'unidades'}
              </Text>
            </View>

            <View style={styles.receiptRow}>
              <Text style={styles.receiptLabel}>Monto Pagado</Text>
              <Text style={styles.receiptTotal}>
                ${orderData.grandTotal ? orderData.grandTotal.toFixed(2) : '0.00'}
              </Text>
            </View>

            <View style={styles.receiptRow}>
              <Text style={styles.receiptLabel}>Estado del Envio</Text>
              <View style={styles.statusBadge}>
                <Ionicons name="cube-outline" size={12} color="#38BDF8" />
                <Text style={styles.statusBadgeText}>En Preparacion</Text>
              </View>
            </View>
          </View>

          {/* Continue button */}
          <Pressable style={styles.continueBtn} onPress={onClose}>
            <Ionicons name="arrow-back-outline" size={18} color="#FFFFFF" style={styles.btnIcon} />
            <Text style={styles.continueBtnText}>Volver a la Tienda</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: '#0F172A',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#1E293B',
    padding: 28,
    alignItems: 'center',
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    borderWidth: 2,
    borderColor: '#10B981',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#F8FAFC',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 13,
    color: '#94A3B8',
    textAlign: 'center',
    lineHeight: 19,
    marginBottom: 22,
  },
  receiptBox: {
    width: '100%',
    backgroundColor: '#131B2E',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#202D45',
    padding: 16,
    marginBottom: 24,
    gap: 10,
  },
  receiptRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  receiptDivider: {
    height: 1,
    backgroundColor: '#1E293B',
    marginVertical: 4,
  },
  receiptLabel: {
    color: '#64748B',
    fontSize: 12,
    fontWeight: '500',
  },
  receiptCode: {
    color: '#6366F1',
    fontSize: 12,
    fontWeight: '700',
  },
  receiptValue: {
    color: '#F8FAFC',
    fontSize: 12,
    fontWeight: '600',
  },
  receiptTotal: {
    color: '#10B981',
    fontSize: 16,
    fontWeight: '800',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(56, 189, 248, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  statusBadgeText: {
    color: '#38BDF8',
    fontSize: 11,
    fontWeight: '600',
  },
  continueBtn: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4F46E5',
    paddingVertical: 14,
    borderRadius: 12,
  },
  btnIcon: {
    marginRight: 8,
  },
  continueBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 15,
  },
});
