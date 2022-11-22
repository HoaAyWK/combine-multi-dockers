import React from "react";
import Table from "../../components/table/Table";
import ActionEdit from "../../components/action/ActionEdit";
import ActionDelete from "../../components/action/ActionDelete";
import { format } from "date-fns";
const InstructorTable = ({ data }) => {
  const renderInstructorItem = (instructor) => {
    return (
      <tr key={instructor.id}>
        <td>
          {instructor.firstName} {instructor.lastName}
        </td>
        <td> {instructor.email}</td>
        <td>{instructor.phone}</td>
        <td>{format(new Date(instructor.dateOfBirth), "dd/MM/yyyy")}</td>
        <td>{format(new Date(instructor.dateJoin), "dd/MM/yyyy")}</td>
        <td>{instructor.status}</td>

        <td>
          <div className="flex gap-5 text-gray-400">
            <ActionEdit
              onClick={() => navigate(`/manage/update-user?id=${user.id}`)}
            ></ActionEdit>
            <ActionDelete onClick={() => handleDeleteUser(user)}></ActionDelete>
          </div>
        </td>
      </tr>
    );
  };
  return (
    <Table>
      <thead>
        <tr>
          <th>Fullname</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Date Of Birth</th>
          <th>Date Join</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.length > 0 &&
          data.map((instructor) => renderInstructorItem(instructor))}
      </tbody>
    </Table>
  );
};

export default InstructorTable;
