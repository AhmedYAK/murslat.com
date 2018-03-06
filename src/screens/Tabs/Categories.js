import React from 'react';
import { StyleSheet, Text, View ,SectionList,Platform,TouchableOpacity} from 'react-native';

export default class Categories extends React.Component {
    GetSectionListItem=(item)=>{

        alert(item)

    }


    render() {

        var A = ['Apple', 'Apricot', 'Avocado'] ;
        var B = ['Banana', 'Blackberry', 'Blackcurrant', 'Blueberry', 'Boysenberry'] ;
        var C = ['Cherry', 'Coconut'] ;

        return (

            <View style={{ marginTop : (Platform.OS) == 'ios' ? 20 : 0 }}>

                <SectionList

                    sections={[

                        { title: 'Fruits Name From A',id:1, data: A },

                        { title: 'Fruits Name From B',id:2, data: B },

                        { title: 'Fruits Name From C',id:3, data: C },

                    ]}

                    renderSectionHeader={ ({section}) => <TouchableOpacity onPress={()=>this.GetSectionListItem(section.id)}><Text style={styles.SectionHeaderStyle}> { section.title } </Text></TouchableOpacity>}

                    renderItem={ ({item}) => <Text style={styles.SectionListItemStyle} onPress={this.GetSectionListItem.bind(this, item)}> { item } </Text> }

                    keyExtractor={ (item, index) => index }

                />

            </View>

        );
    }
}

const styles = StyleSheet.create({
    SectionHeaderStyle:{

        backgroundColor : '#CDDC39',
        fontSize : 20,
        padding: 5,
        color: '#fff',
    },

    SectionListItemStyle:{

        fontSize : 15,
        padding: 5,
        color: '#000',
        backgroundColor : '#F5F5F5'

    }
});