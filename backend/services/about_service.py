def get_experience():
    experience = [
        {
            "company": "Tech Company A",
            "role": "Software Engineer",
            "period": "Jan 2020 - Present",
            "description": "Developed and maintained web applications using Python and JavaScript."
        },
        {
            "company": "Tech Company B",
            "role": "Junior Developer",
            "period": "Jun 2018 - Dec 2019",
            "description": "Assisted in the development of internal tools and contributed to code reviews."
        }
    ]
    return experience

def get_education():
    education = [
        {
            "institution": "University of Technology",
            "degree": "Bachelor of Science in Computer Science",
            "duration": "2014 - 2018"
        }
    ]
    return education

def get_about_info():
    about_info = {
        "name": "John Doe",
        "title": "Software Engineer",
        "sessionsDone": 10,
        "hoursLearned": 20,
        "avatar": "🧑‍💻",
        "bio": "A passionate software engineer with experience in web development and a strong interest in AI.",
        "experience": get_experience(),
        "education": get_education()
    }
    
    return about_info

def get_skills():
    skills = [
        {
            "category": "Languages",
            "items": ["Python3", "JavaScript", "TypeScript", "Go"],
        },
        {
            "category": "Frontend",
            "items": ["React", "Next.js", "Tailwind CSS", "Framer Motion"],
        },
        {
            "category": "Backend",
            "items": ["Node.js", "Express", "FastAPI", "gRPC"],
        },
        {
            "category": "Infrastructure",
            "items": ["AWS", "Docker", "Kubernetes", "Terraform"],
        },
        {
            "category": "Databases",
            "items": ["PostgreSQL", "Redis", "MongoDB", "Kafka"],
        },
    ]
    return skills