import { environment } from '../environments/environment';

export class GlobalSettings {
  public static get AUTH_API_ENDPOINT(): string {
    return environment.authApiUrl;
  }
}
