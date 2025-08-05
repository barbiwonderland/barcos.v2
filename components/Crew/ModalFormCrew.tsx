import { View, TextInput, Button, Text, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { Dispatch, useEffect, useState } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function ModalFormCrew({
  visible,
  mode,
  setVisible,
  selectedCrew,
}: {
  visible: boolean;
  mode: string;
  setVisible: Dispatch<boolean>;
  //luego cambiar a tipo que recibo el bk
  selectedCrew: any;
}) {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [cargo, setCargo] = useState('');
  const [dni, setDni] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [numeroLibreta, setNumeroLibreta] = useState('');

  useEffect(() => {
    if ((mode === '' || mode === 'edit') && selectedCrew) {
      setNombre(selectedCrew.nombre);
      setApellido(selectedCrew.apellido);
      setCargo(selectedCrew.cargo);
      setDni(selectedCrew.dni);
      setFechaNacimiento(selectedCrew.fechaNacimiento);
      setNumeroLibreta(selectedCrew.numeroLibreta);
    } else {
      setNombre('');
      setApellido('');
      setCargo('');
      setDni('');
      setFechaNacimiento('');
      setNumeroLibreta('');
    }
  }, [selectedCrew, mode]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => setVisible(false)}>
      <View className="flex-1 items-center justify-center bg-black/50">
        <View className="w-6/12 rounded-2xl bg-white p-5 py-14">
          <Text className="mb-4 text-left text-2xl font-bold">
            {mode == 'add' ? 'Agregar' : mode == 'edit' ? 'Editar' : 'Detalles'}
          </Text>
          <ScrollView>
            <View className="mb-3 flex-row  gap-3 ">
              <View className="flex-1 flex-row items-center gap-2 rounded-lg border border-gray-300 px-2 py-1">
                <FontAwesome name="user" size={24} color="black" />
                <TextInput
                  placeholder="Nombre"
                  className="flex-1 "
                  value={nombre}
                  onChangeText={setNombre}
                  editable={mode !== ''}
                />
              </View>
              <View className="flex-1 flex-row items-center gap-2 rounded-lg border border-gray-300 px-2 py-1">
                <FontAwesome name="user" size={24} color="black" />
                <TextInput
                  placeholder="Apellido"
                  className="flex-1 "
                  value={apellido}
                  onChangeText={setApellido}
                  editable={mode !== ''}
                />
              </View>
            </View>
            <View className="mb-2 flex-1 flex-row items-center gap-2 rounded-lg border border-gray-300 px-2 py-1">
              <AntDesign name="idcard" size={24} color="black" />
              <TextInput
                placeholder="DNI"
                className="flex-1 "
                value={dni}
                onChangeText={setDni}
                editable={mode !== ''}
              />
            </View>
            <View className="mb-2 flex-1 flex-row items-center gap-2 rounded-lg border border-gray-300 px-2 py-1">
              <AntDesign name="calendar" size={24} color="black" />
              <TextInput
                placeholder="Fecha de nacimiento"
                className="flex-1 "
                value={fechaNacimiento}
                onChangeText={setFechaNacimiento}
                editable={mode !== ''}
              />
            </View>

            <View className="mb-2 flex-1 flex-row items-center gap-2 rounded-lg border border-gray-300 px-2 py-1">
              <FontAwesome name="user" size={24} color="black" />
              <TextInput
                placeholder="Cargo"
                className="flex-1 "
                value={cargo}
                onChangeText={setCargo}
                editable={mode !== ''}
              />
            </View>

            <View className="mb-2 flex-1 flex-row items-center gap-2 rounded-lg border border-gray-300 px-2">
              <FontAwesome name="id-badge" size={24} color="black" />
              <TextInput
                placeholder="Nº Libreta"
                className="flex-1 "
                value={numeroLibreta}
                onChangeText={setNumeroLibreta}
                editable={mode !== ''}
              />
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
