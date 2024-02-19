import './App.css';
import React, { useState } from "react";
// import { loadStripe } from "@stripe/stripe-js";

const TravelForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    start: "",
    destination: "",
    id: "",
    photo: "",
    
  });

  const [connectedAddress, setConnectedAddress] = useState("");

  const connectMetamask = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({method:"eth_requestAccounts"});
        const account = accounts[0];
        setConnectedAddress(account);
      } catch (error) {
        console.error("Error connecting to Metamask:", error);
      }
    }
  };

  const handleTravelInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleTravelerSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      const response = await fetch("http://localhost:5000/travel", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Form submission successful");
        alert("Form submitted successfully");
      } else {
        console.error("Form submission error:", response.statusText);
      }
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleTravelerSubmit} className="vertical-form">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleTravelInputChange}
          placeholder="Name"
        />

        <label htmlFor="phone">Phone</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleTravelInputChange}
          placeholder="Phone"
        />

        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          value={formData.email}
          onChange={handleTravelInputChange}
          placeholder="Email"
        />

        <label htmlFor="start">Start</label>
        <input
          type="text"
          name="start"
          value={formData.start}
          onChange={handleTravelInputChange}
          placeholder="Start"
        />

        <label htmlFor="destination">Destination</label>
        <input
          type="text"
          name="destination"
          value={formData.destination}
          onChange={handleTravelInputChange}
          placeholder="Destination"
        />

        <label htmlFor="id">ID</label>
        <input
          type="file"
          name="id"
          value={formData.id}
          onChange={handleTravelInputChange}
          placeholder="ID"
        />

        <label htmlFor="photo">Selfie</label>
        <input
          type="file"
          name="photo"
          value={formData.photo}
          onChange={handleTravelInputChange}
          placeholder="Photo"
        />

       
        <button type="submit">Submit</button>
      </form>
      <button onClick={connectMetamask}>Connect Metamask</button>
      <p>{connectedAddress}</p>
    </div>
  );
};

const UserForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    pLocation: "",
    id: "",
    photo: "",
  });

  const [connectedAddress, setConnectedAddress] = useState("");

  const connectMetamask = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const useracc = accounts[0];
        setConnectedAddress(useracc);
      } catch (error) {
        console.error("Error connecting to Metamask:", error);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const checkOut = async () => {
    try {
      // Implement Stripe payment logic here
    } catch (error) {
      console.error("Stripe payment error:", error);
    }
  };

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()} className="vertical-form">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Name"
        />

        <label htmlFor="location">Location</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleInputChange}
          placeholder="Location"
        />

        <label htmlFor="pLocation">Package Location</label>
        <input
          type="text"
          name="pLocation"
          value={formData.pLocation}
          onChange={handleInputChange}
          placeholder="Package Location"
        />

        <label htmlFor="id">ID</label>
        <input
          type="file"
          name="id"
          value={formData.id}
          onChange={handleInputChange}
          placeholder="ID"
        />

        <label htmlFor="photo">Selfie</label>
        <input
          type="file"
          name="photo"
          value={formData.photo}
          onChange={handleInputChange}
          placeholder="Photo"
        />

        <button className="btn btn-success" onClick={checkOut}>
          Pay
        </button>

        <label htmlFor="payment">Payment</label>
        <button onClick={connectMetamask}>Connect Metamask</button>
        <p>{connectedAddress}</p>
      </form>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <UserForm />
      <TravelForm />
    </div>
  );
}

export default App;
