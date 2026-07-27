# 🚀 Group 1 Capstone Project – Secure Three-Tier Azure Infrastructure

![Azure](https://img.shields.io/badge/Microsoft-Azure-0078D4?style=for-the-badge&logo=microsoftazure&logoColor=white)
![Linux](https://img.shields.io/badge/Linux-Ubuntu-FCC624?style=for-the-badge&logo=linux&logoColor=black)
![Bash](https://img.shields.io/badge/Bash-Scripting-4EAA25?style=for-the-badge&logo=gnubash&logoColor=white)
![Networking](https://img.shields.io/badge/Networking-Secure%20Architecture-blue?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

## 📖 Project Overview

This capstone project redesigns the infrastructure for **RouteWell**, a company whose web application (Frontend, Backend, and Database) was originally deployed within a single network.

Following a security incident where a company laptop nearly exposed the production database, the infrastructure was redesigned using **Microsoft Azure** and **network segmentation best practices** to create a secure, scalable, and cost-effective cloud architecture.

The solution implements a **Three-Tier Architecture** consisting of:

- 🌐 Web Tier
- ⚙️ Application Tier
- 🗄️ Database Tier

Each tier is isolated within its own subnet and protected by Azure Network Security Groups (NSGs).

---

# 🎯 Project Objectives

- Secure the infrastructure using network segmentation
- Prevent direct public access to the database
- Allow only the minimum required network traffic
- Keep Azure deployment cost-efficient
- Design for future scalability
- Automate deployment using Bash scripting
- Demonstrate troubleshooting and recovery

---

# 🏗️ Architecture

```
                   Internet
                       │
               Public IP Address
                       │
          Azure Load Balancer / Public VM
                       │
         ┌──────────────────────────┐
         │      Azure VNet          │
         │      10.10.0.0/16        │
         │                          │
         │ ┌──────────────────────┐ │
         │ │   Web Subnet         │ │
         │ │   10.10.1.0/27       │ │
         │ └─────────┬────────────┘ │
         │           │              │
         │ ┌─────────▼────────────┐ │
         │ │   App Subnet         │ │
         │ │   10.10.2.0/27       │ │
         │ └─────────┬────────────┘ │
         │           │              │
         │ ┌─────────▼────────────┐ │
         │ │   DB Subnet          │ │
         │ │   10.10.3.0/28       │ │
         │ └──────────────────────┘ │
         └──────────────────────────┘
```

---

# 🧱 Infrastructure Components

| Resource | Purpose |
|----------|---------|
| Resource Group | Groups all Azure resources |
| Virtual Network | Provides private networking |
| Web Subnet | Hosts the frontend web server |
| App Subnet | Hosts backend API server |
| Database Subnet | Hosts database server |
| Linux Virtual Machines | Simulate each application tier |
| Network Security Groups | Firewall rules |
| Public IP | Internet access to frontend |
| Bash Script | Automates entire deployment |

---

# 🌐 Network Design

## Virtual Network

```
10.10.0.0/16
```

### Subnet Allocation

| Subnet | CIDR | Purpose |
|---------|------|----------|
| Web | 10.10.1.0/27 | Frontend |
| App | 10.10.2.0/27 | Backend APIs |
| Database | 10.10.3.0/28 | Database Server |

Subnet sizes were selected based on estimated host requirements rather than using unnecessarily large address spaces.

---

# 🔒 Network Security

## NSG Rules

### Web Tier

| Source | Destination | Port | Action |
|---------|-------------|------|--------|
| Internet | Web VM | 80 | Allow |
| Internet | Web VM | 443 | Allow |
| Admin IP | Web VM | 22 | Allow |
| Any | Any | * | Deny |

### Application Tier

| Source | Destination | Port | Action |
|---------|-------------|------|--------|
| Web Subnet | App VM | 8080 | Allow |
| Admin IP | App VM | 22 | Allow |
| Any | Any | * | Deny |

### Database Tier

| Source | Destination | Port | Action |
|---------|-------------|------|--------|
| App Subnet | Database VM | 3306 | Allow |
| Admin IP | Database VM | 22 | Allow |
| Internet | Database VM | 3306 | **Deny** |

---

# 🔐 Why These Rules?

| Rule | Reason |
|------|--------|
| Internet → Web | Users must access the website |
| Web → App | Frontend communicates with backend |
| App → Database | Backend retrieves application data |
| Internet → Database | Blocked to prevent unauthorized access |

---

# 🌍 User Access

Users access the application through the public-facing Web Tier.

The Database remains completely isolated from the Internet.

This architecture satisfies the company's security requirements while remaining scalable for future growth.

---

# 🛠️ Manual Deployment

The infrastructure was first deployed manually using the Azure Portal.

Deployment order:

1. Create Resource Group
2. Create Virtual Network
3. Create Subnets
4. Deploy Linux Virtual Machines
5. Configure Network Security Groups
6. Associate NSGs with Subnets
7. Assign Public IP
8. Test Connectivity

---

# ✅ Connectivity Testing

The following connectivity tests were performed:

| Test | Expected |
|------|----------|
| Internet → Web | ✅ Success |
| Web → App | ✅ Success |
| App → Database | ✅ Success |
| Internet → Database | ❌ Blocked |

---

# 🤖 Automation

After validating the manual deployment, the entire infrastructure was automated using a single Bash script.

The deployment script creates:

- Resource Group
- Virtual Network
- Subnets
- Network Security Groups
- Security Rules
- Public IP Address
- Linux Virtual Machines
- Network Interfaces

Example:

```bash
chmod +x deploy.sh

./deploy.sh
```

---

# 🧪 Failure Simulation

To demonstrate troubleshooting skills, an intentional configuration error was introduced.

Example issue:

- Incorrect NSG rule blocked traffic from the Web Tier to the Application Tier.

### Investigation

- Azure NSG inspection
- VM connectivity tests
- Network diagnostics

### Resolution

The incorrect NSG rule was updated to allow traffic on the required port.

### Lesson Learned

Even a single firewall rule can prevent communication between application layers, highlighting the importance of validating network configurations.

---

# 📂 Repository Structure

```
.
├── bash/
│   └── deploy.sh
│
├── diagrams/
│   └── architecture.png
│
├── screenshots/
│   ├── internet-web.png
│   ├── web-app.png
│   ├── app-db.png
│   └── troubleshooting.png
│
├── documentation/
│   └── design-decisions.md
│
└── README.md
```

---

# 📸 Project Deliverables

- Azure Architecture Design
- CIDR Planning
- Network Security Design
- Azure Portal Deployment
- Connectivity Validation
- Bash Automation Script
- Troubleshooting Documentation

---

# 🛡️ Security Best Practices Applied

- Network Segmentation
- Principle of Least Privilege
- Database Isolation
- Minimal Open Ports
- Layered Security
- Infrastructure Automation
- Scalable Address Planning

---

# 🚀 Technologies Used

- Microsoft Azure
- Azure Virtual Network
- Azure Network Security Groups
- Azure Virtual Machines
- Azure Resource Groups
- Azure CLI
- Bash
- Linux (Ubuntu)

---

# 👥 Team

**Group 1 Capstone Team**

Cloud Infrastructure & Network Security Project

---

# 📚 Learning Outcomes

This project demonstrates practical knowledge of:

- Azure Networking
- Virtual Networks
- Subnetting
- CIDR Planning
- Azure NSGs
- Linux Administration
- Infrastructure as Code
- Azure CLI
- Cloud Security
- Troubleshooting Cloud Infrastructure

---

# 📄 License

This project is for educational purposes as part of a Cloud Engineering Capstone Project.

---

## ⭐ Acknowledgements

Special thanks to our tutor and teammates for their guidance throughout the planning, implementation, automation, and troubleshooting phases of this project.