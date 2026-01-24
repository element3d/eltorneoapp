import { TouchableOpacity } from "react-native";
import Colors from "./Colors";
import SaveIcon from './assets/save.svg';
import SaveDarkIcon from './assets/save_dark.svg';
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function CareerLineupsSaveButton({enabled, onSave}) {
    const insets = useSafeAreaInsets();

    return <TouchableOpacity onPress={enabled ? onSave : null} style={{
        opacity: enabled ? 1 : 0.5,
        width: 50,
        height: 50,
        borderRadius: 30,
        backgroundColor: Colors.gray800,
        position: 'absolute',
        bottom: 90 + insets.bottom,
        right: 90,
        borderColor: Colors.borderColor,
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center'
    }}>
       {Colors.mode == 1 ? <SaveIcon width={24} height={24}/>: <SaveDarkIcon width={24} height={24}/>}
    </TouchableOpacity>
}