export default function Page({ params }: { params: { slug: string } }) {
  return <h1 className="text-center">{params.slug}</h1>
}
