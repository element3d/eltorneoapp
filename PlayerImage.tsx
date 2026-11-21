import { Image, View } from "react-native"
import SERVER_BASE_URL from "./AppConfig"
import dataManager from "./DataManager"
import { useState } from "react"
import Colors from "./Colors"

export default function PlayerImage({ team, player, imageSize }) {
    const [fallback, setFallback] = useState(false)

    function onImgError() {
        setFallback(true)
    }

    return <View style={{
        borderRadius: 50,
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: Colors.borderColor,
    }}><Image src={`https://media.api-sports.io/football/players/${player.apiId}.png`} style={{
        width: 50,
        height: 50,
    }} /></View>

    return fallback ? <View style={{
        width: imageSize,
        height: imageSize,
        alignItems: 'center',
        overflow: 'hidden',
        justifyContent: 'center',
    }}><Image
        src={`${SERVER_BASE_URL}/data/kits/${team.name.replace(/ö/g, 'o')}_kit.png${dataManager.getImageCacheTime()}`}
        style={{
            // marginTop: 20,/
            width: '90%',
            height: '90%',
            objectFit: 'contain',
            // backgroundColor: 'red'
            // objectFit: hasKit(match) ? 'cover' : 'contain'
        }}
    ></Image></View>
        : <Image src={`${SERVER_BASE_URL}/data/players/${team.id}/${player.apiId}.png${dataManager.getImageCacheTime()}`} style={{
            width: imageSize,
            height: imageSize,
            // backgroundColor: 'red',
            objectFit: 'contain'
        }} onError={onImgError} />
}