import { Text, View } from "react-native";
import Colors from "./Colors";
import GamepadIcon from './assets/gamepad_black.svg'
import GamepadWhiteIcon from './assets/gamepad_white.svg'
import ScoreIcon from './assets/score.svg'
import SuccessIcon from './assets/success.svg'
import FailIcon from './assets/fail.svg'

export default function ProfileStatsElTorneo({predictsJson}) {
    return <View style={{
        paddingHorizontal: 16,
        marginBottom: 10,
        marginTop: -10,
        flex: 1,
        width: '100%',
        flexDirection: 'row'
    }}>
        <View style={{
            flex: 1,
            borderRadius: 12,
            height: 80,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 8,
            backgroundColor: Colors.gray800
        }}>
            <GamepadIcon width={35} height={35}/>
            <Text style={{
                color: Colors.titleColor,
                fontFamily: 'Roboto-ExtraBold',
                fontSize: 26,
                marginTop: -6
            }}>
                {predictsJson.totalPredicts}
            </Text>
        </View>
        <View style={{
            flex: 1,
            borderRadius: 12,
            height: 80,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 8,
            backgroundColor: Colors.gray800
        }}>
            <ScoreIcon width={35} height={35}/>
            <Text style={{
                color: Colors.titleColor,
                fontFamily: 'Roboto-ExtraBold',
                fontSize: 26,
                marginTop: -6
            }}>
                {`${Number.parseInt(predictsJson.totalScorePredicts / predictsJson.totalPredicts * 100)}%`}
            </Text>
        </View>
        <View style={{
            flex: 1,
            borderRadius: 12,
            height: 80,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 8,
            backgroundColor: Colors.gray800
        }}>
            <SuccessIcon width={50} height={50}/>
        </View>
        <View style={{
            flex: 1,
            borderRadius: 12,
            height: 80,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 8,
            backgroundColor: Colors.gray800
        }}>
            <FailIcon width={50} height={50}/>
        </View>
    </View>
}