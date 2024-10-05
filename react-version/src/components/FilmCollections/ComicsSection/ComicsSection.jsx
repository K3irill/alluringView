import { API_URL_FILM_COLLECTON } from "../../../api/apiUrl/apiUrl";
import { FilmSection } from "../../FilmSection/FilmSection";

export function ComicsSection({onFilmSelect}){
    const popularFilms = API_URL_FILM_COLLECTON[3]
    return(
        <FilmSection onFilmSelect={onFilmSelect} TitleCollection={popularFilms.title} apiUrl={popularFilms.url}></FilmSection>
    )
}