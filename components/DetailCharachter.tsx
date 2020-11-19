import React, {useState} from 'react';
import {
  Button,
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from 'react-native';

export interface Charachters {
  id: number;
  name: string;
  status?: string;
  species?: string;
  gender?: string;
  image?: string;
  location: Location;
  type?: string;
}
export interface Location {
  name: string;
  url: string;
}

interface IProps {
  character: Charachters;
  toggleModalVisibility: any;
}

export default function DetailCharachter({
  character,
  toggleModalVisibility,
}: IProps) {
  return (
    <View style={styles.modal}>
      <TouchableNativeFeedback
        // style={{width: 55, height: 35, zIndex: 1,}}
        onPress={() => toggleModalVisibility(false)}>
        <Image
          source={require('../assets/backicon.jpg')}
          style={styles.closeIcon}
          // resizeMode="crontain"

          key={character.id}
        />
      </TouchableNativeFeedback>

      <View style={styles.container}>
        <Image
          source={{uri: character.image}}
          style={styles.image}
          // resizeMode="crontain"
          key={character.id}
        />

        <View style={[styles.column, {marginLeft: 10}]}>
          <Text style={[styles.text, {fontWeight: 'bold', fontSize: 40}]}>
            {character.name}
          </Text>
          <Text style={styles.subtitle}>Status </Text>
          <View style={{flex: 1, alignItems: 'center'}}>
            <View
              style={{flexDirection: 'row', alignItems:'center'}}>
              <Image
                source={character.status=='Alive'?(require('../assets/greenicon.png')):(require('../assets/redicon.png'))}
                style={{width: 10, height: 10,marginRight:5}}
              />
            <Text style={styles.text}>{character.status}</Text>
            </View>
            <Text style={styles.subtitle}>Species </Text>
            <Text style={styles.text}>{character.species}</Text>
            <Text style={styles.subtitle}>Type </Text>
            <Text style={styles.text}>
              {character.type ? character.type : 'No Type'}
            </Text>
            <Text style={styles.subtitle}>Gender </Text>
            <Text style={styles.text}>{character.gender}</Text>
            <Text style={styles.subtitle}>Last Know Location </Text>
            <Text style={styles.text}>{character.location.name}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    // alignItems: 'center',
    backgroundColor: 'rgb(32, 35, 41)',
    // padding: ,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(60, 62, 68)',
    // marginTop: 100,
    margin: 30,
    marginTop: 50,
    borderRadius: 20,
    overflow:'scroll'
  },
  text: {
    fontSize: 20,
    color: 'rgb(255, 255, 255)',
    textAlign: 'center',
  },
  subtitle: {
    color: 'rgb(158, 158, 158)',
    fontSize: 16,
    textAlign: 'center',
    marginTop:15

  },
  image: {
    width: '80%',
    height: undefined,
    aspectRatio: 1,
    borderRadius: 8,
    margin: 20,

  },
  closeIcon: {
    height: 50,
    width: 50,
    marginTop:55,
    position:'absolute',
    zIndex:1,
    marginLeft:5
  },
  column: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
});
