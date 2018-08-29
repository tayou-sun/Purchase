#Depending on the operating system of the host machines(s) that will build or run the containers, the image specified in the FROM statement may need to be changed.
#For more information, please see https://aka.ms/containercompat

FROM microsoft/dotnet:2.1-aspnetcore-runtime-nanoserver-1803 AS base
WORKDIR /app
EXPOSE 61406
EXPOSE 44398

FROM microsoft/dotnet:2.1-sdk-nanoserver-1803 AS build
WORKDIR /src
COPY ["../Purchase.Web/Purchase.Web.csproj", "../Purchase.Web/"]
RUN dotnet restore "../Purchase.Web/Purchase.Web.csproj"
COPY . .
WORKDIR "/src/../Purchase.Web"
RUN dotnet build "Purchase.Web.csproj" -c Release -o /app

FROM build AS publish
RUN dotnet publish "Purchase.Web.csproj" -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "Purchase.Web.dll"]