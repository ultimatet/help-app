import React, {useState} from "react";
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
      e.preventDefault();
      console.log("Form Data:", formData);
      // You can send this to a backend here
  };


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
                    For rearchers/admin related questions, please contact{" "}
                    <b> info@helpappresearch.com</b>
                </p>
            </div>
            <div className="form-container">
                <h2 className="form-title">Seek Guidance</h2>
                <p className="form-subtitle">We’re here to support you.</p>
                <form onSubmit={handleSubmit} className="contact-form">
                    <div className="name-group">
                        <input
                            name="firstName"
                            placeholder="First name"
                            value={formData.firstName}
                            onChange={handleChange}
                        />
                        <input
                            name="lastName"
                            placeholder="Last name"
                            value={formData.lastName}
                            onChange={handleChange}
                        />
                    </div>

                    <input
                        name="email"
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <input
                        name="phone"
                        type="tel"
                        placeholder="Phone"
                        value={formData.phone}
                        onChange={handleChange}
                    />
                    <textarea
                        name="message"
                        placeholder="How can we help?"
                        value={formData.message}
                        onChange={handleChange}
                    />
                    <button type="submit" className="btn">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default Contact;