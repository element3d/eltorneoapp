import { Image, Text, TouchableOpacity, View } from "react-native"
import strings from "./Strings"
import Colors from "./Colors"
import dataManager from "./DataManager"

export default function ConfirmDialog({ title, description, onYes, onNo }) {
    return <View style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#00000066'
    }}>
        <View style={{
            width: 320,
            height: 200,
            borderRadius: 30,
            backgroundColor: Colors.gray800
        }}>
            <View style={{
                flex: 1,
                alignItems: 'center',
                padding: 20,
                justifyContent: 'center'
            }}>
                <Text style={{
                    color: Colors.titleColor,
                    fontFamily: 'Roboto-Bold',
                    fontSize: 24,
                    // marginBottom: 10
                }}>{title}</Text>
                <Text style={{
                    color: '#8E8E93',
                    textAlign: 'center',
                    fontSize: 14
                }}>{description}</Text>
            </View>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                height: 55
            }}>
                <TouchableOpacity activeOpacity={.6} onPress={onNo} style={{
                    // flex: 1,
                    alignItems: 'center',
                    // backgroundColor: 'red',
                    height: 40,
                    width: '40%',
                    justifyContent: 'center'
                }}>
                    <Text style={{
                        color: Colors.primary,
                        fontFamily: 'Roboto-Bold',
                    }}>{strings.no}</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={.8} onPress={onYes} style={{
                    // flex: 1,
                    backgroundColor: Colors.primary,
                    alignItems: 'center',
                    height: 30,
                    borderRadius: 20,
                    width: '40%',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    borderWidth: Colors.mode == 3 ? 1 : 0,
                    borderColor: Colors.gradientBorderColor
                }}>
                    {Colors.mode == 3 ? <Image source={dataManager.getButtonGradientLarge()} style={{
                        width: '100%',
                        height: '100%',
                        position: 'absolute'
                    }} /> : null}
                    {Colors.mode == 4 ? <Image source={dataManager.getButtonGradientLargeFC27()} style={{
                        width: '100%',
                        height: '100%',
                        position: 'absolute'
                    }} /> : null}
                    <Text style={{
                        color: Colors.mode == 4 ? 'black' : 'white',
                        fontFamily: 'Roboto-Bold',
                    }}>{strings.yes}</Text>
                </TouchableOpacity>
            </View>
        </View>
    </View>
}