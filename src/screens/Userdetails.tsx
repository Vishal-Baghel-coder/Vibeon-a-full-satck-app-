import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { RootStackParamList } from '../navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
type UserdetailsreciveProp = RouteProp<RootStackParamList, 'Userdetails'>
type UserdetailsendProp = NativeStackNavigationProp<RootStackParamList, 'Userdetails'>

const Userdetails = () => {
    const route = useRoute<UserdetailsreciveProp>();
    const { phoneNumber } = route.params;
    const navigation = useNavigation<UserdetailsendProp>();
    const [fullName, setFullName] = useState('');
    const [username, setUsername] = useState('');
    const [phone, setPhone] = useState(phoneNumber);
    const [email, setEmail] = useState('');
    const [bio, setBio] = useState('');
    const handleSubmit = () => {
        console.log('Profile submitted');
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.card}>
                    <Text style={styles.title}>Complete Your Profile</Text>
                    {/* Profile Picture Upload */}
                    <View style={styles.profileSection}>
                        <View style={styles.profileCircle}>
                            <Text style={styles.cameraIcon}>👤</Text>
                        </View>
                        <TouchableOpacity style={styles.uploadButton}>
                            <Text style={styles.uploadText}>Upload Photo</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Full Name */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>
                            Full Name <Text style={styles.required}>*</Text>
                        </Text>
                        <TextInput
                            style={styles.input}
                            placeholder="John Smith"
                            value={fullName}
                            onChangeText={setFullName}
                        />
                    </View>

                    {/* Username */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>
                            Username <Text style={styles.required}>*</Text>
                        </Text>
                        <TextInput
                            style={styles.input}
                            placeholder="johnsmith"
                            value={username}
                            onChangeText={setUsername}
                        />
                    </View>

                    {/* Phone */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>
                            Phone <Text style={styles.required}>*</Text>
                        </Text>
                        <View style={styles.phoneContainer}>
                            <View style={styles.countryCode}>
                                <Text>🇮🇳 +91</Text>
                            </View>
                            <TextInput
                                style={[styles.input, styles.phoneInput]}
                                placeholder="Phone number"
                                keyboardType="phone-pad"
                                value={phone}
                                onChangeText={setPhone}
                            />
                        </View>
                    </View>

                    {/* Email */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>
                            Email <Text style={styles.required}>*</Text>
                        </Text>
                        <TextInput
                            style={styles.input}
                            placeholder="john@example.com"
                            keyboardType="email-address"
                            value={email}
                            onChangeText={setEmail}
                        />
                    </View>

                    {/* Bio */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>
                            About You <Text style={styles.optional}>(Optional)</Text>
                        </Text>
                        <TextInput
                            style={[styles.input, styles.bioInput]}
                            placeholder="Tell us about yourself..."
                            multiline
                            numberOfLines={4}
                            value={bio}
                            onChangeText={setBio}
                        />
                        <Text style={styles.charCount}>
                            {bio.length}/120 characters
                        </Text>
                    </View>

                    {/* Buttons */}
                    <View style={styles.buttonGroup}>
                        <TouchableOpacity
                            style={styles.submitButton}
                            onPress={() => navigation.navigate('TabNavigation' as never)}
                        >
                            <Text style={styles.buttonText}>Submit Profile</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e4edf5',
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 10,
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 20,
        elevation: 5,
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        color: '#2d3748',
        textAlign: 'center',
        marginBottom: 25,
    },
    profileSection: {
        alignItems: 'center',
        marginBottom: 25,
    },
    profileCircle: {
        width: 110,
        height: 110,
        borderRadius: 55,
        backgroundColor: '#f8fafc',
        borderWidth: 2,
        borderStyle: 'dashed',
        borderColor: '#cbd5e0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cameraIcon: {
        fontSize: 36,
        color: '#94a3b8',
    },
    uploadButton: {
        marginTop: 15,
        backgroundColor: '#f1f5f9',
        paddingVertical: 10,
        paddingHorizontal: 22,
        borderRadius: 8,
    },
    uploadText: {
        color: '#4c6ef5',
        fontWeight: '600',
    },
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        color: '#475569',
        fontWeight: '500',
        marginBottom: 8,
        fontSize: 15,
    },
    required: {
        color: '#f56565',
    },
    optional: {
        color: '#94a3b8',
        fontWeight: 'normal',
    },
    input: {
        borderWidth: 1,
        borderColor: '#e2e8f0',
        borderRadius: 10,
        padding: 14,
        fontSize: 16,
    },
    phoneContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    countryCode: {
        backgroundColor: '#f8fafc',
        borderWidth: 1,
        borderColor: '#e2e8f0',
        borderRightWidth: 0,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        padding: 14,
    },
    phoneInput: {
        flex: 1,
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
    },
    bioInput: {
        minHeight: 100,
        textAlignVertical: 'top',
    },
    charCount: {
        textAlign: 'right',
        color: '#94a3b8',
        fontSize: 13,
        marginTop: 4,
    },
    buttonGroup: {
        flexDirection: 'row',
        gap: 15,
        marginTop: 10,
    },
    submitButton: {
        flex: 1,
        backgroundColor: '#4c6ef5',
        borderRadius: 10,
        padding: 16,
        alignItems: 'center',
    },
    skipButton: {
        flex: 1,
        backgroundColor: '#f1f5f9',
        borderRadius: 10,
        padding: 16,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 16,
    },
    skipText: {
        color: '#64748b',
        fontWeight: '600',
        fontSize: 16,
    },
});

export default Userdetails;
