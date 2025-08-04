import { Modal, Platform, Text, TouchableOpacity, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import axios from 'axios';
import { pdf } from '~/app/certificados';
import * as DocumentPicker from 'expo-document-picker';

export type ModalAddPdfProps = {
  listElements: pdf[] | null;
  setListElements: React.Dispatch<React.SetStateAction<pdf[] | null>>;
  selectedElement: pdf | null;
  setSelectedElement: React.Dispatch<React.SetStateAction<pdf | null>>;
  setAddPdfModal: React.Dispatch<React.SetStateAction<boolean>>;
  addPdfModal: boolean;
};

function ModalAddPdf({ listElements, setListElements,selectedElement,setSelectedElement, setAddPdfModal, addPdfModal }: ModalAddPdfProps) {
  // Base URL de la API
  const API_BASE_URL = 'http://localhost:8082';
  const UPLOAD_PDF_PATH = '/deck/certificates/upload';

  const [expirationDate, setExpirationDate] = useState(new Date().toLocaleDateString('en-CA'));
  const [showDatePicker, setShowDatePicker] = useState(false);

  const saveCertificate = async () => {
    console.log(selectedElement, 'pdf seleccionado');
    if (selectedElement) {
      const formData = new FormData();
      const newFile = {
        uri: selectedElement.file.uri,
        type: selectedElement.file.mimeType,
        name: selectedElement.file.name,
      };
      formData.append('file', newFile as any);
      formData.append('file_name', selectedElement.file.name);
      formData.append('expiration_date', selectedElement.expirationDate);

      axios
        .post(`${API_BASE_URL}${UPLOAD_PDF_PATH}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((resultado) => {
          console.log('se agrego nuevo certificado con id=>', resultado.data.id);
          const postId = resultado.data.id;
          if (selectedElement) {
            const fullElement = {
              ...selectedElement,
              id: postId,
            };
            if (listElements) {
              setListElements([...listElements, fullElement]);
            }
          }

          setAddPdfModal(false);
          setSelectedElement(null);
          setExpirationDate(new Date().toLocaleDateString('en-CA'));
        })
        .catch((error) => {
          console.error('Error al subir PDF:', error);
        });
    }
  };
  return (
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
                  fileName: result.assets[0].name,
                };

                setSelectedElement(newFile);
              }
            }}>
            <Text className=" text-center text-white">
              {selectedElement ? selectedElement.fileName : 'Seleccionar PDF'}
            </Text>
          </TouchableOpacity>

          {/* Fecha de expiración */}
          <View className=" mb-5 mt-2 flex-row items-center justify-center">
            <Text className=" mr-2">Fecha de expiración:</Text>
            {Platform.OS === 'android' ? (
              <TouchableOpacity
                className="  rounded border px-5 py-1 text-center"
                onPress={() => setShowDatePicker(true)}>
                <Text className="text-center">{expirationDate}</Text>
              </TouchableOpacity>
            ) : null}

            {showDatePicker && (
              <DateTimePicker
                value={new Date(expirationDate)}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  setShowDatePicker(false);
                  if (selectedDate) {
                    const formattedDate = selectedDate.toLocaleDateString('en-CA');
                    setExpirationDate(formattedDate);
                    selectedElement &&
                      setSelectedElement({ ...selectedElement, expirationDate: formattedDate });
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
                saveCertificate();
              }}>
              <Text className="text-white">Guardar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default ModalAddPdf;
