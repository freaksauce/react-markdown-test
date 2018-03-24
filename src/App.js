import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown'
import logo from './logo.svg';
import './App.css';
import myMarkdownFile from './intro.md';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      markdownContent: null
    }
    this.getMarkdown()
  }
  getMarkdown() {
    fetch(myMarkdownFile)
    .then(response => response.text())
    .then(text => {
      this.setState({markdownContent: text})
    });
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="App-intro">
        {this.state.markdownContent !== null &&
          <ReactMarkdown source={this.state.markdownContent} />
        }
        </div>
      </div>
    );
  }
}

export default App;
