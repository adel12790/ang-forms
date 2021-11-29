import { Injectable } from '@angular/core';

export interface IProfile {
    firstName: string;
    lastName: string;
    username: string;
    age: number;
    email: string;
}
@Injectable({ providedIn: 'root' })
export class ProfileService {
    public user: IProfile | any;

    private emailRegex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

    constructor() { }
    getProfileUser(): Promise<IProfile> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // if (Math.round(Math.random())) {
                if(true){
                    this.user = {
                        firstName: 'Michael',
                        lastName: 'Collins',
                        username: 'michael.collins',
                        age: 30,
                        email: 'michael.collins@blueface.com'
                    };
                    resolve(this.user);
                } else {
                    reject({ error: 'Profile not found' });
                }
            }, Math.random() * 5000);
        });
    }
    setName(firstName: string, lastName: string): Promise<void> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (Math.round(Math.random())) {
                    this.user.firstName = firstName;
                    this.user.lastName = lastName;
                    this.user.username = `${firstName.toLowerCase()}.${lastName.toLowerCase()}`;
                    resolve();
                } else {
                    reject({ error: 'Invalid name'});
                }
            }, Math.random() * 5000);
        });
    }
    setEmail(email: string): Promise<void> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (Math.round(Math.random())) {
                // if(true){
                    console.log('match', this.emailRegex.test(email));
                    if(this.emailRegex.test(email)){
                        this.user.email = email;
                        resolve();
                    } else {
                        reject({ error: 'Invalid email'});
                    } 
                    
                } else {
                    reject({ error: 'Timeout'});
                }
            }, Math.random() * 5000);
        });
    }

    setData(firstName: string, lastName: string, email: string) {
        return new Promise((resolve, reject) => {
            Promise.all([this.setName(firstName, lastName), this.setEmail(email)])
                .then(()=> {resolve(this.user)})
                .catch(e => reject({error: e.error}));
        });
    }
}