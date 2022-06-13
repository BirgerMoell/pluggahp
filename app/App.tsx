import React, { Component } from 'react';
import { WebView } from 'react-native-webview';

const App = () =>{  
    return (
      <WebView
        source={{
          uri: 'https://hpcampus.se'
        }}
        style={{ marginTop: 60 }}
      />
    );
  }

export default App