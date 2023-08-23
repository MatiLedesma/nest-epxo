import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return (
      __dirname +
      `
    <div style="margin:0;padding:0;display:flex;justify-content:center;align-items:center;flex-direction:column;">
      <h2>/user</h2>
      <h3>To get the users information</h3>
      <h2>/user/{id}</h2>
      <h3>To get a single user information</h3>
    </div>
    `
    );
  }
}
