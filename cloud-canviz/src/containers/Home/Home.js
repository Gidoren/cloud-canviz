import React, {Component} from 'react'
import {connect} from 'react-redux'
import DisplayArt from '../../components/DisplayArt/DisplayArt'
class Home extends Component {
    render(){
        return(
            <div>
                <DisplayArt />
            </div>
        )
    }
}
const mapStateToProps = state =>{ 
    return {

    }
}
const mapDispatchToProps = dispatch => {
    return {

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home)