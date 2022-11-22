import React from "react";
import Table from "../../components/table/Table";
import ActionDelete from "../../components/action/ActionDelete";
import ActionEdit from "../../components/action/ActionEdit";
import { format } from "date-fns";
const StudentTable = ({ data }) => {
  const renderStudentItem = (student) => {
    return (
      <tr key={student.id}>
        <td>
          {student.firstName} {student.lastName}
        </td>
        <td>{student.email}</td>
        <td>{student.gender}</td>
        <td>{format(new Date(student.dateOfBirth), "dd/MM/yyyy")}</td>
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
          <th>Gender</th>
          <th>Date Of Birth</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.length > 0 && data.map((student) => renderStudentItem(student))}
      </tbody>
    </Table>
  );
};

export default StudentTable;
