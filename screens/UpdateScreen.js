import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Input, Button } from 'react-native-elements';


export default function UpdateScreen({ route, navigation }) {
    const { id } = route.params;
    const { nama } = route.params;
    const { nomor } = route.params;

    const [isLoading, setLoading] = useState(true);
    const [isId, setId] = useState(id);
    const [isNama, setNama] = useState(nama);
    const [isNomor, setNomor] = useState(nomor);


    const updateData = () => {
        if (isNama != '' && isNomor != '') {

            fetch('http://192.168.43.116/BBPLK-Bekasi/rest_ci/index.php/kontak', {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: isId,
                    nama: isNama,
                    nomor: isNomor
                })
            })
                .then((response) => {
                    alert('Data berhasil diupdate');
                    navigation.navigate('Dashboard');
                })
                .catch((error) => {
                    alert('Data Gagal ditambahkan');
                });
        } else {
            alert('Masih ada yang kosong, tolong lengkapi!');
        }

    }
    return (
        <View style={styles.container}>

            <View style={styles.inputForm}>
                <Input
                    value={isId} disabled
                />
                <Input
                    placeholder='Input your name'
                    value={isNama}
                    onChangeText={(text) => setNama(text)} />
                <Input
                    placeholder='Input your number'
                    value={isNomor}
                    onChangeText={(text) => setNomor(text)}
                    keyboardType='numeric' />
                <View style={{ flexDirection: 'row', marginVertical: 10, paddingTop: 20 }}>
                    <View style={{ width: '50%', marginRight: 5 }}>
                        <Button 
                        title="CANCEL" 
                        buttonStyle={{ backgroundColor: 'orange' }} 
                        onPress={() => navigation.goBack()}/>
                    </View>
                    <View style={{ width: '50%' }}>
                        <Button title="UPDATE" onPress={() =>updateData() } />
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 25,
        justifyContent: 'flex-start'
    },
    inputForm: {
        width: '100%',
        borderColor: 'black',
        borderWidth: 1,
        padding: 5,
        marginBottom: 10,
    },
});
