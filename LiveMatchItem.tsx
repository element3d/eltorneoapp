import { Image, Text, TouchableOpacity, View } from "react-native"
import dataManager from "./DataManager"
import TeamItem from "./TeamItem"
import strings from "./Strings"
import SERVER_BASE_URL from "./AppConfig"
import moment from "moment"
import Colors from "./Colors"
import GoalsIcon from './assets/goals.svg';
import EventsYIcon from './assets/eventsY.svg'


import { useEffect, useState } from "react"
import { EGAME_BEATBET, EGAME_CAREER, EGAME_ELTORNEO, EGAME_FIREBALL } from "./GamepadMenu"

export default function LiveMatchItem({ match, matches, leagueName, navigation, showPredict = true, showLeague = true, marginBottom = 20 }) {

    const [showBG, setShowBG] = useState(false);

    const m = match
    if (!m.league_name) {
        m.league_name = leagueName
    }
    if (m.week_type !== 0) {
        if (!m.week_type) {
            m.week_type = m.weekType
        }
    }

    useEffect(() => {

    }, [matches])

    const matchDate = m.date;
    const now = Date.now();
    let isLive = false;
    if (matchDate < now) {
        isLive = true;
    }

    function getStatusText(m) {
        if (m.team1_score != -1 && m.team2_score != -1) {
            m.status = 'FT'
        }

        if (m.status == 'HT' || m.status == 'FT' || m.status == 'BT' || m.status == 'P') return m.status

        if (!isLive) {
            return moment(m.date).format('HH:mm')
        }
        return m.elapsed + " '"
    }

    function isMatchEnded() {
        if (m.team1_score != -1 && m.team2_score != -1) return true;
        return false;
    }

    function renderScorePanel() {
        let marginBottom = 20;
        if (match.status == 'PEN') {
            marginBottom = 10;
        } else if (match.status == 'AET') {
            marginBottom = 16;
        }
        if (isMatchEnded()) {
            return <View style={{
                paddingBottom: marginBottom,
                alignItems: 'center',
                justifyContent: 'center',
                // backgroundColor: 'red'
            }}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    // marginTop: 20,
                    marginBottom: 4
                }}>
                    <Text style={{
                        color: 'white',
                        fontSize: 32,
                        fontFamily: 'Roboto-Bold',
                        marginRight: 10
                    }}>{m.team1_score}</Text>
                    <Text style={{
                        color: 'white',
                        fontSize: 28,
                        fontFamily: 'Roboto-Bold',
                    }}>:</Text>
                    <Text style={{
                        color: 'white',
                        fontSize: 32,
                        fontFamily: 'Roboto-Bold',
                        marginLeft: 10
                    }}>{m.team2_score}</Text>
                </View>

                {match.status == 'AET' || match.status == 'PEN' ? <View style={{
                    // width: '100%',
                    height: 24,
                    width: 'ma',
                    marginTop: -4,
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    paddingLeft: 15,
                    paddingRight: 2,
                    borderRadius: 12,
                    borderWidth: 1,
                    borderColor: 'white',
                }}>
                    <Text style={{
                        fontSize: 14,
                        fontFamily: 'Roboto-Bold',
                        color: 'white',
                    }}>{match.team1_score_90} : {match.team2_score_90}</Text>
                    <View style={{
                        width: 18,
                        height: 18,
                        marginLeft: 6,
                        backgroundColor: 'white',
                        borderRadius: 9,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Text style={{
                            color: 'black',
                            fontWeight: 900,
                            fontSize: 11
                        }}>90</Text>
                    </View>
                </View> : null}

                {match.status == 'PEN' ? <View style={{
                    marginTop: 6,
                    height: 24,
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    paddingLeft: 15,
                    paddingRight: 2,
                    borderRadius: 12,
                    borderWidth: 1,
                    borderColor: 'white',
                }}>
                    <View>
                        <Text style={{
                            fontSize: 14,
                            fontFamily: 'Roboto-Bold',
                            color: 'white',
                        }}>{match.team1_score_pen} : {match.team2_score_pen}</Text>
                    </View>
                    <View style={{
                        // marginTop:
                        paddingLeft: 4,
                        paddingRight: 4,
                        height: 18,
                        marginLeft: 6,
                        backgroundColor: 'white',
                        borderRadius: 10,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Text style={{
                            color: 'black',
                            fontWeight: 900,
                            fontSize: 11
                        }}>PEN</Text>
                    </View>
                </View> : null}
            </View>
        }
        return <View style={{
            paddingBottom: 20,
            // backgroundColor: 'red'
        }}>
            {isLive ? <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                // marginTop: 20,
                marginBottom: 3
            }}>
                <Text style={{
                    color: 'white',
                    fontSize: 24,
                    fontFamily: 'Roboto-Bold',
                    marginRight: 10
                }}>{m.team1_score > -1 ? m.team1_score : m.team1_score_live}</Text>
                <Text style={{
                    color: 'white',
                    fontSize: 20,
                    fontFamily: 'Roboto-Bold',
                }}>:</Text>
                <Text style={{
                    color: 'white',
                    fontSize: 24,
                    fontFamily: 'Roboto-Bold',
                    marginLeft: 10
                }}>{m.team2_score > -1 ? m.team2_score : m.team2_score_live}</Text>
            </View> : <Text style={{
                textAlign: 'center',
                fontSize: 16,
                marginBottom: 4,
                fontFamily: 'Roboto-Bold',
                color: 'white'
            }}>{getDate()} </Text>
            }
            <View style={{
                // marginBottom: 27,
                height: 30,
                paddingLeft: 14,
                paddingRight: 14,
                borderWidth: 1.0,
                borderColor: '#00C566',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 20,
                backgroundColor: '#34C75944'
            }}>
                <Text style={{
                    fontSize: 16,
                    color: '#00C566',
                    fontFamily: 'Roboto-Bold',
                    marginLeft: isLive ? 2 : 0,
                }}>{getStatusText(m)}</Text>
            </View>
        </View>
    }

    function onNavMatch(match) {
        const currentRoute = navigation.getState().routes[navigation.getState().index];

        if (match.bet) {
            if (!match.bet.amount) match.bet = null;
        }
        match.leagueName = match.league_name
        match.weekType = match.week_type
        dataManager.setMatch(match)

        if (currentRoute.name == 'Match') {
            navigation.push('Match', {
                id: match.id,
            });
        } else {
            navigation.navigate('Match', {
                id: match.id,
            });
        }
    }

    function getDate() {
        const today = moment().startOf('day');
        const tomorrow = moment().add(1, 'day').startOf('day');

        if (moment(matchDate).isSame(today, 'day')) {
            return strings.today;
        } else if (moment(matchDate).isSame(tomorrow, 'day')) {
            return strings.tomorrow;
        } else {
            return `${moment(matchDate).format('DD')} ${strings[moment(matchDate).format('MMM').toLowerCase()]}`;
        }
    }

    function getBanner() {
        const cache = dataManager.getImageCacheTime();

        const leagueName = encodeURIComponent(m.league_name || '');
        const country = encodeURIComponent(m.league_country || '');
        const special = encodeURIComponent(m.special_match_title || '');

        if (Colors.mode == 3) {
            if (match.special_match_title.length) {
                return `${SERVER_BASE_URL}/data/special/${special}.png${cache}`;
            }

            return `${SERVER_BASE_URL}/data/leagues/${leagueName}_banner_fc26.jpg${cache}`;
        }

        if (!match.special_match_title?.length) {
            return `${SERVER_BASE_URL}/data/leagues/${leagueName}${country}_banner.jpg${cache}`;
        }

        return `${SERVER_BASE_URL}/data/special/${special}.png${cache}`;
    }

    function getFireballPredictView() {
        const iconSize = 13;
        if (match.fireballPredict.status == -1) {
            return <Text style={{
                fontSize: 13,
                fontFamily: 'Roboto-Bold',
                marginLeft: 4,
                color: Colors.fail
            }}>({strings.not_played})</Text>
        }
        if (match.fireballPredict.status == 4) {
            return <Text style={{
                fontSize: 13,
                fontFamily: 'Roboto-Bold',
                marginLeft: 4,
                color: Colors.fail
            }}>({strings.not_scored})</Text>
        }
        if (match.fireballPredict.status == 1) {
            return <GoalsIcon width={iconSize} height={iconSize} style={{
                marginLeft: 4
            }} />
        }
        if (match.fireballPredict.status == 2) {
            return <View style={{
                flexDirection: 'row'
            }}><GoalsIcon width={iconSize} height={iconSize} style={{
                marginLeft: 4
            }} />
                <GoalsIcon width={iconSize} height={iconSize} style={{
                    marginLeft: 4
                }} />
            </View>
        }
        if (match.fireballPredict.status == 3) {
            const numGoals = match.fireballPredict.goals;
            return <View style={{ flexDirection: 'row' }}>
                {Array.from({ length: numGoals }).map((_, idx) => (
                    <GoalsIcon
                        key={idx}
                        width={iconSize}
                        height={iconSize}
                        style={{ marginLeft: 4 }}
                    />
                ))}
            </View>
        }
    }

    function renderPredictPanel() {
        let game = dataManager.getSettings().game;
        if (game == EGAME_ELTORNEO || game == EGAME_CAREER) {
            if (m.predict && m.predict?.team1_score > -1 && m.predict?.team2_score > -1) {
                if (m.predict.status != 0) {
                    <View style={{
                        height: 22,
                        borderRadius: 20,
                        paddingLeft: 20,
                        paddingRight: m.playOff ? 4 : 20,
                        marginBottom: 5,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'white'
                    }}>
                        <Text style={{
                            color: 'black',
                            fontSize: 14,
                            fontFamily: 'Roboto-Bold',
                        }}>{strings.prediction} {m.predict.team1_score} : {m.predict.team2_score}</Text>

                        {match.playOff ? <View style={{
                            width: 18,
                            height: 18,
                            backgroundColor: 'black',
                            borderRadius: 9,
                            marginLeft: 6,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Text style={{
                                fontSize: 12,
                                fontWeight: 900,
                                color: 'white'
                            }}>90</Text>
                        </View> : null}
                    </View>
                }

                return <View style={{
                    height: 22,
                    borderRadius: 20,
                    paddingLeft: 20,
                    paddingRight: m.playOff ? 4 : 20,
                    marginBottom: 5,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: dataManager.getPredictBgColor(match.predict, true)
                }}>
                    <Text style={{
                        color: dataManager.getPredictBorderColor(match.predict, true),
                        fontSize: 14,
                        fontFamily: 'Roboto-Bold',
                    }}>{dataManager.getPredictTitle(match.predict)}{dataManager.getPredictValue(match.predict)}</Text>

                    {match.playOff ? <View style={{
                        width: 18,
                        height: 18,
                        backgroundColor: 'black',
                        borderRadius: 9,
                        marginLeft: 6,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Text style={{
                            fontSize: 12,
                            fontWeight: 900,
                            color: 'white'
                        }}>90</Text>
                    </View> : null}

                </View>
            }
            return <View style={{
                height: 20
            }}></View>
        }
        if (dataManager.getSettings().game == EGAME_BEATBET) {
            if (m.bet && m.bet.amount > 0) {
                return <View style={{
                    width: '100%',
                    // height: 30,
                    marginBottom: 5,
                    marginTop: 2,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <View style={{
                        // borderWidth: 1,
                        backgroundColor: match.is_special ? 'white' : "#F7F7F7",
                        // borderColor: match.is_special ? 'gold' : getBorderColor(match.predict),
                        alignItems: 'center',
                        // borderWidth: match.is_special ? 1 : 0,
                        justifyContent: 'center',
                        borderRadius: 12,
                        paddingLeft: 15,
                        paddingRight: 15,
                        flexDirection: 'row',
                        height: 22,
                        // marginTop: 2
                    }}>
                        <Text style={{
                            fontSize: 14,
                            // marginBottom: 2,
                            color: 'black',
                            fontFamily: 'Roboto-Bold',
                            // fontFamily: 'NotoSansArmenian-Bold'
                        }}>{strings.bet} {dataManager.getBetString(match.bet.bet)}</Text>
                        <Text style={{
                            fontSize: 14,
                            // marginBottom: 2,
                            color: '#AEAEB2',
                            fontFamily: 'Roboto-Bold',
                            // fontFamily: 'NotoSansArmenian-Bold'
                        }}>({match.bet.odd.toFixed(2)})</Text>
                        <Text style={{
                            fontSize: 14,
                            marginLeft: 10,
                            // marginBottom: 2,
                            color: dataManager.getBetStatusColor(match.bet, true),
                            fontFamily: 'Roboto-Bold',
                            // fontFamily: 'NotoSansArmenian-Bold'
                        }}>{dataManager.getBetStatusValue(match.bet, match.is_special)}</Text>

                        {/* {match.playOff ? <View style={{
                            width: 18,
                            height: 18,
                            backgroundColor: 'black',
                            borderRadius: 9,
                            marginLeft: 6,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Text style={{
                                fontSize: 12,
                                fontWeight: 900,
                                color: 'white'
                            }}>90</Text>
                        </View> : null} */}
                    </View>
                </View>
            }

            return <View style={{
                height: 20
            }}></View>
        }

        if (dataManager.getSettings().game == EGAME_FIREBALL) {
            if (m.fireballPredict && m.fireballPredict?.player_api_id > 0) {
                if (m.fireballPredict.status != 0) {
                    return <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginBottom: 5,
                        justifyContent: 'center'
                    }}>
                        {match.fireballPredict.team_id == match.team1.id ? <View style={{
                            width: 6,
                            height: 6,
                            borderRadius: 5,
                            marginRight: 6,
                            backgroundColor: Colors.primary
                        }}></View> : null}
                        <View style={{
                            height: 22,
                            borderRadius: 20,
                            paddingLeft: 20,
                            paddingRight: 20,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'white'
                        }}>
                            <Text style={{
                                color: 'black',
                                fontSize: 14,
                                fontFamily: 'Roboto-Bold',
                            }}>{m.fireballPredict.player_name}</Text>
                            {match.fireballPredict.status != 0 ? getFireballPredictView() : null}
                        </View>
                        {match.fireballPredict.team_id == match.team2.id ? <View style={{
                            width: 6,
                            height: 6,
                            borderRadius: 5,
                            marginLeft: 6,
                            backgroundColor: Colors.primary
                        }}></View> : null}
                    </View>
                }
                return <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 5,
                    justifyContent: 'center'
                }}>
                    {match.fireballPredict.team_id == match.team1.id ? <View style={{
                        width: 6,
                        height: 6,
                        borderRadius: 5,
                        marginRight: 6,
                        backgroundColor: Colors.primary
                    }}></View> : null}
                    <View style={{
                        height: 22,
                        borderRadius: 20,
                        paddingLeft: 20,
                        paddingRight: 20,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'white'
                    }}>
                        <Text style={{
                            color: 'black',
                            fontSize: 14,
                            fontFamily: 'Roboto-Bold',
                        }}>{m.fireballPredict.player_name}</Text>
                    </View>
                    {match.fireballPredict.team_id == match.team2.id ? <View style={{
                        width: 6,
                        height: 6,
                        borderRadius: 5,
                        marginLeft: 6,
                        backgroundColor: Colors.primary
                    }}></View> : null}
                </View>
            }

            return <View style={{
                height: 20
            }}></View>
        }

        // if (dataManager.getSettings().game == EGAME_CAREER) {
        //     return <View style={{
        //         height: 20
        //     }}></View>
        // }
    }

    function getSpecialPoints() {
        return match.special_match_points.split(':')
    }

    function getPoints(p) {
        const sp = getSpecialPoints()

        if (p.status == 0) return '0'
        if (p.status == 1) return match.is_special ? '+' + sp[1] : '+1'
        if (p.status == 2) return match.is_special ? '+' + sp[0] : '+3'
        if (p.status == 3) return match.is_special ? sp[2] : '-1'
        if (p.status == 4) return '-2'
        if (p.status == 5) return match.is_special ? '+' + sp[1] : '+2'
    }

    function onShowBG() {
        // show BG immediately
        if (!showBG)
            setShowBG(true);
        else 
            setShowBG(false);

        // hide it after 2 seconds
        setTimeout(() => {
            setShowBG(false);
        }, 2000);
    }

    return (
        <TouchableOpacity onPress={() => onNavMatch(m)} activeOpacity={.9} style={{
            width: '100%',
            // height: 250,
            // paddingBottom: 20,
            borderRadius: 16,
            overflow: 'hidden',
            marginBottom: marginBottom,
            alignItems: 'center',
            backgroundColor: dataManager.getBannerBackColor(match.league)
        }}>
            <Image src={getBanner()} style={{
                width: '100%',
                height: '100%',
                top: 0,
                position: 'absolute'
            }} />
            {match.is_special ? <TouchableOpacity activeOpacity={.6} onPress={onShowBG}
                style={{
                    zIndex: 1,
                    width: 30,
                    height: 30,
                    position: 'absolute',
                    left: 6,
                    top: 6,
                    // backgroundColor: Colors.gray800,
                    borderRadius: 25
                }}>
                <EventsYIcon width={32} height={32} />
            </TouchableOpacity> : null}
            <View style={{
                opacity: showBG ? 0 : 1,
                alignItems: 'center'
            }}>

                <View style={{
                    width: '100%',
                    alignItems: 'center',
                    paddingTop: 10,
                }}>

                    <View style={{
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        {match.is_special && !showLeague ? <Text style={{
                            fontSize: 17,
                            fontFamily: "Roboto-ExtraBold",
                            // marginBottom: 10,
                            // fontWeight: 'bold',
                            color: 'white'
                        }}>{m.special_match_tr_title}</Text> :
                            <Text style={{
                                fontSize: 18,
                                fontFamily: "Roboto-ExtraBold",
                                // fontWeight: 'bold',
                                color: 'white'
                            }}>{m.league_name}</Text>}
                        <Text style={{
                            color: '#AEAEB2',
                            fontSize: 10,
                            // backgroundColor: 'red',
                            marginTop: -2,
                            // lineHeight: 10,
                            fontFamily: "Roboto-ExtraBold",
                        }}>{dataManager.getWeekTitle({ week: m.week, type: m.week_type })}</Text>
                    </View>
                </View>

                <View style={{
                    width: '100%',
                    marginTop: 0,
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row'
                }}>
                    <TeamItem team={m.team1} league={m.league} isHome={true} compact={true} />
                    {renderScorePanel()}
                    <TeamItem team={m.team2} league={m.league} compact={true} />

                </View>
                {showPredict ? <View style={{
                    padding: 4,
                }}>
                    {renderPredictPanel()}
                </View> : <View style={{
                    height: 20
                }}></View>}

                {match.predict?.status > 0 ? <View style={{
                    position: 'absolute',
                    top: 6,
                    right: 10,
                    borderRadius: 4,
                    paddingLeft: 5,
                    paddingRight: 5,
                    // borderWidth: match.is_special ? 1 : 0,
                    // borderColor: match.is_special ? 'gold' : getBorderColor(match.predict),
                    backgroundColor: dataManager.getPredictBgColor(match.predict, match.is_special)
                }}>
                    <Text style={{
                        fontFamily: 'Roboto-Bold',
                        fontSize: 11,
                        color: dataManager.getPredictBorderColor(match.predict, match.is_special)
                    }}>{strings.points}: {getPoints(match.predict)}</Text>
                </View> : null}
            </View>
        </TouchableOpacity>
    )
}