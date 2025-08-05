import { FlatList, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import SearchBar from '../SearchBar';
import AddCrewButton from './AddCrewButton';
import { useState } from 'react';
import ActionModal from './ActionModal';
import FormCrewModal from './ModalFormCrew';

function CrewList() {
  const crewData = [
    {
      id: '1',
      nombre: 'Juan',
      apellido: 'Pérez',
      cargo: 'Capitán',
      dni: '30123456',
      fechaNacimiento: '1980-05-10',
      numeroLibreta: 'CAP12345',
    },
    {
      id: '2',
      nombre: 'Ana',
      apellido: 'Gómez',
      cargo: 'Marinera',
      dni: '32234567',
      fechaNacimiento: '1990-08-22',
      numeroLibreta: 'MAR67890',
    },
    {
      id: '3',
      nombre: 'Luis',
      apellido: 'Martínez',
      cargo: 'Mecánico',
      dni: '28987654',
      fechaNacimiento: '1985-11-15',
      numeroLibreta: 'MEC54321',
    },
    {
      id: '4',
      nombre: 'Juan',
      apellido: 'Pérez',
      cargo: 'Capitán',
      dni: '30123456',
      fechaNacimiento: '1980-05-10',
      numeroLibreta: 'CAP12345',
    },
    {
      id: '5',
      nombre: 'Ana',
      apellido: 'Gómez',
      cargo: 'Marinera',
      dni: '32234567',
      fechaNacimiento: '1990-08-22',
      numeroLibreta: 'MAR67890',
    },
    {
      id: '6',
      nombre: 'Luis',
      apellido: 'Martínez',
      cargo: 'Mecánico',
      dni: '28987654',
      fechaNacimiento: '1985-11-15',
      numeroLibreta: 'MEC54321',
    },
    {
      id: '7',
      nombre: 'Juan',
      apellido: 'Pérez',
      cargo: 'Capitán',
      dni: '30123456',
      fechaNacimiento: '1980-05-10',
      numeroLibreta: 'CAP12345',
    },
    {
      id: '8',
      nombre: 'Ana',
      apellido: 'Gómez',
      cargo: 'Marinera',
      dni: '32234567',
      fechaNacimiento: '1990-08-22',
      numeroLibreta: 'MAR67890',
    },
    {
      id: '9',
      nombre: 'Luis',
      apellido: 'Martínez',
      cargo: 'Mecánico',
      dni: '28987654',
      fechaNacimiento: '1985-11-15',
      numeroLibreta: 'MEC54321',
    },
    {
      id: '10',
      nombre: 'Juan',
      apellido: 'Pérez',
      cargo: 'Capitán',
      dni: '30123456',
      fechaNacimiento: '1980-05-10',
      numeroLibreta: 'CAP12345',
    },
    {
      id: '11',
      nombre: 'Ana',
      apellido: 'Gómez',
      cargo: 'Marinera',
      dni: '32234567',
      fechaNacimiento: '1990-08-22',
      numeroLibreta: 'MAR67890',
    },
    {
      id: '12',
      nombre: 'Luis',
      apellido: 'Martínez',
      cargo: 'Mecánico',
      dni: '28987654',
      fechaNacimiento: '1985-11-15',
      numeroLibreta: 'MEC54321',
    },
    {
      id: '13',
      nombre: 'Juan',
      apellido: 'Pérez',
      cargo: 'Capitán',
      dni: '30123456',
      fechaNacimiento: '1980-05-10',
      numeroLibreta: 'CAP12345',
    },
    {
      id: '14',
      nombre: 'Ana',
      apellido: 'Gómez',
      cargo: 'Marinera',
      dni: '32234567',
      fechaNacimiento: '1990-08-22',
      numeroLibreta: 'MAR67890',
    },
    {
      id: '15',
      nombre: 'Luis',
      apellido: 'Martínez',
      cargo: 'Mecánico',
      dni: '28987654',
      fechaNacimiento: '1985-11-15',
      numeroLibreta: 'MEC54321',
    },
  ];
  const [openId, setOpenId] = useState<string | null>(null);
  const [formModal, setFormModal] = useState(false);
  const [formMode, setFormMode] = useState('');
  const [selectedCrew, setSelectedCrew] = useState<any>(null);
  const [searchText, setSearchText] = useState('');
  const [filteredCrew, setFilteredCrew] = useState(crewData);

  const normalizeText = (text: string) =>
    text
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();

  const handleSearch = (text: string) => {
    setSearchText(text);
    const normalizedSearch = normalizeText(text);

    const filtered = crewData.filter((crew) => {
      const combinedFields = Object.values(crew).join(' ');
      const normalizedCombined = normalizeText(combinedFields);
      return normalizedCombined.includes(normalizedSearch);
    });

    setFilteredCrew(filtered);
  };

  return (
    <>
      <View className="mx-3 my-3 flex-row justify-between px-2">
        <SearchBar handleSearch={handleSearch} searchText={searchText} />
        <AddCrewButton setFormMode={setFormMode} setFormModal={setFormModal} />
      </View>
      <View className="m-4 flex-1">
        <View className="flex-row bg-gray-200 p-2">
          <Text className="flex-1 font-bold">Nombre</Text>
          <Text className="flex-1 font-bold">Apellido</Text>
          <Text className="flex-1 font-bold">Cargo</Text>
          <Text className="font-bold">Acciones</Text>
        </View>

        {/* Filas */}
        <FlatList
          data={filteredCrew}
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
                  setSelectedCrew={() => setSelectedCrew(item)}
                />
              </View>
            </View>
          )}
        />
      </View>
      <FormCrewModal
        visible={formModal}
        mode={formMode}
        setVisible={setFormModal}
        selectedCrew={selectedCrew}
      />
    </>
  );
}

export default CrewList;
