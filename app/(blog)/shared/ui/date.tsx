export default function DateComponent({ dateString }: { dateString: string }) {
  if (!dateString) {
    return null;
  }

  const date = new Date(dateString);

  // Utilize native Intl.DateTimeFormat for localization, avoiding large libraries like date-fns.
  // We use 'es' locale to preserve the language choice from the original implementation.
  // This will typically output "d de MMMM de yyyy" (e.g., "25 de octubre de 2023"),
  // which is the standard long date format for Spanish.
  const formattedDate = new Intl.DateTimeFormat("es", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);

  // Capitalize the first letter as Spanish month names are lowercase by default in standard formatting
  const capitalizedDate =
    formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);

  return <time dateTime={dateString}>{capitalizedDate}</time>;
}
