import React from "react";
import Table from "../../components/table/Table";
import ActionDelete from "../../components/action/ActionDelete";
import ActionEdit from "../../components/action/ActionEdit";
const SubjectTable = ({ data }) => {
  const renderSubjectItem = (subject) => {
    return (
      <tr key={subject.id}>
        <td>{subject.name}</td>
        <td>{subject.numOfCredits}</td>
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
          <th>Name</th>
          <th>Credits</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.length > 0 && data.map((subject) => renderSubjectItem(subject))}
      </tbody>
    </Table>
  );
};

export default SubjectTable;
