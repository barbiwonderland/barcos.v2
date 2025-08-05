import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import SearchBar from '../SearchBar';
import AddCrewButton from './AddCrewButton';
import { useState } from 'react';
import ActionModal from './ActionModal';
import FormCrewModal from './ModalFormCrew';

function CrewList() {
  const crewData = [
    { id: '1', nombre: 'Juan', apellido: 'Pérez', cargo: 'Capitán' },
    { id: '2', nombre: 'Ana', apellido: 'Gómez', cargo: 'Marinera' },
    { id: '3', nombre: 'Luis', apellido: 'Martínez', cargo: 'Mecánico' },
  ];
  const [visible, setVisible] = useState(false);
  const [openId, setOpenId] = useState<string | null>(null);
  const [formModal, setFormModal] = useState(false);
  const [formMode, setFormMode] = useState('');

  return (
    <>
      <View className="mx-3 my-3 flex-row justify-between px-2">
        <SearchBar />
        <AddCrewButton setFormMode={setFormMode} setFormModal={setFormModal} />
      </View>
      <View className="m-4">
        <View className="flex-row bg-gray-200 p-2">
          <Text className="flex-1 font-bold">Nombre</Text>
          <Text className="flex-1 font-bold">Apellido</Text>
          <Text className="flex-1 font-bold">Cargo</Text>
          <Text className="font-bold">Acciones</Text>
        </View>

        {/* Filas */}
        <FlatList
          data={crewData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View className="flex-row border-b border-gray-300 p-2">
              <Text className="flex-1">{item.nombre}</Text>
              <Text className="flex-1 ">{item.apellido}</Text>
              <Text className="flex-1 ">{item.cargo}</Text>
              <View className="w-12 items-center">
                <ActionModal
                  visible={openId === item.id}
                  setVisible={(visible) => {
                    setOpenId(visible ? item.id : null);
                  }}
                  setFormMode={setFormMode}
                  setFormModal={setFormModal}
                />
              </View>
            </View>
          )}
        />
        <FormCrewModal visible={formModal} mode={formMode} setVisible={setFormModal} />
      </View>
    </>
  );
}

export default CrewList;
