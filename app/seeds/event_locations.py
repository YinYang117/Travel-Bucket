from app.models import Event_location, db


def seed_event_locations():
    l1 = Event_location(
        event_id=1, info="Beach Party", location='Kūhiō Beach', address='2453 Kalakaua Ave', city='Honolulu', state='HI', country='USA address', lat=21.280693, lng=-157.834549
    )
    l2 = Event_location(
        event_id=2, info="2-Day CoastLine Tour", location='Kailua Beach Park', address='526 Kawailoa Rd', city='Kailua', state='HI', country='USA address', lat=21.3991667, lng=-157.7263889
    )
    l3 = Event_location(
        event_id=3, info="Dinner Plans!", location='Waikīkī Grand Hotel', address='134 Kapahulu Ave', city='Honolulu', state='HI', country='USA address', lat=21.271931, lng=-157.821655
    )
    l4 = Event_location(
        event_id=4, info="Cooking Class", location='The Royal Hawaiian', address='2259 Kalakaua Ave', city='Honolulu', state='HI', country='USA address', lat=21.277620, lng=-157.829147
    )
    l5 = Event_location(
        event_id=5, info="Morning Hike", location='Diamond Head Crater Hike', address='Kapahulu', city='Honolulu', state='HI', country='USA address', lat=21.274380, lng=-157.816060
    )
    l6 = Event_location(
        event_id=6, info="Dinner in Denver", location='Corinne Restaurant', address='1455 California St', city='Denver', state='CO', country='USA address', lat=39.744060, lng=-104.993720
    )


    db.session.add(l1)
    db.session.add(l2)
    db.session.add(l3)
    db.session.add(l4)
    db.session.add(l5)
    db.session.add(l6)


    db.session.commit()


def undo_event_locations():
    db.session.execute('TRUNCATE event_locations RESTART IDENTITY CASCADE;')
    db.session.commit()