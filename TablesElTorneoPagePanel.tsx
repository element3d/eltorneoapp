import { ActivityIndicator, Image, ImageBackground, ScrollView, Text, TouchableOpacity, View } from "react-native"
import Colors from "./Colors"
import strings from "./Strings"
import dataManager from "./DataManager"
import AwardsPanel from "./AwardsPanel"
import WinnerPanel from "./WinnerPanel"
import NativeAdComp from "./NativeAdComp"

import Icon from 'react-native-vector-icons/FontAwesome5';
import MDIcon from 'react-native-vector-icons/MaterialIcons';
import FirstIcon from './assets/first.svg';
import FirstIcon2 from './assets/first2.svg';
import authManager from "./AuthManager"
import { ESTAT_TOTAL, ETAB_PREDICTS } from "./ProfilePage"
import { EGAME_ELTORNEO, EGAME_FIREBALL } from "./GamepadMenu"
import { ELEAGUE_AMATEUR, ELEAGUE_BEGINNER, ELEAGUE_LEGEND, ELEAGUE_PRO, ENEW_LEAGUE_AMATEUR, ENEW_LEAGUE_BEGINNER, ENEW_LEAGUE_LEGEND, ENEW_LEAGUE_PRO, ENEW_LEAGUE_REGULAR, ENEW_LEAGUE_SUPERSTAR } from "./Enums"
import LeaguePromotionPanel from "./LeaguePromotionPanel"
import GameSeasonButton from "./GameSeasonButton"

const league1Img = require('./assets/throphy.png')
const CHIP_OPACITY_DIS = 0.4;

export default function TablesElTorneoPagePanel({ navigation,
    me,
    table,
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
        navigation.push('AwardsInfo', {
            league: league,
        });
    }

    function onMyPosition() {
        let myPage = 1;
        myPage = Math.ceil((me.elTorneoPosition) / 20);

        if (myPage == page && league == me.elTorneoLeague) return;
        navigation.push('Tables', {
            page: myPage,
            league: me.elTorneoLeague,
            routeGame: EGAME_ELTORNEO,
            season: season,
        });
    }

    function onLeague1() {
        if (league == 1) return;
        navigation.push('Tables', {
            page: 1,
            routeGame: EGAME_ELTORNEO,
            league: 1,
            season: season
        });
    }

    function onLeague2() {
        if (league == 2) return;

        navigation.push('Tables', {
            page: 1,
            routeGame: EGAME_ELTORNEO,
            league: 2,
            season: season
        });
    }

    function onLeague3() {
        if (league == 3) return;

        navigation.push('Tables', {
            page: 1,
            routeGame: EGAME_ELTORNEO,
            league: 3,
            season: season
        });
    }

    function onNewLeague(newLeague) {
        navigation.push('Tables', {
            page: 1,
            routeGame: EGAME_ELTORNEO,
            league: newLeague,
            season: season
        });
    }

    function onLeague4() {
        if (league == 4) return;

        navigation.push('Tables', {
            page: 1,
            routeGame: EGAME_ELTORNEO,
            league: 4,
            season: season
        });
    }

    function onNavUser(u) {
        if (u.predictions)
            u.points = u.predictions

        authManager.setActiveUser(u)

        navigation.push('Profile', {
            id: u.id,
            globalPage: 1,
            selectedStat: ESTAT_TOTAL,
            tab: ETAB_PREDICTS,
        });
    }

    function getIcon(index) {
        let i = index
        i = index + 20 * (page - 1)
        if (i == 0 && (league == ELEAGUE_LEGEND)) {
            return <View style={{
                width: 40,
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <FirstIcon width={24} height={24} style={{
                    // marginLeft: 6
                }}></FirstIcon>
            </View>
        }

        // if (i == 0 && (league == ELEAGUE_BEGINNER)) {
        //     return <View style={{
        //         width: 40,
        //         alignItems: 'center',
        //         justifyContent: 'center'
        //     }}>
        //         <FirstIcon2 width={24} height={24} style={{
        //             marginLeft: 6
        //         }}></FirstIcon2>
        //     </View>
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
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    {getIcon(i)}
                    <Text numberOfLines={1} style={{
                        // width: '90%',
                        flex: 1,
                        color: authManager.getMeSync() && authManager.getMeSync().id == u.id ? Colors.primary2 : Colors.titleColor,
                        fontFamily: 'Roboto-Bold',
                        // textAlign: 'flex-start',
                        paddingLeft: 10
                    }}>{u.name}</Text>
                    <Text style={{
                        width: 50,
                        color: Colors.titleColor,
                        fontFamily: 'Roboto-Bold',
                        textAlign: 'center',
                    }}>{u.totalPredictions}</Text>
                    <Text style={{
                        width: 60,
                        // backgroundColor: 'red',
                        color: Colors.titleColor,
                        fontFamily: 'Roboto-Bold',
                        textAlign: 'center',
                    }}>{u.predictions}</Text>
                </TouchableOpacity>
            )
        })
    }

    function LeagueButton({ title, buttonLeague, onPress }) {
        function getTitleColor() {
            if (Colors.mode == 4 && league == buttonLeague) {
                return 'black'
            }
            return league == buttonLeague ? 'white' : Colors.titleColor
        }

        return <TouchableOpacity activeOpacity={.6} onPress={() => { onPress() }} style={{
            // marginLeft: buttonLeague != 5 || (me?.elTorneoPosition > 0 && (!settings?.season || settings?.season == season)) ? 0 : 20,
            marginLeft: 0,
            marginRight: 10,
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
            {Colors.mode == 4 && league == buttonLeague ? <Image source={dataManager.getButtonGradientLargeFC27()} style={{
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
                    color: getTitleColor()
                }}>{title}</Text>
                {me?.elTorneoLeague == buttonLeague ? <Text style={{
                    fontSize: 8,
                    fontFamily: 'Roboto-Bold',
                    lineHeight: 10,
                    color: getTitleColor()
                }}>{strings.your_league}</Text> : null}
            </View>
        </TouchableOpacity>
    }

    function showMePanel() {
        if (settings?.season != season) return;
        if (!me) return false;

        return me.elTorneoPosition > 1;
    }

    function showHistorySeasons() {
        // if (!me) return false;
        // if (me.elTorneoLeague >= ELEAGUE_BEGINNER) return false;
        return true;
    }

    function showNavMyPosition() {
        return me?.elTorneoPosition > 0 && (!settings?.season || settings?.season == season)
    }

    function getMyLeague() {
        if (me.elTorneoLeague == ENEW_LEAGUE_LEGEND) return strings.legend
        if (me.elTorneoLeague == ENEW_LEAGUE_SUPERSTAR) return strings.superstar
        if (me.elTorneoLeague == ENEW_LEAGUE_PRO) return strings.pro
        if (me.elTorneoLeague == ENEW_LEAGUE_REGULAR) return strings.regular
        if (me.elTorneoLeague == ENEW_LEAGUE_AMATEUR) return strings.amateur
        if (me.elTorneoLeague == ENEW_LEAGUE_BEGINNER) return strings.beginner
    }

    function getLeagueButtons() {
        if (season == '26/27') {
            if (!me || me.elTorneoLeague == -1 || me.elTorneoLeague == 6) return <View>
                <LeagueButton title={strings.beginner} buttonLeague={ENEW_LEAGUE_BEGINNER} onPress={() => onNewLeague(ENEW_LEAGUE_BEGINNER)} />
            </View>;

            return <View style={{
                flexDirection: 'row'
            }}>
                {me.elTorneoLeague == 1 ? <LeagueButton title={strings.legend} buttonLeague={ENEW_LEAGUE_LEGEND} onPress={() => onNewLeague(ENEW_LEAGUE_LEGEND)} /> : null}
                {me.elTorneoLeague <= 2 ? <LeagueButton title={strings.superstar} buttonLeague={ENEW_LEAGUE_SUPERSTAR} onPress={() => onNewLeague(ENEW_LEAGUE_SUPERSTAR)} /> : null}
                {me.elTorneoLeague <= 3 ? <LeagueButton title={strings.pro} buttonLeague={ENEW_LEAGUE_PRO} onPress={() => onNewLeague(ENEW_LEAGUE_PRO)} /> : null}
                {me.elTorneoLeague <= 4 ? <LeagueButton title={strings.regular} buttonLeague={ENEW_LEAGUE_REGULAR} onPress={() => onNewLeague(ENEW_LEAGUE_REGULAR)} /> : null}
                {me.elTorneoLeague <= 5 ? <LeagueButton title={strings.amateur} buttonLeague={ENEW_LEAGUE_AMATEUR} onPress={() => onNewLeague(ENEW_LEAGUE_AMATEUR)} /> : null}
                {me.elTorneoLeague <= 6 ? <LeagueButton title={strings.beginner} buttonLeague={ENEW_LEAGUE_BEGINNER} onPress={() => onNewLeague(ENEW_LEAGUE_BEGINNER)} /> : null}
            </View>;
        }

        return <View style={{
            flexDirection: 'row'
        }}>
            <LeagueButton title={strings.legend} buttonLeague={1} onPress={onLeague1} />
            <LeagueButton title={strings.pro} buttonLeague={2} onPress={onLeague2} />
            <LeagueButton title={strings.amateur} buttonLeague={3} onPress={onLeague3} />
            <LeagueButton title={strings.beginner} buttonLeague={4} onPress={onLeague4} />
        </View>
    }

    return <View style={{
        width: '100%',
        flexDirection: 'column',
    }}>
        {showHistorySeasons() ? <ScrollView style={{
            width: '100%',
            marginTop: 10,
            flexDirection: 'row',
        }}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            contentInsetAdjustmentBehavior="automatic"
            contentContainerStyle={{
                // width: '100%',
                alignItems: 'center',
                flexDirection: 'row',
                paddingLeft: 20,
                paddingRight: 10,
            }}>
            <GameSeasonButton title={'2026/27'} season={season} setSeason={setSeason} buttonSeason={'26/27'} />
            <GameSeasonButton title={'2025/26'} season={season} setSeason={setSeason} buttonSeason={'25/26'} />
            <GameSeasonButton title={'2024/25'} season={season} setSeason={setSeason} buttonSeason={'24/25'} />
        </ScrollView> : null}

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
                    {!settings?.season || settings?.season == season ? <AwardsPanel onReadMore={onNavAwardsInfo} league={league} season={season} />
                        : <WinnerPanel winner={table ? table[0] : null} season={season} league={league}></WinnerPanel>}
                </ImageBackground>
            </TouchableOpacity>
        </View>

        {!me || (season == '26/27' && me.elTorneoLeague != ENEW_LEAGUE_LEGEND) ? <LeaguePromotionPanel league={me ? me.elTorneoLeague : ENEW_LEAGUE_BEGINNER} points={me ? me.points : 0} /> : null}

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
                // width: '100%',
                flexDirection: 'row',
                paddingRight: 40
            }}>
            {showNavMyPosition() ? <TouchableOpacity activeOpacity={.6} onPress={() => { onMyPosition() }} style={{
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

            </TouchableOpacity> : <View style={{ width: 20 }}></View>}

            {getLeagueButtons()}
        </ScrollView>

        {!blockForAd || !authManager.getMeSync() ? <View style={{
            width: '100%',
            // backgroundColor: 'red',
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
                    width: 50,
                    color: Colors.titleColor,
                    fontFamily: 'Roboto-Bold',
                    textAlign: 'center',
                }}>Tp</Text>
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

                    {showMePanel() ? <TouchableOpacity activeOpacity={.8} onPress={() => { onNavUser(me) }} style={{
                        width: '100%',
                        height: 52,
                        marginTop: 20,
                        backgroundColor: authManager.getMeSync() && authManager.getMeSync().id == me.id ? Colors.gray800 : 'transparent',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Text style={{
                            width: 40,
                            fontSize: 16,
                            color: Colors.titleColor,
                            fontFamily: 'Roboto-Bold',
                            textAlign: 'center'
                        }}>{me.elTorneoPosition}</Text>
                        <View style={{
                            flex: 1,
                            paddingLeft: 10
                        }}>
                            <Text numberOfLines={1} style={{
                                // width: '90%',
                                // flex: 1,
                                color: Colors.primary,
                                fontSize: 15,
                                fontFamily: 'Roboto-Bold',
                                // textAlign: 'flex-start',
                            }}>{me.name}</Text>
                            <Text numberOfLines={1} style={{
                                // width: '90%',
                                fontSize: 12,
                                // flex: 1,
                                color: Colors.titleColor,
                                fontFamily: 'Roboto-Bold',
                                // textAlign: 'flex-start',
                            }}>{getMyLeague()}</Text>
                        </View>
                        <View style={{
                            width: 50,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <TouchableOpacity onPress={onMyPosition} style={{
                                width: 36,
                                height: 36,
                                borderRadius: 20,
                                borderWidth: 1,
                                borderColor: Colors.borderColor,
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Text style={{
                                    fontFamily: 'Roboto-Bold',
                                    color: Colors.titleColor
                                }}><Icon name='crosshairs' size={22}></Icon></Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={{
                            width: 60,
                            // backgroundColor: 'red',
                            color: Colors.titleColor,
                            fontFamily: 'Roboto-Bold',
                            textAlign: 'center',
                        }}>{me.points}</Text>
                    </TouchableOpacity> : null}

                    {settings?.season == season ? <View style={{
                        height: 50,
                        marginTop: 20,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        {showPrev ? <TouchableOpacity onPress={onPrev} activeOpacity={.6} style={{
                            flex: 1,
                            // height: 50,
                            marginRight: 10,
                            alignItems: showNext ? 'flex-end' : 'center'
                        }}>
                            <Text style={{
                                fontSize: 16,
                                fontFamily: 'Roboto-Bold',
                                color: Colors.primary2
                            }}>{`< ${strings.prev}`}</Text>
                        </TouchableOpacity> : null}
                        {showNext && showPrev ? <View style={{
                            width: 36,
                            height: 36,
                            marginHorizontal: 5,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderWidth: 1,
                            borderRadius: 20,
                            borderColor: Colors.borderColor
                        }}>
                            <Text style={{
                                fontFamily: 'Roboto-Bold',
                                color: Colors.titleColor
                            }}>{page}</Text>
                        </View> : null}
                        {showNext ? <TouchableOpacity onPress={onNext} activeOpacity={.6} style={{
                            // width: 50,
                            flex: 1,
                            marginLeft: 10,
                            alignItems: showPrev ? 'flex-start' : 'center',
                        }}>
                            <Text style={{
                                fontSize: 16,
                                fontFamily: 'Roboto-Bold',
                                color: Colors.primary2
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
                    backgroundColor: '#FF2882'
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