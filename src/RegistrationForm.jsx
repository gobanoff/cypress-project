import React, { useState } from "react";
import "./RegistrationForm.css";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    dob: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [age, setAge] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    let formErrors = {};
    if (!formData.username) formErrors.username = "Username is required";
    if (!formData.email) {
      formErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formErrors.email = "Email is invalid";
    }
    if (!formData.password) {
      formErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      formErrors.password = "Password must be at least 6 characters";
    }
    if (!formData.dob) {
      formErrors.dob = "Date of Birth is required";
    } else if (isNaN(new Date(formData.dob).getTime())) {
      formErrors.dob = "Date of Birth is invalid";
    }
    return formErrors;
  };

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validate();
    setErrors(formErrors);
    if (Object.keys(formErrors).length === 0) {
      setAge(calculateAge(formData.dob));
      setSubmitted(true);
    }
  };

  return ( 
    <div className="registration-form">
      <form onSubmit={handleSubmit}>
        <div>
          {" "}
          {errors.username && <p className="error">{errors.username}</p>}
          <label>Username: </label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div className="mail">
          {" "}
          {errors.email && <p className="error">{errors.email}</p>}
          <label>Email: </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          {" "}
          {errors.password && <p className="error">{errors.password}</p>}
          <label>Password: </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div className="birth">
          {errors.dob && <p className="error">{errors.dob}</p>}
          <label>Birthday: </label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      {submitted && (
        <div className="submitted-info">
          <h3>Submitted Information:</h3>
          <div className="i"> 
            <strong>Username:</strong><h2> {formData.username}</h2>
            </div>
            <div className="i"> 
            <strong>Email:</strong> <h2>{formData.email}</h2>
          </div>
          <div className="i"> 
            <strong>Date of Birth:</strong> <h2>{formData.dob}</h2>
           </div>
          <div className="i">
          <strong> Age:</strong><h2>{age}</h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegistrationForm;
