import BestCard from "../BestCard/BestCard"
import { dataBestFilmsArr } from "./dataBestFilms"
import styles from './BestSection.module.scss'
export function BestSection(){
    return(
        <div className={styles['best-section']}>
            <h2>Best of the best</h2>
            <div className={styles['best-section__cards']}>

            {dataBestFilmsArr.map(item => {
               return <BestCard  filmTitle={item.title} filmDescription={item.description}/>
            })}
            </div>
        </div>
    )
}