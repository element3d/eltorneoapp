import { Text, View } from "react-native";
import GamesIcon from './assets/games.svg';
import GoalsIcon from './assets/goals.svg';
import AssistIcon from './assets/assist.svg';
import Colors from "./Colors";

export default function PlayerStatsRowPanel({stat}) {
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

            }}>{stat ? stat.games : 0}</Text>
        </View>
        {stat?.goals > 0 ? <View style={{
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
            }}>{stat ? stat.goals : 0}</Text>
        </View> : null}

        {stat?.assists > 0 ? <View style={{
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
            }}>{stat ? stat.assists : 0}</Text>
        </View> : null}
    </View>
}