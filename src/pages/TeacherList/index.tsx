import React, { useState } from 'react';
import { View, ScrollView, Text, TextInput } from 'react-native';

// import { Container } from './styles';
import styles from './styles'
import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';

import { Feather } from "@expo/vector-icons"
import api from '../../services/api';


const TeacherList: React.FC = () => {
    const [teachers, setTeachers] = useState([])

    const [subject, setSubject] = useState('')
    const [week_day, setWeekDay] = useState('')
    const [time, setTime] = useState('')

    async function handleFiltersSubmit () {
        const response = await api.get('classes', {
            params: {
                subject,
                week_day,
                time
            }
        })

        setTeachers(response.data)
        setIsFilterVisible(false)
    }

    const [isFilterVisible, setIsFilterVisible] = useState(false)

    function handleToggleFiltersVisibility () {
        setIsFilterVisible(!isFilterVisible)
    }
    return (
        <View style={styles.container} >
            <PageHeader title='Proffys disponíveis' headerRight={(
                <BorderlessButton onPress={handleToggleFiltersVisibility} >
                    <Feather name='filter' size={20} color={'#fff'} />
                </BorderlessButton>
            )}>
                { isFilterVisible &&
                    (<View style={styles.searchForm}>
                        <Text style={styles.label}>Matéria</Text>
                        <TextInput 
                            style={styles.input} 
                            placeholder='Qual é a matéria?'
                            value={subject}
                            onChangeText={text => setSubject(text)}
                            placeholderTextColor='#c1bccc'
                        />
                        <View style={styles.inputGroup}>

                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Dia da semana</Text>
                                <TextInput 
                                    style={styles.input}   
                                    placeholder='Qual o dia?'
                                    value={week_day}
                                    onChangeText={text => setWeekDay(text)}
                                    placeholderTextColor='#c1bccc'
                                />
                            </View>

                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Horário</Text>
                                <TextInput 
                                    style={styles.input} 
                                    placeholder='Qual a hora?'
                                    value={time}
                                    onChangeText={text => setTime(text)}
                                    placeholderTextColor='#c1bccc'
                                />
                            </View>

                        </View>
                        <RectButton onPress={handleFiltersSubmit} style={styles.submitButton}>
                            <Text style={styles.submitButtonText}>Buscar</Text>
                        </RectButton>
                    </View>)
                }
            </PageHeader>
            <ScrollView 
                style={styles.teacherList}
                contentContainerStyle={{
                    paddingHorizontal:16,
                    paddingBottom:24
                }}
            >
                {teachers.map((teacherItem: Teacher) => {
                    return <TeacherItem key={teacherItem.id} teacher={teacherItem} />
                })}
            </ScrollView>
        </View>
    )
}

export default TeacherList;