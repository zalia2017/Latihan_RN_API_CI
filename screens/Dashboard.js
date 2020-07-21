import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, ScrollView, TouchableOpacity, ToastAndroid, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Input, Button, ListItem } from 'react-native-elements';


export default function Dashboard({ navigation }) {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [id, setId] = useState("");
    const [nama, setNama] = useState("");
    const [nomor, setNomor] = useState("");

    //Get data dari localhost
    const getData = () => {
        fetch('http://192.168.43.116/BBPLK-Bekasi/rest_ci/index.php/kontak')
            .then((response) => response.json())
            .then((json) => setData(json))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));

    }
    useEffect(() => {
        setInterval(() => {
            getData();
        }, 1000);
    }, [])

    //Menambahkan data dengan endpoint dari localhost
    const addData = () => {
        if (nama != '' && nomor != '') {

            fetch('http://192.168.43.116/BBPLK-Bekasi/rest_ci/index.php/kontak', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: 'NULL',
                    nama: nama,
                    nomor: nomor
                })
            })
                .then((response) => ToastAndroid.show("Data berhasil ditambahkan", ToastAndroid.SHORT))
                .catch((error) => {
                    ToastAndroid.show("Data gagal ditambahkan", ToastAndroid.SHORT);
                });
            setNomor("");
            setNama("");
        } else {
            ToastAndroid.show("Masih ada data yang kosong", ToastAndroid.SHORT);
        }

    }
    return (
        <View style={styles.container}>

            <View style={styles.inputForm}>
                <ScrollView>
                    <Input
                        placeholder='Input your name'
                        value={nama}
                        onChangeText={(text) => setNama(text)} />
                    <Input
                        placeholder='Input your number'
                        value={nomor}
                        onChangeText={(text) => setNomor(text)}
                        keyboardType={'numeric'} />
                    <Button
                        title="Submit"
                        onPress={() => addData()} />
                </ScrollView>
            </View>
            <View style={styles.formData}>
                <Text style={{ textAlign: 'center', backgroundColor: 'grey', fontSize: 20, color: 'white' }}>The List of Data</Text>
                {isLoading ? <ActivityIndicator size="large" color="#0000ff" style={{marginTop: 120}}/> :
                    <ScrollView>
                        {
                            data.map((l, i) => (
                                <TouchableOpacity onPress={() => navigation.navigate('Details', {
                                    id: l.id,
                                    nama: l.nama,
                                    nomor: l.nomor,
                                })}>

                                    <ListItem
                                        key={i}
                                        title={
                                            <View>
                                                <Text style={{fontSize: 20}}>{i+1}.{l.nama}</Text>
                                            </View>
                                        }
                                        subtitle={l.nomor}
                                        bottomDivider
                                    />
                                </TouchableOpacity>
                            ))
                        }
                    </ScrollView>
                }
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
        justifyContent: 'center'
    },
    inputForm: {
        flex: 3,
        width: '100%',
        borderColor: 'black',
        borderWidth: 1,
        padding: 5,
        marginBottom: 10,
    },
    formData: {
        flex: 6,
        borderColor: 'black',
        borderWidth: 1,
        width: '100%'
    }
});
