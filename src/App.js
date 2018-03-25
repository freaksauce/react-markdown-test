import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown'
import logo from './logo.svg';
import './App.css';
import myMarkdownFile from './intro.md';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      m1: null,
      m2: null,
      m3: null
    }
    this.getMarkdown(myMarkdownFile, 'm1')
    this.getMarkdown('https://raw.githubusercontent.com/freaksauce/react-markdown-test/master/src/content/foo/foo.md', 'm2')
    this.getMarkdown('https://raw.githubusercontent.com/freaksauce/react-markdown-test/master/src/content/bar/bar.md', 'm3')
  }
  getMarkdown(file, stateVar) {
    fetch(file, {mode: 'cors'})
    .then(response => response.text())
    .then(text => {
      this.setState({[stateVar]: text})
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
        {this.state.m1 !== null &&
          <ReactMarkdown source={this.state.m1} />
        }
        <hr />
        {this.state.m2 !== null &&
          <ReactMarkdown source={this.state.m2} />
        }
        <hr />
        {this.state.m3 !== null &&
          <ReactMarkdown source={this.state.m3} />
        }
        </div>
      </div>
    );
  }
}

export default App;
