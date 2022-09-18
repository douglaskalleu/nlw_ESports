import { Image, FlatList} from 'react-native'; 
import { SafeAreaView } from 'react-native-safe-area-context'
import { styles } from './styles';
import { Heading } from '../../components/Heading';
import { GameCardProps, GamesCard } from '../../components/GamesCard';
import { useEffect, useState } from 'react';
import { Background } from '../../components/backgound';
import { useNavigation } from '@react-navigation/native'
import logoImg from '../../assets/logo-nlw-esports.png';


export  function Home() {
  const [games, setGames] = useState<GameCardProps[]>([]);
  const navigation = useNavigation();

  function handleOpenGame({id, title, banner}: GameCardProps){
    navigation.navigate('game', {id, title, banner});
  }

  useEffect(() =>{
    fetch('http://192.168.100.6:3333/games')
    .then(response => response.json())
    .then(data => setGames(data))
  }, [])

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Image
          source={logoImg}
          style={styles.logo}
        />

        <Heading
          title={'Encontre seu duo!'}
          subtile={'Selecione o game que deseja jogar...'}
        />
        <FlatList
          data={games}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <GamesCard
              data={item}
              onPress={() => handleOpenGame(item)}
            />
          )}
          showsHorizontalScrollIndicator={false}
          horizontal
          contentContainerStyle={styles.contentList}
        />
      </SafeAreaView>
    </Background>
  )
}