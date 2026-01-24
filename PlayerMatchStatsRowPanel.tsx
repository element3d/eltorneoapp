import { Text, View } from "react-native";
import GamesIcon from './assets/games.svg';
import GoalsIcon from './assets/goals.svg';
import AssistIcon from './assets/assist.svg';
import Colors from "./Colors";

export default function PlayerMatchStatsRowPanel({player, isMatchStarted}) {
    function getMinGameStats() {
        if (isMatchStarted) return `${player.minutes} Min`;

        return player.games
    }

    return <View style={{
        flexDirection: 'row',
        marginTop: 1,
        // backgroundColor: 'red'
    }}>
        <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: 10
        }}>
            <GamesIcon width={20} height={20} />
            <Text style={{
                marginLeft: 4,
                fontFamily: 'Roboto-Bold',
                // fontFamily: 'Poppins-Bold',
                color: Colors.titleColor,
                fontSize: 16,

            }}>{getMinGameStats()}</Text>
        </View>
        {player.goals > 0 ? <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: 20
        }}>
            <GoalsIcon width={20} height={17} />
            <Text style={{
                marginLeft: 4,
                fontFamily: 'Roboto-Bold',
                // fontFamily: 'Poppins-Bold',
                color: Colors.titleColor,
                fontSize: 16,
            }}>{player.goals}</Text>
        </View> : null}

        {player?.assists > 0 ? <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: 20,
            height: 17
        }}>
            <AssistIcon width={26} height={28} style={{
                marginTop: 2
            }} />
            <Text style={{
                marginLeft: 4,
                fontFamily: 'Roboto-Bold',
                // fontFamily: 'Poppins-Bold',
                color: Colors.titleColor,
                fontSize: 16,
            }}>{player.assists}</Text>
        </View> : null}
    </View>
}