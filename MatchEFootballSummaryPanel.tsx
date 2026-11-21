import { ActivityIndicator, Image, Text, TouchableOpacity, View } from "react-native";
import strings from "./Strings";
import Icon from 'react-native-vector-icons/MaterialIcons';
import Colors from "./Colors";
import dataManager from "./DataManager";
import KitImage from "./KitImage";
import { EGAME_CAREER, EGAME_ELTORNEO } from "./GamepadMenu";

export default function MatchEFootballSummaryPanel({ match, predicts, onUnlock, blockForAd, adLoaded }) {
    function getPredictPercent(numPredicts) {
        const totalNumPredicts = predicts.numTeam1 + predicts.numTeam2;
        const percent = numPredicts / totalNumPredicts * 100
        if (percent <= 0) return ""
        return ` (${Number.parseInt(percent)}%)`
    }

    function getPredictPercent2(numPredicts) {
        const totalNumPredicts = predicts.numTeam1 + predicts.numTeam2;

        const percent = numPredicts / totalNumPredicts * 100
        if (percent <= 0) return ""
        return `${Number.parseInt(percent)}%`
    }

    function getLeftColor() {
        // if (Colors.mode == 3 && match.league == 6) {
        //     return '#2D73F3';
        // }
        return Colors.mode == 1 ? '#37003C' : 'white';
    }

    function getRightColor() {
        if (Colors.mode == 3 && match.league == 6) {
            return '#FF7FDE';
        }
        if (Colors.mode == 3 && match.league == 5) {
            return '#C32B33';
        }
        if (Colors.mode == 3 && match.league == 3) {
            return '#A66FFE';
        }
        if (Colors.mode == 3 && match.league == 2) {
            return '#05F0FF';
        }
        if (Colors.mode == 3 && match.league == 1) {
            return '#FF51A2';
        }
         if (Colors.mode == 3 && match.league == 14) {
            return "#FF6900"
        }

        return Colors.primary
    }

    const game = dataManager.getSettings().game;

    return (
        <View>
            <Text style={{
                color: '#8E8E93',
                fontSize: 14,
                fontFamily: 'Roboto-Bold',
                marginBottom: 4
            }}>{strings.summary} ({predicts?.numPredicts} {strings.predictions})</Text>
            <View style={{
                width: '100%',
                backgroundColor: Colors.gray800,
                borderRadius: 12,
                // paddingLeft: 10,
                // paddingRight: 10,
                marginBottom: 20,
            }}>
                <View style={{
                    marginTop: blockForAd ? 5 : 0,
                    height: blockForAd ? 80 : 80,
                    // backgroundColor: 'red',
                    flexDirection: 'row'
                }}>
                    <View style={{
                        //   flex: 1,
                        marginHorizontal: 10,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <KitImage width={42} height={48} match={match} team={match.team1} />
                    </View>

                    <View style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <View>
                            <Text style={{
                                marginBottom: 4,
                                color: '#8E8E93',
                                fontFamily: 'Roboto-Bold'
                            }}>{strings.chanses_to_win}</Text>
                        </View>
                        <View style={{
                            width: '100%',
                            marginTop: 4,
                            // backgroundColor: 'red',
                            height: 10,
                            alignItems: 'center',
                            flexDirection: 'row'
                        }}>
                            <View style={{
                                width: !blockForAd ? `${getPredictPercent2(predicts?.numTeam1)}` : '50%',
                                height: 10,
                                borderTopLeftRadius: 5,
                                borderBottomLeftRadius: 5,
                                minWidth: 10,
                                // flex: 1,
                                marginRight: 2,
                                flexShrink: 1,
                                backgroundColor: getLeftColor()
                            }}></View>
                            <View style={{
                                width: !blockForAd ? `${getPredictPercent2(predicts?.numTeam2)}` : '50%',
                                height: 10,
                                minWidth: 10,
                                borderTopRightRadius: 5,
                                borderBottomRightRadius: 5,
                                flexShrink: 1,
                                backgroundColor: getRightColor()
                            }}></View>
                        </View>
                        <View style={{
                            width: '100%',
                            marginTop: 4,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}>

                            {!blockForAd ? <Text style={{
                                fontSize: 12,
                                // flex: 1,
                                width: 60,
                                color: Colors.titleColor,
                                fontFamily: 'Roboto-Bold'
                            }}>
                                {predicts?.numTeam1}{getPredictPercent(predicts?.numTeam1)}
                            </Text> : <Icon color={Colors.titleColor} size={16} name='lock' />}
                           
                            {!blockForAd ? <Text style={{
                                textAlign: 'right',
                                width: 60,
                                fontSize: 12,
                                color: Colors.titleColor,
                                fontFamily: 'Roboto-Bold'
                            }}>
                                {predicts?.numTeam2}{getPredictPercent(predicts?.numTeam2)}
                            </Text> : <Icon color={Colors.titleColor} size={16} name='lock' />}
                        </View>
                    </View>

                    <View style={{
                        //   flex: 1,
                        marginLeft: 10,
                        marginRight: 10,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <KitImage width={42} height={48} match={match} team={match.team2} />
                    </View>
                </View>

                {blockForAd ? <View style={{
                    height: 40,
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    // backgroundColor: 'red'
                }}>
                    <TouchableOpacity onPress={onUnlock} disabled={!adLoaded} activeOpacity={.8} style={{
                        paddingLeft: 20,
                        paddingRight: 20,
                        height: 24,
                        opacity: adLoaded ? 1 : .8,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 12,
                        backgroundColor: '#FF2882'
                    }} >
                        <Text style={{
                            color: 'white',
                            fontFamily: 'Roboto-Bold',
                            fontSize: 12,
                        }}>{strings.unlock_all}</Text>
                        {adLoaded ? <Icon name='play-circle-filled' size={18} color='white' style={{
                            marginLeft: 4
                        }} /> : <ActivityIndicator size={'small'} color={'white'} style={{
                            marginLeft: 6
                        }} />}
                    </TouchableOpacity>
                </View> : null}
            </View>
        </View>
    )
}