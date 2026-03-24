const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000";

interface Profile {
  name: string;
  title: string;
  bio: string;
  linkedIn: string;
  resume: string;
  avatar: "🧑‍💻",
};

export default async function ProfileHeader() {
  const res = await fetch(`${API_BASE_URL}/api/about/info`);
  const profile: Profile = await res.json();

  return (
    <div className="flex items-start gap-6 mb-10">
      {/* Avatar */}
      <div className="w-20 h-20 rounded-2xl bg-purple-100 flex items-center justify-center text-4xl shrink-0">
        {profile.avatar}
      </div>

      {/* Info */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{profile.name}</h1>
        <p className="text-purple-600 font-medium mt-0.5">{profile.title}</p>
        <p className="text-gray-500 mt-2 text-sm leading-relaxed max-w-xl">
          {profile.bio}
        </p>

        {/* Actions */}
          <div className="flex gap-3 mt-4">
            <a
              href={profile.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-sm font-medium rounded-lg bg-purple-100 text-purple-600 hover:bg-purple-600 transition"
            >
              LinkedIn
            </a>

            <a
              href={profile.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-sm font-medium rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
            >
              Resume
            </a>
          </div>
      </div>
    </div>
  );
}