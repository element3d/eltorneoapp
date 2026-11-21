import { Image, Text, TouchableOpacity, View } from "react-native";
import strings from "./Strings";
import Colors from "./Colors";
import { getApp } from '@react-native-firebase/app';
import { getAnalytics, logEvent, setAnalyticsCollectionEnabled } from '@react-native-firebase/analytics';
import dataManager from "./DataManager";

const analyticsInstance = getAnalytics(getApp());
setAnalyticsCollectionEnabled(analyticsInstance, true);

export default function LinkAccountPanel({ navigation }) {
    function onLinkAccount() {
        logEvent(analyticsInstance, 'button_click', {
            'button_name': 'LinkAccountButtonClick',
        })

        navigation.push('LinkAccount');
    }

    return <View style={{
        width: '100%',
        padding: 20,
        paddingBottom: 10,
        // marginTop: 10,
        // marginLeft: 10,
        alignItems: 'center',
        // backgroundColor: 'red',
        // paddingRight: 20,
        // paddingLeft: 20
    }}>
        <View style={{
            width: '100%',
            borderRadius: 12,
            padding: 10,
            backgroundColor: '#FF474719'
        }}>
            <Text style={{
                fontSize: 16,
                fontFamily: 'Roboto-Bold',
                color: '#FF4747'
            }}>{strings.attention_quest}</Text>
            <Text style={{
                fontFamily: 'Roboto-Regular',
                color: Colors.titleColor
            }}>{strings.link_account_message}</Text>

            <TouchableOpacity activeOpacity={.8} onPress={onLinkAccount} style={{
                height: 24,
                width: 'auto',
                alignSelf: 'center',
                marginTop: 10,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#FF2882',
                borderRadius: 15,
                paddingHorizontal: 20,
                overflow: 'hidden',
                borderWidth: Colors.mode == 3 ? 1 : 0,
                borderColor: Colors.gradientBorderColor
            }}>
                 {Colors.mode == 3 ? <Image source={dataManager.getButtonGradientExtraLarge()} style={{
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
                    fontFamily: 'Roboto-Bold',
                    fontSize: 13,
                    lineHeight: 18,
                    color: Colors.mode == 4 ? 'black' : 'white'
                }}>{strings.complete_account}</Text>
            </TouchableOpacity>

        </View>
    </View>
}