# Viết ứng dụng kết hợp nhiều docker với nhau

## Viết một chương trình quản lý sinh viên đơn giản gồm:

- 1 docker chạy web UI sử dụng ReactJS
- 1 docker chạy business sử dụng ASP.NET Core
- 1 docker chạy database sử dụng MSSQL Server

## Thành viên nhóm

- Trần Mạnh Cường - 19110159
- Vy Minh Khánh Hoa - 19110205
- Phan Tân Tỵ - 19110311

## Các dịch vụ sử dụng

- VPC
- EC2
- S3

## Các bước cài đặt
### Bước 1: Tạo VPC và Security Group

![Preview VPC](/assets/preview-vpc.png)

![VPC created](/assets//vpc-created.png)

![Database Security Group](/assets//DatabaseSG.png)

![Backend Security Group](/assets//beSG.png)

![UI Security Group](/assets//uiSG.png)

### Bước 2: Tạo S3 bucket
#### Tạo S3 bucket với các cấu hình sau

![Enable ACLs](/assets//config-bucket-01.png)

![Turn off block](/assets//config-bucket-02.png)

### Bước 2: Tạo 3 EC2 instance

| Instance | AMI| Port open | Subnet | Security Group |
|--|--|--|--|--|
| Database| Ubuntu |  1433 | public-subnet-1 | DatabaseSG|
| Backend | Ubuntu | 80 | public-subnet-1 | BackendSG|
| UI | Ubuntu | 80 | public-subnet-1 | UISG |

#### Kết nối đến các EC2 instance vừa tạo, trên mỗi instance thực hiện chạy các lệnh sau:

##### Cài docker

    sudo apt-get update && sudo apt-get upgrade
    sudo apt-get upgrade
    sudo apt-get install docker.io
    sudo apt-get install acl
    sudo setfacl -m u:ubuntu:rw /var/run/docker.sock

### Bước 3: Chạy MSSQL Server trên instance DatabaseServer

    docker run -e 'ACCEPT_EULA=Y' -e 'MSSQL_SA_PASSWORD=<YourStrong!Passw0rd>' -p 1433:1433 -d mcr.microsoft.com/mssql/server:2019-latest

### Bước 4: Chạy backend trên instance BackendServer
    docker run -e 'AWSConfig__AWSAccessKey=<your access key>' -e 'AWSConfig__AWSSecretKey=<your secret key>' -e 'AWSConfig__BucketName=<your s3 bucket name>' -e 'ClientOrigin=<Public IPv4 DNS of UIServer instance>' -e 'ConnectionStrings__StudentManagementConnection=Server=<Public IPv4 DNS of DatabaseServer instance>, 1433; Database=Cloud.SM; User=SA; Password=<your db password>;' -e 'ConnectionStrings__IdentityConnection=Server=<Public IPv4 DNS of DatabaseServer instance>, 1433; Database=Cloud.Identity; User=SA; Password=<your db password>;' -p 80:80 -d nsioay/sm_be:latest

### Bước 5: Chạy frontend trên instance UIServer
    docker run -e 'API_URL=http://<Pulbic IPv4 DNS of BackendServer>/api/v1' -e 'S3_BASE_URL=https://<your bucket name>.s3.<S3 bucket region>.amazons.com/' -p 80:80 -d nsioay/sm_fe:latest

### Truy cập vào ứng dụng

#### Mở Public IPv4 DNS của UIServer tại port 80 (http) và thực hiện đăng nhập với email `admin@gmail.com` và password `Password123!`

![Access web](/assets//access-app.png)
