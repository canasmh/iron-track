import { User } from './User';
import { InjectionToken } from '@angular/core';

export const USER_TOKEN = new InjectionToken<User>('user');
