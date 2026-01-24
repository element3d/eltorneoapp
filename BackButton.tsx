import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

function BackButton({ navigation, style = {} }): JSX.Element {

    function onBack() {
        navigation.goBack()
      }
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onBack} style={{
      zIndex: 1
    }}>
     <View style={{
                  width: 30,
                  height: 30,
                  borderRadius: 15,
                  backgroundColor: 'white',
                  alignItems: 'center',
                  zIndex: 10,
                  justifyContent: 'center'
                }}>
                  <Icon name="chevron-left" size={25} color="black" />
                </View>
    </TouchableOpacity>
  );
}

export default BackButton;
