from django.shortcuts import render
from django.core.files.storage import FileSystemStorage
from wallpapers.models import ImageFile
import uuid
import os

def main(request):
    imglists = ImageFile.objects.all()
    values = {'imagelist':imglists}
    return render(request,'wallpapers/main.html',values)


def simple_upload(request):
    # Generate random filename
    rndfname = str(uuid.uuid4())
    if request.method == 'POST' and request.FILES['myfile']:
        myfile = request.FILES['myfile']
        rndfname+=os.path.splitext(myfile.name)[1]
        fs = FileSystemStorage()
        filename = fs.save(rndfname, myfile)
        img = ImageFile(filename=rndfname,category=0)
        img.save()
        uploaded_file_url = fs.url(filename)
        return render(request, 'wallpapers/simple_upload.html', {
            'uploaded_file_url': uploaded_file_url
        })
    return render(request, 'wallpapers/simple_upload.html')    