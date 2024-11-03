import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { sConfig } from './app/app.config.server';

const bootstrap = () => bootstrapApplication(AppComponent, sConfig);

export default bootstrap;
