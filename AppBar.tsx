import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MoonIcon from './assets/menu.svg';
import MoonDarkIcon from './assets/menu-dark.svg';

import strings from './Strings';
import Colors, { ColorsClassDark } from './Colors';

function AppBar({ navigation, title, showDrawer, setMode, showLang, showMode = false, showBack = true, showLogo = true, showSettings = false }): JSX.Element {

  function onBack() {
    navigation.goBack()
  }

  function onLang() {
    navigation.navigate("Langs");
  }

  function onSetMode() {
    showDrawer()
  }

  function onNavSettings() {
    navigation.navigate("ProfileEdit")
  }

  return (
    <View style={{
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      paddingLeft: 20,
      paddingRight: 20,
      justifyContent: 'space-between',
      height: 80
    }}>
      {showBack ? <TouchableOpacity activeOpacity={.6} onPress={onBack} style={{
        width: 45,
        height: 45,
        borderRadius: 25,
        borderColor: Colors.borderColor,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: 'white'
      }}>
        <Icon name={'arrow-back'} color={Colors.titleColor} size={26}></Icon>
      </TouchableOpacity> :
        // <View style={{
        //   width: 45,
        //   height: 45
        // }}></View>
        null
      }

      {showMode ? <TouchableOpacity activeOpacity={.6} onPress={onSetMode} style={{
        width: 45,
        height: 45,
        borderRadius: 25,
        borderColor: Colors.borderColor,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: 'white'
      }}>
        {Colors.mode == 1 ? <MoonIcon /> : <MoonDarkIcon />}
      </TouchableOpacity> :
        //  <View style={{
        //   width: 45,
        //   height: 45
        // }}></View>
        null
      }

      {showLogo ? <View style={{
        // flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Text style={{
          // marginRight: 5,
          fontSize: 20,
          // lineHeight: 28,
          color: Colors.titleColor,
          fontFamily: 'Poppins-Bold'
        }}>el Torneo</Text>
        <Text style={{
          fontSize: 12,
          lineHeight: 12,
          opacity: .6,
          marginTop: -6,
          marginBottom: 8,
          fontFamily: 'Roboto-Bold',
          color: Colors.titleColor
        }}>{'www.eltorneo.app'}</Text>

      </View> : null}
      {title ? <View style={{
        alignItems: 'center',
        justifyContent: 'center'
      }}><Text style={{
        fontFamily: 'Poppins-Bold',
        fontSize: 18,
        // lineHeight: 22,
        color: Colors.titleColor
      }}>{title}</Text>
        <Text style={{
          fontSize: 12,
          lineHeight: 12,
          opacity: .6,
          marginTop: -6,
          marginBottom: 8,
          fontFamily: 'Roboto-Bold',
          color: Colors.titleColor
        }}>{'www.eltorneo.app'}</Text>
      </View> : null}
      {showSettings ? <TouchableOpacity activeOpacity={.6} onPress={onNavSettings} style={{
        width: 45,
        height: 45,
        borderRadius: 25,
        borderColor: Colors.borderColor,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: 'white'
      }}>
        <Icon name="settings" size={24} color={Colors.titleColor}></Icon>
      </TouchableOpacity> : null}

      {showLang ? <TouchableOpacity activeOpacity={.6} onPress={onLang} style={{
        width: 45,
        height: 45,
        borderRadius: 25,
        borderColor: Colors.borderColor,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <Text style={{
          fontSize: 14,
          fontFamily: 'Roboto-Bold',
          color: Colors.titleColor
        }}>{strings.getLanguage().toUpperCase()}</Text>
      </TouchableOpacity> : null}

      {!showSettings && !showLang ? <View style={{
        width: 45,
        height: 45,
      }}>
      </View> : null}
    </View>
  );
}

export default AppBar;
