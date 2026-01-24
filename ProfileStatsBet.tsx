import { Text, View } from "react-native";
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
        padding: 20,
        backgroundColor: Colors.gray800
    }}>
        {/* <BBIcon width={24} height={24} style={{
            position: 'absolute',
            right: 10,
            top: 10
        }}/> */}
        <View style={{
            flexDirection: 'row'
        }}>
            <Text style={{
                color: Colors.titleColor,
                fontFamily: 'Roboto-Bold',
                fontSize: 16,
                marginBottom: 10
            }}>{strings.statistics}</Text>
            {/* <Text style={{
                color: '#8E8E93',
                fontFamily: 'Roboto-Bold',
                fontSize: 16,
                marginBottom: 10
            }}> ({predictsJson.totalBets} {strings.bets2})</Text> */}
        </View>

        <View style={{
            flexDirection: 'row'
        }}>
            <Text style={{
                color: '#8E8E93'
            }}>{strings.total_bets}: </Text><Text style={{
                color: Colors.titleColor,
                fontFamily: 'Roboto-Bold'
            }}>
                {predictsJson.totalBets}
            </Text>
        </View>

        <View style={{
            flexDirection: 'row'
        }}>
            <Text style={{
                color: '#8E8E93'
            }}>{strings.winning_bets}: </Text><Text style={{
                color: Colors.titleColor,
                fontFamily: 'Roboto-Bold'
            }}>
                {predictsJson.totalWinBets} {predictsJson.totalBets > 0 ? `(${Number.parseInt(predictsJson.totalWinBets / predictsJson.totalBets * 100)}%)` : null}
            </Text>
        </View>

        <View style={{
            flexDirection: 'row'
        }}>
            <Text style={{
                color: '#8E8E93'
            }}>{strings.losing_bets}: </Text><Text style={{
                color: Colors.titleColor,
                fontFamily: 'Roboto-Bold'
            }}>
                {predictsJson.totalLooseBets} {predictsJson.totalBets > 0 ? `(${Number.parseInt(predictsJson.totalLooseBets / predictsJson.totalBets * 100)}%)` : null}
            </Text>
        </View>
        {/* <View style={{
            marginTop: 10,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
        }}>
            <View style={{
                flexDirection: 'row'
            }}>
                <FAIcon name={'check'} size={18} color={'#00C566'} />
                <Text style={{
                    marginLeft: 6,
                    color: Colors.titleColor,
                    fontFamily: 'Roboto-Bold'
                }}>{predictsJson.totalWinBets} {predictsJson.totalBets > 0 ? `(${Number.parseInt(predictsJson.totalWinBets / predictsJson.totalBets * 100)}%)` : null}</Text>
            </View>
            <View style={{
                flexDirection: 'row'
            }}>
                <Text style={{
                    marginRight: 6,
                    color: Colors.titleColor,
                    fontFamily: 'Roboto-Bold'
                }}>{predictsJson.totalLooseBets} {predictsJson.totalBets > 0 ? `(${Number.parseInt(predictsJson.totalLooseBets / predictsJson.totalBets * 100)}%)` : null}</Text>
                <FAIcon name={'times'} size={18} color={Colors.fail} />
            </View>
        </View> */}
        {/* <View style={{
            marginTop: 5,
            flex: 1,
            width: '100%',
            flexDirection: 'row'
        }}>
            <View style={{
                flexShrink: 1,
                minWidth: 20,
                width: getWinPercent(),
                height: 10,
                borderTopLeftRadius: 5,
                borderBottomLeftRadius: 5,
                backgroundColor: Colors.primary
            }}></View>
            <View style={{
                minWidth: 20,
                flexShrink: 1,
                width: getLoosePercent(),
                height: 10,
                borderTopRightRadius: 5,
                borderBottomRightRadius: 5,
                marginLeft: 5,
                backgroundColor: '#8E8E93'
            }}></View>
        </View> */}
    </View>
}