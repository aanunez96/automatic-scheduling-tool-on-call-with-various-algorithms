from django.core.management.base import BaseCommand
from planning.src.Composer import Composer
from planning.models import MessageQueue ,Parameters


class Command(BaseCommand):

    def handle(self, *args, **options):
        message_queue = MessageQueue.object.filter(state='pending')
        for message in message_queue:
            if message:
                composer = Composer(message)
                algorithm_student = Parameters.object.filter(key='alg_student').filter(message=message.id)
                algorithm_profesor = Parameters.object.filter(key='alg_profesor').filter(message=message.id)
                type_guard = Parameters.object.filter(key='guard').filter(message=message.id)
                date_student = Parameters.object.filter(key='date_student').filter(message=message.id)
                date_profesor = Parameters.object.filter(key='date_profesor').filter(message=message.id)
                guard = composer.compose(algorithm_profesor, algorithm_student, type_guard, date_profesor, date_student)

                if guard[0] != -1 and guard[1] != -1:
                    message.percent = 100
                    message.state = 'processed'
                    message.save()
                else:
                    message.state = 'error'
                    message.save()

