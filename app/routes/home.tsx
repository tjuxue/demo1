import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import { App } from "../app";
import { Provider } from "~/components/ui/provider"

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Class Demo" },
    { name: "description", content: "Welcome to Demo!" },
  ];
}

export default function Home() {
  return (
    <Provider>
        <App />
    </Provider>
  )
}
