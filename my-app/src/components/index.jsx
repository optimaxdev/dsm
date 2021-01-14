import React, { Component } from 'react'
import Code from './common/code.jsx'

class Index extends Component {
  state = {}

  render() {
    return (
      <div className="contentMaxWidth">
        <div className="pageTitle">Installation</div>
        <div className="pageSubTitle">
          Learn how to include the styling in your project.
        </div>
        <div className="sectionTitle"># Usage</div>
        To install the styling and scripts, include the following code in the
        <Code styling="inline">&lt;head&gt;&lt;/head&gt;</Code>
        section of your project.
        <Code>
          {'<!-- CSS Styling -->'} <br />
          {
            '<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/glassesUSA/dsm@latest/dist/styles.css">'
          }
          <br />
          <br />
          {
            '<!-- Scripts - Required if you are using any form elements/buttons-->'
          }
          <br />
          {
            '<script src="https://cdn.jsdelivr.net/gh/glassesUSA/dsm@latest/dist/dsm-effects.js"></script>'
          }
        </Code>
      </div>
    )
  }
}

export default Index
