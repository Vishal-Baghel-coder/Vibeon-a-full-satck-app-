import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    StyleSheet,
    Modal,
    FlatList,
} from 'react-native';
import { RootStackParamList } from '../navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type VerificationProps = NativeStackNavigationProp<RootStackParamList, 'Verification'>;


const countries = [
    { name: 'Russia', code: 'RU', callingCode: '+7', flag: '🇷🇺', phoneNumberlength: 10 },
    { name: 'United States', code: 'US', callingCode: '+1', flag: '🇺🇸', phoneNumberlength: 10 },
    { name: 'India', code: 'IN', callingCode: '+91', flag: '🇮🇳', phoneNumberlength: 10 },
    { name: 'Germany', code: 'DE', callingCode: '+49', flag: '🇩🇪', phoneNumberlength: 10 },
    { name: 'France', code: 'FR', callingCode: '+33', flag: '🇫🇷', phoneNumberlength: 9 },
];

const Verification = () => {
    const navigation = useNavigation<VerificationProps>();
    const [selectedCountry, setSelectedCountry] = useState(countries[0]);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    const handleCountrySelect = (country: typeof countries[0]) => {
        setSelectedCountry(country);
        setModalVisible(false);
    };

    return (
        <SafeAreaView style={styles.container}>
            <Image
                source={require('./verification.png')}
                style={styles.image}
                resizeMode="cover"
            />

            <TouchableOpacity onPress={() => { navigation.goBack(); }} style={styles.backArrow}>
                <Text style={{ fontSize: 24 }}>←</Text>
            </TouchableOpacity>

            <Text style={styles.title}>Enter your phone number</Text>

            <View style={styles.inputRow}>
                <TouchableOpacity
                    style={styles.countryPicker}
                    onPress={() => setModalVisible(true)}
                >
                    <Text style={styles.flag}>{selectedCountry.flag}</Text>
                    <Text>{selectedCountry.callingCode}</Text>
                </TouchableOpacity>

                <TextInput
                    style={styles.input}
                    placeholder="Phone number"
                    keyboardType="phone-pad"
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                />

                {phoneNumber.length > 0 && (
                    <TouchableOpacity onPress={() => setPhoneNumber('')}>
                        <Text style={styles.clear}>×</Text>
                    </TouchableOpacity>
                )}
            </View>

            <TouchableOpacity
                style={styles.button}
                disabled={!selectedCountry.phoneNumberlength}
                onPress={() => navigation.navigate('Verifycode', { phoneNumber: selectedCountry.callingCode + phoneNumber })}
            >
                <Text style={[styles.buttonText, !phoneNumber && { opacity: 0.5 }]}>Continue</Text>
            </TouchableOpacity>

            {/* Country Modal */}
            <Modal visible={modalVisible} animationType="slide" transparent={true}>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <FlatList
                            data={countries}
                            keyExtractor={(item) => item.code}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.countryItem}
                                    onPress={() => handleCountrySelect(item)}
                                >
                                    <Text style={styles.flag}>{item.flag}</Text>
                                    <Text style={{ marginLeft: 10 }}>{item.name} ({item.callingCode})</Text>
                                </TouchableOpacity>
                            )}
                        />
                        <TouchableOpacity onPress={() => setModalVisible(false)}>
                            <Text style={styles.closeText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
    },
    image: {
        marginTop: 20,
        width: '100%',
        height: 180,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    backArrow: {
        marginTop: 20,
    },
    title: {
        fontSize: 22,
        marginVertical: 20,
        fontWeight: '500',
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#eee',
        borderWidth: 1,
        borderRadius: 12,
        paddingHorizontal: 10,
        paddingVertical: 12,
        backgroundColor: '#F8F8F8',
    },
    countryPicker: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10,
    },
    flag: {
        fontSize: 20,
        marginRight: 4,
    },
    input: {
        flex: 1,
        fontSize: 16,
    },
    clear: {
        fontSize: 22,
        color: '#888',
        marginLeft: 10,
    },
    button: {
        backgroundColor: '#A8D5FF',
        paddingVertical: 14,
        borderRadius: 16,
        marginTop: 30,
        alignItems: 'center',
    },
    buttonText: {
        color: '#285DFF',
        fontSize: 16,
        fontWeight: '600',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: '#00000088',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    modalContainer: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 20,
    },
    countryItem: {
        flexDirection: 'row',
        paddingVertical: 10,
        alignItems: 'center',
    },
    closeText: {
        textAlign: 'center',
        marginTop: 20,
        color: '#007AFF',
    },
});

export default Verification;
