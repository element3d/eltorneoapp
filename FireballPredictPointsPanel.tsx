import { Text, View } from "react-native";
import dataManager from "./DataManager";
import strings from "./Strings";

export default function FireballPredictPointsPanel({match, predict}) {
    return <View style={{
        height: '100%',
        paddingTop: 6,
        flexDirection: 'column',
        // backgroundColor: 'red',
        // justifyContent: 'center',
        alignItems: 'flex-end'
    }}>
        <View style={{
            // borderWidth: 1,
            backgroundColor: dataManager.getFireballPointsBgColor(predict),
            borderColor: '#00000033',
            padding: 1,
            paddingLeft: 4,
            paddingRight: 4,
            borderRadius: 6,
            marginBottom: 4
        }}>
            {predict.status != 0 ? <Text style={{
                color: dataManager.getFireballPredictBorderColor(predict),
                fontFamily: 'Roboto-Bold',
                marginBottom: 1,
                fontSize: predict.status == 0 ? 14 : 12,
                // fontFamily: 'NotoSansArmenian-Bold'
            }}>{strings.points}: {`${dataManager.getFireballPoints(predict, match.is_special)}`}</Text> : null}
        </View>
    </View>
}