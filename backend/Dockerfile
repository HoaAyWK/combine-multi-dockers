FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 433

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src

# copy all the layers' csproj files into respective folders
COPY ./SM.Infrastructure/SM.Infrastructure.csproj ./SM.Infrastructure/
COPY /SM.Core/SM.Core.csproj ./SM.Core/
COPY ./SM.API/SM.API.csproj ./SM.API/

# run restore over API project - this pulls restore over the dependent projects as well
RUN dotnet restore ./SM.API/SM.API.csproj

# Copy everything else
COPY . .

# run build over the API project
WORKDIR /src/SM.API
RUN dotnet build -c Release -o /app/build

# run publish over the API project
FROM build as publish
RUN dotnet publish -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT [ "dotnet", "SM.API.dll" ]
