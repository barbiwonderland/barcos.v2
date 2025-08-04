import AntDesign from '@expo/vector-icons/AntDesign';
import { Text, View } from 'react-native';

export default function AddCrewButton() {
  return (
    <View className=" py-2 bg-blue-500 w-auto border border-white rounded-lg flex-row gap-2 self-start px-6   ">
      <AntDesign name="plus" size={20} color="white" />
      <Text className='text-white'>Agregar Tripulante</Text>
    </View>
  );
}
