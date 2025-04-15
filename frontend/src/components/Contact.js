import React from "react";
import "./Contact.css";

const Contact = () => {


    return (
        <div className="contact-container">
            <div className="info-container">
                <h1>Contact Us</h1>
                <p>
                    If you have any questions, Email, call, or complete the form provided. We will
                    get back to you as soon as possible.
                </p>
                <br />
                <a href="mailto:someone@example.com">info@helpapp.com</a> <br /> <br />
                <a href="tel:+61 123 456 789">+61 123 456 789</a> <br />
                <br />
                <p>LaTrobe University</p>
                <p>Plenty Rd, Bundoora VIC 3083</p>
                <br />
                <br />
                <p>
                    For rearchers/admin related questions, please contact info@helpappresearch.com
                </p>
            </div>
            <div className="form-container">
                <h2 className="form-title">Seek Guidance</h2>
                <p className="form-subtitle">We’re here to support you.</p>
                <form className="contact-form">
                    <div className="name-group">
                        <input type="text" placeholder="First name" required />
                        <input type="text" placeholder="Last name" required />
                    </div>
                    <input type="email" placeholder="Email" required />
                    <input type="tel" placeholder="+61 234 567 890" required />
                    <textarea placeholder="How can we help you?" required></textarea>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default Contact;