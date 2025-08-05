import { View, TextInput, Button, Text, Modal, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Dispatch, useState } from 'react';

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
      <View className="flex-1 items-center justify-center p-4">
        <View className="w-full max-w-xl border-gray-500 rounded-lg bg-white p-4">
          <Text className="mb-4 text-lg">
            {mode === 'add' && 'Agregar elemento'}
            {mode === 'edit' && 'Editar elemento'}
            {mode === 'view' && 'Ver elemento'}
          </Text>
          <Text className="mb-2">Nombre</Text>
          <TextInput className="mb-2 rounded-md border border-gray-200 p-2" placeholder="Juan" />
          <Text className="mb-2">Apellido</Text>
          <TextInput className="mb-2 rounded-md border border-gray-200 p-2" placeholder="Perez" />
          <Text className="mb-2">DNI</Text>
          <TextInput className="mb-2 rounded-md border border-gray-200 p-2" placeholder="Perez" />
          <Text className="mb-2">Fecha de nacimiento</Text>
          <TextInput className="mb-2 rounded-md border border-gray-200 p-2" placeholder="Perez" />
          <Text className="mb-2">Cargo</Text>
          <TextInput className="mb-2 rounded-md border border-gray-200 p-2" placeholder="Perez" />
          <Text className="mb-2">Nº Libreta</Text>
          <TextInput className="mb-2 rounded-md border border-gray-200 p-2" placeholder="Perez" />
          <Text className="mb-2">Adjuntos</Text>
          <TextInput className="mb-2 rounded-md border border-gray-200 p-2" placeholder="Perez" />

          <Button title="Guardar" onPress={() => {}} />

          <TouchableOpacity
            onPress={() => setVisible(false)}
            className="mt-4 rounded bg-gray-300 p-2">
            <Text className="text-center">Cerrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
