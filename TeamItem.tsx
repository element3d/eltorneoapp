import { Image, Text, View, TouchableOpacity } from "react-native";
import SERVER_BASE_URL from "./AppConfig";
import strings from "./Strings";
import Colors from "./Colors";
import dataManager from "./DataManager";

export default function TeamItem({ team, leagueName, league, isHome, navigation, weekType, compact = false }) {
  const sanitizedName = team.name.replace(/ö/g, 'o');

  function onNavTeam() {
    team.leagueName = leagueName
    team.leagueId = league
    team.leagueCountry = ""
    dataManager.setTeam(team)
    navigation.navigate('Team', {
      id: team.id,
    });
  }

  function getText() {
    if (league == 16 || league == 24) return strings.away
    if (league == 1 && weekType == 4) return strings.away
    return isHome ? strings.home : strings.away
  }

  return (
    <TouchableOpacity disabled={!navigation} onPress={onNavTeam} activeOpacity={.6} style={{
      alignItems: 'center',
      justifyContent: 'center',
      // backgroundColor: 'red',
      width: '50%',
      // marginTop: 20,
      flex: compact ? 1 : 0,
      marginRight: compact ? 0 : 10,
      marginLeft: compact ? 0 : 10
    }}>
      <Image
        src={`${SERVER_BASE_URL}/data/teams/150x150/${encodeURIComponent(sanitizedName)}.png${dataManager.getImageCacheTime()}`}
        style={{
          width: compact ? 70 : 60,
          height: compact ? 70 : 60,
          objectFit: 'contain',
        }}
      />
      <Text style={{
        color: compact ? 'white' : Colors.titleColor,
        marginTop: 5,
        fontSize: 16,
        fontFamily: 'OpenSans-Bold'
      }}>{team.shortName}</Text>
      <Text style={{
        marginTop: 0,
        fontSize: 12,
        lineHeight: 14,
        color: '#AEAEB2',
        fontFamily: 'Roboto-Bold'
      }}>{getText()}</Text>
    </TouchableOpacity>
  )
}