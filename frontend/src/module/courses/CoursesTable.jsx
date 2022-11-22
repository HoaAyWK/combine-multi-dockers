import React from "react";
import Table from "../../components/table/Table";
import ActionEdit from "../../components/action/ActionEdit";
import ActionDelete from "../../components/action/ActionDelete";
const CoursesTable = ({ data }) => {
  const renderCoursesItem = (courses) => {
    return (
      <tr key={courses.id}>
        <td>{courses.subject.name}</td>
        <td>
          {courses.instructor.firstName} {courses.instructor.lastName}
        </td>
        <td>{courses.semester.name}</td>
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
          <th>Subject</th>
          <th>Instructor</th>
          <th>Semester</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.length > 0 && data.map((courses) => renderCoursesItem(courses))}
      </tbody>
    </Table>
  );
};

export default CoursesTable;
