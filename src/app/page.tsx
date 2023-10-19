import Landing from "@/components/Landing";
import UnsplashImageFetcher from "@/components/UnsplashImageFetcher";
import Image from "next/image";

export default function Home() {
  return (
    <main className="relative">
      <Image
        src="https://images.unsplash.com/photo-1595085130569-6a74dbe61a32?auto=format&fit=crop&q=80&w=1931&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        width={3000}
        height={800}
        className="w-full h-[100vh] fixed top-0 opacity-20 object-cover -z-20"
        alt="bg"
      />
      <Landing />
      <div className="w-11/12 mx-auto">
        <UnsplashImageFetcher />
      </div>
    </main>
  );
}
