import GamesIcon from './assets/games.svg';
import GoalsIcon from './assets/goals.svg';
import AssistIcon from './assets/assist.svg';
import BadIcon from './assets/semibad.svg';
import GoodIcon from './assets/good.svg';
import StarIcon from './assets/semiup.svg';
import UpIcon from './assets/up.svg';
import BottomIcon from './assets/bottom.svg';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import Colors from './Colors';
import PlayerImage from './PlayerImage';
import strings from './Strings';
import dataManager from './DataManager';

export default function PlayerTotalRowItem({ player1, leagueId, team, subOut, disabled, onClick }) {
    function getIcon(rating) {
        if (rating >= 8) return <UpIcon width={16} height={20} />
        if (rating < 6) return <BottomIcon width={16} height={20} />

        if (rating < 7.0) return <BadIcon width={20} height={20} />
        if (rating >= 7.0 && rating < 7.5) return <GoodIcon width={20} height={20} />
        return <StarIcon width={16} height={20} />
    }

    function getPlayerName(player1) {
        if (player1.number > 0)
            return `${player1.number}. ${player1.name}`
        return player1.name
    }

    if (!player1) return
    const stats = player1.stats
    let stat = null;
    if (!player1.stats) {
        stat = {
            games: player1.games,
            goals: player1.goals,
            assists: player1.assists,
            rating: player1.rating
        }
    } else {
        stat = stats.find(s => s.leagueId === leagueId) || null
    }
    const imageSize = 60
    return <TouchableOpacity onPress={() => {
        if (disabled) return;
        onClick(player1);
    }} activeOpacity={.8} style={{
        // flex: 1,
        width: '100%',
        opacity: disabled ? 0.5 : 1,
        backgroundColor: Colors.gray800,
        marginBottom: 10,
        borderRadius: 12,
        height: 80,
        alignItems: 'center',
        borderWidth: subOut ? 1 : 0,
        borderColor: subOut ? Colors.fail : Colors.borderColor,
        // borderRightWidth: 1,
        // padding: 10,
        // borderRightColor: 'black',
        flexDirection: 'row'
    }}>
        {!team.playersReady ? <View style={{
            width: imageSize,
            height: imageSize,
            borderRadius: 35,
            overflow: 'hidden',
            borderWidth: 2,
            marginLeft: 5,
            borderColor: Colors.borderColor
        }}>
            <Image style={{
                width: imageSize,
                height: imageSize,
            }} src={`https://media.api-sports.io/football/players/${player1.apiId}.png`}></Image>
        </View> : <View style={{
            width: imageSize,
            height: imageSize,
            marginLeft: 5,
        }}>
            <PlayerImage team={team} player={player1} imageSize={imageSize} />
        </View>}
        <View style={{
            // marginBottom: 20
        }}>
            <Text style={{
                marginLeft: 10,
                fontFamily: 'Roboto-Bold',
                // fontFamily: 'Poppins-Bold',
                color: Colors.titleColor,
                fontSize: 16,
            }}>{getPlayerName(player1)}</Text>
            <Text style={{
                marginLeft: 10,
                fontFamily: 'Roboto-Bold',

                color: '#8E8E93',
                fontSize: 14,
            }}>{dataManager.getTranslatedPlayerPosition(player1.position)}, {player1.teamShortName}</Text>
            <View style={{
                flexDirection: 'row'
            }}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginLeft: 10
                }}>
                    <GamesIcon width={20} height={20} />
                    <Text style={{
                        marginLeft: 4,
                        fontFamily: 'Roboto-Bold',
                        // fontFamily: 'Poppins-Bold',
                        color: Colors.titleColor,
                        fontSize: 16,

                    }}>{stat ? stat.games : 0}</Text>
                </View>
                {stat?.goals > 0 ? <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginLeft: 20
                }}>
                    <GoalsIcon width={20} height={17} />
                    <Text style={{
                        marginLeft: 4,
                        fontFamily: 'Roboto-Bold',
                        // fontFamily: 'Poppins-Bold',
                        color: Colors.titleColor,
                        fontSize: 16,
                    }}>{stat ? stat.goals : 0}</Text>
                </View> : null}

                {stat?.assists > 0 ? <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginLeft: 20
                }}>
                    <AssistIcon width={26} height={28} />
                    <Text style={{
                        marginLeft: 4,
                        fontFamily: 'Roboto-Bold',
                        // fontFamily: 'Poppins-Bold',
                        color: Colors.titleColor,
                        fontSize: 16,
                    }}>{stat ? stat.assists : 0}</Text>
                </View> : null}
            </View>
        </View>

        {stat && stat.rating ? <View style={{
            position: 'absolute',
            top: 5,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            right: 10
        }}>
            <Text style={{
                marginRight: 4,
                color: '#8E8E93',
                fontFamily: 'Roboto-Bold',
            }}>{Number.parseFloat(stat.rating).toFixed(1)}</Text>
            {getIcon(Number.parseFloat(stat.rating).toFixed(1))}

        </View> : null}
    </TouchableOpacity>
}