import { API_URL_FILM_COLLECTON } from "../../../api/apiUrl/apiUrl";
import { FilmSection } from "../../FilmSection/FilmSection";

export function ZombieSection(){
    const popularFilms = API_URL_FILM_COLLECTON[4]
    return(
        <FilmSection TitleCollection={popularFilms.title} apiUrl={popularFilms.url}></FilmSection>
    )
}