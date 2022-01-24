/* eslint-disable arrow-body-style */
import AuthInterface from '../../model/interfaces/auth';
import { SignUp } from '../../model/types/signup';

export default class Auth implements AuthInterface {
    private authRepo : AuthInterface;

    constructor(authRepo : AuthInterface) {
      this.authRepo = authRepo;
    }

    signUp = async (data : SignUp) : Promise<{success : boolean, data : unknown}> => {
      return new Promise((resolve) => {
        this.authRepo.signUp(data).then((value) => resolve(value));
      });
    }
}
