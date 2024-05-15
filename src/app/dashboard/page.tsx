import { ProductsTable } from "./components/ProductsTable";

export const metadata = {
  title: "Products",
  description: "Products Page",
};

export default function DashboardPage() {
  return (
    <div>
      <ProductsTable />
    </div>
  );
}
