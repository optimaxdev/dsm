import React, { Component } from 'react'
import Code from './common/code.jsx'
import Section from './common/section.jsx'
import Scrollspy from 'react-scrollspy'

class CtaButtons extends Component {
  state = {}

  render() {
    return (
      <div>
        <div className="pageTitle contentMaxWidth">CTA Buttons</div>
        <div className="splitColumn contentMaxWidth">
          <div id="content">
            <div className="pageSubTitle">
              The CTA buttons are the most important buttons on the site and are
              designed for the central reference on the page.
            </div>
            {/* Usage */}
            <Section title="Usage" id="usage">
              To apply this component, add the
              <Code styling="inline">.dsmButton</Code> class to a
              <Code styling="inline">{`<button></button>`}</Code> element. Add
              the <Code styling="inline">disabled</Code> attribute to a{' '}
              <Code styling="inline">{`<button></button>`}</Code> element to
              disable the button. Further styling options can be seen below.{' '}
              <div className="exampleContainer">
                <button className="dsmButton">Lorem Ipsum</button>
                <button className="dsmButton" disabled>
                  Lorem Ipsum
                </button>
              </div>
              <Code>
                {`<button class="dsmButton"></button>`}
                <br />
                <br />
                {`<button class="dsmButton" disabled></button>`}
              </Code>
            </Section>

            <Section title="Colours" id="colours">
              There are two different colours to choose from, either the default
              primary styling or the secondary styling. To add the secondary
              styling add{' '}
              <Code styling="inline" language="css">
                .secondary
              </Code>
              to the button element classlist. For the default styling there is
              no need to add an extra class.
              <div className="exampleContainer">
                <button className="dsmButton secondary">Lorem Ipsum</button>
              </div>
              <Code>{'<button class="dsmButton secondary"></button>'}</Code>
            </Section>

            <Section title="Sizes" id="sizes">
              There are several size modifiers available. Just add one of the
              following classes to apply a different size
              <div className="gridTable">
                <span className="previewTitle">Class</span>
                <span className="previewTitle">Preview</span>

                <Code styling="inline">.extralarge</Code>
                <button className="dsmButton extralarge">Lorem Ipsum</button>
                <Code styling="inline">.large</Code>
                <button className="dsmButton large">Lorem Ipsum</button>
                <Code styling="inline">.regular</Code>
                <button className="dsmButton regular">Lorem Ipsum</button>
                <Code styling="inline">.medium</Code>
                <button className="dsmButton medium">Lorem Ipsum</button>
                <Code styling="inline">.small</Code>
                <button className="dsmButton small">Lorem Ipsum</button>
              </div>
              <Code>
                {`<button class='dsmButton extralarge'></button>`}
                <br />
                {`<button class='dsmButton large'></button>`}
                <br />
                {`<button class='dsmButton regular'></button>`}
                <br />
                {`<button class='dsmButton medium'></button>`}
                <br />
                {`<button class='dsmButton small'></button>`}
              </Code>
            </Section>

            <Section title="Styles" id="styles">
              If you want the button to have a “ghost” outline add
              <Code styling="inline" language="css">
                .ghost
              </Code>
              to the button element classlist.
              <div className="exampleContainer">
                <button className="dsmButton ghost">Lorem Ipsum</button>
              </div>
              <Code>{`<button class='dsmButton ghost'></button>`}</Code>
            </Section>
          </div>

          <Scrollspy
            items={['colours', 'sizes', 'styles']}
            componentTag="div"
            className="sideNav"
            offset={-50}
            currentClassName="active"
          >
            <a href="#usage" className="active">
              Usage
            </a>
            <a href="#colours">Colours</a>
            <a href="#sizes">Sizes</a>
            <a href="#styles">Styles</a>
          </Scrollspy>
        </div>
      </div>
    )
  }
}

export default CtaButtons
