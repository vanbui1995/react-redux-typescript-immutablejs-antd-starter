import APIService from './base.service';

export default class AuthService {
  static login(email: string, password: string): Promise<any> {
    return APIService.post('/auth/login', { email, password });
  }
  static logout(): Promise<any> {
    return APIService.post('/auth/logout');
  }
  static signup(email: string, password: string): Promise<any> {
    return APIService.post('/auth/resgister', { email, password });
  }
}
