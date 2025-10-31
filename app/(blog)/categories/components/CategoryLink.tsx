import Link from "next/link";

export default function CategoryLink() {
  return (
    <div className="mb-6 mt-6 text-center">
      <Link
        href="/categories"
        className="mx-3 mb-6 border border-foreground bg-foreground py-3 px-12 font-bold text-background transition-colors duration-200 hover:bg-background hover:text-foreground lg:mb-0 lg:px-8"
      >
        Ver todas las categorías
      </Link>
    </div>
  );
}
