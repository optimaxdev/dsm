import React from 'react'

const Section = (props) => {
  return (
    <React.Fragment>
      <div className="sectionTitle" id={props.id}>
        # {props.title}
      </div>
      {props.children}
    </React.Fragment>
  )
}

export default Section
