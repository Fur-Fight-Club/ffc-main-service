# Fury Fight Club — Main Service
`ffc-main-service` is the main service of the Fury Fight Club project. It is a REST API that acts like a proxy for the [mobile app](https://github.com/Fur-Fight-Club/ffc-mobile-app) and the [NextJS app](https://github.com/Fur-Fight-Club/ffc-web-app).

It runs on port `4000` and is accessible at the following url: [http://localhost:4000](http://localhost:4000)



## 🏃‍♂️ Start the service

You can either run the service with docker or with node.

### With docker

```bash
docker-compose up
```

### With node

```bash
npm install
npm start:dev
```

## 📝 API documentation

The API documentation is available at the following url: [http://localhost:4000/swagger](http://localhost:4000/swagger)

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

### Automatic deployment

The service is automatically deployed on the GCloud cluster when a new tag is pushed on the master branch.

## 🧪 Tests

The project is tested with Jest. To run the tests, run the following command:

```bash
npm run test
```

The project is tested on each commits and before the deployment on the GCloud cluster.