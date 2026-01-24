import React, { useEffect, useState, useRef } from 'react';
import {
    Image,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ActivityIndicator,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CalendarIcon from './assets/calendar_black.svg';
import CalendarWhiteIcon from './assets/calendar_white.svg';
import GamesIcon from './assets/games.svg';
import GoalsIcon from './assets/goals.svg';
import AssistIcon from './assets/assist.svg';
import BadIcon from './assets/semibad.svg';
import GoodIcon from './assets/good.svg';
import StarIcon from './assets/semiup.svg';
import UpIcon from './assets/up.svg';
import BottomIcon from './assets/bottom.svg';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomNavBar, { EPAGE_CALENDAR } from './BottomNavBar';
import AppBar from './AppBar';
import dataManager from './DataManager';
import strings from './Strings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from './Colors';
import TrailerItem from './TrailerItem';
import TrailerVideoDialog from './TrailerVideoDialog';
import SERVER_BASE_URL from './AppConfig';
import authManager from './AuthManager';
import MatchItem from './MatchItem';
import moment from 'moment';
import MatchPreviewDialog from './MatchPreviewDialog';
import PlayerImage from './PlayerImage';
import Gamepad from './Gamepad';
import GamepadMenu from './GamepadMenu';
import { useNavigation } from '@react-navigation/native';
import LiveMatchItem from './LiveMatchItem';
import ProfileStatsBet from './ProfileStatsBet';

const ETAB_MATCHES = 0
const ETAB_SQUAD = 1

const league1Img = require('./assets/bb.png')


function TeamAppBar({ navigation }) {

    return (
        <View style={{
            width: '100%',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
            height: 70
        }}>
            <TouchableOpacity activeOpacity={.6} onPress={() => { navigation.goBack() }} style={{
                width: 45,
                height: 45,
                borderRadius: 25,
                alignItems: 'center',
                borderColor: '#EAEDF1',
                // borderWidth: 2,
                marginLeft: 20,
                justifyContent: 'center',
                backgroundColor: '#ffffff22'
            }}>
                <Icon name={'arrow-back'} color='white' size={30}></Icon>
            </TouchableOpacity>
            <View style={{
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Text style={{
                    fontSize: 18,
                    // lineHeight: 26,
                    fontFamily: 'Poppins-Bold',
                    color: 'white'
                }}>{'Beat Bet'}</Text>
                <Text style={{
                    fontSize: 12,
                    lineHeight: 12,
                    opacity: .6,
                    marginTop: -6,
                    marginBottom: 8,
                    fontFamily: 'Roboto-Bold',
                    color: 'white'
                }}>{'www.eltorneo.app'}</Text>
            </View>
            <View style={{
                width: 50,
                height: 50,
                marginRight: 20,
            }}>
            </View>
        </View>
    )
}

function BeatBetOfficialPage({ route }): JSX.Element {
    const navigation = useNavigation();

    const [team, setTeam] = useState(dataManager.getTeam())
    const insets = useSafeAreaInsets();
    const [matches, setMatches] = useState([])
    const [data, setData] = useState(null)
    const [squad, setSquad] = useState([])
    const [loading, setLoading] = useState(true)
    const [showMatchPreview, setShowMatchPreview] = useState(false)
    const [previewMatch, setPreviewMatch] = useState(null)

    const user = dataManager.getBeatBetOfficialUser();

    useEffect(() => {
        getMatches()
    }, [])


    function getMatches() {
        const url = `${SERVER_BASE_URL}/api/v1/beatbet_official?page=${1}`
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // 'Authentication': authManager.getToken() ? authManager.getToken() : ''
            },
        })
            .then(response => response.json())
            .then(data => {
                setMatches(data.bets)
                setData(data)
                setLoading(false)
            })
            .catch(error => {
                console.log(error)
                setLoading(false)
            });
    }

    function onShowMatchPreview(match) {
        match.isTeaser = false
        setShowMatchPreview(match)
        setPreviewMatch(match)
    }

    function onShowMatchTrailer(match) {
        match.isTeaser = true
        setShowMatchPreview(match)
        setPreviewMatch(match)
    }

    function getPlayerName(player1) {
        if (player1.number <= 0) return player1.name;
        return `${player1.number}. ${player1.name}`;
    }

    function renderMatches() {
        if (loading) return
        let currMatchDate = null;

        const isSameDay = (date1, date2) => {
            return (
                date1.getFullYear() === date2.getFullYear() &&
                date1.getMonth() === date2.getMonth() &&
                date1.getDate() === date2.getDate()
            );
        };

        return <View >{!loading ? matches.map((item, index) => {
            let renderTime = false;

            if (currMatchDate == null || !isSameDay(new Date(currMatchDate), new Date(item.date))) {
                renderTime = true;
                currMatchDate = item.date;
            }
            item.week_type = item.weekType

            return <View key={`item_${item.id}_${index}`} style={{
                width: '100%',
                alignSelf: 'center'
            }}>
                {renderTime || index == 0 ? (
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginBottom: 10,
                        marginTop: 10,
                    }}>
                        {Colors.mode == 1 ? <CalendarIcon width={26} height={26} /> : <CalendarWhiteIcon width={26} height={26} />}
                        <Text style={{
                            marginLeft: 10,
                            fontFamily: 'Roboto-Bold',
                            color: Colors.titleColor,
                        }}>{moment(currMatchDate).format('DD')} {strings[moment(currMatchDate).format('MMM').toLowerCase()]} {moment(currMatchDate).format('YYYY')}</Text>
                    </View>
                ) : null}
                {item.is_special ? <LiveMatchItem match={item} matches={matches} navigation={navigation} leagueName={item.league.name}></LiveMatchItem> : <MatchItem showLeague={true} onPress={() => onNavMatch(item)} match={item} onShowMatchPreview={onShowMatchPreview} onShowMatchTrailer={onShowMatchTrailer} />}
            </View>
        }) : null}
        </View>
    }

    function onNavMatch(match) {
        dataManager.setMatch(match)

        navigation.navigate('Match', {
            id: match.id,
        });
    }

    function onClosePreview() {
        setShowMatchPreview(false)
    }

    function getBalanceSign() {
        if (user.balance > 0) return '+'
        if (user.balance < 0) return '-'
        return ''
    }

    function getBalanceColor() {
        if (user.balance > 0) return Colors.success
        if (user.balance < 0) return Colors.fail
        return 'white'
    }

    function getBalanceBGColor() {
        if (user.balance > 0) return '#34C75955'
        if (user.balance < 0) return '#FF474755'
        return 'transparent'
    }

    return (
        <View style={{ flex: 1, backgroundColor: Colors.gray800 }}>
            <View style={{
                width: '100%',
                height: insets.top,
                backgroundColor: '#37003C'
            }} />
            <StatusBar
                barStyle={'light-content'}
                backgroundColor={'#37003C'}
            />

            <View style={{ flex: 1, backgroundColor: Colors.bgColor }}>
                <ScrollView
                    contentInsetAdjustmentBehavior="automatic"
                    contentContainerStyle={{
                        paddingBottom: 80
                    }}
                    style={{ flex: 1 }}>
                    <View style={{
                        width: '100%',
                        overflow: 'hidden',
                        height: 150,
                        backgroundColor: '#37003C',
                        borderRadius: 20,
                        top: 0,
                        borderTopRightRadius: 0,
                        borderTopLeftRadius: 0,
                    }}>

                        <Image width={200} height={200} source={league1Img} style={{
                            position: 'absolute',
                            width: '100%',
                            height: 150,
                            borderRadius: 20,
                        }}></Image>

                        <TeamAppBar navigation={navigation} />

                        <View style={{
                            width: '100%',
                            paddingLeft: 20,
                            paddingRight: 20,
                            flexDirection: 'row',
                            alignItems: 'flex-end',
                        }}>
                            <View style={{
                                width: 60,
                                height: 60,
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: 'gold',
                                borderRadius: 10
                            }}>
                                <Text style={{
                                    color: 'black',
                                    fontFamily: 'Roboto-ExtraBold',
                                    fontSize: 36
                                }}>AI</Text>
                            </View>

                            <View style={{
                                justifyContent: 'flex-end',
                                flex: 1,
                                marginLeft: 10,
                                marginBottom: 4,
                            }}>
                                <Text style={{
                                    color: 'white',
                                    fontSize: 18,
                                    fontFamily: 'Roboto-Bold'
                                }}>{'Beat Bet Official'}</Text>
                                <Text style={{
                                    color: '#AEAEB2',
                                    fontSize: 14,
                                    marginTop: -3,
                                    fontFamily: 'Roboto-Bold',
                                }}>{'Official predictions'}</Text>
                            </View>
                            <View style={{
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <View style={{
                                    // width: 60,
                                    paddingHorizontal: 10,
                                    height: 32,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: getBalanceBGColor(),
                                    borderRadius: 30,
                                    borderWidth: 1,
                                    borderColor: getBalanceColor()
                                }}>
                                    <Text style={{
                                        color: getBalanceColor(),
                                        fontFamily: 'Roboto-ExtraBold',
                                        fontSize: 16
                                    }}>{getBalanceSign()}{user.balance.toFixed(2)}$</Text>
                                </View>
                                <Text style={{
                                    color: '#AEAEB2',
                                    fontSize: 16,
                                    fontFamily: 'Roboto-Bold'
                                }}>{strings.balance}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{
                        width: '100%',
                        paddingTop: 25,
                    }}>

                        {loading ? <ActivityIndicator color={'#FF2882'} size={'large'}></ActivityIndicator> : null}
                        {!loading ? <ProfileStatsBet predictsJson={data} /> : null}
                        {!loading ? <View style={{
                            paddingHorizontal: 20,
                            marginTop: 10
                        }}>
                            {renderMatches()}
                        </View> : null}
                    </View>
                </ScrollView>
                <BottomNavBar navigation={navigation} />
            </View>

            {showMatchPreview ? <MatchPreviewDialog onClose={onClosePreview} match={previewMatch} /> : null}
            <View style={{
                width: '100%',
                backgroundColor: Colors.gray800,
                height: insets.bottom
            }}></View>
        </View>
    );
}

export default BeatBetOfficialPage;
