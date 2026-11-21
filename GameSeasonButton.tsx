import { Image, Text, TouchableOpacity, View } from "react-native";
import dataManager from "./DataManager";
import Colors from "./Colors";
import strings from "./Strings";

export default function GameSeasonButton({ title, season, setSeason, buttonSeason }) {
    const currentSeason = '26/27';

    function getTitleColor() {
        if (Colors.mode == 4 && season == buttonSeason)
            return 'black'
        return season == buttonSeason ? 'white' : Colors.titleColor
    }

    return <TouchableOpacity onPress={() => { setSeason(buttonSeason) }} disabled={dataManager.getSettings()?.season != currentSeason && buttonSeason == currentSeason} activeOpacity={.6} style={{
        marginRight: 10,
        opacity: dataManager.getSettings()?.season != currentSeason && buttonSeason == currentSeason ? .5 : 1,
        height: 40,
        backgroundColor: season == buttonSeason ? Colors.primary : Colors.gray800,
        borderWidth: 1,
        borderColor: season == buttonSeason && Colors.mode == 3 ? "#00FFFF" : Colors.borderColor,
        borderRadius: 20,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center'
    }}>
        {Colors.mode == 3 && season == buttonSeason ? <Image source={dataManager.getButtonGradientLarge()} style={{
            width: '100%',
            height: '100%',
            position: 'absolute'
        }} /> : null}
        {Colors.mode == 4 && season == buttonSeason ? <Image source={dataManager.getButtonGradientLargeFC27()} style={{
            width: '100%',
            height: '100%',
            position: 'absolute'
        }} /> : null}
        <View style={{
            paddingHorizontal: 20,
        }}>
            <Text style={{
                fontFamily: 'Roboto-Bold',
                color: getTitleColor()
            }}>{strings.season} {title}</Text>
        </View>
    </TouchableOpacity>
}