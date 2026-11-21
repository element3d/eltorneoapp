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
import FAIcon from 'react-native-vector-icons/FontAwesome5';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomNavBar, { EPAGE_CALENDAR } from './BottomNavBar';
import AppBar from './AppBar';
import dataManager from './DataManager';
import strings from './Strings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from './Colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';


function MatchSettingsPage({ route }): JSX.Element {
    const navigation = useNavigation();

    const matchSettings = dataManager.getMatchSettings()

    const [showEFootball, setShowEFootball] = useState(matchSettings.showEFootball)
    const [showBeatBet, setShowBeatBet] = useState(matchSettings.showBeatBet)
    const [showFireball, setShowFireball] = useState(matchSettings.showFireball)

    const insets = useSafeAreaInsets();

    function onSetShowEFootball() {
        const showEF = !showEFootball;
        setShowEFootball(showEF)
        matchSettings.showEFootball = showEF;
        AsyncStorage.setItem('showEFootball', showEF.toString())
    }

    function onSetShowBeatBet() {
        const showBB = !showBeatBet;
        setShowBeatBet(showBB)
        matchSettings.showBeatBet = showBB;
        AsyncStorage.setItem('showBeatBet', showBB.toString())
    }

    function onSetShowFireball() {
        const showFB = !showFireball;
        setShowFireball(showFB)
        matchSettings.showFireball = showFB;
        AsyncStorage.setItem('showFireball', showFB.toString())
    }

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
                        paddingBottom: 20,
                    }}>
                        <View style={{
                            width: '100%',
                            backgroundColor: Colors.gray800,
                            marginBottom: 20
                        }}>
                            <AppBar navigation={navigation} title={strings.settings} showLogo={false} />
                        </View>

                        <View style={{
                            padding: 20,
                            paddingTop: 0
                        }}>
                            <TouchableOpacity activeOpacity={.6} onPress={onSetShowEFootball} style={{
                                width: '100%',
                                height: 60,
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center'
                                }}>
                                    <View style={{
                                        aspectRatio: 1,
                                        width: 40,
                                        borderRadius: 3,
                                        overflow: 'hidden',
                                    }}>
                                        <Image source={require('./assets/eFootball.png')} style={{
                                            width: '100%',
                                            height: '100%',
                                        }} />
                                    </View>
                                    <View style={{
                                        marginLeft: 16,
                                    }}>
                                        <Text style={{
                                            fontFamily: 'Roboto-ExtraBold',
                                            color: Colors.titleColor,
                                            fontSize: 18
                                        }}>eFootball</Text>
                                        <Text  style={{
                                            // flex:1,
                                            fontFamily: 'Roboto-Bold',
                                            color: Colors.titleColor,
                                            opacity: .6,
                                            fontSize: 12
                                        }}>{strings.show_efootball}</Text>
                                    </View>
                                </View>
                                <View style={{
                                    width: 30,
                                    height: 30,
                                    borderWidth: 1,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderColor: Colors.primary
                                }}>
                                    {showEFootball ? <FAIcon name={'check'} size={18} color={Colors.primary} /> : null}
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={onSetShowBeatBet} activeOpacity={.6} style={{
                                width: '100%',
                                height: 60,
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                // backgroundColor: 'red'
                            }}>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center'
                                }}>
                                    <View style={{
                                        aspectRatio: 1,
                                        width: 40,
                                        borderRadius: 3,
                                        overflow: 'hidden',
                                    }}>
                                        <Image source={require('./assets/beat_bet_img.png')} style={{
                                            width: '100%',
                                            height: '100%',
                                        }} />
                                    </View>
                                    <View style={{
                                        marginLeft: 16
                                    }}>
                                        <Text style={{
                                            fontFamily: 'Roboto-ExtraBold',
                                            color: Colors.titleColor,
                                            fontSize: 18
                                        }}>Beat Bet</Text>
                                        <Text style={{
                                            fontFamily: 'Roboto-Bold',
                                            color: Colors.titleColor,
                                            opacity: .6,
                                            fontSize: 12
                                        }}>{strings.show_beatbet}</Text>
                                    </View>
                                </View>
                                <View style={{
                                    width: 30,
                                    height: 30,
                                    borderWidth: 1,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderColor: Colors.primary
                                }}>
                                    {showBeatBet ? <FAIcon name={'check'} size={18} color={Colors.primary} /> : null}
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={onSetShowFireball} activeOpacity={.6} style={{
                                width: '100%',
                                height: 60,
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                // backgroundColor: 'red'
                            }}>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center'
                                }}>
                                    <View style={{
                                        aspectRatio: 1,
                                        width: 40,
                                        borderRadius: 3,
                                        overflow: 'hidden',
                                    }}>
                                        <Image source={require('./assets/Fireball.png')} style={{
                                            width: '100%',
                                            height: '100%',
                                        }} />
                                    </View>
                                    <View style={{
                                        marginLeft: 16
                                    }}>
                                        <Text style={{
                                            fontFamily: 'Roboto-ExtraBold',
                                            color: Colors.titleColor,
                                            fontSize: 18
                                        }}>Fireball</Text>
                                        <Text style={{
                                            fontFamily: 'Roboto-Bold',
                                            color: Colors.titleColor,
                                            opacity: .6,
                                            fontSize: 12
                                        }}>{strings.show_fireball}</Text>
                                    </View>
                                </View>
                                <View style={{
                                    width: 30,
                                    height: 30,
                                    borderWidth: 1,
                                    borderColor: Colors.primary,
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    {showFireball ? <FAIcon name={'check'} size={18} color={Colors.primary} /> : null}
                                </View>
                            </TouchableOpacity>
                        </View>

                    </View>
                </ScrollView>
                <BottomNavBar navigation={navigation} />
                <View style={{
                    width: '100%',
                    backgroundColor: Colors.gray800,
                    height: insets.bottom
                }}></View>
            </View>
        </View>
    );
}

export default MatchSettingsPage;
