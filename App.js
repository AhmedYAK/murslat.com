import {Navigation} from 'react-native-navigation';
import Home from './src/screens/Tabs/Home';
import Categories from './src/screens/Tabs/Categories';
import Search from './src/screens/Tabs/Search';
import Cart from './src/screens/Tabs/Cart';
import WishList from './src/screens/Tabs/WishList';
import ProductsList from './src/screens/Products/ProductsList'
import ProductDetails from './src/screens/Products/ProductDetails';
import ProductsSearch from './src/screens/Products/ProductsSearch';

//import Icon from 'react-native-vector-icons/Ionicons';

//const im1 = Icon.getImageSource("md-map",30).then(source);
//const im2 = Icon.getImageSource("ios-share-alt",30).then(source);
//const im3 = Icon.getImageSource("ios-menu",30).then(source);
//Icon.getImageSource('ios-settings', 30).then((source)

Navigation.registerComponent("HomeScreen",()=>Home);
Navigation.registerComponent("CategoriesScreen",()=>Categories);
Navigation.registerComponent("SearchScreen",()=>Search);
Navigation.registerComponent("CartScreen",()=>Cart);
Navigation.registerComponent("WishListScreen",()=>WishList);
Navigation.registerComponent("ProductsListScreen",()=>ProductsList);
Navigation.registerComponent("ProductDetailsScreen",()=>ProductDetails);
Navigation.registerComponent("ProductsSearch",()=>ProductsSearch);
/** Start Tab Naviagation **/
Navigation.startTabBasedApp({
    tabs:[
        {
            screen:"HomeScreen",
            label: "الرئيسية",
            title: "الرئيسية",
            icon: require('./src/assets/home_outline_small.png'),
            navigatorButtons:{ // nav bar buttons
                leftButtons:[
                    {
                        icon:require('./src/assets/home_outline_small.png'),
                        title:"Menu",
                        id:"sideDrawerToggle",
                    },
                ],
                rightButtons:[
                    {
                        icon:require('./src/assets/home_outline_small.png'),
                        title:"Menu",
                    },
                ]
            }
        },
        {
            screen:"CategoriesScreen",
            label: "التصنيفات",
            title: "التصنيفات",
            icon: require('./src/assets/categories_small.png'),
            navigatorButtons:{ // nav bar buttons
                leftButtons:[
                    {
                        //icon:require('./src/assets/assets/rsz_search-icon-hi-2.png'),
                        title:"Menu",
                        id:"sideDrawerToggle",
                    },
                ]
            }
        },
        {
            screen:"SearchScreen",
            label: "البحث",
            title: "البحث",
            icon: require('./src/assets/rsz_search-icon-hi-2.png'),
            navigatorButtons:{ // nav bar buttons
                leftButtons:[
                    {
                        //icon:require('./src/assets/assets/rsz_search-icon-hi-2.png'),
                        title:"Menu",
                        id:"sideDrawerToggle",
                    },
                ]
            }
        },
        {
            screen:"CartScreen",
            label: "سلة التسوق",
            title: "سلة التسوق",
            icon: require('./src/assets/cart_blue_small.png'),
            navigatorButtons:{ // nav bar buttons
                leftButtons:[
                    {
                        //icon:require('./src/assets/assets/rsz_search-icon-hi-2.png'),
                        title:"Menu",
                        id:"sideDrawerToggle",
                    },
                ]
            }
        },
        {
            screen:"WishListScreen",
            label: "WishList",
            title: "WishList",
            icon: require('./src/assets/whishlist_small.png'),
            navigatorButtons:{ // nav bar buttons
                leftButtons:[
                    {
                        //icon:require('./src/assets/assets/rsz_search-icon-hi-2.png'),
                        title:"Menu",
                        id:"sideDrawerToggle",
                    },
                ]
            }
        },
    ],
    tabsStyle:{ //ios
        tabBarHidden: false, // make the tab bar hidden
        tabBarButtonColor: '#ffff00', // change the color of the tab icons and text (also unselected)
        tabBarSelectedButtonColor: '#ff9900', // change the color of the selected tab icon and text (only selected)
        tabBarBackgroundColor: '#551A8B', // change the background color of the tab bar
        tabBarTranslucent: false, // change the translucent of the tab bar to false
        //tabBarTextFontFamily: 'Avenir-Medium', //change the tab font family
        tabBarLabelColor: '#ffb700', // iOS only. change the color of tab text
        tabBarSelectedLabelColor: 'red', // iOS only. change the color of the selected tab text
        forceTitlesDisplay: true, // Android only. If true - Show all bottom tab labels. If false - only the selected tab's label is visible.
        tabBarHideShadow: true // iOS only. Remove default tab bar top shadow (hairline)
    },
    drawer:{
        left:{
            screen:"CategoriesScreen",
        },
    },
    appStyle:{ ////android
        navigationBarColor: '#fff', // change the background color of the bottom native navigation bar.
        navBarTitleTextCentered: true, // default: false. centers the title.
        navBarSubTitleTextCentered: true, // (Android - default: false, iOS - default: depending on navBarTitleTextCentered). centers the subTitle.
        //navBarButtonFontFamily: 'sans-serif-thin', // Change the font family of textual buttons
        statusBarColor: '#000000', // change the color of the status bar.
        drawUnderStatusBar: false, // default: false, will draw the screen underneath the statusbar. Useful togheter with statusBarColor: transparent
        //collapsingToolBarImage: "http://lorempixel.com/400/200/", // Collapsing Toolbar image.
        collapsingToolBarImage: require('./src/assets/categories_small.png'), // Collapsing Toolbar image. Either use a url or require a local image.
        collapsingToolBarCollapsedColor: '#0f2362', // Collapsing Toolbar scrim color.
        navBarTextFontBold: false, // Optional. Set the title to bold.
        navBarHeight: 70, // Optional, set the navBar height in pixels.
        navBarTopPadding: 24, // Optional, set navBar top padding in dp. Useful when StatusBar.translucent=true on Android Lollipop and above.
        topTabsHeight: 70, // Optional, set topTabs height in pixels.
        topBarBorderColor: 'red', // Optional, set a flat border under the TopBar.
        topBarBorderWidth: 5.5, // Optional, set the width of the border.
    },

});

//top Tabs
/*
Navigation.startSingleScreenApp({
    screen: {
        screen: 'HomeScreen',
        title: 'Collapsing React TopTabs View',
        topTabs: [
            {
                screenId: 'HomeScreen',
                icon: require('./src/assets/rsz_search-icon-hi-2.png'),
                label:'Home',
                title:'Home',
            },
            {
                screenId: 'HomeScreen',
                icon: require('./src/assets/rsz_search-icon-hi-2.png'),
                label:'Home2',
                title:'Home2',
            }
        ]
    }
});
*/
//start app

/*Navigation.startSingleScreenApp({
    screen:{
        screen:"HomeScreen",
        title: "الرئيسية",
    }
});*/

/*import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
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
});*/
