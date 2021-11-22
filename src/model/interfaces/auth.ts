/* eslint-disable semi */
/* eslint-disable @typescript-eslint/no-extra-semi */

import { SignUp } from '../types/signup';

export default interface AuthInterface {
  signUp(data : SignUp) : Promise<{success : boolean}>;
};
