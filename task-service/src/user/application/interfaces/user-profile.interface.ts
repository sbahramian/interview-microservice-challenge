export interface InvitedUserInterface {
  user_id: number;
  first_name: string;
  last_name: string;
  username: string;
}

export interface UserProfileInterface {
  user_id: number | null;
  avatar: string | null;
  first_name: string | null;
  last_name: string | null;
  email: string;
  username: string;
}

export interface GetUserJwtPayloadInterface {
  user_id: number;
}
