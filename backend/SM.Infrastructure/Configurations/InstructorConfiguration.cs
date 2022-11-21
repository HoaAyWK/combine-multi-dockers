using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SM.Core.Entities;

namespace SM.Infrastructure.Configurations;

public class InstructorConfiguration : IEntityTypeConfiguration<Instructor>
{
    public void Configure(EntityTypeBuilder<Instructor> builder)
    {
        builder.Property(i => i.Id)
            .IsRequired();

        builder.Property(i => i.FirstName)
            .IsRequired()
            .HasMaxLength(30);

        builder.Property(i => i.LastName)
            .IsRequired()
            .HasMaxLength(30);

        builder.Property(i => i.Email)
            .IsRequired()
            .HasMaxLength(50);

        builder.Property(i => i.Phone)
            .IsRequired()
            .HasMaxLength(20);
        
        builder.Property(i => i.DateJoin)
            .IsRequired();

        builder.Property(i => i.DateOfBirth)
            .IsRequired();

        builder.Property(i => i.Status)
            .IsRequired();
    }
}