import { API_URL_FILM_COLLECTON } from "../../../api/apiUrl/apiUrl";
import { FilmSection } from "../../FilmSection/FilmSection";

export function TopSection({onFilmSelect}){
    const popularFilms = API_URL_FILM_COLLECTON[1]
    return(
        <FilmSection onFilmSelect={onFilmSelect} TitleCollection={popularFilms.title} apiUrl={popularFilms.url}></FilmSection>
    )
}