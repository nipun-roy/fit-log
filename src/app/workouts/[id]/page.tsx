import { redirect } from "next/navigation";

export default async function WorkoutsRedirect({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  redirect(`/workout/${id}`);
}
