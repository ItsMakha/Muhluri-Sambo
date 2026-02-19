from django.shortcuts import render

# Create your views here.
def home(request):
    return render(request, 'muhluri_portfolio/index.html')
