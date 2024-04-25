
sudo systemctl restart ollama.service
sudo systemctl restart nginx
sudo systemctl restart mysql

# Move to Flask directory and run gunicorn in another terminal
gnome-terminal --working-directory=/home/utopos/ezen/Release/v0_2_0/Flask -- bash -c "gunicorn --bind 0:5000 '__init__:create_app()'" &

# Move to React directory and run yarn start in another terminal
gnome-terminal --working-directory=/home/utopos/ezen/Release/v0_2_0/React -- bash -c "yarn install; yarn start" &

cd /home/utopos/ezen/Release/v0_2_0/Spring/GymunitySpringBackend
sudo rm -rf build/
sudo bash gradlew clean
sudo bash gradlew bootjar -x test
cd build/libs
java -jar GymunitySpringBackend-0.2.0.jar