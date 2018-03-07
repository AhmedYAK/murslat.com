import React from 'react';
import { StyleSheet, Text, View ,ActivityIndicator,FlatList,Image,TouchableOpacity} from 'react-native';
import oauthSignature from 'oauth-signature';

export default class ProductDetails extends React.Component {
    state = {
        isLoading:true,
        dataSource:{},
    }
    componentDidMount(){
        /*this.setState({
            isLoading:true,
            dataSource:{},
        });*/
        //products?searchCriteria[filter_groups][0][filters][0][field]=category_id&searchCriteria[filter_groups][0][filters][0][value]=10', ['verify' => false]);
        //http://localhost/magento2/index.php/rest/V1/products?searchCriteria[filter_groups][0][filters][0][field]=sku&searchCriteria[filter_groups][0][filters][0][value]=simple&searchCriteria[filter_groups][0][filters][1][field]=sku&searchCriteria[filter_groups][0][filters][1][value]=Simple2&searchCriteria[filter_groups][0][filters][0][condition_type]=eq&searchCriteria[current_page]=1&searchCriteria[page_size]=2
        let date = Math.floor(Date.now() / 1000);//new Date();152020405886
        let nonce = this.randomString(6);
        const httpMethod = 'GET',
            url = 'http://murslat.com/index.php/rest/V1/products/'+this.props.productSKU,
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

        return fetch('http://murslat.com/index.php/rest/V1/products/'+this.props.productSKU,{
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


    render() {

        let jsx = '';
        if(this.state.isLoading){
            jsx = <View style={styles.container}><Text>Loading Content</Text><ActivityIndicator size="large" color="#0000ff" /></View>;
        }
        else{
            jsx =
                <View style={{borderBottomWidth:5,borderRadius:5,borderColor:'#c66',marginBottom:20}}>
                    <View style={{alignItems: 'center', justifyContent: 'center'}}>
                        <Image
                            style={{width: 300,height: 200,alignItems: 'center'}}
                            source={{uri: 'http://murslat.com/pub/media/catalog/product'+this.state.dataSource.custom_attributes[9].value}}
                        />
                    </View>
                    <Text>{this.state.dataSource.name}</Text>
                    <Text>{this.state.dataSource.price}</Text>
                    <Text>{this.state.dataSource.custom_attributes[1].value}</Text>
                    <Text>{this.state.dataSource.custom_attributes[9].value}</Text>
                </View>
        }

        return (
            <View style={styles.container}>
                {jsx}
            </View>
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
});