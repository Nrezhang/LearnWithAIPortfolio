"use client";

const experience = [
  {
    period: "2024–Present",
    role: "Senior Software Engineer",
    company: "TechCorp",
    description:
      "Leading backend infrastructure for a distributed data platform serving 10M+ users.",
  },
  {
    period: "2022–2024",
    role: "Software Engineer",
    company: "StartupXYZ",
    description:
      "Built real-time features and APIs, reduced query latency by 60% through caching strategies.",
  },
  {
    period: "2020–2022",
    role: "Junior Developer",
    company: "Agency Co.",
    description:
      "Developed full-stack web applications for clients across fintech and e-commerce.",
  },
];

export default function ExperienceSection() {
  return (
    <div className="mb-10">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">
        Experience
      </h2>

      <div className="space-y-6">
        {experience.map((job) => (
          <div key={job.period} className="flex gap-4">
            {/* Dot + line */}
            <div className="flex flex-col items-center">
              <div className="w-2 h-2 rounded-full bg-purple-500 mt-1.5 flex-shrink-0" />
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