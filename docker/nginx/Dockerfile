FROM nginx

# Get rid of default sites

RUN rm /etc/nginx/conf.d/default.conf
RUN rm /etc/nginx/nginx.conf

# Copy our desired site

COPY nginx.conf /etc/nginx/

COPY default.conf /etc/nginx/conf.d/

# RUN service nginx restart
