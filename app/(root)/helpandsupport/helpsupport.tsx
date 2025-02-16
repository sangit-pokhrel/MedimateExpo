import React from "react";
import { useForm } from "react-hook-form";
import { db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";

const Helpsupport = () => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data: any) => {
    try {
      await addDoc(collection(db, "helpSupport"), data);
      alert("Support request submitted successfully!");
      reset();
    } catch (error) {
      console.error("Error submitting support request:", error);
      alert("Error submitting request. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-50">
      <div className="bg-white shadow-md rounded-lg p-6 w-96">
        <h2 className="text-2xl font-bold text-blue-600 text-center mb-4">
          Help & Support
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-blue-700 font-semibold">
              Username
            </label>
            <input
              type="text"
              {...register("username", { required: true })}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label className="block text-blue-700 font-semibold">
              Phone Number
            </label>
            <input
              type="tel"
              {...register("phone", { required: true })}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your phone number"
            />
          </div>
          <div>
            <label className="block text-blue-700 font-semibold">
              Support Message
            </label>
            <textarea
              {...register("message", { required: true })}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
              placeholder="Describe your issue..."
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Helpsupport;
