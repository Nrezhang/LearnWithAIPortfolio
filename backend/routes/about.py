from fastapi import APIRouter
from services.about_service import get_skills, get_about_info, get_experience, get_education

router = APIRouter(prefix="/api/about")

@router.get("/skills")
async def skills():
    return get_skills()

@router.get("/info")
async def about_info():
    return get_about_info()

@router.get("/experience")
async def experience():
    return get_experience()

@router.get("/education")
async def education():
    return get_education()