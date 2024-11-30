from django.db import models

class Contact(models.Model):
    name = models.CharField(max_length=256)
    job = models.CharField(max_length=256)
    int_phone = models.CharField(max_length=256)
    out_phone = models.CharField(max_length=256,blank=True,null=True)
    ip_phone = models.CharField(max_length=256,blank=True,null=True)
    fax = models.CharField(max_length=256,blank=True,null=True)
    mobile = models.CharField(max_length=256,blank=True,null=True)

    def __str__(self) -> str:
        return self.name
    
