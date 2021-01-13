import React, { Component } from 'react'
import Code from './common/code.jsx'

class CtaButtons extends Component {
  state = {}

  render() {
    return (
      <React.Fragment>
        <div className="pageTitle">CTA Buttons</div>
        <div className="pageSubTitle">
          The CTA buttons are the most important buttons on the site and are
          designed for the central reference on the page.
        </div>
        <div className="sectionTitle" id="usage">
          # Usage
        </div>
        To apply this component, add the{' '}
        <Code styling="inline" content=".dsmButton" /> class to a{' '}
        <Code styling="inline" content="<button></button>" /> element. Add the{' '}
        <Code styling="inline" content="disabled" /> attribute to a{' '}
        <Code styling="inline" content="<button></button>" /> element to disable
        the button. Further styling options can be seen below.{' '}
        <div className="exampleContainer">
          <button class="dsmButton">Lorem Ipsum</button>
          <button class="dsmButton" disabled>
            Lorem Ipsum
          </button>
        </div>
        <Code
          content={`<button class="dsmButton"></button>

<button class="dsmButton" disabled></button>`}
        />
        <div className="sectionTitle" id="colours">
          # Colours
        </div>
        There are two different colours to choose from, either the default
        primary styling or the secondary styling. To add the secondary styling
        add <Code styling="inline" content=".secondary" language="css" />
        to the button element classlist. For the default styling there is no
        need to add an extra class.
        <div className="exampleContainer">
          <button class="dsmButton secondary">Lorem Ipsum</button>
        </div>
        <Code content='<button class="dsmButton secondary"></button>'></Code>
        <div className="sectionTitle" id="sizes">
          # Sizes
        </div>
        There are several size modifiers available. Just add one of the
        following classes to apply a different size
        <div class="gridTable">
          <span class="previewTitle">Class</span>
          <span class="previewTitle">Preview</span>

          <Code content=".extralarge" styling="inline" />
          <button class="dsmButton extralarge">Lorem Ipsum</button>
          <Code content=".large" styling="inline" />
          <button class="dsmButton large">Lorem Ipsum</button>
          <Code content=".regular" styling="inline" />
          <button class="dsmButton regular">Lorem Ipsum</button>
          <Code content=".medium" styling="inline" />
          <button class="dsmButton medium">Lorem Ipsum</button>
          <Code content=".small" styling="inline" />
          <button class="dsmButton small">Lorem Ipsum</button>
        </div>
        <Code
          content={`<button class='dsmButton extralarge'></button>
<button class='dsmButton large'></button>
<button class='dsmButton regular'></button>
<button class='dsmButton medium'></button>
<button class='dsmButton small'></button>`}
        />
        <div className="sectionTitle" id="styles">
          # Styles
        </div>
        If you want the button to have a “ghost” outline add
        <Code content=".ghost" styling="inline" language="css" />
        to the button element classlist.
        <div className="exampleContainer">
          <button class="dsmButton ghost">Lorem Ipsum</button>
        </div>
        <Code content="<button class='dsmButton ghost'></button>" />
      </React.Fragment>
    )
  }
}

export default CtaButtons
