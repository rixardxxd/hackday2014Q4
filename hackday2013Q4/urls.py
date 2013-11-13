from django.conf.urls import patterns, include, url

# Uncomment the next two lines to enable the admin:
from django.contrib import admin

from mainSite import views
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'hackday2013Q4.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', include(admin.site.urls)),
    url(r'^$', views.landing, name='landing'),
)
