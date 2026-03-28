import React, { useEffect, useState, useRef } from 'react';
import {
    Image,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    useColorScheme,
    View,
} from 'react-native';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomNavBar, { EPAGE_CALENDAR } from './BottomNavBar';
import AppBar from './AppBar';
import dataManager from './DataManager';
import strings from './Strings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from './Colors';
import formationManager from './FormationManager';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';


function FormationPage({ route }): JSX.Element {
    const navigation = useNavigation();

    const backgroundStyle = {
        backgroundColor: 'white',
    };

    function onSelect(l) {
        formationManager.setFormation(l);
        navigation.goBack();
    }

    const insets = useSafeAreaInsets();

    return (
        <View style={{ flex: 1, backgroundColor: Colors.gray800 }}>

            <StatusBar
                barStyle={Colors.statusBar}
                backgroundColor={Colors.gray800}
            />

            <View style={{ flex: 1 }}>
                <View style={{
                    width: '100%',
                    backgroundColor: Colors.gray800,
                    height: insets.top
                }}></View>
                <ScrollView
                    contentInsetAdjustmentBehavior="automatic"
                    contentContainerStyle={{
                        // minHeight: '100%'
                    }}
                    style={{ flex: 1, backgroundColor: Colors.bgColor }}>

                    <View style={{
                        width: '100%',
                        // paddingBottom: 20,
                    }}>
                        <View style={{
                            width: '100%',
                            backgroundColor: Colors.gray800,
                            marginBottom: 20
                        }}>
                            <AppBar navigation={navigation} title={strings.formation} showLogo={false} />
                        </View>
                        {formationManager.getFormations().map((l, i) => {
                            return <TouchableOpacity key={l} activeOpacity={.6} onPress={() => onSelect(l)} style={{
                                width: '100%',
                                paddingLeft: 20,
                                height: 50
                            }}>
                                <Text style={{
                                    fontSize: 16,
                                    letterSpacing: 4,
                                    fontWeight: 'bold',
                                    color: formationManager.getFormation() == l ? Colors.primary : '#8E8E93'
                                }}>{l}</Text>
                            </TouchableOpacity>
                        })}


                    </View>
                </ScrollView>
                <BottomNavBar page={EPAGE_CALENDAR} navigation={navigation} />
                <View style={{
                    width: '100%',
                    backgroundColor: Colors.gray800,
                    height: insets.bottom
                }}></View>
            </View>

        </View>
    );
}

export default FormationPage;
