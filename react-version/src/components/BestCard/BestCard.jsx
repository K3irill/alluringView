import styles from './BestCard.module.scss'

export default function BestCard({filmTitle, filmDescription, className}){
    
    return(
        
        <div className={styles['best-section__card']}>
            <h3>{filmTitle}</h3>
            <p>{filmDescription}</p>
        </div>
        
    )
}