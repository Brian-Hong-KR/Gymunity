


sudo systemctl restart mysql

ollama serve
sudo systemctl restart nginx
cd Flask
gunicorn --bind unix:/tmp/myproject.sock "__init__:create_app()"

cd React
yarn start react

