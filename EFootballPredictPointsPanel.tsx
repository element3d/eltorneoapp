import { Text, View } from "react-native";
import dataManager from "./DataManager";
import strings from "./Strings";

export default function EFootballPredictPointsPanel({match, predict}) {
    return <View style={{
        // height: '100%',
        // paddingTop: 6,
        flexDirection: 'column',
        // backgroundColor: 'red',
        justifyContent: 'flex-start',
        // alignItems: 'flex-end'
    }}>
        <View style={{
            // borderWidth: 1,
            backgroundColor: dataManager.getEFootballPredictBgColor(predict),
            borderColor: '#00000033',
            padding: 1,
            paddingLeft: 5,
            paddingRight: 5,
            borderRadius: 4,
            // marginBottom: 4
        }}>
            {predict.status != 0 ? <Text style={{
                color: dataManager.getEFootballPredictBorderColor(predict),
                fontFamily: 'Roboto-Bold',
                marginBottom: 1,
                fontSize: 12,
                // fontFamily: 'NotoSansArmenian-Bold'
            }}>{strings.points}: {`${dataManager.getEFootballPoints(predict, match.is_special)}`}</Text> : null}
        </View>
    </View>
}