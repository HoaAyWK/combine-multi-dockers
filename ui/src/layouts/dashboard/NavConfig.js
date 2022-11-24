import Iconify from "../../components/Iconify";

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: "student",
    path: "/dashboard/students",
    icon: getIcon("mdi:account-student"),
  },
  {
    title: "instructor",
    path: "/dashboard/instructors",
    icon: getIcon("ph:chalkboard-teacher-bold"),
  },
  {
    title: "course",
    path: "/dashboard/courses",
    icon: getIcon("fluent-mdl2:publish-course"),
  },
  {
    title: "subject",
    path: "/dashboard/subjects",
    icon: getIcon("material-symbols:subject-rounded"),
  },
  {
    title: "enrollment",
    path: "/dashboard/enrollments",
    icon: getIcon("fluent-mdl2:open-enrollment"),
  },
  {
    title: "grade",
    path: "/dashboard/grades",
    icon: getIcon("material-symbols:assignment-turned-in-outline"),
  },

  {
    title: "semester",
    path: "/dashboard/semesters",
    icon: getIcon("material-symbols:school-outline"),
  },
];

export default navConfig;
