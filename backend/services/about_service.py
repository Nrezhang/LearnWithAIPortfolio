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


def get_about_info():
    about_info = {
        "name": "John Doe",
        "title": "Software Engineer",
        "linkedIn": "https://linkedin.com/in/henryszhang83",
        "resume": "https://example.com/resume.pdf",
        "avatar": "🧑‍💻",
        "bio": "A passionate software engineer with experience in web development and a strong interest in AI.",
    }
    
    return about_info
def get_education():
    education = [
        {
            "school": "NYU",
            "year": "2025",
            "details": "Bachelor of Science in Computer Science. Graduated with honors.",
            "courses": ["Data Structures", "Algorithms", "Artificial Intelligence", "Machine Learning", "Web Development"]
        },
        {
            "school": "TJHSST",
            "year": "2021",
            "details": "Completed various courses on AI, machine learning, and web development.",
            "courses": ["Data Structures", "Algorithms", "Artificial Intelligence", "Machine Learning", "Web Development"]
        }
    ]
    return education

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

def get_projects():
    projects = [
        {
            "name": "AI-Powered Portfolio",
            "description": "A personal portfolio website that uses AI to generate content and provide an interactive experience.",
            "link": "https://github.com/yourname/ai-portfolio",
            "tech": ["Next.js", "FastAPI", "OpenAI API"]
        },
        {
            "name": "Recommender System",
            "description": "A hybrid recommendation system that combines collaborative filtering and sequential modeling.",
            "link": "https://github.com/yourname/recommender",
            "tech": ["Python", "PyTorch", "MovieLens"]
        },
        {
            "name": "ETL Analytics Pipeline",
            "description": "Data pipeline from MongoDB to BigQuery with dashboards.",
            "link": "https://github.com/yourname/etl-pipeline",
            "tech": ["AWS", "BigQuery", "MongoDB"]
        }
    ]
    return projects