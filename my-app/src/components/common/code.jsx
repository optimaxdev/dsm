import React, { useState } from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { github } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css' // optional

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
  outline: 'none !important',
  cursor: 'pointer',
  top: '10px',
}

const Code = (props) => {
  let content = ''

  React.Children.toArray(props.children).forEach((e) => {
    !e.type ? (content += e) : (content += '\n')
  })

  const [isCopied, setIsCopied] = useState(false)

  return (
    <React.Fragment>
      {props.styling !== 'inline' ? (
        <div style={{ position: 'relative' }}>
          <CopyToClipboard
            text={content}
            onCopy={() => {
              setTimeout(() => {
                setIsCopied(false)
              }, 1500)
              setIsCopied(true)
            }}
          >
            <span style={copyButton} className="copyIcon">
              <Tippy
                hideOnClick={false}
                content={isCopied ? 'Copied!' : 'Copy to clipboard'}
                className="hoverTooltip"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="17">
                  <g fill="none" fillRule="evenodd">
                    <path
                      id="iconStroke"
                      stroke="#898989"
                      d="M14.714 6.625V4c0-.825-.685-1.5-1.524-1.5h-3.184A2.291 2.291 0 007.857 1c-.99 0-1.828.63-2.148 1.5H2.524C1.686 2.5 1 3.175 1 4v10.5c0 .825.686 1.5 1.524 1.5H13.19c.839 0 1.524-.675 1.524-1.5v-2.625"
                    ></path>
                    <path
                      id="iconFill"
                      fill="#898989"
                      fillRule="nonzero"
                      d="M10.143 13h-7.62v-1.5h7.62zm-2.286-3H2.524V8.5h5.333zm2.286-3h-7.62V5.5h7.62zm7.111 3.743h-3.996v2.25l-3.81-3.75 3.81-3.75v2.25h3.996z"
                    ></path>
                  </g>
                </svg>
              </Tippy>
            </span>
          </CopyToClipboard>

          <SyntaxHighlighter
            wrapLines={true}
            style={github}
            language={props.language}
            customStyle={styles}
            className={props.styling === 'inline' ? 'inlineStyling' : ''}
          >
            {content}
          </SyntaxHighlighter>
        </div>
      ) : (
        <SyntaxHighlighter
          wrapLines={true}
          style={github}
          language={props.language}
          customStyle={styles}
          className={props.styling === 'inline' ? 'inlineStyling' : ''}
        >
          {content}
        </SyntaxHighlighter>
      )}
    </React.Fragment>
  )
}

Code.defaultProps = {
  language: 'xml',
  styling: 'null',
}
export default Code
