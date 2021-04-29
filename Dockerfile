FROM ubuntu:20.04

RUN apt-get update && \
apt-get install -y python3-pip python3-dev && \
apt-get clean

WORKDIR /code/
ADD ./backend /code
RUN pip3 install -r requirements.txt

EXPOSE 8000
CMD ["python3", "manage.py", "runserver", "0.0.0.0:8000"]