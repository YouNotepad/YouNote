import React, {Component} from 'react';
import './App.css';
import 'suneditor/dist/css/suneditor.min.css'
import HomeScreen from './components/HomeScreen/HomeScreen'
import NoteScreen from './components/NoteScreen/NoteScreen'



const AppScreen = {
  HOME_SCREEN: "HOME_SCREEN",
  NOTE_SCREEN: "NOTE_SCREEN"
}
class App extends Component {
  
  constructor(props) {
  // ALWAYS DO THIS FIRST
  super(props);

  // DISPLAY WHERE WE ARE
  console.log("App constructor");
  
  this.state = {
    currentScreen: AppScreen.HOME_SCREEN,
    
  }
 



}

goToHomeScreen = () => {
 
  this.setState({
    currentScreen: AppScreen.HOME_SCREEN,
    
  });
}

goToNoteScreen = (logo) => {    
 
  this.setState({
    currentScreen: AppScreen.NOTE_SCREEN,
    
  });
}
addNewURL = (url) => {
  //if url is entered, handle go to Note screen

}

render() {
  console.log("App render");
  switch (this.state.currentScreen) {
    case AppScreen.HOME_SCREEN:
      return <HomeScreen
        
        goToLogoCallback={this.goToNoteScreen}          // WORK ON SELECTED LOGO CALLBACK
      />;
    case AppScreen.NOTE_SCREEN:
      return <NoteScreen
                               // DATA NEEDED BY THIS COMPONENT AND ITS DESCENDANTS
        goToHomeCallback={this.goToHomeScreen}                    // NAVIGATION CALLBACK
        

      />;
    default:
      return <div></div>;
  };
}

}

export default App;
