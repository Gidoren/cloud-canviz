import React, {Component} from 'react';
import classes from './DisplayArt.module.css'

import {gql} from 'apollo-boost'
import {Query} from 'react-apollo'
import {connect} from 'react-redux'

import Spinner from '../UI/Spinner/Spinner'
import Art1 from '../../assets/images/heart.jpg'
import Art from './Art/Art';
import * as actionCreators from '../../store/actions'

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
                        return <Spinner/>
                    if(error)
                        return <span>Error!</span>
                    return(
                        <div className={classes.DisplayArt}>
                            <div className = {classes.row}>
                                {data.getAllArt.reverse().map(art => (
                                    <div key={art._id}  className = {classes.column}>
                                        <Art 
                                            artURL={Art1} 
                                            title={art.title} />
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