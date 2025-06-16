import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, Dimensions, ImageBackground } from 'react-native';

const { width, height } = Dimensions.get('window');
const words = ['Create', 'Share', 'Inspire'];
const Entry = () => {
    const [text, setText] = useState('');
    const [wordIndex, setWordIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [cursorVisible, setCursorVisible] = useState(true);

    useEffect(() => {
        const typingSpeed = isDeleting ? 100 : 400;
        const pauseBeforeDelete = 1500;
        const pauseBeforeType = 700;

        const currentWord = words[wordIndex];

        let timeout;
        if (isDeleting) {
            if (charIndex > 0) {
                timeout = setTimeout(() => {
                    setText(currentWord.substring(0, charIndex - 1));
                    setCharIndex(charIndex - 1);
                }, typingSpeed);
            } else {
                timeout = setTimeout(() => {
                    setIsDeleting(false);
                    setWordIndex((w) => (w + 1) % words.length);
                }, pauseBeforeType);
            }
        } else {
            if (charIndex < currentWord.length) {
                timeout = setTimeout(() => {
                    setText(currentWord.substring(0, charIndex + 1));
                    setCharIndex(charIndex + 1);
                }, typingSpeed);
            } else {
                timeout = setTimeout(() => {
                    setIsDeleting(true);
                }, pauseBeforeDelete);
            }
        }

        return () => clearTimeout(timeout);
    }, [charIndex, isDeleting, wordIndex]);

    // Cursor blink
    useEffect(() => {
        const cursorTimer = setInterval(() => {
            setCursorVisible((prev) => !prev);
        }, 500);
        return () => clearInterval(cursorTimer);
    }, []);
    const navigation = useNavigation();
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.backgroundShapes} />
            <ImageBackground
                source={require('./home.png')}
                style={{ width: width * 1, height: height * 0.8, justifyContent: 'center', marginBottom: 20 }}
            >
                <View style={styles.content} >
                    <View style={styles.containerAnimation}>
                        <Text style={styles.typewriterText}>
                            {text}
                            {cursorVisible && <Text style={styles.cursor}>|</Text>}
                        </Text>
                    </View>
                    <Text style={styles.textLine}>
                        <Text style={styles.grayText}>the </Text>
                        <Text style={styles.blueText}>world</Text>
                    </Text>
                    <Text style={styles.textLine}>
                        <Text style={styles.blueText}>in your </Text>
                        <Text style={styles.grayText}>voice.</Text>
                    </Text>
                </View>
            </ImageBackground>

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Verification' as never)}>
                <Text style={styles.buttonText}>Continue with phone</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    containerAnimation: {
        width: 200,
        height: 50,
    },
    typewriterText: {
        fontSize: 34,
        fontWeight: '700',
        color: '#001F3F',
    },
    cursor: {
        color: '#4299e1',
    },
    container: {
        flex: 1,
        backgroundColor: '#648DB3', // light gradient alternative
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 70,
    },
    backgroundShapes: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#3A6D8C', // placeholder background
        zIndex: -1,
    },
    content: {
        paddingHorizontal: 30,
        alignItems: 'flex-start',
        zIndex: 3,
        marginBottom: 30,
        marginLeft: 20,
    },
    textLine: {
        fontSize: 34,
        fontWeight: '600',
        flexDirection: 'row',
    },
    grayText: {
        color: '#001F3F',
    },
    blueText: {
        color: '#3A6D8C',
    },
    button: {
        backgroundColor: '#C6E2FF',
        borderRadius: 20,
        paddingVertical: 15,
        paddingHorizontal: width * 0.24,
    },
    buttonText: {
        color: '#3A6D8C',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default Entry;

