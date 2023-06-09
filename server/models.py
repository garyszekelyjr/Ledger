from typing import List
from sqlalchemy import ForeignKey, Text, Integer, Float
from sqlalchemy.orm import declarative_base, Mapped, mapped_column, relationship
from sqlalchemy.schema import UniqueConstraint

Base = declarative_base()


class Transaction(Base):
    __tablename__ = 'transaction'

    id: Mapped[int] = mapped_column(primary_key=True)
    amount: Mapped[float] = mapped_column(Float, default=0.0)
    date: Mapped[str] = mapped_column(Text, default='')
    description: Mapped[str] = mapped_column(Text, default='')

    account_id: Mapped[int] = mapped_column(ForeignKey('account.id'))
    account: Mapped['Category'] = relationship(back_populates='transactions', viewonly=True)
    category_id: Mapped[int] = mapped_column(ForeignKey('category.id'), default=0)
    category: Mapped['Category'] = relationship(back_populates='transactions', viewonly=True)

    __table_args__ = (UniqueConstraint('amount', 'date', 'description'),)


class Category(Base):
    __tablename__ = 'category'

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(Text)

    transformations: Mapped[List['CategoryTransformation']] = relationship()
    transactions: Mapped[List['Transaction']] = relationship()\



class Institution(Base):
    __tablename__ = 'institution'

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(Text)

    accounts: Mapped[List['Account']] = relationship()
    column_transformations: Mapped[List['ColumnTransformation']] = relationship()
    category_transformations: Mapped[List['CategoryTransformation']] = relationship()


class Account(Base):
    __tablename__ = 'account'

    id: Mapped[int] = mapped_column(primary_key=True)
    type: Mapped[str] = mapped_column(Text)
    account_number: Mapped[int] = mapped_column(Integer)

    institution_id: Mapped[int] = mapped_column(ForeignKey('institution.id'))
    institution: Mapped['Institution'] = relationship(back_populates='accounts', viewonly=True)

    transactions: Mapped[List['Transaction']] = relationship()


class ColumnTransformation(Base):
    __tablename__ = 'column_transformation'

    id: Mapped[int] = mapped_column(primary_key=True)
    raw: Mapped[str] = mapped_column(Text)
    clean: Mapped[str] = mapped_column(Text)

    institution_id: Mapped[int] = mapped_column(ForeignKey('institution.id'))
    institution: Mapped['Institution'] = relationship(back_populates='column_transformations', viewonly=True)


class CategoryTransformation(Base):
    __tablename__ = 'category_transformation'

    id: Mapped[int] = mapped_column(primary_key=True)
    raw: Mapped[str] = mapped_column(Text)

    institution_id: Mapped[int] = mapped_column(ForeignKey('institution.id'))
    institution: Mapped['Institution'] = relationship(back_populates='category_transformations', viewonly=True)
    category_id: Mapped[int] = mapped_column(ForeignKey('category.id'))
    category: Mapped['Category'] = relationship(back_populates='transformations')
