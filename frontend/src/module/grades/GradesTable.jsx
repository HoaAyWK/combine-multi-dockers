import React from "react";
import Table from "../../components/table/Table";
import ActionDelete from "../../components/action/ActionDelete";
import ActionEdit from "../../components/action/ActionEdit";
const GradesTable = ({ data }) => {
  const renderGradesItem = (grades) => {
    return (
      <tr key={grades.id}>
        <td>{grades.id}</td>
        <td>
          {grades.course.instructor.firstName}{" "}
          {grades.course.instructor.lastName}
        </td>
        <td>
          {grades.student.firstName} {grades.student.lastName}
        </td>
        <td> {grades.course.semester.name} </td>
        <td> {grades.course.subject.name} </td>
        <td> {grades.course.subject.numOfCredits} </td>
        <td> {grades.grade} </td>
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
          <th>Instructor</th>
          <th>Student</th>
          <th>Semester</th>
          <th>Subject</th>
          <th>Credits</th>
          <th>Grade</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.length > 0 && data.map((grade) => renderGradesItem(grade))}
      </tbody>
    </Table>
  );
};

export default GradesTable;
