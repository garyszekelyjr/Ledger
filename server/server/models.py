from django.db import models


class Institution(models.Model):
    name = models.TextField()


class Account(models.Model):
    name = models.TextField()


class Transaction(models.Model):
    pass
