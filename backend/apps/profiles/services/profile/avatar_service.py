import cloudinary.uploader
from shared.cloudinary_transformation import cloudinary_transformation_avatar
class AvatarService:

    @staticmethod
    def upload_avatar(file, user):
        result = cloudinary.uploader.upload(
            file,
            folder=f"avatars/users/{user.pk}",
            public_id="avatar",
            overwrite=True,
            resource_type="image",
            transformation=cloudinary_transformation_avatar
        )
        result_url = result["secure_url"]
        profile = user.profile
        profile.avatar_url = result_url
        profile.save(update_fields=["avatar_url"])

        return result_url
