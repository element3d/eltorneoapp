import { Text, View } from "react-native";
import strings from "./Strings";
import Colors from "./Colors";
import NativeAdComp from "./NativeAdComp";
import dataManager from "./DataManager";

function hasXG(stat) {
    const values = stat ? stat.split('-') : ['0', '0']
    if (values[0] == '0' && values[1] == '0') return false;
    return true;
}

function Item({ match, title, stat, percent = false, float = false }) {

    const values = stat ? stat.split('-') : ['0', '0']
    let intValues = [];
    if (!float)
        intValues = [Number.parseInt(values[0]), Number.parseInt(values[1])]
    else 
        intValues = [Number.parseFloat(values[0]), Number.parseFloat(values[1])]

    const val1 = intValues[0]
    const val2 = intValues[1]

    let total = val1 + val2;

    function getLowerColor () {
        return Colors.titleColor
    }

    function getLeftColor() {
        if (Colors.mode == 3 && match.league == 6) {
            return '#2D73F3';
        }
        return Colors.mode == 1 ? '#37003C' : 'white';
    }

    function getRightColor() {
        if (Colors.mode == 4 && match.league == 1) {
            return '#84FFFF';
        }
        if (Colors.mode == 4 && match.league == 2) {
            return '#05F0FF';
        }
        if (Colors.mode == 4 && match.league == 3) {
            return '#9DFFC6';
        }
        if (Colors.mode == 4 && match.league == 4) {
            return '#07F468';
        }
        if (Colors.mode == 4 && match.league == 5) {
            return '#9DFFC6';
        }
        if (Colors.mode == 4 && match.league == 6) {
            return '#FF89E1';
        }


        if (Colors.mode == 3 && match.league == 6) {
            return '#FF7FDE';
        }
        if (Colors.mode == 3 && match.league == 5) {
            return '#C32B33';
        }
        if (Colors.mode == 3 && match.league == 1) {
            return '#FF51A2';
        }
        if (Colors.mode == 3 && match.league == 2) {
            return '#05F0FF';
        }
        if (Colors.mode == 3 && match.league == 3) {
            return '#A66FFE';
        }
        if (Colors.mode == 3 && match.league == 14) {
            return "#FF6900"
        }

        return Colors.primary
    }

    return <View style={{
        width: '100%',
        marginTop: 20,
    }}>
        <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
        }}>
            <Text style={{
                color: val1 > val2 ? getRightColor() : getLowerColor(),
                fontSize: 16,
                fontFamily: 'Roboto-Bold',
            }}>{intValues[0]}{percent ? '%' : ''}</Text>
            <Text style={{
                fontSize: 14,
                color: '#8E8E93',
                fontFamily: 'Roboto-Regular',
            }}>{title}</Text>
            <Text style={{
                fontSize: 16,
                color: val2 > val1 ? getRightColor() : getLowerColor(),
                fontFamily: 'Roboto-Bold',
            }}>{intValues[1]}{percent ? '%' : ''}</Text>
        </View>
        <View style={{
            flexDirection: 'row',
            marginTop: 10
        }}>
            <View style={{
                flex: 1,
                height: 10,
                marginRight: 5,
                backgroundColor: Colors.statLine,
                borderRadius: 10,
                alignItems: 'flex-end'
            }}>
                <View style={{
                    height: '100%',
                    borderRadius: 10,
                    backgroundColor: val1 > val2 ? getRightColor() : getLowerColor(),
                    width: `${val1 / total * 100}%`
                }}>

                </View>
            </View>
            <View style={{
                flex: 1,
                // width: 100,
                height: 10,
                marginLeft: 5,
                backgroundColor: Colors.statLine,
                borderRadius: 5,
                alignItems: 'flex-start'
            }}>
                <View style={{
                    height: '100%',
                    borderRadius: 10,
                    backgroundColor: val2 > val1 ? getRightColor() : getLowerColor(),
                    width: `${val2 / total * 100}%`
                }}>
                </View>
            </View>
        </View>
    </View>
}

export default function MatchStatisticsPanel({ match, statistics }) {
    return <View style={{
        width: '90%',
        alignSelf: 'center',
        marginBottom: 100
    }}>
        { hasXG(statistics.xg) ? <Item match={match} title={strings.xg} stat={statistics.xg} percent={false} float={true}></Item> : null }
        <Item match={match} title={strings.shots_on_target} stat={statistics.shotsOnTarget} ></Item>
        <Item match={match} title={strings.shots_off_target} stat={statistics.shotsOffTarget}></Item>
        {/* <Item title={'Blocked shots'} stat={statistics.blockedShots}></Item> */}
        <Item match={match}  title={strings.ball_possession} stat={statistics.possession} percent={true}></Item>
        <Item match={match}  title={strings.fouls} stat={statistics.fouls}></Item>
        <Item match={match}  title={strings.corners} stat={statistics.corners}></Item>
        <Item match={match}  title={strings.offsides} stat={statistics.offsides}></Item>
        <Item match={match}  title={strings.saves} stat={statistics.saves}></Item>

        { dataManager.getSettings().enableAds ? <View style={{
            width: '100%',
            marginTop: 30
        }}>
            <NativeAdComp />
        </View> : null }

    </View>
}