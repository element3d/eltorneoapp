import { Image, Text, TouchableOpacity, View } from "react-native";
import SERVER_BASE_URL from "./AppConfig";
import strings from "./Strings";
import moment from "moment";
import dataManager from "./DataManager";
import Icon from 'react-native-vector-icons/MaterialIcons';
import FAIcon from 'react-native-vector-icons/Fontisto';
import { getAnalytics, logEvent } from '@react-native-firebase/analytics';
import authManager from "./AuthManager";
import Colors from "./Colors";
import { SvgUri } from "react-native-svg";
import Video from "react-native-video";
import { useIsFocused } from "@react-navigation/native";
import { useState } from "react";

export default function EventCard({ onPress, onTrailerPress, onClose, match }) {
    const isFocused = useIsFocused()
    const [videoReady, setVideoReady] = useState(false);

    function getDate(matchDate) {
        const today = moment().startOf('day');
        const tomorrow = moment().add(1, 'day').startOf('day');

        if (moment(matchDate).isSame(today, 'day')) {
            return strings.today;
        } else if (moment(matchDate).isSame(tomorrow, 'day')) {
            return strings.tomorrow;
        } else {
            return `${moment(matchDate).format('DD')} ${strings[moment(matchDate).format('MMM').toLowerCase()]}`;
        }
    }

    function onPressInternal() {
        if (!authManager.getMeSync() || authManager.getMeSync().isGuest) {
            logEvent(getAnalytics(), 'button_click', {
                'button_name': 'SpecialMatchCardClick'
            })
        }
        onPress()
    }

    function onCloseInternal() {
        if (!authManager.getMeSync() || authManager.getMeSync().isGuest) {
            logEvent(getAnalytics(), 'button_click', {
                'button_name': 'SpecialMatchCardCloseClick'
            });
        }
        onClose()
    }

    function SpecialAwardPanel2({ match }) {


        function getSpecialPoints() {
            return match.special_match_points.split(':')
        }

        return (
            <View style={{
                // marginTop: 5,
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
                marginBottom: 7
            }}>
                <View style={{
                    width: 30,
                    height: 30,
                    marginRight: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 15,
                    backgroundColor: '#FACC15'
                }}>
                    <Text style={{
                        color: 'black',
                        lineHeight: 20,
                        fontFamily: 'Poppins-Bold',
                        // fontWeight: 'bold'
                    }}>+{getSpecialPoints()[0]}</Text>
                </View>
                <View style={{
                    width: 30,
                    height: 30,
                    marginRight: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 15,
                    // borderColor: '#00C566',
                    // borderWidth: 1,
                    backgroundColor: '#00C566'
                }}>
                    <Text style={{
                        color: 'black',
                        lineHeight: 20,
                        fontFamily: 'Poppins-Bold',
                        // fontWeight: 'bold'
                    }}>+{getSpecialPoints()[1]}</Text>
                </View>
                <View style={{
                    width: 30,
                    height: 30,
                    marginRight: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 15,
                    // borderColor: '#00C566',
                    // borderWidth: 1,
                    backgroundColor: '#00C566'
                }}>
                    <Text style={{
                        color: 'black',
                        lineHeight: 20,
                        fontFamily: 'Poppins-Bold',
                        // fontWeight: 'bold'
                    }}>+{getSpecialPoints()[1]}</Text>
                </View>
                <View style={{
                    width: 30,
                    height: 30,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 15,
                    // borderWidth: 1,
                    // borderColor: '#FF4747',
                    backgroundColor: '#FF4747'
                }}>
                    <Text style={{
                        color: 'black',
                        lineHeight: 20,
                        fontFamily: 'Poppins-Bold',
                        // fontWeight: 'bold'
                    }}>{getSpecialPoints()[2]}</Text>
                </View>
            </View>
        )
    }

    function getBannerVideo() {
        // const leagueName = encodeURIComponent(m.league_name || '');
        // const country = encodeURIComponent(m.league_country || '');
        const special = encodeURIComponent(match.title || '');

        return `${SERVER_BASE_URL}/data/${special}.mp4`;
    }

    return (
        <View style={{
            position: 'absolute',
            top: 0,
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 12,
            backgroundColor: "#000000cc"
        }}>
            <TouchableOpacity activeOpacity={.9} style={{
                width: '100%',
                // height: 220,
                borderRadius: 16,
                backgroundColor: '#37003C',
                overflow: 'hidden'
            }}>
                <Image src={`${SERVER_BASE_URL}/data/special/${match.title}.png${dataManager.getImageCacheTime()}`} style={{
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    // bottom: -30,
                }}></Image>
                {match.match.has_special_video ? <Video
                    source={{ uri: getBannerVideo() }}
                    style={{
                        width: '100%',
                        height: '100%',
                        top: 0,
                        position: 'absolute',
                        opacity: videoReady ? 1 : 0
                    }}
                    resizeMode="cover"
                    repeat
                    paused={!isFocused}
                    controls={false}
                    playInBackground={false}
                    playWhenInactive={false}
                    ignoreSilentSwitch="ignore"
                    disableFocus={true}
                    muted={true}
                    volume={0}
                    onLoad={() => {
                        setVideoReady(true);
                    }}
                    onReadyForDisplay={() => {
                        setVideoReady(true);
                    }}
                    onError={e => {
                        setVideoReady(false);
                    }}
                /> : null }
          
                <View style={{
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingTop: 10,
                }}>
                    <View style={{
                        height: 40
                    }}></View>

                    <View style={{
                        width: '100%',
                        marginTop: 10,
                        flexDirection: 'row',
                        justifyContent: 'center'
                    }}>
                        <View style={{
                            flex: 1,
                            alignItems: 'flex-end',
                            paddingRight: 25,
                            justifyContent: 'center'
                        }}>
                            <View style={{
                                flexShrink: 1,
                                // backgroundColor: 'red',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Image src={`${SERVER_BASE_URL}/data/teams/150x150/${match.match.team1.name}.png`} style={{
                                    width: 80,
                                    height: 80
                                }}></Image>
                                <Text style={{
                                    color: 'white',
                                    fontSize: 16,
                                    // lineHeight: 20,
                                    fontFamily: 'Poppins-Bold'
                                }}>{match.match.team1.shortName}</Text>
                            </View>

                        </View>
                        <View style={{
                            // width: 30,
                            // backgroundColor: 'red',
                            alignItems: 'center',
                            paddingBottom: 16,
                            justifyContent: 'center'
                        }}>
                            <Text style={{
                                color: 'white',
                                fontSize: 16,
                                marginBottom: 2,
                                // lineHeight: 20,
                                fontFamily: 'Roboto-ExtraBold'
                            }}>{getDate(match.match.date)}</Text>
                            <View style={{
                                height: 30,
                                paddingHorizontal: 12,
                                borderRadius: 15,
                                borderColor: '#34C759',
                                borderWidth: 1,
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: '#34C75955'
                            }}>
                                <Text style={{
                                    fontSize: 16,
                                    lineHeight: 22,
                                    color: '#34C759',
                                    fontFamily: 'Poppins-Bold'
                                }}>{moment(match.match.date).format('HH:mm')}</Text>
                            </View>
                        </View>
                        <View style={{
                            //  width: 150,
                            flex: 1,
                            paddingLeft: 25,
                            flexDirection: 'row',
                            // alignItem: 'flex-start',
                            //  backgroundColor: 'red',
                            //  height: 70,
                            // backgroundColor: '#00000088',
                            // borderRadius: 50,
                            // alignItems: 'center',
                            justifyContent: 'flex-start'
                        }}>
                            <View style={{
                                flexShrink: 1,
                                // backgroundColor: 'red',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Image src={`${SERVER_BASE_URL}/data/teams/150x150/${match.match.team2.name}.png`} style={{
                                    width: 80,
                                    height: 80,
                                    // backgroundColor: 'blue',

                                }}></Image>
                                <Text style={{
                                    // backgroundColor: 'blue',
                                    color: 'white',
                                    fontSize: 16,
                                    // lineHeight: 20,
                                    fontFamily: 'Poppins-Bold'
                                }}>{match.match.team2.shortName}</Text>
                            </View>
                        </View>
                    </View>
                    {!match.match.teaser?.length ? <View>
                        <SpecialAwardPanel2 match={match.match} />
                        <TouchableOpacity onPress={onPressInternal} activeOpacity={.8} style={{
                            height: 24,
                            marginTop: 3,
                            marginBottom: 20,
                            overflow: 'hidden',
                            borderWidth: Colors.mode == 3 ? 1 : 0,
                            borderColor: Colors.gradientBorderColor,
                            backgroundColor: '#FF2882',
                            borderRadius: 12,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            {Colors.mode == 3 ? <Image source={dataManager.getButtonGradientExtraLarge(match.match.league)} style={{
                                width: '100%',
                                height: '100%',
                                position: 'absolute'
                            }} /> : null}
                            <Text style={{
                                lineHeight: 18,
                                marginHorizontal: 20,
                                color: 'white',
                                fontFamily: 'Poppins-Bold'
                            }}>{strings.predict}</Text>
                        </TouchableOpacity>
                    </View> : <View style={{
                        flexDirection: 'row',
                        marginTop: 6
                    }}>
                        <TouchableOpacity onPress={onPress} activeOpacity={.8} style={{
                            height: 24,
                            marginTop: 5,
                            marginBottom: 20,
                            paddingHorizontal: 20,
                            backgroundColor: '#FF2882',
                            borderRadius: 12,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Text style={{
                                lineHeight: 18,
                                color: 'white',
                                fontFamily: 'Roboto-Bold'
                            }}>{strings.predict}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onTrailerPress} activeOpacity={.8} style={{
                            height: 24,
                            marginTop: 5,
                            marginBottom: 20,
                            marginLeft: 10,
                            paddingHorizontal: 20,
                            backgroundColor: '#FACC15',
                            borderRadius: 12,
                            alignItems: 'center',
                            flexDirection: 'row',
                            justifyContent: 'center'
                        }}>
                            <Text style={{
                                lineHeight: 20,
                                color: 'black',
                                fontFamily: 'Roboto-Bold'
                            }}>{strings.trailer}</Text>
                            <FAIcon name={'film'} color={'black'} size={16} style={{
                                marginLeft: 6
                            }}></FAIcon>
                        </TouchableOpacity>
                    </View>}
                </View>
                <TouchableOpacity onPress={onCloseInternal} style={{
                    position: 'absolute',
                    top: 10,
                    right: 10
                }}>
                    <Icon name={'close'} size={24} color={'white'} style={{

                    }} />
                </TouchableOpacity>
            </TouchableOpacity>

        </View>
    )
}