from app.models import db, User, Album, Comment, Photo, tags_to_photos, Tag, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_users():
    #STARTER USER SEED DATA:
    # demo = User(
    #     username='Demo', email='demo@aa.io', hashed_password='hashed_password')
    # marnie = User(
    #     username='marnie', email='marnie@aa.io', hashed_password='hashed_password')
    # bobbie = User(
    #     username='bobbie', email='bobbie@aa.io', hashed_password='hashed_password')

    # db.session.add(demo)
    # db.session.add(marnie)
    # db.session.add(bobbie)
    # db.session.commit()

    user1 = User(
    username = 'Demo',
    password='password',
    email = 'demo@aa.io',
    first_name = "Demo",
    last_name = "User",
    about = "Quis aliquip consectetur amet dolore veniam qui cupidatat consectetur ut voluptate."
    )
    user2 = User(
    username = "xXNitewingXx",
    password='password',
    email = "nitewing@gotham.com",
    first_name = "Dick",
    last_name = "Grayson",
    about = "Minim quis ullamco non qui et aute sunt labore aute enim pariatur duis"
    )
    user3 = User(
    username = "Oracle",
    password='password',
    email = "batgirl@gotham.com",
    first_name = "Barbara",
    last_name = "Gordon",
    about = "Officia ipsum consequat ad sunt qui. Cupidatat esse elit ad sint."
    )
    user4 = User(
    username = "Penguinz",
    password='password',
    email = "penguinz@arkham.com",
    first_name = "Oswald",
    last_name = "Cobblepot",
    about = "Fugiat proident laboris anim ex. Culpa consectetur aliquip magna esse. Laborum adipisicing cillum dolore quis et officia ullamco cupidatat magna laboris incididunt labore."
    )
    user5 = User(
    username = "Enigma",
    password='password',
    email = "riddler@arkham.com",
    first_name = "Edward",
    last_name = "Nygma",
    about = "Nostrud ut aute sint elit laborum. Minim laboris est velit anim aute sint cupidatat laboris. Sunt proident esse commodo deserunt excepteur est officia consectetur consectetur excepteur velit occaecat."
    )
    user6 = User(
    username = "Loves2Laugh",
    password='password',
    email = "joker@arkham.com",
    first_name = "Jack",
    last_name = "White",
    about = "Ut tempor enim proident anim dolor ullamco. Qui dolor occaecat labore nisi id reprehenderit elit sunt eu ipsum."
    )
    user7 = User(
    username = "RedHood",
    password='password',
    email = "redhood@gotham.com",
    first_name = "Jason",
    last_name = "Todd",
    about = "Sint occaecat est occaecat excepteur velit enim ipsum consectetur aute. Minim nostrud fugiat eiusmod voluptate ipsum qui esse magna sunt minim enim. Exercitation minim aute adipisicing pariatur culpa."
    )
    user8 = User(
    username = "RedRobin",
    password='password',
    email = "redRobin@gotham.com",
    first_name = "Tim",
    last_name = "Drake",
    about = "Ut dolor aliqua ut ex duis non consectetur velit laboris cupidatat tempor aliquip adipisicing. Amet duis aliqua amet magna excepteur. Dolor minim anim quis sint."
    )
    user9 = User(
    username = "BestRobinEver",
    password='password',
    email = "robin@gotham.com",
    first_name = "Damien",
    last_name = "Wayne",
    about = "Enim cillum ea deserunt veniam laborum voluptate aute dolor ipsum officia reprehenderit. Anim magna mollit duis quis aliqua id do pariatur fugiat sint ea et aute irure."
    )
    user10 = User(
    username = "BatDad",
    password='password',
    email = "batman@gotham.com",
    first_name = "Bruce",
    last_name = "Wayne",
    about = "Anim irure laboris laboris excepteur duis eiusmod aute."
    )

    db.session.add(user1)
    db.session.add(user2)
    db.session.add(user3)
    db.session.add(user4)
    db.session.add(user5)
    db.session.add(user6)
    db.session.add(user7)
    db.session.add(user8)
    db.session.add(user9)
    db.session.add(user10)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")

    db.session.commit()
