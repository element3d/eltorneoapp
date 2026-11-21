import React, { useEffect, useState, useRef, useCallback } from 'react';
import {
    Image,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomNavBar, { EPAGE_CALENDAR } from './BottomNavBar';
import AppBar from './AppBar';
import dataManager from './DataManager';
import strings from './Strings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from './Colors';
import TrailerItem from './TrailerItem';
import TrailerVideoDialog from './TrailerVideoDialog';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import authManager from './AuthManager';
import { AI_USER_ID } from './TablesBeatBetPagePanel';
import { getAnalytics, logScreenView } from '@react-native-firebase/analytics';


function TrailersPage({ route }): JSX.Element {
    const navigation = useNavigation();

    const [showTrailer, setShowTrailer] = useState(false)
    const [trailer, setTrailer] = useState(null)

    useFocusEffect(
        useCallback(() => {
            const me = authManager.getMeSync();
            if (me && (me.id == 1 || me.id == AI_USER_ID)) {
                return;
            }

            logScreenView(getAnalytics(), {
                screen_name: 'Trailers',
                screen_class: 'Trailers',
            });
        }, [])
    );

    function onShowTrailer(trailer) {
        setShowTrailer(true)
        setTrailer(trailer)
    }

    function onClose() {
        setShowTrailer(false)
    }

    const insets = useSafeAreaInsets();

    return (
        <View style={{ flex: 1, backgroundColor: Colors.gray800 }}>
            <StatusBar
                barStyle={Colors.statusBar}
                backgroundColor={Colors.gray800}
            />

            <View style={{ flex: 1, backgroundColor: Colors.bgColor }}>
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
                    style={{ flex: 1 }}>

                    <View style={{
                        width: '100%',
                        // paddingBottom: 20,
                        backgroundColor: Colors.gray800
                    }}>
                        <AppBar navigation={navigation} title={strings.trailers_page} showLogo={false} />
                    </View>
                    <View style={{
                        width: '100%',
                        paddingTop: 25,
                        paddingHorizontal: 20
                        // height: 400,
                        // backgroundColor: 'red'
                    }}>
                        {dataManager.getTrailers().map((t) => {
                            return <TrailerItem onViewPress={() => onShowTrailer(t)} key={t.subtitle} showViewAll={false} trailer={t}></TrailerItem>
                        })}
                    </View>
                </ScrollView>
                <BottomNavBar navigation={navigation} />
            </View>
            {showTrailer ? <TrailerVideoDialog trailer={trailer} onClose={() => { setShowTrailer(false) }} /> : null}
            <View style={{
                width: '100%',
                backgroundColor: Colors.gray800,
                height: insets.bottom
            }}></View>
        </View>
    );
}

export default TrailersPage;
