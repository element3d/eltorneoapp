import React, { useEffect, useState, useRef } from 'react';
import {
    ActivityIndicator,
    Image,
    Linking,
    RefreshControl,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomNavBar, { EPAGE_CALENDAR } from './BottomNavBar';
import SERVER_BASE_URL from './AppConfig';
import CalendarIcon from './assets/calendar_black.svg';
import CalendarWhiteIcon from './assets/calendar_white.svg';

import GooglePlayIcon from './assets/google-play.svg';
import Calendar from './Calendar';
import moment from 'moment';
import AppBar from './AppBar';
import strings from './Strings';
import authManager from './AuthManager';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import dataManager from './DataManager';
import Colors from './Colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function BeatBetInfoPage({ route }): JSX.Element {
    const navigation = useNavigation();

    const today = moment();
    const [date, setDate] = useState(today.format('YYYY-MM-DD'))
    const [matches, setMatches] = useState([])
    const [matchesReqFinished, setMatchesReqFinished] = useState(false)
    const [refreshing, setRefreshing] = useState(false)


    const onNavPlayStore = () => {
        const appPackageName = 'com.eltorneo'; // Replace with your app's package name
        const playStoreUrl = `https://play.google.com/store/apps/details?id=${appPackageName}`;

        Linking.canOpenURL(playStoreUrl)
            .then((supported) => {
                if (supported) {
                    Linking.openURL(playStoreUrl);
                } else {
                    console.log("Don't know how to open URI: " + playStoreUrl);
                }
            })
            .catch((err) => console.error('An error occurred', err));
    };

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
                    height: insets.top,
                    backgroundColor: Colors.gray800
                }}></View>
                <ScrollView
                    contentInsetAdjustmentBehavior="automatic"
                    contentContainerStyle={{
                        // minHeight: '100%'
                    }}
                    style={{ flex: 1 }}
                >

                    <View style={{
                        width: '100%',
                        // paddingBottom: 10,
                        backgroundColor: Colors.gray800
                    }}>
                        <AppBar navigation={navigation} title={'Beat Bet'} showLogo={false} />


                    </View>
                    <View style={{
                        padding: 18,
                        // flexDirection: 'row',
                        alignItems: 'flex-start',
                        // justifyContent: 'flex-start'
                    }}>
                        <Text style={{
                            fontSize: 20,
                            fontFamily: 'Roboto-Bold',
                            color: Colors.titleColor,
                        }}>{strings.learn_more}</Text>
                        <Text style={{
                            marginTop: 10,
                            fontSize: 14,
                            color: '#8E8E93',

                        }}>{strings.beat_bet_info_short}</Text>

                        <Text style={{
                            marginTop: 20,
                            fontSize: 20,
                            fontFamily: 'Roboto-Bold',
                            color: Colors.titleColor,
                        }}>{strings.rules}</Text>
                        <Text style={{
                            marginTop: 10,
                            fontSize: 14,
                            color: '#8E8E93',
                        }}>{strings.beat_bet_rules_info}</Text>

                    </View>

                    <TouchableOpacity activeOpacity={.8} onPress={onNavPlayStore} style={{
                        height: 30,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 15,
                        flexDirection: 'row',
                        alignSelf: 'center',
                        paddingHorizontal: 20,
                        paddingLeft: 5,
                        marginBottom: 30,
                        overflow: 'hidden',
                        borderWidth: Colors.mode == 3 ? 1 : 0,
                        borderColor: Colors.gradientBorderColor,
                        backgroundColor: Colors.primary
                    }}>
                        {Colors.mode == 3 ? <Image source={dataManager.getButtonGradientExtraLarge()} style={{
                            width: '100%',
                            height: '100%',
                            position: 'absolute'
                        }} /> : null}
                        <View style={{
                            width: 22,
                            height: 22,
                            backgroundColor: 'white',
                            borderRadius: 11,
                            marginRight: 10,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <GooglePlayIcon width={18} height={18} />
                        </View>
                        <Text style={{
                            fontSize: 16,
                            lineHeight: 22,
                            fontFamily: 'Roboto-Bold',
                            color: 'white'
                        }}>{strings.leave_a_review}</Text>
                    </TouchableOpacity>


                </ScrollView>
                <BottomNavBar navigation={navigation} />
                <View style={{
                    width: '100%',
                    height: insets.bottom,
                    backgroundColor: Colors.gray800
                }}></View>
            </View>

        </View>
    );
}

export default BeatBetInfoPage;
