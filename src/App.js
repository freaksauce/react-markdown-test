import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown'
import logo from './logo.svg';
import './App.css';
import myMarkdownFile from './intro.md';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      m1: null
    }
    this.fetchObj = {
      headers: {
        Authorization: 'Bearer 588ce3a5bded69e7fe84e52d96e39d1895bf5042'
      },
      mode: 'cors'
    }
    this.repoContentsUrl = 'https://api.github.com/repos/freaksauce/react-markdown-test/contents/src/content/'
    // this.getMarkdownContent(myMarkdownFile, 'm1')
    // this.getMarkdownContent('https://raw.githubusercontent.com/freaksauce/react-markdown-test/master/src/content/foo/foo.md', 'm2')
    // this.getMarkdownContent('https://raw.githubusercontent.com/freaksauce/react-markdown-test/master/src/content/bar/bar.md', 'm3')
    this.getRepoContents()
  }
  componentWillUpdate() {
    console.log(this.state);
  }
  getRepoContents() {
    fetch(this.repoContentsUrl, this.fetchObj)
    .then(response => response.json())
    .then(json => {
      this.getMarkdownUrls(json)
    });
  }
  getMarkdownUrls(fileArray) {
    fileArray.forEach(file => {
      const markdownUrl = `${this.repoContentsUrl}${file.name}`
      this.getMarkdownFile(markdownUrl, file.name)
    })
  }
  getMarkdownFile(markdownUrl, name) {
    fetch(markdownUrl, this.fetchObj)
    .then(response => response.json())
    .then(json => {
      // console.log('json: ', json[0]);
      const markdownUrl = json[0].download_url;
      this.getMarkdownContent(markdownUrl, name)
    });
  }
  getMarkdownContent(file, name) {
    console.log('file: ', file);
    fetch(file, this.fetchObj)
    .then(response => response.text())
    .then(text => {
      console.log('name', name)
      console.log('text', text);
      this.setState({[name]: text})
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
