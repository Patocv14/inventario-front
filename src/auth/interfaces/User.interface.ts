export interface User {
  id:       string;
  name:     string;
  address:  string | null;
  password: string;
  email:    string;
  role:     string;
}
