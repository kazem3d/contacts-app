from django.contrib import admin

from .models import Contact


from import_export.admin import ImportExportModelAdmin

@admin.register(Contact)
class ContactAdmin(ImportExportModelAdmin):
    search_fields = ('name','job') 


# class ContactAdmin(admin.ModelAdmin):
#     list_filter = ('title',)  # Add 'title' to list_filter

# admin.site.register(YourModel, YourModelAdmin)