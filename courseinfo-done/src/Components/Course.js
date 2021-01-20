import React from 'react'

const Course = ({course}) => {
    return(
      <div>
        <Header name={course.name}/>
        <Content parts={course.parts}/>
        <Total parts={course.parts}/>
      </div>
    )
  }
  
  const Header = ({name}) => {
    return(
      <h1>{name}</h1>
    )
  }
  
  const Content = ({parts}) => {
    return(
    <div>
      {parts.map((part)=>
        <Part key={part.id} part={part}/>
      )}
    </div>
    )
  }
  
  const Total = ({parts}) => {
    const total = parts.reduce( (sum,part) => {
      return sum+part.exercises
    },0)
  
    return(
      <div>
        <p>Total of {total} exercises
        </p>
      </div>
    )
  }
  
  const Part = ({part}) => {
    return(
      <div>
        <p>
          {part.name} {part.exercises}
        </p>
      </div>
    )
  }

  export default Course