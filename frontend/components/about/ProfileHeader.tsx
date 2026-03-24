"use client";

const profile = {
  name: "Alex Johnson",
  title: "Software Engineer",
  bio: "I'm a software engineer passionate about building scalable systems and writing clean, efficient code. I enjoy diving deep into distributed systems, algorithms, and system design — and I'm always learning.",
  sessionsDone: 4,
  hoursLearned: 4,
  avatar: "🧑‍💻",
};

export default function ProfileHeader() {
  return (
    <div className="flex items-start gap-6 mb-10">
      {/* Avatar */}
      <div className="w-20 h-20 rounded-2xl bg-purple-100 flex items-center justify-center text-4xl flex-shrink-0">
        {profile.avatar}
      </div>

      {/* Info */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{profile.name}</h1>
        <p className="text-purple-600 font-medium mt-0.5">{profile.title}</p>
        <p className="text-gray-500 mt-2 text-sm leading-relaxed max-w-xl">
          {profile.bio}
        </p>

        {/* Stats */}
        <div className="flex gap-6 mt-3">
          <span className="text-sm text-gray-700">
            <strong>{profile.sessionsDone}</strong>{" "}
            <span className="text-gray-400">sessions done</span>
          </span>
          <span className="text-sm text-gray-700">
            <strong>{profile.hoursLearned}h</strong>{" "}
            <span className="text-gray-400">learned</span>
          </span>
        </div>
      </div>
    </div>
  );
}