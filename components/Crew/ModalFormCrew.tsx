import { View, TextInput, Button, Text, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Dispatch, useState } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function ModalFormCrew({
  visible,
  mode,
  setVisible,
}: {
  visible: boolean;
  mode: string;
  setVisible: Dispatch<boolean>;
}) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => setVisible(false)}>
      <View className="flex-1 items-center justify-center bg-black/50">
        <View className="w-6/12 rounded-2xl bg-white p-5 py-14">
          <Text className="mb-4 text-left text-2xl font-bold">
            {mode == 'add' ? 'Agregar' : mode == 'edit' ? 'Editar' : ''}
          </Text>
          <ScrollView>
            <View className="mb-3 flex-row  gap-3 ">
              <View className="flex-1 flex-row items-center gap-2 rounded-lg border border-gray-300 px-2 py-1">
                <FontAwesome name="user" size={24} color="black" /> 
                <TextInput placeholder="Nombre" className="flex-1 " />
              </View>
              <View className="flex-1 flex-row items-center gap-2 rounded-lg border border-gray-300 px-2 py-1">
                <FontAwesome name="user" size={24} color="black" />
                <TextInput placeholder="Apellido" className="flex-1 " />
              </View>
            </View>
            <View className="mb-2 flex-1 flex-row items-center gap-2 rounded-lg border border-gray-300 px-2 py-1">
              <AntDesign name="idcard" size={24} color="black" />
              <TextInput placeholder="DNI" className="flex-1 " />
            </View>
            <View className="mb-2 flex-1 flex-row items-center gap-2 rounded-lg border border-gray-300 px-2 py-1">
              <AntDesign name="calendar" size={24} color="black" />
              <TextInput placeholder="Fecha de nacimiento" className="flex-1 " />
            </View>

            <View className="mb-2 flex-1 flex-row items-center gap-2 rounded-lg border border-gray-300 px-2 py-1">
              <FontAwesome name="user" size={24} color="black" />
              <TextInput placeholder="Cargo" className="flex-1 " />
            </View>

            <View className="mb-2 flex-1 flex-row items-center gap-2 rounded-lg border border-gray-300 px-2">
              <FontAwesome name="id-badge" size={24} color="black" />
              <TextInput placeholder="Nº Libreta" className="flex-1 " />
            </View>
            <View className="mb-2 flex-1 flex-row items-center gap-2 rounded-lg border border-gray-300 px-2">
              <Ionicons name="attach-sharp" size={24} color="black" />
              <TextInput placeholder="Adjuntos" className="flex-1 " />
            </View>

            <TouchableOpacity className="mb-2 rounded-full bg-blue-600 py-3">
              <Text className="text-center font-bold text-white">Guardar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="rounded-full bg-gray-300 py-3"
              onPress={() => setVisible(false)}>
              <Text className="text-center font-bold text-black">Cerrar</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
