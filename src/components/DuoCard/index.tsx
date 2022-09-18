import React  from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { THEME } from '../../theme';
import { DuoInfo } from '../DuoInfo/inde';
import { GameController } from 'phosphor-react-native';
import { styles } from './styles';

export interface DouCardProps {
  id: string,
  name: string,
  weekDays: string[],
  useVoiceChannel: boolean,
  yearsPlaying: number,
  hourStatr: string,
  hourEnd: string
}

interface Props{
  data: DouCardProps;
  onConnect: () => void;
}

export function DuoCard({data, onConnect}: Props) {
  return (
    <View style={styles.container}>
      <DuoInfo 
        label='Nome'
        value={data.name}
      />
      <DuoInfo 
        label='Tempo de jogo'
        value={`${data.yearsPlaying} anos`}
      />
      <DuoInfo 
        label='Disponibilidade'
        value={`${data.weekDays.length} dias \u2022 ${data.hourStatr} - ${data.hourEnd}`}
      />
      <DuoInfo 
        label='Chamada de áudio'
        value={data.useVoiceChannel ? THEME.COLORS.SUCCESS : THEME.COLORS.ALERT}
        colorValue="gold"
      />

      <TouchableOpacity
        style={styles.button}
        onPress={onConnect}
      >
        <GameController
          color={THEME.COLORS.TEXT}
          size={20}
        />
        <Text style={styles.buttonTitle}>
          Conectar
        </Text>

      </TouchableOpacity>
    </View>
  )
}