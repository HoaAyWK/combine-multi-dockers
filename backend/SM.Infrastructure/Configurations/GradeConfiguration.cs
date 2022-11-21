using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SM.Core.Entities;

namespace SM.Infrastructure.Configurations;

public class GradeConfiguration : IEntityTypeConfiguration<Grade>
{
    public void Configure(EntityTypeBuilder<Grade> builder)
    {
        builder.Property(g => g.Id)
            .IsRequired();

        builder.HasOne(g => g.Student)
            .WithMany(s => s.Grades)
            .HasForeignKey(g => g.StudentId);

        builder.HasOne(g => g.Course)
            .WithMany(c => c.Grades)
            .HasForeignKey(g => g.CourseId);

        builder.Property(g => g.Score)
            .IsRequired();
    }
}