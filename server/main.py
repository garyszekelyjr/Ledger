import csv
import eel

from sqlalchemy import create_engine, select, String
from sqlalchemy.orm import Session, declarative_base, Mapped, mapped_column

# ENGINE FOR SQLALCHEMY
engine = create_engine('sqlite+pysqlite:///db.sqlite')
Base = declarative_base()
# STORES LOGGED IN USER
user = None

Base.metadata.create_all(engine)
# SERVES CLIENT APPLICATION TO CLIENT
eel.init('www')

class User(Base):
    __tablename__ = 'user'

    id: Mapped[int] = mapped_column(primary_key=True)
    ledger: Mapped[str] = mapped_column(String, default='')

@eel.expose
def create(type, data):
    with Session(engine) as session:
        match (type):
            case 'category':
                session.add(models.Category(name=data['name']))
            case 'institution':
                session.add(models.Institution(name=data['name']))
            case 'account':
                session.add(models.Account(institution_id=data['institutionID'], type=data['type'], account_number=data['accountNumber']))
            case 'columnTransformation':
                session.add(models.ColumnTransformation(institution_id=data['institutionID'], raw=data['rawColumn'], clean=data['cleanColumn']))
            case 'categoryTransformation':
                session.add(models.CategoryTransformation(institution_id=data['institutionID'], raw=data['rawCategory'], category_id=data['cleanCategoryID']))
        session.commit()
    return read(type)


@eel.expose
def read(type):
    with Session(engine) as session:
        return {
            'transaction': [transaction.__dict__ for transaction in session.scalars(select(models.Transaction)).all()],
            'category': [category.__dict__ for category in session.scalars(select(models.Category)).all()],
            'institution': [institution.__dict__ for institution in session.scalars(select(models.Institution)).all()],
            'account': [account.__dict__ for account in session.scalars(select(models.Account)).all()],
            'columnTransformation': [transformation.__dict__ for transformation in session.scalars(select(models.ColumnTransformation)).all()],
            'categoryTransformation': [transformation.__dict__ for transformation in session.scalars(select(models.CategoryTransformation)).all()]
        }[type]


@eel.expose
def update(type, id, data):
    pass


@eel.expose
def delete(type, id):
    with Session(engine) as session:
        match(type):
            case 'category':
                session.delete(session.scalars(select(models.Category).where(models.Category.id == id)).one())
            case 'institution':
                session.delete(session.scalars(select(models.Institution).where(models.Institution.id == id)).one())
            case 'account':
                session.delete(session.scalars(select(models.Account).where(models.Account.id == id)).one())
            case 'columnTransformation':
                session.delete(session.scalars(select(models.ColumnTransformation).where(models.ColumnTransformation.id == id)).one())
            case 'categoryTransformation':
                session.delete(session.scalars(select(models.CategoryTransformation).where(models.CategoryTransformation.id == id)).one())
        session.commit()
    return read(type)

eel.start('')
