import { API_URL_FILM_COLLECTON } from "../../../api/apiUrl/apiUrl";
import { FilmSection } from "../../FilmSection/FilmSection";

export function VampireSection(){
    const popularFilms = API_URL_FILM_COLLECTON[2]
    return(
        <FilmSection TitleCollection={popularFilms.title} apiUrl={popularFilms.url}></FilmSection>
    )
}