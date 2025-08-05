import { Dispatch, SetStateAction, useRef } from 'react';
import { Modal, Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import Popover, { PopoverMode, PopoverPlacement } from 'react-native-popover-view';
import Entypo from '@expo/vector-icons/Entypo';
import { useNavigation } from 'expo-router';

export default function ActionModal({
  visible,
  setVisible,
  setFormModal,
  setFormMode,
}: {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  setFormModal: Dispatch<SetStateAction<boolean>>;
  setFormMode: Dispatch<SetStateAction<string>>;
}) {
  const navigation = useNavigation<any>();
  return (
    <View>
      <Popover
        arrowSize={{ width: 0, height: 0 }}
        isVisible={visible}
        from={
          <TouchableOpacity onPress={() => setVisible(true)}>
            <Entypo name="dots-three-vertical" size={16} color="black" />
          </TouchableOpacity>
        }
        onRequestClose={() => setVisible(false)}>
        <View className="bg-white p-2 ">
          <TouchableOpacity
            onPress={() => {
              setVisible(false);
              setFormMode('');
              setFormModal(true);
            }}>
            <Text className="p-2">👁 Ver más</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setVisible(false);
              setFormMode('edit');
              setFormModal(true);
              console.log('ver mas');
            }}>
            <Text className="p-2">✏️ Editar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setVisible(false);
            }}>
            <Text className="p-2 text-red-500">🗑 Eliminar</Text>
          </TouchableOpacity>
        </View>
      </Popover>
    </View>
  );
}
