import { View, Text, TouchableOpacity } from "react-native";
import strings from "./Strings";
import GoalsIcon from './assets/goals.svg';
import GoalsAIcon from './assets/goals_a.svg';
import AssistIcon from './assets/assist.svg';
import CleanSheetIcon from './assets/clean.svg';
import Colors from "./Colors";

function AwardsPanelCareer({ onReadMore, season, showLeague = true, overlay = false, league = 1 }) {

    function getLeagueName() {
        if (league == 1) return strings.legend
        if (league == 2) return strings.pro
        if (league == 3) return strings.amateur
        if (league == 4) return strings.beginner
    }

    return (
        <View style={{
            width: '100%',
            height: '100%',
            backgroundColor: overlay ? '#000000aa' : 'transparent',
            paddingLeft: 30,
            alignItems: 'flex-start',
            justifyContent: 'center'
        }}>
            {showLeague ? <Text style={{
                fontFamily: 'Roboto-Bold',
                color: 'white',
                fontSize: 26,
                // marginBottom: 4,
            }}>{getLeagueName()}</Text> : null}
            <Text style={{
                fontFamily: 'Roboto-Bold',
                color: '#ffffffaa',
                fontSize: 12,
                // marginBottom: 4,
            }}>{strings.season} 20{season}</Text>

            {/* <Text style={{
                fontFamily: 'Roboto-Bold',
                color: 'white',
                marginTop: 10,
                // marginBottom: 8,
                fontSize: 18
            }}>{strings.rules}</Text> */}

            <View style={{
                marginTop: 10,
                flexDirection: 'row'
            }}>
                <View style={{
                    width: 24,
                    marginRight: 10,
                    // backgroundColor: 'blue',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <GoalsIcon width={24} height={24}/>
                </View>
                <View style={{
                    width: 36,
                    // backgroundColor: 'red',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <AssistIcon width={38} height={38}/>
                </View>
                <View style={{
                    width: 50,
                    marginRight: 4,
                    // backgroundColor: 'red',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <CleanSheetIcon width={38} height={38}/>
                </View>
                <View style={{
                    width: 26,
                    flexDirection: 'row',
                    // backgroundColor: 'red',
                    justifyContent: 'flex-start',
                    alignItems: 'center'
                }}>
                    <View style={{
                        width: 20,
                        height: 26,
                        borderRadius: 2,
                        backgroundColor: 'gold'
                    }}></View>
                    <View style={{
                        width: 20,
                        height: 26,
                        borderRadius: 2,
                        position: 'absolute',
                        right: 3,
                        bottom: 8,
                        backgroundColor: Colors.fail
                    }}></View>
                </View>
                {/* <View style={{
                    width: 30,
                    marginRight: 10,
                    // backgroundColor: 'red',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <View style={{
                        width: 20,
                        height: 26,
                        borderRadius: 4,
                        backgroundColor: Colors.fail
                    }}></View>
                </View> */}
            </View>
            {/* <TouchableOpacity activeOpacity={.8} onPress={onReadMore} style={{
                height: 24,
                marginTop: 10,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#FF2882',
                borderRadius: 15,
                paddingHorizontal: 20,
            }}>
                <Text style={{
                    fontFamily: 'Roboto-Bold',
                    fontSize: 14,
                    lineHeight: 18,
                    color: 'white'
                }}>{strings.learn_more}</Text>
            </TouchableOpacity> */}
        </View>
    )
}

export default AwardsPanelCareer