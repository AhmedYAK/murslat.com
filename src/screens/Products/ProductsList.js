import React from 'react';
import { StyleSheet, Text, View ,ActivityIndicator,FlatList,Image,TouchableOpacity} from 'react-native';
import oauthSignature from 'oauth-signature';

export default class ProductsList extends React.Component {
    state = {
        isLoading:false,
        dataSource:[],
    }
    componentDidMount(){
        this.setState({
            isLoading:true,
            dataSource:[],
        });
        //products?searchCriteria[filter_groups][0][filters][0][field]=category_id&searchCriteria[filter_groups][0][filters][0][value]=10', ['verify' => false]);
        //http://localhost/magento2/index.php/rest/V1/products?searchCriteria[filter_groups][0][filters][0][field]=sku&searchCriteria[filter_groups][0][filters][0][value]=simple&searchCriteria[filter_groups][0][filters][1][field]=sku&searchCriteria[filter_groups][0][filters][1][value]=Simple2&searchCriteria[filter_groups][0][filters][0][condition_type]=eq&searchCriteria[current_page]=1&searchCriteria[page_size]=2
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
                'searchCriteria[filter_groups][0][filters][0][field]':'category_id',
                'searchCriteria[filter_groups][0][filters][0][value]':this.props.categoryID
            },
            consumerSecret = 'ngfttyub10sph9q63evx6mo9uf0pwbsf',
            tokenSecret = 'v3xxbpseewlge8gfgfx8yt9up8x8josk',
            // generates a RFC 3986 encoded, BASE64 encoded HMAC-SHA1 hash
            encodedSignature = oauthSignature.generate(httpMethod, url, parameters, consumerSecret, tokenSecret),
            // generates a BASE64 encode HMAC-SHA1 hash
            signature = oauthSignature.generate(httpMethod, url, parameters, consumerSecret, tokenSecret,
                { encodeSignature: false});

        return fetch('http://murslat.com/index.php/rest/V1/products?searchCriteria[filter_groups][0][filters][0][field]=category_id&searchCriteria[filter_groups][0][filters][0][value]='+this.props.categoryID,{
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
                dataSource: responseJson.items,
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

    productDetails = (id,sku,productTitle)=>{
        this.props.navigator.push({
            screen: 'ProductDetailsScreen', // unique ID registered with Navigation.registerScreen
            title: productTitle, // navigation bar title of the pushed screen (optional)
            subtitle: undefined, // navigation bar subtitle of the pushed screen (optional)
            //titleImage: require('../../img/my_image.png'), // iOS only. navigation bar title image instead of the title text of the pushed screen (optional)
            passProps: {productID:id,productSKU:sku}, // Object that will be passed as props to the pushed screen (optional)
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

        let jsx = '';
        if(this.state.isLoading){
            jsx = <View style={styles.container}><Text>Loading Content</Text><ActivityIndicator size="large" color="#0000ff" /></View>;
        }
        else{
            jsx =
                    <FlatList
                          data={this.state.dataSource}
                          extraData={this.state}
                          keyExtractor={this._keyExtractor}
                          renderItem={this._renderItem}
                    />
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