import React, { Component } from "react"
import PropTypes from 'prop-types'
import MonacoEditor from "react-monaco-editor"

class CodeEditor extends Component {
  constructor(props) {
    super(props)
    this.myRef = React.createRef()
  }
  editorDidMount = (editor, monaco) => {
      console.log('asdasd')
    editor.focus()
    setTimeout(function() {
      console.log('editor ', editor)
      editor.getAction('editor.action.formatDocument').run()
    }, 500)
    this.myRef.current = editor;
  }
  onChange = (newValue, e) => {
    //console.log("onChange", newValue, e);
  }
  getValue = () => {
    console.log("this.myRef.current",this.myRef.current.getValue())
  }
  render() {
    const options = {
      selectOnLineNumbers: true,
      formatOnPaste: true
    }
    const props = this.props
    return (
      <div>
        <MonacoEditor
          height={parseInt(props.height)}
          language={props.lenguaje}
          theme="vs-dark"
          value={props.code}
          options={options}
          onChange={this.onChange}
          editorDidMount={this.editorDidMount}
        />
        <div>
          <button onClick={() => this.getValue()}>GET VALUE</button>
        </div>
      </div>
    );
  }
}

CodeEditor.propTypes = {
    lenguaje: PropTypes.string,
    height: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    code: PropTypes.string
  }
  
  // Specifies the default values for props:
  CodeEditor.defaultProps = {
    lenguaje: 'css',
    height: 300,
    code: `body {
        background-color: darkslategrey;
        color: azure;
        font-size: 1.1em;
    }
    h1 {
        color: coral;
    }
    #intro {
        font-size: 1.3em;
    }
    .colorful {
        color: orange;
    }`,
  }
  
export default CodeEditor
