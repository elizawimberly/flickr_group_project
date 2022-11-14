from app.models import db, User, Album, Comment, Photo, tags_to_photos, Tag, environment, SCHEMA
from datetime import datetime, date

def seed_albums():

    date_str = str(datetime.now())

    # user1
    album1 = Album(
        user_id=1,
        name="Andromeda",
        about="The Chained Maiden",
        created_at=date_str
    )
    album2 = Album(
        user_id=1,
        name="Boötes",
        about="The Herdsman",
        created_at=date_str
    )

    # user2
    album3 = Album(
        user_id=2,
        name="Caelum",
        about="The Chisel",
        created_at=date_str
    )
    album4 = Album(
        user_id=2,
        name="Crux",
        about="The Southern Cross",
        created_at=date_str
    )

    # user3
    album5 = Album(
        user_id=3,
        name="Delphinus",
        about="The Dolphin",
        created_at=date_str
    )
    album6 = Album(
        user_id=3,
        name="Eridanus",
        about="The River",
        created_at=date_str
    )

    # user4
    album7 = Album(
        user_id=4,
        name="Fornax",
        about="The Furnace",
        created_at=date_str
    )
    album8 = Album(
        user_id=4,
        name="Grus",
        about="The Crane",
        created_at=date_str
    )

    # user5
    album9 = Album(
        user_id=5,
        name="Horologium",
        about="The Pendulum Clock",
        created_at=date_str
    )
    album10 = Album(
        user_id=5,
        name="Indus",
        about="The Indian",
        created_at=date_str
    )

    # user6
    album11 = Album(
        user_id=6,
        name="Lyra",
        about="The Harp",
        created_at=date_str
    )
    album12 = Album(
        user_id=6,
        name="Mensa",
        about="Table Mountain",
        created_at=date_str
    )

    # user7
    album13 = Album(
        user_id=7,
        name="Norma",
        about="The Level",
        created_at=date_str
    )
    album14 = Album(
        user_id=7,
        name="Orion",
        about="The Hunter",
        created_at=date_str
    )

    # user8
    album15 = Album(
        user_id=8,
        name="Pyxis",
        about="The Compass",
        created_at=date_str
    )
    album16 = Album(
        user_id=8,
        name="Reticulum",
        about="The Reticle",
        created_at=date_str
    )

    # user9
    album17 = Album(
        user_id=9,
        name="Sculptor",
        about="The Sculptor",
        created_at=date_str
    )
    album18 = Album(
        user_id=9,
        name="Telescopium",
        about="The Telescope",
        created_at=date_str
    )

    # user10
    album19 = Album(
        user_id=10,
        name="Ursa Major",
        about="The Small Bear",
        created_at=date_str
    )
    album20 = Album(
        user_id=10,
        name="Vela",
        about="The Sails of Argo Navis",
        created_at=date_str
    )

    all_albums = [
        album1,
        album2,
        album3,
        album4,
        album5,
        album6,
        album7,
        album8,
        album9,
        album10,
        album11,
        album12,
        album13,
        album14,
        album15,
        album16,
        album17,
        album18,
        album19,
        album20,
    ]

    saved_albums = [db.session.add(album) for album in all_albums]
    db.session.commit()


def undo_albums():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.albums RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM albums")

    db.session.commit()
