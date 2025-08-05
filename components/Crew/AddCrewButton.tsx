import AntDesign from '@expo/vector-icons/AntDesign';
import { Dispatch, SetStateAction } from 'react';
import { Pressable, Text, View } from 'react-native';

export default function AddCrewButton({
  setFormModal,
  setFormMode,
}: {
  setFormModal: Dispatch<SetStateAction<boolean>>;
  setFormMode: Dispatch<SetStateAction<string>>;
}) {
  return (
    <Pressable
      onPress={() => {
        setFormModal(true);
        setFormMode('add');
      }}>
      <View className=" w-auto flex-row gap-2 self-start rounded-lg border border-white bg-blue-500 px-6 py-2   ">
        <AntDesign name="plus" size={20} color="white" />
        <Text className="text-white">Agregar Tripulante</Text>
      </View>
    </Pressable>
  );
}
