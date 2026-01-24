import { View, Text, TouchableOpacity } from "react-native";
import strings from "./Strings";
import Icon from 'react-native-vector-icons/FontAwesome5';
import Colors from "./Colors";

function AwardsPanel({ onReadMore, season, showLeague = true, overlay = false, league = 1 }) {

    function getLeagueName() {
        if (league == 1) return strings.legend
        if (league == 2) return strings.pro
        if (league == 3) return strings.amateur
        if (league == 4) return strings.beginner
    }

    const itemSize = 28;
    const itemFontSize = 13;

    return (
        <View style={{
            width: '100%',
            height: '100%',
            paddingLeft: 30,
            backgroundColor: overlay ? '#000000aa' : 'transparent',
            alignItems: 'flex-start',
            justifyContent: 'center'
        }}>
            {showLeague ? <Text style={{
                fontFamily: 'Roboto-Bold',
                color: 'white',
                fontSize: 26,
                // lineHeight: 22,
                marginBottom: 4,
            }}>{getLeagueName()}</Text> : null}
            <Text style={{
                fontFamily: 'Roboto-Bold',
                color: '#ffffffaa',
                fontSize: 12,
                marginTop: -5,
                // lineHeight: 16,
                marginBottom: 4,
            }}>{strings.season} 20{season}</Text>

            {/* <Text style={{
                fontFamily: 'Roboto-Bold',
                color: 'white',
                marginTop: 10,
                marginBottom: 8,
                fontSize: 18
            }}>{strings.rules}</Text> */}

            <View style={{
                marginTop: 10,
                flexDirection: 'row'
            }}>
                <View style={{
                    width: itemSize,
                    //  marginLeft: 20,
                     marginRight: 10,
                    alignItems: 'center'
                }}>
                    <View style={{
                        width: itemSize,
                        height: itemSize,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 20,
                        backgroundColor: '#FACC15'
                    }}>
                        <Text style={{
                            fontSize: itemFontSize,
                            lineHeight: 22,
                            fontFamily: "Poppins-Bold",
                            color: 'black'
                        }}>+3</Text>
                    </View>

                </View>

                <View style={{
                    width: itemSize,
                    // marginLeft: 20,
                    marginRight: 10,
                    alignItems: 'center'
                }}>
                    <View style={{
                        width: itemSize,
                        height: itemSize,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 20,
                        borderWidth: 1,
                        borderColor: '#00C566',
                        backgroundColor: '#34C75955'
                    }}>
                        <Text style={{
                            fontSize: itemFontSize,
                            lineHeight: 20,
                            fontFamily: "Poppins-Bold",
                            color: '#00C566'
                        }}>+2</Text>
                    </View>

                </View>

                <View style={{
                    width: itemSize,
                    // marginLeft: 20,
                    marginRight: 10,
                    alignItems: 'center'
                }}>
                    <View style={{
                        width: itemSize,
                        height: itemSize,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 20,
                        borderWidth: 1,
                        borderColor: '#00C566',
                        backgroundColor: '#34C75955'
                    }}>
                        <Text style={{
                            fontSize: itemFontSize,
                            lineHeight: 22,
                            fontFamily: "Poppins-Bold",
                            color: '#00C566'
                        }}>+1</Text>
                    </View>

                </View>

                <View style={{
                    width: itemSize,
                    //  marginLeft: 20,
                    //  marginRight: 20,
                    alignItems: 'center'
                }}>
                    <View style={{
                        width: itemSize,
                        height: itemSize,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 20,
                        borderWidth: 1,
                        borderColor: '#FF4747',
                        backgroundColor: '#FF474755'
                    }}>
                        <Text style={{
                            fontSize: itemFontSize,
                            lineHeight: 22,
                            fontFamily: "Poppins-Bold",
                            color: '#FF4747'
                        }}>-1</Text>
                    </View>
                </View>
            </View>
            {/* <TouchableOpacity activeOpacity={.8} onPress={onReadMore} style={{
                height: 20,
                marginTop: 8,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#FF2882',
                borderRadius: 15,
                paddingHorizontal: 12,
            }}>
                <Text style={{
                    fontFamily: 'Roboto-Bold',
                    fontSize: 14,
                    // lineHeight: 18,
                    // fontWeight: 'bold',
                    color: 'white'
                }}>{strings.learn_more}</Text>
            </TouchableOpacity> */}
        </View>
    )
}

export default AwardsPanel