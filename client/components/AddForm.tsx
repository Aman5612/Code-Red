import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { validationSchema } from "@/lib/validation";

const arr = ["Name", "Phone number", "Email", "Hobbies"];

interface ValidationError {
  path: string[];
  message: string;
}

const AddForm = () => {
  const path = usePathname();
  const router = useRouter();
  const [errors, setValidationErrors] = useState({});
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fecthData = async (e: React.FormEvent<HTMLFormElement>) => {
      try {
        const formData = validationSchema.parse({
          name: e.currentTarget["Name"].value,
          email: e.currentTarget["Email"].value,
          phone: e.currentTarget["Phone number"].value,
          hobbies: e.currentTarget["Hobbies"].value,
        });
        const response = await fetch("http://localhost:3001/adduser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            hobbies: formData.hobbies,
          }),
        });
        const data = await response.json();
        console.log(data);
        window.location.href = "/";
        if (data) {
        }
      } catch (error: any) {
        const validationErrors = error.errors;
        console.log(validationErrors);
        const errorMessages = {
          name: validationErrors.find((error: any) => error.path[0] === "name"),
          email: validationErrors.find(
            (error: any) => error.path[0] === "email"
          ),
          phone: validationErrors.find(
            (error: any) => error.path[0] === "phone"
          ),
          hobbies: validationErrors.find(
            (error: any) => error.path[0] === "hobbies"
          ),
        };
        setValidationErrors(errorMessages);
        alert(
          "Name: " +
            errorMessages.name?.message +
            "\n" +
            "Email: " +
            errorMessages.email?.message +
            "\n" +
            "Phone: " +
            errorMessages.phone?.message +
            "\n" +
            "Hobbies: " +
            errorMessages.hobbies?.message
        );
      }
    };

    fecthData(e);
  };

  const handleCancel = () => {
    window.location.href = "/";
  };
  return (
    <div className="absolute inset-0 flex items-center justify-center z-10 backdrop-blur-sm">
      <div className="w-80 md:w-96 p-6 bg-white rounded-md shadow-lg border-2">
        <form onSubmit={handleSubmit}>
          {arr.map((e) => (
            <div key={e} className="flex flex-col mb-4">
              <label htmlFor={e} className="mb-1">
                {e}
              </label>
              <input
                type="text"
                id={e}
                name={e}
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
          ))}
          <button
            type="submit"
            className="w-full p-2 bg-black text-white rounded-md hover:bg-gray-600"
          >
            Submit
          </button>
          <div
            className="w-full p-2 bg-white text-black border border-black rounded-md mt-4 text-center"
            onClick={handleCancel}
          >
            Cancel
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddForm;
