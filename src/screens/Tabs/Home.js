import React from 'react';
import { StyleSheet, Text, View ,ActivityIndicator,FlatList,TouchableOpacity,Button,ScrollView} from 'react-native';
import oauthSignature from 'oauth-signature';

export default class Home extends React.Component {
    state = {
        isLoading:false,
        dataSource:[],
        currentDataSource:[],
        level:0,
    }

    showSubMenu = (id)=>{
        let selectedChildren = [];
        const children = this.state.currentDataSource[this.state.level].map((item,index)=>{
            if(item.id === id)
                selectedChildren = item.children_data;
        });
        this.setState({
            ...this.state,
            currentDataSource:[...this.state.currentDataSource,selectedChildren],
            level:(this.state.level+1),
        });
        //console.log(this.state.level);
        //console.log(selectedChildren);
        //console.log(this.state.currentDataSource);
    };

    showProducts = (id,categoryTitle)=>{
        //alert("show products in Category ID =  " + id);
        //console.log(this.props);
        this.props.navigator.push({
            screen: 'ProductsListScreen', // unique ID registered with Navigation.registerScreen
            title: categoryTitle, // navigation bar title of the pushed screen (optional)
            subtitle: undefined, // navigation bar subtitle of the pushed screen (optional)
            //titleImage: require('../../img/my_image.png'), // iOS only. navigation bar title image instead of the title text of the pushed screen (optional)
            passProps: {categoryID:id,categoryTitle:categoryTitle}, // Object that will be passed as props to the pushed screen (optional)
            animated: true, // does the push have transition animation or does it happen immediately (optional)
            animationType: 'slide-horizontal', // 'fade' (for both) / 'slide-horizontal' (for android) does the push have different transition animation (optional)
            backButtonTitle: undefined, // override the back button title (optional)
            backButtonHidden: false, // hide the back button altogether (optional)
            navigatorStyle: {}, // override the navigator style for the pushed screen (optional)
            navigatorButtons: {}, // override the nav buttons for the pushed screen (optional)
            // enable peek and pop - commited screen will have `isPreview` prop set as true.
            previewView: undefined, // react ref or node id (optional)
            previewHeight: undefined, // set preview height, defaults to full height (optional)
            previewCommit: true, // commit to push preview controller to the navigation stack (optional)
            previewActions: [{ // action presses can be detected with the `PreviewActionPress` event on the commited screen.
                id: '', // action id (required)
                title: '', // action title (required)
                style: undefined, // 'selected' or 'destructive' (optional)
                actions: [], // list of sub-actions
            }],
        });
    };
    backLevel = ()=>{
        const level = this.state.level;
        let d = [];
        for(let i=0;i<this.state.currentDataSource.length;i++){
            if(i<level){
                d = [...d,this.state.currentDataSource[i]];
            }
        }

        this.setState({
            ...this.state,
            currentDataSource:d,
            level:(level-1)
        },()=>{
            //console.log(this.state.currentDataSource);
            //console.log(this.state.level);
        });

    }

    componentDidMount(){
        this.setState({
            isLoading:true,
            dataSource:[],
            currentDataSource:[],
            level:0,
        });
        let date = Math.floor(Date.now() / 1000);//new Date();152020405886
        let nonce = this.randomString(6);
        //console.log(nonce + "===" + date);
        const httpMethod = 'GET',
            url = 'http://murslat.com/index.php/rest/V1/categories',
            parameters = {
                oauth_consumer_key : 'jkvkjy2lmjcb9c8gju0neywg975txqqr',
                oauth_token : 'cle74p2dyr2tyxo4thrfd5mrafa1htgr',
                oauth_nonce : nonce,
                oauth_timestamp : date,
                oauth_signature_method : 'HMAC-SHA1',
                oauth_version : '1.0',
            },
            consumerSecret = 'ngfttyub10sph9q63evx6mo9uf0pwbsf',
            tokenSecret = 'v3xxbpseewlge8gfgfx8yt9up8x8josk',
            // generates a RFC 3986 encoded, BASE64 encoded HMAC-SHA1 hash
            encodedSignature = oauthSignature.generate(httpMethod, url, parameters, consumerSecret, tokenSecret),
            // generates a BASE64 encode HMAC-SHA1 hash
            signature = oauthSignature.generate(httpMethod, url, parameters, consumerSecret, tokenSecret,
                { encodeSignature: false});


        return fetch('http://murslat.com/index.php/rest/V1/categories',{
            method:'get',
            headers:{
                'Authorization': 'OAuth oauth_consumer_key="jkvkjy2lmjcb9c8gju0neywg975txqqr",oauth_token="cle74p2dyr2tyxo4thrfd5mrafa1htgr",oauth_signature_method="HMAC-SHA1",oauth_timestamp="'+date+'",' + 'oauth_nonce="'+nonce+'",oauth_version="1.0",oauth_signature="'+encodedSignature+'"',
            }
        })
        .then((response) => response.json())
        .then((responseJson) => {

            this.setState({
                isLoading: false,
                dataSource: responseJson.children_data,
                currentDataSource:[responseJson.children_data],
                level:0,
            }, function(){
                //console.log(responseJson);
            });

        })
        .catch((error) =>{
            console.error(error);
        });

    }

    randomString(length){
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for(var i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }

    _keyExtractor = (item, index) => item.id;
    _renderItem = ({item}) => {
        if(item.is_active) {
            if(item.children_data.length){
                return (
                    <View style={styles.item}>
                        <TouchableOpacity onPress={()=>this.showSubMenu(item.id)}><Text>+</Text></TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.showProducts(item.id,item.name)}><Text>{item.name}</Text></TouchableOpacity>
                    </View>
                );
            }else{
                return (<TouchableOpacity onPress={()=>this.showProducts(item.id)} style={styles.item} id={item.id}>
                    <Text style={styles.itemText}>{item.name}</Text>
                </TouchableOpacity>);
            }


        }
    }

    render() {
        let jsx = '';
        if(this.state.isLoading){
            jsx = <View style={styles.container}><Text>Loading Content</Text><ActivityIndicator size="large" color="#0000ff" /></View>;
        }
        else{
            let backButton =
                (
                    <View style={{position: 'absolute', left: 0, right: 0, bottom: 0}}>
                        <Button onPress={this.backLevel} title="Back"/>
                    </View>
                );
            if(this.state.level === 0)
                backButton = null;
            //jsx = <View><Text>Data Loadded</Text></View>
            jsx = <View style={styles.mainView}><FlatList style={{marginBottom:50}}
                data={this.state.currentDataSource[this.state.level]}
                extraData={this.state}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem}
            />{backButton}</View>
        }
        return (
            <View style={styles.mainView}>{jsx}</View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    mainView:{
        flex: 1,
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        margin: 2,

        backgroundColor: '#90AFC5',
    },
    itemText:{
        textAlign:'right',
        width:"100%",
    }
});