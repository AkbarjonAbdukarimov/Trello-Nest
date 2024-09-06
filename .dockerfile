# Use the latest MySQL image from Docker Hub
FROM mysql:latest

# Expose MySQL default port
EXPOSE 3306

# Optional: Add a custom SQL script to initialize the database
# Uncomment the following line if you have an init script
# COPY ./init.sql /docker-entrypoint-initdb.d/

CMD ["mysqld"]
