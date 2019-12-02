import React, { Component } from 'react';
import { Alert } from 'react-bootstrap';
import './style.scss';
import { Toast } from 'react-bootstrap';

interface IAlertProps {
  severity?: string,
  message: string,
  data?: any,
}

interface IAlertState {
  severity?: string,
  message: string,
  data?: any,
  display?: boolean,
}

export default class Logger extends Component<IAlertProps, IAlertState> {
  constructor(props: IAlertProps) {
    super(props);
    this.state = {
      severity: 'info',
      message: '',
      data: null,
      display: true,
    }
  }

  componentDidMount() {
    this.setState({
      severity: this.props.severity,
      message: this.props.message,
      data: this.props.data,
      display: true,
    })
  }

  componentDidUpdate(oldProps: IAlertProps) {
    if (oldProps.message !== this.props.message) {
      this.setState({
        severity: this.props.severity,
        message: this.props.message,
        data: this.props.data,
        display: true,
      })
    }
  }

  render() {
    return (
      <Toast 
        onClose={() => this.setState({ display: false })} 
        autohide={true} 
        delay={3000}
        show={this.state.display}
        style={{ 'font-size': '14px',  position: 'absolute', top: '8%', right: '2%', 'background-color': '#0000ff'}}
        >
          <Toast.Header>{this.state.message}</Toast.Header>
      </Toast>
    );
  }
}