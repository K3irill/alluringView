import { API_URL_FILM_COLLECTON } from "../../../api/apiUrl/apiUrl";
import { FilmSection } from "../../FilmSection/FilmSection";

export function CatastropheSection(){
    const popularFilms = API_URL_FILM_COLLECTON[5]
    return(
        <FilmSection TitleCollection={popularFilms.title} apiUrl={popularFilms.url}></FilmSection>
    )
}