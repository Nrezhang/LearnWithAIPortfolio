const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000";
interface Experience {
  period: string;
  role: string;
  company: string;
  description: string;
}

export default async function ExperienceSection() {
  const res = await fetch(`${API_BASE_URL}/api/about/experience`);
  const experience: Experience[] = await res.json();


  return (
    <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
                <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400">
                    Experience
                </h2>
                <div className="flex-1 h-px bg-gray-200" />
            </div>

      <div className="space-y-6">
        {experience.map((job) => (
          <div key={job.period} className="flex gap-4">
            {/* Dot + line */}
            <div className="flex flex-col items-center">
              <div className="w-2 h-2 rounded-full bg-purple-500 mt-1.5 shrink-0" />
              <div className="w-px flex-1 bg-gray-200 mt-1" />
            </div>

            {/* Content */}
            <div className="pb-4">
              <p className="text-xs text-gray-400 mb-0.5">{job.period}</p>
              <p className="text-sm font-semibold text-gray-900">
                {job.role}{" "}
                <span className="text-gray-400 font-normal">· {job.company}</span>
              </p>
              <p className="text-sm text-gray-500 mt-1">{job.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}