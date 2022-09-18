import { SafeAreaView } from 'react-native-safe-area-context'
import { Background } from '../../components/backgound';
import { styles } from './styles';
import { useNavigation, useRoute } from '@react-navigation/native'
import { GameParams } from '../../@types/navigation';
import { FlatList, Image, TouchableOpacity, View, Text} from 'react-native';
import { Entypo } from '@expo/vector-icons'
import { THEME } from '../../theme';
import React, { useEffect, useState } from 'react';
import logoImg from '../../assets/logo-nlw-esports.png';
import { Heading } from '../../components/Heading';
import { DuoCard, DouCardProps } from '../../components/DuoCard';
import { Inter_500Medium } from '@expo-google-fonts/inter';
import { DuoMatch } from '../../components/DuoMatch';

interface RouteParams{
  id: string;
  title: string;
  banner: string;
}

export function Game(){
  const route = useRoute();
  const game = route.params as GameParams;
  const navigation = useNavigation();
  const [duos, setDuos] = useState<DouCardProps[]>([]);
  const [discorDuoSelected, setDiscordDuoSelected] = useState('');

  function handleGoBack(){
    navigation.goBack();
  }

  async function getDiscordUser(adsId: string){
    useEffect(() =>{
      fetch(`http://192.168.100.6:3333/ads/${adsId}/discord`)
      .then(response => response.json())
      .then(data => setDiscordDuoSelected(data.discord))
    }, [])
  }

  useEffect(() =>{
    fetch(`http://192.168.100.6:3333/games/${game.id}/ads`)
    .then(response => response.json())
    .then(data => setDuos(data))
  }, [])
  
  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack}>
            <Entypo
              name='chevron-thin-left'
              color={THEME.COLORS.CAPTION_300}
              size={20}
            />
          </TouchableOpacity>

          <Image
            source={logoImg}
            style={styles.logo}
          />
          <View style={styles.right}/>
        </View>

        <Image
          source={{ uri: game.banner }}
          style={styles.cover}
          resizeMode='cover'
        />

        <Heading
          title={game.title}
          subtile='Conecte-se e começe a jogar!'
        />

        <FlatList
          data={duos}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <DuoCard data={item}
              onConnect={() => getDiscordUser(item.id)}
            />
          )}
          horizontal
          contentContainerStyle={[duos.length > 0 ? styles.contentList : styles.emptyListContent]}
          showsHorizontalScrollIndicator={false}
          style={styles.containerList}
          ListEmptyComponent={()=> (
            <Text style={styles.emptyListText}>
              Não há anúncios publicados para este game
            </Text>
          )}
        />
        <DuoMatch
          visible={discorDuoSelected.length > 0}
          discord="Kalleu"
          onClose={() => setDiscordDuoSelected('')}
        />
      </SafeAreaView>
    </Background>
  )
}