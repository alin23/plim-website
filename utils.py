import glob
import os
import urllib.parse

WIDTHS = [8120, 5260, 3840, 2560, 1920, 1280, 1024, 768, 640, 320]
DEV = os.getenv("NODE_ENV") == "development"


class Env:
    # The website title that appears in the browser tab or in Google search results
    title = "Plim Website"
    # The website domain (e.g. example.com)
    domain = "example.com"
    # The website description that appears in Google search results and when sharing on social media
    description = "A sample website made with methods described in the blog post: https://alinpanaitiu.com/blog/complex-simplicity-of-static-websites/"
    # The website color that tints the browser UI (e.g. #ff0000)
    color = "hsl(60, 5%, 96%)"

    # The Formspark form ID from https://dashboard.formspark.io/ (e.g. y3f9a1d) (only if you need a /contact page)
    formspark_id = ""
    # The Botpoison public key from https://botpoison.com/dashboard/configurations/ (e.g. pk_a2df..) (only if you need spam protection on the /contact page)
    botpoison_pk = ""

    # The Plausible domain (e.g. plausible.example.com) (only if you use https://plausible.io/ for analytics)
    plausible_domain = ""
    # The Imgproxy domain (e.g. imgproxy.example.com) (only if you use https://imgproxy.net/ for image resizing)
    imgproxy_domain = ""

    deploy_url = (
        os.getenv("DEPLOY_URL")
        or os.getenv("CF_PAGES_URL")
        or (f"https://{domain}" if domain else "http://localhost:3999")
    )
    form_url = f"https://submit-form.com/{formspark_id}" if formspark_id else ""


def imgurl(image, width, ext="png", convert_to=""):
    if DEV:
        return f"/img/{urllib.parse.quote(image)}.{ext}"

    if not Env.imgproxy_domain:
        return f"{Env.deploy_url}/img/{urllib.parse.quote(image)}.{convert_to or ext}"

    conversion = f"@{convert_to}" if convert_to else ""
    return f"https://{Env.imgproxy_domain}/_/{width}/plain/{Env.deploy_url}/img/{urllib.parse.quote(image)}.{ext}{conversion}"


def srcset(image, ext="png", maxwidth=8120, factor=1, convert_to=""):
    if DEV:
        return f"/img/{urllib.parse.quote(image)}.{ext}"

    return ",".join(
        f"{imgurl(image, width, ext, convert_to)} {width // factor:.0f}w"
        for width in WIDTHS
        if width <= maxwidth
    )


def images(folder, ext="png"):
    return [
        os.path.splitext(img[18:])[0]
        for img in glob.glob(f"public/img/{folder}/*.{ext}")
    ]
