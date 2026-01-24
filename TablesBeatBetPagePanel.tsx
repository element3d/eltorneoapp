import { ActivityIndicator, ImageBackground, ScrollView, Text, TouchableOpacity, View } from "react-native"
import dataManager from "./DataManager"
import AwardsPanelBeatBet from "./AwardsPanelBeatBet"
import WinnerPanel from "./WinnerPanel"
import NativeAdComp from "./NativeAdComp"
import Colors from "./Colors"
import strings from "./Strings"
import Icon from 'react-native-vector-icons/FontAwesome5';
import MDIcon from 'react-native-vector-icons/MaterialIcons';
import authManager from "./AuthManager"
import FirstIcon from './assets/bbicon.svg';
import FirstIcon2 from './assets/first2.svg';

import { ESTAT_TOTAL, ETAB_PREDICTS } from "./ProfilePage"
import { EGAME_BEATBET, EGAME_FIREBALL } from "./GamepadMenu"

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
        let page = 1;
        if (me.beatBetLeague == 4) {
            page = Math.ceil((me.beatBetPosition) / 20);
        }

        navigation.push('Tables', {
            page: page,
            league: me.beatBetLeague,
            routeGame: EGAME_BEATBET,
            season: season,
        });
    }

    function onLeague1() {
        navigation.push('Tables', {
            page: 1,
            routeGame: EGAME_BEATBET,
            league: 1,
            season: season
        });
    }

    function onLeague2() {
        if (numUsers <= 20) return;

        navigation.push('Tables', {
            page: 1,
            routeGame: EGAME_BEATBET,
            league: 2,
            season: season
        });
    }

    function onLeague3() {
        if (numUsers <= 40) return;

        navigation.push('Tables', {
            page: 1,
            routeGame: EGAME_BEATBET,
            league: 3,
            season: season
        });
    }

    function onLeague4() {
        if (numUsers <= 60) return;

        navigation.push('Tables', {
            page: 1,
            routeGame: EGAME_BEATBET,
            league: 4,
            season: season
        });
    }

    function onMoveToLeague() {
        navigation.push("MoveToLeague")
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
        i = index + 20 * (page - 1)
        if (i == 0 && (league == 1 || league == 2)) {
            return <View style={{
                width: 40,
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                {league == 1 ? <FirstIcon width={26} height={26} style={{
                    // marginLeft: 6
                }}></FirstIcon> : <FirstIcon2 width={20} height={20} style={{
                    marginLeft: 6
                }}></FirstIcon2>}
            </View>
        }

        return <Text style={{
            width: 40,
            color: Colors.titleColor,
            fontFamily: 'Roboto-Bold',
            textAlign: 'center'
        }}>{i + 1}</Text>
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
                        color: authManager.getMeSync() && authManager.getMeSync().id == u.id ? Colors.primary : Colors.titleColor,
                        fontFamily: 'Roboto-Bold',
                        // textAlign: 'flex-start',
                        paddingLeft: 10
                    }}>{ u.id == AI_USER_ID && dataManager.getSettings()?.showBeatBetOfficial ? 'Beat Bet Official' : u.name}</Text>
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

    return <View style={{
        width: '100%',
        flexDirection: 'column'
    }}>
        <View style={{
            padding: 20,
            marginTop: 10,
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

            <TouchableOpacity activeOpacity={.6} onPress={() => { onLeague1() }} style={{
                marginLeft: me?.beatBetPosition > 0 && (!settings?.season || settings?.season == season) ? 0 : 20,
                marginRight: 10,
                paddingHorizontal: 20,
                height: 40,
                backgroundColor: league == 1 ? Colors.primary : Colors.gray800,
                borderWidth: 1,
                borderColor: Colors.borderColor,
                borderRadius: 20,
                alignItems: 'center',
                // flex: 1,
                justifyContent: 'center'
            }}>
                <Text style={{
                    fontFamily: 'Roboto-Bold',
                    color: league == 1 ? 'white' : Colors.titleColor
                }}>{strings.legend}</Text>
                {me?.beatBetLeague == 1 ? <Text style={{
                    fontSize: 8,
                    fontFamily: 'Roboto-Bold',
                    lineHeight: 10,
                    color: league == 1 ? 'white' : Colors.titleColor
                }}>{strings.your_league}</Text> : null}
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={.6} onPress={() => { onLeague2() }} style={{
                marginRight: 10,
                opacity: numUsers > 20 ? 1 : CHIP_OPACITY_DIS,
                paddingHorizontal: 20,
                height: 40,
                backgroundColor: league == 2 ? Colors.primary : Colors.gray800,
                borderWidth: 1,
                borderColor: Colors.borderColor,
                borderRadius: 20,
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Text style={{
                    fontFamily: 'Roboto-Bold',
                    color: league == 2 ? 'white' : Colors.titleColor
                }}>{strings.pro}</Text>
                {me?.beatBetLeague == 2 ? <Text style={{
                    fontSize: 8,
                    fontFamily: 'Roboto-Bold',
                    lineHeight: 10,
                    color: league == 2 ? 'white' : Colors.titleColor
                }}>{strings.your_league}</Text> : null}
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={.6} onPress={() => { onLeague3() }} style={{
                marginRight: 10,
                opacity: numUsers > 40 ? 1 : CHIP_OPACITY_DIS,
                paddingHorizontal: 20,
                height: 40,
                backgroundColor: league == 3 ? Colors.primary : Colors.gray800,
                borderWidth: 1,
                borderColor: Colors.borderColor,
                borderRadius: 20,
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Text style={{
                    fontFamily: 'Roboto-Bold',
                    color: league == 3 ? 'white' : Colors.titleColor
                }}>{strings.amateur}</Text>
                {me?.beatBetLeague == 3 ? <Text style={{
                    fontSize: 8,
                    fontFamily: 'Roboto-Bold',
                    lineHeight: 10,
                    color: league == 3 ? 'white' : Colors.titleColor
                }}>{strings.your_league}</Text> : null}
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={.6} onPress={() => { onLeague4() }} style={{
                marginRight: 10,
                opacity: numUsers > 60 ? 1 : CHIP_OPACITY_DIS,
                paddingHorizontal: 20,
                height: 40,
                backgroundColor: league == 4 ? Colors.primary : Colors.gray800,
                borderWidth: 1,
                borderColor: Colors.borderColor,
                borderRadius: 20,
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Text style={{
                    fontFamily: 'Roboto-Bold',
                    color: league == 4 ? 'white' : Colors.titleColor
                }}>{strings.beginner}</Text>
                {me?.beatBetLeague == 4 ? <Text style={{
                    fontSize: 8,
                    fontFamily: 'Roboto-Bold',
                    lineHeight: 10,
                    color: league == 4 ? 'white' : Colors.titleColor
                }}>{strings.your_league}</Text> : null}
            </TouchableOpacity>

            {/* <TouchableOpacity onPress={onMoveToLeague} style={{
                width: 40,
                height: 40,
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
                }}><Icon name='info' size={18}></Icon></Text>
            </TouchableOpacity> */}
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
                }}>Tb</Text>
                <Text style={{
                    width: 60,
                    color: Colors.titleColor,
                    fontFamily: 'Roboto-Bold',
                    textAlign: 'center',
                }}>{"Bal"}</Text>
            </View>

            {tableLoading ? <ActivityIndicator size={'large'} color={'#FF2882'} style={{ marginTop: 20 }} />
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
                                color: '#FF2882'
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
                                color: '#FF2882'
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