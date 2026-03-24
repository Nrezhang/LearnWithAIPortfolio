// const skills: { category: string; items: string[] }[] = [
//   {
//     category: "Languages",
//     items: ["Python", "JavaScript", "TypeScript", "Go"],
//   },
//   {
//     category: "Frontend",
//     items: ["React", "Next.js", "Tailwind CSS", "Framer Motion"],
//   },
//   {
//     category: "Backend",
//     items: ["Node.js", "Express", "FastAPI", "gRPC"],
//   },
//   {
//     category: "Infrastructure",
//     items: ["AWS", "Docker", "Kubernetes", "Terraform"],
//   },
//   {
//     category: "Databases",
//     items: ["PostgreSQL", "Redis", "MongoDB", "Kafka"],
//   },
// ];
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000";
interface Skills{
  category: string;
  items: string[];
}

export default async function SkillsSection() {
  const res = await fetch(`${API_BASE_URL}/api/about/skills`);
  const skills: Skills[] = await res.json();

  return (
    <div className="mb-10">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">
        Skills
      </h2>

      <div className="space-y-3">
        {skills.map(({ category, items }) => (
          <div key={category} className="flex items-start gap-4">
            <span className="text-sm text-gray-400 w-28 flex-shrink-0 pt-1">
              {category}
            </span>
            <div className="flex flex-wrap gap-2">
              {items.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-sm font-medium border border-purple-100"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}