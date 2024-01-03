import { StyleSheet, Text } from 'react-native'
import React from 'react';

const ErrorA = ({txt}) => {

  return (
    <Text style={styles.error}>{txt}</Text>
  )
}

export default React.memo(ErrorA)

const styles = StyleSheet.create({
  error:{color:'red'}
})