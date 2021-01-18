import React, { Component } from 'react'
import Code from './common/code.jsx'
import Section from './common/section.jsx'
import * as Scroll from 'react-scroll'
import {
  Link,
  Element,
  Events,
  animateScroll as scroll,
  scrollSpy,
  scroller,
} from 'react-scroll'

class Forms extends Component {
  state = {}
  Section = React.createClass({
    componentDidMount: function () {
      Events.scrollEvent.register('begin', function (to, element) {
        console.log('begin', arguments)
      })

      Events.scrollEvent.register('end', function (to, element) {
        console.log('end', arguments)
      })

      scrollSpy.update()
    },
    componentWillUnmount: function () {
      Events.scrollEvent.remove('begin')
      Events.scrollEvent.remove('end')
    },
    scrollToTop: function () {
      scroll.scrollToTop()
    },
    scrollToBottom: function () {
      scroll.scrollToBottom()
    },
    scrollTo: function () {
      scroll.scrollTo(100)
    },
    scrollMore: function () {
      scroll.scrollMore(100)
    },
    handleSetActive: function (to) {
      console.log(to)
    },
    render() {
      return (
        <div>
          <div className="pageTitle contentMaxWidth">Forms</div>
          <div className="splitColumn contentMaxWidth">
            <div id="content">
              <div className="pageSubTitle">
                All the different elements that are relevant to forms
              </div>

              <Section title="Usage" id="usage">
                To apply these elements, they need to sit inside a form with the
                class
                <Code styling="inline">.dsmForm</Code>.
                <Code>
                  {`<form class="dsmForm">`}
                  <br />
                  ...
                  <br />
                  {`</form>`}
                </Code>
              </Section>

              <Section title="Dropdown" id="dropdown">
                Used to display multiple elements to choose from it also comes
                with an event you can hook into for when the user selects an
                option. If there is an error you add the{' '}
                <Code styling="inline">error</Code> class to the parent element.
                You can also optionally add an error message with the code{' '}
                <Code styling="inline">
                  {'<span class="error">....</span>'}
                </Code>
                . Finally you can disable the dropdown element by adding{' '}
                <Code styling="inline">disabled</Code> to the button element. To
                access the event on value change, use the function{' '}
                <Code styling="inline" language="js">
                  selectItem(value)
                </Code>{' '}
                value being the result that it will return to you.
                <form action="" className="dsmForm exampleContainer">
                  <div className="selectContainer">
                    <button>
                      <span className="selectedItem">Placeholder</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        stroke="rgb(137, 149, 156)"
                        width="12px"
                        height="10px"
                      >
                        <path
                          d="M1 1l5 6 5-6"
                          strokeWidth="2"
                          fill="none"
                          fillRule="evenodd"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                    </button>
                    <ul>
                      <li>Item 1</li>
                      <li>Item 2</li>
                      <li>Item 3</li>
                    </ul>
                  </div>
                  <div className="selectContainer error">
                    <button>
                      <span className="selectedItem">Placeholder</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        stroke="rgb(137, 149, 156)"
                        width="12px"
                        height="10px"
                      >
                        <path
                          d="M1 1l5 6 5-6"
                          strokeWidth="2"
                          fill="none"
                          fillRule="evenodd"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                    </button>
                    <ul>
                      <li>Item 1</li>
                      <li>Item 2</li>
                      <li>Item 3</li>
                    </ul>
                    <span className="error">This is an error message</span>
                  </div>
                  <div className="selectContainer">
                    <button disabled>
                      <span className="selectedItem">Placeholder</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        stroke="rgb(137, 149, 156)"
                        width="12px"
                        height="10px"
                      >
                        <path
                          d="M1 1l5 6 5-6"
                          strokeWidth="2"
                          fill="none"
                          fillRule="evenodd"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                    </button>
                    <ul>
                      <li>Item 1</li>
                      <li>Item 2</li>
                      <li>Item 3</li>
                    </ul>
                  </div>
                </form>
                <Code>
                  {`<form action="" class="dsmForm">`} <br />
                  {`  <div class="selectContainer">`} <br />
                  {'    <button>'} <br />
                  {'       <span class="selectedItem">Placeholder</span>'}{' '}
                  <br />
                  {'   </button>'} <br />
                  {'    <ul>'} <br />
                  {'       <li>Item 1</li>'} <br />
                  {'       ...'} <br />
                  {'   </ul>'} <br />
                  {'  </div>'} <br />
                  {'</form>'}
                  <br />
                  <br />
                  {`// Error`} <br />
                  {`<form action="" class="dsmForm">`} <br />
                  {`  <div class="selectContainer error">`} <br />
                  {'    <button>'} <br />
                  {'       <span class="selectedItem">Placeholder</span>'}{' '}
                  <br />
                  {'   </button>'} <br />
                  {'    <ul>'} <br />
                  {'       <li>Item 1</li>'} <br />
                  {'       ...'} <br />
                  {'   </ul>'} <br />
                  {
                    '   <span class="error">This is an error message</span>'
                  }{' '}
                  <br />
                  {'  </div>'} <br />
                  {'</form>'}
                  <br />
                  <br />
                  {`// Disabled`} <br />
                  {`<form action="" class="dsmForm">`} <br />
                  {`  <div class="selectContainer">`} <br />
                  {'    <button disabled>'} <br />
                  {'       <span class="selectedItem">Placeholder</span>'}{' '}
                  <br />
                  {'   </button>'} <br />
                  {'    <ul>'} <br />
                  {'       <li>Item 1</li>'} <br />
                  {'       ...'} <br />
                  {'   </ul>'} <br />
                  {'  </div>'} <br />
                  {'</form>'}
                </Code>
              </Section>

              <Section title="Text area" id="textarea">
                These are used for large bodies of text. There are three states
                available: default, disabled and error. If there is an error add
                the <Code styling="inline">error</Code> class to the textarea
                element. You can also optionally add an error message with the
                code{' '}
                <Code styling="inline">
                  {'<span class="error">....</span>'}
                </Code>
                . Finally you disable the element by adding{' '}
                <Code styling="inline">disabled</Code> to the textarea element.{' '}
                <form action="" className="dsmForm exampleContainer">
                  <textarea
                    name=""
                    id=""
                    cols="1"
                    rows="10"
                    placeholder="This is a text area"
                  ></textarea>
                  <textarea
                    disabled
                    name=""
                    id=""
                    cols="1"
                    rows="10"
                    placeholder="This is a text area"
                  ></textarea>
                  <div>
                    <textarea
                      className="error"
                      name=""
                      id=""
                      cols="1"
                      rows="10"
                      placeholder="This is a text area"
                    ></textarea>
                    <span className="error">This is an error message</span>
                  </div>
                </form>
                <Code>
                  {`<form action="" class="dsmForm">`} <br />
                  {`  <textarea></textarea>`} <br />
                  {'</form>'}
                  <br />
                  <br />
                  {`// Disabled`} <br />
                  {`<form action="" class="dsmForm">`} <br />
                  {`  <textarea disabled></textarea>`} <br />
                  {'</form>'}
                  <br />
                  {'  </div>'} <br />
                  {'</form>'}
                  <br />
                  <br />
                  {`// Error`} <br />
                  {`<form action="" class="dsmForm">`} <br />
                  {`  <textarea class="error"></textarea>`} <br />
                  {'  <span class="error">This is an error message</span>'}{' '}
                  <br />
                  {'</form>'}
                </Code>
              </Section>

              <Section title="Text Field" id="textfield">
                These are used for small bodies of text. There are three states
                available: default, disabled and error. If there is an error add
                the <Code styling="inline">error</Code> class to the input
                element. You can also optionally add an error message with the
                code{' '}
                <Code styling="inline">
                  {'<span class="error">....</span>'}
                </Code>
                . Finally you disable the element by adding{' '}
                <Code styling="inline">disabled</Code> to the input element. To
                add the text field you need to exactly copy the format of the
                code below.
                <form action="" className="dsmForm exampleContainer">
                  <div className="inputLabel">
                    <label>Placeholder</label>
                    <input type="text" name="" id="" />
                  </div>
                  <div className="inputLabel">
                    <label>Placeholder</label>
                    <input type="text" name="" id="" disabled />
                  </div>
                  <div className="inputLabel">
                    <label>Placeholder</label>
                    <input type="text" name="" className="error" id="" />
                  </div>
                </form>
                <Code>
                  {`<form action="" class="dsmForm">`} <br />
                  {`  <div class="inputLabel">`} <br />
                  {`      <label>Placeholder</label>`} <br />
                  {`      <input type="text">`} <br />
                  {`  </div>`} <br />
                  {'</form>'}
                  <br />
                  <br />
                  {`// Disabled`} <br />
                  {`<form action="" class="dsmForm">`} <br />
                  {`  <div class="inputLabel">`} <br />
                  {`      <label>Placeholder</label>`} <br />
                  {`      <input type="text" disabled>`} <br />
                  {`  </div>`} <br />
                  {'</form>'}
                  <br />
                  <br />
                  {`// Error`} <br />
                  {`<form action="" class="dsmForm">`} <br />
                  {`  <div class="inputLabel">`} <br />
                  {`      <label>Placeholder</label>`} <br />
                  {`      <input type="text" class="error">`} <br />
                  {`  </div>`} <br />
                  {'</form>'}
                </Code>
              </Section>
            </div>

            <Scrollspy
              items={['colours', 'sizes', 'styles']}
              componentTag="div"
              className="sideNav"
              offset={-0}
              currentClassName="active"
            >
              <a href="#usage" className="active">
                Usage
              </a>
              <Link to="#dropdown" spy={true} isDynamic={true}>
                Dropdown
              </Link>
              <a href="#textarea">Text area</a>
              <a href="#textfield">Text Field</a>
              <a href="#radio">Radio Button</a>
              <a href="#checkbox">Checkbox</a>
            </Scrollspy>
          </div>
        </div>
      )
    },
  })
}

export default Forms
