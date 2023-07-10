<h1 style="text-align: center;"><img style="display: block; margin-left: auto; margin-right: auto;" src="https://raw.githubusercontent.com/Fur-Fight-Club/ffc-readme-resources/191744278169987e3c5dabeae0875d2e7ec6d626/images/ffc-logo.svg" alt="ffc-logo" width="100" height="100" />Fury Fight Club</h1>
<table style="height: 100px; width: 100%; border-collapse: collapse; margin-left: auto; margin-right: auto;" border="0">
<tbody>
<tr style="height: 100px;">
<td style="width: 25%; height: 100px;">
<table style="border-collapse: collapse; width: 100%;" border="0">
<tbody>
<tr>
<td style="width: 50%;"><img style="border-radius: 50px; display: block; margin-left: auto; margin-right: auto;" src="https://avatars.githubusercontent.com/u/31384089?s=96&amp;v=4" alt="mistergooddeal-pp" width="30" height="30" /></td>
<td style="width: 50%;">
<p><strong>Milan CAMUS</strong></p>
<p><span style="text-decoration: underline;"><span style="color: #999999; text-decoration: underline;"><a style="color: #999999; text-decoration: underline;" href="https://github.com/MisterGoodDeal" target="_blank"><em>@MisterGoodDeal</em></a></span></span></p>
</td>
</tr>
</tbody>
</table>
</td>
<td style="width: 25%; height: 100px;">
<table style="border-collapse: collapse; width: 100%;" border="0">
<tbody>
<tr>
<td style="width: 50%;"><img style="border-radius: 50px; display: block; margin-left: auto; margin-right: auto;" src="https://avatars.githubusercontent.com/u/47819911?s=96&amp;v=4" alt="norudah-pp" width="30" height="30" /></td>
<td style="width: 50%;">
<p><strong>Romain Pierucci</strong></p>
<p><span style="text-decoration: underline;"><span style="color: #999999; text-decoration: underline;"><a style="color: #999999; text-decoration: underline;" href="https://github.com/Norudah" target="_blank"><em>@Norudah</em></a></span></span></p>
</td>
</tr>
</tbody>
</table>
</td>
<td style="width: 25%; height: 100px;">
<table style="border-collapse: collapse; width: 100%;" border="0">
<tbody>
<tr>
<td style="width: 50%;"><img style="border-radius: 50px; display: block; margin-left: auto; margin-right: auto;" src="https://avatars.githubusercontent.com/u/21012351?s=96&amp;v=4" alt="samizerrai-pp" width="30" height="30" /></td>
<td style="width: 50%;">
<p><strong>Sami Zerrai</strong></p>
<p><span style="text-decoration: underline;"><span style="color: #999999; text-decoration: underline;"><a style="color: #999999; text-decoration: underline;" href="https://github.com/SamiZerrai" target="_blank"><em>@SamiZerrai</em></a></span></span></p>
</td>
</tr>
</tbody>
</table>
</td>
<td style="width: 25%; height: 100px;">
<table style="width: 100%; border-collapse: collapse;" border="0">
<tbody>
<tr>
<td style="width: 50%;"><img style="border-radius: 50px; display: block; margin-left: auto; margin-right: auto;" src="https://avatars.githubusercontent.com/u/55231965?s=96&amp;v=4" alt="SylvainBoudacher-pp" width="30" height="30" /></td>
<td style="width: 50%;">
<p><strong>Sylvain Boudacher</strong></p>
<p><span style="text-decoration: underline;"><a href="https://github.com/SylvainBoudacher" target="_blank"><span style="color: #999999; text-decoration: underline;"><em>@SylvainBoudacher</em></span></a></span></p>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<p>&nbsp;</p>
<p><em><strong>ffc-main-service</strong></em> is the main service, the entry point of the Fury Fight Club project. It is a REST API that acts like a proxy for the <a href="https://github.com/Fur-Fight-Club/ffc-mobile-app" data-href="https://github.com/Fur-Fight-Club/ffc-mobile-app">mobile app</a>&nbsp;and the&nbsp;<a href="https://github.com/Fur-Fight-Club/ffc-web-app" data-href="https://github.com/Fur-Fight-Club/ffc-web-app">NextJS app</a>. It's role is to communicate with each services and do some business logic such as CRUD operations on <em>Arenas</em>, <em>Matches</em>, <em>Monsters</em> and <em>Tournaments</em>.</p>
<p>This service is communicating with other services using <strong><em>HTTP requests</em></strong> and with another layer of security consisting in authenticating each services with a <em><strong>JWT token</strong></em>. It's implementing a strongly typed API in TypeScript allowing us to keep a consistent typing across each services. This API can be found under <em><a href="https://github.com/Fur-Fight-Club/ffc-main-service/tree/main/src/api" target="_blank">this folder</a></em>.</p>
<p>The main service is working with three main "components":</p>
<table style="width: 100%; border-collapse: collapse;" border="0">
<tbody>
<tr>
<td style="width: 33.3333%;"><img style="display: block; margin-left: auto; margin-right: auto;" src="https://raw.githubusercontent.com/Fur-Fight-Club/ffc-readme-resources/master/images/NestJS.svg" alt="nestjs-logo" width="50" height="48" /></td>
<td style="width: 33.3333%;"><img style="display: block; margin-left: auto; margin-right: auto;" src="https://raw.githubusercontent.com/Fur-Fight-Club/ffc-readme-resources/master/images/Imgur_Icon_2018.webp" alt="imgur-logo" width="50" height="50" /></td>
<td style="width: 33.3333%;"><img style="display: block; margin-left: auto; margin-right: auto;" src="https://raw.githubusercontent.com/Fur-Fight-Club/ffc-readme-resources/master/images/prisma.svg" alt="prisma-logo" width="127" height="50" /></td>
</tr>
<tr>
<td style="width: 33.3333%; text-align: center;">
<h3>NestJS</h3>
<p style="text-align: center;"><em>NestJS is the core of this project. It allow us to create the REST API</em></p>
</td>
<td style="width: 33.3333%; text-align: center;">
<h3>Imgur API</h3>
<p><em>The Imgur API allow us to delegate everything related to any images</em></p>
</td>
<td style="width: 33.3333%; text-align: center;">
<h3>prisma-package</h3>
<p><em>This is a custom npm package including our TypeScript database model</em></p>
</td>
</tr>
</tbody>
</table>
<p>&nbsp;</p>
<div>
<h2>🏃&zwj;♂️ Start the service</h2>
<p>First things first, make sure you're running at least <code>Node 18</code> and that you've installed all the dependencies with <code>npm install</code>.</p>
<p>There is two ways to run the project. This first one is to use Docker, but It's not recommended since the docker is meant to be used with the Kubernetes cluster (running production version of the NestJS service). But if you want to do it like that, feel free to run the following command:</p>

```bash
docker-compose up -d
```

<div>Now if you want to run it and get the auto-refresh and all that kind of stuff, you can run the following command:</div>
<div>&nbsp;</div>
<div><img style="display: block; margin-left: auto; margin-right: auto;" src="https://raw.githubusercontent.com/Fur-Fight-Club/ffc-readme-resources/master/GIFs/ffc-main/start-ffc-main.webp" alt="" width="480" height="82" /></div>
<div>&nbsp;</div>
<div>The project will start under the port <code>4000</code> and will be available at the following URL: <a href="http://localhost:4000/" data-href="http://localhost:4000">http://localhost:4000</a></div>
</div>
<div>&nbsp;</div>
<h2>📝 API documentation</h2>
<p>The project is implementing the <code>@nestjs/swagger</code> library. This library allow use to generate a Swagger page for each routes and document them properly.</p>
<p>You can access this documentation at the following URL: <a href="http://localhost:4000/swagger" data-href="http://localhost:4000/swagger">http://localhost:4000/swagger</a></p>

<h2 id="%F0%9F%95%B8%EF%B8%8F-k8s-deployment" class="code-line" dir="auto" data-line="124">🕸️ K8S deployment</h2>
<p>As we said earlier, this project is meant to be deployed on a Kubernetes cluster. You can either run it locally using an instance of <em><strong>minikube</strong> </em>or you can deploy it on a cloud cluster like <strong><em>Google Cloud Provider</em></strong>.</p>
<p>There is a few prerequisites if you want to deploy it to a K8S cluster:</p>
<ul>
<li>Install <em><strong>kubectl</strong> </em>with <code>brew install kubectl</code></li>
<li>Install <em><strong>Gcloud SDK</strong></em> with <code>brew cask install google-cloud-sdk</code> (optional)</li>
<li>Install <em><strong>k9s</strong></em> with <code>brew install k9s</code> (optional)</li>
</ul>
<p>&nbsp;</p>
<p>Then you can deploy the app using the deployement files provided in the <a href="https://github.com/Fur-Fight-Club/ffc-main-service/tree/main/k8s">k8s/</a> folder by running the following commands:</p>

```bash
# Deploy the app
kubectl apply -f k8s/deployment.yaml

# Expose the service
kubectl apply -f k8s/service.yaml
```

<p>The app can be automatically deployed to a Google Kubernetes Engine using <em><strong>GitHub Actions</strong></em> that you can found in the folder <a href="https://github.com/Fur-Fight-Club/ffc-main-service/tree/main/.github/workflows">.github/workflows</a>.</p>
<p>The app is built when a new tag is created on the main branch. A Docker image is built inside the action and pushed to the Docker Hub repository. The image can be found <a href="https://hub.docker.com/repository/docker/mcamus9/ffc-main-docker/general">here</a>.</p>
<p>&nbsp;</p>

<h2>🧪 Tests</h2>
<p>The project has been tested along every projects using Jest (except <code>ffc-mobile-app</code> and <code>ffc-web-app</code>). There is an average of 75% of coverage for every projects.</p>
<p>The app is tested on each commits in order to insure a proper code delivery.</p>
<p>But you can run tests locally by using the following command:</p>

```bash
npm run test
```

