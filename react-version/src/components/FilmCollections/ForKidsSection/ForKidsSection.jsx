import { API_URL_FILM_COLLECTON } from "../../../api/apiUrl/apiUrl";
import { FilmSection } from "../../FilmSection/FilmSection";

export function ForKidsSection(){
    const popularFilms = API_URL_FILM_COLLECTON[6]
    return(
        <FilmSection TitleCollection={popularFilms.title} apiUrl={popularFilms.url}></FilmSection>
    )
}