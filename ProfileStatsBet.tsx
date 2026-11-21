import { Image, Text, View } from "react-native";
import strings from "./Strings";
import Colors from "./Colors";
import FAIcon from 'react-native-vector-icons/FontAwesome5';
import BBIcon from './assets/bbicon.svg'

export default function ProfileStatsBet({ predictsJson }) {
    function getWinPercent() {
        return `${Number.parseInt(predictsJson.totalWinBets / predictsJson.totalBets * 100)}%`
    }

    function getLoosePercent() {
        return `${Number.parseInt(predictsJson.totalLooseBets / predictsJson.totalBets * 100)}%`
    }

    return <View style={{
        // marginTop: 20,
        width: '90%',
        alignSelf: 'center',
        // height: 200,
        borderRadius: 12,
        overflow: 'hidden',
        backgroundColor: Colors.gray800
    }}>
        <Image source={require('./assets/bb.png')} style={{
            width: '100%',
            position: 'absolute',
            height: '100%'
        }} />
        <View style={{
            padding: 20,
            paddingTop: 25,
            paddingBottom: 30,
        }}>
            <View style={{
                flexDirection: 'row'
            }}>
                <Text style={{
                    color: 'white',
                fontFamily: 'Roboto-Bold',
                fontSize: 20,
                marginBottom: 10
                }}>{strings.statistics}</Text>
            </View>

            <View style={{
                flexDirection: 'row'
            }}>
                <Text style={{
                    fontFamily: 'Roboto-Bold',
                    color: '#8E8E93'
                }}>{strings.total_bets}: </Text><Text style={{
                    color: 'white',
                    fontFamily: 'Roboto-Bold'
                }}>
                    {predictsJson.totalBets}
                </Text>
            </View>

            <View style={{
                flexDirection: 'row'
            }}>
                <Text style={{
                    fontFamily: 'Roboto-Bold',
                    color: '#8E8E93'
                }}>{strings.winning_bets}: </Text><Text style={{
                    color: 'white',
                    fontFamily: 'Roboto-Bold'
                }}>
                    {predictsJson.totalWinBets} {predictsJson.totalBets > 0 ? `(${Number.parseInt(predictsJson.totalWinBets / predictsJson.totalBets * 100)}%)` : null}
                </Text>
            </View>

            <View style={{
                flexDirection: 'row'
            }}>
                <Text style={{
                    fontFamily: 'Roboto-Bold',
                    color: '#8E8E93'
                }}>{strings.losing_bets}: </Text><Text style={{
                    color: 'white',
                    fontFamily: 'Roboto-Bold'
                }}>
                    {predictsJson.totalLooseBets} {predictsJson.totalBets > 0 ? `(${Number.parseInt(predictsJson.totalLooseBets / predictsJson.totalBets * 100)}%)` : null}
                </Text>
            </View>
        </View>
    </View>
}