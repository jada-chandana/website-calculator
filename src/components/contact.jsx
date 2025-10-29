import React from 'react'

 const contact = () => {
  return (
    <>
     <div className="contact-card">
    <h4 >Contact request</h4>
    <div className="contact-input">
   <label for="name">Name:</label>
   <input type="text" id="name" placeholder="Enter name" />
   <label for="phone">Phone:</label>
   <input type="text" id="name" placeholder="Enter Number" />
   <label for="email">Email:</label>
   <input type="email" id="name" placeholder="Enter Email" />
   </div>
   <button type="submit" className='contact-btn'>submit</button>
   </div>
    </>
  )
}
export default contact;
