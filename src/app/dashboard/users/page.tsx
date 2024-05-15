import { UserTable } from "@/auth";


export const metadata = {
 title: 'Users',
 description: 'Users Page',
};

export default function UsersPage() {
  return (
    <div>
      <UserTable />
    </div>
  );
}