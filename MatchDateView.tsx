import moment from "moment";
import { Text, View } from "react-native";
import Colors from "./Colors";

export default function MatchDateView({ match }) {
    if (match.status == 'PST') {
        return <View style={{
            marginTop: 4,
            backgroundColor: '#FF474719',
            borderWidth: 1,
            borderColor:  Colors.fail,
            paddingLeft: 8,
            paddingRight: 8,
            height: 30,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 15
        }}>
            <Text style={{
                fontFamily: 'NotoSansArmenian-Bold',
                fontSize: 14,
                color: Colors.fail
            }}>{'PST'}</Text>
        </View>
    }

    return <View style={{
        marginTop: 4,
        backgroundColor: '#00C56619',
        borderWidth: 1,
        borderColor: '#00C566',
        paddingLeft: 8,
        paddingRight: 8,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15
    }}>
        <Text style={{
            fontFamily: 'NotoSansArmenian-Bold',
            fontSize: 14,
            color: '#00C566'
        }}>{moment(match?.date).format('HH:mm')}</Text>
    </View>
}