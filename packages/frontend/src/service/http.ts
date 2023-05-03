// http.service.js
import axios from 'axios'; // It could be any fetching services, such as default fetch, call api, xhr, etc.
import { SERVER_URL } from '../modules/common/consts/app-keys.const';

export default class HttpService {
  constructor(public baseUrl = SERVER_URL, public fetchingService = axios, public apiVersion = 'api') {
    this.baseUrl = baseUrl;
    this.fetchingService = axios;
    this.apiVersion = apiVersion
  }

  private getFullApiUrl(url: string) {
    return `${this.baseUrl}/${this.apiVersion}/${url}`;
  }

  private populateTokenToHeaderConfig() {
    return {
      'Authorization': localStorage.getItem('token'),
    }
  }
  
  private extractUrlAndDataFromConfig({data, url, ...configWithoutDataAndUrl}: any) {
    return configWithoutDataAndUrl;
  }

  get(config: any, withAuth = true) {
    if (withAuth) {
      config.headers = {
        ...config.headers,
        ...this.populateTokenToHeaderConfig(),
      }
    }
    return this.fetchingService.get(this.getFullApiUrl(config.url), this.extractUrlAndDataFromConfig(config)).then(res => res.data);
  }

  post(config: any, withAuth = true) {
    if (withAuth) {
      config.headers = {
        ...config.headers,
        ...this.populateTokenToHeaderConfig(),
      }
    }
    return this.fetchingService.post(this.getFullApiUrl(config.url), config.data, this.extractUrlAndDataFromConfig(config)).then(res => res.data);
  }

  put(config: any, withAuth = true) {
    if (withAuth) {
      config.headers = {
        ...config.headers,
        ...this.populateTokenToHeaderConfig(),
      }
    }
    return this.fetchingService.put(this.getFullApiUrl(config.url), config.data, this.extractUrlAndDataFromConfig(config)).then(res => res.data);
  }

  delete(config: any, withAuth = true) {
    if (withAuth) {
      config.headers = {
        ...config.headers,
        ...this.populateTokenToHeaderConfig(),
      }
    }
    return this.fetchingService.delete(this.getFullApiUrl(config.url), this.extractUrlAndDataFromConfig(config)).then(res => res.data);
  }
}