/* eslint-disable react-native/no-inline-styles */
import React, { useRef, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, Dimensions, Animated, TouchableWithoutFeedback, StyleSheet, Alert, TextInput, Pressable, KeyboardAvoidingView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Modal } from 'react-native';
const Separator = () => <View style={styles.separator} />;
const stories = [
    { id: '0', name: 'Your Story', image: require('../../assets/stories/Vishal.jpg') },
    { id: '1', name: 'Dev', image: require('../../assets/stories/Dev.jpg') },
    { id: '2', name: 'Noor', image: require('../../assets/stories/niti.jpg') },
    { id: '3', name: 'manish', image: require('../../assets/stories/manish.jpg') },
    { id: '4', name: 'manish', image: require('../../assets/stories/manish.jpg') },
    { id: '7', name: 'manish', image: require('../../assets/stories/manish.jpg') },
    { id: '8', name: 'manish', image: require('../../assets/stories/manish.jpg') },
    { id: '9', name: 'manish', image: require('../../assets/stories/manish.jpg') },
];

const posts = [
    {
        id: '1',
        user: 'Physicswallah',
        verified: true,
        time: '3m',
        description: 'NEET 2025 aspirants — this is your golden window.\n90 days of focused grind = 40 years of impact.\n🔥 Start today. Stay consistent. Don’t wait for motivation.\n🎉 New video: Most Scoring Chapters in Biology',
        hashtags: ['#NEET', '#JEE', '#PW', '#StudyWithPW', '#PhysicsWallah', '#Motivation'],
        image: require('../../assets/stories/postpw.png'),
        likes: '3.2k',
        comments: '300',
        shares: '10',
    },
    {
        id: '2',
        user: 'Sushantsignh_podcast',
        verified: false,
        time: '3m',
        description: '📉 Bear Market Ahead? | Nifty50, Fed Rates & Investor Strategy - Ep. 217',
        image: require('../../assets/stories/poststock.png'),
        likes: '',
        comments: '',
        shares: '',
    },
    {
        id: '3',
        user: 'Sushantsignh_podcast',
        verified: false,
        time: '3m',
        description: '📉 Bear Market Ahead? | Nifty50, Fed Rates & Investor Strategy - Ep. 217',
        image: require('../../assets/stories/poststock.png'),
        likes: '',
        comments: '',
        shares: '',
    },
];

type posttype = {
    id: string;
    user: string;
    verified: boolean;
    time: string;
    description: string;
    hashtags?: string[];
    image: any;
    likes?: string;
    comments?: string;
    shares?: string;
};

const { width, height } = Dimensions.get('window');
const StoryItem = ({ item }: { item: { name: string; image: any } }) => (
    <View style={{ alignItems: 'center', marginHorizontal: 8, height: height * 0.17 }}>
        <Image source={item.image} style={{ width: width * 0.22, height: height * 0.103, borderRadius: 40, borderWidth: 1.4, borderColor: '#3458eb' }} />
        <Text style={{ marginTop: 4, fontSize: 12 }}>{item.name}</Text>
    </View>
);
const renderheader = () => (
    <View style={{ alignItems: 'center', marginHorizontal: 8, height: height * 0.17 }}>
        <View style={{ width: 87, height: 87, borderRadius: 40, borderWidth: 2.2, borderColor: 'rgb(78, 131, 229)', backgroundColor: 'rgb(169, 188, 216)', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
            <TouchableOpacity style={{ flex: 1, alignSelf: 'center' }}>
                <Icon name="person" size={80} color={'rgb(12, 70, 150)'} />
            </TouchableOpacity>
            <TouchableOpacity style={{ backgroundColor: 'white', borderRadius: 20, width: 31, padding: 5, zIndex: 2, position: 'absolute' }}>
                <Ionicons name="add" size={22} color="black" />
            </TouchableOpacity>
        </View>
        <Text style={{ marginTop: 4, fontSize: 12 }}>Your status</Text>
    </View>
);

const Commentcontain = [
    {
        id: '1',
        username: 'Username@1324',
        time: '3m ago',
        text: 'A week after being expelled from the Rashtriya Janata Dal (RJD) and also from his family, Tej Pratap Yadav, the eldest son of party chief Lalu Prasad...',
        likes: '3.4k',
        replies: '4',
        avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    },
    {
        id: '2',
        username: 'kayhitlerheyudvans',
        time: '3m ago',
        text: 'Nice course i buy it pervious year for Neet and i clear it',
        likes: '3.4k',
        replies: '4',
        avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    },
];

type PostItemProps = {
    item: posttype;
};

const PostItem: React.FC<PostItemProps> = ({ item }) => {
    const [liked, setLiked] = useState(false);
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const [comments, setComments] = useState(Commentcontain);

    const [newComment, setNewComment] = useState('');
    const [selectedComment, setSelectedComment] = useState<Comment | null>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [mainModalVisible, setMainModalVisible] = useState(false);
    const handleAddComment = () => {
        if (newComment.trim()) {
            const newCommentObj = {
                id: Date.now().toString(),
                username: 'CurrentUser',
                time: 'Just now',
                text: newComment,
                likes: '0',
                replies: '0',
                avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
            };
            setComments([...comments, newCommentObj]);
            setNewComment('');
        }
    };

    type Comment = {
        id: string;
        username: string;
        time: string;
        text: string;
        likes: string;
        replies: string;
        avatar: string;
    };

    const showActionMenu = (comment: Comment) => {
        setSelectedComment(comment);
        setModalVisible(true);
    };

    const handleAction = (action: string) => {
        setModalVisible(false);
        switch (action) {
            case 'share':
                Alert.alert('Share', `Sharing comment: ${selectedComment?.text}`);
                break;
            case 'report':
                Alert.alert('Report', `Reporting comment: ${selectedComment?.text}`);
                break;
            case 'delete':
                setComments(comments.filter(c => c.id !== selectedComment?.id));
                break;
            default:
                break;
        }
    };

    const renderComment = ({ item: comment }: { item: Comment }) => (
        <View style={styles.commentContainer}>
            <Image source={{ uri: comment.avatar }} style={styles.avatar} />
            <View style={styles.commentContent}>
                <View style={styles.commentHeader}>
                    <Text style={styles.username}>{comment.username}</Text>
                    <Text style={styles.time}>{comment.time}</Text>
                    <TouchableOpacity
                        style={styles.menuButton}
                        onPress={() => showActionMenu(comment)}
                    >
                        <Icon name="more-vert" size={20} color="#666" />
                    </TouchableOpacity>
                </View>
                <Text style={styles.commentText}>{comment.text}</Text>
                <View style={styles.commentFooter}>
                    <TouchableOpacity style={styles.actionButton}>
                        <Icon name="thumb-up" size={16} color="#666" />
                        <Text style={styles.actionText}>{comment.likes}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionButton}>
                        <Icon name="comment" size={16} color="#666" />
                        <Text style={styles.actionText}>{comment.replies} replies</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
    const handlePressforlike = () => {
        Animated.sequence([
            Animated.spring(scaleAnim, {
                toValue: 1.3,
                useNativeDriver: true,
                friction: 3,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                useNativeDriver: true,
                friction: 3,
            }),
        ]).start();

        setLiked((prev) => !prev);
    };

    return (
        <View style={{ backgroundColor: '#2d3c6b', marginVertical: 10, borderRadius: 10, padding: 10 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={require('../../assets/stories/Dev.jpg')} style={{ width: 30, height: 30, borderRadius: 15 }} />
                <View style={{ marginLeft: 8 }}>
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>
                        {item.user} {item.verified && <Ionicons name="checkmark-circle" size={14} color="skyblue" />}
                    </Text>
                    <Text style={{ color: '#ccc', fontSize: 12 }}>{item.time}</Text>
                </View>
            </View>
            <Text style={{ color: 'white', marginTop: 10 }}>{item.description}</Text>
            <Text style={{ color: 'skyblue', marginTop: 4 }}>{item.hashtags?.join(' ')}</Text>
            <Image source={item.image} style={{ width: '100%', height: 200, borderRadius: 10, marginTop: 10 }} />
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 }}>
                <Text style={{ color: 'white', justifyContent: 'center' }}>
                    <TouchableWithoutFeedback onPress={handlePressforlike}>
                        <View style={styles.posticons}>
                            <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
                                <Ionicons
                                    name={liked ? 'heart' : 'heart-outline'}
                                    size={28}
                                    color={liked ? '#e53e3e' : '#ffffff'}
                                />
                            </Animated.View>
                            <Text style={{ color: 'white', paddingLeft: 5 }}>{item.likes}</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </Text>
                <View style={[styles.posticons]}><Ionicons name="chatbubble-outline" size={22} color="white" onPress={() => { setMainModalVisible(true); }} /><Text style={styles.posticontext}>{item.comments}</Text> </View>
                <View style={styles.posticons}><Ionicons name="share-social-outline" size={22} color="white" /> <Text style={styles.posticontext}>{item.shares}</Text></View>
            </View>
            <Modal visible={mainModalVisible} animationType="none" transparent={true} onRequestClose={() => setMainModalVisible(false)}>
                <Pressable style={{ width: width, height: height * 0.3, backgroundColor: 'rgba(0,0,0,0.7)' }} onPress={() => setMainModalVisible(false)} />
                <View style={styles.container}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10, justifyContent: 'space-between', paddingTop: 0 }}>
                        <Text style={{ fontSize: 22 }}>Comment</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: 20 }}>
                            <Icon name="sort" size={24} color="#000" />
                            <Icon name="close" size={24} color="#000" onPress={() => { setMainModalVisible(false); }} />
                        </View>
                    </View>
                    <View style={{ maxHeight: height * 0.52, width: width }}>
                        <FlatList
                            data={comments}
                            renderItem={renderComment}
                            ItemSeparatorComponent={Separator}
                            contentContainerStyle={[styles.listContent]}
                            showsVerticalScrollIndicator={true}
                            keyboardShouldPersistTaps="handled"
                        />
                    </View>

                    <View style={styles.commentInputContainer}>
                        <Image
                            source={{ uri: 'https://randomuser.me/api/portraits/men/3.jpg' }}
                            style={styles.userAvatar}
                        />
                        <TextInput
                            style={styles.commentInput}
                            placeholder="Your Comment"
                            value={newComment}
                            onChangeText={setNewComment}
                            multiline
                            onFocus={() => {
                                // Scroll the FlatList to end or adjust view if needed
                                // Optionally, you can use KeyboardAvoidingView for better UX
                                KeyboardAvoidingView;
                            }}
                        />
                        <TouchableOpacity
                            style={styles.sendButton}
                            onPress={handleAddComment}
                            disabled={!newComment.trim()}
                        >
                            <Icon
                                name="send"
                                size={24}
                                color={newComment.trim() ? '#1E90FF' : '#ccc'}
                            />
                        </TouchableOpacity>
                    </View>

                    {/* Action Menu Modal */}
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => setModalVisible(false)}
                    >
                        <Pressable style={styles.modalOverlay} onPress={() => setModalVisible(false)}>
                            <View style={styles.modalView}>
                                <Pressable
                                    style={styles.modalOption}
                                    onPress={() => handleAction('share')}
                                >
                                    <Icon name="share" size={20} color="#333" />
                                    <Text style={styles.modalOptionText}>Share</Text>
                                </Pressable>
                                <Pressable
                                    style={styles.modalOption}
                                    onPress={() => handleAction('report')}
                                >
                                    <Icon name="report" size={20} color="#333" />
                                    <Text style={styles.modalOptionText}>Report</Text>
                                </Pressable>
                                {selectedComment?.username === 'CurrentUser' && (
                                    <Pressable
                                        style={styles.modalOption}
                                        onPress={() => handleAction('delete')}
                                    >
                                        <Icon name="delete" size={20} color="#ff4444" />
                                        <Text style={[styles.modalOptionText, { color: '#ff4444' }]}>Delete</Text>
                                    </Pressable>
                                )}
                            </View>
                        </Pressable>
                    </Modal>
                </View>
            </Modal>
        </View>
    );
};

export default function HomePage() {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#a3c8ff' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10, paddingLeft: 24, paddingRight: 24 }}>
                <Text style={{ fontSize: 28, fontFamily: 'serif', color: '#3a56d6' }}>Vibeon</Text>
                <View style={{ flexDirection: 'row', gap: 12 }}>
                    <Ionicons name="chatbubble-outline" size={30} color="black" style={{ marginHorizontal: 10 }} />
                    <Ionicons name="notifications-outline" size={30} color="black" />
                </View>
            </View>
            <FlatList
                horizontal
                data={stories}
                renderItem={StoryItem}
                keyExtractor={(item) => item.id}
                showsHorizontalScrollIndicator={false}
                ListHeaderComponent={renderheader}
                style={{ paddingLeft: 10, marginBottom: 10 }}
            />

            <FlatList
                data={posts}
                renderItem={({ item }) => <PostItem item={item} />}
                keyExtractor={(item) => item.id}
                style={{ paddingHorizontal: 10, marginBottom: 70 }}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    posticons: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    posticontext: {
        color: 'white',
        paddingLeft: 5,
    },
    container: {
        height: height * 0.7,
        backgroundColor: '#f5f5f5',
        padding: 16,
        // justifyContent intentionally left undefined
    },
    listContent: {
        paddingRight: 20,
        width: width,
    },
    commentContainer: {
        flexDirection: 'row',
        marginBottom: 8,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 12,
    },
    commentContent: {
        flex: 1,
    },
    commentHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    username: {
        fontWeight: 'bold',
        marginRight: 8,
        fontSize: 14,
    },
    time: {
        color: '#666',
        fontSize: 12,
        marginRight: 'auto',
    },
    menuButton: {
        padding: 4,
    },
    commentText: {
        fontSize: 14,
        lineHeight: 20,
        marginBottom: 8,
    },
    commentFooter: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 16,
    },
    actionText: {
        marginLeft: 4,
        fontSize: 12,
        color: '#666',
    },
    separator: {
        height: 1,
        backgroundColor: '#eee',
        marginVertical: 12,
    },
    commentInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        width: width,
        height: height * 0.1,
        padding: 12,
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        backgroundColor: '#fff',
    },
    userAvatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
        marginRight: 12,
    },
    commentInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 8,
        maxHeight: 100,
        backgroundColor: '#f9f9f9',
    },
    sendButton: {
        marginLeft: 8,
        padding: 8,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalView: {
        width: '70%',
        backgroundColor: 'white',
        borderRadius: 12,
        paddingVertical: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalOption: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 20,
    },
    modalOptionText: {
        marginLeft: 12,
        fontSize: 16,
    },
});
