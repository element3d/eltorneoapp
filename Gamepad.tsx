import { TouchableOpacity } from "react-native";
import Colors from "./Colors";
import GamepadIcon from './assets/ps5_black.svg'
import GamepadWhiteIcon from './assets/ps5.svg'
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Gamepad({onShowMenu}) {
    const insets = useSafeAreaInsets();

    return <TouchableOpacity onPress={onShowMenu} activeOpacity={.8} style={{
        width: 50,
        height: 50,
        bottom: 90 + insets.bottom,
        right: 20,
        position: 'absolute',
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: Colors.borderColor,
        borderWidth: 2,
        backgroundColor: Colors.gray800
    }}>
        {Colors.mode == 1 ? <GamepadIcon width={33} height={33} /> : <GamepadWhiteIcon width={33} height={33} />}
    </TouchableOpacity>
}