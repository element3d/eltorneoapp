import { Dimensions, Image, ImageBackground, Text, TouchableOpacity, View } from "react-native";
import SERVER_BASE_URL from "./AppConfig";
import strings from "./Strings";
import Colors from "./Colors";
import NativeAdComp from "./NativeAdComp";
import dataManager from "./DataManager";
import KitImage from "./KitImage";
import PlayerRowItem from "./PlayerRowItem";
import { useState } from "react";
import GoalsIcon from './assets/goals.svg';
import AssistIcon from './assets/assist.svg';
import PlayerImage from "./PlayerImage";
import { EGAME_FIREBALL } from "./GamepadMenu";
import FireballGreenPanel from "./FireballGreenPanel";
import FireballPredictRowPanel from "./FireballPredictRowPanel";
import BadIcon from './assets/semibad.svg';
import GoodIcon from './assets/good.svg';
import StarIcon from './assets/semiup.svg';
import UpIcon from './assets/up.svg';
import BottomIcon from './assets/bottom.svg';

const win = Dimensions.get('window');
const pitch = require('./assets/pitch_ver.png')
const pitchDark = require('./assets/pitch_dark.png')

export const ELINEUPS_VIEW_GOALS = 1
export const ELINEUPS_VIEW_RATING = 2

export const EEVENTS_VIEW_GOALS = 1
export const EEVENTS_VIEW_FULL = 2

export default function MatchLineupsPanel2({ match, view = ELINEUPS_VIEW_GOALS, isStarted = false, lineups, fireballPredict, onPlayerClick, onDeleteFireballPredict }) {
    const [team, setTeam] = useState(1)

    function isFireballPlayer(player) {
        // if (dataManager.getSettings().game != EGAME_FIREBALL) return false;
        if (!fireballPredict) return false;
        if (fireballPredict.player_api_id == player.apiId) {
            return true;
        }
        return false;
    }

    function getIcon(rating) {
        if (rating >= 8) return <UpIcon width={14} height={18} />
        if (rating < 6) return <BottomIcon width={14} height={18} />

        if (rating < 7.0) return <BadIcon width={15} height={16} />
        if (rating >= 7.0 && rating < 7.5) return <GoodIcon width={16} height={16} />
        return <StarIcon width={12} height={18} />
    }

    function renderPlayerIndicator(p) {

        if (view == ELINEUPS_VIEW_RATING) {
            return <View style={{
                height: 18,
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row'
            }}>
                {p.rating > 0 ? <Text style={{
                    marginRight: 4,
                    color: '#8E8E93',
                    fontFamily: 'Roboto-Bold',
                }}>{Number.parseFloat(p.rating).toFixed(1)}</Text> : null}
                {p.rating > 0 ? getIcon(Number.parseFloat(p.rating).toFixed(1)) : null}
            </View>
        }

        if (!isStarted) {
            return <View style={{
                height: 18,
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row'
            }}>
                { p.goals ? <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginRight: p.assists ? 4 : 0
                }}>
                    <GoalsIcon width={18} height={13} />
                    <Text style={{
                        color: Colors.titleColor,
                        marginLeft: 2,
                        lineHeight: 13,
                        fontFamily: 'Roboto-Bold',
                    }}>{p.goals}</Text>
                </View> : null }

                { p.assists ? <View style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <AssistIcon width={20} height={20} />
                    <Text style={{
                        color: Colors.titleColor,
                        marginLeft: 2,
                        lineHeight: 13,
                        fontFamily: 'Roboto-Bold',
                    }}>{p.assists}</Text>
                </View> : null }
            </View>
        }

        return <View style={{
            height: 18,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row'
        }}>
            {isStarted ? <View style={{
                flexDirection: 'row'
            }}>
                {Array.from({ length: p.goals || 0 }).map((_, i) => (
                    <GoalsIcon key={i} width={18} height={13} />
                ))}
            </View> : null}

            {isStarted ? <View style={{
                flexDirection: 'row'
            }}>
                {Array.from({ length: p.assists || 0 }).map((_, i) => (
                    <AssistIcon key={i} width={18} height={18} />
                ))}
            </View> : null}

            {isStarted ? <View style={{
                flexDirection: 'row'
            }}>
                {Array.from({ length: p.yellow || 0 }).map((_, i) => (
                    <View key={i} style={{
                        width: 9,
                        height: 13,
                        borderRadius: 3,
                        marginLeft: 1,
                        marginRight: 1,
                        backgroundColor: 'gold'
                    }} />
                ))}
            </View> : null}

            {isStarted ? <View style={{
                flexDirection: 'row'
            }}>
                {Array.from({ length: p.red || 0 }).map((_, i) => (
                    <View key={i} style={{
                        width: 9,
                        height: 13,
                        borderRadius: 3,
                        marginLeft: 1,
                        marginRight: 1,
                        backgroundColor: Colors.fail
                    }} />
                ))}
            </View> : null}
        </View>
    }

    function renderLeftTeam(formation, playerColor) {
        const rows = ['1'].concat(formation.split('-'));

        function getRowPlayers(apiRow) {
            return (currentTeam.players || [])
                .filter(p => {
                    const [r] = p.grid.split(':').map(Number);
                    return r === apiRow;
                })
                .sort((a, b) => {
                    const [, ca] = a.grid.split(':').map(Number);
                    const [, cb] = b.grid.split(':').map(Number);
                    return ca - cb;
                });
        }

        return (
            <View
                style={{
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '95%',
                    flex: 1,
                }}
            >
                {rows
                    .slice()
                    .reverse()
                    .map((count, idx) => {
                        const apiRow = rows.length - idx;
                        const rowPlayers = getRowPlayers(apiRow);
                        return (
                            <View key={`row-${apiRow}`} style={{ width: '100%', alignItems: 'center' }}>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        // flex: 1,
                                        justifyContent: 'space-around',
                                        // alignItems: 'center',
                                        // backgroundColor: 'green',
                                        width: '100%',
                                    }}
                                >
                                    {rowPlayers.map(p => {
                                        return <View
                                            key={`p-${p.name}`}
                                            style={{
                                                width: `${1 / rowPlayers.length * 100}%`,
                                                // backgroundColor: 'red',
                                                // shadowColor: 'black',
                                                // shadowOffset: { width: 0, height: 0 },
                                                // shadowOpacity: 0.015,
                                                // shadowRadius: 10,
                                            }}
                                        >
                                            <TouchableOpacity activeOpacity={.6} onPress={() => { onPlayerClick(p, currentMatchTeam) }}>
                                                <View
                                                    style={{
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        paddingHorizontal: 3
                                                    }}>
                                                    {renderPlayerIndicator(p)}
                                                    {!currentMatchTeam.playersReady ?
                                                        <View style={{
                                                            borderRadius: 50,
                                                            overflow: 'hidden',
                                                            borderWidth: 2,
                                                            borderColor: Colors.borderColor,
                                                        }}>
                                                            <Image src={`https://media.api-sports.io/football/players/${p.apiId}.png`} style={{
                                                                width: 50,
                                                                height: 50,

                                                            }} />
                                                        </View> :
                                                        <View >
                                                            <PlayerImage team={currentMatchTeam} player={p} imageSize={55} />
                                                        </View>}

                                                    <Text style={{
                                                        fontSize: 12,
                                                        marginTop: 4,
                                                        fontFamily: 'Roboto-Bold',
                                                        color: isFireballPlayer(p) ? dataManager.getLeaguePrimaryColor(match.league) : Colors.titleColor,
                                                        textAlign: 'center'
                                                    }}>
                                                        {p.number}. {p.name}
                                                    </Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    })}
                                </View>
                            </View>
                        );
                    })}
            </View>
        );
    }

    const pitchImage = Colors.mode == 1 ? pitch : pitchDark
    const imageSize = 80

    const currentTeam = team == 1 ? lineups.team1 : lineups.team2
    const currentMatchTeam = team == 1 ? match.team1 : match.team2

    function isMatchEnded() {
        if (match.status == 'FT' || match.status == 'AET' || match.status == 'PEN') return true
        return false;
    }

    return (
        <View
            style={{
                width: '100%',
                marginTop: 20,
                alignItems: 'center',
                justifyContent: 'flex-start',
                padding: 0,
                paddingBottom: 80
            }}>

            {dataManager.getSettings().game != EGAME_FIREBALL && fireballPredict ? <FireballPredictRowPanel match={match} fireballPredict={fireballPredict} players={lineups} isLineups={true} onDeleteFireballPredict={onDeleteFireballPredict} /> : null}

            <View style={{
                width: '100%',
                height: 46,
                padding: 4,
                marginBottom: 20,
                backgroundColor: Colors.selectBGColor,
                borderRadius: 30,
                flexDirection: 'row'
            }}>
                <TouchableOpacity activeOpacity={.6} onPress={() => { setTeam(1) }} style={{
                    flex: 1,
                    height: 38,
                    backgroundColor: team == 1 ? Colors.selectColor : 'transparent',
                    borderRadius: 30,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Text style={{
                        color: Colors.titleColor,
                        fontFamily: 'Roboto-Bold',
                    }}>{match.team1.shortName}</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={.6} onPress={() => { setTeam(2) }} style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: team == 2 ? Colors.selectColor : 'transparent',
                    borderRadius: 30
                }}>
                    <Text style={{
                        color: Colors.titleColor,
                        fontFamily: 'Roboto-Bold',
                    }}>{match.team2.shortName}</Text>
                </TouchableOpacity>
            </View>

            <View style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between'
            }}>
                <View style={{
                    opacity: team == 1 ? 1 : 0.5,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <KitImage width={match.league != 7 ? 40 : 40} height={match.league != 7 ? 50 : 40} match={match} team={match.team1} />
                    <View style={{
                        marginLeft: 5
                    }}>
                        <Text style={{
                            color: Colors.titleColor,
                            fontFamily: 'Roboto-Bold',
                            fontSize: 15
                        }}>{match.team1.shortName}</Text>
                        <Text style={{
                            color: '#636366',
                            fontFamily: 'Roboto-Bold',
                            fontSize: 13
                        }}>{lineups.team1.formation}</Text>
                    </View>
                </View>
                <View style={{
                    opacity: team == 2 ? 1 : 0.5,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>

                    <View style={{
                        marginRight: 5,
                        alignItems: 'flex-end'
                    }}>
                        <Text style={{
                            color: Colors.titleColor,
                            fontFamily: 'Roboto-Bold',
                            fontSize: 15
                        }}>{match.team2.shortName}</Text>
                        <Text style={{
                            color: '#636366',
                            fontFamily: 'Roboto-Bold',
                            fontSize: 13
                        }}>{lineups.team2.formation}</Text>
                    </View>
                    <KitImage width={match.league != 7 ? 40 : 40} height={match.league != 7 ? 50 : 40} match={match} team={match.team2} />
                </View>
            </View>

            <ImageBackground
                source={pitchImage}
                style={{
                    flexDirection: 'row',
                    width: '100%',
                    aspectRatio: 1 / 1.8,
                    alignItems: 'flex-end',
                    paddingBottom: 12,
                    justifyContent: 'center'
                }}
                resizeMode="contain"
            >
                <View style={{
                    width: '100%',
                    height: '90%',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>

                    {renderLeftTeam(currentTeam.formation, currentTeam.player_color, currentTeam.player_ncolor)}
                </View>
            </ImageBackground>

            <View style={{
                width: '100%',
                flexDirection: 'row',
                marginTop: 20,
                // alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                <View style={{ width: '100%' }}>
                    {currentTeam.players.map((p) => {
                        if (!p.start11) return

                        return <PlayerRowItem key={p.name} match={match} isStarted={isStarted} player1={p} team={currentMatchTeam} selected={isFireballPlayer(p)} onClick={onPlayerClick} />
                    })}
                </View>
            </View>

            {/* Subs */}
            <View style={{
                width: '100%',
                marginTop: 30,
                marginBottom: 10,
            }}>
                <Text style={{
                    fontSize: 20,
                    fontFamily: 'Roboto-Bold',
                    color: Colors.titleColor,
                }}>{strings.substitutes}</Text>
            </View>
            <View style={{
                width: '100%',
                flexDirection: 'row',
                // alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                <View style={{ width: '100%' }}>
                    {currentTeam.players.map((p) => {
                        if (p.start11) return
                        if (p.minutes == 0 && isMatchEnded()) return
                        return <PlayerRowItem key={p.name} match={match} isStarted={isStarted} selected={isFireballPlayer(p)} player1={p} team={currentMatchTeam} onClick={onPlayerClick} />
                    })}
                </View>
            </View>

            {currentTeam.coachApiId > 0 ? <View style={{
                // flex: 1,
                width: '100%',
                marginTop: 20,
                paddingBottom: 20,
                // backgroundColor: 'red',
                // flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                {!currentMatchTeam.playersReady ? <Image src={currentTeam.coachPhoto} style={{
                    width: imageSize,
                    height: imageSize,
                    borderRadius: 40,
                    borderWidth: 2,
                    backgroundColor: Colors.gray800,
                    borderColor: Colors.borderColor
                }} /> :
                    <Image src={`${SERVER_BASE_URL}/data/managers/${currentTeam.coachApiId}.png`} style={{
                        width: imageSize,
                        height: imageSize,
                    }} />}
                <View style={{
                    marginTop: 10,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Text numberOfLines={2} style={{
                        color: Colors.titleColor,
                        fontFamily: 'Roboto-Bold',
                        fontSize: 16,
                    }}>{currentTeam.coach}</Text>
                    <Text style={{
                        color: '#636366',
                        fontFamily: 'Roboto-Bold',
                        fontSize: 14
                    }}>{strings.managers}</Text>
                </View>
            </View> : null}

            {dataManager.getSettings().enableAds ? <View style={{
                width: '100%',
                marginTop: 30
            }}>
                <NativeAdComp />
            </View> : null}
        </View>
    );
}
