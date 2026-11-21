import { ActivityIndicator, Image, ImageBackground, ScrollView, Text, TouchableOpacity, View } from "react-native"
import dataManager from "./DataManager"
import WinnerPanel from "./WinnerPanel"
import NativeAdComp from "./NativeAdComp"
import Colors from "./Colors"
import strings from "./Strings"
import Icon from 'react-native-vector-icons/FontAwesome5';
import MDIcon from 'react-native-vector-icons/MaterialIcons';
import authManager from "./AuthManager"
import FirstIcon from './assets/eFootballTrophy.svg';
import SecondIcon from './assets/Fantasy_2_place.svg';
import ThirdIcon from './assets/Fantasy_3_place.svg';

import FirstIcon2 from './assets/first2.svg';

import { EGAME_EFOOTBALL } from "./GamepadMenu"
import AwardsPanelEFootball from "./AwardsPanelEFootball"
import { ELEAGUE_AMATEUR, ELEAGUE_BEGINNER, ELEAGUE_LEGEND, ELEAGUE_PRO, ENEW_LEAGUE_AMATEUR, ENEW_LEAGUE_BEGINNER, ENEW_LEAGUE_LEGEND, ENEW_LEAGUE_PRO, ENEW_LEAGUE_REGULAR, ENEW_LEAGUE_SUPERSTAR } from "./Enums"
import GameSeasonButton from "./GameSeasonButton"
import LeaguePromotionPanel from "./LeaguePromotionPanel"

const league1Img = require('./assets/eFootball_banner.png')
const CHIP_OPACITY_DIS = 0.4;

export default function TablesEFootballPagePanel({ navigation,
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
        navigation.navigate('EFootballInfo', {
            league: league,
        });
    }

    function onMyPosition() {
        let myPage = 1;
        myPage = Math.ceil((me.eFootballPosition) / 20);

        if (myPage == page && league == me.eFootballLeague) return;

        navigation.push('Tables', {
            page: myPage,
            league: me.eFootballLeague,
            routeGame: EGAME_EFOOTBALL,
            season: season,
        });
    }

    function onNewLeague(newLeague) {
        navigation.push('Tables', {
            page: 1,
            routeGame: EGAME_EFOOTBALL,
            league: newLeague,
            season: season
        });
    }

    function onLeague1() {
        if (league == ELEAGUE_LEGEND) return;
        navigation.push('Tables', {
            page: 1,
            routeGame: EGAME_EFOOTBALL,
            league: ELEAGUE_LEGEND,
            season: season
        });
    }

    function onLeague2() {
        if (league == ELEAGUE_PRO) return;
        if (numUsers <= 20) return;

        navigation.push('Tables', {
            page: 1,
            routeGame: EGAME_EFOOTBALL,
            league: ELEAGUE_PRO,
            season: season
        });
    }

    function onLeague3() {
        if (league == ELEAGUE_AMATEUR) return;
        if (numUsers <= 40) return;

        navigation.push('Tables', {
            page: 1,
            routeGame: EGAME_EFOOTBALL,
            league: ELEAGUE_AMATEUR,
            season: season
        });
    }

    function onLeague4() {
        if (league == ELEAGUE_BEGINNER) return;
        if (numUsers <= 60) return;

        navigation.push('Tables', {
            page: 1,
            routeGame: EGAME_EFOOTBALL,
            league: ELEAGUE_BEGINNER,
            season: season
        });
    }

    function onMoveToLeague() {
        navigation.push("MoveToLeague")
    }

    // function onPrev() {
    // }

    // function onNext() {
    // }

    function onNavUser(u) {
        if (u.predictions)
            u.points = u.predictions

        authManager.setActiveUser(u)

        navigation.navigate('Profile', {
            id: u.id,
            globalPage: 1,
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
                <FirstIcon width={26} height={32} style={{
                    // marginLeft: 6
                }}></FirstIcon>
            </View>
        }

        return <Text style={{
            width: 40,
            color: Colors.titleColor,
            fontSize: 16,
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
                    }}>{u.eFootballPoints}</Text>
                </TouchableOpacity>
            )
        })
    }

    function LeagueButton({ title, minNumUsers, buttonLeague, onPress }) {
        function getTitleColor() {
            if (Colors.mode == 4 && league == buttonLeague) {
                return 'black'
            }
            return league == buttonLeague ? 'white' : Colors.titleColor
        }

        return <TouchableOpacity activeOpacity={.6} onPress={() => { onPress() }} style={{
            marginLeft: buttonLeague != 1 || (me?.eFootballPosition > 0 && (!settings?.season || settings?.season == season)) ? 0 : 20,
            marginRight: 10,
            // opacity: numUsers > minNumUsers ? 1 : CHIP_OPACITY_DIS,
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
                {me?.eFootballLeague == buttonLeague ? <Text style={{
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

        return me.eFootballPosition > 1;
    }

    function getMyLeague() {
        if (me.eFootballLeague == ENEW_LEAGUE_LEGEND) return strings.legend
        if (me.eFootballLeague == ENEW_LEAGUE_SUPERSTAR) return strings.superstar
        if (me.eFootballLeague == ENEW_LEAGUE_PRO) return strings.pro
        if (me.eFootballLeague == ENEW_LEAGUE_REGULAR) return strings.regular
        if (me.eFootballLeague == ENEW_LEAGUE_AMATEUR) return strings.amateur
        if (me.eFootballLeague == ENEW_LEAGUE_BEGINNER) return strings.beginner
    }

    function getLeagueButtons() {
        if (season == '26/27') {
            if (!me || me.eFootballLeague == -1 || me.eFootballLeague == 6) return <View>
                <LeagueButton title={strings.beginner} buttonLeague={ENEW_LEAGUE_BEGINNER} onPress={() => onNewLeague(ENEW_LEAGUE_BEGINNER)} />
            </View>;

            return <View style={{
                flexDirection: 'row'
            }}>
                {me.eFootballLeague == 1 ? <LeagueButton title={strings.legend} buttonLeague={ENEW_LEAGUE_LEGEND} onPress={() => onNewLeague(ENEW_LEAGUE_LEGEND)} /> : null}
                {me.eFootballLeague <= 2 ? <LeagueButton title={strings.superstar} buttonLeague={ENEW_LEAGUE_SUPERSTAR} onPress={() => onNewLeague(ENEW_LEAGUE_SUPERSTAR)} /> : null}
                {me.eFootballLeague <= 3 ? <LeagueButton title={strings.pro} buttonLeague={ENEW_LEAGUE_PRO} onPress={() => onNewLeague(ENEW_LEAGUE_PRO)} /> : null}
                {me.eFootballLeague <= 4 ? <LeagueButton title={strings.regular} buttonLeague={ENEW_LEAGUE_REGULAR} onPress={() => onNewLeague(ENEW_LEAGUE_REGULAR)} /> : null}
                {me.eFootballLeague <= 5 ? <LeagueButton title={strings.amateur} buttonLeague={ENEW_LEAGUE_AMATEUR} onPress={() => onNewLeague(ENEW_LEAGUE_AMATEUR)} /> : null}
                {me.eFootballLeague <= 6 ? <LeagueButton title={strings.beginner} buttonLeague={ENEW_LEAGUE_BEGINNER} onPress={() => onNewLeague(ENEW_LEAGUE_BEGINNER)} /> : null}
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
                    {!settings?.season || settings?.season == season ? <AwardsPanelEFootball onReadMore={onNavAwardsInfo} league={league} season={season} />
                        : <WinnerPanel winner={table ? table[0] : null} season={season} league={league}></WinnerPanel>}
                </ImageBackground>
            </TouchableOpacity>
        </View>

        {!me || (season == '26/27' && me.eFootballLeague != ENEW_LEAGUE_LEGEND) ? <LeaguePromotionPanel league={me ? me.eFootballLeague : ENEW_LEAGUE_BEGINNER} points={me ? me.eFootballPoints : 0} /> : null}

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
            {me?.eFootballPosition > 0 && (!settings?.season || settings?.season == season) ? <TouchableOpacity activeOpacity={.6} onPress={() => { onMyPosition() }} style={{
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
                        }}>{me.eFootballPosition}</Text>
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
                        }}>{me.eFootballPoints}</Text>
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