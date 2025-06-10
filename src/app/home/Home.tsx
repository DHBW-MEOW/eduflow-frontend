import type { Route } from "../../../.react-router/types/src/app/home/+types/Home.tsx";

export async function clientLoader(){
  return {
    text: "This is the new Homepage",
  };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return (
    <div>
      <div>öalksdjöaslkdfj</div>
      <div>{loaderData.text}</div>
    </div>
  )
}
