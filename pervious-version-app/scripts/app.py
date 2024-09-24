from flask import Flask, jsonify, request
from flask_cors import CORS  # Импортируем CORS
import os
import json

app = Flask(__name__)
CORS(app)  # Включаем CORS для всех маршрутов

def load_movies():
    data_dir = 'C:\\Users\\User\\Desktop\\IT\\JS\\cartoons\\scripts\\data'
    movie_files = ['top_20.json', 'family.json', 'popular-movie.json', 'disaster.json',]  # Удалили отсутствующие файлы
    all_movies = []

    for file_name in movie_files:
        file_path = os.path.join(data_dir, file_name)
        print(f"Trying to open: {file_path}")  # Отладочный вывод
        with open(file_path, encoding='utf-8') as f:
            movies_data = json.load(f)
            theme = movies_data.get("theme")
            for movie in movies_data.get("items", []):
                movie["theme"] = theme  # Добавляем тему к каждому фильму
                all_movies.append(movie)

    return all_movies

@app.route('/movies', methods=['GET'])
def get_movies():
    theme = request.args.get('theme')
    genre = request.args.get('genre')
    country = request.args.get('country')
    year = request.args.get('year')
    imdbId = request.args.get('imdbId')
    kinopoiskId = request.args.get('kinopoiskId')
    
    movies = load_movies()
    
    if theme:
        movies = [movie for movie in movies if movie.get('theme') == theme]
    if genre:
        movies = [movie for movie in movies if any(g.get('genre') == genre for g in movie.get('genres', []))]
    if kinopoiskId:
        movies = [movie for movie in movies if movie.get('kinopoiskId') == int(kinopoiskId)]
    if country:
        movies = [movie for movie in movies if any(c.get('country') == country for c in movie.get('countries', []))]
    if year:
        movies = [movie for movie in movies if movie.get('year') == int(year)]
    if imdbId:
        movies = [movie for movie in movies if movie.get('imdbId') == imdbId]
    
    return jsonify({
        'theme': theme,
        'total': len(movies),
        'totalPages': 1,
        'items': movies
    })

if __name__ == '__main__':
    app.run(debug=True)