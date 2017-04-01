from django.conf.urls import url
from wallpapers import views

urlpatterns = [
    url(r'^$',views.main,name="main"),
    url(r'^simpleupload/$',views.simple_upload,name="simple_upload"),    
]