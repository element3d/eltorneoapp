import { Image, Text, View } from "react-native";
import strings from "./Strings";
import Colors from "./Colors";

export default function ProfileStatsFireball({ predictsJson }) {
    return <View style={{
        // marginTop: 20,
        width: '90%',
        alignSelf: 'center',
        // height: 200,
        borderRadius: 12,
        overflow: 'hidden',
        backgroundColor: Colors.gray800
    }}>
        <Image source={require('./assets/Fireball_banner.png')} style={{
            width: '100%',
            position: 'absolute',
            height: '100%'
        }} />
        <View style={{
            padding: 20,
            paddingTop: 25,
            paddingBottom: 25
        }}>
            <Text style={{
                color: 'white',
                fontFamily: 'Roboto-Bold',
                fontSize: 20,
                marginBottom: 10
            }}>{strings.statistics}</Text>

            <View style={{
                flexDirection: 'row'
            }}>
                <Text style={{
                    fontFamily: 'Roboto-Bold',
                    color: '#8E8E93'
                }}>{strings.total_short}: </Text><Text style={{
                    color: 'white',
                    fontFamily: 'Roboto-Bold'
                }}>
                    {/* {stats.total_predictions} */}
                    {predictsJson.totalPredicts}
                </Text>
            </View>

            <View style={{
                flexDirection: 'row'
            }}>
                <Text style={{
                    fontFamily: 'Roboto-Bold',
                    color: '#8E8E93'
                }}>{strings.prediction_was_succ}: </Text><Text style={{
                    color: 'white',
                    fontFamily: 'Roboto-Bold'
                }}>
                    {predictsJson.totalWinPredicts} {predictsJson.totalPredicts > 0 ? `(${Number.parseInt(predictsJson.totalWinPredicts / predictsJson.totalPredicts * 100)}%)` : null}
                </Text>
            </View>

            <View style={{
                flexDirection: 'row'
            }}>
                <Text style={{
                    fontFamily: 'Roboto-Bold',
                    color: '#8E8E93'
                }}>{strings.prediction_was_failed}: </Text><Text style={{
                    color: 'white',
                    fontFamily: 'Roboto-Bold'
                }}>
                    {predictsJson.totalLoosePredicts} {predictsJson.totalPredicts > 0 ? `(${Number.parseInt(predictsJson.totalLoosePredicts / predictsJson.totalPredicts * 100)}%)` : null}
                </Text>
            </View>
        </View>
    </View>
}