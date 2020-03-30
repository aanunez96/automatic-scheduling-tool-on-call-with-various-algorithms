FROM python

# Installing python requirement
ADD ./api/requirements.txt /opt/project/app/requirements.txt
RUN pip install -r /opt/project/app/requirements.txt

WORKDIR /opt/project/app

EXPOSE 8000
