import React, { Component } from 'react'
import Code from './common/code.jsx'

class Index extends Component {
  state = {}

  render() {
    return (
      <React.Fragment>
        <div className="pageTitle">Installation</div>
        <div className="pageSubTitle">
          Learn how to include the styling in your project.
        </div>
        <div className="sectionTitle"># Usage</div>
        To install the styling and scripts, include the following code in the
        <Code content="<head></head>" styling="inline"></Code>
        section of your project.
        <Code
          content={`<!-- CSS Styling -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/glassesUSA/dsm@latest/dist/styles.css">

<!-- Scripts - Required if you are using any form elements/buttons-->
<script src="https://cdn.jsdelivr.net/gh/glassesUSA/dsm@latest/dist/dsm-effects.js"></script>`}
        />
      </React.Fragment>
    )
  }
}

export default Index
