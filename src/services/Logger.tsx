import React from 'react';
import { Alert } from 'react-bootstrap';

export default class Logger {
  static debug(message: string, ...data: any[]) {
    Logger.log('debug', message, data);
  }

  static info(message: string, ...data: any[]) {
    Logger.log('info', message, data);
  }

  static warn(message: string, ...data: any[]) {
    Logger.log('warn', message, data);
  }

  static error(message: string, ...data: any[]) {
    Logger.log('error', message, data);
  }

  static log(severity: 'debug' | 'info' | 'warn' | 'error', message: string, ...data: any[]) {
    // eslint-disable-next-line no-console
    return (<Alert variant={severity}>{message}</Alert>);
  }
}