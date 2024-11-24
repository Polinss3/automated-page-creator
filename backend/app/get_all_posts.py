# backend/app/get_all_posts.py

from fastapi import APIRouter, HTTPException
import os
import re

router = APIRouter()

OUTPUT_DIRECTORY = os.getenv("OUTPUT_DIRECTORY", '../frontend/src/app/posts')

@router.get("/get-all-posts/")
def get_all_posts():
    try:
        posts = []
        for slug in os.listdir(OUTPUT_DIRECTORY):
            page_path = os.path.join(OUTPUT_DIRECTORY, slug, 'page.tsx')
            if os.path.isfile(page_path):
                with open(page_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                title_match = re.search(r'<title>(.*?)<\/title>', content)
                body_content_match = re.search(r'const body_content = `([\s\S]*?)`;', content)
                if title_match and body_content_match:
                    posts.append({
                        "title": title_match.group(1),
                        "body_content": body_content_match.group(1)
                    })
        return {"posts": posts}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
