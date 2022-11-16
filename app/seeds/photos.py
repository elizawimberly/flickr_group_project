from dotenv import load_dotenv
load_dotenv()
from faker import Faker
from app.models import db, Photo, Tag, environment, SCHEMA
from app.seeds.tags import tags
import random
from datetime import datetime
fake = Faker()


today = str(datetime.now())

boolean = [ True, False ]


photo_lst = [

    # user 1
            # album 1
        dict(
            user_id = 1,
            album_id = 1,
            url = "https://cms-assets.tutsplus.com/cdn-cgi/image/width=850/uploads/users/1990/posts/34285/image/1.8.jpg",
            ),
        dict(
            user_id = 1,
            album_id = 1,
            url = "https://cc-prod.scene7.com/is/image/CCProdAuthor/lens-flare_P6_720x430?$pjpeg$&jpegSize=200&wid=720",
            ),
        dict(
            user_id = 1,
            album_id = 1,
            url = "http://www.picturecorrect.com/wp-content/uploads/2013/04/lens-flare-1.jpg",
            ),
        dict(
            user_id = 1,
            album_id = 1,
            url = "https://www.how2shout.com/wp-content/uploads/2018/05/How-to-prevent-lens-flare.jpg",
            ),
        dict(user_id = 1,
            album_id = 1,
            url = "https://expertphotography.b-cdn.net/wp-content/uploads/2019/01/lens-flare-photoshop-sunrise.jpg",
            ),
            # album 2
        dict(
            user_id = 1,
            album_id = 2,
            url = "https://images.ctfassets.net/3s5io6mnxfqz/2R5HMuKpKxz6HJxqKNwbur/61b55554c39d0a2a7be11c6d1641a6a2/AdobeStock_70441318.jpeg",
            ),
        dict(user_id = 1,
            album_id = 2,
            url = "https://www.digitional.com/wp-content/uploads/2018/12/LensFlareFilterAdded-736x408.jpg”",
            ),
        dict(
            user_id = 1,
            album_id = 2,
            url = "http://www.picturecorrect.com/wp-content/uploads/2013/04/lens-flare-landscape-photography.jpg",
            ),
        dict(user_id = 1,
            album_id = 2,
            url = "https://ipt.imgix.net/203076/x/0/",
            ),
        dict(user_id = 1,
            album_id = 2,
            url = "https://www.digital-photo-secrets.com/images/flickr/4795329839_aa86226748.jpg",
            ),

    # user 2
            # album 3
        dict(
            user_id = 2,
            album_id = 3,
            url = "https://ipt.imgix.net/203078/x/0/understanding-lens-flare-in-landscape-photography-5.jpg?auto=compress%2Cformat&ch=Width%2CDPR&dpr=1&ixlib=php-3.3.0&w=883",
            ),
        dict(
            user_id = 2,
            album_id = 3,
            url = "https://www.befunky.com/images/wp/wp-2016-05-Lens-Flare-Effect-1.jpg?auto=avif,webp&format=jpg&width=1136&crop=16:9",
            ),
        dict(
            user_id = 2,
            album_id = 3,
            url = "https://i.stack.imgur.com/tO2nQ.jpg",
            ),
        dict(
            user_id = 2,
            album_id = 3,
            url = "https://images.iphonephotographyschool.com/14472/1120/iPhone-Photos-Lens-Flare-7.jpg",
            ),
        dict(
            user_id = 2,
            album_id = 3,
            url = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4LP1AaZi-zXq4shB4AIQxKmDWSUNWd874xw&usqp=CAU",
            ),
            # album 4
        dict(
            user_id = 2,
            album_id = 4,
            url = "https://ipt.imgix.net/203080/x/0/understanding-lens-flare-in-landscape-photography-7.jpg?auto=compress%2Cformat&ch=Width%2CDPR&dpr=1&ixlib=php-3.3.0&w=883",
            ),
        dict(
            user_id = 2,
            album_id = 4,
            url = "https://shotkit.com/wp-content/uploads/2020/11/lens-flare-example-2.jpg",
            ),
        dict(
            user_id = 2,
            album_id = 4,
            url = "https://images.unsplash.com/photo-1438763470126-9839d421ad68?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEwfHx8ZW58MHx8fHw%3D&w=1000&q=80",
            ),
        dict(
            user_id = 2,
            album_id = 4,
            url = "https://llandscapes-10674.kxcdn.com/wp-content/uploads/2017/08/25957219280_3fd85bbca2_z.jpg",
            ),
        dict(
            user_id = 2,
            album_id = 4,
            url = "https://sggphoto.files.wordpress.com/2022/06/dewdrop-and-lens-flare-brickyard-062622-900.jpg?w=584",
            ),

    # user 3
            # album 5
        dict(
            user_id = 3,
            album_id = 5,
            url = "https://images.unsplash.com/photo-1542317408-e53f9677deb8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fGZsYXJlfGVufDB8fDB8fA%3D%3D&w=1000&q=80",
            ),
        dict(
            user_id = 3,
            album_id = 5,
            url = "https://www.coreldraw.com/static/cdgs/images/pages/seo/tips/photo/photo-effects/add-lens-flare-effect/add-lens-flare-effect-og.jpg",
            ),
        dict(
            user_id = 3,
            album_id = 5,
            url = "https://www.thephotoargus.com/wp-content/uploads/2014/03/15-lens-flare-photography.jpg",
            ),
        dict(
            user_id = 3,
            album_id = 5,
            url = "https://abeautifulmess.com/wp-content/uploads/2019/01/how-to-create-bokeh-750x533.jpg",
            ),
        dict(
            user_id = 3,
            album_id = 5,
            url = "https://media.wired.com/photos/5db9aa90c96358000859e634/master/w_1600%2Cc_limit/photo_cooley_explosions_2.jpg",
            ),
            # album 6
        dict(
            user_id = 3,
            album_id = 6,
            url = "https://images.ctfassets.net/3s5io6mnxfqz/2R5HMuKpKxz6HJxqKNwbur/61b55554c39d0a2a7be11c6d1641a6a2/AdobeStock_70441318.jpeg",
            ),
        dict(
            user_id = 3,
            album_id = 6,
            url = "https://ipt.imgix.net/203077/x/0/understanding-lens-flare-in-landscape-photography-3.jpg?auto=compress%2Cformat&ch=Width%2CDPR&dpr=1&ixlib=php-3.3.0&w=883",
            ),
        dict(
            user_id = 3,
            album_id = 6,
            url = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjmlujO84MNeVqNwSjUvY3XI_FoQfHTfT_zA&usqp=CAU",
            ),
        dict(
            user_id = 3,
            album_id = 6,
            url = "https://shotkit.com/wp-content/uploads/2020/11/lens-flare-example-2.jpg",
            ),
        dict(
            user_id = 3,
            album_id = 6,
            url = "https://pe-images.s3.amazonaws.com/photo-effects/cc/lens-flare/photoshop-lens-flare-effect.jpg",
            ),

    # user 4
            # album 7
        dict(
            user_id = 4,
            album_id = 7,
            url = "https://cdn.shopify.com/s/files/1/0163/6622/files/How_to_capture_starburst_in_photos.jpg?v=1590519811",
            ),
        dict(
            user_id = 4,
            album_id = 7,
            url = "https://www.befunky.com/images/wp/wp-2022-08-GoldenHourFeatured-2.jpg?auto=avif,webp&format=jpg&width=1200&crop=16:9",
            ),
        dict(
            user_id = 4,
            album_id = 7,
            url = "https://www.bwillcreative.com/wp-content/uploads/2020/01/TofinoBoardwalkSunflare.jpg",
            ),
            #34
        dict(
            user_id = 4,
            album_id = 7,
            url = "https://images.ctfassets.net/3s5io6mnxfqz/jMkr5pxPzCed17AGRkzgA/b981f3e42de324b6ec82a4297fec29f1/AdobeStock_80110092.jpeg",
            ),
        dict(
            user_id = 4,
            album_id = 7,
            url = "https://llandscapes-10674.kxcdn.com/wp-content/uploads/2017/08/29770065640_57d938cbc2_z1.jpg.webp",
            ),
            # album 8
        dict(
            user_id = 4,
            album_id = 8,
            url = "https://media.macphun.com/img/uploads/customer/blog/1549274448/15492767275c5816375cebf2.62014242.jpg?q=85&w=1680",
            ),
        dict(
            user_id = 4,
            album_id = 8,
            url = "https://www.thephotoargus.com/wp-content/uploads/2014/03/25-lens-flare-photography.jpg",
            ),
        dict(
            user_id = 4,
            album_id = 8,
            url = "https://backlightblog.com/images/2021/08/lens-flare-example.jpeg",
            ),
        dict(
            user_id = 4,
            album_id = 8,
            url = "https://cc-prod.scene7.com/is/image/CCProdAuthor/lens-flare_P4b_720x475?$pjpeg$&jpegSize=200&wid=720",
            ),
        dict(
            user_id = 4,
            album_id = 8,
            url = "https://www.lunapic.com/editor/premade/lensflare.gif",
            ),

    # user 5
            # album 9
        dict(
            user_id = 5,
            album_id = 9,
            url = "https://media.newyorker.com/photos/5952a9f17d94e97fee0c5d75/master/w_1600%2Cc_limit/Jerome%2520Sessini%2520Golden%2520Hour%2520SEJ2017030G0624Golden%2520Hour3043.JPG",
            ),
            #42
        dict(
            user_id = 5,
            album_id = 9,
            url = "https://www.digitional.com/wp-content/uploads/2018/12/LensFlareFilterAdded-736x408.jpg",
            ),
        dict(
            user_id = 5,
            album_id = 9,
            url = "http://cache.boston.com/multimedia/sports/bigshots/flares/bs2.jpg",
            ),
        dict(
            user_id = 5,
            album_id = 9,
            url = "https://smartphone-photography.com/wp-content/uploads/2021/11/Golden-Hour-close-to-home.webp?ezimgfmt=rs:372x289/rscb37/ngcb37/notWebP",
            ),
        dict(
            user_id = 5,
            album_id = 9,
            url = "https://wfin.com/wp-content/uploads/2022/11/park-district-oakwoods-800x445.jpg",
            ),
            # album 10
        dict(
            user_id = 5,
            album_id = 10,
            url = "https://clicklovegrow.com/wp-content/uploads/2021/07/pam-gosenheimer-advanced-graduate.jpg",
            ),
        dict(
            user_id = 5,
            album_id = 10,
            url = "https://cdn.pixabay.com/photo/2021/03/25/19/30/headphones-6123966__340.jpg",
            ),
        dict(
            user_id = 5,
            album_id = 10,
            url = "https://cdn1.eyeem.com/thumb/05e294d2c5ff554de0d852e12fede3b55da821fd-1479815698343/w/800",
            ),
        dict(
            user_id = 5,
            album_id = 10,
            url = "https://natureconservancy-h.assetsadobe.com/is/image/content/dam/tnc/nature/en/photos/Grand_Prize_Tyler_Schiffman.jpg?crop=0%2C2%2C2000%2C1328&wid=828&hei=550&scl=2.4154589371980677",
            ),
        dict(
            user_id = 5,
            album_id = 10,
            url = "https://static.bhphotovideo.com/explora/sites/default/files/topshot_89.jpg",
            ),

    # user 6
            # album 11
        dict(
            user_id = 6,
            album_id = 11,
            url = "https://image.shopmoment.com/resizer?quality=75&fit=cover&width=1440&gravityX=0.5&gravityY=0.5&height=810&image=https://image.shopmoment.com/general/momentist/IMG_7754.jpg",
            ),
        dict(
            user_id = 6,
            album_id = 11,
            url = "https://www.adorama.com/alc/wp-content/uploads/2020/05/bokeh-lens-feature-1024x576.jpg",
            ),
            #53
        dict(
            user_id = 6,
            album_id = 11,
            url = "https://cdn.shopify.com/s/files/1/0163/6622/files/How_to_capture_starburst_in_photos.jpg?v=1590519811",
            ),
            #54
        dict(
            user_id = 6,
            album_id = 11,
            url = "https://media.macphun.com/img/uploads/macphun/blog/1278/lensflaretips.jpg",
            ),
        dict(
            user_id = 6,
            album_id = 11,
            url = "https://d2culxnxbccemt.cloudfront.net/pop/content/uploads/pop/2016/05/13154557/Starburst-5-web.jpg",
            ),
            # album 12
        dict(
            user_id = 6,
            album_id = 12,
            url = "https://www.nationalparktrips.com/wp-content/uploads/2021/01/YO-photographer-sunrise-halfdome-2_DP_2400.jpg",
            ),
        dict(
            user_id = 6,
            album_id = 12,
            url = "https://media.wired.com/photos/595493bcbe605811a2fdd6f7/master/pass/Stuart_Palley-20140615_13.jpg",
            ),
        dict(
            user_id = 6,
            album_id = 12,
            url = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEEksuqRMqhd6T7qgDJzGnghSmaAsrMP7Hpw&usqp=CAU",
            ),
        dict(
            user_id = 6,
            album_id = 12,
            url = "https://www.bwillcreative.com/sun-flare-photography-guide/rolleylakefallsautumnorton/",

            ),
        dict(
            user_id = 6,
            album_id = 12,
            url = "https://photographycourse-assets.s3.amazonaws.com/wp-content/uploads/2022/04/12170624/reflected-photography.jpg",
            ),

    # user 7
            # album 13
        dict(
            user_id = 7,
            album_id = 13,
            url = "https://ipt.imgix.net/203085/x/0/understanding-lens-flare-in-landscape-photography-12.jpg?auto=compress%2Cformat&ch=Width%2CDPR&dpr=1&ixlib=php-3.3.0&w=883",
            ),
        dict(
            user_id = 7,
            album_id = 13,
            url = "https://photos.smugmug.com/My-Homepage-Slideshow/i-p2sPCp2/0/fc450c8d/XL/1906-3951-jpp-XL.jpg",
            ),
        dict(
            user_id = 7,
            album_id = 13,
            url = "https://go-flare.com/media/1f/56/fa/1643359154/Flare-Lifestyle-Bordeaux21-miriamjoanna-300dpi-DSC04665_cut.jpg",
            ),
        dict(
            user_id = 7,
            album_id = 13,
            url = "https://giggster.com/guide/static/bc79b8b3ed8d4afa040be1f3e37129bd/c60f1/change-color-using-color-range-cover2.jpg",
            ),
        dict(
            user_id = 7,
            album_id = 13,
            url = "https://gridfiti.com/wp-content/uploads/2018/04/Gridfiti_Blog_FairyLightsPhotography_Idea_LeadingLines.jpg",
            ),
            # album 14
            #66
        dict(
            user_id = 7,
            album_id = 14,
            url = "https://ipt.imgix.net/203076/x/0/",
            ),
        dict(
            user_id = 7,
            album_id = 14,
            url = "https://imageio.forbes.com/specials-images/imageserve/5f8335467dc0e08caa7f88db/Close-Up-Photographer-of-the-Year-a-small-yellow-insect-walking-on-frozen-water-/960x0.jpg?height=400&width=711&fit=bounds",
            ),
        dict(
            user_id = 7,
            album_id = 14,
            url = "https://photographycourse-assets.s3.amazonaws.com/wp-content/uploads/2022/04/12165534/night-portraiture-photo.jpg",
            ),
        dict(
            user_id = 7,
            album_id = 14,
            url = "https://images.squarespace-cdn.com/content/v1/5474a601e4b0e7532cee04e6/1587429332418-R5RP7KZ0WVUHAZO5PBLW/%2B235A5712-Edit-Edit.jpg?format=2500w",
            ),
        dict(
            user_id = 7,
            album_id = 14,
            url = "https://cdn.theatlantic.com/thumbor/9L2q9D4OI_6tOUe3lER_SdYUHNI=/900x600/media/img/photo/2022/08/winners-of-the-nature-ttl-photograp/a05_u16_ru/original.jpg",
            ),

    # user 8
            # album 15
        dict(
            user_id = 8,
            album_id = 15,
            url = "https://capturetheatlas.com/wp-content/uploads/2025/03/star-trails-mystery.jpg",
            ),
        dict(
            user_id = 8,
            album_id = 15,
            url = "https://drscdn.500px.org/photo/63813707/m%3D900/b12c805734a2355e3d3d9d598f2d0c3c",
            ),
        dict(
            user_id = 8,
            album_id = 15,
            url = "https://inspgr.id/app/uploads/2019/08/category-photography-hero.jpg",
            ),
        dict(
            user_id = 8,
            album_id = 15,
            url = "https://inspgr.id/app/uploads/2022/08/photography-paolo-barretta-feature.jpg",
            ),
        dict(
            user_id = 8,
            album_id = 15,
            url = "https://expertphotography.com/wp-content/uploads/2018/04/lighting-fairy-lights.jpg",
            ),
            # album 16
        dict(
            user_id = 8,
            album_id = 16,
            url = "https://wizousa.org/wp-content/uploads/2016/03/pexels-photo-1248023.jpeg",
            ),
        dict(
            user_id = 8,
            album_id = 16,
            url = "https://media.newyorker.com/photos/5964ede513637614d12a9bef/master/w_1600%2Cc_limit/Campbell-The%2520Island%2520of%2520the%2520Colorblind_05.jpg",
            ),
        dict(
            user_id = 8,
            album_id = 16,
            url = "https://cdn.shopify.com/s/files/1/0173/9358/files/Perspective_Photography_4_1024x1024.jpg?v=1560282075”,",
            ),
        dict(
            user_id = 8,
            album_id = 16,
            url = "https://metro.co.uk/wp-content/uploads/2022/11/SEI_132312949-29d9.jpg?quality=90&strip=all&zoom=1&resize=480%2C360",
            ),
        dict(
            user_id = 8,
            album_id = 16,
            url = "https://cdn.shopify.com/s/files/1/0003/6847/6220/articles/LondonFallsSilent_2048x.png?v=1603378357",
            ),

    # user 9
            # album 17
        dict(
            user_id = 9,
            album_id = 17,
            url = "https://imgix.bustle.com/uploads/image/2018/10/18/6f357ee1-ccb0-4704-b694-03ffe14624d8-lrg_dsc03533.JPG?w=414&h=277&fit=crop&crop=faces&auto=format%2Ccompress",
            ),
        dict(
            user_id = 9,
            album_id = 17,
            url = "https://pyxis.nymag.com/v1/imgs/059/18d/79d5061a1c6c4c9046511f8f08056e28cb.rsquare.w600.jpg",
            ),
        dict(
            user_id = 9,
            album_id = 17,
            url = "https://enviragallery.com/wp-content/uploads/2019/09/adventure-camp-colors-1549122.jpg",
            ),
        dict(
            user_id = 9,
            album_id = 17,
            url = "https://images.ctfassets.net/4f3rgqwzdznj/5QTjqBlaN6Dq0DvbtlsPsF/e2298465c3920303b0e289a47e8e4538/lupus-sun-sensitivity.jpg",
            ),
        dict(
            user_id = 9,
            album_id = 17,
            url = "https://www.ephotozine.com/articles/3-top-tips-on-controlling-and-using-flare-in-your-photographs-4752/images/DSCF1060.jpg",
            ),
            # album 18
        dict(
            user_id = 9,
            album_id = 18,
            url = "https://www.dpreview.com/files/p/articles/6475129320/J08.17Werewolf045_1.jpeg",
            ),
        dict(
            user_id = 9,
            album_id = 18,
            url = "https://www.nfi.edu/wp-content/uploads/2021/06/pexels-matheus-bertelli-573298-1024x648.jpg",
            ),
        dict(
            user_id = 9,
            album_id = 18,
            url = "https://media.wired.com/photos/595493c4be605811a2fdd6f9/master/w_2000,h_1335,c_limit/Stuart_Palley-20140615_01.jpeg",
            ),
        dict(
            user_id = 9,
            album_id = 18,
            url = "https://photos.smugmug.com/photos/i-rhG4Xr6/1/XL/i-rhG4Xr6-XL.jpg",
            ),
        dict(
            user_id = 9,
            album_id = 18,
            url = "https://shotkit.com/wp-content/uploads/2020/10/2-crystal-ball-photography.jpg",
            ),

    # user 10
            # album 19
        dict(
            user_id = 10,
            album_id = 19,
            url = "https://www.befunky.com/images/prismic/feddcb85afacb4b0b0e83c4ea916212a9bb2f3af_landing-photo-effects-features-2.jpg?auto=avif,webp&format=jpg&width=581",
            ),
        dict(
            user_id = 10,
            album_id = 19,
            url = "https://media.macphun.com/img/uploads/customer/blog/1549274448/15492773835c5818c74a6fa9.27652540.jpg?q=85&w=1680",
            ),
        dict(
            user_id = 10,
            album_id = 19,
            url = "https://www.befunky.com/images/site/dashboard/lens-flare.png?auto=avif,webp",
            ),
        dict(
            user_id = 10,
            album_id = 19,
            url = "https://www.thephotoargus.com/wp-content/uploads/2019/09/Sigurdsson4.jpg",
            ),
        dict(
            user_id = 10,
            album_id = 19,
            url = "https://cdn.fstoppers.com/styles/large-16-9/s3/lead/2022/05/ebbed2cd-cef9-4e2c-b07d-95b6655b243e.jpeg",
            ),
            # album 20
        dict(
            user_id = 10,
            album_id = 20,
            url = "https://img.locationscout.net/images/2020-08/bruern-sunflower-fields-united-kingdom-py4k_b.jpeg",
            ),
        dict(
            user_id = 10,
            album_id = 20,
            url = "https://learn.corel.com/wp-content/uploads/2022/02/hardest-1985097_1280-1024x683.jpg",
            ),
        dict(
            user_id = 10,
            album_id = 20,
            url = "https://images.unsplash.com/photo-1617058998642-5ce6c139754b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fG1vZGVsJTIwcGhvdG9ncmFwaHl8ZW58MHx8MHx8&w=1000&q=80",
            ),
        dict(
            user_id = 10,
            album_id = 20,
            url = "https://media.newyorker.com/photos/5964e5ea95a1ad492aa3d597/master/w_1600%2Cc_limit/Campbell-TIOTC_Book_IR_SDW_21.jpg",
            ),
            #100
        dict(
            user_id = 10,
            album_id = 20,
            url = "https://neocha-content.oss-cn-hongkong.aliyuncs.com/wp-content/uploads/sites/2/2016/01/SamAlive15.jpg",
            ),
        #     #101
        # dict(
        #     user_id = 1,
        #     url = 'https://railphoto-art.org/wp-content/uploads/2022/07/1st-390-scaled.jpg',
        #     ),
        #     #102
        # dict(
        #     user_id = 1,
        #     url = 'https://cdn.contrastly.com/wp-content/uploads/19-photography-tips-lens-flare.jpg',
        #     ),
        #     #103
        # dict(
        #     user_id = 1,
        #     url = "https://learn.corel.com/wp-content/uploads/2022/02/hardest-1985097_1280-1024x683.jpg",
        #     ),
        #     #104
        # dict(
        #     user_id = 1,
        #     url = 'https://mimeophotos.com/product_images/blog/tips-for-great-beach-photography-3.jpeg',
        #     ),




    # Extra
    #     dict(user_id = ,
    #             album_id = "",
    #             url = "https://borisfx-com-res.cloudinary.com/video/upload/v1643236894/Optics%20Product%20Page/Optics%202022%20Product%20Page%20Images/Video%20Loops/Forest_Landscape_Loop.png",
    #           ),
        ]

extra_1 = Photo(
    user_id = 1,
    url = 'https://railphoto-art.org/wp-content/uploads/2022/07/1st-390-scaled.jpg',
    name = fake.sentence(),
    about = fake.text(),
    taken_on = fake.date_time(),
    private = random.choice(boolean),
    created_at = today,
)

extra_2 = Photo(
    user_id = 1,
    url = 'https://cdn.contrastly.com/wp-content/uploads/19-photography-tips-lens-flare.jpg',
    name = fake.sentence(),
    about = fake.text(),
    taken_on = fake.date_time(),
    private = random.choice(boolean),
    created_at = today,
)

extra_3 = Photo(
    user_id = 1,
    url = 'https://www.dropicts.com/wp-content/uploads/sun-flare-photography-1024x574.jpg',
    name = fake.sentence(),
    about = fake.text(),
    taken_on = fake.date_time(),
    private = random.choice(boolean),
    created_at = today,
)

extra_4 = Photo(
    user_id = 1,
    url ='https://mimeophotos.com/product_images/blog/tips-for-great-beach-photography-3.jpeg',
    name = fake.sentence(),
    about = fake.text(),
    taken_on = fake.date_time(),
    private = random.choice(boolean),
    created_at = today,
)


def seed_photos():
    i = 0
    while i < 100:
            tag_lst = []
            j = 0
            while j < 5:
                    tagName = tags[random.randrange(100)]
                    tag = Tag.query.filter_by(tag = tagName).first()
                    if tag not in tag_lst:
                        tag_lst.append(tag)
                    j += 1
            new_photo = Photo(
                            user_id = photo_lst[i]["user_id"],
                            album_id = photo_lst[i]["album_id"],
                            url = photo_lst[i]["url"],
                            name = fake.sentence(),
                            about = fake.text(),
                            taken_on = fake.date_time(),
                            private = random.choice(boolean),
                            created_at = today,
                            )
            db.session.add(new_photo)
            db.session.commit()
            new_photo.tags = tag_lst
            i += 1
    #new photos here
    db.session.add(extra_1)
    db.session.add(extra_2)
    db.session.add(extra_3)
    db.session.add(extra_4)
    db.session.commit()



def undo_photos():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.photos RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM photos")

    db.session.commit()
