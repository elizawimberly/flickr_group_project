from app.models import db, User, Album, Comment, Photo, tags_to_photos, Tag, environment, SCHEMA
from datetime import datetime, date

tags = [
            # 0 - 24
            "tofu", "occupy", "af", "quinoa", "organic", "swag",
            "schlitz", "tote_bag", "Lomo", "next-level", "forage",
            "live-edge", "dreamcatcher", "mumblecore", "selfies", "bruh",
            "snackwave", "sustainable", "hashtag", "lumbersexual", "YOLO",
            "leggings", "tumblr", "tattooed", "fashion",  "microdosing",
            # 25 - 49
            "kickstarter", "cronut", "vibecession", "slow-carb", "direct-trade",
            "ramps", "ascot", "jianbing", "fingerstache", "flannel",
            "distillery", "four-dollar-toast", "mixtape", "biodiesel", "squid",
            "echo", "literally", "freegan", "scenester", "lomo",
            "intelligentsia", "tumeric", "portland", "cold-pressed", "taxidermy",
            # 50 - 74
            "subway-tile", "tilde", "tonx", "shabby-chic", "vaporware",
            "man-braid", "art-party", "ugh", "woke", "raclette",
            "readymade", "coloring-book", "VHS", "8-bit", "asymmetrical",
            "lyft", "raw-denim", "beard", "kitsch", "shabby-chic",
            "heirloom", "pitchfork", "XOXO", "truffaut", "paleo"
            # 75 - 99
            "master-cleanse", "poke", "authentic", "artisan", "hexagon",
            "ennui", "food-truck", "semiotics", "mood", "portland",
            "keytar", "pinterest", "tacos", "wayfarers", "poutine",
            "pickled", "gatekeep", "bicycle", "praxis", "DSA",
            "four-loko", "pok-pok-mukbang", "before-they-sold-out", "four-dollar-toast", "godard"
            ]

def seed_tags():
        i = 0
        while i < 100:
                new_tag = Tag(tag=tags[i])
                db.session.add(new_tag)
                db.session.commit()
                i += 1


def undo_tags():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.tags RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM tags")

    db.session.commit()
