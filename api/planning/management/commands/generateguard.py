from django.core.management.base import BaseCommand
from planning.src.Composer import Composer
from planning.models import MessageQueue, Parameters
from datetime import datetime
import pytz


class Command(BaseCommand):

    def handle(self, *args, **options):
        message_queue = MessageQueue.object.filter(state='pending')
        for message in message_queue:
            if message:
                composer = Composer(message)
                try:
                    date_student = Parameters.object.filter(key='date_student').get(message=message.id).value
                except Parameters.DoesNotExist:
                    date_student = False
                try:
                    date_profesor = Parameters.object.filter(key='date_profesor').get(message=message.id).value
                except Parameters.DoesNotExist:
                    date_profesor = False
                try:
                    type_guard = Parameters.object.filter(key='guard').get(message=message.id).value
                except (Parameters.MultipleObjectsReturned, Parameters.DoesNotExist):
                    type_guard = False
                algorithm_student = Parameters.object.filter(key='alg_student').filter(message=message.id)
                algorithm_profesor = Parameters.object.filter(key='alg_profesor').filter(message=message.id)
                # havana = pytz.timezone('America/Havana')
                # date_input = havana.localize(datetime.strptime(date_profesor, '%Y-%m-%d')).date()
                # print(date_input)
                guard = composer.compose(algorithm_profesor, algorithm_student, type_guard, date_profesor, date_student)

                if guard[0] != -1 and guard[1] != -1:
                    message.percent = 100
                    message.state = 'processed'
                    message.save()
                else:
                    message.state = 'error'
                    message.save()

