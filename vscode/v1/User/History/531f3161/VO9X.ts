type UserPayload = {
  name: string;
  email: string;
  username: string;
  password: string;
  gender: string;
};

type UserRecord = {
  id: number;
  name: string;
  email: string;
  username: string;
  password: string;
  gender: string;
};

export type { UserPayload, UserRecord };
