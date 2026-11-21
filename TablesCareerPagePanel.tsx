import { ActivityIndicator, Image, ImageBackground, ScrollView, Text, TouchableOpacity, View } from "react-native"
import dataManager from "./DataManager"
import AwardsPanelBeatBet from "./AwardsPanelBeatBet"
import WinnerPanel from "./WinnerPanel"
import NativeAdComp from "./NativeAdComp"
import Colors from "./Colors"
import strings from "./Strings"
import Icon from 'react-native-vector-icons/FontAwesome5';
import MDIcon from 'react-native-vector-icons/MaterialIcons';
import authManager from "./AuthManager"
import FirstIcon from './assets/FantasyTrophy.svg';
import SecondIcon from './assets/Fantasy_2_place.svg';
import ThirdIcon from './assets/Fantasy_3_place.svg';

import FirstIcon2 from './assets/first2.svg';

import { ESTAT_TOTAL, ETAB_PREDICTS } from "./ProfilePage"
import AwardsPanelFireball from "./AwardsPanelFireball"
import { EGAME_CAREER, EGAME_FIREBALL } from "./GamepadMenu"
import AwardsPanelCareer from "./AwardsPanelCareer"
import { ELEAGUE_AMATEUR, ELEAGUE_BEGINNER, ELEAGUE_LEGEND, ELEAGUE_PRO } from "./Enums"
import GameSeasonButton from "./GameSeasonButton"

const league1Img = require('./assets/Fantasy.png')
const CHIP_OPACITY_DIS = 0.4;

export default function TablesCareerPagePanelsCareerPagePanel({ navigation,
    me,
    table,
    numUsers,
    tableLoading,
    page,
    season,
    setSeason,
    league,
    showPrev,
    showNext,
    onNext,
    onPrev,
    blockForAd,
    onUnlock,
    adLoaded }) {

    const settings = dataManager.getSettings()

    function onNavAwardsInfo() {
        navigation.navigate('FantasyInfo', {
            league: league,
        });
    }

    function onMyPosition() {
        let myPage = 1;
        if (me.careerLeague == 4) {
            myPage = Math.ceil((me.careerPosition) / 20);
        }

        if (myPage == page && league == me.careerLeague) return;

        navigation.push('Tables', {
            page: myPage,
            league: me.careerLeague,
            routeGame: EGAME_CAREER,
            season: season,
        });
    }

    function onLeague1() {
        if (league == ELEAGUE_LEGEND) return;

        navigation.push('Tables', {
            page: 1,
            routeGame: EGAME_CAREER,
            league: ELEAGUE_LEGEND,
            season: season
        });
    }

    function onLeague2() {
        if (league == ELEAGUE_PRO) return;

        if (numUsers <= 20) return;

        navigation.push('Tables', {
            page: 1,
            routeGame: EGAME_CAREER,
            league: ELEAGUE_PRO,
            season: season
        });
    }

    function onLeague3() {
        if (league == ELEAGUE_AMATEUR) return;
        if (numUsers <= 40) return;

        navigation.push('Tables', {
            page: 1,
            routeGame: EGAME_CAREER,
            league: ELEAGUE_AMATEUR,
            season: season
        });
    }

    function onLeague4() {
        if (league == ELEAGUE_BEGINNER) return;
        if (numUsers <= 60) return;

        navigation.push('Tables', {
            page: 1,
            routeGame: EGAME_CAREER,
            league: ELEAGUE_BEGINNER,
            season: season
        });
    }

    function onNavUser(u) {
        u.points = u.predictions

        authManager.setActiveUser(u)

        navigation.navigate('Profile', {
            id: u.id,
            globalPage: 1,
            selectedStat: ESTAT_TOTAL,
            tab: ETAB_PREDICTS,
        });
    }

    function getIcon(index) {
        let i = index
        i = index + 20 * (page - 1)
        if (i == 0 && league == 1) {
            return <View style={{
                width: 40,
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <FirstIcon width={26} height={26} style={{
                    // marginLeft: 6
                }}></FirstIcon>
            </View>
        }

        // if (league == 1) {
        //     if (i == 1) {
        //         return <View style={{
        //             width: 40,
        //             alignItems: 'center',
        //             justifyContent: 'center'
        //         }}>
        //             <SecondIcon width={26} height={26} style={{
        //                 // marginLeft: 6
        //             }}></SecondIcon>
        //         </View>
        //     }
        //     if (i == 2) {
        //         return <View style={{
        //             width: 40,
        //             alignItems: 'center',
        //             justifyContent: 'center'
        //         }}>
        //             <ThirdIcon width={26} height={26} style={{
        //                 // marginLeft: 6
        //             }}></ThirdIcon>
        //         </View>
        //     }
        // }

        return <Text style={{
            width: 40,
            color: Colors.titleColor,
            fontFamily: 'Roboto-Bold',
            textAlign: 'center'
        }}>{i + 1}</Text>
    }

    function renderTable() {
        return table?.map((u, i) => {
            return (
                <TouchableOpacity activeOpacity={.8} onPress={() => { onNavUser(u) }} key={`player_${i}`} style={{
                    width: '100%',
                    height: 52,

                    backgroundColor: authManager.getMeSync() && authManager.getMeSync().id == u.id ? Colors.gray800 : 'transparent',
                    flexDirection: 'row',
                    // backgroundColor: 'blue',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    {getIcon(i)}
                    <Text numberOfLines={1} style={{
                        // width: '90%',
                        flex: 1,
                        color: authManager.getMeSync() && authManager.getMeSync().id == u.id ? Colors.primary : Colors.titleColor,
                        fontFamily: 'Roboto-Bold',
                        // textAlign: 'flex-start',
                        paddingLeft: 10
                    }}>{u.name}</Text>

                    <Text style={{
                        width: 60,
                        // backgroundColor: 'red',
                        color: Colors.titleColor,
                        fontFamily: 'Roboto-Bold',
                        textAlign: 'center',
                    }}>{u.careerPoints}</Text>
                </TouchableOpacity>
            )
        })
    }

    function LeagueButton({ title, minNumUsers, buttonLeague, onPress }) {
        return <TouchableOpacity activeOpacity={.6} onPress={() => { onPress() }} style={{
            marginLeft: buttonLeague != 1 || (me?.careerPosition > 0 && (!settings?.season || settings?.season == season)) ? 0 : 20,
            marginRight: 10,
            opacity: numUsers > minNumUsers ? 1 : CHIP_OPACITY_DIS,
            height: 40,
            backgroundColor: league == buttonLeague ? Colors.primary : Colors.gray800,
            borderWidth: 1,
            borderColor: league == buttonLeague && Colors.mode == 3 ? "#00FFFF" : Colors.borderColor,
            borderRadius: 20,
            overflow: 'hidden',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            {Colors.mode == 3 && league == buttonLeague ? <Image source={dataManager.getButtonGradientLarge()} style={{
                width: '100%',
                height: '100%',
                position: 'absolute'
            }} /> : null}
            <View style={{
                paddingHorizontal: 20,
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Text style={{
                    fontFamily: 'Roboto-Bold',
                    color: league == buttonLeague ? 'white' : Colors.titleColor
                }}>{title}</Text>
                {me?.careerLeague == buttonLeague ? <Text style={{
                    fontSize: 8,
                    fontFamily: 'Roboto-Bold',
                    lineHeight: 10,
                    color: league == buttonLeague ? 'white' : Colors.titleColor
                }}>{strings.your_league}</Text> : null}
            </View>
        </TouchableOpacity>
    }


    return <View style={{
        width: '100%',
        flexDirection: 'column'
    }}>
        <ScrollView style={{
            width: '100%',
            marginTop: 10,
            flexDirection: 'row',
        }}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            contentInsetAdjustmentBehavior="automatic"
            contentContainerStyle={{
                alignItems: 'center',
                flexDirection: 'row',
                paddingLeft: 20,
                paddingRight: 10,
            }}>
            <GameSeasonButton title={'2026/27'} season={season} setSeason={setSeason} buttonSeason={'26/27'} />
            <GameSeasonButton title={'2025/26'} season={season} setSeason={setSeason} buttonSeason={'25/26'} />
        </ScrollView>

        <View style={{
            padding: 20,
            paddingVertical: 10,
            marginBottom: 10,
        }}>
            <TouchableOpacity activeOpacity={.9} onPress={onNavAwardsInfo} style={{
                borderRadius: 20,
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                height: 160,
                overflow: 'hidden'
            }}>
                <ImageBackground width={200} height={200} source={league1Img} style={{

                    width: '100%',
                    height: 180,
                    borderRadius: 20,
                    // marginBottom: 20
                }}>
                    {!settings?.season || settings?.season == season ? <AwardsPanelCareer onReadMore={onNavAwardsInfo} league={league} season={season} />
                        : <WinnerPanel winner={table ? table[0] : null} season={season} league={league}></WinnerPanel>}
                </ImageBackground>
            </TouchableOpacity>
        </View>

        {dataManager.getSettings().enableAds ? <View style={{
            width: '100%',
            paddingHorizontal: 20
        }}>
            <NativeAdComp forceNativeAd={true} />
        </View> : null}

        <ScrollView style={{
            marginBottom: 15,
        }}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            contentInsetAdjustmentBehavior="automatic"
            contentContainerStyle={{
                flexDirection: 'row',
                paddingRight: 40
            }}>
            {me?.careerPosition > 0 && (!settings?.season || settings?.season == season) ? <TouchableOpacity activeOpacity={.6} onPress={() => { onMyPosition() }} style={{
                marginLeft: 20,
                marginRight: 10,
                // paddingHorizontal: 20,
                height: 40,
                width: 40,
                backgroundColor: Colors.gray800,
                borderWidth: 1,
                borderColor: Colors.borderColor,
                borderRadius: 20,
                alignItems: 'center',
                // flex: 1,
                justifyContent: 'center'
            }}>

                <Text style={{
                    fontFamily: 'Roboto-Bold',
                    color: Colors.titleColor
                }}><Icon name='crosshairs' size={22}></Icon></Text>

            </TouchableOpacity> : null}

            <LeagueButton title={strings.legend} minNumUsers={0} buttonLeague={1} onPress={onLeague1} />
            <LeagueButton title={strings.pro} minNumUsers={20} buttonLeague={2} onPress={onLeague2} />
            <LeagueButton title={strings.amateur} minNumUsers={40} buttonLeague={3} onPress={onLeague3} />
            <LeagueButton title={strings.beginner} minNumUsers={60} buttonLeague={4} onPress={onLeague4} />
        </ScrollView>

        {!blockForAd || !authManager.getMeSync() ? <View style={{
            width: '100%',
            padding: 15,
            paddingHorizontal: 20,
            paddingTop: 0,
            // marginTop: 20,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <View style={{
                width: '100%',
                height: 52,
                backgroundColor: Colors.gray800,
                borderTopLeftRadius: 12,
                borderTopRightRadius: 12,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Text style={{
                    width: 40,
                    color: Colors.titleColor,
                    fontFamily: 'Roboto-Bold',
                    textAlign: 'center'
                }}>Pos</Text>
                <Text style={{
                    // width: '90%',
                    flex: 1,
                    color: Colors.titleColor,
                    fontFamily: 'Roboto-Bold',
                    paddingLeft: 10
                }}>{strings.player}</Text>
                <Text style={{
                    width: 60,
                    color: Colors.titleColor,
                    fontFamily: 'Roboto-Bold',
                    textAlign: 'center',
                }}>{"Pts"}</Text>
            </View>

            {tableLoading ? <ActivityIndicator size={'large'} color={Colors.primary} style={{ marginTop: 20 }} />
                :
                <View style={{
                    width: '100%',
                }}>
                    {renderTable()}

                    {settings?.season == season ? <View style={{
                        height: 50,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        {showPrev ? <TouchableOpacity onPress={onPrev} activeOpacity={.6} style={{
                            flex: 1,
                            marginRight: 10,
                            alignItems: showNext ? 'flex-end' : 'center'
                        }}>
                            <Text style={{
                                fontSize: 16,
                                fontFamily: 'Roboto-Bold',
                                color: Colors.primary
                            }}>{`< ${strings.prev}`}</Text>
                        </TouchableOpacity> : null}

                        {showNext ? <TouchableOpacity onPress={onNext} activeOpacity={.6} style={{
                            flex: 1,
                            marginLeft: 10,
                            alignItems: showPrev ? 'flex-start' : 'center',
                        }}>
                            <Text style={{
                                fontSize: 16,
                                fontFamily: 'Roboto-Bold',
                                color: Colors.primary
                            }}>{strings.next} ></Text>
                        </TouchableOpacity> : null}
                    </View> : null}
                    {/* { dataManager.getSettings().enableAds ? <View style={{
                    width: '100%',
                    marginTop: 10,
                    // paddingHorizontal: 20,
                  }}>
                    <NativeAdComp />
                  </View> : null } */}
                </View>}
        </View>
            : <View style={{
                height: 40,
                alignItems: 'center',
                justifyContent: 'flex-start',
            }}>
                <TouchableOpacity onPress={onUnlock} disabled={!adLoaded} activeOpacity={.8} style={{
                    paddingLeft: 20,
                    paddingRight: 20,
                    height: 24,
                    opacity: adLoaded ? 1 : .8,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 12,
                    backgroundColor: Colors.primary
                }} >
                    <Text style={{
                        color: 'white',
                        fontFamily: 'Roboto-Bold',
                        fontSize: 12,
                    }}>{strings.unlock_table}</Text>
                    {adLoaded ? <MDIcon name='play-circle-filled' size={18} color='white' style={{
                        marginLeft: 4
                    }} /> : <ActivityIndicator size={'small'} color={'white'} style={{
                        marginLeft: 6
                    }} />}
                </TouchableOpacity>
            </View>}
    </View>
}