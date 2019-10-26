import React from 'react';
import classes from './DisplayArt.module.css'

import {gql} from 'apollo-boost'
import {Query, useQuery} from 'react-apollo'
import {connect} from 'react-redux'

import Spinner from '../UI/Spinner/Spinner'
import Art1 from '../../assets/images/art.jpg'
import Art from './Art/Art';

// const getArtsQuery = gql`
//    query {
//         getAllArt{
//             title
//             artist
//         }
//     }
// `


// with graphql extension need to name the queries (compare one below to one above)
const getArtsQuery = gql`
   query getArtsQuery {
        getAllArt {
            title
            dimensions{
                height
                width
            }
            year
            description
            creator{
                email
                username
            }
            
        }
    }
`;

const DisplayArt = () => {

    /* getArtsQuery which is defined above, to get all artworks. Data, loading, error are predefined
    in Query syntax. Data is initialized to returned Artwork Array */
    const {data, loading, error} = useQuery(getArtsQuery) 
    if(loading)
        return <Spinner/>
    if(error)
        return <span>{console.log(error)}</span>
    return(
        <div className={classes.DisplayArt}>
            <div className = {classes.row}>
                {/* it's data.getAllArt because the query was named getAllArt in Schema.
                Reverses Artworks to get the latest first, then loop through it to get
                individual art. Each art have properties that we asked for in the query
                which are defined in schema */}
                {data.getAllArt.reverse().map(art => (
                    <div key={art._id} className={classes.column}>
                        {/* Art component that takes art properties as props.*/}
                        <Art 
                            artURL={Art1} 
                            title={art.title}
                            year={art.year}
                            height={art.dimensions.height}
                            width={art.dimensions.width}
                            username={art.creator.username}
                            desc={art.description}
                            link={"/profile/"+ art.creator.username}
                        />
                    </div>
                    
                ))}
                
            </div>
        </div>

    )
}

export default DisplayArt;