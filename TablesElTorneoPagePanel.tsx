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
        let page = 1;
        if (me.elTorneoLeague == 4) {
            page = Math.ceil((me.elTorneoPosition) / 20);
        }

        navigation.push('Tables', {
            page: page,
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

    function onLeague4() {
        if (league == 4) return;

        navigation.push('Tables', {
            page: 1,
            routeGame: EGAME_ELTORNEO,
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
        if (i == 0 && (league == 1 || league == 2)) {
            return <View style={{
                width: 40,
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                {league == 1 ? <FirstIcon width={24} height={24} style={{
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
                        color: authManager.getMeSync() && authManager.getMeSync().id == u.id ? Colors.primary : Colors.titleColor,
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
        return <TouchableOpacity activeOpacity={.6} onPress={() => { onPress() }} style={{
            marginLeft: buttonLeague != 1 || (me?.elTorneoPosition > 0 && (!settings?.season || settings?.season == season)) ? 0 : 20,
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
            <View style={{
                paddingHorizontal: 20,
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Text style={{
                    fontFamily: 'Roboto-Bold',
                    color: league == buttonLeague ? 'white' : Colors.titleColor
                }}>{title}</Text>
                {me?.elTorneoLeague == buttonLeague ? <Text style={{
                    fontSize: 8,
                    fontFamily: 'Roboto-Bold',
                    lineHeight: 10,
                    color: league == buttonLeague ? 'white' : Colors.titleColor
                }}>{strings.your_league}</Text> : null}
            </View>
        </TouchableOpacity>
    }

    function SeasonButton({ title, buttonSeason }) {
        return <TouchableOpacity onPress={() => { setSeason(buttonSeason) }} disabled={dataManager.getSettings()?.season != '25/26' && buttonSeason == '25/26'} activeOpacity={.6} style={{
            marginRight: 10,
            opacity: dataManager.getSettings()?.season != '25/26' && buttonSeason == '25/26' ? .5 : 1,
            height: 40,
            backgroundColor: season == buttonSeason ? Colors.primary : Colors.gray800,
            borderWidth: 1,
            borderColor: season == buttonSeason && Colors.mode == 3 ? "#00FFFF" : Colors.borderColor,
            borderRadius: 20,
            overflow: 'hidden',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            {Colors.mode == 3 && season == buttonSeason ? <Image source={dataManager.getButtonGradientLarge()} style={{
                width: '100%',
                height: '100%',
                position: 'absolute'
            }} /> : null}
            <View style={{
                paddingHorizontal: 20,
            }}>
                <Text style={{
                    fontFamily: 'Roboto-Bold',
                    color: season == buttonSeason ? 'white' : Colors.titleColor
                }}>{strings.season} {title}</Text>
            </View>
        </TouchableOpacity>
    }

    return <View style={{
        width: '100%',
        flexDirection: 'column',
    }}>
        <View style={{
            width: '100%',
            paddingLeft: 20,
            marginTop: 10,
            flexDirection: 'row',
            alignItems: 'center',
        }}>
            <SeasonButton title={'2025/26'} buttonSeason={'25/26'} />
            <SeasonButton title={'2024/25'} buttonSeason={'24/25'} />
        </View>

        <View style={{
            padding: 20,
            paddingVertical: 10,
            // marginTop: 10,
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

        {dataManager.getSettings().enableAds ? <View style={{
            width: '100%',
            paddingHorizontal: 20
        }}>
            <NativeAdComp forceNativeAd={true} />
        </View> : null}

        <ScrollView style={{
            marginBottom: 15,
            // width: '100%',
        }}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            contentInsetAdjustmentBehavior="automatic"
            contentContainerStyle={{
                // width: '100%',
                flexDirection: 'row',
                paddingRight: 40
            }}>
            {me?.elTorneoPosition > 0 && (!settings?.season || settings?.season == season) ? <TouchableOpacity activeOpacity={.6} onPress={() => { onMyPosition() }} style={{
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

            <LeagueButton title={strings.legend} buttonLeague={1} onPress={onLeague1} />
            <LeagueButton title={strings.pro} buttonLeague={2} onPress={onLeague2} />
            <LeagueButton title={strings.amateur} buttonLeague={3} onPress={onLeague3} />
            <LeagueButton title={strings.beginner} buttonLeague={4} onPress={onLeague4} />
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

                    {settings?.season == season ? <View style={{
                        height: 50,
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
                                color: Colors.primary
                            }}>{`< ${strings.prev}`}</Text>
                        </TouchableOpacity> : null}

                        {showNext ? <TouchableOpacity onPress={onNext} activeOpacity={.6} style={{
                            // width: 50,
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