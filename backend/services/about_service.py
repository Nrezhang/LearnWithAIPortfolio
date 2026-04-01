import boto3
import os
from dotenv import load_dotenv
load_dotenv()


def get_experience():
    experience = [
        {
            "company": "Trianz Inc.",
            "company_url":"https://www.trianz.com",
            "role": "Associate Project Manager",
            "period": "September 2025 - Present",
            "description": "Drove enterprise AWS cloud migration and modernization projects for clients, implementing cloud strategies and overseeing execution. Collaborated with cross-functional teams to ensure successful project delivery and client satisfaction."
        },
        {
            "company": "Medidata Solutions Inc.",
            "company_url":"https://www.medidata.com/en/",
            "role": "AI Software Engineer Intern",
            "period": "May 2024 - August 2024",
            "description": "Developed Retrieval-Augmented Generation (RAG) for clinical trial data analysis, evaluating and improving accuracy of results returned. Collaborated with data scientists and engineers to engineer features and optimize model performance, contributing to enhanced insights for clinical research."
        },
        {
            "company": "Microsoft AI Co-Innovation Lab",
            "company_url":"https://www.microsoft.com/en-us/ailab",
            "role": "Junior Developer",
            "period": "May 2023 - Dec 2023",
            "description": "Contributed to the development of AI-powered applications and tools, working with stakeholders to understand requirements and implement solutions. Gained experience in AI model integration and application development, enhancing skills in software engineering and AI technologies."
        },{
            "company": "Jika.io",
            "company_url":"https://www.jika.io",
            "role": "Techncial Project Manager Intern",
            "period": "Feb 2023 - May 2023",
            "description": "Led a team of 6 in developing ETL analytics pipeline from MongoDB to BigQuery with dashboards, improving data accessibility and insights for fast paaced fintech startup."
        }
    ]
    return experience


def get_about_info():
    about_info = {
        "name": "Henry Zhang",
        "title": "Software Engineer",
        "linkedIn": "https://linkedin.com/in/henryszhang",
        "resume": "https://nrezhang.s3.us-east-1.amazonaws.com/ZhangHenryv2.2.pdf",
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
            "details": "Advanced Studies Diploma at the #1 public high school in the nation",
        }
    ]
    return education

def get_skills():
    skills = [
        {
            "category": "Languages",
            "items": ["Python3", "JavaScript", "TypeScript", "Java", "SQL"],
        },
        {
            "category": "Frontend",
            "items": ["React", "Next.js", "Tailwind CSS", "Figma"],
        },
        {
            "category": "Backend",
            "items": ["Node.js", "Express", "FastAPI", "Django", "Flask"],
        },
        {
            "category": "Infrastructure",
            "items": ["AWS", "Docker", "Kubernetes", "Terraform"],
        },
        {
            "category": "Databases",
            "items": ["PostgreSQL", "Redis", "MongoDB", "BigQuery", "DynamoDB"],
        },
    ]
    return skills

def get_projects():
    projects = [
        {
            "name": "AI-Powered Learning Site",
            "description": "A personal portfolio website that uses AI to learn and practice interview questions. Built with Next.js and FastAPI",
            "link": "https://github.com/Nrezhang/LearnWithAIPortfolio",
            "type": "github",
            "tech": ["Next.js", "FastAPI", "NVIDIA LLM API"]
        },
        {
            "name": "Fine Tuning for Financial Sentiment",
            "description": "Fine Tuned LLaMA for Financial sentiment analysis, matching performance metrics of domain specific models, and incorporated into a LSTM to improve stock price movement predictions",
            "link": "https://nrezhang.s3.us-east-1.amazonaws.com/35_Parameter_Efficient_Fine_Tu.pdf",
            "type": "paper",
            "tech": ["Python", "PyTorch", "Fine-Tuning"]
        },
        {
            "name": "First Personal Portfolio Website",
            "description": "Learned React and web development by building a personal portfolio website from scratch to showcase projects and experience. Gained experience in frontend development and design, deployed on github pages",
            "link": "https://nrezhang.github.io/Resume_portfolio/",
            "type": "github pages",
            "tech": ["React", "JavaScript", "HTML/CSS"]
        },
        {
            "name": "Natural Language Database Query",
            "description": "Utilizing Langchain Agents, created a chatbot component to enable database communication with AI to generate reports on relational data",
            "link": "https://nrezhang.s3.us-east-1.amazonaws.com/Langchain+(public).pdf",
            "type": "presentation",
            "tech": ["Azure", "Langchain", "PostgreSQL"]
        }
    ]
    return projects