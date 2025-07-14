import { Stack, useLocalSearchParams } from 'expo-router';
import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Container } from '~/components/Container';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { useEffect, useState } from 'react';
import * as Sharing from 'expo-sharing';
import Pdf from 'react-native-pdf';
import { Dimensions } from 'react-native';
import { Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios'

export type pdf = {
  file: DocumentPicker.DocumentPickerAsset;
  expirationDate: Date;
  name: string;
  id?: string;
};

export default function Certificados() {
  const [listElements, setListElements] = useState<pdf[] | null>([]);
  const [selectedElement, setSelectedElement] = useState<pdf | null>(null);
  //pdfs de la api
  const [pdfs, setPdfs] = useState([]);
  const [pdfVisible, setPdfVisible] = useState(false);
  const [currentPdfUri, setCurrentPdfUri] = useState<string | null>(null);
  const [addPdfModal, setAddPdfModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [expirationDate, setExpirationDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  // Base URL de la API
  const API_BASE_URL = 'http://localhost:8082';
  const UPLOAD_PDF_PATH = '/deck/certificates/upload';
  const LIST_CERTIFICATES_PATH = '/deck/certificates';
  const GET_PDF_PATH = '/deck/certificates/';

  // Función para cargar todos los PDFs
  const loadPdfs = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${API_BASE_URL}${LIST_CERTIFICATES_PATH}`, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response) {
        //throw new Error(`Error: ${response.status} ${response.statusText}`);
        console.log("error getting pdfs.")
      }

      const data = await response.data;
      //data.map( e => {name} )
      console.log(data, "data de pdfs")
      //setPdfs(data.pdfs || data);
      //setListElements(data);
    } catch (err) {
      console.error('Error al cargar PDFs:', err);
      setLoading(false);
    }
  };

  //cargar pdfs al inicio
  useEffect(() => {
    //comento funcion por que no hay api aun
    loadPdfs();
  }, []);

  const handleAddCertificate = async () => {
    console.log('Agregar nuevo certificado');
    setAddPdfModal(true);
    //  const result = await DocumentPicker.getDocumentAsync({
    //    type: 'application/pdf',
    //  });

    // if (!result.canceled && result.assets?.length) {
    //   const file = result.assets[0];
    //   const now = Date.now();

    //   const fileWithDate = { ...file, lastModified: now };
    //   setListElements((prev) => [...prev, fileWithDate]);
    // }
  };

  const saveCertificate = async (selectedElement: pdf) => {
    const formData = new FormData();
      formData.append('file', {
        uri: selectedElement.file.uri,
        type: selectedElement.file.mimeType,
        name: selectedElement.file.name,
      } as any )
      formData.append('file_name', selectedElement.file.name)
      formData.append('expiration_date', selectedElement.expirationDate.toISOString().split('T')[0]);

    return axios.post(`${API_BASE_URL}${UPLOAD_PDF_PATH}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      }
    })
  };

  const handleRemoveCertificate = async (id: string) => {
    console.log('Remover certificado');
    // try {
    //   await FileSystem.deleteAsync(file.uri, { idempotent: true });

    //   setListElements((prev) => prev.filter((c) => c.id !== file.id));
    //   console.log(`✅ Certificado eliminado: ${file.name}`);
    // } catch (error) {
    //   console.error('❌ Error al eliminar certificado:', error);
    // }
  };

  const handleViewCertificate = async (id: string) => {
    console.log('Ver certificado');
    const pdfURL = `${API_BASE_URL}${GET_PDF_PATH}${id}`
    setCurrentPdfUri(pdfURL);
    setPdfVisible(true);
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Certificados' }} />
      <Container>
        <View className="h-full w-full bg-[#0A1C34]">
          {/* Título principal */}
          <Text className="mt-10 text-center text-xl font-bold uppercase text-white sm:text-3xl">
            CERTIFICADOS
          </Text>

          <View className=" mx-auto h-3/4 w-10/12">
            {/* Botón Agregar */}
            <View className="mb-2 mt-6 items-start">
              <TouchableOpacity
                onPress={handleAddCertificate}
                className="rounded-md bg-white px-4 py-2 ">
                <Text className="font-semibold text-[#0A1C34]">Agregar nuevo</Text>
              </TouchableOpacity>
            </View>

            {/* Encabezado de columnas */}
            <View className="mt-6 flex-row justify-between border-b border-gray-400 px-4 py-2">
              <Text className="w-1/3 font-semibold text-white">Nombre</Text>
              <Text className="w-1/3 text-center font-semibold text-white">
                Fecha de expiración
              </Text>
              <Text className="w-1/3 text-right font-semibold text-white">Acciones</Text>
            </View>

            {/* Lista de elementos */}
            <ScrollView>
              {listElements &&
                listElements.map((item, index) => (
                  <View
                    key={index}
                    className="flex-row items-center justify-between border-b border-gray-300 bg-white px-4 py-3">
                    {/* Nombre */}
                    <Text className="w-1/3 font-bold text-gray-900">{item.name}</Text>

                    {/* Fecha */}
                    <Text className="w-1/3 text-center text-gray-700">
                      {item.expirationDate.toLocaleDateString('es-AR')}
                    </Text>

                    {/* Acciones */}
                    <View className="w-1/3 flex-row justify-end gap-5 space-x-5">
                      <TouchableOpacity onPress={() => handleViewCertificate(item.id!)}>
                        <AntDesign name="eye" size={24} color="#1e3a8a" />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => handleRemoveCertificate(item.id!)}>
                        <FontAwesome name="trash" size={24} color="#dc2626" />
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
            </ScrollView>
          </View>
        </View>
      </Container>

      <Modal visible={addPdfModal} animationType="fade" transparent={true}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#00000088',
          }}>
          <View
            className="mx-auto items-center bg-white    "
            style={{ padding: 20, borderRadius: 10, width: '50%' }}>
            <Text className=" mb-5 text-xl font-bold ">Agregar nuevo certificado</Text>

            {/* Selector de archivo PDF */}
            <TouchableOpacity
              className="mb-4  rounded bg-[#0A1C34] p-3"
              onPress={async () => {
                const result = await DocumentPicker.getDocumentAsync({
                  type: 'application/pdf',
                });

                if (!result.canceled && result.assets?.length) {
                  const newFile = {
                    file: result.assets[0],
                    expirationDate: expirationDate,
                    name: result.assets[0].name,
                  };

                  setSelectedElement(newFile);

                }
              }}>
              <Text className=" text-center text-white">
                {selectedElement ? selectedElement.name : 'Seleccionar PDF'}
              </Text>
            </TouchableOpacity>

            {/* Fecha de expiración */}
            <View className=" mb-5 mt-2 flex-row items-center justify-center">
              <Text className=" mr-2">Fecha de expiración:</Text>
              {Platform.OS === 'android' ? (
                <TouchableOpacity
                  className="  rounded border px-5 py-1 text-center"
                  onPress={() => setShowDatePicker(true)}>
                  <Text className="text-center">{expirationDate.toLocaleDateString('es-AR')}</Text>
                </TouchableOpacity>
              ) : null}

              {showDatePicker && (
                <DateTimePicker
                  value={expirationDate}
                  mode="date"
                  display="default"
                  onChange={(event, selectedDate) => {
                    setShowDatePicker(false);
                    if (selectedDate) {
                      setExpirationDate(selectedDate);
                    }
                  }}
                />
              )}
            </View>
            {/* Botones */}
            <View className="w-full flex-row  justify-between">
              <TouchableOpacity
                className="rounded bg-gray-300 px-4 py-2"
                onPress={() => {
                  setAddPdfModal(false);
                  setSelectedElement(null);
                }}>
                <Text>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="rounded bg-green-600 px-4 py-2"
                onPress={() => {
                  console.log('Fecha:', expirationDate);
                  console.log('Archivo:', selectedElement);
                  const newFile = saveCertificate(selectedElement!)
                  .then(response => {
                    console.log("Response: ", response.data);
                    const newFile : pdf = {
                      expirationDate: selectedElement!.expirationDate,
                      file: selectedElement!.file,
                      name: selectedElement!.name,
                      id: response.data.id
                    }
                    listElements && setListElements([...listElements, newFile]);
                    setAddPdfModal(false);
                    setSelectedElement(null);
                  })
                  .catch(error => {
                    console.log(error);
                  });
                }}>
                <Text className="text-white">Guardar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal visible={pdfVisible} animationType="slide" onRequestClose={() => setPdfVisible(false)}>
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
          <View style={{ padding: 10, alignItems: 'flex-end' }}>
            <TouchableOpacity onPress={() => setPdfVisible(false)} className="flex-row gap-2">
              <Text>
                <AntDesign name="closecircle" size={24} color="#0A1C34" />{' '}
              </Text>
            </TouchableOpacity>
          </View>

          {currentPdfUri && (
            <Pdf
              trustAllCerts={false}
              source={{ uri: currentPdfUri, cache: true }}
              style={styles.pdf}
              onLoadComplete={(numberOfPages, filePath) => {
                console.log(`Number of pages: ${numberOfPages}`);
              }}
              onPageChanged={(page, numberOfPages) => {
                console.log(`Current page: ${page}`);
              }}
              onError={(error) => {
                console.log('PDF Error:', error);
              }}
              onPressLink={(uri) => {
                console.log(`Link pressed: ${uri}`);
              }}
            />
          )}
        </View>
      </Modal>
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
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
