/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableWithoutFeedback, Dimensions, Modal, Image, TouchableOpacity } from 'react-native';
import Animated, { configureReanimatedLogger, ReanimatedLogLevel, useSharedValue } from 'react-native-reanimated';
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Camera, CameraPermissionStatus, useCameraDevices } from 'react-native-vision-camera';
import { useNavigation } from '@react-navigation/native';
import RNFS from 'react-native-fs';
// import { Face, scanFaces } from '@mat2718/vision-camera-face-detector';

const { width, height } = Dimensions.get('screen');

export default function Profile() {
    const navigation = useNavigation();
    const [flash, setFlash] = useState<'off' | 'on' | undefined>('off'); // Default flash mode
    const scaleAnim = useSharedValue(1);
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
    const carouselRef = useRef<ICarouselInstance>(null);
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);
    const [cameraposition, setcameraposition] = useState<'back' | 'front'>('back');
    //const device = devices.find((d) => {d.position === 'back'});// back camera]
    const devices = useCameraDevices();
    const device = devices.find((d) => d.position === cameraposition);
    const cameraRef = useRef<Camera>(null);
    const [modalVisible, setModalVisible] = useState<string | null>(null);
    // const [faces, setFaces] = useState<Face[]>([]);
    // const device = devices.find((d)=>{d.position === 'back' ? (d.position === 'front') : (d.position === 'back')});
    useEffect(() => {
        // Ask for permissions once on mount
        (async () => {
            const camerastatus: CameraPermissionStatus = await Camera.requestCameraPermission();
            const micstatus: CameraPermissionStatus = await Camera.requestMicrophonePermission();
            setHasPermission(
                camerastatus === 'granted' && micstatus === 'granted'
            );
        })();
    }, []);
    configureReanimatedLogger({
        level: ReanimatedLogLevel.warn,
        strict: false, // Reanimated runs in strict mode by default
    });
    // // Define the frame processor as a worklet function with the correct signature
    // const customFrameProcessor = useFrameProcessor((frame: Frame) => {
    //     'worklet';

    //     const scannedFaces = scanFaces(frame);
    //     // Ensure scannedFaces is serializable before passing to runOnJS
    //     runOnJS(setFaces)(scannedFaces ? JSON.parse(JSON.stringify(scannedFaces)) : []);
    //     // Example: Call native face detection module if available
    //     // For now, this is a placeholder for photo detection logic.
    // }, []);

    if (hasPermission === null) {
        return (
            <View style={styles.center}>
                <Text>Checking permissions...</Text>
            </View>
        );
    }

    if (hasPermission === false) {
        return (
            <View style={styles.center}>
                <Text>Camera permission is required to use this feature.</Text>
            </View>
        );
    }

    if (!device) {
        return (
            <View style={styles.center}>
                <Text>Loading camera...</Text>
            </View>
        );
    }
    function takePhoto() {
        if (cameraRef.current) {
            cameraRef.current.takePhoto().then((photo) => {
                const path = photo.path; // The path to the photo taken
                const destinationPath = `${RNFS.DocumentDirectoryPath}/${Date.now()}.jpg`; // Save with a timestamp
                try {

                    RNFS.moveFile(path, destinationPath)
                        .then(() => {
                            setModalVisible(destinationPath); // Set the modal to show the photo
                            console.log('File moved successfully!');
                        })
                        .catch((err) => {
                            console.error('Error moving file:', err);
                        });
                } catch (err) {
                    console.error('Error moving file:', err);
                }
                console.log('Photo taken:', photo);
            }).catch((error) => {
                console.error('Error taking photo:', error);
            });
        }
    }
    return (
        <SafeAreaView style={styles.container}>
            <Camera
                ref={cameraRef}
                style={styles.cameraView}
                device={device}
                isActive={true}
                torch={flash}
                enableZoomGesture={true}
                photo={true}
                video={true}
            // frameProcessor={customFrameProcessor}
            />
            <View style={[styles.items, { right: 0, margin: 30, gap: width * 0.08 }]}>
                <TouchableWithoutFeedback onPress={() => setcameraposition((prev) => (prev === 'back' ? 'front' : 'back'))}>
                    <Ionicons name="camera-reverse-outline" size={width * 0.1} color="#fff" />
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback
                    onPress={() => { setFlash((prev) => (prev === 'off' ? 'on' : 'off')); }}
                >
                    <Ionicons name="flash-outline" size={width * 0.1} color="#fff" />
                </TouchableWithoutFeedback>
            </View>
            <View style={[styles.items, { left: 0, margin: 30 }]}>
                <TouchableWithoutFeedback onPress={() => navigation.goBack()} >
                    <Ionicons name="chevron-back" color={'#ffffff'} size={width * 0.11} />
                </TouchableWithoutFeedback>
            </View>
            <View style={styles.PhotoCLick}>
                <Animated.View style={{ transform: [{ scale: scaleAnim }], marginBottom: 3 }}>
                    <TouchableOpacity
                        onPress={takePhoto}
                        activeOpacity={0.7}
                        style={{ width: width * 0.17, backgroundColor: '#ffffff', height: height * 0.075, borderRadius: 50, justifyContent: 'center', alignItems: 'center' }}
                    />
                </Animated.View>
            </View>
            <View style={{ alignItems: 'center', position: 'absolute', bottom: height * 0.017 }}>
                <View style={{ width: width * 0.3, backgroundColor: 'rgba(0,0,0,0.4)', height: height * 0.054, position: 'absolute', borderRadius: 20, zIndex: 0 }} />
                <Carousel
                    ref={carouselRef}
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
                        const isActive = carouselRef.current?.getCurrentIndex() === index;
                        const opacity = isActive ? 1 : 0.6;
                        // Scale up the active item
                        // Map animationValue.value (0 = inactive, 1 = active) to opacity range
                        return (
                            <View
                                style={[styles.CarouselView, { opacity: opacity }]}
                            >
                                <Text style={styles.CarouselText}>{item.name}</Text>
                            </View>
                        );
                    }}
                />
            </View>
            <Modal
                animationType="slide"
                transparent={false}
                visible={modalVisible !== null}
                onRequestClose={() => setModalVisible(null)}
            >
                <TouchableWithoutFeedback onPress={() => setModalVisible(null)}>
                    <View style={{ backgroundColor: 'rgba(113, 56, 56, 0.5)', position: 'absolute', top: 0, right: 0, zIndex: 3 }}>
                        <Ionicons name="close" color={'#000000'} size={width * 0.1} />
                    </View>
                </TouchableWithoutFeedback>
                <Image
                    source={{ uri: 'file://' + modalVisible }}
                    style={{ width: width, height: height }}
                />
            </Modal>
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    PhotoCLick: {
        position: 'absolute',
        bottom: width * 0.26,
        left: width * 0.4,
        borderWidth: 3,
        borderColor: '#ffffff',
        borderRadius: 50,
        width: width * 0.2,
        height: width * 0.2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    items: {
        position: 'absolute',
    },
    CarouselView: {
        alignSelf: 'center',
        backgroundColor: 'rgba(77, 113, 163, 0.5)',
        borderRadius: 20,
        borderColor: '#9DB2BF',
        borderWidth: 1,
        width: width * 0.3,
        height: height * 0.054,
        justifyContent: 'center',
        zIndex: 10,
    },
    CarouselText: {
        fontSize: 16,
        color: '#DDE6ED',
        textAlign: 'center',
    },
    center: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cameraView: {
        height: height * 1,
    },
});

