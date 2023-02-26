export default function cnx(...classes: unknown[]) {
  return classes.filter(Boolean).join(" ");
}
