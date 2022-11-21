using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SM.Core.Entities;

namespace SM.Infrastructure.Configurations;

public class EnrollmentConfiguration : IEntityTypeConfiguration<Enrollment>
{
    public void Configure(EntityTypeBuilder<Enrollment> builder)
    {
        builder.Property(e => e.Id)
            .IsRequired();

        builder.HasOne(e => e.Course)
            .WithMany(c => c.Enrollments)
            .HasForeignKey(e => e.CourseId);

        builder.HasOne(e => e.Student)
            .WithMany(s => s.Enrollments)
            .HasForeignKey(pc => pc.StudentId);
    }
}