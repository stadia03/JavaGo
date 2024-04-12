import React from 'react';

export default function Card() {
  return (
    <div className='m-3' style={{ display: 'inline-block' }}>
      <div className="card" style={{ width: "18rem", maxHeight: "360px", display: 'inline-block' }}>
        <img src="https://source.unsplash.com/random/612x412/?briyani" className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">Card title</h5>
          <p className="card-text">impppp.</p>
          <div className='container w-100'>
            <select className='m-2 h-100  success-light' >
              {Array.from(Array(6), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>
                )
              })}
            </select >

            <select className='m-2 h-100  success-light rounded' >
              <option value='half'>Half</option>
              <option value='full'>Full</option>
            </select>
            <div className='d-inline h-100 fs-5'>Total kharchaa</div>
          </div>
        </div>
      </div>
    </div>
  )
}
