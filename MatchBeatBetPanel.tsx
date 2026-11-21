import { Image, Text, TouchableOpacity, View } from "react-native";

export const EBEAT_BET_TYPE_WIN = 0
export const EBEAT_BET_TYPE_NOT_BEATEN = 1
export const BEAT_BET_STATUS_DRAW = 2
export const BEAT_BET_STATUS_NOT_DRAW = 3
import Icon from 'react-native-vector-icons/MaterialIcons';
import FAIcon from 'react-native-vector-icons/FontAwesome5';
import strings from "./Strings";
import authManager from "./AuthManager";
import SERVER_BASE_URL from "./AppConfig";

export default function MatchBeatBetPanel({ navigation, predict, match, beatBet }) {

    function getAiTeamName() {
        if (beatBet.bet == 'x2') {
            return match.team2.shortName + ' - ' + strings.ai_predict_not_loose;
        }

        if (beatBet.bet == 'x1') {
            return match.team1.shortName + ' - ' + strings.ai_predict_not_loose;
        }

        if (beatBet.ai_type == 3) {
            return strings.ai_predict_not_draw
        }

        if (beatBet.ai_type == 2) {
            return strings.ai_predict_draw
        }

        if (beatBet.ai_team == 1) {
            return match.team1.shortName + " - "
        } else if (beatBet.ai_team == 2) {
            return match.team2.shortName + " - "
        } else {
            return strings.ai_predict_draw
        }
    }

    function getAiType() {
        if (beatBet.ai_type == EBEAT_BET_TYPE_WIN) {
            return strings.ai_predict_win
        }

        if (beatBet.ai_type == EBEAT_BET_TYPE_NOT_BEATEN) {
            return strings.ai_predict_not_loose
        }

        return ""
    }


    function showPredict() {
        if (isMatchEnded())
            return true

        if (isMatchLive())
            return true

        // if (!authManager.getMeSync() || !predict) return false

        return false;
    }

    function getError() {
        if (!authManager.getMeSync()) return strings.ai_predict_msg1
        if (!predict) return strings.ai_predict_msg2

        if (!isMatchLive()) return strings.ai_predict_msg3
        return ""
    }

    function isMatchEnded() {
        return match.status == 'FT' || match.status == "AET" || (match?.team1_score >= 0 && match?.team2_score >= 0)
    }

    function isMatchLive() {
        if (match?.date < new Date().getTime() && (match?.team1_score < 0 || match?.team2_score < 0)) return true

        return false
    }

    function getBetString(bet) {
        if (bet == 'w1') return "W1";
        if (bet == 'w2') return "W2";
        if (bet == 'x1') return "1X";
        if (bet == 'x2') return "2X";
        return '';
    }

    function onNavBeatBetOfficial() {
        navigation.navigate('BeatBetOfficial');
    }

    return <View style={{
        width: '100%',
        marginBottom: 20,
    }}>
        <View style={{
            // marginBottom: 8,
            flexDirection: 'row'
        }}>
            <Text style={{
                color: '#8E8E93',
                fontSize: 14,
                fontWeight: 'bold',
                marginBottom: 4
            }}>{strings.beat_bet}</Text>
        </View>

        <View style={{
            width: '100%',
        }}>
            <TouchableOpacity activeOpacity={.8} onPress={onNavBeatBetOfficial} style={{
                width: '100%',
                borderRadius: 12,
                minHeight: 60,

                flexDirection: 'row',

                overflow: 'hidden',
                // backgroundColor: Colors.gray800,
                backgroundColor: '#37003C',
                alignItems: 'center'
            }}>
                <Image src={`${SERVER_BASE_URL}/data/icons/beat_bet.png`} style={{
                    width: '100%',
                    height: '100%',
                    position: 'absolute'
                }}></Image>
                <View style={{
                    flexDirection: 'row',
                    paddingRight: 10,
                    height: '100%',
                    width: '100%',
                    paddingTop: 10,
                    paddingBottom: 10,
                    alignItems: 'center'
                }}>
                    <View style={{
                        width: 40,
                        height: 40,
                        marginLeft: 10,
                        alignItems: 'center',
                        justifyContent: 'center',
                        // borderWidth: 2,
                        borderRadius: 4,
                        backgroundColor: 'gold',
                        borderColor: 'gold'
                    }}>
                        <Text style={{
                            fontFamily: 'Roboto-ExtraBold',
                            color: 'black',
                            fontSize: 20
                        }}>AI</Text>
                    </View>

                    {/* <BBIcon width={32} height={32} style={{
                        marginLeft: 10
                    }} /> */}

                    <View style={{
                        marginLeft: 10,
                        flex: 1,
                        justifyContent: 'center',
                        // paddingRight: 10
                    }}>
                        <Text style={{
                            color: 'white',
                            fontSize: 15,
                            // lineHeight: 16,
                            fontFamily: 'Roboto-ExtraBold',
                            // fontWeight: 'bold'
                        }}>Beat Bet AI</Text>
                        {showPredict() ? <View style={{
                            flexDirection: 'row'
                        }}>
                            <Text style={{
                                color: '#AEAEB2',
                                fontSize: 15,
                                lineHeight: 20,
                                fontWeight: 'bold'
                            }}>{getAiTeamName()} {getAiType()}</Text>
                             <Text style={{
                                marginLeft: 2,
                                color: 'white',
                                fontSize: 15,
                                lineHeight: 20,
                                fontWeight: 'bold'
                            }}>{getBetString(beatBet.bet)} ({beatBet.odd})</Text>
                        </View> : <View style={{
                            flexDirection: 'row'
                        }}>
                            <Text style={{
                                color: '#AEAEB2',
                                fontSize: 13,
                                lineHeight: 20,
                                fontWeight: 'bold'
                            }}>{getError()}</Text>
                        </View>}
                    </View>

                    {beatBet.status > -1 || !showPredict() ? <View style={{
                        position: 'absolute',
                        right: 10,
                        top: 5
                    }}>
                        {showPredict() ? <FAIcon name={beatBet.status == 2 ? "times" : 'check'} size={18} color={beatBet.status == 2 ? '#FF4747' : '#00C566'} />
                            : <FAIcon name={'lock'} color={'white'} size={14} />}
                    </View> : null}
                </View>
            </TouchableOpacity>
        </View>
    </View>
}