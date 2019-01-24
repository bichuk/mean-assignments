import { HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

export class AppError {
    errorNumber: number;
    message: string;
    friendlyMessage: string;

     handleError(err: HttpErrorResponse) : Observable<AppError>{
        let dataError = new AppError();
        dataError.errorNumber=100;
        //Capture user defined error if any
        dataError.message = err.error != undefined? err.error.error : err.message;
        console.log(err.message);
        dataError.friendlyMessage = "An error occured while processing the request!!";
        return of(dataError);
      }
}