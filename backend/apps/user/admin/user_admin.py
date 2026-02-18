from django.contrib import admin
from apps.user.models.user import User, Profile, Zone


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    pass


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    pass


@admin.register(Zone)
class ZoneAdmin(admin.ModelAdmin):
    pass
