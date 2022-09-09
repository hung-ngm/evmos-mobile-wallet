import { NavigationProp, useNavigation } from '@react-navigation/native'
import { AuthStackParamList } from '../../../types/navigation'

const useAuthNavigation = () => {
    const navigation = useNavigation<NavigationProp<AuthStackParamList>>();
    return navigation;
}

export default useAuthNavigation;