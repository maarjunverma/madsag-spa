'use client';
import {
  FaInstagram,
  FaFacebookF,
  FaPinterestP,
  FaLinkedinIn,
} from "react-icons/fa";
import { AiOutlineYoutube } from "react-icons/ai";
import React, { useState } from "react";

// import '../App.css'

const QuoteModal = () => {
  // 1. State to handle form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: 'website-development', // Default value from select
    budget: '10000-50000', // Default value from select
    description: ''
  });

  const [status, setStatus] = useState({ loading: false, message: '' });

  // 2. Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 3. Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, message: '' });

    try {
      const response = await fetch("https://api.madsag.in/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // CRITICAL: Strapi requires the 'data' wrapper
        body: JSON.stringify({
          data: {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            projectType: formData.projectType,
            budget: formData.budget,
            description: formData.description,
          },
        }),
      });

      if (response.ok) {
        setStatus({ loading: false, message: 'Success! We will revert shortly.' });
        // Optional: Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          projectType: 'website-development',
          budget: '1000-5000',
          description: ''
        });
        alert("Request sent successfully!");
      } else {
        const errorData = await response.json();
        console.error("Strapi Error:", errorData);
        setStatus({ loading: false, message: 'Failed to send. Please try again.' });
        alert("Failed to send request.");
      }
    } catch (error) {
      console.error("Network Error:", error);
      setStatus({ loading: false, message: 'Network error.' });
      alert("Something went wrong.");
    }
  };

  return (
    <>
      <section className="bg-gray-100 py-10 font-flexFont w-full   ">
        <div className="max-w-3xl mx-auto bg-white px-8 rounded-lg shadow-lg p-20">
          <h2 className="text-3xl font-bold mb-6 text-center text-textcol-text1">
            Request a Web Development Quote
          </h2>
          <div className="separator bg-textcol-text1 h-1 rounded-lg mt-5 w-20 m-auto"></div>
          <p className="text-textcol-text1 mt-10 m-5 font-semibold  text-center pr-4 ">
            Please Fill this form we will revert to you Soon
          </p>

          <form onSubmit={handleSubmit}>
            <div className="comtainer pr-6 flex justify-around w-full relative items-center">
              
              {/* social container */}
              
              <div className="social-container w-[20%] left-0 top-20 mr-10      py-10 rounded-lg">
                <p className="absolute rotate-90 top-1/2  left-[-40px] p-0 text-textcol-text1  text-2xl  font-bold  text-center w-max ">
                  Follow us on
                </p>

                <div className="icons flex flex-col justify-center items-start px-10 py-5   ">
                  <span className="text-2xl  mb-5  cursor-pointer hover:bg-backgrounds-bg4   rounded-2xl outline-none bg-black text-white  p-2  ml-4 border-white  border-2 ">
                    <FaFacebookF />
                  </span>
                  <span className="text-2xl mb-5   cursor-pointer hover:bg-backgrounds-bg4  rounded-2xl outline-none bg-black text-white   p-2  ml-4 border-white  border-2 ">
                    <FaInstagram />
                  </span>
                  <span className="text-2xl mb-5  cursor-pointer hover:bg-backgrounds-bg4  rounded-2xl outline-none bg-black text-white   p-2  ml-4 border-white  border-2">
                    <AiOutlineYoutube />
                  </span>
                  <span className="text-2xl  mb-5  cursor-pointer hover:bg-backgrounds-bg4  rounded-2xl outline-none bg-black text-white   p-2  ml-4 border-white  border-2 ">
                    <FaLinkedinIn />
                  </span>
                  <span className="text-2xl    cursor-pointer hover:bg-backgrounds-bg4 rounded-2xl outline-none bg-black text-white  p-2  ml-4 border-white  border-2">
                    <FaPinterestP />
                  </span>
                </div>
              </div>

{/* form  div */}

              <div className="form-container  w-[80%]">
                {/* name fields */}
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block  text-textcol-text1  font-semibold mb-2"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border text-textcol-text1 focus:ring-black border-gray-300 rounded-md focus:outline-none focus:ring-2 "
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-textcol-text1  font-semibold mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 text-textcol-text1 focus:ring-black border border-gray-300 rounded-md focus:outline-none focus:ring-2"
                    placeholder="Enter your email address"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="phone"
                    className="block text-textcol-text1  font-semibold mb-2 "
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border text-textcol-text1 focus:ring-black border-gray-300 rounded-md focus:outline-none focus:ring-2 "
                    placeholder="Enter your phone number"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="project-type"
                    className="block text-textcol-text1 font-semibold mb-2"
                  >
                    Project Type
                  </label>
                  <select
                    id="project-type"
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border text-textcol-text1 focus:ring-black border-gray-300 rounded-md focus:outline-none focus:ring-2  "
                  >
                    <option value="website-development">
                      Website Development
                    </option>
                    <option value="ecommerce-development">
                      E-commerce Development
                    </option>
                    <option value="seo">SEO Services</option>
                    <option value="app-development">App Development</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="budget"
                    className="block text-textcol-text1 font-semibold mb-2"
                  >
                    Estimated Budget
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border text-textcol-text1 focus:ring-black border-gray-300 rounded-md focus:outline-none focus:ring-2 "
                  >
                    <option value="1000-5000">1000 - 5000 USD</option>
                    <option value="5000-10000">5000 - 10,000 USD</option>
                    <option value="10000-20000">10,000 - 20,000 USD</option>
                    <option value="above-20000">Above 20,000 USD</option>
                  </select>
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="description"
                    className="block text-textcol-text1 font-semibold mb-2"
                  >
                    Project Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="4"
                    required
                    className="w-full px-3 py-2 border text-textcol-text1 focus:ring-black border-gray-300 rounded-md focus:outline-none focus:ring-2 "
                    placeholder="Briefly describe your project requirements"
                  ></textarea>
                </div>

                <div className="text-center">
                  <button type="submit" disabled={status.loading} className="bg-btns-btnbg1 uppercase font-semibold hover:text-white hover:bg-black  text-black mr-4 border-white border-4 px-16 py-4 rounded-xl bg-backgrounds-bg4 shadow-lg shadow-black">
                    {status.loading ? 'Sending...' : 'Submit'}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default QuoteModal;