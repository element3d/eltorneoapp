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
import FirstIcon from './assets/WorldCupTrophy.svg';
import SecondIcon from './assets/Second.svg';
import ThirdIcon from './assets/Third.svg';
import WorldCupPlaceIcon from './assets/WorldCupPlace.svg';

import { ESTAT_TOTAL, ETAB_PREDICTS } from "./ProfilePage"
import { EGAME_WORLD_CUP } from "./GamepadMenu"
import AwardsPanelWorldCup from "./AwardsPanelWorldCup"

const league1Img = require('./assets/world_cup_banner.png')
const CHIP_OPACITY_DIS = 0.4;

export default function TablesWorldCupPagePanel({ navigation,
    me,
    table,
    tableLoading,
    page,
    season,
    setSeason,
    league,
    numUsers,
    showPrev,
    showNext,
    onNext,
    onPrev,
    blockForAd,
    onUnlock,
    adLoaded }) {

    const settings = dataManager.getSettings()

    function onNavAwardsInfo() {
        navigation.navigate('WorldCupInfo', {
            league: league,
        });
    }

    function onMyPosition() {
        let myPage = 1;
        myPage = Math.ceil((me.worldCupPosition) / 20);
        if (myPage == page) return;

        navigation.push('Tables', {
            page: myPage,
            league: 1,
            routeGame: EGAME_WORLD_CUP,
            season: season,
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

    function getIcon(index, user) {
        let i = index + 1;

        i = index + 20 * (page - 1) + 1
        if (i == 1) {
            return <View style={{
                width: 40,
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <FirstIcon width={28} height={28} style={{
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
                        fontSize: i<10 ? 15 : 11,
                        color: '#DE4027',//Colors.titleColor,
                        fontFamily: 'ProtestGuerrilla-Regular',
                        textAlign: 'center'
                    }}>{i}</Text>
                </View>
            </View>
        }

        return <Text style={{
            width: 40,
            color: Colors.titleColor,
            fontFamily: 'Roboto-Bold',
            textAlign: 'center'
        }}>{i}</Text>
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
                    }}>{Math.max(0, u.worldCupPoints)}</Text>
                </TouchableOpacity>
            )
        })
    }

    function showMePanel() {
        return me?.worldCupPosition > 0
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
                    {!settings?.season || settings?.season == season ? <AwardsPanelWorldCup onReadMore={onNavAwardsInfo} league={league} season={season} />
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
                }}>{me.worldCupPosition}</Text>
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
                    color: Colors.titleColor,
                    fontFamily: 'Roboto-Bold',
                    textAlign: 'center',
                }}>{me.worldCupPoints}</Text>
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
                            marginRight: 10,
                            alignItems: showNext ? 'flex-end' : 'center'
                        }}>
                            <Text style={{
                                fontSize: 16,
                                fontFamily: 'Roboto-Bold',
                                color: Colors.primary
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