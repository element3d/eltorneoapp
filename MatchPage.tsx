import React, { useEffect, useState, useRef, useCallback } from 'react';
import {
  ActivityIndicator,
  Button,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  useColorScheme,
  View,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FAIcon from 'react-native-vector-icons/FontAwesome5';
import FAIcon2 from 'react-native-vector-icons/Fontisto';
import BBIcon from './assets/bbicon.svg'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import InAppReview from 'react-native-in-app-review';


import { GestureHandlerRootView, TextInput } from 'react-native-gesture-handler';
import BottomNavBar from './BottomNavBar';
import SERVER_BASE_URL from './AppConfig';
import authManager from './AuthManager';
import moment from 'moment';
import TeamItem from './TeamItem';
import MatchPredictsSummaryPanel from './MatchPredictsSummaryPanel';
import MatchTop20PredictsPanel from './MatchTop20PredictsPanel';
import dataManager from './DataManager';
import strings from './Strings';
import adsManager from './AdsManager';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import MatchStatisticsPanel from './MatchStatisticsPanel';
import MatchEventsPanel from './MatchEventsPanel';
import MatchLineupsPanel from './MatchLineupsPanel';
import MatchH2HPanel from './MatchH2HPanel';
import MatchTablePanel from './MatchTablePanel';
import Colors from './Colors';
import MatchPredictsSummaryPanel2 from './MatchPredictsSummaryPanel2';
import GoogleIcon from './assets/google.svg';
import gsingin from './GSignin';
import SpecialAwardPanel from './SpecialAwardPanel';
import NativeAdComp from './NativeAdComp';
import MatchPreviewDialog from './MatchPreviewDialog';
import MatchBeatBetPanel from './MatchBeatBetPanel';
import MatchBetPanel from './MatchBetPanel';
import FairPlayDialog from './FairPlayDialogs';
import MatchLineupsPanel2, { EEVENTS_VIEW_FULL, EEVENTS_VIEW_GOALS, ELINEUPS_VIEW_GOALS, ELINEUPS_VIEW_RATING } from './MatchLineupsPanel2';
import GamepadMenu, { EGAME_BEATBET, EGAME_CAREER, EGAME_EFOOTBALL, EGAME_ELTORNEO, EGAME_FIREBALL, EGAME_WORLD_CUP } from './GamepadMenu';
import MatchDateView from './MatchDateView';
import MatchTop20BetsPanel from './MatchTop20BetsPanel';
import Gamepad from './Gamepad';
import { getApp } from '@react-native-firebase/app';
import { getAnalytics, logEvent, setAnalyticsCollectionEnabled } from '@react-native-firebase/analytics';
import MatchPlayersPanel from './MatchPlayersPanel';
import MatchFireballSummaryPanel from './MatchFireballSummaryPanel';
import MatchTop20FireballPanel from './MatchTop20FireballPanel';
import GoalsIcon from './assets/goals.svg';
import FireballIcon from './assets/Fireball.svg';
import VersusIcon from './assets/versus.svg';
import VersusFC26Icon from './assets/versus_fc.svg';

import SquareIcon from './assets/s_colored_dark.svg'
import SquareLightIcon from './assets/s_colored.svg'
import EventsYIcon from './assets/s_colored_dark.svg'
import EventsYLightIcon from './assets/s_colored.svg'
import Animated, { Extrapolation, interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import MatchEFootballPanel from './MatchEFootballPanel';
import MatchEFootballSummaryPanel from './MatchEFootballSummaryPanel';
import MatchTop20EFootballPanel from './MatchTop20EFootballPanel';

const analyticsInstance = getAnalytics(getApp());
setAnalyticsCollectionEnabled(analyticsInstance, true);

const EMODE_DEFAULT = 0
const EMODE_EDIT = 1

function MatchAppBar({ match, navigation }) {

  function getFont() {
    if (match.league == 24) return 'ProtestGuerrilla-Regular'
    return 'Poppins-Bold'
  }

  function getFontSize() {
    if (match.league == 24) return 17
    return 18
  }

  function getLeagueName() {
    if (!match) return '';
    if (match.league == 24) return match.leagueName.toUpperCase()
    return match.leagueName
  }

  return (
    <View style={{
      width: '100%',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection: 'row',
      height: 70
    }}>
      <TouchableOpacity activeOpacity={.6} onPress={() => { navigation.goBack() }} style={{
        width: 45,
        height: 45,
        borderRadius: 25,
        alignItems: 'center',
        borderColor: '#EAEDF1',
        // borderWidth: 2,
        marginLeft: 20,
        justifyContent: 'center',
        backgroundColor: '#ffffff22'
      }}>
        <Icon name={'arrow-back'} color='white' size={30}></Icon>
      </TouchableOpacity>
      <View style={{
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <Text style={{
          fontSize: getFontSize(),
          // lineHeight: 22,
          fontFamily: getFont(),
          color: 'white'
        }}>{getLeagueName()}</Text>
        <Text style={{
          fontSize: 12,
          lineHeight: 12,
          opacity: .6,
          marginTop: match.league == 24 ? 0 : -6,
          marginBottom: 8,
          fontFamily: 'Roboto-Bold',
          color: 'white'
        }}>{'www.eltorneo.app'}</Text>
      </View>
      <TouchableOpacity onPress={() => { navigation.navigate("MatchSettings") }} style={{
        width: 45,
        height: 45,
        borderRadius: 25,
        alignItems: 'center',
        borderColor: '#EAEDF1',
        justifyContent: 'center',
        backgroundColor: '#ffffff22',
        marginRight: 20,
      }}>
        <Icon name="settings" size={24} color={'white'}></Icon>
      </TouchableOpacity>
    </View>
  )
}

function renderTimeItem(match) {
  if (match.status == 'PST') {
    return <View style={{
      marginTop: 4,
      backgroundColor: '#FF474719',
      borderWidth: 1,
      borderColor: Colors.fail,
      paddingLeft: 8,
      paddingRight: 8,
      height: 26,
      marginBottom: 10,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 15
    }}>
      <Text style={{
        fontFamily: 'Roboto-Bold',
        fontSize: 14,
        lineHeight: 20,
        color: Colors.fail,
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
    height: 26,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15
  }}>
    <Text style={{
      fontFamily: 'Roboto-Bold',
      fontSize: 14,
      lineHeight: 20,
      color: '#00C566'
    }}>{moment(match.date).format('HH:mm')}</Text>
  </View>
}


function MatchDatePanel({ match, isShowTopMatchTime }) {
  function getDate() {
    const today = moment().startOf('day');
    const tomorrow = moment().add(1, 'day').startOf('day');
    const matchDate = moment(match.date); // Ensure it's in milliseconds

    if (matchDate.isSame(today, 'day')) {
      return strings.today;
    } else if (matchDate.isSame(tomorrow, 'day')) {
      return strings.tomorrow;
    } else {
      return `${matchDate.format('DD')} ${strings[matchDate.format('MMM').toLowerCase()]} ${matchDate.format('YYYY').toLowerCase()}`;
    }
  }

  return (
    <View style={{
      alignItems: 'center',
      // marginBottom:- 10,
      justifyContent: 'center'
    }}>
      <Text style={{
        color: Colors.titleColor,
        fontSize: 18,
        fontFamily: 'Roboto-Bold',
        // fontFamily: 'NotoSansArmenian-Bold',
        // color: 'black'
      }}>{getDate()}</Text>
      {isShowTopMatchTime ? renderTimeItem(match) :

        <Text style={{
          marginTop: 2,
          fontSize: 12,
          lineHeight: 12,
          color: '#AEAEB2',
          fontFamily: 'Roboto-Bold',
          height: 20,
          // backgroundColor: 'red'
        }}>{dataManager.getWeekTitle({ week: match.week, type: match.weekType })}</Text>}

    </View>
  )
}

function ViewChip({ title, selected, match, onClick, isBet = false }) {
  function getTextColor() {
    if (selected && Colors.mode == 3 && match.league == 6) {
      return 'black'
    }
    return selected || isBet ? 'white' : '#8E8E93'
  }

  if (Colors.mode == 3) {
    return <TouchableOpacity onPress={onClick} activeOpacity={.8} style={{
      height: 40,
      borderRadius: 25,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: selected ? Colors.gradientBorderColor : (isBet ? Colors.borderColor : Colors.borderColor),
      backgroundColor: selected ? Colors.gradientBorderColor : (isBet ? Colors.gray800 : Colors.gray800),
      marginRight: 10,
      overflow: 'hidden',
      flexDirection: 'row'
    }}>
      {selected ? <Image source={dataManager.getButtonGradientLarge(match?.league)} style={{
        width: '100%',
        height: '100%',
        flex: 1,
        flexGrow: 1,
        position: 'absolute'
      }} /> : null}
      <View style={{
        flexDirection: 'row',
        paddingLeft: isBet ? 10 : 20,
        paddingRight: 20,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {isBet ? <BBIcon width={20} height={20} style={{
          marginRight: 5
        }} /> : null}
        <Text style={{
          fontFamily: 'Roboto-Bold',
          color: getTextColor()
        }}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  }

  if (Colors.mode == 4) {
    return <TouchableOpacity onPress={onClick} activeOpacity={.8} style={{
      height: 40,
      borderRadius: 25,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: selected ? Colors.gradientBorderColor : (isBet ? Colors.borderColor : Colors.borderColor),
      backgroundColor: selected ? Colors.gradientBorderColor : (isBet ? Colors.gray800 : Colors.gray800),
      marginRight: 10,
      overflow: 'hidden',
      flexDirection: 'row'
    }}>
      {selected ? <Image source={dataManager.getButtonGradientLargeFC27(match?.league)} style={{
        width: '100%',
        height: '100%',
        flex: 1,
        flexGrow: 1,
        position: 'absolute'
      }} /> : null}
      <View style={{
        flexDirection: 'row',
        paddingLeft: isBet ? 10 : 20,
        paddingRight: 20,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {isBet ? <BBIcon width={20} height={20} style={{
          marginRight: 5
        }} /> : null}
        <Text style={{
          fontFamily: 'Roboto-Bold',
          color: selected ? 'black' : 'white'//getTextColor()
        }}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  }

  return <TouchableOpacity onPress={onClick} activeOpacity={.8} style={{
    height: 40,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: selected ? '#FF2882' : (isBet ? '#37003C' : Colors.borderColor),
    backgroundColor: selected ? '#FF2882' : (isBet ? '#37003C' : Colors.gray800),
    paddingLeft: isBet ? 10 : 20,
    paddingRight: 20,
    marginRight: 10,
    overflow: 'hidden',
    flexDirection: 'row'
  }}>
    {isBet ? <BBIcon width={20} height={20} style={{
      marginRight: 5
    }} /> : null}
    <Text style={{
      fontFamily: 'Roboto-Bold',
      color: selected || isBet ? 'white' : '#8E8E93'
    }}>
      {title}
    </Text>
  </TouchableOpacity>
}


function MatchPage({ route }): JSX.Element {
  const navigation = useNavigation();

  const { id } = route.params;
  let game = dataManager.getSettings().game;
  const [gameState, setGameState] = useState(game)

  const dmMatch = dataManager.getMatch()

  const dmPredict = dmMatch.predict
  let dmTeam1Score = ''
  let dmTeam2Score = ''
  if (dmPredict) {
    dmTeam1Score = dmPredict.team1_score.toString()
    dmTeam2Score = dmPredict.team2_score.toString()
  }

  const [match, setMatch] = useState(dmMatch)
  const [predict, setPredict] = useState(dmMatch.predict)
  const [fireballPredict, setFireballPredict] = useState(dmMatch.fireballPredict?.player_api_id > 0 ? dmMatch.fireballPredict : null)
  const [bet, setBet] = useState(dmMatch.bet)
  const [eFootballPredict, setEFootballPredict] = useState(dmMatch.eFootballPredict);

  const [predicts, setPredicts] = useState(null)
  const [betsSummary, setBetsSummary] = useState(null)
  const [fireballSummary, setFireballSummary] = useState(null)
  const [eFootballSummary, setEFootballSummary] = useState(null)

  const [top20Predicts, setTop20Predicts] = useState(null)
  const [top20Bets, setTop20Bets] = useState(null)
  const [top20FireballPredicts, setTop20FireballPredicts] = useState(null)
  const [top20EFootballPredicts, setTop20EFootballPredicts] = useState(null)

  const [team1Score, setTeam1Score] = useState(dmTeam1Score)
  const [team2Score, setTeam2Score] = useState(dmTeam2Score)
  const [predictReqFinished, setPredictReqFinished] = useState(false)
  const [predictsReqFinished, setPredictsReqFinished] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [adClosed, setAdClosed] = useState(false)
  const [me, setMe] = useState(authManager.getMeSync())
  const [processing, setProcessing] = useState(false)
  const [blockForAd, setBlockForAd] = useState(dataManager.getSettings().blockForAd)
  const [showAd, setShowAd] = useState(false)
  const [statistics, setStatistics] = useState(null)
  const [events, setEvents] = useState(null)
  const [lineups, setLineups] = useState(null)
  const [odds, setOdds] = useState(null)
  const [table, setTable] = useState(null)
  const [matchPlayers, setMatchPlayers] = useState(null)
  const [mode, setMode] = useState(EMODE_DEFAULT)
  const [header, setHeader] = useState(null)
  const [showMatchPreview, setShowMatchPreview] = useState(false)
  const [showFailPlayDialog, setShowFailPlayDialog] = useState(false)
  const [previewMatch, setPreviewMatch] = useState(null)
  const [showGamepadMenu, setShowGamepadMenu] = useState(false)
  const [lineupsView, setLineupsView] = useState(ELINEUPS_VIEW_GOALS);
  const [eventsView, setEventsView] = useState(ELINEUPS_VIEW_GOALS);

  const scrollViewRef = useRef(null);

  const EVIEW_PREDICTIONS = 1
  const EVIEW_STATISTICS = 2
  const EVIEW_EVENTS = 3
  const EVIEW_LINEUPS = 4
  const EVIEW_H2H = 5
  const EVIEW_TABLE = 6
  const EVIEW_BET = 7
  const EVIEW_TOP_BETS = 8
  const EVIEW_FIREBALL = 9
  const EVIEW_FIREBALL_PREDICTS = 10
  const EVIEW_EFOOTBALL_PREDICTS = 11

  const matchSettings = dataManager.getMatchSettings()

  function getInitialView() {
    // if (game == EGAME_CAREER) return null;//EVIEW_TABLE;
    return game == EGAME_ELTORNEO || game == EGAME_CAREER || game == EGAME_WORLD_CUP ? EVIEW_PREDICTIONS : EVIEW_TOP_BETS;
  }

  const [view, setView] = useState(getInitialView())

  const backgroundStyle = {
    backgroundColor: '#37003C',
  };

  useFocusEffect(
    useCallback(() => {

      setBlockForAd(dataManager.getSettings()?.blockForAd && adsManager.isLoaded())
      setLoaded(adsManager.isLoaded())

      if (dataManager.getPendingPredict()) {
        setMe(authManager.getMeSync());
        const pp = dataManager.getPendingPredict();

        if (pp.match !== id) {
          dataManager.setPendingPredict(null);
          return;
        }
        if (isNaN(pp.team1_score) || isNaN(pp.team2_score)) {
          dataManager.setPendingPredict(null);
          return;
        }
        setTeam1Score(pp.team1_score.toString());
        setTeam2Score(pp.team2_score.toString());
      }

      // Fetch live data at intervals
      const interval = setInterval(() => {
        if (match && !isMatchLive()) {
          clearInterval(interval)
          return
        }
        getLive();
      }, 30000);

      // Cleanup interval on focus loss or unmount
      return () => clearInterval(interval);

    }, [id])
  );

  useEffect(() => {
    const token = authManager.getToken();
    const me = authManager.getMeSync();
    if (token && !me) {
      authManager.getMe(token)
        ?.then((me) => {
          authManager.me = me;
        })
        .catch(() => {

        });
    }
  }, [])

  useEffect(() => {
    if (view == EVIEW_STATISTICS) {
      fetch(`${SERVER_BASE_URL}/api/v1/match/statistics?match_id=${match.id}`, {
        method: 'GET',
      })
        .then(response => response.json())
        .then(data => {
          setStatistics(data)
        })
        .catch(error => {
          setStatistics(null)
        });
    } else if (view == EVIEW_EVENTS) {
      fetch(`${SERVER_BASE_URL}/api/v1/match/events?match_id=${match.id}`, {
        method: 'GET',
      })
        .then(response => response.json())
        .then(data => {
          setEvents(data)
        })
        .catch(error => {
          setEvents(null)
        });
    } else if (view == EVIEW_LINEUPS) {
      let query = "lineups";
      if (!isMatchEnded() && !isMatchLive()) {
        query = "lineups_stats";
      }
      fetch(`${SERVER_BASE_URL}/api/v1/match/${query}?match_id=${match.id}`, {
        method: 'GET',

      })
        .then(response => response.json())
        .then(data => {
          // if (gameState == EGAME_CAREER) {
          //   setPredictsReqFinished(true);
          // }
          setLineups(data)
        })
        .catch(error => {
          // setEvents(null)
        });
    } else if (view == EVIEW_TABLE) {
      getTable()
    } else if (view == EVIEW_BET) {
      if (odds) return
      fetch(`${SERVER_BASE_URL}/api/v1/match/odds?match_id=${match.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authentication': authManager.getToken() || ""
        },
      })
        .then(response => response.json())
        .then(data => {
          setOdds(data)
        })
        .catch(error => {
          // setEvents(null)
        });
    } else if (view == EVIEW_FIREBALL) {

    }
  }, [view])

  useEffect(() => {

    if (!dataManager.getSettings().enableAds) return
    if (!authManager.getMeSync() && !blockForAd) return

    if (adsManager.isLoaded()) {
      setLoaded(true)
    } else {
      setBlockForAd(false)
      setLoaded(false)
      adsManager.loadAd()

      adsManager.addErrorListener((e) => {
      })
    }
    adsManager.onLoad = () => {
      // setLoaded(true)
      adsManager.setIsLoaded(true)
    }

    const errorUnsubscribe = adsManager.addErrorListener((err) => {
      errorUnsubscribe()
      adsManager.setIsLoaded(false)
      setShowAd(false)
    });

    // const closeUnsubscribe = adsManager.addCloseListener((err) => {
    //   closeUnsubscribe()
    //   adsManager.setIsLoaded(false)
    //   setShowAd(false)
    // });
  }, [])

  useEffect(() => {
    if (!dataManager.getSettings().enableAds) return

    AsyncStorage.getItem('numActions')
      .then((d) => {

        let numActions = Number.parseInt(d)
        if (!numActions) {
          numActions = 0;
          AsyncStorage.setItem('numActions', numActions.toString());
        }

        if (numActions >= dataManager.getSettings().numMinAdActions || match.is_special) {
          setShowAd(true)
          setLoaded(adsManager.isLoaded())

          if (!adsManager.isLoaded()) {
            adsManager.loadAd()
            adsManager.addLoadedListener(() => {
              setLoaded(true)
              adsManager.setIsLoaded(true)
            })

            adsManager.addErrorListener(() => {

            })
          }
        }
      });

    // Unsubscribe from events on unmount
    return () => {
      //  unsubscribe();
      //  errorUnsubscribe()
      //  successUnsub()
      adsManager.onLoad = null
    }
  }, []);

  function getHeader(id) {
    fetch(`${SERVER_BASE_URL}/api/v1/match/header?match_id=${id}`, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(data => {
        // if (gameState != EGAME_CAREER) {
        setPredictsReqFinished(true)
        // }

        if (data.odds || data.statistics || data.events || data.lineups) {
          setHeader(data)
          if (gameState == EGAME_CAREER && data.lineups) {
            // setView(EVIEW_LINEUPS)
          } else if (gameState == EGAME_CAREER) {
            // setView(EVIEW_TABLE);
          }
        } else if (gameState == EGAME_CAREER) {
          // setView(EVIEW_TABLE);
        }

      })
      .catch(error => {
      });
  }

  useEffect(() => {
    getMatch()
    // getPredict()
  }, []);

  useEffect(() => {
    if (gameState == EGAME_ELTORNEO || game == EGAME_CAREER) {
      getPredicts(match)
      setView(EVIEW_PREDICTIONS)
      getPredict()
      getFireballPredict()
      getEFootbalPredict();
    } else if (gameState == EGAME_BEATBET) {
      getBetsSummary(match)
      setView(EVIEW_TOP_BETS)
      getBet()
      getFireballPredict()
      getEFootbalPredict();
    } else if (gameState == EGAME_FIREBALL) {
      getFireballSummary(match)
      setView(EVIEW_FIREBALL_PREDICTS)
      getFireballPredict()
      getEFootbalPredict();
    } else if (gameState == EGAME_EFOOTBALL) {
      getPredict()
      getEFootballSummary(match)
      setView(EVIEW_EFOOTBALL_PREDICTS)
      getFireballPredict()
      getEFootbalPredict();
    } else if (gameState == EGAME_WORLD_CUP) {
      getWorldCupPredicts(match)
      setView(EVIEW_PREDICTIONS)
      getPredict()
      getFireballPredict()
      getEFootbalPredict();
    }
  }, [gameState])

  useFocusEffect(
    useCallback(() => {
      game = dataManager.getSettings().game;
      setGameState(game)
    }, [])
  )

  function getTable() {

    fetch(`${SERVER_BASE_URL}/api/v1/league/table?league_id=${match.league}&league_index=${match.team1.league_index}`, {
      method: 'GET',
      // headers: { 'Content-Type': 'application/json' },
    })
      .then(response => response.json())
      .then(data => {
        setTable(data)

        if (gameState == EGAME_CAREER) {
          // setPredictsReqFinished(true);
        }
      })
      .catch(error => {
        console.error('Error fetching table:', error)
      });
  }

  function getFireballSummary(m) {
    if (!m) return

    setPredictsReqFinished(false)
    fetch(`${SERVER_BASE_URL}/api/v1/match/fireball/summary?match_id=${m.id}&season=${match.season}`, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(data => {
        setFireballSummary(data)
        getTop20FireballPredicts(m);
      })
      .catch(error => {
        setPredictsReqFinished(true)
        console.error('Error fetching fireball predicts:', error)

      });
  }

  function getEFootballSummary(m) {
    if (!m) return

    setPredictsReqFinished(false)
    fetch(`${SERVER_BASE_URL}/api/v1/match/efootball/summary?match_id=${m.id}&season=${match.season}`, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(data => {
        setEFootballSummary(data)
        getTop20EFootballPredicts(m);
      })
      .catch(error => {
        setPredictsReqFinished(true)
        console.error('Error fetching predicts:', error)
      });

  }

  function getBetsSummary(m) {
    if (!m) return

    setPredictsReqFinished(false)
    fetch(`${SERVER_BASE_URL}/api/v1/match/bets/summary?match_id=${m.id}&season=${match.season}`, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(data => {
        setBetsSummary(data)
        getTop20Bets(m);
      })
      .catch(error => {
        setPredictsReqFinished(true)
        console.error('Error fetching predicts:', error)
      });
  }

  function getPredicts(m) {
    if (!m) return

    setPredictsReqFinished(false)
    fetch(`${SERVER_BASE_URL}/api/v1/match/predicts?match_id=${m.id}&season=${match.season}`, {
      method: 'GET',
    })
      .then(response => {
        if (response.status != 200) {
          getPredicts(m)
          return;
        }
        return response.json()
      })
      .then(data => {
        if (!data) return;
        setPredicts(data)
        getTop3(m);
      })
      .catch(error => {
        getPredicts(m)
        // setPredictsReqFinished(true)
        console.error('Error fetching predicts:', error)
      });
  }

  function getWorldCupPredicts(m) {
    if (!m) return

    setPredictsReqFinished(false)
    fetch(`${SERVER_BASE_URL}/api/v1/match/predicts?match_id=${m.id}&season=${match.season}`, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(data => {
        setPredicts(data)
        getTop20WorldCupPredicts(m);
      })
      .catch(error => {
        setPredictsReqFinished(true)
        console.error('Error fetching predicts:', error)
      });
  }

  function getTop3(match) {
    if (!match) return

    fetch(`${SERVER_BASE_URL}/api/v3/match/predicts/top20?match_id=${match.id}&season=${match.season}`, {
      method: 'GET',
      headers: {
        'Authentication': authManager.getToken() || ""
      },
    })
      .then(response => response.json())
      .then(data => {
        setTop20Predicts(data)
        getHeader(match.id)
      })
      .catch(error => console.error('Error fetching top20 predicts:', error));
  }

  function getTop20WorldCupPredicts(match) {
    if (!match) return
    fetch(`${SERVER_BASE_URL}/api/v2/match/world_cup/top20?match_id=${match.id}&season=${match.season}`, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(data => {
        setTop20Predicts(data)
        getHeader(match.id)
      })
      .catch(error => console.error('Error fetching top3:', error));
  }

  function getTop20EFootballPredicts(match) {
    if (!match) return
    fetch(`${SERVER_BASE_URL}/api/v3/match/efootball/top20?match_id=${match.id}&season=${match.season}`, {
      method: 'GET',
      headers: {
        'Authentication': authManager.getToken() || ""
      },
    })
      .then(response => response.json())
      .then(data => {
        setTop20EFootballPredicts(data)
        getHeader(match.id)
      })
      .catch(error => {
        console.error('Error fetching top3:', error)
      });
  }

  function getTop20Bets(match) {
    if (!match) return
    fetch(`${SERVER_BASE_URL}/api/v2/match/bets/top20?match_id=${match.id}&season=${match.season}`, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(data => {
        setTop20Bets(data)
        getHeader(match.id)
      })
      .catch(error => {
        console.error('Error fetching top20 bets:', error)
      });
  }

  function getTop20FireballPredicts(match) {
    if (!match) return
    fetch(`${SERVER_BASE_URL}/api/v2/match/fireball/top20?match_id=${match.id}&season=${match.season}`, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(data => {
        setTop20FireballPredicts(data)
        getHeader(match.id)
      })
      .catch(error => {
        console.error('Error fetching top20 fireball:', error)
      });
  }

  function getFireballPredict() {
    if (!authManager.getToken()) {
      setPredictReqFinished(true)
      return
    }

    fetch(`${SERVER_BASE_URL}/api/v1/user/fireball_predict?match_id=${id}&season=${match.season}`, {
      method: 'GET',
      headers: {
        'Authentication': authManager.getToken()
      },
    })
      .then(response => response.json())
      .then(data => {
        if (!data || !Object.keys(data).length) {
          setFireballPredict(null)
          setPredictReqFinished(true)
          return
        }

        setFireballPredict(data)
        setPredictReqFinished(true)
      })
      .catch(error => {
        setPredictReqFinished(true)
        console.error('Error fetching fireball predict:', error)
      });
  }

  function getEFootbalPredict() {
    if (!authManager.getToken()) {
      setPredictReqFinished(true)
      return
    }

    fetch(`${SERVER_BASE_URL}/api/v1/user/efootball_predict?match_id=${id}&season=${match.season}`, {
      method: 'GET',
      headers: {
        'Authentication': authManager.getToken()
      },
    })
      .then(response => response.json())
      .then(data => {
        if (!data || !Object.keys(data).length) {
          setEFootballPredict(null)
          setPredictReqFinished(true)
          return
        }

        setEFootballPredict(data)
        setPredictReqFinished(true)
      })
      .catch(error => {
        setPredictReqFinished(true)
        console.error('Error fetching eFootball predict:', error)
      });
  }


  function getPredict() {
    if (!authManager.getToken()) {
      setPredictReqFinished(true)
      return
    }

    fetch(`${SERVER_BASE_URL}/api/v1/user/predict?match_id=${id}&season=${match.season}`, {
      method: 'GET',
      headers: {
        'Authentication': authManager.getToken()
      },
    })
      .then(response => response.json())
      .then(data => {

        if (!data || !Object.keys(data).length) {
          setPredict(null)
          setPredictReqFinished(true)
          return
        }

        setPredict(data)
        setPredictReqFinished(true)
      })
      .catch(error => {
        setPredictReqFinished(true)
        console.error('Error fetching eltorneo predict:', error)
      });
  }

  function getBet() {
    if (!authManager.getToken()) {
      setPredictReqFinished(true)
      return
    }

    fetch(`${SERVER_BASE_URL}/api/v1/user/bet?match_id=${id}&season=${match.season}`, {
      method: 'GET',
      headers: {
        'Authentication': authManager.getToken()
      },
    })
      .then(response => response.json())
      .then(data => {
        if (!data || !Object.keys(data).length) {
          setBet(null)
          setPredictReqFinished(true)
          return
        }

        setBet(data)
        setPredictReqFinished(true)
      })
      .catch(error => {
        setPredictReqFinished(true)
        console.error('Error fetching predict:', error)
      });
  }

  function getMatch() {
    fetch(`${SERVER_BASE_URL}/api/v1/match?match_id=${id}`, {
      method: 'GET',
      // headers: { 'Content-Type': 'application/json' },
    })
      .then(response => response.json())
      .then(data => {
        setMatch(data[0])
      })
      .catch(error => {
        console.error('Error fetching match:', error)
      });
  }

  function getLive() {
    fetch(`${SERVER_BASE_URL}/api/v1/match/live?match_id=${id}`, {
      method: 'GET',
      // headers: { 'Content-Type': 'application/json' },
    })
      .then(response => response.json())
      .then(data => {
        setMatch(prevMatch => ({ ...prevMatch, ...data }));
        if (data?.status == "FT") {
          getPredicts(match)
        }
      })
      .catch(error => {
        console.error('Error fetching leagues:', error)
      });
  }

  function onAddSuccess() {
    setProcessing(true)

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authentication': authManager.getToken()
      },
      body: JSON.stringify({
        match: id,
        team1_score: Number.parseInt(team1Score),
        team2_score: Number.parseInt(team2Score)
      })
    };

    fetch(`${SERVER_BASE_URL}/api/v1/predicts`, requestOptions)
      .then(response => {
        if (response.status == 403) {
          setShowFailPlayDialog(true)
          setProcessing(false)
          return
        }
        return response.json()
      })
      .then(data => {
        dmMatch.predict = {
          id: data.predict_id,
          team1_score: Number.parseInt(team1Score),
          team2_score: Number.parseInt(team2Score),
          match_id: match.id,
          status: 0
        }

        setPredict(dmMatch.predict)
        setProcessing(false)

        return null
      })
      .catch((e) => {
        setProcessing(false)
      });
  }

  function reloadAdOnClose(toastMsg) {
    if (!adsManager.getRewarded()) {
      showToast(toastMsg)
      adsManager.setIsLoaded(false)
      setAdClosed(true)
      adsManager.loadAd()

      adsManager.onLoad = () => {
        setAdClosed(false)
        setLoaded(true)
        adsManager.setIsLoaded(true)
      }
    } else {
      setAdClosed(false)
    }

    setLoaded(false)
    adsManager.setIsLoaded(false)
  }

  function onSaveAdSuccess() {
    setMode(EMODE_DEFAULT)
    setProcessing(true)

    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authentication': authManager.getToken()
      },
      body: JSON.stringify({
        predict: predict.id,
        team1_score: Number.parseInt(team1Score),
        team2_score: Number.parseInt(team2Score),
        match_id: match.id
      })
    };

    fetch(`${SERVER_BASE_URL}/api/v1/predicts`, requestOptions)
      .then(response => {
        if (response.status == 403) {
          setShowFailPlayDialog(true)
          setProcessing(false)
          return
        }

        setPredict({
          id: predict.id,
          user_id: predict.user_id,
          team1_score: team1Score,
          team2_score: team2Score,
          match_id: predict.match_id,
          status: predict.status
        })
        dmPredict.team1_score = team1Score
        dmPredict.team2_score = team2Score

        setProcessing(false)
        return null
      })
      .then(data => {
        setProcessing(false)
      })
      .catch(() => {
        setProcessing(false)
      });
  }

  function onUnlock() {
    adsManager.showAd()

    const successUnsub = adsManager.addSuccessListener(() => {
      successUnsub()
      adsManager.setIsLoaded(false)
      setBlockForAd(false)
      AsyncStorage.setItem("lastAdTime", (new Date()).getTime().toString())
      dataManager.getSettings().blockForAd = false

      if (showAd) {
        if (adsManager.isLoaded()) {
          setLoaded(true)
        } else {
          setTimeout(() => {
            adsManager.loadAd()
            adsManager.onLoad = () => {
              setLoaded(true)
            }
          }, 200)
        }

        const errorUnsubscribe = adsManager.addErrorListener((err) => {
          errorUnsubscribe()
          adsManager.setIsLoaded(false)
          setShowAd(false)
        });
      }
    })

    const closeUnsub = adsManager.addCloseListener(() => {
      closeUnsub()
      reloadAdOnClose(strings.unlock_ad_msg)
    })
  }

  function showToast(msg) {
    ToastAndroid.show(msg, ToastAndroid.LONG);
  }

  const askForRating = () => {
    if (InAppReview.isAvailable()) {
      InAppReview.RequestInAppReview()
        .then((hasFlowFinishedSuccessfully) => {
          console.log('In-app review flow finished?', hasFlowFinishedSuccessfully);
        })
        .catch((error) => {
          console.log('In-app review error:', error);
        });
    } else {
      console.log('In-app review not available');
    }
  };

  function onPredict() {
    if (!authManager.getMeSync()) {
      if (!isNaN(Number.parseInt(team1Score)) && !isNaN(Number.parseInt(team2Score))) {
        dataManager.setPendingPredict({
          match: id,
          team1_score: Number.parseInt(team1Score),
          team2_score: Number.parseInt(team2Score)
        })
      }
      gsingin.signin(null, (me) => {
        setMe(me)
        getPredict()
      })

      // navigation.navigate('Login')
      return
    }

    if (showAd) {
      if (loaded || adsManager.isLoaded()) {
        adsManager.showAd()

        const successUnsub = adsManager.addSuccessListener(() => {
          successUnsub()
          adsManager.setIsLoaded(false)
          setShowAd(false)
          onAddSuccess()
          AsyncStorage.setItem('numActions', '0');
          setBlockForAd(false)
          dataManager.getSettings().blockForAd = false

          setLoaded(false)
          setTimeout(() => {
            adsManager.loadAd()
            adsManager.addLoadedListener(() => {
              setLoaded(true)
              adsManager.setIsLoaded(true)
            })
          }, 300)
        })

        const closeUnsub = adsManager.addCloseListener(() => {
          reloadAdOnClose(strings.predict_ad_msg)
          closeUnsub()
        })

        return
      } else {
        onAddSuccess()
        setShowAd(false)
      }

    } else {
      onAddSuccess()
      setShowAd(false)
      AsyncStorage.getItem('numActions')
        .then((d) => {
          let numActions = Number.parseInt(d)
          if (!numActions) numActions = 0;

          ++numActions;
          AsyncStorage.setItem('numActions', numActions.toString());
        });

      if (dataManager.getSettings().showInAppReview) {
        logEvent(analyticsInstance, 'button_click', {
          'button_name': 'AskForReviewClick',
        })
        askForRating();
        dataManager.getSettings().showInAppReview = false;
      }
    }
  }

  function onSavePredict() {
    if (showAd) {
      if (loaded || adsManager.isLoaded()) {
        adsManager.showAd()

        const successUnsub = adsManager.addSuccessListener(() => {
          successUnsub()
          adsManager.setIsLoaded(false)
          setShowAd(false)
          onSaveAdSuccess()
          AsyncStorage.setItem('numActions', '0');
          setBlockForAd(false)
          dataManager.getSettings().blockForAd = false
        })

        const closeUnsub = adsManager.addCloseListener(() => {
          reloadAdOnClose(strings.predict_edit_ad_msg)
          closeUnsub()
        })
        return
      }
      else {
        onSaveAdSuccess()
        setShowAd(false)
        AsyncStorage.getItem('numActions')
          .then((d) => {
            let numActions = Number.parseInt(d)
            if (!numActions) numActions = 0;

            ++numActions;
            AsyncStorage.setItem('numActions', numActions.toString());
          });
      }

    } else {
      onSaveAdSuccess()
      setShowAd(false)
      AsyncStorage.getItem('numActions')
        .then((d) => {
          let numActions = Number.parseInt(d)
          if (!numActions) numActions = 0;

          ++numActions;
          AsyncStorage.setItem('numActions', numActions.toString());
        });
    }

  }

  function onTeam1Change(e) {
    const numericText = e.replace(/[^0-9]/g, '');
    setTeam1Score(numericText)
  }

  function onTeam2Change(e) {
    const numericText = e.replace(/[^0-9]/g, '');
    setTeam2Score(numericText)
  }

  function isScoreReady() {
    return team1Score.length > 0 && team2Score.length > 0 && Number.parseInt(team1Score) >= 0 && Number.parseInt(team2Score) >= 0
  }

  function isShowScoreInput() {
    if (!match) return false

    if (isMatchEnded()) return false
    if (isMatchLive()) return false
    let game = dataManager.getSettings().game;
    if (game != EGAME_ELTORNEO && game != EGAME_CAREER && gameState != EGAME_WORLD_CUP) return false;

    if (match.week < match.currentWeek && match.team1_score != -1 && match.team2_score != -1) return false

    if (predict) {
      if (mode == EMODE_EDIT)
        return true

      return false
    }

    return true
  }

  function isMatchLive() {
    if (match.status == 'PST') return false;
    if (match?.date < new Date().getTime() && (match?.team1_score < 0 || match?.team2_score < 0)) return true

    return false
  }

  function isMatchEnded() {
    return match?.team1_score >= 0 && match?.team2_score >= 0
  }

  function isShowScoreText() {
    if (isMatchLive()) return false
    if (isShowScoreInput()) return false
    if (!isMatchEnded()) return false

    return true
  }

  function isShowTopMatchTime() {
    if (gameState == EGAME_FIREBALL || game == EGAME_BEATBET || gameState == EGAME_EFOOTBALL) return false;

    if (isMatchLive()) return false;
    if (isMatchEnded()) return false;
    if (predict) return false
    if (bet) return false
    return true
  }

  function isPredictDisabled() {
    if (processing) return true
    if (!isScoreReady() && !!authManager.getMeSync()) {
      return true
    }
    // if (showAd && !loaded) return true

    if (adClosed) return true

    return false
  }

  function isSaveDisabled() {
    if (processing) return true
    if (!isScoreReady() && !!authManager.getMeSync()) {
      return true
    }
    // if (showAd && !loaded) return true

    if (adClosed) return true

    return false
  }

  function getStatusBorderColor(m) {
    if (m.status == 'ABD' || m.status == 'INT') return "#FF474719"
    return '#34C75918';
  }

  function getStatusBGColor(m) {
    if (m.status == 'ABD' || m.status == 'INT') return Colors.fail
    return Colors.success
  }

  function getStatusText() {
    if (match.status == 'HT' || match.status == 'FT' || match.status == 'BT' || match.status == "P" || match.status == "ABD" || match.status == 'INT') return match.status

    return '  ' + match.elapsed + " '"
  }

  function onSetEditMode() {
    if (dataManager.getSettings().enableAds) setShowAd(true)
    setMode(EMODE_EDIT)
  }

  function onShowMatchPress(match) {
    match.isTeaser = false
    setShowMatchPreview(true)
    setPreviewMatch(match)
  }

  function onShowMatchTrailerPress(match) {
    match.isTeaser = true
    setShowMatchPreview(true)
    setPreviewMatch(match)
  }

  function onCloseMatchPreview() {
    setShowMatchPreview(false)
  }

  function getScoreBottonMargin() {
    if (isMatchLive()) {
      return 37
    }

    // if (match.playOff && isMatchEnded() && match.team1_score_90 > -1 && match.team2_score_90 > -1 && match.team1_score_pen > -1 && match.team2_score_pen > -1) return 10
    if (match.team1_score_pen > -1) return 20;
    if (match.playOff && isMatchEnded() && match.team1_score_90 > -1 && match.team2_score_90 > -1) return 35
    if (isMatchEnded() && match.team1_score_90 > -1 && match.team2_score_90 > -1 && match.team1_score_pen > -1 && match.team2_score_pen > -1) return 20;
    if (isMatchLive() || isMatchEnded()) return 55
    if (isShowScoreInput()) {
      return 55;
    }

    return 30
  }

  function onChangeGame(g) {
    setGameState(dataManager.getSettings().game);
  }

  function onShowGamepadMenu() {
    setShowGamepadMenu(true)
  }

  function renderBetPanel() {
    return <View>
      {bet ? <View style={{
        width: '100%',
        height: 30,
        // paddingBottom: 10,
        // backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <View style={{
          // borderWidth: 1,
          backgroundColor: Colors.mode == 1 ? "#F7F7F7" : Colors.selectColor,
          // borderColor: match.is_special ? 'gold' : getBorderColor(match.predict),
          alignItems: 'center',
          // borderWidth: match.is_special ? 1 : 0,
          justifyContent: 'center',
          borderRadius: 15,
          paddingLeft: 15,
          paddingRight: match.playOff ? 2 : 15,
          flexDirection: 'row',
          height: 30,
          // marginTop: 2
        }}>
          <Text style={{
            fontSize: 14,
            // marginBottom: 2,
            color: Colors.titleColor,
            fontFamily: 'Roboto-Bold',
            // fontFamily: 'NotoSansArmenian-Bold'
          }}>{strings.bet} {dataManager.getBetString(bet.bet)}</Text>
          <Text style={{
            fontSize: 14,
            // marginBottom: 2,
            color: '#AEAEB2',
            fontFamily: 'Roboto-Bold',
            // fontFamily: 'NotoSansArmenian-Bold'
          }}>({bet.odd.toFixed(2)})</Text>
          <Text style={{
            fontSize: 14,
            marginLeft: 10,
            // marginBottom: 2,
            color: dataManager.getBetStatusColor(bet),
            fontFamily: 'Roboto-Bold',
            // fontFamily: 'NotoSansArmenian-Bold'
          }}>{dataManager.getBetStatusValue(bet, match.is_special)}</Text>

          {/* {match.playOff ? <View style={{
            width: 18,
            height: 18,
            // backgroundColor: dataManager.get90BGColor(),
            borderRadius: 9,
            marginLeft: 6,
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Text style={{
              fontSize: 12,
              fontWeight: 900,
              // color: dataManager.get90TitleColor()
            }}>90</Text>
          </View> : null} */}
        </View>
      </View> : null}
    </View>
  }

  function PredictButton() {
    if (Colors.mode == 3) {
      return <TouchableOpacity onPress={onPredict} disabled={isPredictDisabled()} activeOpacity={.8} style={{
        opacity: !isPredictDisabled() ? 1 : .8
      }}>

        <ImageBackground source={dataManager.getButtonGradientExtraLarge(match.league)} style={{
          height: 30,
          width: 'auto',
          paddingLeft: authManager.getMeSync() ? 20 : 10,
          paddingRight: authManager.getMeSync() && match.playOff ? 4 : 20,
          borderRadius: 20,
          overflow: 'hidden',
          borderWidth: 1,
          borderColor: '#00FFFF',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row'
        }}>

          {!authManager.getMeSync() ?
            <View style={{
              width: 20,
              height: 20,
              marginRight: 6,
              backgroundColor: 'white',
              borderRadius: 12,
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <GoogleIcon width={16} height={18} />
            </View>
            : null}
          <Text style={{
            color: Colors.mode == 3 && match.league == 6 ? 'black' : 'white',
            fontFamily: "Roboto-Bold"
          }}>{authManager.getMeSync() ? strings.predict : strings.sign_in_to_predict}</Text>
          {authManager.getMeSync() && match.playOff ?
            <View style={{
              width: 22,
              height: 22,
              backgroundColor: 'white',
              borderRadius: 11,
              marginLeft: 6,
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Text style={{
                color: 'black',
                fontWeight: 900,
                fontSize: 12
              }}>90</Text>
            </View>
            : null}
          {showAd && loaded && authManager.getMeSync() ? <Icon name='play-circle-filled' size={20} color='white' style={{
            marginLeft: 4
          }} /> : null}
          {showAd && !loaded && adClosed ? <ActivityIndicator color={'white'} style={{
            marginLeft: 10
          }} size={'small'} /> : null}
        </ImageBackground>
      </TouchableOpacity>
    }

    if (Colors.mode == 4) {
      return <TouchableOpacity onPress={onPredict} disabled={isPredictDisabled()} activeOpacity={.8} style={{
        opacity: !isPredictDisabled() ? 1 : .8
      }}>

        <ImageBackground source={dataManager.getButtonGradientLargeFC27(match.league)} style={{
          height: 30,
          width: 'auto',
          paddingLeft: authManager.getMeSync() ? 20 : 10,
          paddingRight: authManager.getMeSync() && match.playOff ? 4 : 20,
          borderRadius: 20,
          overflow: 'hidden',
          borderWidth: 1,
          borderColor: 'white',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row'
        }}>

          {!authManager.getMeSync() ?
            <View style={{
              width: 20,
              height: 20,
              marginRight: 6,
              backgroundColor: 'white',
              borderRadius: 12,
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <GoogleIcon width={16} height={18} />
            </View>
            : null}
          <Text style={{
            color: 'black',
            fontFamily: "Roboto-Bold"
          }}>{authManager.getMeSync() ? strings.predict : strings.sign_in_to_predict}</Text>
          {authManager.getMeSync() && match.playOff ?
            <View style={{
              width: 22,
              height: 22,
              backgroundColor: 'white',
              borderRadius: 11,
              marginLeft: 6,
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Text style={{
                color: 'black',
                fontWeight: 900,
                fontSize: 12
              }}>90</Text>
            </View>
            : null}
          {showAd && loaded && authManager.getMeSync() ? <Icon name='play-circle-filled' size={20} color='white' style={{
            marginLeft: 4
          }} /> : null}
          {showAd && !loaded && adClosed ? <ActivityIndicator color={'white'} style={{
            marginLeft: 10
          }} size={'small'} /> : null}
        </ImageBackground>
      </TouchableOpacity>
    }

    return <TouchableOpacity onPress={onPredict} disabled={isPredictDisabled()} activeOpacity={.8} style={{
      opacity: !isPredictDisabled() ? 1 : .8
    }}>

      <View style={{
        height: 30,
        width: 'auto',
        paddingLeft: authManager.getMeSync() ? 20 : 10,
        paddingRight: authManager.getMeSync() && match.playOff ? 4 : 20,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.primary,
        flexDirection: 'row'
      }}>
        {!authManager.getMeSync() ?
          <View style={{
            width: 20,
            height: 20,
            marginRight: 6,
            backgroundColor: 'white',
            borderRadius: 12,
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <GoogleIcon width={16} height={18} />
          </View>
          : null}
        <Text style={{
          color: 'white',
          fontFamily: "Roboto-Bold"
        }}>{authManager.getMeSync() ? strings.predict : strings.sign_in_to_predict}</Text>
        {authManager.getMeSync() && match.playOff ?
          <View style={{
            width: 22,
            height: 22,
            backgroundColor: 'white',
            borderRadius: 11,
            marginLeft: 6,
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Text style={{
              color: 'black',
              fontWeight: 900,
              fontSize: 12
            }}>90</Text>
          </View>
          : null}
        {showAd && loaded && authManager.getMeSync() ? <Icon name='play-circle-filled' size={20} color='white' style={{
          marginLeft: 4
        }} /> : null}
        {showAd && !loaded && adClosed ? <ActivityIndicator color={'white'} style={{
          marginLeft: 10
        }} size={'small'} /> : null}
      </View>
    </TouchableOpacity>
  }

  function renderPredictPanel() {
    return (!isMatchEnded() && !isMatchLive()) || predict ? <View style={{
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    }}>

      {match.is_special ? <SpecialAwardPanel match={match} /> : null}

      {mode == EMODE_DEFAULT && isShowScoreInput() ? <PredictButton /> : null}

      {predict ? <View style={{
        flexDirection: 'row',
        // backgroundColor: 'red'
      }}>
        {mode == EMODE_DEFAULT ? <View style={{
          height: 30,
          paddingLeft: 20,
          paddingRight: match.playOff ? 4 : 20,
          // borderWidth: 1,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 15,
          overflow: 'hidden',
          flexDirection: 'row',
          backgroundColor: dataManager.getPredictBgColor(predict),
          borderColor: dataManager.getPredictBorderColor(predict)
        }}>
          <Text style={{
            marginBottom: 2,
            color: dataManager.getPredictBorderColor(predict),
            fontFamily: 'NotoSansArmenian-Bold'
          }}>{dataManager.getPredictTitle(predict)}{dataManager.getPredictValue(predict)}</Text>

          {match.playOff ? <View style={{
            width: 22,
            height: 22,
            backgroundColor: Colors.gray800,
            borderRadius: 11,
            marginLeft: 8,
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Text style={{
              color: Colors.titleColor,
              fontWeight: 900,
              fontSize: 12
            }}>90</Text>
          </View> : null}

        </View> : <TouchableOpacity onPress={onSavePredict} disabled={isSaveDisabled()} activeOpacity={.8} style={{
          opacity: !isSaveDisabled() ? 1 : .8
        }}>
          <View style={{
            height: 30,
            width: 'auto',
            // paddingLeft: 20,
            // paddingRight: 20,
            borderRadius: 20,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#fb2781',
            flexDirection: 'row',
            overflow: 'hidden',
            borderWidth: Colors.mode == 3 ? 1 : 0,
            borderColor: Colors.gradientBorderColor,
          }}>
            {Colors.mode == 3 ? <Image source={dataManager.getButtonGradientLarge(match.league)} style={{
              width: '100%',
              height: '100%',
              position: 'absolute'
            }} /> : null}
            <Text style={{
              marginHorizontal: 20,
              color: 'white',
              fontFamily: 'NotoSansArmenian-Bold'
            }}>{strings.save}</Text>
            {showAd && loaded ? <Icon name='play-circle-filled' size={20} color='white' style={{
              marginLeft: 4
            }} /> : null}
            {showAd && !loaded && adClosed ? <ActivityIndicator color={'white'} style={{
              marginLeft: 4
            }} size={'small'} /> : null}
          </View>
        </TouchableOpacity>}
        {!isMatchEnded() && !isMatchLive() && predict && mode == EMODE_DEFAULT ? <TouchableOpacity onPress={onSetEditMode} activeOpacity={.8} style={{
          width: 30,
          height: 30,
          marginLeft: 10,
          borderRadius: 15,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#FF2882',
          overflow: 'hidden',
          borderWidth: Colors.mode == 3 ? 1 : 0,
          borderColor: Colors.gradientBorderColor,
        }}>
          {Colors.mode == 3 ? <Image source={dataManager.getButtonGradient(match.league)} style={{
            width: '100%',
            height: '100%',
            position: 'absolute'
          }} /> : null}
          <Icon size={20} name={'edit'} color='white'></Icon>
        </TouchableOpacity> : null}
      </View> : null}

    </View> : null
  }

  function getFireballStatusText() {
    if (fireballPredict == 0) return;
    const iconSize = 22
    if (fireballPredict.status == -1) {
      return `${strings.not_played} ${match.is_special ? '(0)' : '(0)'}`
    } else if (fireballPredict.status == 4) {
      return `${strings.not_scored} ${match.is_special ? '(-2)' : '(-1)'}`
    } else if (fireballPredict.status == 1) {
      const numGoals = fireballPredict.goals;
      const points = match.isSpecial ? 6 * numGoals : 3 * numGoals;
      return <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {Array.from({ length: numGoals }).map((_, idx) => (
          <GoalsIcon
            key={idx}
            width={iconSize}
            height={iconSize}
            style={{ marginRight: 4 }}
          />
        ))}
        <View style={{
          width: iconSize + 1,
          height: iconSize + 1,
          borderRadius: iconSize / 2 + 1,
          borderWidth: 1,
          alignItems: 'center',
          justifyContent: 'center',
          borderColor: Colors.success,
          backgroundColor: '#00C56619'
        }}>
          <Text style={{
            fontWeight: '900',
            fontSize: points > 9 ? 10 : 12,
            color: Colors.success,
          }}>{match.is_special ? `+${6 * fireballPredict.goals}` : `+${3 * fireballPredict.goals}`}</Text>
        </View>
      </View>
    }
  }

  function onDeleteFireballPredict() {
    setFireballPredict(null)

    const requestOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authentication': authManager.getToken()
      }
    };

    fetch(`${SERVER_BASE_URL}/api/v1/fireball?id=${fireballPredict.id}`, requestOptions)
      .then(response => {
        if (response.status == 403) {

          return
        }
        return response.json()
      })
      .then(data => {
        return null
      })
      .catch((e) => {
      });
  }

  function renderEFootballPredictPanel() {
    if (!eFootballPredict || eFootballPredict.status < 1) return;
    let status = '';
    if (eFootballPredict.status == 1) {
      status = strings.win
    }
    if (eFootballPredict.status == 2) {
      status = strings.lost
    }
    if (eFootballPredict.status == 3) {
      status = strings.draw
    }

    return <View style={{
      height: 30,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <View style={{
        paddingHorizontal: 15,
        borderRadius: 15,
        height: 26,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: dataManager.getEFootballPredictBgColor(eFootballPredict, false)
      }}>
        <Text style={{
          fontFamily: 'NotoSansArmenian-Bold',
          color: dataManager.getEFootballPredictBorderColor(eFootballPredict, false),
        }}>{status} ({eFootballPredict.points > 0 ? "+" : ""}{eFootballPredict.points})</Text>
      </View>
    </View>
  }

  function renderFireballPredictPanel() {
    if (!fireballPredict) return;

    const team = fireballPredict.team_id == match.team1.id ? match.team1 : match.team2;

    return (!isMatchEnded() && !isMatchLive()) || fireballPredict ? <View style={{
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      {fireballPredict ? <View style={{
        flexDirection: 'row',
        // backgroundColor: 'red'
      }}>
        <View style={{
          // height: 30,
          // paddingLeft: 20,
          // paddingRight: match.playOff ? 4 : 20,
          // borderWidth: 1,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 15,
          flexDirection: 'row',
        }}>
          {/* <View style={{
            width: 40,
            height: 40,
            left: 0,
            position: 'absolute'
          }}>
            <PlayerImage team={team} player={{ apiId: fireballPredict.player_api_id }} imageSize={40} />
          </View> */}
          <View style={{
            flexShrink: 1,
            maxWidth: fireballPredict.player_name.length > 20 ? '80%' : '100%',

            alignItems: 'center',
            // backgroundColor: 'blue',
            justifyContent: 'center'
          }}>
            {isMatchEnded() && fireballPredict.status != 0 ? <View>
              <Text style={{
                color: Colors.fail,
                fontFamily: 'Roboto-Bold',
                fontSize: 12,
              }}>{getFireballStatusText()}</Text>
            </View> : null}
            <Text numberOfLines={1} style={{
              // width: '50%',
              // flexShrink: 1,
              // backgroundColor: 'red',
              fontSize: 16,
              // backgroundColor: 'red',
              // marginBottom: 2,
              color: Colors.titleColor,
              fontFamily: 'Roboto-Bold'
            }}>{fireballPredict.player_name}</Text>
            <Text style={{
              // marginTop: -2,
              marginBottom: 2,
              fontSize: 12,
              color: '#8E8E93',
              fontFamily: 'Roboto-Bold'
            }}>{team.name}</Text>
          </View>
          {!isMatchEnded() && !isMatchLive() ? <TouchableOpacity activeOpacity={.8} onPress={onDeleteFireballPredict} style={{
            width: 35,
            height: 35,
            marginLeft: 10,
            borderRadius: 20,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#FF4747'
          }}>
            <Icon name="close" size={20} color={'white'} />
          </TouchableOpacity> : null}
        </View>

      </View> : null}

    </View> : null
  }

  function renderMatchDateView() {
    // if (game == EGAME_FIREBALL /*|| game == EGAME_CAREER*/) {
    //   if (!isMatchLive() && !isMatchEnded()) return <MatchDateView match={match} />
    //   return null;
    // }

    // if (game == EGAME_BEATBET) {
    //   if (!isMatchLive() && !isMatchEnded() && bet) return <MatchDateView match={match} />

    //   return null
    // }

    return !isMatchLive() && !isMatchEnded() && !isShowScoreInput() ?
      <View style={{
      }}>
        {Colors.mode == 3 ? <VersusFC26Icon width={60} height={60} style={{
          marginBottom: -12
        }} /> : <VersusIcon width={60} height={60} style={{
          marginBottom: -12
        }} />}
        <MatchDateView match={match} />
      </View> : null
  }

  function maybeRenderBetButton() {
    if (game != EGAME_BEATBET) return;
    if (isMatchEnded() || isMatchLive() || bet) return;

    return <TouchableOpacity disabled={!header?.odds} activeOpacity={.8} onPress={() => { setView(EVIEW_BET) }} style={{
      width: 50,
      height: 50,
      borderRadius: 70,
      opacity: header?.odds ? 1 : .5,
      top: 10,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#37003C'
    }}>
      <BBIcon width={30} height={30} />
    </TouchableOpacity>
  }

  function maybeRenderInputDots() {
    if (game == EGAME_FIREBALL /*|| game == EGAME_CAREER*/) {
      if (isMatchLive() || !isMatchEnded()) return null;
      return <Text style={{
        fontSize: 30,
        height: 30,
        lineHeight: 30,
        marginBottom: isShowScoreInput() ? -4 : 3,
        fontFamily: 'Roboto-Bold',
        textAlignVertical: isShowScoreInput() ? 'center' : 'top',
        paddingBottom: 6,
        color: Colors.titleColor
      }}>:</Text>
    }

    if (game == EGAME_BEATBET) {
      if (isMatchLive() || !isMatchEnded()) return null;
      if (!bet && !isMatchEnded()) return null

      return <Text style={{
        fontSize: 30,
        height: 30,
        lineHeight: 30,
        marginBottom: isShowScoreInput() ? -4 : 3,
        fontFamily: 'Roboto-Bold',
        textAlignVertical: isShowScoreInput() ? 'center' : 'top',
        paddingBottom: 6,
        color: Colors.titleColor
      }}>:</Text>
    }

    return (!isMatchLive() && isMatchEnded()) || isShowScoreInput() ? <Text style={{
      fontSize: 30,
      height: '100%',
      // lineHeight: 30,
      fontFamily: "NotoSansArmenian-Bold",
      marginBottom: isShowScoreInput() ? -4 : 3,
      alignItems: 'center',
      justifyContent: 'center',
      // backgroundColor: 'red',
      // textAlignVertical: 'center',
      // paddingBottom: 6,
      color: Colors.titleColor
    }}>:</Text> : null
  }

  function onFireballPredict(fp) {
    // if (fireballPredict) return;
    if (isMatchEnded() || isMatchLive()) return;

    setFireballPredict(fp)

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authentication': authManager.getToken()
      },
      body: JSON.stringify({
        matchId: fp.match_id,
        teamId: fp.team_id,
        playerApiId: fp.player_api_id,
        playerName: fp.player_name,
        playerPhoto: fp.player_photo
      })
    };

    fetch(`${SERVER_BASE_URL}/api/v1/fireball/predict`, requestOptions)
      .then(response => {
        if (response.status == 403) {
          return
        }
        return response.json()
      })
      .then(data => {
        return null
      })
      .catch((e) => {
        // setProcessing(false)
      });
  }

  function onPlayerClick(player, team) {
    // if (game != EGAME_FIREBALL) return;

    const fp = {
      match_id: match.id,
      team_id: team.id,
      player_api_id: player.apiId,
      player_name: player.name,
      player_photo: player.photo ? player.photo : ""
    }
    onFireballPredict(fp)
  }

  function onFireballClick() {
    if (header?.lineups) {
      setView(EVIEW_LINEUPS)
    } else {
      setView(EVIEW_FIREBALL)
    }
  }

  const insets = useSafeAreaInsets();

  function renderScorePanel() {
    if (isMatchEnded() && match.status != 'AET' && match.status != 'PEN') {
      return <View style={{
        position: 'absolute',
        flexDirection: 'row',
        // backgroundColor: 'blue',
        // height: '100%',
        // width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 50
      }}>
        <Text style={{
          width: 40,
          // height: 30,
          fontSize: 30,
          // lineHeight: 30,
          color: Colors.titleColor,
          textAlign: 'right',
          // paddingRight: 5,
          fontFamily: 'OpenSans-Bold'
        }}>{match?.team1_score}</Text>
        <Text style={{
          // width: 40,
          // height: 30,
          fontSize: 30,
          marginBottom: 4,
          marginHorizontal: 10,
          // lineHeight: 30,
          color: Colors.titleColor,
          // textAlign: 'left',
          // paddingRight: 5,
          fontFamily: 'Roboto-Bold'
        }}>:</Text>
        <Text style={{
          width: 40,
          // height: 30,
          fontSize: 30,
          // lineHeight: 30,
          color: Colors.titleColor,
          textAlign: 'left',
          // paddingRight: 5,
          fontFamily: 'OpenSans-Bold'
        }}>{match?.team2_score}</Text>
      </View>
    }

    return <View style={{
      position: 'absolute',
      flexDirection: 'column',
      // backgroundColor: 'green',
      // height: '100%',
      // width: '50%',
      alignItems: 'center',
      justifyContent: 'center',
      bottom: getScoreBottonMargin()
    }}>
      <View style={{
        flexDirection: 'row',
        // backgroundColor: 'red',
        // width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
      }}>

        {(game == EGAME_ELTORNEO || game == EGAME_CAREER || game == EGAME_EFOOTBALL || game == EGAME_WORLD_CUP) && isShowScoreInput() ? <TextInput maxLength={1} keyboardType='numeric' inputMode='numeric' value={team1Score} onChangeText={onTeam1Change} style={{
          width: 45,
          marginRight: 4,
          height: 50,
          fontSize: 20,
          textAlign: 'center',
          color: Colors.titleColor,
          backgroundColor: Colors.mode == 1 ? '#00000011' : '#ffffff11',
          borderRadius: 10,
          fontFamily: 'OpenSans-Bold'
        }}></TextInput> : null}
        {isShowScoreText() ? <Text style={{
          width: 40,
          height: 30,
          fontSize: 30,
          lineHeight: 30,
          color: Colors.titleColor,
          textAlign: 'right',
          paddingRight: 10,
          fontFamily: 'OpenSans-Bold'
        }}>{match?.team1_score}</Text> : null}

        {isMatchLive() ?
          <View style={{
            marginTop: 20
          }}>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              // marginTop: 20,
              marginBottom: 2
            }}>
              <Text style={{
                color: Colors.titleColor,
                fontSize: 24,
                fontFamily: 'Roboto-Bold',
                marginRight: 10
              }}>{match.team1_score_live}</Text>
              <Text style={{
                color: Colors.titleColor,
                fontSize: 20,
                fontFamily: 'Roboto-Bold',
              }}>:</Text>
              <Text style={{
                color: Colors.titleColor,
                fontSize: 24,
                fontFamily: 'Roboto-Bold',
                marginLeft: 10
              }}>{match.team2_score_live}</Text>
            </View>
            <View style={{
              // marginTop: 4,
              backgroundColor: getStatusBorderColor(match),
              borderWidth: 1,
              borderColor: getStatusBGColor(match),
              paddingLeft: 8,
              paddingRight: 8,
              marginBottom: 8,
              height: 30,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 15
            }}>
              <Text style={{
                width: 40,
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'NotoSansArmenian-Bold',
                fontSize: 14,
                color: getStatusBGColor(match),
                textAlign: 'center'
              }}>{getStatusText()}</Text>
            </View>
          </View> : null}

        {maybeRenderInputDots()}
        {renderMatchDateView()}
        {/* {maybeRenderBetButton()} */}

        {(game == EGAME_ELTORNEO || game == EGAME_CAREER || game == EGAME_EFOOTBALL || game == EGAME_WORLD_CUP) && isShowScoreInput() ? <TextInput maxLength={1} keyboardType='numeric' value={team2Score} onChangeText={onTeam2Change} style={{
          width: 45,
          height: 50,
          marginLeft: 4,
          fontSize: 20,
          backgroundColor: Colors.mode == 1 ? '#00000011' : '#ffffff11',
          borderRadius: 10,
          color: Colors.titleColor,
          textAlign: 'center',
          fontFamily: 'OpenSans-Bold'
        }}></TextInput> : null}

        {isShowScoreText() ? <Text style={{
          width: 40,
          // marginRight: 4,
          lineHeight: 30,
          height: 30,
          fontSize: 30,
          color: Colors.titleColor,
          textAlign: 'left',
          paddingLeft: 10,
          // backgroundColor: '#00000011',
          // borderRadius: 10,
          fontFamily: 'OpenSans-Bold'
        }}>{match?.team2_score}</Text> : null}
      </View>

      {match.status == 'AET' || match.status == 'PEN' ? <View style={{
        // width: '100%',
        height: 24,
        // marginTop: -4,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        paddingLeft: 15,
        paddingRight: 2,
        borderRadius: 11,
        borderWidth: 1,
        borderColor: Colors.titleColor,
      }}>
        <View>
          <Text style={{
            fontSize: 14,
            fontFamily: 'Roboto-Bold',
            color: Colors.titleColor
            // color: Colors.gray800,
          }}>{match.team1_score_90} : {match.team2_score_90}</Text>
        </View>
        <View style={{
          width: 18,
          height: 18,
          marginLeft: 6,
          backgroundColor: Colors.titleColor,
          // backgroundColor: Colors.gray800,
          borderRadius: 9,
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Text style={{
            color: Colors.gray800,
            // color: Colors.titleColor,
            fontWeight: 900,
            fontSize: 11
          }}>90</Text>
        </View>
      </View> : null}

      {match.status == 'PEN' ? <View style={{
        marginTop: 4,
        height: 24,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        paddingLeft: 15,
        paddingRight: 2,
        borderRadius: 11,
        borderWidth: 1,
        borderColor: Colors.titleColor,
        // backgroundColor: Colors.titleColor
      }}>
        <View>
          <Text style={{
            fontSize: 14,
            fontFamily: 'Roboto-Bold',
            color: Colors.titleColor
            // color: Colors.gray800
          }}>{match.team1_score_pen} : {match.team2_score_pen}</Text>
        </View>
        <View style={{
          // marginTop:
          paddingLeft: 4,
          paddingRight: 4,
          height: 18,
          marginLeft: 6,
          backgroundColor: Colors.titleColor,
          // backgroundColor: Colors.gray800,
          borderRadius: 10,
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Text style={{
            // color: Colors.titleColor,
            color: Colors.gray800,
            fontWeight: 900,
            fontSize: 11
          }}>PEN</Text>
        </View>
      </View> : null}

    </View>
  }

  function onChangeLineupsView() {
    if (lineupsView == ELINEUPS_VIEW_GOALS) setLineupsView(ELINEUPS_VIEW_RATING)
    else setLineupsView(ELINEUPS_VIEW_GOALS)
  }

  function onChangeEventsView() {
    if (eventsView == EEVENTS_VIEW_GOALS) setEventsView(EEVENTS_VIEW_FULL)
    else setEventsView(EEVENTS_VIEW_GOALS)
  }

  function getBanner() {
    if (Colors.mode == 4) {
      return `${SERVER_BASE_URL}/data/leagues/${match?.leagueName}${match?.league_country}_banner_fc27.jpg${dataManager.getImageCacheTime()}`
    }
    if (Colors.mode == 3) {
      return `${SERVER_BASE_URL}/data/leagues/${match?.leagueName}${match?.league_country}_banner_fc26.jpg${dataManager.getImageCacheTime()}`
    }
    return `${SERVER_BASE_URL}/data/leagues/${match?.leagueName}${match?.league_country}_banner.jpg${dataManager.getImageCacheTime()}`
  }

  const scrollY = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [0, 100],     // scroll range
      [0, 1],       // opacity range
      Extrapolation.CLAMP
    );

    return {
      opacity,
    };
  });

  function showEFootballPanel() {
    if (!matchSettings.showEFootball && game != EGAME_EFOOTBALL) return false;

    if (!predictsReqFinished) return false;
    if ((isMatchLive() || isMatchEnded()) && (!eFootballPredict || eFootballPredict?.id == -1)) return false;

    return true;
  }

  function showBetChip() {
    // if ((isMatchEnded() || isMatchEnded()) && !odds?.bet) {
    //   return false;
    // }
    if (!matchSettings.showBeatBet && game != EGAME_BEATBET) return false;

    return header?.odds;
  }

  function showFireballChip() {
    if (!matchSettings.showFireball && game != EGAME_FIREBALL) return false;

    if ((isMatchEnded() || isMatchEnded()) && !fireballPredict) {
      return false;
    }

    return true;
  }

  return (

    <View style={{ flex: 1, backgroundColor: Colors.gray800 }}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor="transparent"
        translucent={true}
      />
      <Animated.View
        style={[
          {
            width: '100%',
            height: insets.top,
            position: 'absolute',
            zIndex: 1,
            backgroundColor: dataManager.getBannerBackColor(),
          },
          animatedStyle,
        ]}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={0}
      >

        <View style={{ flex: 1, backgroundColor: Colors.bgColor }}>
          <Animated.ScrollView
            onScroll={onScroll}
            contentInsetAdjustmentBehavior="automatic"
            contentContainerStyle={{
              // minHeight: '100%',
              alignItems: 'center',
              paddingBottom: 60,
              paddingTop: insets.top,
            }}
            style={{
              flex: 1,
            }}>
            <Image resizeMode="cover" src={getBanner()} style={{
              position: 'absolute',
              width: '100%',

              height: 210,
              // margin: 20,
              backgroundColor: dataManager.getBannerBackColor(),
              borderRadius: 20,
              borderTopRightRadius: 0,
              borderTopLeftRadius: 0,
            }}></Image>
            <MatchAppBar navigation={navigation} match={match} />

            <View style={{
              width: '88%',
              borderRadius: 20,

              backgroundColor: Colors.gray800,
              paddingTop: 10,
              paddingBottom: 10
            }}>

              {match?.teaser ? <TouchableOpacity onPress={() => onShowMatchTrailerPress(match)} style={{
                width: 36,
                height: 36,
                borderRadius: 18,
                backgroundColor: '#FACC15',// 'white',
                position: 'absolute',
                top: 8,
                left: match.preview ? 8 : '',
                right: !match.preview ? 8 : '',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
              }}>
                <FAIcon2 name='film' color={'black'} size={20} />
              </TouchableOpacity> : null}

              {match.preview ? <TouchableOpacity onPress={() => onShowMatchPress(match)} style={{
                width: 36,
                height: 36,
                borderRadius: 18,
                backgroundColor: '#FF2882',// 'white',
                position: 'absolute',
                top: 8,
                right: 8,
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
              }}>
                <FAIcon name='video' color={'white'} size={16} />
              </TouchableOpacity> : null}

              <MatchDatePanel match={match} isShowTopMatchTime={isShowTopMatchTime()} predictReqFinished={predictReqFinished} />
              <View style={{
                width: '100%',
                paddingBottom: 10,
                flexDirection: 'row',
                // backgroundColor: 'red',
                alignItems: 'center',
                justifyContent: 'center'
              }}>

                <TeamItem navigation={navigation} team={match.team1} league={match.league} leagueName={match.leagueName} isHome={true} weekType={match.weekType} />

                {renderScorePanel()}

                <TeamItem navigation={navigation} team={match.team2} league={match.league} leagueName={match.leagueName} isHome={false} weekType={match.weekType} />
              </View>

              {game == EGAME_ELTORNEO || game == EGAME_CAREER || game == EGAME_WORLD_CUP ? renderPredictPanel() : null}
              {game == EGAME_BEATBET ? renderBetPanel() : null}
              {game == EGAME_FIREBALL ? renderFireballPredictPanel() : null}
            </View>

            {match.is_special && match.special_match_title == 'quest' ? <View style={{
              width: '100%',
              paddingHorizontal: 20,
              marginTop: 20,
            }}>
              <View style={{
                width: '100%',
                borderRadius: 12,
                padding: 10,
                // borderWidth: 1,
                // borderColor: '#FF4747',
                // marginBottom: 5,
                paddingHorizontal: 10,
                backgroundColor: '#FF474719'
              }}>
                <Text style={{
                  fontSize: 16,
                  fontFamily: 'Roboto-Bold',
                  color: '#FF4747'
                }}>{strings.attention_quest}</Text>
                <Text style={{
                  color: Colors.titleColor
                }}>{strings.quest_match_msg}</Text>
              </View>
            </View> : null}

            {predictsReqFinished ? <ScrollView
              ref={scrollViewRef}
              horizontal={true}
              contentInsetAdjustmentBehavior="automatic"
              contentContainerStyle={{
                height: 50,
                marginTop: 20,
                paddingLeft: 20,
                paddingRight: 10,
                // backgroundColor: 'green',
                alignItems: 'center',
              }}
              showsHorizontalScrollIndicator={false}>

              {game == EGAME_BEATBET ? <ViewChip title={strings.bets} selected={view == EVIEW_TOP_BETS} match={match} onClick={() => { setView(EVIEW_TOP_BETS) }} /> : null}
              {game == EGAME_ELTORNEO || game == EGAME_CAREER || game == EGAME_WORLD_CUP ? <ViewChip title={strings.predictions2} selected={view == EVIEW_PREDICTIONS} match={match} onClick={() => { setView(EVIEW_PREDICTIONS) }} /> : null}
              {game == EGAME_FIREBALL ? <ViewChip title={strings.predictions2} selected={view == EVIEW_FIREBALL_PREDICTS} match={match} onClick={() => { setView(EVIEW_FIREBALL_PREDICTS) }} /> : null}
              {game == EGAME_EFOOTBALL ? <ViewChip title={strings.predictions2} selected={view == EVIEW_EFOOTBALL_PREDICTS} match={match} onClick={() => { setView(EVIEW_EFOOTBALL_PREDICTS) }} /> : null}
              {showBetChip() ? <ViewChip isBet title={strings.odds} selected={view == EVIEW_BET} match={match} onClick={() => { setView(EVIEW_BET) }} /> : null}
              {showFireballChip() ?
                <TouchableOpacity onPress={() => { onFireballClick() }} style={{
                  marginRight: 10
                }}>
                  <FireballIcon width={40} height={40} />
                </TouchableOpacity>
                : null}
              {header?.lineups ? <ViewChip title={strings.lineups} selected={view == EVIEW_LINEUPS} match={match} onClick={() => { setView(EVIEW_LINEUPS) }} /> : null}
              {header?.events ? <ViewChip title={strings.events} selected={view == EVIEW_EVENTS} match={match} onClick={() => { setView(EVIEW_EVENTS) }} /> : null}
              {header?.statistics ? <ViewChip title={strings.statistics} selected={view == EVIEW_STATISTICS} match={match} onClick={() => { setView(EVIEW_STATISTICS) }} /> : null}
              <ViewChip title={'H2H'} selected={view == EVIEW_H2H} match={match} onClick={() => { setView(EVIEW_H2H) }} />
              {(match.league < 8) || match.league == 16 || match.league == 20 || match.league == 24 || match.league == 14 ? <ViewChip title={strings.table} selected={view == EVIEW_TABLE} match={match} onClick={() => { setView(EVIEW_TABLE) }} /> : null}
            </ScrollView> : null}

            <View style={{
              width: '100%',
              paddingHorizontal: 20,
            }}>

              {view == EVIEW_PREDICTIONS ? <View style={{
                marginTop: 20,
              }}>
                {showEFootballPanel() ? <MatchEFootballPanel match={match} eFootballPredict={eFootballPredict} setEFootballPredict={setEFootballPredict} isMatchLive={isMatchLive()} isMatchEnded={isMatchEnded()} /> : null}
                {predictsReqFinished && predicts && predicts.beatBetOfficial ? <MatchBeatBetPanel navigation={navigation} predict={predict} match={match} beatBet={predicts.beatBetOfficial} /> : null}
                {predictsReqFinished && predicts && predicts.numPredicts ? <MatchPredictsSummaryPanel2 match={match} onUnlock={onUnlock} adLoaded={loaded} blockForAd={blockForAd} predicts={predicts}></MatchPredictsSummaryPanel2> : null}
                {predictsReqFinished && top20Predicts && top20Predicts.predicts.length ? <MatchTop20PredictsPanel onUnlock={onUnlock} adLoaded={loaded} match={match} blockForAd={blockForAd} isMatchEnded={isMatchEnded()} navigation={navigation} top20Predicts={top20Predicts} /> : null}
                {predictsReqFinished && !predicts?.numPredicts ? <Text style={{
                  color: '#8E8E93',
                  fontSize: 14,
                  fontFamily: 'Roboto-Bold',
                  alignSelf: 'center'
                }}>{strings.no_pred_for_match}</Text> : null}
                {!predictsReqFinished ? <ActivityIndicator size={'large'} color={Colors.primary}></ActivityIndicator> : null}
              </View> : null}

              {/* {view == EVIEW_TOP_BETS ? <View style={{
                marginTop: 20,
              }}>
                {predictsReqFinished && betsSummary && betsSummary.numPredicts ? <MatchPredictsSummaryPanel2 match={match} onUnlock={onUnlock} adLoaded={loaded} blockForAd={blockForAd} predicts={betsSummary}></MatchPredictsSummaryPanel2> : null}
                {predictsReqFinished && top20Bets && top20Bets.predicts.length ? <MatchTop20BetsPanel onUnlock={onUnlock} adLoaded={loaded} match={match} blockForAd={blockForAd} isMatchEnded={isMatchEnded()} navigation={navigation} top20Bets={top20Bets} /> : null}
                {predictsReqFinished && !betsSummary?.numPredicts ? <Text style={{
                  color: '#8E8E93',
                  fontSize: 14,
                  fontFamily: 'Roboto-Bold',
                  alignSelf: 'center'
                }}>{strings.no_bets_for_match}</Text> : null}
                {!predictsReqFinished ? <ActivityIndicator size={'large'} color={Colors.primary}></ActivityIndicator> : null}
              </View> : null} */}
              {view == EVIEW_FIREBALL_PREDICTS ? <View style={{
                marginTop: 20,
              }}>
                {predictsReqFinished && fireballSummary && fireballSummary.total_predicts ? <MatchFireballSummaryPanel match={match} predicts={fireballSummary}></MatchFireballSummaryPanel> : null}
                {predictsReqFinished && top20FireballPredicts && top20FireballPredicts.predicts.length ? <MatchTop20FireballPanel match={match} isMatchEnded={isMatchEnded()} navigation={navigation} top20Predicts={top20FireballPredicts} /> : null}
                {predictsReqFinished && !fireballSummary?.total_predicts ? <Text style={{
                  color: '#8E8E93',
                  fontSize: 14,
                  fontFamily: 'Roboto-Bold',
                  alignSelf: 'center'
                }}>{strings.no_pred_for_match}</Text> : null}
                {!predictsReqFinished ? <ActivityIndicator size={'large'} color={Colors.primary}></ActivityIndicator> : null}
              </View> : null}
              {view == EVIEW_EFOOTBALL_PREDICTS ? <View style={{
                marginTop: 20,
              }}>
                {showEFootballPanel() ? <MatchEFootballPanel match={match} eFootballPredict={eFootballPredict} setEFootballPredict={setEFootballPredict} isMatchLive={isMatchLive()} isMatchEnded={isMatchEnded()} /> : null}
                {predictsReqFinished && eFootballSummary && eFootballSummary.numPredicts ? <MatchEFootballSummaryPanel match={match} onUnlock={onUnlock} adLoaded={loaded} blockForAd={blockForAd} predicts={eFootballSummary}></MatchEFootballSummaryPanel> : null}
                {predictsReqFinished && top20EFootballPredicts && top20EFootballPredicts.predicts.length ? <MatchTop20EFootballPanel match={match} isMatchEnded={isMatchEnded()} navigation={navigation} top20Predicts={top20EFootballPredicts} /> : null}
                {predictsReqFinished && !eFootballSummary?.numPredicts ? <Text style={{
                  color: '#8E8E93',
                  fontSize: 14,
                  fontFamily: 'Roboto-Bold',
                  alignSelf: 'center'
                }}>{strings.no_pred_for_match}</Text> : null}
                {!predictsReqFinished ? <ActivityIndicator size={'large'} color={Colors.primary}></ActivityIndicator> : null}
              </View> : null}

              {view == EVIEW_FIREBALL ? <MatchPlayersPanel navigation={navigation} match={match} fireballPredict={fireballPredict} players={matchPlayers} onFireballPredict={onFireballPredict} onDeleteFireballPredict={onDeleteFireballPredict} /> : null}
              {view == EVIEW_BET ? <MatchBetPanel me={me} setBet={setBet} navigation={navigation} match={match} odds={odds} remoteBet={bet} /> : null}
              {view == EVIEW_H2H && match ? <MatchH2HPanel navigation={navigation} match={match} onShowMatchPreview={onShowMatchPress} onShowMatchTrailer={onShowMatchTrailerPress} /> : null}
              {view == EVIEW_STATISTICS && statistics ? <MatchStatisticsPanel match={match} statistics={statistics} /> : view == EVIEW_STATISTICS ? <ActivityIndicator style={{ marginTop: 20 }} color={Colors.primary} size={'large'} /> : null}
              {view == EVIEW_EVENTS && events ? <MatchEventsPanel eventsView={eventsView} events={events} /> : view == EVIEW_EVENTS ? <ActivityIndicator style={{ marginTop: 20 }} color={Colors.primary} size={'large'} /> : null}
              {view == EVIEW_LINEUPS && lineups ? <MatchLineupsPanel2 view={lineupsView} match={match} isStarted={isMatchEnded() || isMatchLive()} lineups={lineups} fireballPredict={fireballPredict} onPlayerClick={onPlayerClick} onDeleteFireballPredict={onDeleteFireballPredict} /> : view == EVIEW_LINEUPS ? <ActivityIndicator style={{ marginTop: 20 }} color={Colors.primary} size={'large'} /> : null}
              {view == EVIEW_TABLE && table ? <MatchTablePanel navigation={navigation} match={match} table={table} /> : view == EVIEW_TABLE ? <ActivityIndicator style={{ marginTop: 20 }} color={Colors.primary} size={'large'} /> : null}
            </View>
          </Animated.ScrollView>

        </View>
        <BottomNavBar navigation={navigation} isAbsolute={true} league={match?.league} />

      </KeyboardAvoidingView>

      {view == EVIEW_EVENTS ? <TouchableOpacity activeOpacity={.8} onPress={onChangeEventsView} style={{
        width: 50,
        height: 50,
        bottom: 90 + insets.bottom,
        right: 80,
        position: 'absolute',
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: Colors.borderColor,
        borderWidth: 2,
        backgroundColor: Colors.gray800
      }}>
        {<SquareIcon width={46} height={46} />}
      </TouchableOpacity> : null}
      {view == EVIEW_LINEUPS ? <TouchableOpacity activeOpacity={.9} onPress={onChangeLineupsView} style={{
        width: 50,
        height: 50,
        bottom: 90 + insets.bottom,
        right: 80,
        position: 'absolute',
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: Colors.borderColor,
        borderWidth: 2,
        backgroundColor: Colors.gray800
      }}>
        {<SquareIcon width={46} height={46} />}
      </TouchableOpacity> : null}

      <Gamepad onShowMenu={onShowGamepadMenu} />
      {showGamepadMenu ? <GamepadMenu onClose={() => setShowGamepadMenu(false)} onChangeGame={onChangeGame} /> : null}
      {showMatchPreview ? <MatchPreviewDialog match={previewMatch} onClose={onCloseMatchPreview} /> : null}
      {showFailPlayDialog ? <FairPlayDialog onClose={() => { setShowFailPlayDialog(false) }} /> : null}

      <View style={{
        width: '100%',
        // zIndex: 1,
        backgroundColor: Colors.gray800,
        height: insets.bottom
      }}></View>
    </View>
  );
}

export default MatchPage;
