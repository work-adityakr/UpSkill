# UpSkill

UpSkill is a fully containerized, full-stack educational technology platform built with the MERN stack. It empowers students to learn through interactive courses and allows instructors to create, manage, and sell their educational content.

This repository contains the application source code alongside a complete, production-grade DevOps ecosystem, featuring automated Jenkins CI/CD pipelines, Kubernetes orchestration, and robust Prometheus/Grafana monitoring.

## ✨ Key Features

* **Zero-Downtime Deployments:** Fully automated Jenkins pipeline that seamlessly replaces Kubernetes pods during updates without dropping user connections.
* **Auto-Scaling:** Configured with Kubernetes Horizontal Pod Autoscaler (HPA) to dynamically adjust resources based on live CPU and memory loads.
* **Secure Secrets Management:** Database credentials and environment variables are securely injected into Kubernetes directly from Jenkins memory, eliminating hard-coded secrets.
* **Real-Time Observability:** Integrated Helm charts for Prometheus and Grafana, providing deep insights into pod compute resources and cluster health across all namespaces.

---

## 🚀 Tech Stack

**Application Stack:**

* **Frontend:** React.js
* **Backend:** Node.js, Express.js
* **Database:** MongoDB

**DevOps & Infrastructure:**

* **Containerization:** Docker & Docker Hub
* **Orchestration:** Kubernetes (Local multi-node cluster via `kind`)
* **CI/CD Pipeline:** Jenkins
* **Monitoring:** Prometheus & Grafana (`kube-prometheus-stack`)

---

## 📂 Repository Structure

```text
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

```

---

## 🛠️ Local Setup (Kubernetes via Kind)

### 1. Prerequisites

* [Docker](https://www.docker.com/) and [kind](https://kind.sigs.k8s.io/) (Kubernetes in Docker) installed.
* `kubectl` and `helm` installed on your local machine.
* A running Jenkins server connected to your GitHub webhook.

### 2. Start the Local Cluster

Wake up your multi-node `kind` cluster (1 control-plane, 2 workers) by starting the Docker containers:

```bash
docker start upskill-cluster-control-plane upskill-cluster-worker upskill-cluster-worker2

```

Verify the nodes are ready:

```bash
kubectl get nodes

```

### 3. Automated Deployment Workflow

This project utilizes a fully automated CI/CD pipeline. To deploy new changes:

1. Make changes to the frontend or backend code.
2. Commit and push to the `main` branch.
3. Jenkins will automatically trigger, build the updated images, push them to Docker Hub, and execute a `kubectl rollout restart` to update the cluster seamlessly.

### 4. Access the Application

The React frontend is exposed via a NodePort. Access the live application in your browser at:
**[http://localhost:30000](http://localhost:30000)**

*(Alternatively, you can port-forward directly into the container)*:

```bash
kubectl port-forward svc/upskill-frontend-service 3000:3000 -n upskill-namespace

```

---

## 📈 Monitoring & Observability

To view live metrics of the application and cluster health, start the monitoring port-forward:

```bash
kubectl port-forward svc/prometheus-stack-grafana 8081:80 -n monitoring

```

Access the Grafana dashboard at **[http://localhost:8081](http://localhost:8081)**.

**Credentials:**

* **Username:** `admin`
* **Password:** Retrieve the secure password from your cluster secrets by running:
```bash
kubectl get secret prometheus-stack-grafana -n monitoring -o jsonpath="{.data.admin-password}" | base64 --decode ; echo

```



---

## 👨‍💻 Author

**Aditya Kumar**

* **GitHub:** [@work-adityakr](https://github.com/work-adityakr)
* **Role:** Full Stack Developer (MERN / DevOps)
