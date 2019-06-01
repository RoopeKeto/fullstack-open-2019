import React from 'react'

const Course = ({course}) => (
  <div>
    <h1>{course.name}</h1>
    {course.parts.map(part => <p key={part.id}>{part.name} {part.exercises}</p>)}
    
    <p><b>total of {course.parts.map(part => part.exercises).reduce((s, p) => {
      return (
        s+p
      )})
    } excercises
    </b></p>

  </div>
)

export default Course