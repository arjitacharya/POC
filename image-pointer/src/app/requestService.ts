import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class RequestService {
    res;
    constructor(private http: HttpClient) {

    }

    saveImage(image) {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' })
        const body = { base64image: image }
        // this.http.post<any>('http://localhost:9191/upload/image', { title: 'Angular POST Request Example' }).subscribe(data => {
        //     this.res = data;
        //     console.log(data)
        // })
        console.log("data to be sent - - - - - -", body)
        this.http.post('http://localhost:9191/upload/image', body, { headers: headers })
            .subscribe((data) => {
                console.log(data);
                this.res = data
            })

    }
}
