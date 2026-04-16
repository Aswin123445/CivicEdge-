from rest_framework.pagination import PageNumberPagination


class ForumCommentPagination(PageNumberPagination):
    page_size = 15
    page_size_query_param = "limit"