# Fury Fight Club — Main Service


## 🕸️ K8S deployment

Docker image: `mcamus9/ffc-main-docker`


### Prerequistes
- Install kubectl with `brew install kubectl`
- Install Gcloud SDK with `brew cask install google-cloud-sdk`

### Deployment

Deploy the service with the following command:
```bash
kubectl apply -f k8s/deployment.yaml
```

### Expose the service
```bash
kubectl apply -f k8s/service.yaml
```