import React, {Component} from 'react';
import classes from './DisplayArt.module.css'

import {gql} from 'apollo-boost'
import {Query} from 'react-apollo'
import {connect} from 'react-redux'

import Spinner from '../UI/Spinner/Spinner'
import Art1 from '../../assets/images/heart.jpg'
import Art from './Art/Art';
import * as actionCreators from '../../store/actions'

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
            creator{
                email
            }
            
        }
    }
`;



class DisplayArt extends Component {
    render(){
        return (
            <Query query={getArtsQuery}>
                {({data, loading, error}) => {
                    if(loading)
                        return <Spinner/>
                    if(error)
                        return <span>{console.log(error)}</span>
                    return(
                        <div className={classes.DisplayArt}>
                            <div className = {classes.row}>
                                {data.getAllArt.reverse().map(art => (
                                    <div key={art._id}  className = {classes.column}>
                                        <Art 
                                            artURL={Art1} 
                                            title={art.title}
                                            year={art.year}
                                            height={art.dimensions.height}
                                            width={art.dimensions.width}
                                            username={art.creator.email}
                                        />
                                    </div>
                                    
                                ))}
                             
                            </div>
                        </div>

                    )
                }}
            </Query>
        )
    }
}
const mapStateToProps = state => {
    return{
        
    }
}
const mapDispatchToProps = dispatch => {
    return{
        onAddedArts: (arts) => dispatch(actionCreators.addArts(arts))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(DisplayArt);