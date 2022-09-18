import { View, Modal, ModalProps, Text, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { styles } from "./styles";
import { MaterialIcons } from '@expo/vector-icons';
import { THEME } from "../../theme";
import { CheckCircle } from 'phosphor-react-native';
import { Heading } from '../Heading';
import React, { useState } from "react";
import * as Clipboard from 'expo-clipboard';

interface Props extends ModalProps {
  discord: string
  onClose: () => void;
}

export function DuoMatch({discord, onClose, ...rest}: Props){
  const [isCopping, setIsCopping] = useState(false);

  async function handleCopyDiscordToClipboard(){
    setIsCopping(true);
    await Clipboard.setStringAsync(discord);
    Alert.alert('Discord cópiado!', 'Usúario copiado para area de transferência')
    setIsCopping(false);
  }

  return(
    <Modal
      animationType="fade"
      transparent
      statusBarTranslucent
      {...rest}
    >
      <View style={styles.container}>
        <View style={styles.contet}>
          <TouchableOpacity
            style={styles.closeIcon}
            onPress={onClose}
          >
            <MaterialIcons
              name="close"
              size={20}
              color={THEME.COLORS.CAPTION_500}
            />
          </TouchableOpacity>
          <CheckCircle
            size={64}
            color={THEME.COLORS.SUCCESS}
            weight='bold'
          />
          <Heading
            title="Les't play!"
            subtile="Agora é só começar a jogar!"
            style={{alignItems: 'center', margin: 24}}
          />
          <Text style={styles.label}>
            Adicione seu discord
          </Text>
          <TouchableOpacity
            style={styles.discordbutton}
            onPress={handleCopyDiscordToClipboard}
            disabled={isCopping}
          >
            <Text style={styles.discord}>
              {isCopping ? <ActivityIndicator color={THEME.COLORS.PRIMARY}/> : discord}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}