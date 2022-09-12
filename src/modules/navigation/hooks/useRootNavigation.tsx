import { NavigationProp, useNavigation } from '@react-navigation/native'
import { RootTabParamList } from '../../../types/navigation'

const useRootNavigation = () => {
    const navigation = useNavigation<NavigationProp<RootTabParamList>>();
    return navigation;
}

export default useRootNavigation;