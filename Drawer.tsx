import { BackHandler, Text, TouchableOpacity, View } from "react-native";
import Colors from "./Colors";
import HomeIcon from './assets/profile.svg';
import CalendarIcon from './assets/cal.svg';
import BBIcon from './assets/bbicon.svg';
import FireballIcon from './assets/Fireball.svg';
import FantasyIcon from './assets/FantasyTrophy.svg';
import EFootballIcon from './assets/eFootballTrophy.svg'
import WorldCuplIcon from './assets/WorldCupTrophy.svg'

import SunIcon from './assets/sun.svg';
import FCIcon from './assets/fc.svg';
import MoonIcon from './assets/moon-gray.svg';
import FAIcon from 'react-native-vector-icons/Fontisto';
import TrophyIcon from './assets/first.svg'
import authManager from "./AuthManager";
import strings from "./Strings";
import SupportPanel from "./SupportPanel";
import { useEffect } from "react";
import dataManager from "./DataManager";
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import { EGAME_BEATBET, EGAME_CAREER, EGAME_EFOOTBALL, EGAME_ELTORNEO, EGAME_FIREBALL, EGAME_WORLD_CUP } from "./GamepadMenu";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, { interpolateColor, useAnimatedStyle, useSharedValue, withTiming, Easing } from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";
import { ESTAT_TOTAL } from "./ProfilePage";
import { AI_USER_ID } from "./TablesBeatBetPagePanel";
import { ENEW_LEAGUE_BEGINNER } from "./Enums";

export default function Drawer({ onClose, navigation, setMode }) {
    const translateX = useSharedValue(-300);
    const opacity = useSharedValue(0);
    const speed = 200;

    useEffect(() => {
        const backAction = () => {
            onCloseInternal()
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove();
    }, []);

    useEffect(() => {
        translateX.value = withTiming(0, {
            duration: speed, // milliseconds
            easing: Easing.out(Easing.cubic), // smooth curve
        });
        opacity.value = withTiming(.5, {
            duration: speed, // milliseconds
            easing: Easing.out(Easing.cubic), // smooth curve
        });
    }, []);

    function onCloseInternal() {
        translateX.value = withTiming(-300, {
            duration: speed, // milliseconds
            easing: Easing.out(Easing.cubic), // smooth curve
        });
        opacity.value = withTiming(0, {
            duration: speed, // milliseconds
            easing: Easing.out(Easing.cubic), // smooth curve
        }, (finished) => {
            if (finished) scheduleOnRN(onClose);
        });
    }

    function onNavLang() {
        onClose()
        navigation.push('Langs');
    }

    function onNavThemes() {
    }

    function onNavHome() {
        navigation.push("Profile")
    }

    function onNavCalendar() {
        onClose()
        navigation.push("Calendar")
    }

    function onNavElTorneo() {
        onClose()

        const me = authManager.getMeSync()
        const league = me ? me.elTorneoLeague : ENEW_LEAGUE_BEGINNER;
        navigation.push('Tables', {
            page: 1,
            routeGame: dataManager.getSettings().game,
            league: league >= 1 ? league : ENEW_LEAGUE_BEGINNER,
            season: dataManager.getSettings()?.season ?? '26/27',
        });
    }

    function onNavEFootball() {
        onClose()
        const me = authManager.getMeSync()
        const league = me ? me.eFootballLeague : ENEW_LEAGUE_BEGINNER;
        navigation.push('Tables', {
            page: 1,
            routeGame: dataManager.getSettings().game,
            league: league >= 1 ? league : ENEW_LEAGUE_BEGINNER,
            season: dataManager.getSettings()?.season ?? '26/27',
        });
    }

    function onNavWorldCup() {
        onClose()
        const me = authManager.getMeSync()
        navigation.push('Tables', {
            page: 1,
            routeGame: dataManager.getSettings().game,
            league: 1,
            season: dataManager.getSettings()?.season ?? '25/26',
        });
    }

    function onNavBeatBet() {
        onClose()
        const me = authManager.getMeSync()
        navigation.push('Tables', {
            page: 1,
            routeGame: dataManager.getSettings().game,
            league: me?.league ?? 1,
            season: dataManager.getSettings()?.season ?? '26/27',
        });

    }

    function onNavFireball() {
        onClose()
        const me = authManager.getMeSync()
        navigation.push('Tables', {
            page: 1,
            routeGame: dataManager.getSettings().game,
            league: me?.league ?? 1,
            season: dataManager.getSettings()?.season ?? '26/27',
        });

    }

    function onNavFantasy() {
        onClose()
        const me = authManager.getMeSync()
        navigation.push('Tables', {
            page: 1,
            routeGame: dataManager.getSettings().game,
            league: me?.league ?? 1,
            season: dataManager.getSettings()?.season ?? '26/27',
        });
    }

    function onNavBeatBetOfficial() {
        if (!dataManager.getBeatBetOfficialUser()) return;
        onClose()
        navigation.navigate('BeatBetOfficial');
    }

    function onNavTrailers() {
        onClose()
        navigation.push("Trailers")
    }

    function onSetThemeLight() {
        Colors.setLightTheme();
        setMode(1)
        changeNavigationBarColor(Colors.gray800, true);  // Change to your desired color
        onClose()
    }

    function onSetThemeDark() {
        Colors.setDarkTheme();
        setMode(2)
        changeNavigationBarColor(Colors.gray800, true);  // Change to your desired color
        onClose()
    }

    function onSetThemeFC26() {
        Colors.setThemeFC26();
        setMode(3)
        changeNavigationBarColor(Colors.gray800, true);  // Change to your desired color
        onClose()
    }

    function onSetThemeFC27() {
        Colors.setThemeFC27();
        setMode(4)
        changeNavigationBarColor(Colors.gray800, true);  // Change to your desired color
        onClose()
    }

    const insets = useSafeAreaInsets();

    return <Animated.View style={{
        position: 'absolute',
        width: '100%',
        flex: 1,
        height: '100%',
        // opacity: backgroundOpacity,
        // top: 80,
        flexDirection: 'row'
    }}>
        <Animated.View style={{
            backgroundColor: Colors.gray800,
            width: 300,
            padding: 20,
            zIndex: 1,
            paddingBottom: 10 + insets.bottom,
            paddingTop: 30,
            paddingLeft: 10,
            height: '100%',
            transform: [{ translateX }]
        }}>
            <Text style={{
                fontSize: 22,
                marginLeft: 10,
                // fontWeight: 'bold',
                // fontFamily: 'NotoSansArmenian-ExtraBold', 
                fontFamily: 'Poppins-Bold',
                color: Colors.titleColor,
                marginBottom: 20
            }}>el Torneo</Text>

            {/* <TouchableOpacity activeOpacity={.6} onPress={onNavHome} style={{
                flexDirection: 'row',
                alignItems: 'center',
                height: 50,
                paddingLeft: 10
                // backgroundColor: 'red'
            }}>
                <HomeIcon width={40} style={{
                    marginLeft: -10
                }} />
                <Text style={{
                    fontSize: 16,
                    marginLeft: 4,
                    color: Colors.titleColor,
                    fontWeight: 'bold'
                }}>{strings.home_page}</Text>
            </TouchableOpacity> */}

            <TouchableOpacity activeOpacity={.6} onPress={onNavCalendar} style={{
                flexDirection: 'row',
                alignItems: 'center',
                height: 50,
                paddingLeft: 10
                // backgroundColor: 'red'
            }}>
                <CalendarIcon width={40} style={{
                    marginLeft: -10
                }} />
                <Text style={{
                    fontSize: 16,
                    marginLeft: 4,
                    color: Colors.titleColor,
                    fontFamily: 'Roboto-Bold',
                }}>{strings.calendar_page}</Text>
            </TouchableOpacity>

            {dataManager.getSettings().game == EGAME_ELTORNEO ? <TouchableOpacity activeOpacity={.6} onPress={onNavElTorneo} style={{
                flexDirection: 'row',
                alignItems: 'center',
                height: 50,
                paddingLeft: 10
                // backgroundColor: 'red'
            }}>
                <TrophyIcon width={22} style={{
                    // marginLeft: -10
                }} />
                <Text style={{
                    marginLeft: 12,
                    fontSize: 16,
                    color: Colors.titleColor,
                    fontFamily: 'Roboto-Bold',
                }}>el Torneo</Text>
            </TouchableOpacity> : null}

            {dataManager.getSettings().game == EGAME_BEATBET ? <TouchableOpacity activeOpacity={.6} onPress={onNavBeatBet} style={{
                flexDirection: 'row',
                alignItems: 'center',
                height: 50,
                paddingLeft: 10
                // backgroundColor: 'red'
            }}>
                <BBIcon width={28} style={{
                    marginLeft: -2
                }} />
                <Text style={{
                    marginLeft: 8,
                    fontSize: 16,
                    color: Colors.titleColor,
                    fontFamily: 'Roboto-Bold',
                }}>Beat Bet</Text>
            </TouchableOpacity> : null}

            {dataManager.getSettings().game == EGAME_FIREBALL ? <TouchableOpacity activeOpacity={.6} onPress={onNavFireball} style={{
                flexDirection: 'row',
                alignItems: 'center',
                height: 50,
                paddingLeft: 10
                // backgroundColor: 'red'
            }}>
                <FireballIcon width={25} style={{
                    marginLeft: -5,
                    marginRight: 6,
                }} />
                <Text style={{
                    marginLeft: 8,
                    fontSize: 16,
                    color: Colors.titleColor,
                    fontFamily: 'Roboto-Bold',
                }}>Fireball</Text>
            </TouchableOpacity> : null}

            {dataManager.getSettings().game == EGAME_EFOOTBALL ? <TouchableOpacity activeOpacity={.6} onPress={onNavEFootball} style={{
                flexDirection: 'row',
                alignItems: 'center',
                height: 50,
                paddingLeft: 10
            }}>
                <EFootballIcon width={24} style={{
                    marginLeft: -1,
                    marginRight: 3,
                }} />
                <Text style={{
                    marginLeft: 8,
                    fontSize: 16,
                    color: Colors.titleColor,
                    fontFamily: 'Roboto-Bold',
                }}>eFootball</Text>
            </TouchableOpacity> : null}

            {dataManager.getSettings().game == EGAME_WORLD_CUP ? <TouchableOpacity activeOpacity={.6} onPress={onNavWorldCup} style={{
                flexDirection: 'row',
                alignItems: 'center',
                height: 50,
                paddingLeft: 10
            }}>
                <WorldCuplIcon width={24} style={{
                    marginLeft: -2,
                    marginRight: 4,
                }} />
                <Text style={{
                    marginLeft: 8,
                    fontSize: 16,
                    color: Colors.titleColor,
                    fontFamily: 'Roboto-Bold',
                }}>World Cup</Text>
            </TouchableOpacity> : null}

            {dataManager.getSettings().game == EGAME_CAREER ? <TouchableOpacity activeOpacity={.6} onPress={onNavFantasy} style={{
                flexDirection: 'row',
                alignItems: 'center',
                height: 50,
                paddingLeft: 10
                // backgroundColor: 'red'
            }}>
                <FantasyIcon width={24} style={{
                    marginLeft: -2,
                    marginRight: 4,
                }} />
                <Text style={{
                    marginLeft: 8,
                    fontSize: 16,
                    color: Colors.titleColor,
                    fontFamily: 'Roboto-Bold',
                }}>Fantasy</Text>
            </TouchableOpacity> : null}


            <TouchableOpacity activeOpacity={.6} onPress={onNavTrailers} style={{
                flexDirection: 'row',
                alignItems: 'center',
                height: 50,
                paddingLeft: 10
                // backgroundColor: 'red'
            }}>
                <FAIcon name={'film'} color='gold' size={24} style={{
                    // marginLeft: -10
                }} />
                <Text style={{
                    marginLeft: 10,
                    fontSize: 16,
                    color: Colors.titleColor,
                    fontFamily: 'Roboto-Bold',
                }}>{strings.trailers_page}</Text>
            </TouchableOpacity>

            {dataManager.getSettings()?.showBeatBetOfficial ? <TouchableOpacity activeOpacity={.8} onPress={onNavBeatBetOfficial} style={{
                flexDirection: 'row',
                alignItems: 'center',
                height: 50,
                // paddingLeft: -20,
                borderRadius: 8,
                // backgroundColor: '#37003C'
            }}>
                {/* <BBIcon width={30} style={{
                    marginLeft: 8
                }} /> */}
                <View style={{
                    width: 24,
                    height: 24,
                    marginLeft: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                    // borderWidth: 2,
                    borderRadius: 4,
                    backgroundColor: 'gold',
                    borderColor: 'gold'
                }}>
                    <Text style={{
                        fontFamily: 'Roboto-Bold',
                        color: 'black'
                    }}>AI</Text>
                </View>
                <Text style={{
                    fontSize: 16,
                    color: Colors.titleColor,
                    lineHeight: 22,
                    marginLeft: 10,
                    fontFamily: 'Roboto-Bold',
                }}>Beat Bet AI</Text>
            </TouchableOpacity> : null}

            <Text style={{
                marginTop: 50,
                fontSize: 16,
                fontFamily: 'Roboto-Bold',
                marginLeft: 10,
                color: '#8E8E93'
            }}>{strings.settings}</Text>
            <TouchableOpacity activeOpacity={.6} onPress={onSetThemeLight} style={{
                flexDirection: 'row',
                alignItems: 'center',
                height: 50,
                paddingLeft: 10,
                marginTop: 10
            }}>
                <SunIcon width={26} style={{
                    marginLeft: -4,
                    marginRight: 8
                }} />
                <Text style={{
                    fontSize: 16,
                    marginLeft: 2,
                    opacity: Colors.mode == 1 ? 1 : 0.5,
                    color: Colors.titleColor,
                    fontFamily: 'Roboto-Bold',
                }}>{strings.light_mode}</Text>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={.6} onPress={onSetThemeDark} style={{
                flexDirection: 'row',
                alignItems: 'center',
                height: 50,
                paddingLeft: 10,
                // marginTop: 10
            }}>
                <MoonIcon width={40} style={{
                    marginLeft: -10,
                }} />
                <Text style={{
                    fontSize: 16,
                    opacity: Colors.mode == 2 ? 1 : 0.5,
                    marginLeft: 2,
                    color: Colors.titleColor,
                    fontFamily: 'Roboto-Bold',
                }}>{strings.dark_mode}</Text>
            </TouchableOpacity>

            {/* <TouchableOpacity activeOpacity={.6} onPress={onSetThemeFC27} style={{
                flexDirection: 'row',
                alignItems: 'center',
                height: 50,
                paddingLeft: 10,
                // marginTop: 10
                // backgroundColor: 'red'
            }}>
                <FCIcon width={23} style={{
                    marginLeft: -2,
                    marginRight: 10
                }} />
                <Text style={{
                    fontSize: 16,
                    marginLeft: 2,
                    opacity: Colors.mode == 3 ? 1 : 0.5,
                    color: Colors.titleColor,
                    fontFamily: 'Roboto-Bold',
                }}>{'EA FC27'}</Text>
            </TouchableOpacity> */}

            <TouchableOpacity activeOpacity={.6} onPress={onSetThemeFC26} style={{
                flexDirection: 'row',
                alignItems: 'center',
                height: 50,
                paddingLeft: 10,
                // marginTop: 10
                // backgroundColor: 'red'
            }}>
                <FCIcon width={23} style={{
                    marginLeft: -2,
                    marginRight: 10
                }} />
                <Text style={{
                    fontSize: 16,
                    marginLeft: 2,
                    opacity: Colors.mode == 3 ? 1 : 0.5,
                    color: Colors.titleColor,
                    fontFamily: 'Roboto-Bold',
                }}>{'EA FC26'}</Text>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={.6} onPress={onNavLang} style={{
                flexDirection: 'row',
                alignItems: 'center',
                height: 50,
                paddingLeft: 10
                // backgroundColor: 'red'
            }}>
                <Text style={{
                    width: 34,
                    fontSize: 16,
                    fontFamily: 'Roboto-Bold',
                    color: '#8E8E93'
                }}>{strings.getLanguage().toUpperCase()}</Text>
                <Text style={{
                    fontSize: 16,
                    // marginLeft: 4,
                    color: Colors.titleColor,
                    fontFamily: 'Roboto-Bold',
                }}>{strings.language_page}</Text>
            </TouchableOpacity>

            {/* <TouchableOpacity activeOpacity={.6} onPress={onNavThemes} style={{
                flexDirection: 'row',
                alignItems: 'center',
                height: 50,
                paddingLeft: 10
                // backgroundColor: 'red'
            }}>
                <Text style={{
                    width: 34,
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: '#8E8E93'
                }}>{strings.getLanguage().toUpperCase()}</Text>
                <Text style={{
                    fontSize: 16,
                    // marginLeft: 4,
                    color: Colors.titleColor,
                    fontWeight: 'bold'
                }}>{'Theme'}</Text>
            </TouchableOpacity> */}

            <View style={{
                marginTop: 'auto'
            }}></View>
            <SupportPanel />
        </Animated.View>
        <TouchableOpacity onPress={onCloseInternal} style={{
            width: '30%',
            zIndex: 1,
            height: '100%',
        }}></TouchableOpacity>
        <Animated.View style={{
            position: 'absolute',
            bottom: 0,
            zIndex: 0,
            width: '100%',
            height: '100%',
            backgroundColor: '#00000088',
            opacity
        }}>

        </Animated.View>
    </Animated.View>
}