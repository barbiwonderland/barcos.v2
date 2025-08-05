import { Stack } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Container } from '~/components/Container';
import * as DocumentPicker from 'expo-document-picker';
import { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import axios from 'axios';
import ListPdf from '~/components/ListPdf';
import ModalAddPdf from '~/components/ModalAddPdf';

export type pdf = {
  file: DocumentPicker.DocumentPickerAsset;
  // Esto lo dejo como string por que asi lo recibis en la api
  expirationDate: string;
  fileName?: string;
  id?: string;
};

export default function Diagramas() {
  const [listElements, setListElements] = useState<pdf[] | null>([]);
  const [selectedElement, setSelectedElement] = useState<pdf | null>(null);
  //pdfs de la api
  const [addPdfModal, setAddPdfModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Base URL de la API
  const API_BASE_URL = 'http://localhost:8082';
  const LIST_CERTIFICATES_PATH = '/deck/certificates';

  // Función para cargar todos los PDFs
  const loadPdfs = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${API_BASE_URL}${LIST_CERTIFICATES_PATH}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response) {
        //throw new Error(`Error: ${response.status} ${response.statusText}`);
        console.log('error getting pdfs.');
      }

      const data = await response.data;
      console.log(data, 'data de pdfs');
      setListElements(data);
    } catch (err) {
      console.error('Error al cargar PDFs:', err);
      setLoading(false);
    }
  };

  //cargar pdfs al inicio
  useEffect(() => {
    loadPdfs();
    if (selectedElement) {
      console.log('selectedElement actualizado:', selectedElement);
    }
  }, [selectedElement]);

  return (
    <>
      <Stack.Screen options={{ title: 'Diagramas' }} />
      <Container>
        <View className="h-full w-full bg-[#0A1C34]">
          {/* Título principal */}
          <Text className="mt-10 text-center text-xl font-bold uppercase text-white sm:text-3xl">
            Diagramas
          </Text>

          <View className=" mx-auto h-3/4 w-10/12">
            {/* Botón Agregar */}
            <View className="mb-2 mt-6 items-start">
              <TouchableOpacity
                onPress={() => setAddPdfModal(true)}
                className="rounded-md bg-white px-4 py-2 ">
                <Text className="font-semibold text-[#0A1C34]">Agregar nuevo</Text>
              </TouchableOpacity>
              <ListPdf listElements={listElements} showExpiration={false} />
            </View>
          </View>
        </View>
      </Container>
      <ModalAddPdf
        listElements={listElements}
        setListElements={setListElements}
        selectedElement={selectedElement}
        setSelectedElement={setSelectedElement}
        setAddPdfModal={setAddPdfModal}
        addPdfModal={addPdfModal}
      />
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 25,
  },
});
