import { API_URL_FILM_COLLECTON } from "../../../api/apiUrl/apiUrl";
import { FilmSection } from "../../FilmSection/FilmSection";

export function PopularSection({onFilmSelect}){
    const popularFilms = API_URL_FILM_COLLECTON[0]
    return(
        <FilmSection onFilmSelect={onFilmSelect} TitleCollection={popularFilms.title} apiUrl={popularFilms.url}></FilmSection>
    )
}