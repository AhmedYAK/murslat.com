import React from 'react';
import {StyleSheet, Text, View, FlatList, TouchableOpacity, TextInput, Button, ActivityIndicator,Image} from 'react-native';
import oauthSignature from 'oauth-signature';
export default class Search extends React.Component {
    state = {
        searchText:null,
        isSearching:false,
        dataSource:[],
    };

    textInputChange = (text)=>{
        this.setState({
            ...this.state,
            searchText:text,
        },()=>{
            //return alert(this.state.searchText);
        });
    };
    buttonPress = ()=>{
        this.setState({
            ...this.state,
            isSearching:true,
        });

        let date = Math.floor(Date.now() / 1000);//new Date();152020405886
        let nonce = this.randomString(6);
        const httpMethod = 'GET',
            url = 'http://murslat.com/index.php/rest/V1/products',
            parameters = {
                oauth_consumer_key : 'jkvkjy2lmjcb9c8gju0neywg975txqqr',
                oauth_token : 'cle74p2dyr2tyxo4thrfd5mrafa1htgr',
                oauth_nonce : nonce,
                oauth_timestamp : date,
                oauth_signature_method : 'HMAC-SHA1',
                oauth_version : '1.0',
                'searchCriteria[filter_groups][0][filters][0][field]':'name',
                'searchCriteria[filter_groups][0][filters][0][value]':'%'+this.state.searchText+'%',
                'searchCriteria[filter_groups][0][filters][0][condition_type]':'like',
            },
            consumerSecret = 'ngfttyub10sph9q63evx6mo9uf0pwbsf',
            tokenSecret = 'v3xxbpseewlge8gfgfx8yt9up8x8josk',
            // generates a RFC 3986 encoded, BASE64 encoded HMAC-SHA1 hash
            encodedSignature = oauthSignature.generate(httpMethod, url, parameters, consumerSecret, tokenSecret),
            // generates a BASE64 encode HMAC-SHA1 hash
            signature = oauthSignature.generate(httpMethod, url, parameters, consumerSecret, tokenSecret,
                { encodeSignature: false});

        return fetch('http://murslat.com/index.php/rest/V1/products?searchCriteria[filter_groups][0][filters][0][field]=name&searchCriteria[filter_groups][0][filters][0][value]='+encodeURIComponent('%'+this.state.searchText+'%')+'&searchCriteria[filter_groups][0][filters][0][condition_type]=like',{
            method:'get',
            headers:{
                'Authorization': 'OAuth oauth_consumer_key="jkvkjy2lmjcb9c8gju0neywg975txqqr",oauth_token="cle74p2dyr2tyxo4thrfd5mrafa1htgr",oauth_signature_method="HMAC-SHA1",oauth_timestamp="'+date+'",' + 'oauth_nonce="'+nonce+'",oauth_version="1.0",oauth_signature="'+encodedSignature+'"',
            },
            /*headers:{
                'Authorization':'bearer p7exl6ypb8tc2msxuglxp2d7hv4evkhe'
            }*/
        })
        .then((response) => response.json())
        .then((responseJson) => {

            this.setState({
                isSearching: false,
                dataSource: responseJson.items,
            }, function(){
                console.log(responseJson);
            });

        })
        .catch((error) =>{
            console.error(error);
        });



    };
    randomString(length){
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for(var i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }
    _keyExtractor = (item, index) => item.id;
    _renderItem = ({item}) => {//http://murslat.com/pub/media/catalog/product/cache/c802d894880f27d700261fec3762e9a2/6/8/68960fe77f918c96e01697fc2ef65c8eadf36218.jpg
        return (
            <View style={{borderBottomWidth:5,borderRadius:5,borderColor:'#c66',marginBottom:20}}>
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                    <Image
                        style={{width: 300,height: 200,alignItems: 'center'}}
                        source={{uri: 'http://murslat.com/pub/media/catalog/product'+item.custom_attributes[9].value}}
                    />
                </View>
                <TouchableOpacity onPress={()=>this.productDetails(item.id,item.sku,item.name)}>
                    <Text>{item.name}</Text>
                    <Text>{item.price}</Text>
                    <Text>{item.custom_attributes[1].value}</Text>
                    <Text>{item.custom_attributes[9].value}</Text>
                </TouchableOpacity>
            </View>
        );

    }

    render() {
        const searchJSX =
            <View style={styles.searchView}>
                <TextInput
                    style={styles.searchTextInput}
                    onChangeText={(text) => this.textInputChange(text)}
                    value={this.state.searchText}
                    placeholder="البحث"
                />
                <Button
                    style={styles.searchButton}
                    onPress={this.buttonPress}
                    title="بحث"
                    accessibilityLabel="Learn more about this purple button"
                />
            </View>
        let jsx = '';
        if(this.state.isSearching){
            jsx =
                <View style={{flex:1}}>
                    {searchJSX}
                    <View style={styles.container}>
                        <ActivityIndicator size="large" color="#0000ff" />
                    </View>
                </View>

        }
        else{
            jsx =
                <View>
                    {searchJSX}
                    <FlatList
                        data={this.state.dataSource}
                        extraData={this.state}
                        keyExtractor={this._keyExtractor}
                        renderItem={this._renderItem}
                    />
                </View>

        }
        return (
            <View style={{flex:1}}>
                {jsx}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop:10,
    },
    searchView:{
      flexDirection:'row',
      justifyContent:'center',
      marginTop:10,
    },
    searchTextInput:{
        width:'70%',
        height:35,
        borderWidth:1,
        borderColor:'#ccc',
        textAlign:'center',
        marginTop:10,
    },
    searchButton:{
        width:'30%',
        height:20,
        backgroundColor:'#2c345e',
        borderWidth:2,
        borderColor:'#ccc',
        textAlign:'center',
        justifyContent:'center',
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

    }
});