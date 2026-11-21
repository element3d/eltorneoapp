import { View, Text, TouchableOpacity } from "react-native";
import strings from "./Strings";

function AwardsPanelWorldCup({ onReadMore, season, showLeague = true, overlay = false, league = 1 }) {

    function getLeagueName() {
        return "World Cup"
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
            }}>{strings.season} 2026</Text>

            <View style={{
                marginTop: 10,
                flexDirection: 'row'
            }}>
                <View style={{
                    width: 28,
                    marginRight: 10,
                    alignItems: 'center'
                }}>
                    <View style={{
                        width: 28,
                        height: 28,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 20,
                        backgroundColor: '#FACC15'
                    }}>
                        <Text style={{
                            fontSize: 13,
                            lineHeight: 22,
                            fontFamily: "Poppins-Bold",
                            color: 'black'
                        }}>+3</Text>
                    </View>

                </View>

                <View style={{
                    width: 28,
                    marginRight: 10,
                    alignItems: 'center'
                }}>
                    <View style={{
                        width: 28,
                        height: 28,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 20,
                        borderWidth: 1,
                        borderColor: '#00C566',
                        backgroundColor: '#34C75955'
                    }}>
                        <Text style={{
                            fontSize: 13,
                            lineHeight: 20,
                            fontFamily: "Poppins-Bold",
                            color: '#00C566'
                        }}>+2</Text>
                    </View>

                </View>

                <View style={{
                    width: 28,
                    marginRight: 10,
                    alignItems: 'center'
                }}>
                    <View style={{
                        width: 28,
                        height: 28,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 20,
                        borderWidth: 1,
                        borderColor: '#00C566',
                        backgroundColor: '#34C75955'
                    }}>
                        <Text style={{
                            fontSize: 13,
                            lineHeight: 22,
                            fontFamily: "Poppins-Bold",
                            color: '#00C566'
                        }}>+1</Text>
                    </View>

                </View>

                <View style={{
                    width: 28,
                    marginRight: 10,
                    alignItems: 'center'
                }}>
                    <View style={{
                        width: 28,
                        height: 28,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 20,
                        borderWidth: 1,
                        borderColor: '#FF4747',
                        backgroundColor: '#FF474755'
                    }}>
                        <Text style={{
                            fontSize: 13,
                            lineHeight: 22,
                            fontFamily: "Poppins-Bold",
                            color: '#FF4747'
                        }}>-1</Text>
                    </View>
                </View>
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

export default AwardsPanelWorldCup