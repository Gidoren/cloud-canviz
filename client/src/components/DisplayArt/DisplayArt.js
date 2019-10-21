import React, {Component} from 'react';
import Art from './Art/Art';
import classes from './DisplayArt.module.css'
import Art1 from '../../assets/images/heart.jpg'
import Art2 from '../../assets/images/2.jpg'
import Art3 from '../../assets/images/3.jpg'
import Art4 from '../../assets/images/bird.jpg'
import {gql} from 'apollo-boost'
import {graphql, Query} from 'react-apollo'

const getArtsQuery = gql`
    {
        getAllArt{
            title
            artist
        }
    }
`
class DisplayArt extends Component {
    render(){
        return (
            <Query query={getArtsQuery}>
                {({data, loading, error}) => {
                    if(loading)
                        return <span>Loading...</span>
                    if(error){
                        return (
                            <div>
                                {console.log(error)}
                                <span>Error!</span>
                            </div>
                            
                        )
                    }
                        
                        
                    const artsToRender = data
                    return(
                        <div className={classes.DisplayArt}>
                            <div className = {classes.row}>
                                <div className = {classes.column}>
                                    <Art artURL={Art1} title={artsToRender.title} />
                                </div>
                            </div>
                        </div>

                    )
                }}
            </Query>
        )
    }
}

export default graphql(getArtsQuery)(DisplayArt);