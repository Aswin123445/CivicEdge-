class AvatarService:

    @staticmethod
    def remove_avatar(user):
        profile = user.profile

        if not profile.avatar_url:
            return False  # nothing to delete

        # Later: delete from Cloudinary using public_id
        profile.avatar_url = None
        profile.save(update_fields=["avatar_url"])

        return True
