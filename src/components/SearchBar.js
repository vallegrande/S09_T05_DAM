import React from 'react';
import { View, TextInput, StyleSheet, Pressable, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SearchBar({
  value,
  onChangeText,
  onClear,
  resultsCount,
  totalCount,
}) {
  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <Ionicons name="search-outline" size={18} color="#94A3B8" style={styles.searchIcon} />
        
        <TextInput
          style={styles.input}
          placeholder="Buscar audifonos, laptops, mouses..."
          placeholderTextColor="#64748B"
          value={value}
          onChangeText={onChangeText}
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="search"
        />

        {value.length > 0 && (
          <Pressable
            onPress={onClear}
            style={styles.clearButton}
            accessibilityLabel="Limpiar busqueda"
          >
            <Ionicons name="close-circle" size={18} color="#94A3B8" />
          </Pressable>
        )}
      </View>

      <View style={styles.statusRow}>
        <View style={styles.indicatorDot} />
        <Text style={styles.statusText}>
          {value.trim().length > 0 ? (
            `Filtrando "${value}" • ${resultsCount} de ${totalCount} productos`
          ) : (
            `Catalogo completo • ${resultsCount} productos disponibles`
          )}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 6,
    backgroundColor: '#0F172A',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#334155',
    paddingHorizontal: 12,
    height: 46,
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    color: '#F8FAFC',
    fontSize: 14,
    height: '100%',
  },
  clearButton: {
    padding: 4,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 6,
  },
  indicatorDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10B981',
  },
  statusText: {
    color: '#94A3B8',
    fontSize: 11,
    fontWeight: '500',
  },
});
