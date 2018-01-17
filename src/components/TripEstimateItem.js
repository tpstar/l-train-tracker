import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { CardSection, Button } from './common';
// import { followThisTrain } from '../actions';

class TripEstimateItem extends Component {

  // componentWillMount() {
  //   const { arrivaltime, arrivalStop } = this.props;
  //   console.log('run number: ', arrivaltime.rn);
  //   const runnumber = arrivaltime.rn;
  //   this.props.followThisTrain({ runnumber, arrivalStop });
  // }

  render() {
    const { trainline, arrivaltime, followtraindata } = this.props;
    // console.log(`followtrain data from reducer: ${followtraindata.eta ? followtraindata.eta[0].rn : followtraindata.errNm}`, followtraindata)
    const { textcolor, name } = trainline;
    const waitingMin =
      Math.round(
        parseFloat(
          moment(arrivaltime.arrT).diff(moment(arrivaltime.prdt))
        )/60/1000 //milliseconds to minutes
      )
    return (
      <CardSection>
        <Button
           // onPress={()=>onButtonPress()}
           overwriteTextStyle={{color: `${textcolor}`}}
           overwriteButtonStyle={{borderColor: `${name}`, backgroundColor: `${name}`}}
         >
           {waitingMin} min
        </Button>
      </CardSection>
    )
  }
}

const mapStateToProps = state => {
  const { followtraindata } = state; //followtraindata from reducers/index.js
  return { followtraindata };
}

export default connect(mapStateToProps, { })(TripEstimateItem);
