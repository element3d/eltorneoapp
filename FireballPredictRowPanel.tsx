import { Image, Text, TouchableOpacity, View } from "react-native";
import Colors from "./Colors";
import Icon from 'react-native-vector-icons/MaterialIcons';
import PlayerStatsRowPanel from "./PlayerStatsRowPanel";
import PlayerMatchStatsRowPanel from "./PlayerMatchStatsRowPanel";
import FireballPredictPointsPanel from "./FireballPredictPointsPanel";
import matchManager from "./MatchManager";

export default function FireballPredictRowPanel({ match, players, fireballPredict, onDeleteFireballPredict, isLineups = false }) {
    const player = getPLayer();
    if (!player) return;

    function getPlayerStats(player1) {
        const stats = player1.stats
        return stats.find(s => s.leagueId === match.league) || null
    }

    function getTeam() {
        if (fireballPredict.team_id == match.team1.id) return match.team1.shortName;
        return match.team2.shortName;
    }

    function getPLayer() {
        if (isLineups) {
            if (fireballPredict.team_id == match.team1.id)
                return players.team1.players.find(p => p.apiId === fireballPredict.player_api_id) || null

            return players.team2.players.find(p => p.apiId === fireballPredict.player_api_id) || null
        }

        if (fireballPredict.team_id == match.team1.id)
            return players.team1Players.find(p => p.apiId === fireballPredict.player_api_id) || null

        return players.team2Players.find(p => p.apiId === fireballPredict.player_api_id) || null
    }

    function formatPlayerName(name) {
        if (name.length <= 22) return name;
        return name.substring(0, 22).trim() + '...'
    }

    function isMatchStarted() {
        const now = Date.now();
        const matchTime = match.date;

        return now >= matchTime;
    }

    return <View style={{
        width: '100%',
        // height: 200,
        padding: 10,
        marginBottom: 20,
        borderRadius: 12,
        flexDirection: 'row',
        overflow: 'hidden',
        backgroundColor: Colors.gray800
    }}>
        <View style={{
            aspectRatio: 1,   // keeps it square
            width: '100%',
            overflow: 'hidden',
            maxWidth: 62,    // optional limit so they don’t get huge on tablets
            borderRadius: 8,
        }}>
            <Image source={require('./assets/Fireball.png')} style={{
                width: '100%',
                height: '100%',
            }} />
        </View>
        <View style={{
            justifyContent: 'center',
            overflow: 'hidden'
        }}>
            <Text style={{
                fontFamily: 'Roboto-Bold',
                fontSize: 18,
                marginLeft: 10,
                color: Colors.titleColor
            }}>Fireball</Text>
            <Text numberOfLines={1} style={{
                fontFamily: 'Roboto-Bold',
                fontSize: 14,
                // flexShrink: 1,
                flex: 1,
                marginLeft: 10,
                // maxWidth: '100%',
                // marginTop: 2,
                color: Colors.chipText,
            }}>{formatPlayerName(fireballPredict.player_name)}, {getTeam()}</Text>
            {isLineups ? <PlayerMatchStatsRowPanel player={player} isMatchStarted={isMatchStarted()} /> : <PlayerStatsRowPanel stat={getPlayerStats(player)} />}
        </View>
        {matchManager.isMatchEnded(match) || matchManager.isMatchLive(match) ?
            <View style={{
                position: 'absolute',
                // top: 5,
                right: 5,
            }}>
                <FireballPredictPointsPanel match={match} predict={fireballPredict} />
            </View>
            : <TouchableOpacity activeOpacity={.6} onPress={onDeleteFireballPredict} style={{
                position: 'absolute',
                width: 24,
                height: 24,
                top: 5,
                right: 5,
                borderRadius: 20,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: Colors.fail
            }}>
                <Icon name="close" size={18} color={'white'} />
            </TouchableOpacity>}
    </View>
}