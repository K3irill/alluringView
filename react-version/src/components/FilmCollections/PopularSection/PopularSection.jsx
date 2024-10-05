import { API_URL_FILM_COLLECTON } from "../../../api/apiUrl/apiUrl";
import { FilmSection } from "../../FilmSection/FilmSection";

export function PopularSection(){
    const popularFilms = API_URL_FILM_COLLECTON[0]
    return(
        <FilmSection TitleCollection={popularFilms.title} apiUrl={popularFilms.url}></FilmSection>
    )
}