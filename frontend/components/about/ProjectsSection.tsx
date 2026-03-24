const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000";

interface Project {
  name: string;
  description: string;
  tech: string[];
  github?: string;
  live?: string;
}

export default async function ProjectsSection() {
    const res = await fetch(`${API_BASE_URL}/api/about/projects`);
    const projects: Project[] = await res.json();
 

  return (
    <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
                <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400">
                    Projects
                </h2>
                <div className="flex-1 h-px bg-gray-200" />
            </div>

      <div className="flex gap-4 overflow-x-auto pb-2">
        {projects.map((project) => {
          const link = project.live || project.github;

          return (
            <a
              key={project.name}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="min-w-70 max-w-70 p-4 border border-gray-200 rounded-lg bg-white 
                         transition-all duration-200 hover:-translate-y-1 hover:shadow-md flex flex-col justify-between"
            >
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  {project.name}
                </p>

                <p className="text-sm text-gray-500 mt-2">
                  {project.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}