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
import FirstIcon from './assets/BeatBetTrophy.svg';
import SecondIcon from './assets/Second.svg';
import ThirdIcon from './assets/Third.svg';
import WorldCupPlaceIcon from './assets/WorldCupPlace.svg';

import { ESTAT_TOTAL, ETAB_PREDICTS } from "./ProfilePage"
import { EGAME_BEATBET, EGAME_FIREBALL } from "./GamepadMenu"
import { ELEAGUE_AMATEUR, ELEAGUE_BEGINNER, ELEAGUE_LEGEND, ELEAGUE_PRO } from "./Enums"
import GameSeasonButton from "./GameSeasonButton"

const league1Img = require('./assets/bb.png')

const CHIP_OPACITY_DIS = 0.4;
export const AI_USER_ID = 25524;

export default function TablesBeatBetPagePanel({ navigation,
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
        navigation.navigate('BeatBetInfo', {
            league: league,
        });
    }

    function onMyPosition() {
        let myPage = 1;
        myPage = Math.ceil((me.beatBetPosition + ((me.beatBetLeague - 1) * 20)) / 20);
        if (myPage == page) return;

        navigation.push('Tables', {
            page: myPage,
            league: 1,
            routeGame: EGAME_BEATBET,
            season: season,
        });
    }

    function onNavUser(u) {
        if (u.id == AI_USER_ID && dataManager.getSettings()?.showBeatBetOfficial) {
            navigation.navigate('BeatBetOfficial')
            return
        }
        u.points = u.predictions

        authManager.setActiveUser(u)

        navigation.navigate('Profile', {
            id: u.id,
            globalPage: 1,
            selectedStat: ESTAT_TOTAL,
            tab: ETAB_PREDICTS,
        });
    }

    function getIcon(index, user) {
        if (user.id == AI_USER_ID && dataManager.getSettings()?.showBeatBetOfficial) {
            return <View style={{
                width: 40,
                height: 40,
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <View style={{
                    width: 26,
                    height: 26,
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
            </View>
        }
        let i = index
        i = (user.beatBetLeague - 1) * 20 + user.beatBetPosition

        if (i == 1) {
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
        if (i == 2) {
            return <View style={{
                width: 40,
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <SecondIcon width={29} height={29} style={{
                    // marginLeft: 6
                }}></SecondIcon>
            </View>
        }
        if (i == 3) {
            return <View style={{
                width: 40,
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <ThirdIcon width={25} height={25} style={{
                    // marginLeft: 6
                }}></ThirdIcon>
            </View>
        }

        if (i <= 20) {
            return <View style={{
                width: 40,
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <View style={{
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <WorldCupPlaceIcon width={24} height={24} style={{
                        // marginLeft: 6
                    }}></WorldCupPlaceIcon>
                    <Text style={{
                        position: 'absolute',
                        width: 40,
                        fontSize: i < 10 ? 15 : 11,
                        color: '#DE4027',//Colors.titleColor,
                        fontFamily: 'ProtestGuerrilla-Regular',
                        textAlign: 'center'
                    }}>{i}</Text>
                </View>
            </View>
        }

        return <Text style={{
            width: 40,
            fontSize: 16,
            // color: '#777777',
            color: Colors.titleColor,
            fontFamily: 'Roboto-Bold',
            textAlign: 'center'
        }}>{i}</Text>
    }

    function getBalanceColor(u) {
        if (u.balance == 0) return Colors.titleColor
        if (u.balance < 0) return Colors.fail
        return Colors.success
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
                    {getIcon(i, u)}
                    <Text numberOfLines={1} style={{
                        // width: '90%',
                        flex: 1,
                        color: authManager.getMeSync() && authManager.getMeSync().id == u.id ? Colors.primary2 : Colors.titleColor,
                        fontFamily: 'Roboto-Bold',
                        // textAlign: 'flex-start',
                        paddingLeft: 10
                    }}>{u.id == AI_USER_ID && dataManager.getSettings()?.showBeatBetOfficial ? 'Beat Bet AI' : u.name}</Text>
                    <Text style={{
                        width: 50,
                        color: Colors.titleColor,
                        fontFamily: 'Roboto-Bold',
                        textAlign: 'center',
                    }}>{u.totalPredictions}</Text>
                    <Text style={{
                        width: 60,
                        // backgroundColor: 'red',
                        color: getBalanceColor(u),
                        fontFamily: 'Roboto-Bold',
                        textAlign: 'center',
                    }}>{u.balance.toFixed(1)}$</Text>
                </TouchableOpacity>
            )
        })
    }


    function showMePanel() {
        return me?.beatBetPosition > 0;
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
            // marginTop: 10,
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
                    {!settings?.season || settings?.season == season ? <AwardsPanelBeatBet onReadMore={onNavAwardsInfo} league={league} season={season} />
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

        {/* <ScrollView style={{
            marginBottom: 15,
        }}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            contentInsetAdjustmentBehavior="automatic"
            contentContainerStyle={{
                flexDirection: 'row',
                paddingRight: 40
            }}>
            {me?.beatBetPosition > 0 && (!settings?.season || settings?.season == season) ? <TouchableOpacity activeOpacity={.6} onPress={() => { onMyPosition() }} style={{
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
        </ScrollView> */}

        {showMePanel() ? <View style={{
            width: '100%',
            paddingHorizontal: 20,
            // marginTop: 20,
            marginBottom: 20,

        }}><TouchableOpacity activeOpacity={.8} onPress={() => { onNavUser(me) }} style={{
            width: '100%',
            height: 52,
            backgroundColor: authManager.getMeSync() && authManager.getMeSync().id == me.id ? Colors.gray800 : 'transparent',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
                <Text style={{
                    width: 40,
                    fontSize: 14,
                    color: Colors.titleColor,
                    fontFamily: 'Roboto-Bold',
                    textAlign: 'center'
                }}>{me.beatBetPosition + ((me.beatBetLeague - 1) * 20)}</Text>
                <View style={{
                    flex: 1,
                    paddingLeft: 10
                }}>
                    <Text numberOfLines={1} style={{
                        color: Colors.primary,
                        fontSize: 15,
                        fontFamily: 'Roboto-Bold',
                    }}>{me.name}</Text>
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
                    color: getBalanceColor(me),
                    fontFamily: 'Roboto-Bold',
                    textAlign: 'center',
                }}>{me.balance.toFixed(1)}$</Text>
            </TouchableOpacity>
        </View> : null}

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
                }}>Tb</Text>
                <Text style={{
                    width: 60,
                    color: Colors.titleColor,
                    fontFamily: 'Roboto-Bold',
                    textAlign: 'center',
                }}>{"Bal"}</Text>
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