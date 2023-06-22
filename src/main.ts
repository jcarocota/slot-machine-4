import { App } from "./client/App.ts";

const app = new App();

document.body.appendChild(app.view as HTMLCanvasElement);
