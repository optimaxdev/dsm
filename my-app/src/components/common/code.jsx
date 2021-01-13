import React from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { github } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { CopyToClipboard } from 'react-copy-to-clipboard'

let styles = {
  marginTop: '35px',
  padding: '25px 30px',
  boxSizing: 'border-box',
  whiteSpace: 'normal',
  backgroundColor: '#F1F1F1',
}

let copyButton = {
  position: 'absolute',
  right: '14px',
  top: '10px',
}

const Code = ({ content, styling = null, language = 'xml' }) => {
  return (
    <React.Fragment>
      {styling !== 'inline' ? (
        <div style={{ position: 'relative' }}>
          <CopyToClipboard text={content}>
            <span style={copyButton}>Copy</span>
          </CopyToClipboard>

          <SyntaxHighlighter
            wrapLines={true}
            style={github}
            language={language}
            customStyle={styles}
            className={styling === 'inline' ? 'inlineStyling' : ''}
          >
            {content}
          </SyntaxHighlighter>
        </div>
      ) : (
        <SyntaxHighlighter
          wrapLines={true}
          style={github}
          language={language}
          customStyle={styles}
          className={styling === 'inline' ? 'inlineStyling' : ''}
        >
          {content}
        </SyntaxHighlighter>
      )}
    </React.Fragment>
  )
}

export default Code
