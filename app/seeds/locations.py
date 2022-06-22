from app.models import Location, db


def seed_locations():
    l1 = Location(
        trip_id=1, lat=21.315603, lng=-157.858093
    )
    l2 = Location(
        trip_id=2, lat=39.742043, lng=-104.991531
    )
    l3 = Location(
        trip_id=3, lat=35.652832, lng=139.839478
    )
    l4 = Location(
        trip_id=4, lat=27.687784, lng=86.731108
    )
    l5 = Location(
        trip_id=5, lat=51.509865, lng=-0.118092
    )
    l6 = Location(
        trip_id=6, lat=30.033333, lng=31.233334
    )
    l7 = Location(
        trip_id=7, lat=-13.163068, lng=-72.545128
    )
    l8 = Location(
        trip_id=8, lat= 64.128288, lng=-21.827774
    )
    l9 = Location(
        trip_id=9, lat=-33.865143, lng=151.209900
    )
    l10 = Location(
        trip_id=10, lat=1.290270, lng=103.851959
    )
    l11 = Location(
        trip_id=11, lat=37.983810, lng=23.727539
    )

    db.session.add(l1)
    db.session.add(l2)
    db.session.add(l3)
    db.session.add(l4)
    db.session.add(l5)
    db.session.add(l6)
    db.session.add(l7)
    db.session.add(l8)
    db.session.add(l9)
    db.session.add(l10)
    db.session.add(l11)


    db.session.commit()


def undo_locations():
    db.session.execute('TRUNCATE locations RESTART IDENTITY CASCADE;')
    db.session.commit()