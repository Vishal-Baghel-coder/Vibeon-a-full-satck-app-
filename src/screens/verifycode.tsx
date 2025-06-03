import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { RootStackParamList } from '../navigation/types';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

type verifyreciveProp = RouteProp<RootStackParamList, 'Verifycode'>;
type VerificationsendProps = NativeStackNavigationProp<RootStackParamList, 'Verifycode'>;
export default function VerificationCodeScreen() {
    const route = useRoute<verifyreciveProp>();
    const { phoneNumber } = route.params;
    const navigation = useNavigation<VerificationsendProps>();
    const [code, setCode] = useState(['', '', '', '']);
    const [timer, setTimer] = useState(84); // 1:24 = 84 seconds

    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => setTimer(prev => prev - 1), 1000);
            return () => clearInterval(interval);
        }
    }, [timer]);

    const handleDigitPress = (digit: string) => {
        const newCode = [...code];
        const index = newCode.findIndex(c => c === '');
        if (index !== -1) {
            newCode[index] = digit;
            setCode(newCode);
        }
        if (newCode.every(c => c !== '')) {
            navigation.navigate('Userdetails', { phoneNumber: phoneNumber });
        }
    };

    const handleBackspace = () => {
        const newCode = [...code];
        let lastIndex = -1;
        for (let i = newCode.length - 1; i >= 0; i--) {
            if (newCode[i] !== '') {
                lastIndex = i;
                break;
            }
        }
        if (lastIndex !== -1) {
            newCode[lastIndex] = '';
            setCode(newCode);
        }
    };

    const resendCode = () => {
        if (timer === 0) {
            setCode(['', '', '', '']);
            setTimer(84);
            // Add actual resend logic here
        }
    };

    const renderCodeInputs = () =>
        code.map((digit, idx) => (
            <Text key={idx} style={styles.codeDigit}>
                {digit || '•'}
            </Text>
        ));

    const renderKeypad = () => {
        const digits = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
        return (
            <View style={styles.keypad}>
                {digits.map((d, idx) => (
                    <TouchableOpacity key={idx} onPress={() => handleDigitPress(d)} style={styles.keyButton}>
                        <Text style={styles.keyText}>{d}</Text>
                    </TouchableOpacity>
                ))}
                <TouchableOpacity onPress={handleBackspace} style={styles.keyButton}>
                    <Text style={styles.keyText}>⌫</Text>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Enter code</Text>
            <Text style={styles.subtitle}>We sent it to {phoneNumber}</Text>
            <View style={styles.codeContainer}>{renderCodeInputs()}</View>

            <TouchableOpacity
                onPress={resendCode}
                disabled={timer > 0}
                style={[styles.resendButton, timer > 0 && styles.disabledButton]}>
                <Text style={styles.resendText}>
                    {timer > 0 ? `New code ${Math.floor(timer / 60)}:${(timer % 60).toString().padStart(2, '0')}` : 'Resend Code'}
                </Text>
            </TouchableOpacity>

            {renderKeypad()}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, justifyContent: 'flex-start', backgroundColor: '#fff' },
    title: { fontSize: 28, fontWeight: '600', marginTop: 60 },
    subtitle: { fontSize: 16, color: 'gray', marginBottom: 40 },
    codeContainer: { flexDirection: 'row', justifyContent: 'center', marginBottom: 30 },
    codeDigit: { fontSize: 32, marginHorizontal: 10, borderBottomWidth: 1, width: 30, textAlign: 'center' },
    resendButton: { alignSelf: 'center', marginBottom: 30, padding: 10, backgroundColor: '#add8ff', borderRadius: 10 },
    disabledButton: { backgroundColor: '#d3d3d3' },
    resendText: { fontSize: 16, color: 'purple' },
    keypad: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly' },
    keyButton: { width: '30%', padding: 20, alignItems: 'center' },
    keyText: { fontSize: 28 },
});
