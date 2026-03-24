const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000";

interface Education {
  school: string;
  year: string;
  details: string;
}

interface Props {
  education: Education[];
}

export default async function EducationSection() {
    const res = await fetch(`${API_BASE_URL}/api/about/education`);
    const edu: Education[] = await res.json();
    return (

        <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
                <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400">
                    Education
                </h2>
                <div className="flex-1 h-px bg-gray-200" />
            </div>
            
        {edu.map((ed) => (
            <div key={ed.school} className="text-sm text-gray-600">
            <span className="text-sm text-gray-400 w-28 flex-shrink-0 pt-1">
                {ed.school}
            </span>
            <span className="text-gray-400">
                {" "}
                · {ed.details} · {ed.year}
            </span>
            </div>
        ))}
        </div>
    );
    }