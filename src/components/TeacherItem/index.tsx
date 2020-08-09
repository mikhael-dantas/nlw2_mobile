import React from 'react';
import { View, Image, Text, Linking } from 'react-native';

import styles from './styles';
import { RectButton } from 'react-native-gesture-handler';

import heartOutlineIcon from '../../assets/images/icons/heart-outline.png'
import unfavoriteIcon from '../../assets/images/icons/unfavorite.png'
import whatsappIcon from '../../assets/images/icons/whatsapp.png'

export interface Teacher {
    cost: string
    created_at: string
    id: number
    subject: string
    updated_at: string
    user: {
        avatar: string
        bio: string
        created_at: string
        id: number
        name: string
        updated_at: string
        whatsapp: string
    }
}

interface TeacherItemProps {
    teacher: Teacher
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher }) => {
    function handleLinkToWhatsapp () {
        Linking.openURL(`whatsapp://send?phone=+5511959945482`)
    }
    return (
        <View style={styles.container}>
            <View style={styles.profile}>
                <Image
                    style={styles.avatar}
                    source={{
                        uri: teacher.user.avatar
                    }}
                />
                <View style={styles.profileInfo}>
                    <Text style={styles.name}>{teacher.user.name}</Text>
                    <Text style={styles.subject}>{teacher.subject}</Text>
                </View>
            </View>

            <Text style={styles.bio} >{teacher.user.bio}</Text>

            <View style={styles.footer} >
                <Text style={styles.price}>
                    Preço/Hora {'   '}
                    <Text style={styles.priceValue}>
                        R$ {teacher.cost}
                    </Text>
                </Text>

                <View style={styles.buttonsContainer}>
                    {/* <RectButton style={[styles.favoriteButton, styles.favorited]}> */}
                        {/* <Image source={heartOutlineIcon} /> */}
                        {/* <Image source={unfavoriteIcon} /> */}
                    {/* </RectButton> */}

                    <RectButton onPress={handleLinkToWhatsapp} style={styles.contactButton}>
                        <Image source={whatsappIcon} />
                        <Text style={styles.contactButtonText}>Entrar em contato</Text>
                    </RectButton>
                </View>
            </View>
        </View>
    );
}

export default TeacherItem;