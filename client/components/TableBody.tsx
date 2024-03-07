import { useRouter } from "next/navigation";
import React, { use, useState } from "react";
import { LiaEditSolid } from "react-icons/lia";
import { RiDeleteBin5Line } from "react-icons/ri";
import UpdateForm from "./UpdateForm";

interface Props {
  data: {
    id: string;
    name: string;
    phone: string;
    email: string;
    hobbies: string;
  };
  onCheckboxChange: (id: string, checked: boolean) => void;
}

const TableBody = ({ data, onCheckboxChange }: Props) => {
  const [showForm, setShowForm] = useState(false);
  const Router = useRouter();
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    onCheckboxChange(data.id, checked);
  };
  const handleDelete = () => {
    const Id = data.id;

    const deleteData = async (Id: any) => {
      try {
        const response: Response = await fetch(
          "http://localhost:3001/deleteuser",
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: Id }),
          }
        );
        const data = await response.json();
        window.location.href = "/";
        console.log("delete status", data);
      } catch (error) {
        console.log(error);
        throw error;
      }
    };
    deleteData(Id);
  };
  const handleUpdate = () => {
    setShowForm(!showForm);
  };
  return (
    <tbody>
      {showForm && <UpdateForm data={data} />}
      <tr className="border-b transition-colors hover:bg-slate-100 ">
        <td className="p-4 align-middle ">
          <input
            type="checkbox"
            id={data.name}
            name={data.name}
            value={data.id}
            onChange={handleCheckboxChange}
          />
        </td>
        <td className="p-4 align-middle">{data.id}</td>
        <td className="p-4 align-middle">{data.name}</td>
        <td className="p-4 align-middle ">{data.phone}</td>
        <td className="p-4 align-middle ">{data.email}</td>
        <td className="p-4 align-middle ">{data.hobbies}</td>
        <td className="p-4 align-middle">
          <div className="flex justify-start gap-4 space-x-2">
            <LiaEditSolid
              className="text-blue-400 text-[30px]"
              onClick={() => handleUpdate()}
            />
            <RiDeleteBin5Line
              className="text-red-500 text-[30px]"
              onClick={() => handleDelete()}
            />
          </div>
        </td>
      </tr>
    </tbody>
  );
};

export default TableBody;
