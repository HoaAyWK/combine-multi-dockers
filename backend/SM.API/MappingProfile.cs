using AutoMapper;
using SM.API.DTOs.Course;
using SM.API.DTOs.Enrollment;
using SM.API.DTOs.Grade;
using SM.API.DTOs.Instructor;
using SM.API.DTOs.Semester;
using SM.API.DTOs.Student;
using SM.API.DTOs.Subject;
using SM.Core.Entities;

namespace SM.API;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<Subject, SubjectDto>();
        CreateMap<Subject, CreateSubjectResponse>();
        CreateMap<Subject, UpdateSubjectResponse>();

        CreateMap<Student, StudentDto>();
        CreateMap<Student, CreateStudentResponse>();
        CreateMap<Student, UpdateStudentResponse>();

        CreateMap<Instructor, InstructorDto>();
        CreateMap<Instructor, CreateInstructorResponse>();
        CreateMap<Instructor, UpdateInstructorResponse>();

        CreateMap<Semester, SemesterDto>();
        CreateMap<Semester, CreateSemesterResponse>();
        CreateMap<Semester, UpdateSemesterResponse>();

        CreateMap<Course, CourseDto>();
        CreateMap<Course, CreateCourseResponse>();
        CreateMap<Course, UpdateCourseResponse>();

        CreateMap<Enrollment, EnrollmentDto>();
        CreateMap<Enrollment, CreateEnrollmentResponse>();

        CreateMap<Grade, GradeDto>();
        CreateMap<Grade, CreateGradeResponse>();

        CreateMap<CreateCourseRequest, Course>();
        CreateMap<CreateSemesterRequest, Semester>();
        CreateMap<CreateInstructorRequest, Instructor>();
        CreateMap<CreateStudentRequest, Student>();
        CreateMap<CreateSubjectRequest, Subject>();
        CreateMap<CreateEnrollmentRequest, Enrollment>();
        CreateMap<CreateGradeRequest, Grade>();
    }
}