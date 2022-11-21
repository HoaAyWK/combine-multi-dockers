using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SM.Core.Entities;

namespace SM.Infrastructure.Configurations;

public class SubjectConfiguration : IEntityTypeConfiguration<Subject>
{
    public void Configure(EntityTypeBuilder<Subject> builder)
    {
        builder.Property(s => s.Id)
            .IsRequired();

        builder.Property(s => s.Name)
            .IsRequired()
            .HasMaxLength(30);

        builder.Property(s => s.NumOfCredits)
            .IsRequired();
    }
}