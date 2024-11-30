from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework.generics import get_object_or_404

from django.db.models import Count
from rest_framework import serializers
from django.db.models import Exists, OuterRef
from phonebook.models import Contact


class ListContactsAPIView(APIView):
    permission_classes = [AllowAny]

    class OutputSerializer(serializers.ModelSerializer):
        class Meta:
            model = Contact
            fields = ['id','name','job','int_phone','out_phone','ip_phone','fax','mobile',]

    def get(self, request):
        qs = Contact.objects.all()

        serializer = self.OutputSerializer(qs, many=True,context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)
