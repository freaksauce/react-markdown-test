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
        Accept: 'application/json',
        Authorization: 'Bearer 5adb544e22e7b0b6f85cf7a43a08d33a50ebde7f'
      },
      mode: 'cors'
    }
    // load a local markdown file to render
    this.getMarkdownContent(myMarkdownFile, 'm1')
    // url for the contents of a directory in the github repo
    this.repoContentsUrl = 'https://api.github.com/repos/freaksauce/react-markdown-test/contents/src/content/'
    this.getRepoContents()
  }
  getRepoContents() {
    /**
     * fetch the contents of a specific directory in the github repo and return as an array of files
     * TODO: check if file is a .md file before calling getMarkdownUrls()
     */
    fetch(this.repoContentsUrl, this.fetchObj)
    .then(response => response.json())
    .then(json => {
      // filter for .md files
      console.log(json);
      // const fileArray = json.filter(file => file)
      this.getMarkdownUrls(json)
    });
  }
  getMarkdownUrls(fileArray) {
    /**
     * Loop over the array of files from github repo and get each markdown file
     */
    fileArray.forEach(file => {
      const markdownUrl = `${this.repoContentsUrl}${file.name}`
      this.getMarkdownFile(markdownUrl, file.name)
    })
  }
  getMarkdownFile(markdownUrl, name) {
    /**
     * fetch the markdown file using the download_url
     */
    fetch(markdownUrl, this.fetchObj)
    .then(response => response.json())
    .then(json => {
      const markdownUrl = json[0].download_url;
      this.getMarkdownContent(markdownUrl, name)
    });
  }
  getMarkdownContent(file, name) {
    /**
     * save contents of .md file to local state
     */
    fetch(file)
    .then(response => response.text())
    .then(text => {
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
          <ReactMarkdown source={this.state.foo} />
        }
        <hr />
        {this.state.m3 !== null &&
          <ReactMarkdown source={this.state.bar} />
        }
        </div>
      </div>
    );
  }
}

export default App;
