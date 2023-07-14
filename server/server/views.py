from django.shortcuts import render
from . import models


def create():
    pass


def read(request, type):
    match type:
        case 'institution':
            return models.Institution.objects.get()
        case 'account':
            return models.Account.objects.get()


def update():
    pass


def delete():
    pass
