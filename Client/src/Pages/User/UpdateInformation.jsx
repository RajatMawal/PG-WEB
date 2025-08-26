import React, { useState } from "react";

const UpdateInformation = () => {
  const [formData, setFormData] = useState({
    name: "Rajat Mawal",
    email: "rajat333mawal@gmail.com",
    phone: "9667735903",
    gender: "Male",
    dob: "1999-07-20",
    address: "Pitampura, Delhi, India",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Replace with your API call here
    console.log("Updated Info:", formData);
    alert("Information updated successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10 mt-10">
      <div className="bg-white shadow-xl rounded-xl w-full max-w-2xl p-8">
        <h2 className="text-2xl font-bold text-center text-[#03A6A1] mb-6">
          ✏️ Update Your Information
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Input label="Name" name="name" value={formData.name} onChange={handleChange} />
          <Input label="Email" name="email" type="email" value={formData.email} onChange={handleChange} />
          <Input label="Phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} />
          <Select label="Gender" name="gender" value={formData.gender} onChange={handleChange} />
          <Input label="Date of Birth" name="dob" type="date" value={formData.dob} onChange={handleChange} />
          <Input label="Address" name="address" value={formData.address} onChange={handleChange} fullWidth />

          <div className="sm:col-span-2 text-center mt-4">
            <button
              type="submit"
              className="bg-[#03A6A1] hover:bg-teal-700 text-white px-6 py-2 rounded-full font-semibold transition duration-300"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Input = ({ label, name, type = "text", value, onChange, fullWidth }) => (
  <div className={fullWidth ? "sm:col-span-2" : ""}>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#03A6A1]"
      required
    />
  </div>
);

const Select = ({ label, name, value, onChange }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#03A6A1]"
      required
    >
      <option value="">Select</option>
      <option value="Male">Male</option>
      <option value="Female">Female</option>
      <option value="Other">Other</option>
    </select>
  </div>
);

export default UpdateInformation;
