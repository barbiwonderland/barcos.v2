import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import axios from 'axios';
import { useState } from 'react';
import {  ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { pdf } from '~/app/certificados';
import ModalPdf from './ModalViewPdf';

function ListPdf({listElements}: {listElements: pdf[] | null}) {

    const [pdfVisible, setPdfVisible] = useState(false);
    const [currentPdfUri, setCurrentPdfUri] = useState<string | null>(null);
  

  // Base URL de la API
  const API_BASE_URL = 'http://localhost:8082';
  const GET_PDF_PATH = '/deck/certificates/';

  const handleRemoveCertificate = async (id: string) => {
    console.log('Remover certificado');
    axios
      .delete(`http://localhost:8082/deck/certificates/${id}`)
      .then((response) => {
        console.log('Recurso eliminado:', response.data);
      })
      .catch((error) => {
        console.error('Error al eliminar el recurso:', error);
      });
  };

  const handleViewCertificate = async (id: string) => {
    console.log('Ver certificado');
    const pdfURL = `${API_BASE_URL}${GET_PDF_PATH}${id}`;
    setCurrentPdfUri(pdfURL);
    setPdfVisible(true);
  };

  return (
    <>
      {/* Encabezado de columnas */}
      <View className="mt-6 flex-row justify-between border-b border-gray-400 px-4 py-2">
        <Text className="w-1/3 font-semibold text-white">Nombre</Text>
        <Text className="w-1/3 text-center font-semibold text-white">Fecha de expiración</Text>
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
              <Text className="w-1/3 font-bold text-gray-900">{item.fileName}</Text>

              {/* Fecha */}
              <Text className="w-1/3 text-center text-gray-700">
                {item.expirationDate.toString()}
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

  <ModalPdf pdfVisible={pdfVisible} currentPdfUri={currentPdfUri} setPdfVisible={setPdfVisible} />
    </>
  );
}

export default ListPdf;
