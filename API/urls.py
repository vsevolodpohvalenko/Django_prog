from rest_framework import routers

from .api import FAQ_itemViewSet, LinkViewSet, FAQ_GroupViewSet, DocumentViewSet, \
    SectionViewSet, CategoryViewSet, Home_PageViewSet, MenuItemViewSet, ContentPageViewSet, ContactViewSet, \
    RequestForProposalsViewSet, PaymentMethodsViewSet, CompanyProfilePageViewSet

router = routers.DefaultRouter()
router.register('faq_group', FAQ_GroupViewSet, 'faq_group')
router.register('faq_item', FAQ_itemViewSet, 'faq_items')
router.register('Document', DocumentViewSet, 'Document')
router.register('CompanyProfilePage', CompanyProfilePageViewSet, 'CompanyProfilePage')
router.register('Section', SectionViewSet, 'Section')
router.register('Category', CategoryViewSet, 'Category')
router.register('Home_Page', Home_PageViewSet, 'Home_Page')
router.register('MenuItem', MenuItemViewSet, 'MenuItem')
router.register('ContentPage', ContentPageViewSet, 'ContentPage')
router.register('Contact', ContactViewSet, 'Contact')
router.register('RequestForProposals', RequestForProposalsViewSet, 'RequestForProposals')
router.register('link', LinkViewSet, 'Link')
router.register('PaymentMethods', PaymentMethodsViewSet, 'PaymentMethods')

urlpatterns = router.urls
