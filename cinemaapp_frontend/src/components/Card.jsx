import React from 'react'

const Card = ({key, title}) => {
  return (
    <div className='rounded p-3 border d-inline-block shadow' key={key}>
      <div className='rounded' style={{width: "350px", minHeight: "400px", background: "url('https://images6.alphacoders.com/130/1307795.jpg')", backgroundSize: "cover", backgroundPosition: "center"}} />
      <h5 className='mt-2'>{title}</h5> {/* make this bold */}
      <h6>117min | Fantasy</h6>
    </div>
  )
}

export default Card
