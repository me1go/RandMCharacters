/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Modal,
  I18nManager,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';

import List from './components/List';
import axios from 'axios';
import {FlatList} from 'react-native';
import {Image} from 'react-native';
import {Dimensions} from 'react-native';
import {TouchableHighlight} from 'react-native';
import CharacterItem from './components/CharachterItem';
const API = 'https://rickandmortyapi.com/api/';
import {useNavigation} from './hooks/useNavigation';
import DetailCharachter from './components/DetailCharachter';

export interface Charachters {
  id: number;
  name: string;
  status?: string;
  species?: string;
  gender?: string;
  image?: string;
}

const image = {url: './assets/randmhomejpg.jpg'};
const App = () => {
  const [characters, setCharacters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [
    onEndReachedCalledDuringMomentum,
    setonEndReachedCalledDuringMomentum,
  ] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState({
    id: 0,
    name: '',
    status: '',
    species: '',
    gender: '',
    image: '',
  });

  const getCharacters = (page = 1) => {
    axios
      .get(`${API}character/?page=${page}`)
      .then((response) => {
        console.log(`Getting Page ${page}`);
        let newData = characters;
        let data: Charachters[] =
          (response.data && response.data.results) || [];

        data.map((data: Charachters) => {
          newData.push(data);
        });
        setCharacters(newData);
        setTotalPages((response.data && response.data.info.pages) || 0);
        setCurrentPage(page);
      })
      .catch((error) => {
        console.log('error', error);
      });
    };
    useEffect(() => {
      getCharacters();
    }, []);
    const toggleModalVisibility = (visible: boolean) => {
    setShowModal(visible);
  };

  const setSelectedCharacterCallback = (character: Charachters) => {
    setSelectedCharacter(character);
  };

  const FlatListHeader = () => {
    return (
      <ImageBackground
        source={require('./assets/randmhomejpg.jpg')}
        style={styles.container}
        imageStyle={{opacity: 0.5}}>
        <Text style={styles.title}>Rick and Morty Charachters</Text>
      </ImageBackground>
    );
  };

  return (
    <>
      <FlatList
        style={styles.list}
        data={characters}
        initialNumToRender={20}
        ListHeaderComponent={FlatListHeader}
        renderItem={({item, index}: {item: Charachters; index: number}) => (
          <CharacterItem
            character={item}
            index={index}
            setSelectedCharacterCallback={setSelectedCharacterCallback}
            toggleModalVisibility={toggleModalVisibility}
          />
        )}
        keyExtractor={(item: Charachters) => item.id.toString()}
        onMomentumScrollBegin={() => {
          setonEndReachedCalledDuringMomentum(false);
        }}
        ListFooterComponent={() => <ActivityIndicator animating />}
        onEndReachedThreshold={0.3}
        onEndReached={() => {
          if (!onEndReachedCalledDuringMomentum) {
            getCharacters(currentPage + 1);
            setonEndReachedCalledDuringMomentum(true);
          }
        }}
      />
      <Modal
        animationType={'slide'}
        transparent={false}
        visible={showModal}
        onRequestClose={() => {
          setShowModal(false);
        }}>
        <DetailCharachter
          toggleModalVisibility={toggleModalVisibility}
          character={selectedCharacter}
        />
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    // marginTop: 30,
    // marginHorizontal: 20,
    height: 350,
    backgroundColor: 'white',
    width: '100%',
  },
  title: {
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: 50,
    textAlign: 'center',
    margin: 30,
    color: 'rgb(32, 35, 41)',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    // opacity: 0.4
  },
  scrollView: {
    marginHorizontal: 20,
  },
  list: {
    flex: 1,
    width: '100%',
    // padding: 10,
    marginTop: 10,
    backgroundColor: 'rgb(32, 35, 41)',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  row: {
    flex: 3,
    flexDirection: 'row',
    margin: 10,
    backgroundColor: 'rgb(60, 62, 68)',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },
  column: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  text: {
    fontSize: 18,
    color: 'rgb(255, 255, 255)',
  },
});

export default App;
