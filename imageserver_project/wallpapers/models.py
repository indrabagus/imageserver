from django.db import models

class ImageFile(models.Model):
    CATEGORY = (
        (0,'Gaming Wallpapers'),
        (1,'Movie wallpapers'),
        (2,'Programing  wallpapers')
    )

    filename = models.CharField(max_length=255)
    description = models.CharField(max_length=255,default='No Description')
    category = models.SmallIntegerField(choices=CATEGORY,default=0)

    def __str__(self):
        return "ID: " + str(self.id) + " -- filename: " + self.filename 
    
    def save(self):
        self.filename = 'static/wallpapers/'+self.filename
        super().save()

    class Meta:
        verbose_name = 'PS4 Wallpapers Images'