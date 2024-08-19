import { ProfileData } from "src/app/components/pages/signup/interfaces/signup.interfaces";

export interface SignupParams {
    username: string;
    email: string;
    password: string;
    roleName: string;
    profileData: ProfileData;
  }