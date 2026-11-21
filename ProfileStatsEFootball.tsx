import { Image, Text, View } from "react-native";
import strings from "./Strings";
import Colors from "./Colors";

export default function ProfileStatsEFootball({ predictsJson }) {
    return <View style={{
        // marginTop: 20,
        width: '90%',
        alignSelf: 'center',
        // height: 200,
        borderRadius: 12,
        overflow: 'hidden',
        backgroundColor: Colors.gray800
    }}>
        <Image source={require('./assets/eFootball_banner.png')} style={{
            width: '100%',
            position: 'absolute',
            height: '100%'
        }} />
        <View style={{
            padding: 20,
            paddingTop: 15,
        }}>
            <Text style={{
                color: 'white',
                fontFamily: 'Roboto-Bold',
                fontSize: 20,
                marginBottom: 5
            }}>{strings.statistics}</Text>

            <View style={{
                flexDirection: 'row'
            }}>
                <Text style={{
                    fontWeight: 'bold',
                    color: '#8E8E93'
                }}>{strings.total_count_of_matches}: </Text><Text style={{
                    color: 'white',
                    marginLeft: 4,
                    fontFamily: 'Roboto-Bold'
                }}>
                    {predictsJson.totalPredicts}
                </Text>
            </View>

            <View style={{
                flexDirection: 'row'
            }}>
                <Text style={{
                    fontWeight: 'bold',
                    color: '#8E8E93'
                }}>{strings.total_wins}: </Text><Text style={{
                    color: 'white',
                    marginLeft: 4,
                    fontFamily: 'Roboto-Bold'
                }}>
                    {predictsJson.totalWinPredicts} {predictsJson.totalPredicts > 0 ? `(${Number.parseInt(predictsJson.totalWinPredicts / predictsJson.totalPredicts * 100)}%)` : null}
                </Text>
            </View>
            <View style={{
                flexDirection: 'row'
            }}>
                <Text style={{
                    fontWeight: 'bold',
                    color: '#8E8E93'
                }}>{strings.total_draws}: </Text><Text style={{
                    color: 'white',
                    marginLeft: 4,
                    fontFamily: 'Roboto-Bold'
                }}>
                    {predictsJson.totalDrawPredicts} {predictsJson.totalPredicts > 0 ? `(${Number.parseInt(predictsJson.totalDrawPredicts / predictsJson.totalPredicts * 100)}%)` : null}
                </Text>
            </View>

            <View style={{
                flexDirection: 'row'
            }}>
                <Text style={{
                    fontWeight: 'bold',
                    color: '#8E8E93'
                }}>{strings.total_losses}: </Text><Text style={{
                    color: 'white',
                    marginLeft: 4,
                    fontFamily: 'Roboto-Bold'
                }}>
                    {predictsJson.totalLoosePredicts} {predictsJson.totalPredicts > 0 ? `(${Number.parseInt(predictsJson.totalLoosePredicts / predictsJson.totalPredicts * 100)}%)` : null}
                </Text>
            </View>
        </View>
    </View>
}