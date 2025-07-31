# signals.py
from django.db.models.signals import post_save
from django.dispatch import receiver
from apps.user.models.user import Profile,User
@receiver(post_save, sender=User)
def create_profile_for_admin_and_solver(sender, instance, created, **kwargs):
    print('sinal triggered')
    user = instance
    # Only create profile on user creation
    if not created:
        return
    # Only for admin or solver
    if user.role not in ['admin', 'solver']:
        return
    # Prevent duplicate profile creation
    if hasattr(user, 'profile'):
        return
    # Create profile immediately
    Profile.objects.create(user=user)