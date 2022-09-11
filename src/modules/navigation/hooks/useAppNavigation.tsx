import { NavigationProp, useNavigation } from '@react-navigation/native'
import { AppStackParamList } from '../../../types/navigation'

const useAppNavigation = () => {
    const navigation = useNavigation<NavigationProp<AppStackParamList>>();
    return navigation;
}

export default useAppNavigation;