import React, { Component } from 'react'
import Code from './common/code.jsx'
import Section from './common/section.jsx'
import Scrollspy from 'react-scrollspy'

class RoundButtons extends Component {
  state = {}

  render() {
    return (
      <div>
        <div className="pageTitle contentMaxWidth">Round Buttons</div>
        <div className="splitColumn contentMaxWidth">
          <div id="content">
            <div className="pageSubTitle">
              The rounded buttons are less important than the main CTA buttons
              and use for making a second-level hierarchy.
            </div>

            <Section title="Usage" id="usage">
              To apply this component, add the
              <Code styling="inline">.dsmButton round</Code> classes to a
              <Code styling="inline">{`<button></button>`}</Code> element. Add
              the <Code styling="inline">disabled</Code> attribute to a{' '}
              <Code styling="inline">{`<button></button>`}</Code> element to
              disable the button. Further styling options can be seen below.{' '}
              <div className="exampleContainer">
                <button className="dsmButton round">Lorem Ipsum</button>
                <button className="dsmButton round" disabled>
                  Lorem Ipsum
                </button>
              </div>
              <Code>
                {`<button class="dsmButton round"></button>`}
                <br />
                <br />
                {`<button class="dsmButton round" disabled></button>`}
              </Code>
            </Section>

            <Section title="Colours" id="colours">
              There are a few different colour options to choose from listed
              below. Add one of the following classes to a{' '}
              <Code styling="inline">.dsmButton round</Code> button element to
              apply the styles{' '}
              <div className="gridTable">
                <span className="previewTitle">Class</span>
                <span className="previewTitle">Preview</span>

                <Code styling="inline">.codGray</Code>
                <button className="dsmButton round codGray">Lorem Ipsum</button>
                <Code styling="inline">.porcelain</Code>
                <button className="dsmButton round porcelain">
                  Lorem Ipsum
                </button>
                <Code styling="inline">.regentGray</Code>
                <button className="dsmButton round regentGray">
                  Lorem Ipsum
                </button>
                <Code styling="inline">.towerGray</Code>
                <button className="dsmButton round towerGray">
                  Lorem Ipsum
                </button>
                <Code styling="inline">.white</Code>
                <button className="dsmButton round white">Lorem Ipsum</button>
              </div>
              <Code>
                {`<button class="dsmButton round codGray"></button>`}
                <br />
                {`<button class="dsmButton round porcelain"></button>`}
                <br />
                {`<button class="dsmButton round regentGray"></button>`}
                <br />
                {`<button class="dsmButton round towerGray"></button>`}
                <br />
                {`<button class="dsmButton round white"></button>`}
              </Code>
            </Section>

            <Section title="Sizes" id="sizes">
              There are several size modifiers available. Just add one of the
              following classes to a{' '}
              <Code styling="inline">.dsmButton round</Code> button element to
              apply a different size
              <div className="gridTable">
                <span className="previewTitle">Class</span>
                <span className="previewTitle">Preview</span>
                <Code styling="inline">.regular</Code>
                <button className="dsmButton round regular">Lorem Ipsum</button>
                <Code styling="inline">.medium</Code>
                <button className="dsmButton round medium">Lorem Ipsum</button>
                <Code styling="inline">.small</Code>
                <button className="dsmButton round small">Lorem Ipsum</button>
              </div>
              <Code>
                {`<button class='dsmButton regular'></button>`}
                <br />
                {`<button class='dsmButton medium'></button>`}
                <br />
                {`<button class='dsmButton small'></button>`}
              </Code>
            </Section>

            <Section title="Styles" id="styles">
              If you want the button to have a “ghost” outline add
              <Code styling="inline" language="xml">
                .dsmButton round ghost
              </Code>
              to the button element classlist.
              <div className="exampleContainer">
                <button className="dsmButton round ghost">Lorem Ipsum</button>
              </div>
              <Code>{`<button class='dsmButton round ghost'></button>`}</Code>
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

export default RoundButtons
