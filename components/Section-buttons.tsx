import { Text, View, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

type Props = {
  title: string;
};

export function SectionButtons({ title }: Props) {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate(`${title}` as never); 
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        width: 384, // 96 * 4
        height: 80, // 20 * 4
        backgroundColor: 'white',
        paddingVertical: 16,
        paddingHorizontal: 16,
        borderRadius: 9999,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      }}>
      <Image
        source={require('../assets/wind-rose.png')} 
        style={{ marginRight: 8, width: 24, height: 24 }}
        resizeMode="contain"
      />
      <Text style={{ textTransform: 'uppercase', color: 'black' }}>{title}</Text>
    </TouchableOpacity>
  );
}
