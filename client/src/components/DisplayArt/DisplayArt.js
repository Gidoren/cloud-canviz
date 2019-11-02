import React, {useState} from 'react';
import classes from './DisplayArt.module.css'

import {gql} from 'apollo-boost'
import {useQuery} from 'react-apollo'

import Spinner from '../UI/Spinner/Spinner'
import Art1 from '../../assets/images/art.jpg'
import Art from './Art/Art';

import {Waypoint} from 'react-waypoint'

// with graphql extension need to name the queries (compare one below to one above)
const getArtsQuery = gql`
   query getArtsQuery($offset: Int, $limit: Int){
        getAllArt(offset: $offset, limit: $limit){
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
    /* hasMoreArt is used to check if there is any more 
    art left to fetch if not setHasMoreArt set it to false*/
    const [hasMoreArt, setHasMoreArt] = useState(true)
    /* how many arts you want per fetch */
    const limit = 9
     /* getArtsQuery which is defined above, to get all artworks. Data, 
    loading, error are predefined in useQuery syntax. Data is initialized 
    to returned Artwork Array */
    const {data, fetchMore, loading, error} = useQuery(
        getArtsQuery,
        {
            variables: {
                offset: 0,
                limit: limit
            },
            fetchPolicy: "cache-and-network"
        }
    ) 
    /* if there's no art fetched yet */
    if(!data || !data.getAllArt)
        return <Spinner />
    if(error)
        return <span>{console.log(error)}</span>
    return(
        <div className={classes.DisplayArt}>
            <div className = {classes.row}
            >
                {/* it's data.getAllArt because the query was named getAllArt in Schema.
                loop through it to get individual art. Each art have properties that we asked for in the query
                which are defined in schema */}
                {data.getAllArt.map((art, index) => (
                    <div key={index} className={classes.column}>
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
                        {/* 1- Waypoint keep track of each image index and then fetch more images
                            when bottom art is reached that has index data.getAllArt.length-1
                            2- fetchMore takes the offset which is art[lengt-1] and fetch more art
                            that comes after that offset 
                            3- if hasMoreArt is false that means we all arts have been fetched so no
                            need to fetch more */}
                        {index === data.getAllArt.length-1 &&
                        hasMoreArt === true &&
                        <Waypoint onEnter={() => 
                            fetchMore({
                                variables: {
                                    offset: data.getAllArt.length
                                },
                                updateQuery: (prev, { fetchMoreResult }) => {
                                    {/* if fetched array is less than the limit then there's
                                        no more arts left */}
                                    if(fetchMoreResult.getAllArt.length < limit)
                                        setHasMoreArt(false)
                                    if (!fetchMoreResult) return prev;
                                    return Object.assign({}, prev, {
                                        getAllArt: [...prev.getAllArt, ...fetchMoreResult.getAllArt]
                                    });
                                    
                                }
                            })}/>
                        }
                    </div>
                    
                ))}
            </div>
            {/* if there's more art left to be fetched then show load componenet until rerender */}
            {hasMoreArt === true && <Spinner />}
        </div>

    )
}

export default DisplayArt;