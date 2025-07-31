from django.contrib import admin

# Register your models here.

# Register your models here.
from apps.user.models.user import User,Profile,Zone
admin.site.register(User)
admin.site.register(Profile)
admin.site.register(Zone)