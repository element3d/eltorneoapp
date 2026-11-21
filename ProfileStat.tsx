import { Image, Text, View } from "react-native";
import strings from "./Strings";
import Colors from "./Colors";
import dataManager from "./DataManager";
import { EGAME_WORLD_CUP } from "./GamepadMenu";

const EL_TORNEO_IMAGE = require('./assets/throphy.png')
const WORLD_CUP_IMAGE = require('./assets/world_cup_banner.png')

export default function ProfileStats({ predictsJson }) {
    return <View style={{
        // marginTop: 20,
        width: '90%',
        alignSelf: 'center',
        // height: 200,
        borderRadius: 12,
        // padding: 20,
        overflow: 'hidden',
        backgroundColor: Colors.gray800
    }}>
        <Image  source={dataManager.getSettings().game == EGAME_WORLD_CUP ? WORLD_CUP_IMAGE : EL_TORNEO_IMAGE} style={{
            width: '100%',
            position: 'absolute',
            height: '100%',
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
                }}>{strings.total_short}: </Text><Text style={{
                    color: 'white',
                    fontFamily: 'Roboto-Bold',
                }}>
                    {/* {stats.total_predictions} */}
                    {predictsJson.totalPredicts}
                </Text>
            </View>

            <View style={{
                flexDirection: 'row'
            }}>
                <Text style={{
                    fontWeight: 'bold',
                    color: '#8E8E93'
                }}>{strings.score_predicted}: </Text><Text style={{
                    color: 'white',
                    fontFamily: 'Roboto-Bold',
                }}>
                    {predictsJson.totalScorePredicts} {predictsJson.totalPredicts > 0 ? `(${Number.parseInt(predictsJson.totalScorePredicts / predictsJson.totalPredicts * 100)}%)` : null}
                </Text>
            </View>

            <View style={{
                flexDirection: 'row'
            }}>
                <Text style={{
                    fontWeight: 'bold',
                    color: '#8E8E93'
                }}>{strings.winner_or_draw_predicted}: </Text><Text style={{
                    color: 'white',
                    fontFamily: 'Roboto-Bold',
                }}>
                    {predictsJson.totalWinnerPredicts} {predictsJson.totalPredicts > 0 ? `(${Number.parseInt(predictsJson.totalWinnerPredicts / predictsJson.totalPredicts * 100)}%)` : null}
                </Text>
            </View>

            <View style={{
                flexDirection: 'row'
            }}>
                <Text style={{
                    fontWeight: 'bold',
                    color: '#8E8E93'
                }}>{strings.prediction_was_failed}: </Text><Text style={{
                    color: 'white',
                    fontFamily: 'Roboto-Bold',
                }}>
                    {predictsJson.totalFailPredicts} {predictsJson.totalPredicts > 0 ? `(${Number.parseInt(predictsJson.totalFailPredicts / predictsJson.totalPredicts * 100)}%)` : null}
                </Text>
            </View>
        </View>
    </View>
}