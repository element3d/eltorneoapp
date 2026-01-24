import React, { useState } from 'react';
import {
    Linking,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomNavBar, { EPAGE_CALENDAR } from './BottomNavBar';

import GooglePlayIcon from './assets/google-play.svg';
import moment from 'moment';
import AppBar from './AppBar';
import strings from './Strings';
import Colors from './Colors';
import GoalsIcon from './assets/goals.svg';
import GoalsAIcon from './assets/goals_a.svg';
import AssistIcon from './assets/assist.svg';
import CleanSheetIcon from './assets/clean.svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

function FantasyInfoPage({ route }): JSX.Element {
    const navigation = useNavigation();

    const today = moment();

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
                    backgroundColor: Colors.gray800,
                    height: insets.top
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
                        <AppBar navigation={navigation} title={"Fantasy"} showLogo={false} />
                    </View>
                    <View style={{
                        padding: 18,
                        // flexDirection: 'row',
                        alignItems: 'flex-start',
                        // justifyContent: 'flex-start'
                    }}>
                        <Text style={{
                            marginTop: 0,
                            fontSize: 20,
                            fontFamily: 'Roboto-Bold',
                            color: Colors.titleColor,
                        }}>{strings.rules}</Text>
                        <Text style={{
                            marginTop: 10,
                            fontSize: 14,
                            color: '#8E8E93',
                        }}>{strings.fantasy_info}</Text>

                        <View style={{
                            marginTop: 20,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <GoalsIcon width={18} height={18} />
                            <Text style={{
                                marginLeft: 10,
                                fontSize: 16,
                                fontFamily: 'Roboto-Bold',
                                color: Colors.titleColor,
                            }}>{strings.goal}</Text>
                        </View>
                        <Text style={{
                            fontSize: 14,
                            color: '#8E8E93',
                        }}>{strings.goal_rule}</Text>

                        <View style={{
                            marginTop: 20,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <AssistIcon width={28} height={28} />
                            <Text style={{
                                marginLeft: 6,
                                fontSize: 16,
                                fontFamily: 'Roboto-Bold',
                                color: Colors.titleColor,
                            }}>{strings.assist}</Text>
                        </View>
                        <Text style={{
                            fontSize: 14,
                            color: '#8E8E93',
                        }}>{strings.assist_rule}</Text>

                        <View style={{
                            marginTop: 20,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <CleanSheetIcon width={24} height={24} />
                            <Text style={{
                                marginLeft: 10,
                                fontSize: 16,
                                fontFamily: 'Roboto-Bold',
                                color: Colors.titleColor,
                            }}>{strings.clean_sheet}</Text>
                        </View>
                        <Text style={{
                            fontSize: 14,
                            color: '#8E8E93',
                        }}>{strings.clean_sheet_rule}</Text>

                        <View style={{
                            marginTop: 20,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Text style={{
                                fontSize: 16,
                                fontFamily: 'Roboto-Bold',
                                color: Colors.success
                            }}>45 '</Text>
                            <Text style={{
                                marginLeft: 8,
                                fontSize: 16,
                                fontFamily: 'Roboto-Bold',
                                color: Colors.titleColor,
                            }}>{strings.minutes}</Text>
                        </View>
                        <Text style={{
                            fontSize: 14,
                            color: '#8E8E93',
                        }}>{strings.minutes_rule}</Text>

                        <View style={{
                            marginTop: 20,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Text style={{
                                fontSize: 16,
                                fontFamily: 'Roboto-Bold',
                                color: Colors.success
                            }}>PEN</Text>
                            <Text style={{
                                marginLeft: 8,
                                fontSize: 16,
                                fontFamily: 'Roboto-Bold',
                                color: Colors.titleColor,
                            }}>{strings.saved_penalty}</Text>
                        </View>
                        <Text style={{
                            fontSize: 14,
                            color: '#8E8E93',
                        }}>{strings.saved_penalty_rule}</Text>

                        <View style={{
                            marginTop: 20,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Text style={{
                                fontSize: 16,
                                fontFamily: 'Roboto-Bold',
                                color: Colors.fail
                            }}>PEN</Text>
                            <Text style={{
                                marginLeft: 8,
                                fontSize: 16,
                                fontFamily: 'Roboto-Bold',
                                color: Colors.titleColor,
                            }}>{strings.missed_penalty2}</Text>
                        </View>
                        <Text style={{
                            fontSize: 14,
                            color: '#8E8E93',
                        }}>{strings.missed_penalty_rule}</Text>

                        <View style={{
                            marginTop: 20,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <GoalsAIcon width={18} height={18} />
                            <Text style={{
                                marginLeft: 8,
                                fontSize: 16,
                                fontFamily: 'Roboto-Bold',
                                color: Colors.titleColor,
                            }}>{strings.goal_against}</Text>
                        </View>
                        <Text style={{
                            fontSize: 14,
                            color: '#8E8E93',
                        }}>{strings.goal_against_rule}</Text>

                        <View style={{
                            marginTop: 20,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <View style={{
                                width: 16,
                                height: 20,
                                borderRadius: 4,
                                backgroundColor: 'gold'
                            }}></View>
                            <Text style={{
                                marginLeft: 8,
                                fontSize: 16,
                                fontFamily: 'Roboto-Bold',
                                color: Colors.titleColor,
                            }}>{strings.yellow_card}</Text>
                        </View>
                        <Text style={{
                            fontSize: 14,
                            color: '#8E8E93',
                        }}>{strings.yellow_card_rule}</Text>

                        <View style={{
                            marginTop: 20,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <View style={{
                                width: 16,
                                height: 20,
                                borderRadius: 4,
                                backgroundColor: Colors.fail
                            }}></View>
                            <Text style={{
                                marginLeft: 8,
                                fontSize: 16,
                                fontFamily: 'Roboto-Bold',
                                color: Colors.titleColor,
                            }}>{strings.red_card}</Text>
                        </View>
                        <Text style={{
                            fontSize: 14,
                            color: '#8E8E93',
                        }}>{strings.red_card_rule}</Text>
                    </View>

                    <TouchableOpacity activeOpacity={.8} onPress={onNavPlayStore} style={{
                        height: 30,
                        marginTop: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 15,
                        flexDirection: 'row',
                        alignSelf: 'center',
                        paddingHorizontal: 20,
                        paddingLeft: 5,
                        marginBottom: 40,
                        backgroundColor: '#FF2882'
                    }}>
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
                    backgroundColor: Colors.gray800,
                    height: insets.bottom
                }}></View>
            </View>

        </View>
    );
}

export default FantasyInfoPage;
