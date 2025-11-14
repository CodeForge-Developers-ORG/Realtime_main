"use client";

import axios from "axios";
import { useEffect, useState } from "react";

function FormModalPopUp({headerData}: any) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setOpen(true), 10000);
    return () => clearTimeout(timer);
  }, []);

  const [formData, setFormData] = useState({
    phone: "",
    email: "",
    activity: "",
    activity_url: "",
    country: "",
    zipcode: "",
    state: "",
    area: ""
  });


  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const res = await axios.post("https://markvisitor.com/app/dev/website/saveactivity.php" , formData);
      console.log("Submitted:", res.data);
      alert("Submitted Successfully!");
      setOpen(false);
    } catch (error) {
      console.error(error);
      alert("Error submitting form!");
    }
  };

  if (!open || !headerData?.status?.custom_activity_tracker) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white text-black/80 rounded-xl w-full max-w-lg p-6 shadow-lg relative">

        <div>
          <h2 className="text-xl font-semibold mb-4">
            User Activity Form
          </h2>

          <button
            className="absolute top-2 right-2 text-black hover:text-black"
            onClick={() => setOpen(false)}
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-2 grid grid-cols-2 gap-2 text-black/80">

          <div>
            <label className="font-medium">Phone</label>
            <input
              type="text"
              name="phone"
              placeholder="Enter phone number"
              value={formData.phone}
              onChange={handleChange}
              className="border border-black/55 p-2 rounded-md w-full"
            />
          </div>

          <div>
            <label className="font-medium">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              className="border border-black/55 p-2 rounded-md w-full"
            />
          </div>

          <div>
            <label className="font-medium">Activity</label>
            <input
              type="text"
              name="activity"
              placeholder="Enter activity"
              value={formData.activity}
              onChange={handleChange}
              className="border border-black/55 p-2 rounded-md w-full"
            />
          </div>

          <div>
            <label className="font-medium">Activity URL</label>
            <input
              type="text"
              name="activity_url"
              placeholder="Enter activity URL"
              value={formData.activity_url}
              onChange={handleChange}
              className="border border-black/55 p-2 rounded-md w-full"
            />
          </div>

          <div>
            <label className="font-medium">Country</label>
            <input
              type="text"
              name="country"
              placeholder="Enter country"
              value={formData.country}
              onChange={handleChange}
              className="border border-black/55 p-2 rounded-md w-full"
            />
          </div>

          <div>
            <label className="font-medium">Zipcode</label>
            <input
              type="number"
              name="zipcode"
              placeholder="Enter zipcode"
              value={formData.zipcode}
              onChange={handleChange}
              className="border border-black/55 p-2 rounded-md w-full"
            />
          </div>

          <div>
            <label className="font-medium">State</label>
            <input
              type="text"
              name="state"
              placeholder="Enter state"
              value={formData.state}
              onChange={handleChange}
              className="border border-black/55 p-2 rounded-md w-full"
            />
          </div>

          <div>
            <label className="font-medium">Area</label>
            <input
              type="text"
              name="area"
              placeholder="Enter area"
              value={formData.area}
              onChange={handleChange}
              className="border border-black/55 p-2 rounded-md w-full"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-600 text-white py-2 rounded-md mt-4 hover:bg-orange-700 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default FormModalPopUp;
