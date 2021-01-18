import React from 'react'

const Section = (props) => {
  return (
    <Element name={props.id}>
      <div className="sectionTitle" id={props.id}>
        # {props.title}
      </div>
      {props.children}
    </Element>
  )
}

export default Section
