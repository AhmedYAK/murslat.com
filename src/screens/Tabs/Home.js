import React from 'react';
import { StyleSheet, Text, View ,ActivityIndicator,FlatList,TouchableOpacity} from 'react-native';
import oauthSignature from 'oauth-signature';

export default class Home extends React.Component {
    state = {
        isLoading:false,
        dataSource:[],
    }
    componentDidMount(){
        this.setState({
            isLoading:true,
            dataSource:[]
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
                    dataSource: responseJson,
                }, function(){
                    console.log(responseJson);
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
            if(item.children_data){
                return (<TouchableOpacity style={styles.item} id={item.id}>
                    <Text style={styles.itemText}>{item.name}->>></Text>
                </TouchableOpacity>);
            }else{
                return (<TouchableOpacity style={styles.item} id={item.id}>
                    <Text style={styles.itemText}>{item.name}</Text>
                </TouchableOpacity>);
            }

        }
    }

    render() {
        let jsx = '';
        if(this.state.isLoading){
            jsx = <View style={styles.container}><Text >Loading Content</Text><ActivityIndicator size="large" color="#0000ff" /></View>;
        }
        else{
            //jsx = <View><Text>Data Loadded</Text></View>
            jsx = <View><FlatList
                data={this.state.dataSource.children_data}
                extraData={this.state}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem}
                /></View>
        }
        return (
            <View style={styles.mainView}>{jsx}</View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
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
        padding: 30,
        margin: 2,
        borderColor: '#2a4944',
        borderWidth: 1,
        backgroundColor: '#d2f7f1',
    },
    itemText:{
        textAlign:'right',
    }
});