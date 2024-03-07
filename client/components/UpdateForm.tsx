import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { validationSchema } from "@/lib/validation";

const arr = ["name", "phone", "email", "hobbies"];

interface Props {
  data: {
    id: string;
    name: string;
    phone: string;
    email: string;
    hobbies: string;
  };
}

const UpdateForm = ({ data }: Props) => {
  const [formData, setFormData] = useState({
    id: data.id,
    name: data.name,
    phone: data.phone,
    email: data.email,
    hobbies: data.hobbies,
  });
  const router = useRouter();
  const [errors, setValidationErrors] = useState({});

  const handleErrorMessages = (validationErrors: any) => {
    const errorMessages: Record<string, string> = {};
    if (validationErrors && Array.isArray(validationErrors)) {
      validationErrors.forEach((error: any) => {
        const fieldName = error.path[0];
        const errorMessage = error.message || "Validation error";
        errorMessages[fieldName] = errorMessage;
      });
    }
    return errorMessages;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/updateuser", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log(data);
      window.location.href = "/";
    } catch (error: any) {
      const validationErrors = error.errors;
      console.log(validationErrors);
      const errorMessages = handleErrorMessages(validationErrors);
      setValidationErrors(errorMessages);
      alert(
        Object.entries(errorMessages)
          .map(([field, message]) => `${field}: ${message}`)
          .join("\n")
      );
    }
  };

  const handleCancel = () => {
    window.location.href = "/";
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
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
                value={formData[e as keyof typeof data]}
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                onChange={handleInputChange}
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

export default UpdateForm;
