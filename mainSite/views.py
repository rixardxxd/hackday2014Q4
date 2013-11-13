from django.shortcuts import render

# Create your views here.

def landing(request):

    return render(request,'index.html')# Create your views here.
    #return make_response(open('templates/index.html').read())
    #return  send_file(BASE_DIR + 'static/mainSite/app/index.html')
