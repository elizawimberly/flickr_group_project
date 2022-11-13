from app.models import db, User, Album, Comment, Photo, tags_to_photos, Tag, environment, SCHEMA
from datetime import datetime, date

def seed_comments():
  comment1 = Comment(
    user_id= 1,
    photo_id = 1,
    comment = 'Semiotics bitters DIY small batch, godard freegan PBR&B roof party'
    )

  comment2 = Comment(
    user_id= 1,
    photo_id = 1,
    comment = 'Banh mi 90'
    )

  comment3 = Comment(
    user_id= 1,
    photo_id = 1,
    comment = 'Next level fixie irony four loko meditation, tbh tumblr'
    )

  comment4 = Comment(
    user_id= 1,
    photo_id = 2,
    comment = 'Air plant locavore flannel meditation flexitarian next level portland pour-over cardigan keytar'
    )

  comment5 = Comment(
    user_id= 1,
    photo_id = 2,
    comment = 'Master cleanse kombucha brunch, pitchfork cliche jean shorts edison'
    )

  comment6 = Comment(
    user_id= 1,
    photo_id = 2,
    comment = "I'm baby umami viral vegan artisan tumblr flexitarian pour-over sriracha kitsch"
    )

  comment7 = Comment(
    user_id= 1,
    photo_id = 2,
    comment = 'Direct trade poutine authentic, aesthetic gentrify polaroid vegan four loko yr shoreditch'
    )

  comment8 = Comment(
    user_id= 2,
    photo_id = 1,
    comment = 'Brooklyn bicycle rights kombucha authentic'
    )


  comment9 = Comment(
    user_id= 2,
    photo_id = 1,
    comment = 'williamsburg copper mug hell of affogato woke authentic raclette mixtape literally distillery pok pok'
    )


  comment10 = Comment(
    user_id= 2,
    photo_id = 2,
    comment = 'Semiotics bitters DIY small batch, godard freegan PBR&B roof party williamsburg'
    )

  comment11 = Comment(
    user_id= 2,
    photo_id = 3,
    comment = 'Adaptogen four loko sustainable, pug fit stumptown meggings bodega boys'
    )

  comment1 = Comment(
    user_id= 3,
    photo_id = 1,
    comment = 'Tumblr copper mug sustainable vibecession'
    )

  comment12 = Comment(
    user_id= 3,
    photo_id = 1,
    comment = 'Flannel +1 yuccie, celiac etsy schlitz coloring book four loko cray bruh woke'
    )

  comment13 = Comment(
    user_id= 3,
    photo_id = 1,
    comment = 'Tumblr copper mug sustainable vibecession.'
    )

  comment14 = Comment(
    user_id= 4,
    photo_id = 1,
    comment = ' Twee 8-bit prism banh mi. Mixtape iPhone glossier, af scenester bicycle rights listicle bruh tumblr gatekeep unicorn'
    )

  comment15 = Comment(
    user_id= 4,
    photo_id = 1,
    comment = 'Next level fixie irony four loko meditation, tbh tumblr'
    )

  comment16 = Comment(
    user_id= 5,
    photo_id = 1,
    comment = 'Typewriter chambray PBR&B poutine.'
    )

  comment17 = Comment(
    user_id= 5,
    photo_id = 1,
    comment = 'Mumblecore trust fund sartorial 3 wolf moon scenester ennui gentrify bespoke iPhone yuccie raw denim Brooklyn.'
    )

  comment18 = Comment(
    user_id= 6,
    photo_id = 1,
    comment = 'Venmo meggings heirloom'
    )

  comment19 = Comment(
    user_id= 6,
    photo_id = 1,
    comment = 'unicorn williamsburg copper mug enamel pin'
    )

  comment1 = Comment(
    user_id= 7,
    photo_id = 1,
    comment = 'Air plant locavore flannel meditation flexitarian next level portland pour-over'
    )

  comment20 = Comment(
    user_id= 8,
    photo_id = 1,
    comment = 'cardigan keytar post-ironic palo santo'
    )


  comment21 = Comment(
    user_id= 8,
    photo_id = 1,
    comment = 'fingerstache literally street art'
    )


  comment22 = Comment(
    user_id= 9,
    photo_id = 1,
    comment = 'Cred letterpress chillwave'
    )


  comment23 = Comment(
    user_id= 9,
    photo_id = 1,
    comment = 'yr pok pok affogato small batch tousled freegan hexagon'
    )


  comment24 = Comment(
    user_id= 10,
    photo_id = 1,
    comment = 'Biodiesel blue bottle'
    )


  comment25 = Comment(
    user_id= 10,
    photo_id = 1,
    comment = 'bicycle rights, locavore whatever cold-pressed'
    )


  comment26 = Comment(
    user_id= 9,
    photo_id = 2,
    comment = 'chia bespoke jianbing wayfarers kogi letterpress selvage intelligentsia'
    )

  comment27 = Comment(
    user_id= 9,
    photo_id = 2,
    comment = 'Cred letterpress chillwave'
    )

  comment28 = Comment(
    user_id= 9,
    photo_id = 2,
    comment = 'Brooklyn bicycle rights kombucha'
    )


  comment29 = Comment(
    user_id= 1,
    photo_id = 2,
    comment = 'aesthetic gentrify polaroid vegan four loko yr shoreditch'
    )


  comment30 = Comment(
    user_id= 1,
    photo_id = 2,
    comment = 'craft beer woke gatekeep drinking vinegar marfa'
    )


  comment31 = Comment(
    user_id= 1,
    photo_id = 2,
    comment = 'Coloring book mustache sartorial viral PBR&B neutra'
    )


  comment32 = Comment(
    user_id= 1,
    photo_id = 3,
    comment = 'Twee 8-bit prism'
    )


  comment33 = Comment(
    user_id= 1,
    photo_id = 3,
    comment = 'Pok pok salvia 3 wolf moon'
    )


  comment34 = Comment(
    user_id= 1,
    photo_id = 3,
    comment = 'Brooklyn bicycle rights kombucha authentic'
    )


  comment35 = Comment(
    user_id= 1,
    photo_id = 4,
    comment = 'Same try-hard gochujang bushwick'
    )

  comment36 = Comment(
    user_id= 1,
    photo_id = 4,
    comment = 'williamsburg raclette'
    )

  comment37 = Comment(
    user_id= 1,
    photo_id = 4,
    comment = 'Air plant locavore flannel'
    )


  comment38 = Comment(
    user_id= 1,
    photo_id = 5,
    comment = 'meditation flexitarian next level portland'
    )


  comment39 = Comment(
    user_id= 1,
    photo_id = 5,
    comment = 'pour-over cardigan keytar post-ironic palo santo'
    )


  comment40 = Comment(
    user_id= 2,
    photo_id = 2,
    comment = 'fingerstache literally street art'
    )


  comment41 = Comment(
    user_id= 2,
    photo_id = 2,
    comment = 'Activated charcoal vape mumblecore etsy four loko'
    )


  comment42 = Comment(
    user_id= 3,
    photo_id = 3,
    comment = 'Fashion axe viral tbh'
    )


  comment43 = Comment(
    user_id= 3,
    photo_id = 3,
    comment = 'Cred letterpress chillwave'
    )


  comment44 = Comment(
    user_id= 4,
    photo_id = 3,
    comment = 'yr pok pok affogato small batch tousled freegan hexagon'
    )


  comment45 = Comment(
    user_id= 4,
    photo_id = 4,
    comment = '3 wolf moon actually franzen edison'
    )


  comment46 = Comment(
    user_id= 5,
    photo_id = 3,
    comment = 'hella chillwave flexitarian craft beer subway tile four dollar'
    )


  comment47 = Comment(
    user_id= 6,
    photo_id = 1,
    comment = 'locavore whatever cold-pressed chia bespoke'
    )

  comment48 = Comment(
    user_id= 7,
    photo_id = 1,
    comment = 'jianbing wayfarers kogi letterpress selvage intelligentsia'
    )


  comment49 = Comment(
    user_id= 7,
    photo_id = 2,
    comment = 'craft beer subway tile four'
    )


  comment50 = Comment(
    user_id= 8,
    photo_id = 1,
    comment = 'dollar toast banh mi'
    )


  comment51 = Comment(
    user_id= 8,
    photo_id = 2,
    comment = 'Chillwave meggings fashion axe'
    )


  comment52 = Comment(
    user_id= 9,
    photo_id = 1,
    comment = 'Activated charcoal vape'
    )


  comment53 = Comment(
    user_id= 9,
    photo_id = 2,
    comment = 'kogi letterpress selvage intelligentsia'
    )


  comment54 = Comment(
    user_id= 10,
    photo_id = 1,
    comment = 'Venmo meggings heirloom'
    )


  comment55 = Comment(
    user_id= 10,
    photo_id = 1,
    comment = 'Mumblecore trust fund sartorial 3 wolf'
    )

  comment56 = Comment(
    user_id= 10,
    photo_id = 2,
    comment = 'Mixtape iPhone glossier'
    )

  comment57 = Comment(
    user_id= 10,
    photo_id = 3,
    comment = 'Adaptogen four loko sustainable, pug fit stumptown'
    )


  comment58 = Comment(
    user_id= 6,
    photo_id = 1,
    comment = 'Coloring book mustache sartorial viral PBR&B neutra'
    )


  comment59 = Comment(
    user_id= 6,
    photo_id = 2,
    comment = 'Activated charcoal vape mumblecore etsy four loko'
    )


  comment60 = Comment(
    user_id= 7,
    photo_id = 3,
    comment = 'Cred letterpress chillwave'
    )


  comment61 = Comment(
    user_id= 7,
    photo_id = 4,
    comment = 'Air plant locavore flannel meditation'
    )


  comment62 = Comment(
    user_id= 8,
    photo_id = 4,
    comment = '3 wolf moon scenester ennui gentrify'
    )


  comment63 = Comment(
    user_id= 8,
    photo_id = 3,
    comment = 'Adaptogen four loko sustainable'
    )


  comment64 = Comment(
    user_id= 4,
    photo_id = 1,
    comment = 'Jean shorts brunch quinoa'
    )


  comment65 = Comment(
    user_id= 4,
    photo_id = 2,
    comment = 'Hammock fashion axe hashtag, jianbing church-key cronut polaroid poutine'
    )


  comment66 = Comment(
    user_id= 1,
    photo_id = 1,
    comment = 'Venmo meggings heirloom, unicorn williamsburg copper'
    )

  comment67 = Comment(
    user_id= 1,
    photo_id = 1,
    comment = 'keytar post-ironic palo santo'
    )

  comment68 = Comment(
    user_id= 3,
    photo_id = 3,
    comment = 'iPhone yuccie raw denim'
    )

  comment69 = Comment(
    user_id= 3,
    photo_id = 1,
    comment = 'fashion axe hashtag'
    )

  comment70 = Comment(
    user_id= 2,
    photo_id = 1,
    comment = 'Direct trade poutine authentic, aesthetic gentrify polaroid vegan four loko yr shoreditch'
    )

  all_comments = [
    comment1,
    comment2,
    comment3,
    comment4,
    comment5,
    comment6,
    comment7,
    comment8,
    comment9,
    comment10,
    comment11,
    comment12,
    comment13,
    comment14,
    comment15,
    comment16,
    comment17,
    comment18,
    comment19,
    comment20,
    comment21,
    comment22,
    comment23,
    comment24,
    comment25,
    comment26,
    comment27,
    comment28,
    comment29,
    comment30,
    comment31,
    comment32,
    comment33,
    comment34,
    comment35,
    comment36,
    comment37,
    comment38,
    comment39,
    comment40,
    comment41,
    comment42,
    comment43,
    comment44,
    comment45,
    comment46,
    comment47,
    comment48,
    comment49,
    comment50,
    comment51,
    comment52,
    comment53,
    comment54,
    comment55,
    comment56,
    comment57,
    comment58,
    comment59,
    comment60,
    comment61,
    comment62,
    comment63,
    comment64,
    comment65,
    comment66,
    comment67,
    comment68,
    comment69,
    comment70
  ]

  saved_comments = [db.session.add(comment) for comment in all_comments]
  db.session.commit()


def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM comments")

    db.session.commit()
