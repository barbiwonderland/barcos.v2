import AntDesign from '@expo/vector-icons/AntDesign';
import React from 'react'
import { Dimensions, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Pdf from 'react-native-pdf';

type BotonAbrirPDFProps = {
  setPdfVisible: React.Dispatch<React.SetStateAction<boolean>>;
  currentPdfUri : string | null
  pdfVisible: boolean 
  
};


function ModalViewPdf({currentPdfUri,pdfVisible, setPdfVisible }: BotonAbrirPDFProps) {
  return (
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
  )
}

export default ModalViewPdf


const styles = StyleSheet.create({
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});