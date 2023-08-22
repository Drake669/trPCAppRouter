import Image from "next/image";
import TodoList from "./_components/TodoList";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="mb-5 font-bold">MY TRPC APP ROUTER EXPLOITS</div>
      <TodoList />
    </main>
  );
}
