import React from 'react';
import { ActivityIndicator, Dimensions, StyleSheet, View } from "react-native";

export default function Loading() {
  return (
    <View style={styles.loading }>
      <ActivityIndicator size="large" color="#3CB371" />
    </View>
  );
}

const styles = StyleSheet.create({
  loading: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
})