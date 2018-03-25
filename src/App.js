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
        Authorization: 'Bearer d274de8f83c5210a9d5823072359b8c457ac2af6'
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
     */
    fetch(this.repoContentsUrl, this.fetchObj)
    .then(response => response.json())
    .then(json => {
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
      // filter for .md files
      const mdFiles = json.filter(file => file.name.includes('.md'))
      // map over files to call get content
      mdFiles.map((mdFile, index) => {
        const markdownUrl = mdFile.download_url;
        const name = mdFile.name
        this.getMarkdownContent(markdownUrl, name)
      })
    });
  }
  getMarkdownContent(file, name) {
    /**
     * save contents of .md file to local state
     */
    console.log('getMarkdownContent', file, name);
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
        <ReactMarkdown source={this.state.m1} />
        <hr />
        <ReactMarkdown source={this.state['foo.md']} />
        <hr />
        <ReactMarkdown source={this.state['bar.md']} />
        <hr />
        <ReactMarkdown source={this.state['bar-docs.md']} />
        </div>
      </div>
    );
  }
}

export default App;
