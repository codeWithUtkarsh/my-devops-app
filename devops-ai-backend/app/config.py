from pydantic_settings import BaseSettings
from functools import lru_cache
from dotenv import load_dotenv

# Load .env file
load_dotenv()

class Settings(BaseSettings):
    # API Keys
    anthropic_api_key: str

    # Database
    database_url: str = "sqlite:///./chat.db"

    # API Settings
    host: str = "0.0.0.0"
    port: int = 8000
    environment: str = "development"

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"

@lru_cache()
def get_settings():
    return Settings()