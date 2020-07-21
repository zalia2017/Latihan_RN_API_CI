import React from 'react'
import { View, Text, StyleSheet, ToastAndroid } from 'react-native'
import { Button } from 'react-native-elements';
import call from 'react-native-phone-call';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function DetailsScreen({ route, navigation }) {
    const { id } = route.params;
    const { nama } = route.params;
    const { nomor } = route.params;

    const callNomor = () => {
        const args = {
            number: {nomor}.nomor,
            prompt: false
        }
        call(args).catch(console.error)
    }
    const deleteData = () => {
        fetch('http://192.168.43.116/BBPLK-Bekasi/rest_ci/index.php/kontak/', {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'id=' + id,
        })
            .then((response) => {
                if (response.status === 400) {
                    ToastAndroid.show("Data gagal dihapus", ToastAndroid.SHORT);
                }else{

                    ToastAndroid.show("Data berhasil dihapus", ToastAndroid.SHORT);
                    navigation.navigate('Dashboard');
                }
            })
            .catch((error) => {
                ToastAndroid.show("Data gagal dihapus", ToastAndroid.SHORT);;
            });
    }

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row' }}>
                <Text style={{ flex: 3 }}>ID </Text>
                <Text style={{ flex: 1 }}>:</Text>
                <Text style={{ flex: 4 }}>{id} </Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <Text style={{ flex: 3 }}>Nama </Text>
                <Text style={{ flex: 1 }}>:</Text>
                <Text style={{ flex: 4 }}>{nama} </Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <Text style={{ flex: 3 }}>Nomor </Text>
                <Text style={{ flex: 1 }}>:</Text>
                <View style={{ flex: 4 }}>
                    <TouchableOpacity onPress={() => callNomor()}>
                        <Text>{nomor}</Text>
                    </TouchableOpacity>
                </View>

            </View>
            <View style={{ flexDirection: 'row', borderTopColor: 'grey', borderTopWidth: 1, marginVertical: 10, paddingTop: 20 }}>
                <View style={{ width: '50%', marginRight: 5 }}>
                    <Button title="DELETE" onPress={() => deleteData()} buttonStyle={{ backgroundColor: 'red' }} />
                </View>
                <View style={{ width: '50%' }}>
                    <Button title="EDIT" onPress={() => navigation.navigate('Update', {
                        id: id,
                        nama: nama,
                        nomor: nomor,
                    })} />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 45,
        justifyContent: 'flex-start',
    },
})
