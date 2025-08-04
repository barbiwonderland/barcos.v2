import AntDesign from '@expo/vector-icons/AntDesign';
import { Text, TextInput, View } from 'react-native';

export default function SearchBar() {
  return (
    <>
      <View className="w-auto flex-row items-center self-start rounded-lg border  border-gray-300 bg-white px-5">
        <AntDesign name="search1" size={20} color="black" />
        <TextInput
          className="ml-2 p-2 text-base  "
          placeholderTextColor="black"
          placeholder="Buscar tripulante"
          value=""
        />
      </View>
    </>
  );
}
