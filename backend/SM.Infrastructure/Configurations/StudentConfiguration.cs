using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SM.Core.Entities;

namespace SM.Infrastructure.Configurations;

public class StudentConfiguration : IEntityTypeConfiguration<Student>
{
    public void Configure(EntityTypeBuilder<Student> builder)
    {
        builder.Property(s => s.Id)
            .IsRequired();

        builder.Property(s => s.FirstName)
            .IsRequired()
            .HasMaxLength(30);

        builder.Property(s => s.LastName)
            .IsRequired()
            .HasMaxLength(30);

        builder.Property(s => s.Email)
            .IsRequired()
            .HasMaxLength(50);

        builder.Property(s => s.Gender)
            .IsRequired()
            .HasMaxLength(6);

        builder.Property(s => s.DateOfBirth)
            .IsRequired();
    }
}