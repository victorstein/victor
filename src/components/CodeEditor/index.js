import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import MonacoEditor from 'react-monaco-editor'
import beautify from 'js-beautify'
import { Button } from 'reactstrap';

const CodeEditor = props => {
  const myRef = useRef(null)
  const editorDidMount = (editor, monaco) => {
    editor.focus()
    setTimeout(function () {
      console.log('editor ', editor)
      editor.getAction('editor.action.formatDocument').run()
      editor.getAction('editor.action.autoFix').run()
    }, 300)
    myRef.current = editor
  }
  const onChange = (newValue, e) => {
    //beautifyCss(newValue, { indent_size: 2, space_in_empty_paren: true })
    //console.log("onChange", newValue, e);
    //myRef.current.getAction('editor.action.formatDocument').run()
    if(props.setChange) {
      props.setChange(newValue)
    }
  }
  const getValue = () => {
   myRef.current.setValue(formatCode(myRef.current.getValue()))
  }

  const formatCode = (code) => {
    switch (props.lenguaje.toLowerCase()) {
      case 'xml': return beautify.html(code, { indent_size: 2, space_in_empty_paren: true })
      case 'html': return beautify.html(code, { indent_size: 2, space_in_empty_paren: true })
      case 'js': return beautify.js(code, { indent_size: 2, space_in_empty_paren: true })
      case 'css': return beautify.css(code, { indent_size: 2, space_in_empty_paren: true })
      default: return beautify.html(code, { indent_size: 2, space_in_empty_paren: true })
    }
  }

  const options = {
    selectOnLineNumbers: true,
    formatOnPaste: true
  }


  return (
    <div>
      <MonacoEditor
        height={parseInt(props.height)}
        language={props.lenguaje}
        theme='vs-dark'
        //value={props.code}
        value={formatCode(props.code)}
        options={options}
        onChange={onChange}
        editorDidMount={editorDidMount}
      />
      {
        (props.showFormat)
      }
      <div className='d-flex justify-content-center my-3'>
        <Button color="info" onClick={() => getValue()}><i className="tim-icons icon-html5"/> Format Code</Button>
      </div>
    </div>
  )
}

CodeEditor.propTypes = {
  lenguaje: PropTypes.string,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  code: PropTypes.string,
  showFormat: PropTypes.bool
}

// Specifies the default values for props:
CodeEditor.defaultProps = {
  lenguaje: 'xml',
  height: 400,
  code: '',
  showFormat: true
}

export default CodeEditor
