import React from "react";
import Table from "../../components/table/Table";
import ActionDelete from "../../components/action/ActionDelete";
import ActionEdit from "../../components/action/ActionEdit";

const EnrollmentTable = ({ data }) => {
  const renderEnrollmentItem = (enrollment) => {
    return (
      <tr key={enrollment.id}>
        <td>
          {enrollment.student.firstName} {enrollment.student.lastName}
        </td>
        <td>{enrollment.course.subject.name}</td>
        <td>{`${enrollment.course.instructor.firstName} ${enrollment.course.instructor.lastName}`}</td>
        <td> {enrollment.course.semester.name}</td>
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
          <th>Student</th>
          <th>Subject</th>
          <th>Instructor</th>
          <th>Semester</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.length > 0 &&
          data.map((enrollment) => renderEnrollmentItem(enrollment))}
      </tbody>
    </Table>
  );
};

export default EnrollmentTable;
