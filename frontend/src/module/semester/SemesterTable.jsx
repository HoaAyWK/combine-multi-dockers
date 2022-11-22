import React from "react";
import Table from "../../components/table/Table";
import ActionDelete from "../../components/action/ActionDelete";
import ActionEdit from "../../components/action/ActionEdit";
const SemesterTable = ({ data }) => {
  const renderSemesterItem = (semester) => {
    return (
      <tr key={semester.id}>
        <td>{semester.id}</td>
        <td>{semester.name}</td>
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
          <th>Id</th>
          <th>Name</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.length > 0 &&
          data.map((semester) => renderSemesterItem(semester))}
      </tbody>
    </Table>
  );
};

export default SemesterTable;
