import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

export interface Charachters {
  id: number;
  name: string;
  status?: number;
  species?: string;
  gender?: string;
  image?: string;
  location?:Location
  type?:string

}
export interface Location {
name:string,
url:string
}

interface IProps {
  character: Charachters;
  index: number;
  toggleModalVisibility: any;
  setSelectedCharacterCallback: any;
}

export default function CharacterItem({
  character,
  index,
  toggleModalVisibility,
  setSelectedCharacterCallback,
}: IProps) {
  return (
    <TouchableHighlight
      onPress={() => {
        setSelectedCharacterCallback(character);
        toggleModalVisibility(true);
      }}>
      <View key={character.id} style={styles.row}>
        <Image
          source={{uri: character.image}}
          style={styles.image}
          // resizeMode="crontain"
          key={character.id}
        />

        <View style={[styles.column, {marginLeft: 10}]}>
          <Text style={[styles.text, {fontWeight: 'bold',fontSize:25}]}>
            {character.name}
          </Text>
          <Text style={styles.text}>{character.species}</Text>
          <Text style={(character.status=='Alive')?styles.alive:styles.dead}>{character.status}</Text>
        </View>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    marginHorizontal: 20,
  },
  scrollView: {
    marginHorizontal: 20,
  },
  list: {
    flex: 1,
    width: '100%',
    padding: 10,
    marginTop: 10,
    backgroundColor: 'rgb(32, 35, 41)',
  },
  image: {
    height: "100%",
    width: undefined,
    aspectRatio: 1,
    borderRadius: 10,
    // margin:10

  },
  row: {
    flex: 3,
    flexDirection: 'row',
    margin: 10,
    height:120,
    width:'97.5%',
    backgroundColor: 'rgb(60, 62, 68)',
    borderRadius: 10,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // borderColor: '#fff',
    // overflow: "hidden",
    // // margin: 0.75rem;
    shadowColor: 'white',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
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
  alive: {
    fontSize: 18,
    color: 'green',
  },
  dead: {
    fontSize: 18,
    color: 'red',
  },
});
