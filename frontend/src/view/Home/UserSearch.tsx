import React, { useEffect, useState, useRef } from 'react';
import { TextInput, Dimensions, Text, View, StyleSheet, ScrollView, ImageBackground, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import HomeFooter from '../../component/footer/HomeFooter';
import { AntDesign } from '@expo/vector-icons';
import { useHome } from '../../component/context/HomeContext'
import { auth, db, storage } from '../../../firebaseConfig';
import { arrayUnion, updateDoc, Timestamp, onSnapshot, orderBy, addDoc, doc, getDoc, setDoc, limit, collection, getDocs, getFirestore, query, where } from '@firebase/firestore';
import { TouchableOpacity } from 'react-native';
import Friends from './SearchResultList';
import Talk from './Talk';
import HomeHeader from '../../component/header/HomeHeader';
import { FontAwesome } from '@expo/vector-icons';
import SearchComponent from '../../component/search/SearchComponent';
import { MaterialIcons } from '@expo/vector-icons';

const UserSearch = ({ navigation }) => {
    const { isLogin, setIsLogin, loginUser, setLoginUser, isTimeout, setIsTimeout, infor, setInfor, userImage, setUserImage } = useHome();
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const a = 0;
    const scrollViewRef = useRef(null);
    const [scrollX, setScrollX] = useState(true);
    const [search, setSearch] = useState('');
    const [hobbyArray, setHobbyArray] = useState(['映画館', 'ツーリング', '筋トレ', 'apex', 'アニメ', 'ワンピース', 'バスケ', 'サッカー', 'タバコ', 'シーシャ', '小説', '漫画']);
    const [choosen, setChoosen] = useState([]);
    const [searchResult, setSearchResult] = useState([]);
    const [deepSearch, setDeepSearch] = useState([]);

    // 【仕組み】 趣味項目の最初の一つ目だけをfirebaseから検索して、検索結果をsearchResultに格納。それ以降の複数条件はすでに読み込んだsearchResultから絞り込んでdeepSearchに格納するからfirebaseからの読み取り自体は最初の一回のみ
    useEffect(() => {
        const searchDoc = async () => {
            let array = [];
            let docarray = [];
            try {
                if (choosen.length == 1 && searchResult.length == 0) { //趣味候補最初の一つ目の読み取り
                    console.log('1です');
                    console.log(choosen);
                    const queryhobby = collection(db, 'users');
                    const q = query(queryhobby, where('hobbys', 'array-contains', choosen[0]), limit(10));
                    const querySnapshot = await getDocs(q);
                    querySnapshot.forEach((doc) => {
                        console.log(doc.id, " => ", doc.data());
                        docarray.push(doc.data());
                    });
                    setSearchResult(docarray);
                    setDeepSearch(docarray);
                } else if (choosen.length > 1) {//趣味候補二つ目以降の複数条件絞り
                    console.log('choosen.lengthは1以上です');
                    deepSearch.map((data) => {
                        // console.log(choosen[choosen.length - 1]);
                        if (data.hobbys.indexOf(choosen[choosen.length - 1]) > 0) {
                            console.log('hit');
                            array.push(data)
                        } else {
                            console.log('nohits');
                        }
                    });
                    setDeepSearch(array);
                }
            } catch (e) {
                console.log(e.message);
            }
            console.log('array', array);
            // console.log('deepsearch', searchResult);
        };

        searchDoc();

    }, [choosen]);

    const isSubset = (subset, superset) => {
        return subset.every(element => superset.includes(element));
    };

    const DeleteSearch = (hobbys) => {
        console.log('choosenデリート時です', choosen);
        const choosenarray = [...choosen];
        const array = [...searchResult];
        console.log('searcharray', array);
        let deparray = []
        const newArray = choosenarray.filter((prev) => prev != hobbys);
        console.log('newArray', newArray);
        if (newArray.length > 0) {
            array.map((data, index) => {
                console.log('data.hobby', data.hobbys);
                if (isSubset(newArray, data.hobbys)) {
                    deparray.push(data);
                }
            });
        } else {
            setDeepSearch([]);
            setSearchResult([]);
        }
        console.log('deparray', deparray);
        setDeepSearch(deparray);
    };

    const styles = StyleSheet.create({
        personlist: {
            width: '100%',
            height: 16000,
            marginTop: '45%',
            alignItems: 'center',
            flexDirection: 'column',
            marginBottom: 900,
            // backgroundColor: 'red'
        },
        footer: {
            position: 'absolute',
            bottom: 0,
            height: '10%',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
        },
        personInfo: {
            width: windowWidth,
            justifyContent: 'flex-start',
            borderTopWidth: 1,
            borderTopColor: 'silver',
            flexDirection: 'row',
            paddingLeft: '2%',
            alignItems: 'center',
            paddingVertical: '4%',
            // backgroundColor: 'red'
        },
        buttonContainer: {
            width: '100%',
            justifyContent: 'space-around',
            paddingHorizontal: '1%',
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: '4%',
        },
        TalkButton: {
            height: '100%',
            width: '40%',
            alignItems: 'center',
            marginVertical: '1%',
            borderRadius: 10,
            // backgroundColor: (talkPage && scrollX) ? '#30CB89' : 'gray',
        },
        MatchingButton: {
            height: '100%',
            width: '40%',
            alignItems: 'center',
            marginVertical: '1%',
            borderRadius: 10,
            // backgroundColor: (talkPage && scrollX) ? 'gray' : '#30CB89',
        },
        fieldContainer: {
            flexDirection: 'row',
            marginTop: '30%',
            paddingVertical: '0.3%',
            justifyContent: 'flex-start',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: 'gray',
            borderRadius: 20,
            width: '90%',
            paddingHorizontal: '2%',
        },
        hobby: {
            borderRadius: 30,
            padding: '2%',
            margin: '1%',
            backgroundColor: 'gray',
            paddingHorizontal: '3%',
            alignItems: 'center',
        },
        hobbyname: {
            color: 'white',
            fontWeight: 'bold'
        },
        choosenhobbyname: {
            color: 'white',
            paddingRight: '1%',
            fontWeight: 'bold'
        },
        header: {
            flexDirection: 'row',
            // margin: 10,
            borderRadius: 15,
            borderWidth: 2,
            borderColor: '#30CB89',
            height: '32%',
            alignItems: 'center',
            justifyContent: 'flex-start',
            width: '100%',
            backgroundColor: 'white',
            zIndex: 1,
            // padding: 10
        },
        icon: {
            backgroundColor: 'black',
            borderRadius: 100,
            height: 60,
            width: 60,
            marginLeft: 20,
            marginRight: 10
        },
        informations: {
            flexDirection: 'column',
        },
        NameHeart: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '75%',
            paddingLeft: '5%',
            paddingBottom: 5

        },
        FucilityDate: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '70%',
            paddingLeft: '3%'
        },
        choosenhobby: {
            borderRadius: 30,
            padding: '2%',
            margin: '1%',
            backgroundColor: '#30CB89',
            paddingHorizontal: '3%',
            flexDirection: 'row'
        }

    });
    return (
        //ヘッダー
        <View style={{ flex: 1, alignItems: 'center' }}>
            <ScrollView contentContainerStyle={{ width: '100%', height: windowHeight * 2.2, alignItems: 'center' }}>
                <View style={styles.fieldContainer}>
                    {/* <Text style={{zIndex: 100, marginRight: '2%', backgroundColor: 'red'}}>検索</Text> */}
                    <FontAwesome name="search" size={24} color="gray" />
                    <TextInput
                        style={{
                            width: '100%',
                            // borderWidth: 1,
                            padding: 5,
                            borderColor: 'gray',
                            // backgroundColor: 'blue'
                        }}
                        onChangeText={setSearch}
                        value={search}
                        placeholder="キーワードを入力"
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                </View>
                <View style={{ width: '95%', marginTop: '5%', flexWrap: 'wrap', flexDirection: 'row', }}>
                    {hobbyArray.map((hob, index) =>
                        <TouchableOpacity style={styles.hobby} onPress={() => { setHobbyArray((prev) => [...prev.slice(0, index), ...prev.slice(index + 1)]); setChoosen((prev) => [...prev, hobbyArray[index]]) }} key={index}>
                            <Text style={styles.hobbyname}>{`${hob}`}</Text>
                        </TouchableOpacity>)}
                </View>
                <View style={{ marginTop: '5%', width: windowWidth * 0.95 }}>
                    <Text style={{ width: '100%' }}>選択中</Text>
                    <View style={{ width: '100%', marginTop: '5%', flexWrap: 'wrap', flexDirection: 'row', }}>
                        {choosen.map((choose, index) =>
                            <View style={styles.choosenhobby} key={index}>
                                <Text style={styles.choosenhobbyname}>{`${choose}`}</Text>
                                <TouchableOpacity onPress={() => { setChoosen((prev) => [...prev.slice(0, index), ...prev.slice(index + 1)]); setHobbyArray((prev) => [...prev, choosen[index]]); DeleteSearch(choose); console.log('hobbbby', choose); }}>
                                    <AntDesign name="closecircle" size={20} color="white" style={{ paddingLeft: '1%' }} />
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                </View>
                <View style={{ marginTop: '5%', alignItems: 'center', height: '100%' }}>
                    <Friends navigation={navigation} information={deepSearch} />
                </View>
            </ScrollView>
            <View style={styles.footer}>
                <HomeFooter navigation={navigation} />
            </View>
        </View>
    )
};
export default UserSearch;
