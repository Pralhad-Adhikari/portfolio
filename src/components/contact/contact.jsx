import React, { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import emailjs from '@emailjs/browser';
import './Contact.css';

const Contact = () => {
  const formRef = useRef(null)
  const [status, setStatus] = useState({ loading: false, success: null, message: '' })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formRef.current) return
    try{
      setStatus({ loading: true, success: null, message: '' })
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      if(!serviceId || !templateId || !publicKey){
        throw new Error('Email setup not configured. Add EmailJS keys to .env and restart.')
      }
      await emailjs.sendForm(serviceId, templateId, formRef.current, publicKey)
      setStatus({ loading: false, success: true, message: 'Message sent successfully!' })
      formRef.current.reset()
    }catch(err){
      const detail = (err && (err.text || err.message)) ? ` (${err.text || err.message})` : ''
      setStatus({ loading: false, success: false, message: `Failed to send. Please try again later${detail}.` })
      console.error(err)
    }
  }

  return (
    <div className="contact-page">
      {/* Left side - Contact Form */}
      <div className="contact-form">
        <h2>Let's Work Together</h2>
        <form ref={formRef} onSubmit={handleSubmit}>
          <div className="input-group">
            <input type="text" name="first_name" placeholder="First Name" required />
            <input type="text" name="last_name" placeholder="Last Name" required />
          </div>
          <div className="input-group">
            <input type="email" name="reply_to" placeholder="Email" required />
            <input type="tel" name="phone" placeholder="Phone" required />
          </div>
          <div className="select-group">
            
            <select id="service" name="service" required>
              <option value="">Choose a service</option>
              
              <option value="design">Design</option>
              <option value="development">Development</option>
              
            </select>
          </div>
          <textarea name="message" placeholder="Message" rows="4" required></textarea>
          <button type="submit" disabled={status.loading}>{status.loading ? 'Sending...' : 'Submit'}</button>
          {status.message && (
            <div className={`form-status ${status.success ? 'success' : 'error'}`}>{status.message}</div>
          )}
        </form>
      </div>

      {/* Right side - Contact Information */}
      <div className="contact-info">
        <div>
          <FontAwesomeIcon icon={faPhone} className="contact-icon" />
          <div>
            <h3>Phone</h3>
            <p>9842415539</p>
          </div>
        </div>
        <div>
          <FontAwesomeIcon icon={faEnvelope} className="contact-icon" />
          <div>
            <h3>Email</h3>
            <p>pralhada73@gmail.com</p>
          </div>
        </div>
        <div>
          <FontAwesomeIcon icon={faMapMarkerAlt} className="contact-icon" />
          <div>
            <h3>Address</h3>
            <p>New Baneshwor, Kathmandu</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
