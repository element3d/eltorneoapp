import { Image, Text, View } from "react-native";
import strings from "./Strings";
import Colors from "./Colors";
import { ELEAGUE_AMATEUR, ELEAGUE_LEGEND, ELEAGUE_PRO } from "./Enums";

import LegendIcon from './assets/LegendIcon.svg'
import ProIcon from './assets/ProIcon.svg'
import AmateurIcon from './assets/AmateurIcon.svg'

import ElTorneoTrophyIcon from './assets/first.svg';
import EFootballTrophyIcon from './assets/eFootballTrophy.svg';
import FantasyTrophyIcon from './assets/FantasyTrophy.svg';
import FireballTrophyIcon from './assets/FireballTrophy.svg';
import BeatBetTrophyIcon from './assets/BeatBetTrophy.svg';

import WorldCupTrophyIcon from './assets/WorldCupTrophy.svg';
import WorldCupSecondIcon from './assets/Second.svg';
import WorldCupThirdIcon from './assets/Third.svg';
import WorldCupPlaceIcon from './assets/WorldCupPlace.svg';

import { EGAME_BEATBET, EGAME_CAREER, EGAME_EFOOTBALL, EGAME_ELTORNEO, EGAME_FIREBALL, EGAME_WORLD_CUP } from "./GamepadMenu";

function GameImage({ award }) {
    if (award.game == EGAME_ELTORNEO) {
        return <Image source={require('./assets/playstore.png')} style={{
            width: 20,
            height: 20,
            objectFit: 'contain'
        }} />
    }

    if (award.game == EGAME_WORLD_CUP) {
        return <Image source={require('./assets/world_cup.png')} style={{
            width: 20,
            height: 20,
            objectFit: 'contain'
        }} />
    }

    if (award.game == EGAME_EFOOTBALL) {
        return <Image source={require('./assets/eFootball.png')} style={{
            width: 20,
            height: 20,
            objectFit: 'contain'
        }} />
    }

    if (award.game == EGAME_CAREER) {
        return <Image source={require('./assets/Career.png')} style={{
            width: 20,
            height: 20,
            objectFit: 'contain'
        }} />
    }

    if (award.game == EGAME_FIREBALL) {
        return <Image source={require('./assets/Fireball.png')} style={{
            width: 20,
            height: 20,
            objectFit: 'contain'
        }} />
    }

    if (award.game == EGAME_BEATBET) {
        return <Image source={require('./assets/beat_bet_img.png')} style={{
            width: 20,
            height: 20,
            objectFit: 'contain'
        }} />
    }
}

function AwardItem({ user, award }) {
    function getLevelIcon(award) {
        const opacity = award.finished ? 1 : 0.6;
        if (award.game == EGAME_WORLD_CUP || award.game == EGAME_FIREBALL) {
            if (award.place == 1) {
                if (award.game == EGAME_WORLD_CUP)
                    return <WorldCupTrophyIcon width={36} height={36} style={{
                        opacity: opacity
                    }} />
                if (award.game == EGAME_FIREBALL)
                    return <FireballTrophyIcon width={38} height={38} style={{
                        opacity: opacity
                    }} />
            }
            if (award.place == 2) {
                return <WorldCupSecondIcon width={36} height={36} style={{
                    opacity: opacity
                }} />
            }
            if (award.place == 3) {
                return <WorldCupThirdIcon width={36} height={36} style={{
                    opacity: opacity
                }} />
            }
            return <View style={{
                alignItems: 'center',
                justifyContent: 'center',
                opacity: opacity
            }}>
                <WorldCupPlaceIcon width={38} height={38} style={{
                    // marginLeft: 6
                }}></WorldCupPlaceIcon>
                <Text style={{
                    position: 'absolute',
                    width: 40,
                    fontSize: award.place < 10 ? 25 : 20,
                    color: '#DE4027',//Colors.titleColor,
                    fontFamily: 'ProtestGuerrilla-Regular',
                    textAlign: 'center'
                }}>{award.place}</Text>
            </View>
        }
        if (award.game == EGAME_BEATBET) {
            if (award.place == 1 && award.isWinner) {
                return <BeatBetTrophyIcon width={38} height={38} style={{
                    opacity: opacity
                }} />
            }

            if (award.place == 2) {
                return <View style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: opacity,
                    flexDirection: 'column'
                }}>
                    <View style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <WorldCupSecondIcon width={26} height={26}/>
                    </View>
                    <Text style={{
                        fontSize: 13,
                        lineHeight: 14,
                        color: Colors.success,//Colors.titleColor,
                        fontFamily: 'ProtestGuerrilla-Regular',
                        textAlign: 'center',
                    }}>+{award.league} $</Text>
                </View>
            }
            if (award.place == 3) {
                return <View style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: opacity,
                    flexDirection: 'column'
                }}>
                    <View style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <WorldCupThirdIcon width={26} height={26}/>
                    </View>
                    <Text style={{
                        fontSize: 13,
                        lineHeight: 14,
                        color: Colors.success,//Colors.titleColor,
                        fontFamily: 'ProtestGuerrilla-Regular',
                        textAlign: 'center',
                    }}>+{award.league} $</Text>
                </View>
            }

            return <View style={{
                alignItems: 'center',
                justifyContent: 'center',
                opacity: opacity,
                flexDirection: 'column'
            }}>
                <View style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <WorldCupPlaceIcon width={28} height={28}></WorldCupPlaceIcon>
                    <Text style={{
                        position: 'absolute',
                        width: 40,
                        fontSize: award.place < 10 ? 16 : 13,
                        color: '#DE4027',//Colors.titleColor,
                        fontFamily: 'ProtestGuerrilla-Regular',
                        textAlign: 'center'
                    }}>{award.place}</Text>
                </View>
                <Text style={{
                    fontSize: 13,
                    lineHeight: 14,
                    color: Colors.success,//Colors.titleColor,
                    fontFamily: 'ProtestGuerrilla-Regular',
                    textAlign: 'center',
                }}>+{award.league} $</Text>
            </View>
        }
        // Begginner
        // Amateur
        // Regular
        // Pro
        // Top Player
        // Superstar
        // Legend
        if (award.isWinner) {
            if (award.game == EGAME_ELTORNEO)
                return <ElTorneoTrophyIcon width={36} height={36} style={{
                    opacity: opacity
                }} />
            if (award.game == EGAME_EFOOTBALL)
                return <EFootballTrophyIcon width={38} height={38} style={{
                    opacity: opacity
                }} />
            if (award.game == EGAME_CAREER)
                return <FantasyTrophyIcon width={36} height={36} style={{
                    opacity: opacity
                }} />
        }
        if (award.league == ELEAGUE_LEGEND) return <LegendIcon width={40} height={40} style={{
            opacity: opacity
        }} />
        if (award.league == ELEAGUE_PRO) return <ProIcon width={42} height={42} style={{
            opacity: opacity
        }} />
        if (award.league == ELEAGUE_AMATEUR) return <AmateurIcon width={36} height={36} style={{
            opacity: opacity
        }} />

    }



    function getPlaceBGColor(award) {
        if (award.game == EGAME_BEATBET) {
            if (award.place <= 20) return 'gold'
            return Colors.titleColor
        }
        if (award.league == ELEAGUE_LEGEND) return 'gold'
        if (award.league == ELEAGUE_PRO) return Colors.titleColor
        return Colors.titleColor
    }

    function getPlaceTextColor(award) {
        if (award.game == EGAME_BEATBET) {
            if (award.place <= 20) return 'black'
            if (Colors.mode == 1) return 'white'
            return 'black'
        }
        if (award.league == ELEAGUE_LEGEND) return 'black'
        if (Colors.mode == 1) return 'white'
        return 'black'
    }

    function getLevelText(award) {
        if (award.league == ELEAGUE_LEGEND) return strings.legend
        if (award.league == ELEAGUE_PRO) return strings.pro

    }


    if (!award) {
        return <View style={{
            alignItems: 'center',
            backgroundColor: Colors.bgColor,
            borderRadius: 30,
            borderWidth: 1,
            borderColor: Colors.borderColor,
            justifyContent: 'center',
            width: 60,
            height: 60
        }}>
            <Image source={require('./assets/QuestionMark.png')} style={{
                width: 35,
                height: 35,
                objectFit: 'contain'
            }} />
        </View>
    }

    return <View style={{
        alignItems: 'center',
        backgroundColor: Colors.bgColor,
        borderRadius: 30,
        borderWidth: 1,
        // marginLeft: 20,
        borderColor: Colors.borderColor,
        justifyContent: 'center',
        width: 60,
        height: 60
    }}>
        {getLevelIcon(award)}
        {!award.isWinner ? <View style={{
            width: 20,
            borderWidth: 1,
            borderColor: 'black',
            height: 20,
            alignItems: 'center',
            justifyContent: 'center',
            top: -4,
            overflow: 'hidden',
            right: -4,
            position: 'absolute',
            backgroundColor: getPlaceBGColor(award),
            borderRadius: 11,
        }}>
            <Text style={{
                // marginTop: 1,
                fontSize: award.place > 9 ? 8 : 10,
                color: getPlaceTextColor(award),
                fontFamily: 'Roboto-ExtraBold'
            }}>#{award.place}</Text>
        </View> : null}

        <View style={{
            width: 20,
            borderWidth: 1,
            borderColor: 'black',
            height: 20,
            alignItems: 'center',
            justifyContent: 'center',
            top: -4,
            overflow: 'hidden',
            left: -4,
            position: 'absolute',
            backgroundColor: getPlaceBGColor(award),
            borderRadius: 11,
        }}>
            <GameImage award={award} />
        </View>

        <View style={{
            position: 'absolute',
            bottom: -5,

            // backgroundColor: 
        }}>
            <Text style={{
                fontSize: 10,
                fontWeight: 900,
                color: award.season == '25/26' ? Colors.primary : Colors.titleColor
                // fontFamily: 'Roboto-Bold'
            }}>{award.season}</Text>
        </View>
    </View>
}

export default function ProfileAwardsPanel({ user, awards }) {

    return <View style={{
        // marginTop: 20,
        width: '90%',
        marginBottom: 10,
        alignSelf: 'center',
        // height: 200,
        borderRadius: 12,
        overflow: 'hidden',
        backgroundColor: Colors.gray800
    }}>

        <View style={{
            padding: 20,
            paddingTop: 15,
            paddingBottom: 25
        }}>
            <Text style={{
                color: Colors.titleColor,
                fontFamily: 'Roboto-Bold',
                fontSize: 20,
                marginBottom: 20
            }}>{strings.awards_and_badges}</Text>

            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between'
            }}>
                <AwardItem user={user} award={awards[0]} />
                <AwardItem user={user} award={awards[1]} />
                <AwardItem user={user} award={awards[2]} />
                <AwardItem user={user} award={awards[3]} />
            </View>
            {awards?.length > 4 ? <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 20
            }}>
                <AwardItem user={user} award={awards[4]} />
                <AwardItem user={user} award={awards[5]} />
                <AwardItem user={user} award={awards[6]} />
                <AwardItem user={user} award={awards[7]} />
            </View> : null}

            {awards?.length > 8 ? <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 20
            }}>
                <AwardItem user={user} award={awards[8]} />
                <AwardItem user={user} award={awards[9]} />
                <AwardItem user={user} award={awards[10]} />
                <AwardItem user={user} award={awards[11]} />
            </View> : null}

        </View>
    </View>
}