import { GraduationCap } from "lucide-react";
import CollegeList from "@/components/college-list";
import { colleges } from "@/data/colleges";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-8">
        <div className="inline-flex items-center gap-3">
          <GraduationCap className="h-10 w-10 text-primary" />
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            College Compass
          </h1>
        </div>
        <p className="mt-2 text-lg text-muted-foreground">
          Your guide to finding the perfect college fit.
        </p>
      </header>
      <main>
        <CollegeList colleges={colleges} />
      </main>
    </div>
  );
}
