from django.core.management.base import BaseCommand
from planning.src.Composer import Composer
from planning.models import MessageQueue ,Parameters


class Command(BaseCommand):

    def handle(self, *args, **options):
        message_queue = MessageQueue.object.filter(state='pending')
        for massage in message_queue:
            if massage:
                massage.state = 'processing'
                composer = Composer(massage)
                #algorithm_student = Parameters.object.filter(type_guard='S').filter(message=message_queue) if Parameters.object.filter(type_guard='S').filter(message=message_queue) else False
                #algorithm_profesor = Parameters.object.filter(type_guard='S').filter(message=message_queue) if Parameters.object.filter(type_guard='P').filter(message=message_queue) else False
                guard = composer.compose(False, False)

                if guard[0] != -1 and guard[1] != -1:
                    massage.percent = 100
                    massage.state = 'processed'
                    massage.save()
                else:
                    massage.state = 'error'
                    massage.save()

