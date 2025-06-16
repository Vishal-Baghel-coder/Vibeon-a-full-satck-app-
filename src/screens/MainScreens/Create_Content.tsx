/* eslint-disable react-native/no-inline-styles */
import React, { useRef } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Dimensions,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    TouchableHighlight,
    Keyboard,
} from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width, height } = Dimensions.get('window');
export default function CreateScreen() {
    const mediaOptions = [
        {
            id: 1,
            name: 'Short Video',
        },
        {
            id: 2,
            name: 'Tweet',
        },
        {
            id: 3,
            name: 'Long Video',
        },
    ];
    const progressValue = useSharedValue<number>(0);
    const ref = useRef<ICarouselInstance>(null);
    return (
        <KeyboardAvoidingView style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={0}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView
                    contentContainerStyle={styles.maincontainer}
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={styles.container}>
                        <View style={styles.header}>
                            <TouchableHighlight underlayColor="transparent">
                                <Ionicons name="arrow-back" size={24} color="#fff" />
                            </TouchableHighlight>
                            <Text style={styles.headerText}>Create</Text>
                        </View>

                        <View style={styles.textBox}>
                            <Text style={styles.inputLabel}>Reel</Text>
                            <TextInput
                                multiline
                                placeholder="Write your text here..."
                                value={'Reel'}
                                style={styles.input}
                            />

                            <TouchableOpacity style={styles.imageButton}>
                                <Text style={styles.imageButtonText}>Add image</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ alignItems: 'center', position: 'absolute', bottom: height * 0.07 }}>
                            <View style={{ width: width * 0.3, backgroundColor: 'rgba(0,0,0,0.4)', height: height * 0.054, position: 'absolute', borderRadius: 20, zIndex: 0 }} />
                            <Carousel
                                ref={ref}
                                width={width}
                                height={height * 0.08}
                                scrollAnimationDuration={1000}
                                vertical={false}
                                loop={false}
                                pagingEnabled={true}
                                mode="parallax"
                                style={{
                                    zIndex: 10, // Ensure the carousel is above the background view
                                }}
                                modeConfig={{
                                    parallaxScrollingScale: 1, // Lower scale for inactive items
                                    parallaxAdjacentItemScale: 0.7, // Ensure adjacent items don't scale up
                                    parallaxScrollingOffset: width * 0.637,
                                }}
                                onProgressChange={(_, absoluteProgress) => {
                                    progressValue.value = absoluteProgress;

                                }}
                                data={mediaOptions}
                                renderItem={({ item, index }) => {
                                    const isActive = ref.current?.getCurrentIndex() === index;
                                    const opacity = isActive ? 1 : 0.6;
                                    // Scale up the active item
                                    // Map animationValue.value (0 = inactive, 1 = active) to opacity range
                                    return (
                                        <View
                                            style={{
                                                alignSelf: 'center',
                                                opacity: opacity,
                                                backgroundColor: 'rgba(77, 113, 163, 0.5)',
                                                borderRadius: 20,
                                                borderColor: '#9DB2BF',
                                                borderWidth: 1,
                                                width: width * 0.3,
                                                height: height * 0.054,
                                                justifyContent: 'center',
                                                zIndex: 10,
                                            }}
                                        >
                                            <Text style={{ fontSize: 16, color: '#DDE6ED', textAlign: 'center' }}>{item.name}</Text>
                                        </View>
                                    );
                                }}
                            />
                        </View>
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    maincontainer: {
        flexGrow: 1,
    },
    container: {
        flex: 1,
        height: height,
        alignContent: 'center',
        backgroundColor: '#9DB2BF',
        position: 'static',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#27374D',
        height: height * 0.08,
    },
    headerText: {
        fontSize: 24,
        fontWeight: '600',
        color: '#DDE6ED',
        marginLeft: 10,
    },
    toggleContainer: {
        backgroundColor: '#d4ebf2',
        borderRadius: 20,
        alignContent: 'center',
        position: 'absolute',
        bottom: height * 0.1,
        width: width * 0.8,
        height: height * 0.05,
    },
    toggleButton: {
        paddingHorizontal: 10,
    },
    textBox: {
        backgroundColor: '#eff6f7',
        borderRadius: 10,
        margin: 10,
        padding: 10,
    },
    inputLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 6,
    },
    input: {
        minHeight: 100,
        fontSize: 16,
        maxHeight: height * 0.5,
    },
    imageButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        backgroundColor: '#dedede',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 20,
        alignSelf: 'flex-start',
    },
    imageButtonText: {
        marginLeft: 6,
        fontSize: 14,
    },
    bottomNav: {
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#b9d9e3',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 60,
    },
    centerButton: {
        backgroundColor: '#90b4d0',
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
