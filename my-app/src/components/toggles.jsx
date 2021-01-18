import React, { Component } from 'react'
import Code from './common/code.jsx'
import Section from './common/section.jsx'

class Toggles extends Component {
  state = {}

  render() {
    return (
      <div>
        <div className="pageTitle contentMaxWidth">Toggles</div>
        <div className="splitColumn contentMaxWidth">
          <div id="content">
            <div className="pageSubTitle">
              The toggles are used to choose between two different states.
            </div>

            <Section title="Usage" id="usage">
              To apply this component, add a label component with the class{' '}
              <Code styling="inline">.dsmSlider</Code>. To disable the slider,
              add <Code styling="inline">data-disabled=true</Code> attribute to
              the label element.
              <Code>
                {`<label class="dsmSlider"></label>`}
                <br /> <br />
                {`<label class="dsmSlider" data-disabled=true></label>`}
              </Code>{' '}
              <div className="exampleContainer">
                <label className="dsmSlider">
                  <input type="checkbox" />
                  <span className="slider"></span>
                </label>
                <label className="dsmSlider">
                  <input type="checkbox" disabled />
                  <span className="slider"></span>
                </label>
              </div>
            </Section>
          </div>
        </div>
      </div>
    )
  }
}

export default Toggles
