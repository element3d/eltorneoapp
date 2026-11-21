import { View, Text, TouchableOpacity, Image } from "react-native";
import strings from "./Strings";
import Icon from 'react-native-vector-icons/FontAwesome5';
import Colors from "./Colors";
import SERVER_BASE_URL from "./AppConfig";
import ProfileIcon from './assets/Profile2.svg';
import { ENEW_LEAGUE_AMATEUR, ENEW_LEAGUE_BEGINNER, ENEW_LEAGUE_LEGEND, ENEW_LEAGUE_PRO } from "./Enums";
import dataManager from "./DataManager";
import { EGAME_BEATBET, EGAME_EFOOTBALL, EGAME_ELTORNEO, EGAME_FIREBALL, EGAME_WORLD_CUP } from "./GamepadMenu";

function WinnerPanel({ winner, season, showLeague = true, overlay = false, league = 1 }) {

    function getPoints() {
        const game = dataManager.getSettings().game;
        if (game == EGAME_ELTORNEO) return winner.predictions
        if (game == EGAME_EFOOTBALL) return winner.eFootballPoints
        if (game == EGAME_FIREBALL) return winner.fireballPoints
        if (game == EGAME_BEATBET) return Math.ceil(winner.balance) + '$'
    }

    function getLeagueName() {
        const game = dataManager.getSettings().game;
        if (game == EGAME_FIREBALL) return 'Fireball';
        if (game == EGAME_BEATBET) return "Beat Bet";
        if (game == EGAME_WORLD_CUP) return "World Cup";
        
        if (season == '26/27') {
            if (league == ENEW_LEAGUE_LEGEND) return strings.legend
            if (league == ENEW_LEAGUE_PRO) return strings.pro
            if (league == ENEW_LEAGUE_AMATEUR) return strings.amateur
            if (league == ENEW_LEAGUE_BEGINNER) return strings.beginner
            return '';
        }

        if (league == 1) return strings.legend
        if (league == 2) return strings.pro
        if (league == 3) return strings.amateur
        if (league == 4) return strings.beginner
    }

    return (
        <View style={{
            // marginTop: 10,

            width: '100%',
            height: '100%',
            backgroundColor: overlay ? '#000000aa' : 'transparent',
            paddingLeft: 20,
            // alignItems: 'center',
            justifyContent: 'center'
        }}>
            {showLeague && winner ? <Text style={{
                fontFamily: 'Roboto-Bold',
                color: 'white',
                fontSize: 18,
                lineHeight: 22,
                marginBottom: 4,
            }}>{getLeagueName()}</Text> : null}
           {winner ?  <Text style={{
                fontFamily: 'Roboto-Bold',
                color: '#ffffffaa',
                fontSize: 14,
                marginTop: -5,
                marginBottom: 4,
            }}>{strings.season} 20{season}</Text> : null }

            {winner ? <View style={{
                flexDirection: 'row',
                marginTop: 10,
                width: '100%',
                // paddingLeft: 20,
                // backgroundColor: 'red'
            }}>
                <View style={{
                    width: 40,
                    height: 40,
                    borderColor: Colors.borderColor,
                    borderWidth: 2,
                    backgroundColor: Colors.bgColor,
                    borderRadius: 80,
                    overflow: 'hidden',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 10,
                }}>
                    {winner.avatar?.length ? <Image style={{
                        width: 40,
                        height: 40,
                        objectFit: 'cover'
                    }} src={`${SERVER_BASE_URL}/${winner.avatar}`} /> : <ProfileIcon width={30} height={30} style={{ marginTop: 10 }} />}
                </View>
                <View>
                    <Text style={{
                        fontFamily: 'Roboto-Bold',
                        color: 'white',
                        // marginTop: 10,
                        // marginBottom: 4,
                        fontSize: 18
                    }}>{winner.name.trim()}</Text>
                    <View style={{
                        flexDirection: 'row'
                    }}>
                    <Text style={{
                        fontFamily: 'Roboto-Bold',
                        color: '#ffffffaa',
                        // marginTop: 10,
                        // marginBottom: 4,
                        fontSize: 11
                    }}>{strings.predictions2}: {winner.totalPredictions}, </Text>
                    <Text style={{
                        fontFamily: 'Roboto-Bold',
                        color: '#ffffffaa',
                        // marginTop: 10,
                        // marginBottom: 4,
                        fontSize: 11
                    }}>{dataManager.getSettings().game == EGAME_BEATBET ? strings.balance : strings.points}: {getPoints()}</Text>
                    </View>
                </View>
            </View>
                : null}


        </View>
    )
}

export default WinnerPanel