import React, { useState, useRef } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions, ScrollView, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Video from 'react-native-video';
import Ionicons from 'react-native-vector-icons/Ionicons';
type Video = {
    username: string,
    description: string,
    likes: number,
    comments: string,
    shares: string,
    profilePic: string,
    videoUrl: string,
}


const ShortVideoCard = (videoData: Video) => {
    const [paused, setPaused] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(videoData.likes);
    const videoRef = useRef(null);

    // Format like count
    const formatLikeCount = (count: number | undefined) => {
        if (typeof count !== 'number' || isNaN(count)) {
            return '0';
        }
        if (count >= 1000) {
            return `${(count / 1000).toFixed(1)} k`;
        }
        return count.toString();
    };

    // Handle like action
    const handleLike = () => {
        const newLikeStatus = !isLiked;
        setIsLiked(newLikeStatus);
        setLikeCount(newLikeStatus ? likeCount + 1 : likeCount - 1);
    };

    // Toggle video playback
    const togglePlayback = () => {
        setPaused(!paused);
    };

    return (
        <View style={styles.container}>
            {/* Video Player */}
            <TouchableOpacity
                activeOpacity={1}
                style={styles.videoContainer}
                onPress={togglePlayback}
            >
                <Video
                    ref={videoRef}
                    source={{ uri: videoData.videoUrl }}
                    style={styles.video}
                    resizeMode="cover"
                    paused={paused}
                    repeat={true}
                    muted={false}
                    controls={false}
                />
                {/* Play/Pause overlay */}
                {paused && (
                    <View style={styles.playButtonOverlay}>
                        <Icon name="play" size={50} color="rgba(255,255,255,0.7)" />
                    </View>
                )}
            </TouchableOpacity>
            {/*Top bar */}
            {/* Bottom Info Section */}
            <View style={styles.infoContainer}>
                <View style={styles.profileSection}>
                    <Image
                        source={{ uri: videoData.profilePic }}
                        style={styles.profilePic}
                    />
                    <Text style={styles.username}>{videoData.username}</Text>
                </View>
                <Text style={styles.description} numberOfLines={2}>{videoData.description}</Text>
            </View>
            {/* Right Action Bar */}
            <View style={styles.actionBar}>
                <TouchableOpacity style={styles.actionButton} onPress={handleLike}>
                    <Icon
                        name={isLiked ? 'heart' : 'heart-o'}
                        size={30}
                        color={isLiked ? 'rgb(214, 104, 92)' : 'rgba(185, 199, 224, 1)'}
                    />
                    <Text style={styles.actionText}>{formatLikeCount(likeCount)}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                    <Ionicons name="chatbubble" size={30} color="rgba(185, 199, 224, 1)" />
                    <Text style={styles.actionText}>{videoData.comments}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                    <Icon name="share" size={30} color="rgba(185, 199, 224, 1)" />
                    <Text style={styles.actionText}>{videoData.shares}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                    <Icon name="ellipsis-v" size={30} color="rgba(185, 199, 224, 1)" />
                </TouchableOpacity>
                {/* Music/audio indicator */}
                <View style={styles.musicNote}>
                    <Icon name="music" size={20} color="rgba(185, 199, 224, 1)" />
                </View>
            </View>
        </View >
    );
};

const windowWidth = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

const styles = StyleSheet.create({
    container: {
        width: windowWidth,
        height: height * 0.876,
        backgroundColor: 'black',
    },
    videoContainer: {
        width: '100%',
        height: '100%',
    },
    video: {
        width: '100%',
        height: '100%',
    },
    playButtonOverlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    TopBar: {
        position: 'absolute',
        flexDirection: 'row',
        height: height * 0.06,
        width: windowWidth,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        alignItems: 'center',
        padding: 10,
        zIndex: 2,
    },
    IconofTopBar: {

    },
    headerofTopbar: {
        fontSize: 22,
        fontFamily: 'serif',
        paddingLeft: 10,
        color: 'rgb(250, 250, 250)',
    },
    infoContainer: {
        position: 'absolute',
        bottom: 10,
        left: 10,
        right: 60,
        padding: 10,
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 10,
        width: windowWidth * 0.87,
    },
    profileSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    profilePic: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    username: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    description: {
        color: 'white',
        fontSize: 14,
        marginBottom: 8,
    },
    likeSection: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    likeButton: {
        marginRight: 5,
    },
    likeCount: {
        color: 'white',
        fontSize: 14,
    },
    actionBar: {
        position: 'absolute',
        right: 10,
        bottom: 50,
        alignItems: 'center',
    },
    actionButton: {
        marginVertical: 15,
        alignItems: 'center',
    },
    actionText: {
        color: 'white',
        fontSize: 12,
        marginTop: 5,
    },
    musicNote: {
        marginTop: 20,
        transform: [{ rotate: '30deg' }],
    },
});

// Default props for the component
ShortVideoCard.defaultProps = {
    videoData: {
        username: 'Physiswallah',
        description: 'Pankaj sir shayri jaha kuch log meri .....',
        likes: 3200,
        comments: '245',
        shares: '56',
        profilePic: 'https://example.com/profile.jpg',
        videoUrl: 'https://www.pexels.com/video/a-cloud-of-yellow-paint-underwater-7565431/',
    },
};


const Reel = () => {
    const videos = [
        {
            username: 'Physiswallah',
            description: 'Pankaj sir shayri jaha kuch log meri...',
            likes: 3200,
            comments: '245',
            shares: '56',
            profilePic: 'https://th.bing.com/th/id/OIP.UTlaSVQaqqqFUNuhGSGh3wHaHa?w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2',
            videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
        },
        {
            username: 'Physiswallah',
            description: 'Pankaj sir shayri jaha kuch log meri ...',
            likes: 3200,
            comments: '245',
            shares: '56',
            profilePic: 'https://th.bing.com/th/id/OIP.UTlaSVQaqqqFUNuhGSGh3wHaHa?w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2',
            videoUrl: 'https://videos.pexels.com/video-files/7565431/7565431-hd_1080_1920_25fps.mp4',
        },
    ];
    return (
        <View style={{ height: height * 0.876 }}>
            <View style={styles.TopBar}>
                <TouchableHighlight style={styles.IconofTopBar} underlayColor="transparent">
                    <Ionicons name="arrow-back" size={24} color="#fff" />
                </TouchableHighlight>
                <Text style={styles.headerofTopbar}>Short Videos</Text>
            </View>
            <ScrollView pagingEnabled >
                {videos.map((video, idx) => (
                    <ShortVideoCard key={idx} {...video} />
                ))}
            </ScrollView>
        </View>
    );
};


export default Reel;

