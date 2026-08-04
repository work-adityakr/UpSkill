# UpSkill Edtech Project

UpSkill - EdTech Platform 
UpSkill is a fully containerized, full-stack educational technology platform built with the MERN stack. It empowers students to learn through interactive courses and allows instructors to create, manage, and sell their educational content.

This repository contains the application source code alongside a complete, production-grade DevOps ecosystem, including automated Jenkins CI/CD, Kubernetes orchestration, and Prometheus/Grafana monitoring.

🏗 Architecture & Tech Stack
Application Stack:

Frontend: React.js

Backend: Node.js, Express.js

Database: MongoDB

Containerization: Docker

DevOps & Infrastructure:

Orchestration: Kubernetes (Local multi-node cluster via kind)

CI/CD: Jenkins (Automated build, push, and zero-downtime rolling updates)

Container Registry: Docker Hub

Monitoring & Observability: Prometheus & Grafana (kube-prometheus-stack)

Features
EdTech Capabilities: Complete instructor and student flows for course creation and consumption.

Zero-Downtime Deployments: Fully automated Jenkins pipeline that seamlessly replaces pods during updates without dropping user connections.

Auto-Scaling: Configured with Kubernetes Horizontal Pod Autoscaler (HPA) to dynamically adjust resources based on CPU and memory loads.

Secure Secrets Management: Database credentials and environment variables are securely injected into Kubernetes directly from Jenkins memory, eliminating hard-coded secrets.

Real-time Observability: Integrated Helm charts for Prometheus and Grafana, providing deep, real-time insights into pod compute resources and cluster health across all namespaces.

Repository Structure
Plaintext
├── server/                 # Node.js backend source code and backend Dockerfile
├── src/                    # React.js frontend source code
├── k8s/                    # Kubernetes deployment manifests
│   ├── 01-namespace.yaml
│   ├── 04-configmap.yaml
│   ├── 08-backend-deployment.yaml
│   ├── 09-backend-service.yaml
│   ├── 10-frontend-deployment.yaml
│   ├── 11-frontend-service.yaml
│   └── 13-hpa.yaml
├── Dockerfile              # Frontend Dockerfile
└── Jenkinsfile             # Declarative Jenkins CI/CD pipeline
Getting Started (Local Development)
Prerequisites
Docker & kind (Kubernetes in Docker)

kubectl & helm

A running Jenkins server connected to your GitHub webhook

1. Start the Local Cluster
Wake up the multi-node kind cluster (1 control-plane, 2 workers):

Bash
docker start upskill-cluster-control-plane upskill-cluster-worker upskill-cluster-worker2
Verify the nodes are ready:

Bash
kubectl get nodes
2. Deployment Workflow
This project utilizes a fully automated CI/CD pipeline. To deploy changes:

Make changes to the frontend or backend code.

Commit and push to the main branch.

Jenkins will automatically trigger, build the images, push them to Docker Hub, and execute a kubectl rollout restart to update the Kubernetes cluster.

3. Access the Application
The React frontend is exposed via a NodePort. Access the application in your browser at:

Plaintext
http://localhost:30000
(Alternatively, you can port-forward directly into the container: kubectl port-forward svc/upskill-frontend-service 3000:3000 -n upskill-namespace)

Monitoring Setup
To view live metrics of the application, start the monitoring port-forward:

Bash
kubectl port-forward svc/prometheus-stack-grafana 8081:80 -n monitoring
Access Grafana: http://localhost:8081

Default Username: admin

Get Password:

Bash
kubectl get secret prometheus-stack-grafana -n monitoring -o jsonpath="{.data.admin-password}" | base64 --decode ; echo
👨 Author
Aditya Kumar

Full Stack Developer (MERN)

GitHub: work-adityakr