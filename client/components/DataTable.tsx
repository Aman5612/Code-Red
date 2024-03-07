import React, { useEffect, useState } from "react";
import TableBody from "./TableBody";

const arr = [
  "Select",
  "ID",
  "Name",
  "Phone Number",
  "Email",
  "Hobbies",
  "Update/Delete",
];

interface Props {
  clicked: boolean;
  data: (e: string[]) => void;
  btnStatus: (e: boolean) => void;
}

const DataTable = ({ clicked, data, btnStatus }: Props) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const [tableData, setTableData] = useState([]);

  // console.log(tableData);

  const handleCheckboxChange = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedIds([...selectedIds, id]);
      btnStatus(true);
    } else {
      setSelectedIds(selectedIds.filter((item) => item !== id));
      if (selectedIds.length === 1) {
        btnStatus(false);
      }
    }
  };

  useEffect(() => {
    if (clicked) {
      data(selectedIds);
    }
  }, [clicked, selectedIds, data]);

  useEffect(() => {
    const fecthData = async () => {
      try {
        const usersData = await fetch("http://localhost:3001/getusers", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await usersData.json();
        const newData = data.map((item: any) => {
          return {
            id: item._id,
            name: item.name,
            phone: item.phone,
            email: item.email,
            hobbies: item.hobbies,
          };
        });
        console.log(newData);
        setTableData(newData);
      } catch (error) {
        console.log(error);
        throw error;
      }
    };
    fecthData();
  }, []);

  return (
    <div className=" w-full max-sm:hidden">
      <table className="w-full caption-bottom text-sm">
        <thead>
          <tr className="border-b transition-colors hover:bg-gray-100  ">
            {arr.map((item) => {
              return (
                <th
                  key={item}
                  className="h-12 px-4 text-left  font-bold text-black "
                >
                  {item}
                </th>
              );
            })}
          </tr>
        </thead>

        {tableData.map(
          (item: {
            id: string;
            name: string;
            phone: string;
            email: string;
            hobbies: string;
          }) => {
            return (
              <TableBody
                key={item.id}
                data={item}
                onCheckboxChange={handleCheckboxChange}
              />
            );
          }
        )}
      </table>
    </div>
  );
};

export default DataTable;
