import React from "react";
import Table from "../../components/table/Table";
import ActionDelete from "../../components/action/ActionDelete";
import { useDispatch } from "react-redux";
import { deleteEnrollment } from "./enrollmentSlice";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const EnrollmentTable = ({ data }) => {
  const dispatch = useDispatch();
  const renderEnrollmentItem = (enrollment) => {
    const handleDelete = (enrollment) => {
      Swal.fire({
        title: "Delete ",
        text: "Are you sure you want to delete it ?",
        showCancelButton: true,
        icon: "question",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
        cancelButtonText: "No",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            console.log(enrollment.id);
            dispatch(deleteEnrollment(enrollment.id));
            toast.dismiss();
            toast.success("Delete Enrollment Success!!!");
          } catch (error) {
            console.log(error);
            console.log(error.message);
          }
        }
      });
    };
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
            <ActionDelete
              onClick={() => handleDelete(enrollment)}
            ></ActionDelete>
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
